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
    const startTime = Date.now()
    const moment = require('moment');
    atom.notifications.addInfo('generateTags startTime '+moment(startTime).format('HH:mm:ss:SSS'))

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
        let ignoreSet = new Set()
        glob("**/*.+(js|java|coffee|c|cpp|h|gitignore)", options, function (er, files) {
          files = files.map((item)=>{
            if (item.endsWith('.gitignore')) {
              fs.readFileSync(item,'utf-8').split('\n').filter((item)=>{
                return item && !item.startsWith('#')
              }).forEach((item)=>{
                if (item.trim().length > 0) {
                  ignoreSet.add(item.trim())
                }
              })
            }
            return item
          }).filter((item)=>{
            return [...ignoreSet].every((ignore)=>!item.includes(ignore))
          }).map((item)=>{
            return item.replace(/\\/g,'/')
          })
          resolve(files)
        })
      }).then((files)=>{
        const TagGenerator = require('./TagGenerator');
        return new TagGenerator(project, files).generate()
      }).then((tags)=>{
        console.log('tag size:',tags.length);
        let gitDir = path.join(project, '.git')
        if(!fs.existsSync(gitDir)) { fs.mkdirSync(gitDir) }
        fs.writeFileSync(path.join(gitDir, 'tags'), tags.join('\n'), 'utf-8')
        let notification = null
        let notificationOptions = {
          detail: `FOUND TAG SIZE : ${tags.length}\nUSE TIME : ${Date.now()-startTime}ms`,
          dismissable: true,
          buttons:[{
            text: 'OK',
            onDidClick: ()=>{
              notification.dismiss()
            }
          }]
        }
        if (tags.code == 0) {
          notification = atom.notifications.addSuccess('generateTags Success!', notificationOptions)
        } else {
          notification = atom.notifications.addError('generateTags Error!', notificationOptions)
        }
      })
  }
}
