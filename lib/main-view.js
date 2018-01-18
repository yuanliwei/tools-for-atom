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
    return 'MainView'
  }

  initialize(){
    var html = $(`
        <h1>MainView</h1>
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
      `)
    this.append(html)
    debugger
  }
}
