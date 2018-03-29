'use babel';

const BaseView = require('./BaseView');
const $ = require('jquery');

export default class ChildView extends BaseView {

  initialize(){
    this.showLoading()
    setTimeout(()=>{
      this.hideLoading()
      this.showProgress()
      setTimeout(()=>{
        this.updateProgress(80)
      },1000)
    },2000)
  }

  getTitle(){
    return 'ChildView';
  }
}
