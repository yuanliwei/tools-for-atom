'use babel';

import { Emitter, Disposable, CompositeDisposable, File } from 'atom'
import { $ } from 'atom-space-pen-views';

export default class ZipFileListView {
  constructor(zip) {
    this.zip = zip
    this.element = document.createElement('div')
    this.element.style.overflow='auto'
    this.disposables = new CompositeDisposable()
    this.element.classList.add('tools')
    this.initialize()
  }

  getTitle() {
    return '用户日志文件列表'
  }

  serialize() {
    console.log('on serialize');
  }

  initialize(){
    console.log('initialize....');
    var html = `
        <div class="container pt-5">
          <div class="row">
            <h1>用户日志文件列表</h1>
            <div class="fileList col-12">
            </div>
          </div>
        </div>
      `
    var dom = $(html)
    this.element.innerHTML = ''
    this.element.append(dom[0])
    this.fileListContent = dom.find('.fileList')
    this.buildZipFileList()

  }

  buildZipFileList(){
    const {fileListContent,zip} = this
    var ul = $('<ul></ul>')
    for(let key in zip.files){
      let li = $('<li><h3><a href="#">'+key+'</a></h3></li>')
      li.click((e)=>{
        zip.file(key).async('uint8array').then((buffer)=>{
          this.downloadFile(key, buffer)
        })
      })
      ul.append(li)
    }
    this.removeLoading()
    fileListContent.append(ul)
  }

  removeLoading(){
    console.warn('remove loading...');
  }

  /*
  下载文件
  */
  downloadFile(key, buffer){
    var filename = key
    var shortName = filename.substr(filename.lastIndexOf('/')+1)
    var blob = new Blob([buffer]);
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = shortName;
    a.onclick = function() {
      setTimeout(function() {
        window.URL.revokeObjectURL(a.href);
      }, 1500);
    };
    a.click();
  }
}
