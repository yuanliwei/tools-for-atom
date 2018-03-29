'use babel';

import { Emitter, Disposable, CompositeDisposable, File, TextEditor } from 'atom'
const $ = require('jquery');

export default class RunOutputView {
  constructor() {
    this.editor = new TextEditor({autoHeight: false})
    this.element = this.editor.element
    this.editor.setGrammar(atom.grammars.grammarForScopeName('source.js'))
    this.initialize()
  }

  initialize(){

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
