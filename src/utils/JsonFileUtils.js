'use strict'

import FsExtra from 'fs-extra'
import { remote } from 'electron'

export default class JsonFileUtil {
  static saveFile (fileName, data) {
    const filePath = remote.app.getPath('userData') + '/json/' + fileName + '.json'
    return FsExtra.outputJson(filePath, data)
  }

  static loadFile (fileName) {
    const filePath = remote.app.getPath('userData') + '/json/' + fileName + '.json'
    return FsExtra.readJson(filePath, { throws: false })
  }
}