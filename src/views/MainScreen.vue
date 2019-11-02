<template>
  <div class="mainScreen">
    <!-- ナビゲーションバー -->
    <b-navbar type="dark" variant="secondary">
      <b-navbar-brand href="#">Quiz Projection Supporter</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item href="#" @click="onClickProjectionScreen()" >
            投影画面を{{(pjWindow == null) ? '開く' : '閉じる'}}
          </b-nav-item>
          <b-nav-item-dropdown text="設定">
            <b-dropdown-item href="#" v-b-modal.importQuizDataDialog>問題データを読み込む</b-dropdown-item>
            <b-dropdown-item href="#" v-b-modal.projectionSettingDialog>投影画面設定</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>

    <!-- メインUI -->
    <b-container fluid>
      <b-row align-h="center">
        <!-- 現在表示中の問題 -->
        <div class="col-8">
          <question-card title="現在表示中" :qData="displayedQuizData" anotherNotice></question-card>
        </div>
      </b-row>

      <b-row align-h="center">
        <div class="to-up-triangles">▲▲▲</div>
      </b-row>

      <b-row align-h="center">
        <!-- ひとつ前の問題 -->
        <b-col cols="3">
          <question-card title="ひとつ前" :qData="prevQuizData" summaryDisplay></question-card>
        </b-col>
        <!-- 表示候補の問題 -->
        <b-col cols="6" class="align-self-center">
          <question-card title="表示候補" :qData="candidateQuizData" anotherNotice></question-card>
        </b-col>
        <!-- ひとつ次の問題 -->
        <b-col cols="3">
          <question-card title="ひとつ次" :qData="nextQuizData" summaryDisplay></question-card>
        </b-col>
      </b-row>

      <!-- 問題送り/戻し操作UI -->
      <b-row align-h="center" class="button-area">
        <b-col cols="3">
          <b-button size="lg" variant="outline-secondary" block @click="onClickPrevBtn()">
            ＜＜ 前
          </b-button>
        </b-col>
        <b-col cols="6">
          <p>
            <b-button size="lg" variant="primary" block :disabled="(candidateQuizData == null || pjWindow == null)"
             v-b-modal.displayConfirmDialog>
              投影画面へ表示
            </b-button>
          </p>
        </b-col>
        <b-col cols="3">
          <b-button size="lg" variant="outline-secondary" block @click="onClickNextBtn()">
            次 ＞＞
          </b-button>
        </b-col>
      </b-row>
      
      <b-row align-h="center">
        <b-col cols="3">
          <b-button variant="outline-secondary" size="lg" block @click="onClickDisableQuestionBtn()">投影画面の表示を消す</b-button>
        </b-col>
        <b-col cols="2">
          <b-button variant="outline-secondary" size="lg" block v-b-modal.selectQuestionIdDialog>問題IDで選択</b-button>
        </b-col>
      </b-row>

      <!-- 表示オプション -->
      <b-row align-h="center" class="check-area">
        <b-col cols="2">
          <b-form-checkbox size="lg" v-model="isDisplayAnotherAnswers">別解を表示</b-form-checkbox>
        </b-col>
        <b-col cols="2">
          <b-form-checkbox size="lg" v-model="isDisplayQId">問題IDを表示</b-form-checkbox>
        </b-col>
        <b-col cols="3">
          <b-form-checkbox size="lg" v-model="isLoopSelection" v-b-tooltip.hover
           title="最初と最後の問題の間を[<<前][次>>]ボタンで行き来できるようにします">問題選択をループする</b-form-checkbox>
        </b-col>
      </b-row>
    </b-container>

    <import-quiz-data-dialog @onOkClicked="onImportQuizDataDialogOkClicked"></import-quiz-data-dialog>
    <select-question-id-dialog @onOkClicked="onSelectQuestionIdDialogOk"></select-question-id-dialog>
    <projection-setting-dialog @onSizeChanged="onPjSettingDialogFontSizeChange" @onColorChanged="onPjSettingDialogColorChange"></projection-setting-dialog>
    <display-confirm-dialog :qData="candidateQuizData" @onOkClicked="onDisplayConfirmDialogOk"></display-confirm-dialog>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'
import ImportQuizDataDialog from '@/components/ImportQuizDataDialog.vue'
import SelectQuestionIdDialog from '@/components/SelectQuestionIdDialog.vue'
import ProjectionSettingDialog from '@/components/ProjectionSettingDialog.vue'
import DisplayConfirmDialog from '@/components/DisplayConfirmDialog.vue'

import { remote } from 'electron'
// import { BrowserWindow } from 'remote'
import QuizDataUtils from '@/utils/QuizDataUtils.js'
import JsonFileUtil from '@/utils/JsonFileUtils.js'

import Constants from '@/Constants.js'

