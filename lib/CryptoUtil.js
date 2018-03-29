'use babel';

const crypto = require('crypto');

export default class CryptoUtil {
  static md5(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const hash = crypto.createHash('md5');
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      hash.update(code)
      code = hash.digest('hex')
      e.insertText(code)
    } else {
      code = e.getText()
      hash.update(code)
      code = hash.digest('hex')
      e.setText(code)
    }
  }
  static sha1(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const hash = crypto.createHash('sha1');
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      hash.update(code)
      code = hash.digest('hex')
      e.insertText(code)
    } else {
      code = e.getText()
      hash.update(code)
      code = hash.digest('hex')
      e.setText(code)
    }
  }
  static sha256(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const hash = crypto.createHash('sha256');
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      hash.update(code)
      code = hash.digest('hex')
      e.insertText(code)
    } else {
      code = e.getText()
      hash.update(code)
      code = hash.digest('hex')
      e.setText(code)
    }
  }
  static sha512(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const hash = crypto.createHash('sha512');
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      hash.update(code)
      code = hash.digest('hex')
      e.insertText(code)
    } else {
      code = e.getText()
      hash.update(code)
      code = hash.digest('hex')
      e.setText(code)
    }
  }
}
