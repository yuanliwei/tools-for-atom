'use babel';

const pako = require('pako');
const FileBuffer = require('./FileBuffer');

/*
  解析zip格式hex字符串的工具类
*/
export default class HexZip {
  static parse(hexStr) {
    var i = 0
    var bytes = new Uint8Array(hexStr.length / 2)

    for (i = 0; i < hexStr.length; i += 2) {
      bytes[i / 2] = parseInt(hexStr[i] + hexStr[i + 1], 16)
    }

    var file = new FileBuffer(bytes)
    file.seek(8, 'SEEK_SET')
    var comptype = file.readBuffer(2)
    file.seek(12, 'SEEK_END')
    var crc = file.readBuffer(4)
    var compressSize = file.readBuffer(4)
    var unCompressSize = file.readBuffer(4)
    file.seek(8, 'SEEK_END')
    var compressSizeInt = file.readInt4()
    var unCompressSizeInt = file.readInt4()

    var gz = new Uint8Array(18 + compressSizeInt)

    this.copy([0x1f, 0x8b, comptype[0]], gz, 0, 0, 10)
    this.copy(bytes, gz, 0x1f, 0x0a, compressSizeInt)
    this.copy(crc, gz, 0, 10 + compressSizeInt, 4)
    this.copy(unCompressSize, gz, 0, 10 + compressSizeInt + 4, 4)

    return new TextDecoder('utf-8').decode(pako.ungzip(gz))
  }

  static copy(src, dest, srcStart, destStart, length) {
    for (var i = 0; i < length; i++) {
      dest[destStart + i] = src[srcStart + i]
    }
  }
}
