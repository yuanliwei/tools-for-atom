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
    var v = new MainView()
    atom.workspace.getActivePane().addItem(v)
    atom.workspace.getActivePane().activateItem(v)

    this.modalPanel = atom.workspace.addModalPanel({
      item: this.toolsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tools:toggle': () => this.toggle()
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

  toggle() {
    console.log('Tools was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
