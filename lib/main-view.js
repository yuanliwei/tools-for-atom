'use babel';

import { Emitter, Disposable, CompositeDisposable, File } from 'atom'
import { $ } from 'atom-space-pen-views';

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

  destory(){
    this.element.remove();
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
              <button type="button" class="alert btn btn-primary" name="button">Button</button>
              <button value="BUTTON">Button</button>
              <input type="button" value="BUTTON"/>
              <div class="btn is-color text-color">@text-color</div>
              <div class="is-color text-color-subtle">@text-color-subtle</div>
              <div class="is-color text-color-highlight">@text-color-highlight</div>
              <div class="is-color text-color-selected">@text-color-selected</div>
              <div class="is-color"></div>
              <div class="is-color text-info">@text-color-info</div>
              <div class="is-color text-success">@text-color-success</div>
              <div class="is-color text-warning">@text-color-warning</div>
              <div class="is-color text-error">@text-color-error</div>

              <div class="btn btn-lg btn-primary">btn-primary</div>
              <div class="btn btn-lg btn-success">btn-success</div>
              <div class="btn btn-lg btn-info">btn-info</div>
              <div class="btn btn-lg btn-warning">btn-warning</div>
              <div class="btn btn-lg btn-error">btn-error</div>
            </div>
          </div>
        </div>
      `
    var dom = $(html)
    this.element.innerHTML = ''
    this.element.append(dom[0])
    debugger
    dom.find('.alert').click(()=>{
      console.log('alert click');
      alert('sdfghj')
    })
  }
}
