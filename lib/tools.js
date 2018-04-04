'use babel';

import MainView from './main-view'
import { CompositeDisposable } from 'atom';
const url = require('url');
const RunUtil = require('./RunUtil');
const CodeUtil = require('./CodeUtil');
const CryptoUtil = require('./CryptoUtil');
const EncodeUtil = require('./EncodeUtil');
const EditorHandler = require('./editor/EditorHandler');

export default {

  activate(state) {
    this.mainView = new MainView()

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tools:main': () => this.addMainItem(),
      'tools:generateTags': () => CodeUtil.generateTags()
    }));

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'tools:run': () => RunUtil.run(),
      'tools:pasteImage': () => EditorHandler.pasteImage(),
      'tools:JSON format': () => CodeUtil.formatJSON(),
      'tools:JS format': () => CodeUtil.formatJS(),
      'tools:CSS format': () => CodeUtil.formatCSS(),
      'tools:SQL format': () => CodeUtil.formatSQL(),
      'tools:XML format': () => CodeUtil.formatXML(),
      'tools:SQL min': () => CodeUtil.minSQL(),
      'tools:XML min': () => CodeUtil.minXML(),
      'tools:CSS min': () => CodeUtil.minCSS(),
      'tools:JSON min': () => CodeUtil.minJSON(),
      'tools:Crypto md5': () => CryptoUtil.md5(),
      'tools:Crypto sha1': () => CryptoUtil.sha1(),
      'tools:Crypto sha256': () => CryptoUtil.sha256(),
      'tools:Crypto sha512': () => CryptoUtil.sha512(),
      'tools:Encode encodeUri': () => EncodeUtil.encodeUri(),
      'tools:Encode decodeUri': () => EncodeUtil.decodeUri(),
      'tools:Encode encodeBase64': () => EncodeUtil.encodeBase64(),
      'tools:Encode encodeHex': () => EncodeUtil.encodeHex(),
      'tools:Encode encodeHtml': () => EncodeUtil.encodeHtml(),
      'tools:Encode encodeNative': () => EncodeUtil.encodeNative(),
      'tools:Encode encodeUnicode': () => EncodeUtil.encodeUnicode(),
      'tools:Encode encodeEscape': () => EncodeUtil.encodeEscape(),
      'tools:Encode decodeBase64': () => EncodeUtil.decodeBase64(),
      'tools:Encode decodeHex': () => EncodeUtil.decodeHex(),
      'tools:Encode decodeHtml': () => EncodeUtil.decodeHtml(),
      'tools:Encode decodeNative': () => EncodeUtil.decodeNative(),
      'tools:Encode decodeUnicode': () => EncodeUtil.decodeUnicode(),
      'tools:Encode decodeUnescape': () => EncodeUtil.decodeUnescape(),
      'tools:Encode decodeDate': () => EncodeUtil.decodeDate(),
      'tools:Encode decodeCoffee': () => EncodeUtil.decodeCoffee(),
      'tools:Encode decodeLess': () => EncodeUtil.decodeLess(),
      'tools:Encode translate_zh': () => EncodeUtil.translate('zh'),
      'tools:Encode translate_en': () => EncodeUtil.translate('en')
    }));

    this.subscriptions.add(atom.workspace.addOpener(function(uriToOpen) {
      const {protocol} = url.parse(uriToOpen)
      if (protocol !== 'tools-editor:') { return; }
      const RunOutputView = require('./run-script/RunOutputView');
      return new RunOutputView();
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return { };
  },

  addMainItem() {
    atom.workspace.getActivePane().addItem(this.mainView)
    atom.workspace.getActivePane().activateItem(this.mainView)
  },

  config: {
    imagesDir: {
      title: '图片文件夹',
      description: '图片文件夹...',
      type: 'string',
      "default": 'images'
    }
  }
};
