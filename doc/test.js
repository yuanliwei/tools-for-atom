'use view';

const fs = require('fs');

class PasteImg extends BaseView{
  initialize(){
    this.dom.append(fs.readFileSync('C:/Users/y/github/tools/test/test.html','utf-8'))
    console.log("this.dom.find('#pasteImg')", this.dom.find('#pasteImg'));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'core:paste': (a,b,c) => {
        console.log('core:paste', a,b,c);
        debugger
       }
    }));
  }

  getTitle(){
    return 'PasteImg';
  }
}

module.exports = PasteImg;
