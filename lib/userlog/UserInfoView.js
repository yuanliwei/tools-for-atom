'use babel';

import { Emitter, Disposable, CompositeDisposable, File } from 'atom'
const $ = require('jquery');
const HexZip = require('./HexZip');
const Utils = require('./Utils');
const XmlHandle = require('./XmlHandle');

export default class UserInfoView {
  constructor(zip) {
    this.zip = zip
    this.element = document.createElement('div')
    this.element.style.overflow='auto'
    this.element.classList.add('tools')
    this.element.classList.add('hljs')
    this.initialize()
  }

  getTitle() {
    return '用户信息'
  }

  serialize() {
  }

  initialize(){
    var html = `
    <div class="container pt-5">
      <div class="row">
        <h1>用户信息</h1>
        <div class="buttons col-12">
        </div>
        <div class="userInfoContainer col-12">
        </div>
      </div>
    </div>
    `
    var dom = $(html)
    this.element.innerHTML = ''
    this.element.append(dom[0])
    this.userInfoContainer = dom.find('.userInfoContainer')
    this.buttons = dom.find('.buttons')
  }

  parse(){
    const {userInfoContainer,zip} = this
    var authFile = zip.file('app/shared_prefs/com.up366.ismart.auth.xml')
    var settingFile = zip.file('app/shared_prefs/app_settings.xml')
    var textFile = zip.file('app/shared_prefs/app_text.xml')

    if (authFile) {
      return Promise.all([
        authFile.async('string'),
        textFile.async('string'),
        settingFile.async('string')])
        .then((results)=>{
          return this.handleUserInfo(results)
        })
      } else {
        return Promise.all([textFile.async('string'), settingFile.async('string')])
        .then((results)=>{
          return this.handleUserInfoV2(results)
        })
      }
    }

    handleUserInfo(results){
      const {userInfoContainer,buttons} = this
      var authXml = new XmlHandle(results[0])
      var textXml = new XmlHandle(results[1])

      var userInfo = {
        username: authXml.T('userName'),
        password: authXml.T('password'),
        isAuthed: authXml.V('isAuthed')
      }

      var user_info = HexZip.parse(textXml.T('user_info'))
      Object.assign(userInfo,JSON.parse(user_info))

      if (userInfo.photoUrl) {
        userInfoContainer.append(`<img src="${userInfo.photoUrl}" class="rounded img-fluid img-thumbnail col-6">`)
      } else { // 用户没有头像时显示的默认头像
        userInfo.photoUrl = 'https://s1.ax1x.com/2017/11/13/sq4ij.jpg'
        userInfoContainer.append(`<img src="${userInfo.photoUrl}" class="rounded img-fluid img-thumbnail col-6" style="max-width:300px!important">`)
      }

      userInfoContainer.append(JSON.block(userInfo))
      this.addDetailBtn(buttons,userInfo)
      this.removeLoading()

      return new Promise((resolve)=>{
        resolve(userInfo)
      })
    }

    handleUserInfoV2(results){
      const {userInfoContainer,buttons} = this
      var textXml = new XmlHandle(results[0])

      var authInfo = JSON.parse(HexZip.parse(textXml.T('UserAuthInfo')))

      var userInfo = {
        username: authInfo.userName,
        password: authInfo.password,
        isAuthed: authInfo.authed
      }

      var user_info = HexZip.parse(textXml.T('user_info'))
      Object.assign(userInfo,JSON.parse(user_info))

      if (userInfo.photoUrl) {
        userInfoContainer.append(`<img src="${userInfo.photoUrl}" class="rounded img-fluid img-thumbnail col-6">`)
      } else { // 用户没有头像时显示的默认头像
        userInfo.photoUrl = 'https://s1.ax1x.com/2017/11/13/sq4ij.jpg'
        userInfoContainer.append(`<img src="${userInfo.photoUrl}" class="rounded img-fluid img-thumbnail col-6" style="max-width:300px!important">`)
      }

      userInfoContainer.append(JSON.block(userInfo))
      this.removeLoading()
      this.addDetailBtn(buttons,userInfo)
      return new Promise((resolve)=>{
        resolve(userInfo)
      })
    }

    addDetailBtn(buttons,userInfo){
      let btn = $('<button type="button" class="btn btn-primary">详情</button>')
      buttons.append(btn)
      btn.click(()=>{
        atom.workspace.open('item:UserInfo').then((editor)=>{
          editor.shouldPromptToSave=()=>{return false;}
          editor.setGrammar(atom.grammars.grammarForScopeName('source.js'))
          editor.insertText(JSON.format(userInfo))
        })
      })
    }

    removeLoading(){
      console.warn('remove loading...');
    }

  }
