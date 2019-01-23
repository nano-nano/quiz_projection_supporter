'use strict'

let quizDatas = [
  // ダミーデータ
  {qId: '100', qText: '問題文１', qAnswer: '解答１', qAnotherAnswer: '別解１'},
  {qId: '101', qText: '問題文２', qAnswer: '解答２', qAnotherAnswer: '別解２'},
  {qId: '102', qText: '問題文３', qAnswer: '解答３', qAnotherAnswer: '別解３'},
  {qId: '200', qText: '問題文４', qAnswer: '解答４', qAnotherAnswer: '別解４'},
  {qId: '999', qText: '問題文４ほげほげほげほげほげほげほげ', qAnswer: '解答４ふがふがふがふが', qAnotherAnswer: '別解５'}
]

let currentIdx = 0

class QuizDataUtil {
  createQuizDatas () {
    // ダミーデータ。実際にはExcelファイルロード処理を入れる
    const quizDatas = [
      {qId: '100', qText: '問題文１', qAnswer: '解答１', qAnotherAnswer: '別解１'},
      {qId: '101', qText: '問題文２', qAnswer: '解答２', qAnotherAnswer: '別解２'},
      {qId: '102', qText: '問題文３', qAnswer: '解答３', qAnotherAnswer: '別解３'},
      {qId: '200', qText: '問題文４', qAnswer: '解答４', qAnotherAnswer: '別解４'},
      {qId: '999', qText: '問題文４ほげほげほげほげほげほげほげ', qAnswer: '解答４ふがふがふがふが', qAnotherAnswer: '別解５'}
    ]
    return quizDatas
  }

  getQuizDataByIdx (quizDatas, index) {
    if (index < 0 || quizDatas.length <= index) {
      // インデックス外の場合はnullを返す
      return null
    }
    return quizDatas[index]
  }

  getQuizDatasIdxByQId (quizDatas, qId) {
    let newIdx = 0
    for (let quizData of quizDatas) {
      if (qId === quizData.qId) {
        return newIdx
      }
      newIdx++
    }
    // 見つからなかった場合
    return -1
  }

  getNextIdx (quizDatas, currentIdx) {
    if (quizDatas.length > (currentIdx + 1)) {
      return (currentIdx + 1)
    } else {
      return currentIdx
    }
  }

  getPrevIdx (currentIdx) {
    if ((currentIdx - 1) >= 0) {
      return (currentIdx - 1)
    } else {
      return currentIdx
    }
  }

  // ---

  getQuizDataFromIdx (index) {
    if (index < 0 || quizDatas.length <= index) {
      // インデックス外
      return null
    }
    return quizDatas[index]
  }

  getQuizDataFromQId (qId) {
    for (let quizData of quizDatas) {
      if (qId === quizData.qId) {
        return quizData
      }
    }
    return null
  }

  getCurrentQuizData () {
    return this.getQuizDataFromIdx(currentIdx)
  }

  getNextQuizData () {
    if (quizDatas.length > currentIdx) {
      return this.getQuizDataFromIdx(currentIdx + 1)
    } else {
      return null
    }
  }

  getPrevQuizData () {
    if (currentIdx > 0) {
      return this.getQuizDataFromIdx(currentIdx - 1)
    } else {
      return null
    }
  }

  next () {
    if (quizDatas.length > (currentIdx + 1)) {
      currentIdx++
    }
  }

  prev () {
    if ((currentIdx - 1) >= 0) {
      currentIdx--
    }
  }

  updateCurrentIdxByQId (newQId) {
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

export default new QuizDataUtil()
