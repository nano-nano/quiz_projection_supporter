'use strict'

import FsExtra from 'fs-extra'

export default class JsonFileUtil {
  static saveFile (fileName, data) {
    const filePath = process.cwd() + '/json/' + fileName + '.json'
    return FsExtra.outputJson(filePath, data)
  }

  static loadFile (fileName) {
    const filePath = process.cwd() + '/json/' + fileName + '.json'
    return FsExtra.readJson(filePath, { throws: false })
  }
}
