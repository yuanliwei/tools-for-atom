'use view';

const $ = require('jquery');

class OutsideView extends BaseView {

  initialize(){
    atom.notifications.addSuccess($.toString())
    this.dom.append(`<atom-panel class='padded'>
                      <div class="inset-panel">
                        <div class="panel-heading">An inset-panel heading</div>
                        <div class="panel-body padded">Some Content</div>
                      </div>
                    </atom-panel>`)
  }

  getTitle(){
    return 'OutsideView'
  }
}

module.exports = OutsideView;
