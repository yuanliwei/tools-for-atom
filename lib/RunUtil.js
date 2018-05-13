/*
  代码运行配置信息
  'use dev';     使用开发模式运行代码
  'use context'; 在当前atom环境中运行代码
  'use view';    打开新的窗口并调用代码中的 initialize() 方法
*/
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const iconv = require('iconv-lite');

class RunUtil {
  static run () {
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    var runFilePath = false
    if (code.trim().length>0) {
      runFilePath = path.join(os.tmpdir(),`tmp-${Date.now()}.js`)
      fs.writeFileSync(runFilePath,code,'utf-8')
    } else {
      runFilePath = e.getPath()
    }
    if (!fs.existsSync(runFilePath)) {
      code = e.getText()
      runFilePath = path.join(os.tmpdir(),`tmp-${Date.now()}.js`)
      fs.writeFileSync(runFilePath,code,'utf-8')
    }

    var code = fs.readFileSync(runFilePath,'utf-8')
    var devMode = false

    if (code.includes('\'use dev\';')) {
      devMode = true
      if (code == '\'use dev\';') {
        var devCode = fs.readFileSync(path.join(__dirname,'../doc/ViewModule开发者模式.js'), 'utf-8')
        var notification = atom.notifications.addSuccess('开发者模式注入代码',{
          detail: devCode,
          dismissable: true,
          buttons:[{
            className:'icon icon-clippy',
            onDidClick: ()=>{
              devCode = devCode.replace('project dir',atom.workspace.project.rootDirectories[0].path.replace(/\\/g,'\\\\'))
              atom.clipboard.write(devCode)
              notification.dismiss()
              atom.notifications.addSuccess('复制成功！')
            },
            text:'复制',
          }]
        })
        return
      }
    }

    if (code.includes('\'use context\';')) {
      try {
        new require(runFilePath)
      } catch (e) {
        var options = {
          detail:e.stack
        }
        atom.notifications.addError(e.message, options)
      }
      return
    }

    if (code.includes('\'use view\';')) {
      var baseViewPath = path.posix.join(__dirname.replace(/\\/g,'/'),'/view/BaseView')
      var codeTmp = code.replace('\'use view\';', `const BaseView = require('${baseViewPath}');`)
      fs.writeFileSync(runFilePath,codeTmp, 'utf-8')
      try {
        var View = require(runFilePath);
        atom.workspace.open(new View())
      } catch (e) {
        var options = {
          detail:e.stack
        }
        atom.notifications.addError(e.message, options)
      }
      setTimeout(()=>{
        fs.writeFileSync(runFilePath,code, 'utf-8')
      },100)
    } else {
      RunUtil.runFile(runFilePath, devMode)
    }
  }

  static runFile(path, devMode){
    var activePane = atom.workspace.getActivePane();
    if (!RunUtil.process || !RunUtil.process.stdin.connecting) {
      RunUtil.process = spawn('cmd')
      RunUtil.process.stdout.on('data',(data)=>{
        if (!RunUtil.editor) { return ; }
        let out = iconv.decode(data, 'utf-8')
        // 编码不对试着用GBK编码
        if(out.indexOf('�') != -1){
          out = iconv.decode(data, 'gbk');
        }
        RunUtil.editor.append(out)
        activePane.activate();
      })
      RunUtil.process.stderr.on('data',(data)=>{
        if (!RunUtil.editor) { return ; }
        let out = iconv.decode(data, 'utf-8')
        // 编码不对试着用GBK编码
        if(out.indexOf('�') != -1){
          out = iconv.decode(data, 'gbk');
        }
        RunUtil.editor.append(out)
        activePane.activate();
      })
    }

    var uri = atom.project.resolvePath('tools-editor://output');
    var pane = atom.workspace.paneForURI(uri);
    if (!pane) { pane=atom.workspace.getActivePane().findOrCreateRightmostSibling() }
    atom.workspace.openURIInPane(uri,pane).then((editor)=>{
      RunUtil.editor = editor
      editor.setGrammar(atom.grammars.grammarForScopeName('source.js'))
      var buf = iconv.encode(`node "${this.path}"\n`, 'gbk');
      if (devMode) {
        buf = iconv.encode(`node --inspect-brk "${this.path}"\n`, 'gbk');
      }
      RunUtil.process.stdin.write(buf, 'buffer')
    })
  }

  static runFileInView({target}) {
    var file = target.dataset.path;
    if (!file) {
      return;
    }

    var runFilePath = file
    var code = fs.readFileSync(file,'utf-8')
    var devMode = false

    if (code.includes('\'use dev\';')) {
      devMode = true
      if (code == '\'use dev\';') {
        var devCode = fs.readFileSync(path.join(__dirname,'../doc/ViewModule开发者模式.js'), 'utf-8')
        var notification = atom.notifications.addSuccess('开发者模式注入代码',{
          detail: devCode,
          dismissable: true,
          buttons:[{
            className:'icon icon-clippy',
            onDidClick: ()=>{
              devCode = devCode.replace('project dir',atom.workspace.project.rootDirectories[0].path.replace(/\\/g,'\\\\'))
              atom.clipboard.write(devCode)
              notification.dismiss()
              atom.notifications.addSuccess('复制成功！')
            },
            text:'复制',
          }]
        })
        return
      }
    }

    if (code.includes('\'use context\';')) {
      try {
        new require(runFilePath)
      } catch (e) {
        var options = {
          detail:e.stack
        }
        atom.notifications.addError(e.message, options)
      }
      return
    }

    if (code.includes('\'use view\';')) {
      var baseViewPath = path.posix.join(__dirname.replace(/\\/g,'/'),'/view/BaseView')
      var codeTmp = code.replace('\'use view\';', `const BaseView = require('${baseViewPath}');`)
      fs.writeFileSync(runFilePath,codeTmp, 'utf-8')
      try {
        var View = require(runFilePath);
        atom.workspace.open(new View())
      } catch (e) {
        var options = {
          detail:e.stack
        }
        atom.notifications.addError(e.message, options)
      }
      setTimeout(()=>{
        fs.writeFileSync(runFilePath,code, 'utf-8')
      },100)
    } else {
      RunUtil.runFile(runFilePath, devMode)
    }

  }

  static runFileQuiet({target}) {
    var file = target.dataset.path;
    if (!file) {
      return;
    }
    if (!RunUtil.process || !RunUtil.process.stdin.connecting) {
      RunUtil.process = spawn('cmd')
      RunUtil.process.stdout.on('data',(data)=>{
        let out = iconv.decode(data, 'utf-8')
        // 编码不对试着用GBK编码
        if(out.indexOf('�') != -1){
          out = iconv.decode(data, 'gbk');
        }
        console.log(out);
      })
      RunUtil.process.stderr.on('data',(data)=>{
        let out = iconv.decode(data, 'utf-8')
        // 编码不对试着用GBK编码
        if(out.indexOf('�') != -1){
          out = iconv.decode(data, 'gbk');
        }
        console.error(out);
        atom.notifications.addError(file,{detail:out})
      })
    }
    var buf = iconv.encode(`node "${file}"\n`, 'gbk');
    RunUtil.process.stdin.write(buf, 'buffer')
  }
}

module.exports = RunUtil;
