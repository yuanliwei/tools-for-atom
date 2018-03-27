'use babel';

/*
  读取文件字节的工具类，包含读取指定字节数方法、定位方法、读取Int2，读取Int4等方法
*/
export default class FileBuffer {
    constructor(buffer) {
        this.buffer = buffer
        this.size = buffer.length
        this.pos = 0
    }

    readSign() {
        var arr = new Uint8Array(4)
        for (var i = 0; i < 4; i++) {
            arr[i] = this.buffer[this.pos + i]
        }
        this.pos += 4
        return arr;
    }

    readBuffer(count) {
        var arr = new Uint8Array(count)
        for (var i = 0; i < count; i++) {
            arr[i] = this.buffer[this.pos + i]
        }
        this.pos += count
        return arr;
    }

    readInt2() {
        var i = this.pos;
        var result = this.buffer[i] + (this.buffer[i + 1] << 8)
        this.pos += 2
        return result;
    }

    readInt4() {
        var i = this.pos;
        var result = this.buffer[i] + (this.buffer[i + 1] << 8) + (this.buffer[i + 2] << 16) + (this.buffer[i + 3] << 24)
        this.pos += 4
        return result;
    }

    seek(pos, seekType) {
        switch (seekType) {
            case 'SEEK_SET':
                this.pos = pos
                break;
            case 'SEEK_OFFSET':
                this.pos += pos
                break;
            case 'SEEK_END':
                this.pos = this.size - pos
                break;
            default:
                console.error('unknow seekType');
        }
    }
}
