
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

    Array.prototype.push.apply(args, this.files)
    return new Promise((resolve) => {
      let results = [];
      new BufferedProcess({
        command: command,
        args: args,
        stdout: (lines) => {
          for (const line of Array.from(lines.split('\n'))) {
            if (line.split('\t').length < 4) { continue }
            results.push(line.replace(this.project, ''))
          }
        },
        stderr(e) { console.error(e); },
        exit(code) {
          results.code = code
          resolve(results);
        },
      });
    });
  }
}

module.exports = TagGenerator;
