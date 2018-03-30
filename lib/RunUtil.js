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
    console.log(code);
    if (code.includes(`require.main.paths.push('C:/Users/y/AppData/Local/atom/app-1.25.0/resources/app.asar/static/node_modules')
require.main.paths.push('C:/Users/y/AppData/Local/atom/app-1.25.0/resources/app.asar/node_modules')
require.main.paths.push('C:/Users/y/AppData/Local/atom/app-1.25.0/resources/node_modules')
 const BaseView = require('C:/Users/y/github/tools/lib/view/BaseView');`)) {
      console.log(`includes 111111111111`);

      var baseViewPath = path.posix.join(__dirname.replace(/\\/g,'/'),'/view/BaseView')
      console.log('require.main.paths',require.main.paths);
      var paths = require.main.paths.map((item)=>{
        return `require.main.paths.push('${item.replace(/\\/g,'/')}')`
      })
      console.log('paths',paths);
      var codeTmp = code.replace(`'use view model';`,
      `${paths.join('\n')}\n const BaseView = require('${baseViewPath}');`)

      console.log(`codeTmp 111111111111:`+codeTmp);
      fs.writeFileSync(this.path,codeTmp, 'utf-8')
      setTimeout(()=>{
        // fs.writeFileSync(this.path,code, 'utf-8')
      },500)
    }
console.log(require.main.paths);
    // console.log(require);
/*
    const BaseView = require('C:/Users/y/github/tools/lib/view/BaseView');
    console.log('asdfghjklcvbn');
    console.log(BaseView);

    'use view model';
    console.log('asdfghjklcvbn');
    console.log(BaseView);
*/
    this.runFile(this.path)
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
