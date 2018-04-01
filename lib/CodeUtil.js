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
    const sv = require(atom.workspace.packageManager.getAvailablePackages().filter((item)=>{
     return item.name == 'symbols-view'
    })[0].path)
    const path = require('path');
    const glob = require('glob');
    const fs = require('fs');

    var project = atom.project.rootDirectories[0].path.replace(/\\/g,'/')
    var originFileView = sv.fileView
    sv.fileView = null
    var fv = sv.createFileView()
    var size = atom.grammars.grammars.length
    var grammars = atom.grammars.grammars
    var scopeMap = {}
    var arrType = []
    for (var i = 0; i < grammars.length; i++) {
      let item = grammars[i]
      item.fileTypes.forEach((type)=>{
        scopeMap[type] = item.scopeName
        arrType.push(`${type} - ${item.scopeName}`)
      })
    }

    var createTags = (filePath)=>{
      filePath = filePath.replace('\\','/')
      fv.getScopeName=()=> {
        var ext, ref;
        ext = (ref = path.extname(filePath)) != null ? ref.toLowerCase().substr(1) : void 0;
        return scopeMap[ext];
      };
      return fv.generateTags(filePath)
    }

    var options = {
      cwd: project,
      realpath :true,
      dot:true,
      nodir: true
    }

    new Promise(function(resolve, reject) {
      glob("**/*.+(js|java)", options, function (er, files) {
        // files = files.filter((item)=>{
        //   return !item.includes('node_modules')
        // })
        resolve(files)
      })
    }).then((files)=>{
      return new Promise(function(resolve, reject) {
        Promise.all(files.map((item)=>{
          return createTags(item)
        })).then((results)=>{
          resolve({files:files,results:results})
        })
      })
    }).then((obj)=>{
      let files = obj.files
      let results = obj.results
      return new Promise(function(resolve, reject) {
        let tags = []
        for (var i = 0; i < results.length; i++) {
          let filePath = files[i]
          let result = results[i]
          filePath = filePath.replace(/\\/g,'/')
          let relPath = filePath.replace(project,'')
          result.forEach((item)=>{
            tags.push(`${item.name}\t${relPath}\t${item.position.row+1};"`)
          })
        }
        resolve(tags)
      })
    }).then((tags)=>{
      console.log('tag size:',tags.length);
      fs.writeFileSync(path.join(project,'tags'),tags.join('\n'),'utf-8')
      fv.destroy();
      fv = null;
      sv.fileView = originFileView
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
