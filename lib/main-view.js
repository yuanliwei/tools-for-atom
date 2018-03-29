'use babel';

import { TextEditor } from 'atom'
const $ = require('jquery');

const JSZip = require('jszip');
import UserLogView from './userlog/UserLogView'
import WorkHoursView from './userlog/WorkHoursView'
import BaseView from './view/BaseView'

export default class MainView extends BaseView {

  getTitle() {
    return 'Tools'
  }

  initialize(){
    const {dom} = this
    dom.css('padding','40px')
    dom.html(`<div class="block">
      <label><h1>MainView</h1></label>
      <hr>
      <div class="btns block"> </div>
    </div>`)
    var btns = dom.find('.btns')
    this.addZipBtn(btns)
    this.addWorkHoursBtn(btns)
    this.addTooltipBtn(btns)
    this.addAtomConfirmBtn(btns)
    this.addBeepBtn(btns)
    this.addTextEditor(btns)
    this.addNotificationsBtn(btns)
    this.addOpenInDockBtn(btns)
    this.addOpenBaseViewBtn(btns)
    this.addOpenChildViewBtn(btns)
  }

  addZipBtn(btns){
    var btn = $(`<input type="file" class="btn-lg" accept="application/zip"/>`)
    btns.append(btn)
    btn.change((event)=>{
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
  }
  addWorkHoursBtn(btns){
    var btn = $(`<button class="workHours btn btn-lg">每日工时统计</button>`)
    btns.append(btn)
    btn.click(()=>{
      var view = new WorkHoursView()
      atom.workspace.getActivePane().addItem(view)
      atom.workspace.getActivePane().activateItem(view)
    })
  }
  addTooltipBtn(btns){
    var btn = $(`<button class="tooltipBtn btn btn-lg">Tooltip</button>`)
    btns.append(btn)
    this.subscriptions.add( atom.tooltips.add(btn[0], {title: 'This is a tooltip'}) )
    btn.click(()=>{
      atom.notifications.addInfo('click tooltip button.')
    })
  }
  addAtomConfirmBtn(btns){
    var btn = $(`<button class="atomConfirm btn btn-lg">atom.confirm</button>`)
    btns.append(btn)
    this.subscriptions.add( atom.tooltips.add(btn[0], {title: 'This is a tooltip'}) )
    btn.click(()=>{
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
  }
  addBeepBtn(btns){
    var btn = $(`<button class="atomBeep btn btn-lg">atom.beep</button>`)
    btns.append(btn)
    this.subscriptions.add( atom.tooltips.add(btn[0], {title: 'This is a tooltip'}) )
    btn.click(()=>{
      atom.beep()
    })
  }
  addTextEditor(btns){
    // <input class='input-text' type='text' placeholder='Text'>
    // <input class='input-search' type='search' placeholder='Search'>
    // <textarea class='input-textarea' placeholder='Text Area'></textarea>
    btns.append(new TextEditor({mini: true, placeholderText: 'Find in current buffer'}).element)
  }
  addNotificationsBtn(btns){
    var btn = $(`<button type="button" class="btn btn-primary">Notifications</button>`)
    btns.append(btn)
    btn.click(()=>{
      atom.notifications.addSuccess('addSuccess()')
      atom.notifications.addInfo('addInfo()')
      atom.notifications.addWarning('addWarning()')
      atom.notifications.addError('addError()')
      atom.notifications.addFatalError('addFatalError()')
    })
  }
  addOpenInDockBtn(btns){
    var btn = $(`<button type="button" class="btn btn-primary">Open in Dock</button>`)
    btns.append(btn)
    btn.click(()=>{
      const item = {
        element: document.createElement('div'),
        getTitle () { return 'My Fabulous Divl' },
        getDefaultLocation () { return 'bottom' },
      }
      atom.workspace.open(item)
    })
  }
  addOpenBaseViewBtn(btns){
    var btn = $(`<button type="button" class="btn btn-primary">Open BaseView</button>`)
    btns.append(btn)
    btn.click(()=>{
      var BaseView = require('./view/BaseView');
      atom.workspace.open(new BaseView())
    })
  }
  addOpenChildViewBtn(btns){
    var btn = $(`<button type="button" class="btn btn-primary">Open ChildView</button>`)
    btns.append(btn)
    btn.click(()=>{
      var ChildView = require('./view/ChildView');
      atom.workspace.open(new ChildView())
    })
  }
}
