'use babel';

import { Emitter, Disposable, CompositeDisposable, File, TextEditor } from 'atom'
import { $ } from 'atom-space-pen-views';

const JSZip = require('jszip');
import UserLogView from './userlog/UserLogView'
import WorkHoursView from './userlog/WorkHoursView'

export default class MainView {
  constructor() {
    this.element = document.createElement('div')
    this.disposables = new CompositeDisposable()
    this.element.classList.add('tools')
    this.initialize()
  }

  getTitle() {
    return 'Tools'
  }

  serialize() {
    console.log('on serialize');
  }

  destroy(){
    this.disposables.dispose()
  }

  initialize(){
    // super.initialize()
    console.log('initialize....');

    var html = `
        <div class="container pt-5">
          <div class="row">
            <h1>MainView</h1>
            <hr>
            <div class="btns col-12">
              <input type="file" class="zipinput btn btn-primary" accept="application/zip" name="app.zip"/>
              <button type="button" class="workHours btn btn-lg btn-primary" name="button">每日工时统计</button>
              <button type="button" class="tooltipBtn btn btn-lg btn-primary" name="button">Tooltip</button>
              <button type="button" class="atomConfirm btn btn-lg btn-primary" name="button">atom.confirm</button>
              <button type="button" class="atomBeep btn btn-lg btn-primary" name="button">atom.beep</button>
              <input type="text" class="form-control" placeholder="placeholder">
            </div>
          </div>
        </div>
      `
    var dom = $(html)
    this.element.innerHTML = ''
    this.element.append(dom[0])

    dom.find('.zipinput').change((event)=>{
      var f = event.target.files[0];
      if (!f) return
      var r = new FileReader();
      r.onload = (event)=>{
        new JSZip().loadAsync(event.target.result)
          .then((zip)=>{
            var userlog = new UserLogView(zip)
            atom.workspace.getActivePane().addItem(userlog)
            atom.workspace.getActivePane().activateItem(userlog)
          })
      }
      r.readAsArrayBuffer(f);
    })
    dom.find('.workHours').click(()=>{
      var view = new WorkHoursView()
      atom.workspace.getActivePane().addItem(view)
      atom.workspace.getActivePane().activateItem(view)
    })
    this.disposables.add( atom.tooltips.add(dom.find('.tooltipBtn')[0], {title: 'This is a tooltip'}) )
    dom.find('.tooltipBtn').click(()=>{
      atom.notifications.addInfo('click tooltip button.')
    })
    dom.find('.atomConfirm').click(()=>{
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
    })
    dom.find('.atomBeep').click(()=>{
      atom.beep()
    })
    dom.find('.btns').append(new TextEditor({mini: true, placeholderText: 'Find in current buffer'}).element)
    var btn = $(`<button type="button" class="btn btn-primary">Notifications</button>`)
    dom.find('.btns').append(btn)
    btn.click(()=>{
      atom.notifications.addSuccess('addSuccess()')
      atom.notifications.addInfo('addInfo()')
      atom.notifications.addWarning('addWarning()')
      atom.notifications.addError('addError()')
      atom.notifications.addFatalError('addFatalError()')
    })
    btn = $(`<button type="button" class="btn btn-primary">Open in Dock</button>`)
    dom.find('.btns').append(btn)
    btn.click(()=>{
      const item = {
        element: document.createElement('div'),
        getTitle () { return 'My Fabulous Divl' },
        getDefaultLocation () { return 'bottom' },
      }
      atom.workspace.open(output)
    })
  }
}
