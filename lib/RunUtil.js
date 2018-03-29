'use babel';

const { exec } = require('child_process');
const fs = require('fs');
const iconv = require('iconv-lite');

const RunOutputView = require('./run-script/RunOutputView');
const output = new RunOutputView()

export default class RunUtil {
  constructor() {
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    this.path = e.getPath()
    if (!fs.existsSync(this.path)) {
      atom.notifications.addWarning(`file "${this.path}" doesn't exists!`)
      return
    }
    this.runFile(this.path)
  }

  runFile(path){
    atom.workspace.open(output)
    var process = exec('cmd',{encoding :'binary', maxBuffer: 200*1024})
    process.stdout.on('data',(data)=>{
      let out = iconv.decode(data, 'utf-8')
      // 编码不对试着用GBK编码
      if(out.indexOf('�') != -1){
        out = iconv.decode(data, 'gbk');
      }
      output.append(out)
    })
    process.stderr.on('data',(data)=>{
      let out = iconv.decode(data, 'utf-8')
      // 编码不对试着用GBK编码
      if(out.indexOf('�') != -1){
        out = iconv.decode(data, 'gbk');
      }
      output.append(out)
    })
    process.stdin.write(`node "${this.path}"\n`)
  }
}
