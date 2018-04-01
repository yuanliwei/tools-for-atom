
const { BufferedProcess, Point } = require('atom');
const path = require('path');

class TagGenerator {
  constructor(project, filePath) {
    this.project = project
    this.path = filePath;
    // this.scopeName = scopeName;
  }

  generate() {
    const {resourcePath} = atom.getLoadSettings();
    const packageRoot = path.join(`${resourcePath}.unpacked`, 'node_modules', 'symbols-view');
    const command = path.join(packageRoot, 'vendor', `ctags-${process.platform}`);
    const defaultCtagsFile = path.join(packageRoot, 'lib', 'ctags-config');
    const args = [`--options=${defaultCtagsFile}`, '--fields=+KS'];

    args.push('-nf', '-', this.path);

    return new Promise((resolve) => {
      let results = [];
      return new BufferedProcess({
        command: command,
        args: args,
        stdout: (lines) => {
          for (const line of Array.from(lines.split('\n'))) {
            if (line.split('\t').length < 4) { continue }
            results.push(line.replace(this.project,''));
          }
        },
        stderr() {},
        exit() { resolve(results); },
      });
    });
  }
}

module.exports = TagGenerator;
