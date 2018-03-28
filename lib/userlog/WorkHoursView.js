'use babel';

import { Emitter, Disposable, CompositeDisposable, File, TextEditor } from 'atom'
import { $ } from 'atom-space-pen-views';

const moment = require('moment');

export default class WorkHoursView{
  constructor() {
    this.element = document.createElement('div')
    this.element.style.overflow='auto'
    this.element.classList.add('tools')
    this.dom=$('<div></div>')
    this.element.append(this.dom[0])
    this.initialize()
    this.subscriptions = new CompositeDisposable();
  }

  activate(){
    console.error('active....');
  }

  destroy()  {
    console.log('destroys');
    this.subscriptions.dispose()
  }

  getTitle() {
    return '每日工时统计'
  }

  showLoading(){
    this.dom.html('')
    console.warn('showLoading...');
    atom.notifications.addInfo('progress:showLoading')
  }

  removeLoading(){
    console.warn('removeLoading...');
  }

  updateLoadingProgress(progress){
    atom.notifications.addInfo('progress:'+progress)
  }

  initialize(){
    var templ = `
      <div class="container">
        <div class="row">
          <div class="col-12 mt-5 d-flex justify-content-center">
            <button type="button" class="btn btn-primary">Refresh</button>
          </div>
          <div class="inputEditor input-group col-12 mt-2">
            <span class="input-group-addon" id="basic-addon1">姓名</span>
          </div>
          <div class="result col-12">

          </div>
        </div>
      </div>
      `
    this.showLoading()
    WorkHoursView_loadData((progress, resp)=>{
      this.updateLoadingProgress(progress)
      if (progress < 100) {
        return
      }
      this.removeLoading()
      var view = $(templ)
      var btn = view.find('button')
      var result = view.find('.result')

      var editor = new TextEditor({mini: true, placeholderText: 'Find in current buffer'})
      editor.element.classList.add('form-control')
      view.find('.inputEditor').append(editor.element)
      var sName = localStorage.WorkHoursView_loadData_uname

      editor.setText(sName?sName:'')

      resp = resp.replace(/<script.*?<\/script>/g, '')
      var obj = this.convertToObj(resp)
      if (obj) {
        var table = this.convertToTable(obj)
        result.append(table)
      }
      this.dom.append(view)
      btn.click(()=>{
        this.initialize()
      })

      editor.onDidChange(()=>{
        console.log('------ : ' + editor.getText().trim());
        localStorage.WorkHoursView_loadData_uname = editor.getText().trim()
      })
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'core:confirm': () => {
          if (Date.now()-this.refreshTime<1000) { return ; }
          this.refreshTime = Date.now()
          atom.notifications.addInfo('search:'+editor.getText())
          this.initialize()
        }
      }));
    })
  }

  convertToObj(resp){
    var res = $(resp)
    var trs = res.find('table.x-table tr')
    if (trs.length==0) return false;
    var obj = {}
    obj.beginTime = $(trs[1]).find('td:nth-child(2)').text()
    obj.endTime = $(trs[1]).find('td:nth-child(4)').text()
    obj.tasks = []
    obj.tasks.push({
      beginTime: $(trs[3]).find('td:nth-child(2)').text(),
      click: $(trs[3]).find('td:nth-child(2)>span').attr('onclick'),
      dayHours: $(trs[3]).find('td:nth-child(3)').text(),
      taskCount: $(trs[3]).find('td:nth-child(4)').text()
    })
    for (var i = 4; i < trs.length-1; i++) {
      let tr = $(trs[i])
      obj.tasks.push({
        beginTime: tr.find('td:nth-child(1)').text(),
        click: tr.find('td:nth-child(1)>span').attr('onclick'),
        dayHours: parseInt(tr.find('td:nth-child(2)').text()),
        taskCount: parseInt(tr.find('td:nth-child(3)').text())
      })
    }
    var tr = $(trs[trs.length-1])
    obj.totalHours = tr.find('td:nth-child(2)').text()
    return obj
  }

  convertToTable(obj){

    var d = moment(obj.beginTime)
    var week = d.weekday()
    console.log('beginTime:'+obj.beginTime+' week:'+week);
    var month = d.month()
    var date = d.day(d.day()-week)

    var days = []
    '一二三四五六日'.split('').forEach((item)=>{
      days.push(`
        <div class="pt-2 pb-2 text-center col-1 bg-info border" style="flex:0 0 14.285714%;max-width:14.285714%;">
        ${item}
        </div>`)
    })

    var timeMap = {}
    obj.tasks.forEach((t)=>{
        timeMap[t.beginTime] = t.dayHours
    })

    while(true){
      var bg = 'bg-secondary'
      if (date.month()==month) bg='bg-primary'
      var hours = timeMap[date.format('YYYY-MM-DD')]
      if(hours>0) bg="bg-success"
      if(hours>8) bg="bg-danger"
      days.push(`
        <div class="pt-2 pb-2 text-center col-1 ${bg} border" style="flex:0 0 14.285714%;max-width:14.285714%;">
          ${date.date()}
        </div>
        `)
      if ((date.month()>month||date.month()<month-3)&&date.weekday()==6) {
        console.log('bbbbbbbbbbbbbb');
        break
      }
      date.day(date.day()+1)
      console.log(`---${month}-----${date.month()}--------${date.weekday()}-----------------`);
    }

    var block=`
    <div class="container col-4">
      <div class="row">
        ${days.join('')}
      </div>
    </div>
    `
    var trs = []
    obj.tasks.forEach((task)=>{
      trs.push(`<tr class="${task.dayHours>8?'table-danger':''}">
                  <td>${task.beginTime}</td>
                  <td>${task.dayHours}</td>
                  <td>${task.taskCount}</td>
                </tr>`)
    })
    var table = `
    <div class="row">
      <div class="col-12">
        <h4>开始日期：<span class="text-success">${obj.beginTime}</span> 截止日期：<span class="text-success">${obj.endTime}</span>
        总工时：<span class="text-success">${obj.totalHours}</span></h4>
      </div>
      <div class="col-8">
        <table class="table table-hover table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">工作开始日期</th>
              <th scope="col">当日工时</th>
              <th scope="col">任务数</th>
            </tr>
          </thead>
          <tbody>
            ${trs.join('')}
          </tbody>
        </table>
      </div>${block}
    </div>
    `
    return table
  }

}

