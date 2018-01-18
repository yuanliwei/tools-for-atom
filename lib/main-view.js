'use babel';

const { ScrollView, SelectListView, $ } = require('atom-space-pen-views');

export default class MainView extends ScrollView {
  constructor() {
    super()
  }

  static content(){
    return this.div()
  }

  getTitle(){
    return 'TITLE'
  }

  initialize(){
    this.text('wertyui')
  }
}
