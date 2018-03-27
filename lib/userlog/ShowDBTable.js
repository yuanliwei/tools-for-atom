'use babel';

import { $ } from 'atom-space-pen-views';

/*
  将数据库查询结果转换为表格的工具类
*/

export default class ShowDBTable {

  /*
  把数据库查询结果生成一个表格
  */
  static getTable(results) {
    debugger
    if (results.length == 0) {
      var table = $('<table class="table"></table>')
      return table
    }
    var result = results[0]
    var columns = result.columns.map((item)=>{
      return {
        field: item,
        title: item
      }
    })
    var datas = result.values.map((item)=>{
      var obj = {}
      for (var i = 0; i < result.columns.length; i++) {
        obj[result.columns[i]] = item[i]
      }
      return obj;
    })
    var table = $('<table class="table"></table>')
    table.append(`<tr>${columns.map((item)=>{
      return '<th>'+item+'</th>'
    }).join('')}</tr>`)
    datas.forEach((item)=>{
      table.append(`<tr>${item.map((item)=>{
        return '<td>'+item+'</td>'
      }).join('')}</tr>`)
    })
    // table.bootstrapTable({
    //   columns: columns,
    //   data: datas
    // });
    return table
  }

  /*
    格式化指定列名的时间格式
  */
  static parseTime(){
    var results = arguments[0]
    var params = [...arguments].slice(1)
    var self = this
    if(results.length==0)return ;
    var result = results[0]
    var columns = result.columns
    var values = result.values
    var indexArr = []
    params.forEach((item)=>{
      indexArr.push(columns.indexOf(item))
    })
    values.forEach((line)=>{
      indexArr.forEach((index)=>{
        line[index] = Date.str(line[index])
      })
    })
  }

  /*
  把表格指定列的内容格式化成代码块显示，列序号从1开始
  */
  static parseCodeBlock(){
    var table = arguments[0]
    var params = [...arguments].slice(1)
    for (var i = 0; i < params.length; i++) {
      var index = params[i]
      table.find(`tr>td:nth-child(${index})`).each((num,td)=>{
        var json = $(td).text()
        td.innerHTML = ''
        $(td).append(JSON.block(json))
      })
    }
  }

  static addButton(table, results, callback){
    if (results.length == 0) return
    var result = results[0]
    var trs = table.find('tr')
    $(trs[0]).append('<th>详情</th>')
    var columns = result.columns
    var values = result.values
    for (let i = 1; i < trs.length; i++) {
      let tr = trs[i]
      let item = values[i-1]
      let obj = {}
      for (let j = 0; j < columns.length; j++) {
        obj[columns[j]] = item[j]
      }
      let td = $(`<td><button type="button" class="btn btn-success">详情</button></td>`)
      $(tr).append(td)
      td.find('button')[0].addEventListener('click', ()=>{
        callback(i-1, obj)
      })
    }
  }

}
