// Ctrl+P : 在控制台中搜索文件

global.devDir = 'C:\\Users\\y\\github\\tools\\'
global.ModuleBK = Module
ModuleBK.prototype.require=function (module) {
  const absoluteFilePath = ModuleBK._resolveFilename(module, this, false)
  let relativeFilePath = path.relative(entryPointDirPath, absoluteFilePath)
  if (process.platform === 'win32') {
    relativeFilePath = relativeFilePath.replace(/\\/g, '/')
  }
  let cachedModule = snapshotResult.customRequire.cache[relativeFilePath]
  if(absoluteFilePath.startsWith(global.devDir)&&!absoluteFilePath.includes('node_modules')){
    console.info('no cache file : '+absoluteFilePath);
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
