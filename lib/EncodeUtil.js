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
  static encodeBase64(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code=Buffer.from(code).toString('base64')
      e.insertText(code)
    } else {
      code = e.getText()
      code=Buffer.from(code).toString('base64')
      e.setText(code)
    }
  }
  static encodeHex(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = new Buffer(code, 'utf-8').toString('hex');
      e.insertText(code)
    } else {
      code = e.getText()
      code = new Buffer(code, 'utf-8').toString('hex');
      e.setText(code)
    }
  }
  static encodeHtml(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const he = require('he');
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = he.encode(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = he.encode(code)
      e.setText(code)
    }
  }
  static encodeNative(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = native2ascii(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = native2ascii(code)
      e.setText(code)
    }
  }
  static encodeUnicode(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = toUnicode(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = toUnicode(code)
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
  static decodeBase64(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = Buffer.from(code, 'base64').toString('utf-8')
      e.insertText(code)
    } else {
      code = e.getText()
      code = Buffer.from(code, 'base64').toString('utf-8')
      e.setText(code)
    }
  }
  static decodeHex(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = new Buffer(code, 'hex').toString('utf8');
      e.insertText(code)
    } else {
      code = e.getText()
      code = new Buffer(code, 'hex').toString('utf8');
      e.setText(code)
    }
  }
  static decodeHtml(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const he = require('he');
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = he.decode(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = he.decode(code)
      e.setText(code)
    }
  }
  static decodeNative(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = ascii2native(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = ascii2native(code)
      e.setText(code)
    }
  }
  static decodeUnicode(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = fromUnicode(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = fromUnicode(code)
      e.setText(code)
    }
  }

  static decodeDate(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = formatDate(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = formatDate(code)
      e.setText(code)
    }
  }

}


/*
 * ascii2native
 */
var ascii2native = function(ascii) {
  var code, i, j, len, native1, words;
  words = ascii.split('\\u');
  native1 = words[0];
  for (i = j = 0, len = words.length; j < len; i = ++j) {
    code = words[i];
    if (!(i !== 0)) {
      continue;
    }
    native1 += String.fromCharCode(parseInt("0x" + (code.substr(0, 4))));
    if (code.length > 4) {
      native1 += code.substr(4, code.length);
    }
  }
  return native1;
};

/*
 * native2ascii
 */
var native2ascii = function(native_) {
  var ascii, char, charAscii, chars, code, i, j, len;
  chars = native_.split('');
  ascii = '';
  for (i = j = 0, len = chars.length; j < len; i = ++j) {
    char = chars[i];
    code = Number(chars[i].charCodeAt(0));
    if (code > 127) {
      charAscii = code.toString(16);
      charAscii = new String('0000').substr(charAscii.length, 4) + charAscii;
      ascii += '\\u' + charAscii;
    } else {
      ascii += chars[i];
    }
  }
  return ascii;
};

var toUnicode = function (str) {
  var codes = []
  for (var i = 0; i < str.length; i++) {
    codes.push(("000"+str.charCodeAt(i).toString(16)).slice(-4))
  }
  return "\\u"+codes.join("\\u");
}

var fromUnicode = function (str) {
  return unescape(str.replace(/\\/g, "%"));
}

var formatDate = function (dataValue) {
  return dataValue.replace(/(\d{13})|(\d{10})/g, function (val) {
    console.log(val);
    var date = parseInt(val)
    if (date == 2147483647) {
      // java中的Integer.MAX_VALUE
      return 'Integer.MAX_VALUE'
    }
    if (val.length == 10) {
      date *= 1000
    }
    return new Date(date).Format('yyyy-MM-dd hh:mm:ss.S');
  })
}
