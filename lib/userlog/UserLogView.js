'use babel';

import { Emitter, Disposable, CompositeDisposable, File } from 'atom'
import { $ } from 'atom-space-pen-views';

export default class UserLogView {
  constructor() {
    this.element = document.createElement('div')
    this.disposables = new CompositeDisposable()
    this.element.classList.add('tools')
    this.initialize()
  }

  getTitle() {
    return 'UserLog'
  }

  serialize() {
    console.log('on serialize');
  }

  initialize(){
    console.log('initialize....');
    var html = `
        <div class="container pt-5">
          <div class="row">
            <h1>UserLog</h1>
            <div class="col-12">
              <button type="button" class="showalert btn btn-primary" name="button">Button</button>
              <button type="button" class="btn btn-lg btn-primary">用户信息</button>
              <button type="button" class="btn btn-info">Info</button>
            </div>
          </div>
        </div>
      `
    var dom = $(html)
    this.element.innerHTML = ''
    this.element.append(dom[0])
    dom.find('.showalert').click(()=>{
      console.log('alert click');
      alert('sdfghj')
    })
  }
}
