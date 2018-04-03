- `atom.workspace.packageManager.getAvailablePackages()`
- `atom.workspace.packageManager.getActivePackages()`
- `process.mainModule`
- `process.mainModule.children`

- `atom-workspace` `atom-text-editor`
```javascript
this.subscriptions.add(atom.commands.add('atom-workspace', {
  'core:move-down': () => { this.element.scrollTop+=10 }
}));
```
