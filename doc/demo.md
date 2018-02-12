# package lifecycle
```javascript
activate(state)
initialize(state)
deactivate()
serialize()

config //: 该对象中可以为包自定义配置。
activate(state)//：该方法是在包激活的时候调用。如果你的包实现了 serialize() 方法，那么将会传递上次窗口序列化的 state 数据给该方法
initialize(state)//：( Atom1.14 以上版本可用 ) 类似于 activate(), 但在它之前调用。intialize() 是在你的发序列化器或视图构建之前调用，activate() 是在工作区环境都已经准备后调用。
serialize()//：窗口关闭后调用，允许返回一个组件状态的 JSON 对象。当你下次窗口启动时传递给 activate() 方法。
deactivate()//：当窗口关闭时调用。如果包正在使用某些文件或其他外部资源，将在这里释放它们。

```

# Event subscriptions
```javascript
// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
this.subscriptions = new CompositeDisposable();

// Register command that toggles this view
this.subscriptions.add(atom.commands.add('atom-workspace', {
  'tools:toggle': () => this.addItem()
}));

// dispose()
this.subscriptions.dispose();

```

# Event disposables
```javascript
this.disposables = new CompositeDisposable()
this.disposables.add(atom.commands.add(this.element, {
  'core:move-up': () => {
    console.log('upuppp');
  }
}));

```

# add item view
```javascript
atom.workspace.getActivePane().addItem(this.mainView)
atom.workspace.getActivePane().activateItem(this.mainView)
```

# item demo
```javascript
'use babel';

import { Emitter, Disposable, CompositeDisposable, File } from 'atom'

export default class MainView {
  constructor() {
    this.element = document.createElement('div')
    this.disposables = new CompositeDisposable()
    this.element.classList.add('tools')
    this.initialize()
    this.registerScrollCommands()
  }

  getTitle() {
    return 'Tools'
  }

  destory(){
    console.log('on destory');
    this.element.remove();
  }

  serialize() {
    console.log('on serialize');
  }

  registerScrollCommands() {
      this.disposables.add(atom.commands.add(this.element, {
        'core:move-up': () => {
          this.element.scrollTop -= document.body.offsetHeight / 20;
        }
      }));
    }

  initialize(){
    // super.initialize()
    var html = `
        <div class="btn btn-lg btn-primary">btn-primary</div>
      `
    this.element.innerHTML = html
  }
}

```

# modalPanel
```javascript
// new
this.modalPanel = atom.workspace.addModalPanel({
  item: this.toolsView.getElement(),
  visible: false
});

// destory
this.modalPanel.destroy();

// visible&invisible
this.modalPanel.isVisible() ? this.modalPanel.hide() : this.modalPanel.show()

```
