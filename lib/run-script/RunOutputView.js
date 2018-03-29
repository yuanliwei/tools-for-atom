'use babel';

import { Emitter, Disposable, CompositeDisposable, File, TextEditor } from 'atom'
import { $ } from 'atom-space-pen-views';

export default class RunOutputView {
  constructor() {
    // this.element = document.createElement('atom-text-editor')
    // this.editor = this.element.getModel()
    // this.editor = new TextEditor()
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

    atom.notifications.addInfo('autoHeight:'+this.editor.autoHeight)

  }

  getTitle() {
    return 'output'
  }

  getDefaultLocation () { return 'bottom' }
}
