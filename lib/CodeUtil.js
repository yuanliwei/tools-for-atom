'use babel';

const vkbeautify = require('vkbeautify');

export default class CodeUtil {
  static formatJSON(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.json(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.json(code)
      e.setText(code)
    }
  }
  static formatXML(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.xml(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.xml(code)
      e.setText(code)
    }
  }
  static formatCSS(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.css(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.css(code)
      e.setText(code)
    }
  }
  static formatSQL(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.sql(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.sql(code)
      e.setText(code)
    }
  }
  static formatJS(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const js_beautify = require('js-beautify');
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = js_beautify(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = js_beautify(code)
      e.setText(code)
    }
  }
  static minJSON(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.jsonmin(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.jsonmin(code)
      e.setText(code)
    }
  }
  static minXML(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.xmlmin(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.xmlmin(code)
      e.setText(code)
    }
  }
  static minCSS(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.cssmin(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.cssmin(code)
      e.setText(code)
    }
  }
  static minSQL(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.sqlmin(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.sqlmin(code)
      e.setText(code)
    }
  }
  static generateTags(){
    var path1 = 'C:/Users/ylw/.atom/packages/tools/lib/CodeUtil.js'
    console.log('begin generateTags');
    const TagGenerator = require('./TagGenerator');
    const sv = require(atom.workspace.packageManager.getAvailablePackages().filter((item)=>{
     return item.name == 'symbols-view'
    })[0].path)
    const path = require('path');
    const glob = require('glob');
    const fs = require('fs');

    var project = atom.project.rootDirectories[0].path.replace(/\\/g,'/')

    var options = {
      cwd: project,
      realpath :true,
      dot:true,
      nodir: true
    }

    new Promise(function(resolve, reject) {
      glob("**/*.+(js|java|coffee|c|cpp|h)", options, function (er, files) {
        files = files.filter((item)=>{
          return !item.includes('node_modules')
        })
        resolve(files)
      })
    }).then((files)=>{
      return Promise.all(files.map((item)=>{
        let filePath = item.replace(/\\/g,'/')
        return new TagGenerator(project,filePath).generate()
      }))
    }).then((results)=>{
      let tags = []
      for (var i = 0; i < results.length; i++) {
        results[i].forEach((item)=>{
          tags.push(item)
        })
      }
      console.log('tag size:',tags.length);
      fs.writeFileSync(path.join(project, '.git', 'tags'), tags.join('\n'), 'utf-8')
      var notigication = atom.notifications.addSuccess('generateTags Success!',{
        detail: `find tag size : ${tags.length}`,
        dismissable: true,
        buttons:[{
          text: 'OK',
          onDidClick: ()=>{
            notigication.dismiss()
          }
        }]
      })
    })
  }
}
