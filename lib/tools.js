'use babel';

import MainView from './main-view'
import { CompositeDisposable } from 'atom';

export default {
  toolsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    console.log('activate...');
    this.mainView = new MainView()

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tools:toggle': () => this.addItem()
    }));
  },

  deactivate() {
    console.log('deactivate...');
    this.subscriptions.dispose();
  },

  serialize() {
    console.log('serialize...');
    return {
    };
  },

  addItem() {
    atom.workspace.getActivePane().addItem(this.mainView)
    atom.workspace.getActivePane().activateItem(this.mainView)
  },

  config(){
    console.log('config().....');
  }

};
