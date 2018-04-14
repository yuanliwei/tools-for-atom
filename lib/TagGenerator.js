
const { BufferedProcess } = require('atom');
const path = require('path');
const iconv = require('iconv-lite');
class RawBuffer extends BufferedProcess {
  bufferStream (stream, onLines, onDone) {
    let buffered = ''

    stream.on('data', (data) => {
      if (this.killed) return
      let bufferedLength = buffered.length
      var buffer = new Buffer(data);
      let out = iconv.decode(data, 'utf-8')
      // 编码不对试着用GBK编码
      if(out.indexOf('�') != -1){
        out = iconv.decode(buffer, 'gbk');
      }
      buffered += out
      let lastNewlineIndex = data.lastIndexOf('\n')

      if (lastNewlineIndex !== -1) {
        let lineLength = lastNewlineIndex + bufferedLength + 1
        onLines(buffered.substring(0, lineLength))
        buffered = buffered.substring(lineLength)
      }
    })

    stream.on('close', () => {
      if (this.killed) return
      if (buffered.length > 0) onLines(buffered)
      onDone()
    })
  }
}

class TagGenerator {
  constructor(project, files) {
    this.project = project
    this.files=files
  }

  generate() {
    const {resourcePath} = atom.getLoadSettings();
    const packageRoot = path.join(`${resourcePath}.unpacked`, 'node_modules', 'symbols-view');
    const command = path.join(packageRoot, 'vendor', `ctags-${process.platform}`);
    const defaultCtagsFile = path.join(packageRoot, 'lib', 'ctags-config');
    const args = [`--options=${defaultCtagsFile}`, '--fields=+KS', '-nf', '-'];

    return new Promise((resolve) => {
      let results = [];
      let files = this.files
      let loopCount = 0
      let total = files.length
      let now = Date.now()
      let loop = ()=>{
        if (Date.now() - now > 700) {
          now = Date.now()
          atom.notifications.addInfo(`GenerateTags Progress : ${(((total - files.length)*100)/total).toFixed(2)}%`)
        }
        console.log('loopCount :',loopCount++);
        let newArgs = []
        Array.prototype.push.apply(newArgs, args)
        Array.prototype.push.apply(newArgs, files.splice(0,10))
        new RawBuffer({
          command: command,
          args: newArgs,
          stdout: (lines) => {
            for (const line of Array.from(lines.split('\n'))) {
              if (line.split('\t').length < 4) { continue }
              results.push(line.replace(this.project, ''))
            }
          },
          stderr(e) {
            console.error(e);
          },
          exit(code) {
            if (files.length == 0) {
              results.code = code
              resolve(results);
            } else {
              loop()
            }
          },
        });
      }
      loop()
    });
  }
}

module.exports = TagGenerator;
