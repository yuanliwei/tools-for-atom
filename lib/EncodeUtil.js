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
  static encodeEscape(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = escape(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = escape(code)
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
  static decodeUnescape(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }

    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = unescape(code)
      e.insertText(code)
    } else {
      code = e.getText()
      code = unescape(code)
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

  static decodeCoffee(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const coffee = require('coffee-script')
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      code = coffee.compile(code, {bare: true})
      e.insertText(code)
    } else {
      code = e.getText()
      code = coffee.compile(code, {bare: true})
      e.setText(code)
    }
  }

  static decodeLess(){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const less = require('less')
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      less.render(code, (err, output)=>{
        if (err) {
          console.error(err);
          atom.notifications.addFatalError(err.stack)
          return
        }
        code = output.css
        e.insertText(code)
      })
    } else {
      code = e.getText()
      less.render(code, (err, output)=>{
        if (err) {
          console.error(err);
          atom.notifications.addFatalError(err.stack)
          return
        }
        code = output.css
        e.setText(code)
      })
    }
  }

  static translate(lang){
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    const less = require('less')
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      translate(lang, code, (err, output)=>{
        if (err) {
          console.error(err);
          atom.notifications.addFatalError(err.message, { detail: err.stack })
          return
        }
        code = output
        e.insertText(code)
      })
    } else {
      code = e.getText()
      translate(lang, code, (err, output)=>{
        if (err) {
          console.error(err);
          atom.notifications.addFatalError(err.message, { detail: err.stack })
          return
        }
        code = output
        e.setText(code)
      })
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
  const moment = require('moment');
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
    return moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
  })
}

/*
  百度翻译
*/
var translate = (lang, textString, callback)=>{
  const querystring = require('querystring');
  const http = require('http');
  const url = require('url');

  var MD5 = (text)=>{
    const crypto = require('crypto');
    const hash = crypto.createHash('md5');
    hash.update(text)
    code = hash.digest('hex')
    return code
  }

  var appid = '2015063000000001';
  var key = '12345678';
  var salt = Date.now();
  var matches = textString.split('\n').map((item)=>{
    return item.trim()
  }).filter((item)=>{
    return item.length > 0
  })
  if (!matches) {
    callback(null, textString)
    return
  }
  console.log('translate words:'+matches.length);
  var query = matches.join('\n');
  var from = 'auto';
  var to = lang;
  var str1 = appid + query + salt +key;
  var sign = MD5(str1);

  var postData = querystring.stringify({
    q: query,
    appid: appid,
    salt: salt,
    from: from,
    to: to,
    sign: sign
  })

  const options = url.parse('http://api.fanyi.baidu.com/api/trans/vip/translate')
  options.port = 80
  options.method = 'POST'
  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }

  const req = http.request(options, (res) => {
    var buffer = []
    res.on('data', (d) => {
      buffer.push(d)
    });
    res.on('end', () => {
      var result = JSON.parse(Buffer.concat(buffer).toString('utf-8'))
      if (result.error_code) {
        callback(new Error(`${result.error_msg}\n${JSON.stringify(result)}`))
      } else {
        let map = {}
        result.trans_result.forEach((item)=>{
         map[item.src] = ascii2native(item.dst)
        })
        callback(null, textString.split('\n').map((item)=>{
          let k = item.trim()
          let v = map[k]
          if (v) {
            return item.replace(k,v);
          } else {
            return item
          }
        }).join("\n"))
      }
    });
  });
  req.on('error', (e) => {
    console.error(e);
    callback(e)
  });
  req.write(postData);
  req.end();

}