export default {
  name: 'main-screen',
  components: {
    QuestionCard,
    ImportQuizDataDialog,
    SelectQuestionIdDialog,
    ProjectionSettingDialog,
    DisplayConfirmDialog,
  },
  data() {
    return {
      pjWindow: null,
      quizDataArray: null,
      currentQuizDataIdx: -1,
      displayedQuizData: null,
      candidateQuizData: null,
      nextQuizData: null,
      prevQuizData: null,
      isDisplayAnotherAnswers: false,
      isDisplayQId: false,
      isLoopSelection: false,
      dialogMsg: null
    }
  },
  methods: {
    onClickProjectionScreen() {
      if (this.pjWindow == null) {
        // 投影ウィンドウが開いていない
        const url = remote.getGlobal('baseUrl') + this.$router.resolve({name: 'projection-screen'}).href
        const option = {
          width: 1280,
          height: 720,
          autoHideMenuBar: true,
          webPreferences: { nodeIntegration: true }
        }
        this.pjWindow = new remote.BrowserWindow(option)
        this.pjWindow.loadURL(url)
        this.pjWindow.on('closed', () => {
          // ウィンドウが閉じられたらインスタンスもnullにしておく
          this.pjWindow = null
          // 表示中問題も消去
          this.displayedQuizData = null
        })
      } else {
        // 投影ウィンドウが開いている
        this.pjWindow.close()
        this.pjWindow = null
      }
    },
    onClickNextBtn() {
      this.currentQuizDataIdx = QuizDataUtils.getNextIdx(this.quizDataArray, this.currentQuizDataIdx, this.isLoopSelection)
      this.updateQuizSelectCards()
    },
    onClickPrevBtn() {
      this.currentQuizDataIdx = QuizDataUtils.getPrevIdx(this.quizDataArray, this.currentQuizDataIdx, this.isLoopSelection)
      this.updateQuizSelectCards()
    },
    onClickDisableQuestionBtn() {
      this.displayedQuizData = null
      this.sendMessageToPjWindow('displayQuizData', this.displayedQuizData)
    },
    onDisplayConfirmDialogOk() {
      this.displayedQuizData = this.candidateQuizData
      // ProjectionScreenへ表示する問題データを送信する処理
      this.sendMessageToPjWindow('displayQuizData', this.displayedQuizData)
    },
    onImportQuizDataDialogOkClicked(res) {
      QuizDataUtils.createQuizDatas(res.path, res.pass).then((data) => {
        // インポートに成功
        this.quizDataArray = data
        this.currentQuizDataIdx = 0
        this.updateQuizSelectCards()
        this.$bvModal.msgBoxOk('インポートが完了しました')
      }).catch((err) => {
        // インポートに失敗
        console.error(`import failed: ${err}`)
        this.$bvModal.msgBoxOk('インポートに失敗しました')
      })
    },
    onSelectQuestionIdDialogOk(newQId) {
      const idx = QuizDataUtils.getQuizDatasIdxByQId(this.quizDataArray, newQId)
      if (idx !== -1) {
        // 対応するindexがあった場合のみ更新
        this.currentQuizDataIdx = idx
        this.updateQuizSelectCards()
      }
    },
    onPjSettingDialogFontSizeChange(res) {
      console.debug(res)
      this.sendMessageToPjWindow('fontSizeChange', res)
    },
    onPjSettingDialogColorChange(res) {
      console.debug(res)
      this.sendMessageToPjWindow('colorChange', res)
    },
    updateQuizSelectCards() {
      this.candidateQuizData = QuizDataUtils.getQuizDataByIdx(this.quizDataArray, this.currentQuizDataIdx)
      this.nextQuizData = QuizDataUtils.getQuizDataByIdx(this.quizDataArray, this.currentQuizDataIdx + 1)
      this.prevQuizData = QuizDataUtils.getQuizDataByIdx(this.quizDataArray, this.currentQuizDataIdx - 1)
    },
    sendMessageToPjWindow (channel, arg) {
      if (this.pjWindow != null) {
        // プロセス間通信の仕組みでProjectionScreenへ送信する
        this.pjWindow.webContents.send(channel, arg)
      }
    }
  },
  watch: {
    isDisplayAnotherAnswers: function () {
      this.sendMessageToPjWindow('isDisplayAnotherAnswers', this.isDisplayAnotherAnswers)
    },
    isDisplayQId: function () {
      this.sendMessageToPjWindow('isDisplayQId', this.isDisplayQId)
    }
  },
  mounted: function() {
    // 設定ファイルが無い場合にあらかじめ生成する
    JsonFileUtil.loadFile(Constants.PJ_SETTING_FILE_NAME).catch(() => {
      JsonFileUtil.saveFile(Constants.PJ_SETTING_FILE_NAME, {
        qTextFontSize: 50,
        qAnswerFontSize: 40,
        qAnotherAnswerFontSize: 40,
        qStringColor: '#000000',
        qBackgroundColor: '#ffffff'
      })
    })
  }
}
</script>

<style scoped>
.to-up-triangles {
  font-size: 200%;
}
.button-area {
  margin-top: 15px;
}
.check-area {
  margin-top: 10px;
}
</style>