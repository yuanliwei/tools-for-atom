// Ctrl+P : 在控制台中搜索文件

global.ModuleBK = Module
ModuleBK.prototype.require=function (module) {
  const absoluteFilePath = ModuleBK._resolveFilename(module, this, false)
  let relativeFilePath = path.relative(entryPointDirPath, absoluteFilePath)
  if (process.platform === 'win32') {
    relativeFilePath = relativeFilePath.replace(/\\/g, '/')
  }
  let cachedModule = snapshotResult.customRequire.cache[relativeFilePath]
  if(absoluteFilePath.includes('WorkHoursView')){
    cachedModule = ModuleBK._cache[absoluteFilePath];
    delete ModuleBK._cache[absoluteFilePath]
    cachedModule = false
  }
  if (!cachedModule) {
    cachedModule = {exports: ModuleBK._load(module, this, false)}
    snapshotResult.customRequire.cache[relativeFilePath] = cachedModule
  }
  return cachedModule.exports
}
