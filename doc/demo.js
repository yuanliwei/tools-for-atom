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

  addBaseView(){
    var BaseView = require('../lib/view/BaseView');
    atom.workspace.open(new BaseView())
  }

  addChildView(){
    var ChildView = require('../lib/view/ChildView');
    atom.workspace.open(new ChildView())
  }

  addOpenInDock(btns){
    const item = {
      element: document.createElement('div'),
      getTitle () { return 'My Fabulous Divl' },
      getDefaultLocation () { return 'bottom' },
    }
    atom.workspace.open(item)
  }

  addTextEditor(btns){
    dom.append(new TextEditor({mini: true, placeholderText: 'Find in current buffer'}).element)
  }

  beep(btns){
    atom.beep()
  }

  showAtomConfirm(){
    atom.confirm({
      message: 'How you feeling?',
      detail: 'Be honest.',
      buttons: ['Good', 'Bad']
    }, (response)=> {
      if (response === 0) {
        window.alert('good to hear')
      } else {
        window.alert('bummer')
      }
    })
  }

  addTooltip(){
    this.subscriptions.add( atom.tooltips.add(dom, {title: 'This is a tooltip'}) )
  }


  useDisposable(){
    const { Disposable } = require('atom');
    var resizeEventListener = ()=>{
      this.content.element.setHeight(editorContainer.height())
    }
    window.addEventListener('resize', resizeEventListener)
    this.subscriptions.add(new Disposable(()=>{
      window.removeEventListener('resize',resizeEventListener)
    }))
  }
}
