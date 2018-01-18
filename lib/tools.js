'use babel';

import ToolsView from './tools-view';
import MainView from './main-view'
import { CompositeDisposable } from 'atom';
import * as View from 'space-pen'

export default {
  toolsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.toolsView = new ToolsView(state.toolsViewState);
    this.mainView = new MainView()

    this.modalPanel = atom.workspace.addModalPanel({
      item: this.toolsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tools:toggle': () => this.addItem()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.toolsView.destroy();
  },

  serialize() {
    return {
      toolsViewState: this.toolsView.serialize()
    };
  },

  addItem() {
    atom.workspace.getActivePane().addItem(this.mainView)
    atom.workspace.getActivePane().activateItem(this.mainView)
  },

  toggle() {
    console.log('Tools was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
