
const { TextEditor } = require('atom');

class RunOutputView extends TextEditor{

  constructor(){
    super({autoHeight: false})
  }

  append(text){
    if (!text) {
      return ;
    }
    var cursor=this.getLastCursor()
    cursor.moveToBottom()
    this.insertText(text)
    this.scrollToCursorPosition()
  }

  getTitle() {
    return 'output'
  }

  getURI() {
    return `tools-editor://output`;
  }

  shouldPromptToSave() {
    return false;
  }
}

module.exports = RunOutputView;
