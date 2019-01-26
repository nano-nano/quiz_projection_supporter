'use strict'

// electronのBrowserWindowモジュールを取得する
const BrowserWindow = require('electron').remote.BrowserWindow

export default class WindowUtil {
  static getBaseUrl (targetPath) {
    // Developmentモード or Productionモードで、ベースとなるpathを切り替える
    // この実装は、src/main/index.jsの中にあるものをそのまま持ってきている
    const baseUrl = process.env.NODE_ENV === 'development'
      ? `http://localhost:9080`
      : `file://${__dirname}/index.html`
    return baseUrl + targetPath
  }

  static openWindow (targetPath, windowOption) {
    const url = this.getBaseUrl(targetPath)
    let winOpt
    if (windowOption != null) {
      winOpt = windowOption
    } else {
      winOpt = {
        width: 800,
        height: 600
      }
    }

    let window = new BrowserWindow(winOpt)
    window.loadURL(url)
    return window
  }
}
