'use babel';

const { CompositeDisposable } = require('atom');
const $ = require('jquery');

class BaseView {
  constructor() {
    this.subscriptions = new CompositeDisposable();
    this.element = document.createElement('div')
    this.dom = $(this.element)
    this.initialize()
  }

  initialize(){
  }

  serialize(){
    return {}
  }

  showProgress(){
    this.hideProgress()
    this.progressView = $(`<div class='block' style='padding: 200px; display: flex; align-items: center;'>
    <progress class='inline-block' max='100' value='0' style='flex-grow: 1;'></progress>
    <span class='inline-block'>At 0%</span>
    </div>`)
    this.dom.append(this.progressView)
  }

  updateProgress(percent){
    if (!this.progressView) {
      this.showProgress()
    }
    this.progressView.find('progress').attr('value',percent)
    this.progressView.find('span').text(`At ${percent}%`)
  }

  hideProgress(){
    if (this.progressView) {
      this.progressView.remove()
    }
  }

  showLoading(){
    this.hideLoading()
    this.loadingView = $(`<div class='block' style='text-align: center;'>
    <span class='loading loading-spinner-large inline-block' style='margin: 200px;'></span>
    </div>`)
    this.dom.append(this.loadingView)
  }

  hideLoading(){
    if (this.loadingView) {
      this.loadingView.remove()
    }
  }

  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getTitle(){
    return 'BaseView'
  }
}

console.log('BaseView',BaseView);
module.exports = BaseView;
