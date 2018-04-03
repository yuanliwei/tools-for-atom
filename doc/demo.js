class Demo {

  // 显示通知
  notifications(){
    atom.notifications.addSuccess('addSuccess()')
    atom.notifications.addInfo('addInfo()')
    atom.notifications.addWarning('addWarning()')
    atom.notifications.addError('addError()')
    atom.notifications.addFatalError('addFatalError()')
    var e = new Error('error message')
    atom.notifications.addError(e.message,{detail:e.stack})
    var options = {
      buttons:[{
        className:'icon icon-alert',
        onDidClick: ()=>{ console.log('onDidClick())') },
        text:'button text'
      }],
      description:'description description description ',
      detail:'detail detail detail detail ',
      dismissable: false, // true 通知不自动消失
      icon:'alert'
    }
    atom.notifications.addSuccess(e.message, options)
  }

  // 复制文字
  clipboard(){
    atom.clipboard.write('hello')
    console.log(atom.clipboard.read())
  }

  // 获取当前环境信息
  getEnvInfo(){
    // 当前项目路径
    atom.workspace.project.rootDirectories[0].path
  }
}