function WorkHoursView_loadData(update) {

  update(0)

  Date.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  Date.prototype.getDaysInMonth = function () {
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    return Date.daysInMonth[this.getMonth()]
  };

  Date.prototype.isLeapYear = function () {
    var a = this.getFullYear();
    return ((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)))
  };

  function GET(url) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.onreadystatechange = () => {
        console.log(' - readyState:' + request.readyState + ' status:' + request.status)
        if (request.readyState == 4) {
          resolve(request.responseText)
        }
      }
      request.send()
    });
  }

  function POST(url, data) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest()
      request.open('POST', url, true)
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.onreadystatechange = () => {
        console.log(' - readyState:' + request.readyState + ' status:' + request.status)
        if (request.readyState == 4) {
          resolve(request.responseText)
        }
      }
      request.send(data)
    });
  }

  function EMPTY() {
    return new Promise(function(resolve, reject) {

    });
  }

  Date.prototype.Format = function(fmt) {
    //author: meizz
    var o = {
      "M+": this.getMonth() + 1,
      //月份
      "d+": this.getDate(),
      //日
      "h+": this.getHours(),
      //小时
      "m+": this.getMinutes(),
      //分
      "s+": this.getSeconds(),
      //秒
      "q+": Math.floor((this.getMonth() + 3) / 3),
      //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  function getFirstDateStr() {
    var d = new Date()
    return `${d.Format('yyyy-MM-')}01`;
  }

  function getLastDateStr() {
    var d = new Date()
    return `${d.Format('yyyy-MM-')}${d.getDaysInMonth()}`;
  }

  function htmlencode(s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
  }

  function htmldecode(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText;
  }

  function start() {
    update(10)
    console.log('into start')
    var globalData = {}
    GET(`http://192.168.1.201:8085/WebReport/ReportServer?reportlet=/worksummary.cpt&op=view&_=${Date.now()}&__pi__=true`)
    .then((resp)=>{
      update(30)
      var sessionID = resp.match(/FR.SessionMgr.register\('(\d*)', contentPane\)/)[1]
      globalData.sessionID = sessionID
      var url = `http://192.168.1.201:8085/WebReport/ReportServer?op=fr_dialog&cmd=parameters_d&sessionID=${sessionID}`
      var data = `__parameters__=%7B%22LABEL%5B5f00%5D%5B59cb%5D%5B65e5%5D%5B671f%5D%22%3A%22%5B5f00%5D%5B59cb%5D%5B65e5%5D%5B671f%5D%3A%22%2C%22%5B5f00%5D%5B59cb%5D%5B65e5%5D%5B671f%5D%22%3A%22${getFirstDateStr()}%22%2C%22LABEL%5B7ed3%5D%5B675f%5D%5B65e5%5D%5B671f%5D%22%3A%22%5B7ed3%5D%5B675f%5D%5B65e5%5D%5B671f%5D%3A%22%2C%22%5B7ed3%5D%5B675f%5D%5B65e5%5D%5B671f%5D%22%3A%22${getLastDateStr()}%22%7D`
      return POST(url, data)
    }).then((resp)=>{
      update(60)
      var sessionID = globalData.sessionID
      var url = `http://192.168.1.201:8085/WebReport/ReportServer?_=${Date.now()}&__boxModel__=true&op=fr_view&cmd=view_content&sessionID=${sessionID}&reportIndex=0&iid=${Math.random()}`
      return GET(url)
    }).then((resp)=>{
      var sName = localStorage.WorkHoursView_loadData_uname
      sName = sName?sName:'袁立位'
      var reg = new RegExp(`<span [^>]*?>${sName}<\/span>`)
      var match = resp.match(reg)
      if (!match) {
        update(100, '<h1>没有记录</h1>')
        atom.notifications.addError('没有记录',{
          detail: '没有记录...'
        })
        return EMPTY()
      }
      var line = match[0]
      line = line.match(/onclick="([^"]*?)"/)[1]
      line = htmldecode(line)
      line = line.match(/\{\\"LABEL[^\}]*?\}/)[0]
      line = line.replace(/\\/g, '')
      var data = `__parameters__=${htmlencode(line)}`
      var url = `http://192.168.1.201:8085/WebReport/ReportServer?reportlet=/dailyworksummary.cpt`
      return POST(url, data)
    }).then((resp)=>{
      update(80)
      var sessionID = resp.match(/FR.SessionMgr.register\('(\d*)', contentPane\)/)[1]
      var url = `http://192.168.1.201:8085/WebReport/ReportServer?_=${Date.now()}&__boxModel__=true&op=page_content&sessionID=${sessionID}&pn=1 `
      return GET(url)
    }).then((resp)=>{
      update(100, resp)
      console.log('over!')
    })
  }

  start()
}
