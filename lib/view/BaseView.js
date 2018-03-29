'use babel';

import { CompositeDisposable } from 'atom';
const $ = require('jquery');

export default class BaseView {
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

  showLoading(){
    
  }

  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getTitle(){
    return 'BaseView'
  }
}
