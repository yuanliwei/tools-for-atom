'use babel';
/** @babel */
/** @jsx etch.dom */

import { Emitter, Disposable, CompositeDisposable, File } from 'atom'

export default class MainView {
  constructor() {
    this.element = document.createElement('div')
    this.disposables = new CompositeDisposable()
    this.element.classList.add('tools')
    this.initialize()
    this.registerScrollCommands()
  }

  getTitle() {
    return 'MainView'
  }

  destory(){
    console.log('on destory');
  }

  registerScrollCommands() {
      this.disposables.add(atom.commands.add(this.element, {
        'core:move-up': () => {
          console.log('upuppp');
          this.element.scrollTop -= document.body.offsetHeight / 20;
        },
        'core:move-down': () => {
          this.element.scrollTop += document.body.offsetHeight / 20;
        },
        'core:page-up': () => {
          this.element.scrollTop -= this.element.offsetHeight;
        },
        'core:page-down': () => {
          this.element.scrollTop += this.element.offsetHeight;
        },
        'core:move-to-top': () => {
          this.element.scrollTop = 0;
        },
        'core:move-to-bottom': () => {
          this.element.scrollTop = this.element.scrollHeight;
        }
      }));
    }

  initialize(){
    // super.initialize()
    var html = `
    <div class="container pt-5">
      <div class="row">
        <div class="col-12">
          <button type="button" class="btn btn-primary" name="button">Button</button>
        </div>
      </div>
    </div>

            <h1 class="message">MainView</h1>
        <hr>
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


      `
    this.element.innerHTML = html
    // window.ss=this
    // thiz = this
    // var s=scrollDown
    // setTimeout(thiz.scrollUp.apply(thiz),1300)
    // this.scrollDown()
  }
}
