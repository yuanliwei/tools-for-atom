'use babel';

const $ = require('jquery');

const ZipFileListView = require('./ZipFileListView');
const UserInfoView = require('./UserInfoView');
const UserDbParse = require('./UserDbParse');
const UploadQueue = require('./UploadQueue');

export default class UserLogView {
  constructor(zip) {
    this.zip = zip
    this.element = document.createElement('div')
    this.element.classList.add('tools')
    this.initialize()
  }

  getTitle() {
    return 'UserLogView'
  }

  serialize() {
    console.log('on serialize');
  }

  initialize(){
    console.log('initialize....');
    var html = `
        <div class="container pt-5">
          <div class="row">
            <h1>UserLogView</h1>
            <div class="logbuttons col-12">
              <button class="fileList btn btn-lg btn-primary">用户日志文件列表</button>
              <button class="userInfo btn btn-lg btn-primary">用户信息</button>
            </div>
          </div>
        </div>
      `
    this.dom = $(html)
    this.element.innerHTML = ''
    this.element.append(this.dom[0])
    this.sendToHandles()

  }

  sendToHandles(){
    const {dom, zip} = this

    var userInfoView = new UserInfoView(zip)

    dom.find('.fileList').click(()=>{
      var view = new ZipFileListView(zip)
      atom.workspace.getActivePane().addItem(view)
      atom.workspace.getActivePane().activateItem(view)
    })
    dom.find('.userInfo').click(()=>{
      atom.workspace.getActivePane().addItem(userInfoView)
      atom.workspace.getActivePane().activateItem(userInfoView)
    })
    userInfoView.parse().then((user)=>{
      return new UserDbParse(zip, user).parse()
    }).then((userDb)=>{
      console.log('userDb',userDb);
      this.addUploadQueueButton(userDb)
    })
  }

  addUploadQueueButton(userDb){
    const {dom, zip} = this
    var btn = $(`<button class="btn btn-lg btn-primary">上传队列</button>`)
    dom.find('.logbuttons').append(btn)
    btn.click(()=>{
      var view = new UploadQueue(userDb.db, userDb.user)
      atom.workspace.getActivePane().addItem(view)
      atom.workspace.getActivePane().activateItem(view)
    })
  }
}
