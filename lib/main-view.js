'use babel';

import { Emitter, Disposable, CompositeDisposable, File } from 'atom'
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

  initialize(){
    // super.initialize()
    console.log('initialize....');

    var html = `
        <div class="container pt-5">
          <div class="row">
            <h1>MainView</h1>
            <hr>
            <div class="col-12">
              <input type="file" class="zipinput btn btn-primary" accept="application/zip" name="app.zip"/>
              <button type="button" class="workHours btn btn-lg btn-primary" name="button">每日工时统计</button>
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
  }
}
