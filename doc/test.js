var arr = []

var dg = (m)=>{
  arr.push(m.id)
  m.children.forEach((item)=>{ dg(item) })
}

dg(process.mainModule)
console.log(arr.join('\n'));
console.log('all size:',arr.length);
arr = [...new Set(arr)]
console.log('unique size:',arr.length);


var arr = atom.workspace.packageManager.getActivePackages().map((item)=>{
 return item.name
})
console.log(arr.join(' '));

var arr = atom.workspace.packageManager.getAvailablePackages().map((item)=>{
 return item.name
})
console.log(arr.join(' '));

sv = require(atom.workspace.packageManager.getAvailablePackages().filter((item)=>{
 return item.name == 'symbols-view'
})[0].path)
