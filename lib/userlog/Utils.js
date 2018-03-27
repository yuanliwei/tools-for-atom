'use babel';

import { $ } from 'atom-space-pen-views';

const hljs = require('highlight.js');

const js_beautify = require('js-beautify');

/*
把毫秒或秒格式的时间转换为可读的字符串形式
*/
Date.str = (time_)=> {
  var time = parseInt(time_)
  if (!time) return time_;
  if (time > 15104725270) {
    var d = new Date(time)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  } else {
    var d = new Date(time*1000)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }
};

/*
格式化json字符串或js对象为格式化好的json字符串
*/
JSON.format = (arg)=>{
  if (typeof arg != "string") {
    arg = JSON.stringify(arg)
  }
  return js_beautify(arg, {})
}

/*
生成带格式的代码块dom对象
*/
JSON.block = (obj)=> {
  var block = $('<pre><code class="json" style="font-size:2em">'+JSON.format(obj)+'<code></pre>')
  hljs.highlightBlock(block[0]);
  return block
}
