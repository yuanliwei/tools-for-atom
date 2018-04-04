class EditorHandler {
  static pasteImage(){
    const clipboard = require('clipboard');
    const fs = require('fs');
    const path = require('path');
    var e = atom.workspace.getActiveTextEditor()
    if (!e) { return ; }
    switch (e.getGrammar().name) {
      case "GitHub Markdown":
        break;
      default:
        break;
    }

    var clipboardImage = clipboard.readImage()
    if (clipboardImage.isEmpty()) { return ; }
    var projectDir = atom.workspace.project.rootDirectories[0].path
    var filename = `${Date.now()}.png`
    var destFile = path.join(projectDir, 'images', filename)
    if(!fs.existsSync(path.join(projectDir, 'images'))) {
      fs.mkdirSync(path.join(projectDir, 'images'))
    }

    fs.writeFileSync(destFile, clipboardImage.toPng())

    var a = e.getPath()
    var b = projectDir
    var m = a.replace(b).match(/[\\\/]/g)
    var count = 0
    if (m) { count = m.length-1 }
    var prefix = '../'.repeat(count)
    var relDestFile = path.join(prefix, 'images', filename)

    if (e.getSelectedText().trim().length > 0) {
      filename = e.getSelectedText().trim()
    }

    switch (e.getGrammar().name) {
      case "GitHub Markdown":
        e.insertText(`![${filename}](${relDestFile})`)
        break;
      default:
        e.insertText(relDestFile)
        break;
    }
  }
}

module.exports = EditorHandler;
