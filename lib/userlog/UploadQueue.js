'use babel';

const $ = require('jquery');
const ShowDBTable = require('./ShowDBTable');

export default class UploadQueue {
  constructor(db, user) {
    this.db = db
    this.user = user
    this.element = document.createElement('div')
    this.element.style.overflow='auto'
    this.element.classList.add('tools')
    this.element.classList.add('hljs')
    this.dom=$('<div></div>')
    this.element.append(this.dom[0])
    this.parse()
  }

  getTitle() {
    return '上传队列'
  }

  parse(){
    var self = this
    var db = this.db
    var results
    try {
      results = db.exec('select add_time, class_name, err_code, err_info, try_count, update_time, flag, info from common_log')
    } catch (e) {
      results = db.exec('select add_time, class_name, try_count, update_time, flag, info from common_log')
    }
    var rawResults = db.exec('select * from common_log')
    ShowDBTable.parseTime(results, "add_time", "update_time")
    this.parseAnswerData(results)
    var table = ShowDBTable.getTable(results)
    ShowDBTable.parseCodeBlock(table, 8)
    ShowDBTable.addButton(table, rawResults, (num, data)=>{
      atom.workspace.open('item:'+num).then((editor)=>{
        editor.setGrammar(atom.grammars.grammarForScopeName('source.js'))
        editor.insertText(JSON.format(data))
      })
    })
    table.find('tr>td:nth-child(1),tr>td:nth-child(6)').each((index,item)=>{
     item.style.cssText='white-space: nowrap;'
    })
    this.dom.append(table)
    this.removeLoading()
  }

  removeLoading(){

  }

  parseAnswerData(results){
    var self = this
    if(results.length==0)return ;
    var result = results[0]
    var values = result.values
    values.forEach((line)=>{
      if(line[1] == 'BookTaskLogV2') {
        var json = line[7]
        var jsonObj = JSON.parse(json)
        jsonObj.addTime = Date.str(jsonObj.addTime)
        jsonObj.studyDate = Date.str(jsonObj.studyDate)
        jsonObj.studyTime = jsonObj.studyTime+'秒'
        if (jsonObj.answers) { jsonObj.answers = jsonObj.answers.substr(0,100)+'......' }
        if (jsonObj.result) { jsonObj.result = jsonObj.result.substr(0,100)+'......' }
        line[7] = JSON.format(jsonObj)
      }
      if(line[1] == 'SelfStudyLog') {
        var json = line[7]
        var jsonObj = JSON.parse(json)
        jsonObj.beginTime = Date.str(jsonObj.beginTime)
        jsonObj.endTime = Date.str(jsonObj.endTime)
        jsonObj.seconds = jsonObj.seconds+'秒'
        if (jsonObj.answers) { jsonObj.answers = jsonObj.answers.substr(0,100)+'......' }
        if (jsonObj.result) { jsonObj.result = jsonObj.result.substr(0,100)+'......' }
        line[7] = JSON.format(jsonObj)
      }
    })
  }

}
