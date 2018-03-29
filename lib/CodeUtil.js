'use babel';

const vkbeautify = require('vkbeautify');

export default class CodeUtil {
  static formatJSON(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.json(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.json(code)
      e.setText(code)
    }
  }
  static formatXML(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.xml(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.xml(code)
      e.setText(code)
    }
  }
  static formatCSS(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.css(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.css(code)
      e.setText(code)
    }
  }
  static formatSQL(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.sql(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.sql(code)
      e.setText(code)
    }
  }
  static formatJS(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const js_beautify = require('js-beautify');
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = js_beautify(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = js_beautify(code)
      e.setText(code)
    }
  }
  static minJSON(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.jsonmin(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.jsonmin(code)
      e.setText(code)
    }
  }
  static minXML(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.xmlmin(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.xmlmin(code)
      e.setText(code)
    }
  }
  static minCSS(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.cssmin(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.cssmin(code)
      e.setText(code)
    }
  }
  static minSQL(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = vkbeautify.sqlmin(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = vkbeautify.sqlmin(code)
      e.setText(code)
    }
  }
}
