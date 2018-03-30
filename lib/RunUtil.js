'use babel';

// TODO: runInThisContext
// const vm = require('vm');
// result = vm.runInThisContext(code)

const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const iconv = require('iconv-lite');

const RunOutputView = require('./run-script/RunOutputView');

export default class RunUtil {
  constructor() {
    var e=atom.workspace.getActiveTextEditor()
    if (!e) {
      atom.notifications.addWarning('not find ActiveTextEditor!')
      return
    }
    var code = e.getSelectedText()
    if (code.trim().length>0) {
      this.path = path.join(os.tmpdir(),`tmp-${Date.now()}.js`)
      fs.writeFileSync(this.path,code,'utf-8')
    } else {
      this.path = e.getPath()
    }
    if (!fs.existsSync(this.path)) {
      code = e.getText()
      this.path = path.join(os.tmpdir(),`tmp-${Date.now()}.js`)
      fs.writeFileSync(this.path,code,'utf-8')
    }

    var code = fs.readFileSync(this.path,'utf-8')
    if (code.includes(`'use view';`)) {
      var baseViewPath = path.posix.join(__dirname.replace(/\\/g,'/'),'/view/BaseView')
      var codeTmp = code.replace(`'use view';`, `const BaseView = require('${baseViewPath}');`)
      fs.writeFileSync(this.path,codeTmp, 'utf-8')
      var View = require(this.path);
      atom.workspace.open(new View())
      setTimeout(()=>{
        fs.writeFileSync(this.path,code, 'utf-8')
      },100)
    } else {
      this.runFile(this.path)
    }
  }

  runFile(path){
    if (!RunUtil.output) {
      var output = RunUtil.output = new RunOutputView()
      output.process = exec('cmd',{encoding :'buffer', maxBuffer: 200*1024})
      output.process.stdout.on('data',(data)=>{
        let out = iconv.decode(data, 'utf-8')
        // 编码不对试着用GBK编码
        if(out.indexOf('�') != -1){
          out = iconv.decode(data, 'gbk');
        }
        output.append(out)
      })
      output.process.stderr.on('data',(data)=>{
        let out = iconv.decode(data, 'utf-8')
        // 编码不对试着用GBK编码
        if(out.indexOf('�') != -1){
          out = iconv.decode(data, 'gbk');
        }
        output.append(out)
      })
    }
    atom.workspace.open(RunUtil.output)
    console.log(RunUtil.output.process.stdin.write);
    var buf = iconv.encode(`node "${this.path}"\n`, 'gbk');
    RunUtil.output.process.stdin.write(buf, 'buffer')
  }
}
