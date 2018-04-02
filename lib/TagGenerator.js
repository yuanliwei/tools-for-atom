
const { BufferedProcess } = require('atom');
const path = require('path');

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
        new BufferedProcess({
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
