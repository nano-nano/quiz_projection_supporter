'use strict'

let quizDatas = [
  // ダミーデータ
  {qId: '100', qText: '問題文１', qAnswer: '解答１', qAnotherAnswer: '別解１'},
  {qId: '101', qText: '問題文２', qAnswer: '解答２', qAnotherAnswer: '別解２'},
  {qId: '102', qText: '問題文３', qAnswer: '解答３', qAnotherAnswer: '別解３'},
  {qId: '200', qText: '問題文４', qAnswer: '解答４', qAnotherAnswer: '別解４'}
]

let currentIdx = 0

export default class QuizDataUtil {
  static getQuizDataFromIdx (index) {
    if (index < 0 || quizDatas.length <= index) {
      // インデックス外
      return null
    }
    return quizDatas[index]
  }

  static getQuizDataFromQId (qId) {
    for (let quizData of quizDatas) {
      if (qId === quizData.qId) {
        return quizData
      }
    }
    return null
  }

  static getCurrentQuizData () {
    return this.getQuizDataFromIdx(currentIdx)
  }

  static getNextQuizData () {
    if (quizDatas.length > currentIdx) {
      return this.getQuizDataFromIdx(currentIdx + 1)
    } else {
      return null
    }
  }

  static getPrevQuizData () {
    if (currentIdx > 0) {
      return this.getQuizDataFromIdx(currentIdx - 1)
    } else {
      return null
    }
  }

  static next () {
    if (quizDatas.length > (currentIdx + 1)) {
      currentIdx++
    }
  }

  static prev () {
    if ((currentIdx - 1) >= 0) {
      currentIdx--
    }
  }

  static updateCurrentIdxByQId (newQId) {
    return new Promise((resolve, reject) => {
      let idx = 0
      for (let quizData of quizDatas) {
        if (newQId === quizData.qId) {
          // 見つかった場合
          currentIdx = idx
          resolve()
          break
        }
        idx++
      }
      // 見つからなかった場合
      reject(new Error('newQId not found.'))
    })
  }
}
