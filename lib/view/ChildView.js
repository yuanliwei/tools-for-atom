'use babel';

const BaseView = require('./BaseView');
const $ = require('jquery');

export default class ChildView extends BaseView {

  initialize(){
    this.dom.append(`<span class='loading loading-spinner-large inline-block'></span>`)
  }

  getTitle(){
    return 'ChildView';
  }
}
