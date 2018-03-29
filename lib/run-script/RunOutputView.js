'use babel';

import { TextEditor } from 'atom'
const $ = require('jquery');
const BaseView = require('../view/BaseView');

export default class RunOutputView extends BaseView{

  initialize(){
    this.editor = new TextEditor({autoHeight: false})
    this.editor.setGrammar(atom.grammars.grammarForScopeName('source.js'))
    this.editor.element.style.cssText='position: absolute; top: 0; right: 0; bottom: 0; left: 0;'
    this.dom.append(this.editor.element)
  }

  append(text){
    if (!text) {
      return ;
    }
    var cursor=this.editor.getLastCursor()
    cursor.moveToBottom()
    if (!(cursor.isAtEndOfLine() && cursor.isAtBeginningOfLine())) {
      this.editor.insertNewlineBelow()
    }
    this.editor.insertText(text)
    this.editor.scrollToCursorPosition()
  }

  getTitle() {
    return 'output'
  }

  getDefaultLocation () { return 'bottom' }
}
