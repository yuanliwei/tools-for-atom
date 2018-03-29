'use babel';

export default class EncodeUtil {
  static encodeUri(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = encodeURIComponent(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = encodeURIComponent(code)
      e.setText(code)
    }
  }

  static decodeUri(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = decodeURIComponent(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = decodeURIComponent(code)
      e.setText(code)
    }
  }
}
