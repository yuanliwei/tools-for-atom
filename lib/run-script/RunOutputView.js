'use babel';

import { Emitter, Disposable, CompositeDisposable, File, TextEditor } from 'atom'
import { $ } from 'atom-space-pen-views';

export default class RunOutputView {
  constructor() {
    this.element = document.createElement('div')
    this.element.style.overflow='auto'
    this.disposables = new CompositeDisposable()
    this.element.classList.add('tools')
    this.editor = new TextEditor({})
    this.editor.element.style.height='100%'
    this.element.append(this.editor.element)
    this.initialize()

  }

  initialize(){

  }

  append(text){
    if (!text) {
      return ;
    }
    var cursor=this.editor.getLastCursor()
    this.element.scrollTop=this.element.scrollHeight
    cursor.moveToBottom()
    if (!(cursor.isAtEndOfLine() && cursor.isAtBeginningOfLine())) {
      this.editor.insertNewlineBelow()
    }
    this.editor.insertText(text)
  }

  getTitle() {
    return 'output'
  }

  getDefaultLocation () { return 'bottom' }
}
