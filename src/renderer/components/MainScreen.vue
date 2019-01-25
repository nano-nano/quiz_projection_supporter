<template>
  <div>
    <!-- ナビゲーションバー -->
    <div class="container-flued">
      <b-navbar toggleable="md" type="dark" variant="secondary">
        <b-navbar-brand href="#">Quiz Projection Supporter</b-navbar-brand>
          <b-navbar-nav>
            <!-- '@click'は'v-on:click'イベントハンドラの省略形 -->
            <b-nav-item href="#" @click="onClickProjectionScreenLink()">
              {{(pjWindow == null) ? 'Open' : 'Close'}} PJ Screen
            </b-nav-item>
            <b-nav-item-dropdown text="PJ Setting">
              <b-dropdown-item href="#" v-b-modal.importQuizDataDialog>Load QuizData File</b-dropdown-item>
              <b-dropdown-item href="#" v-b-modal.projectionSettingDialog>ProjectionScreen Setting</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
      </b-navbar>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8">
          <!-- 現在表示中の問題 -->
          <!-- 'v-bind:'で=の右側にあるdata要素とバインディングが可能になる -->
          <question-card title="Current Displayed" v-bind:qData=displayedQuizData></question-card>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="toUpTriangle">▲▲▲</div>
      </div>

      <div class="row justify-content-center">
        <div class="col-3">
          <!-- ひとつ前の問題 -->
          <question-card title="Prev" v-bind:qData=prevQuizData qTextSummary=true></question-card>
        </div>

        <div class="col-6 align-self-center">
          <!-- 表示候補の問題 -->
          <question-card title="Displayed Candidate" v-bind:qData=candidateQuizData></question-card>
        </div>

        <div class="col-3">
          <!-- ひとつ次の問題 -->
          <question-card title="Next" v-bind:qData=nextQuizData qTextSummary=true></question-card>
        </div>
      </div>

      <div class="row justify-content-center buttonArea">
        <div class="col-3">
          <b-button size="lg" variant="outline-secondary" block @click="onClickPrevBtn()">
            ＜＜ Prev
          </b-button>
        </div>

        <div class="col-6">
          <p>
            <b-button size="lg" variant="primary" block :disabled="(candidateQuizData == null)" v-b-modal.displayConfirmDialog>
              Show Candidate
            </b-button>
          </p>
          <p class="text-center">
            <b-button size="lg" variant="outline-secondary" @click="onClickDisableQuestionBtn()">
              Disable Question
            </b-button>
            <b-button size="lg" variant="outline-secondary" v-b-modal.selectQuestionIdDialog>
              Select by QuestionID
            </b-button>
          </p>
          <p>
            <!-- 'v-model'はdata要素とチェックボックスの状態を紐づけるためのディレクティブ -->
            <b-form-checkbox size="lg" v-model="isDisplayAnotherAnswers">
              Display AnotherAnswers
            </b-form-checkbox>
          </p>
        </div>

        <div class="col-3">
          <b-button size="lg" variant="outline-secondary" block @click="onClickNextBtn()">
            Next ＞＞
          </b-button>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- QuestionID選択ダイアログ -->
      <!-- v-onは子コンポーネントからのイベントを受けるメソッドを定義する -->
      <select-question-id-dialog v-on:onOkClicked="onSelectQuestionIdDialogOk"></select-question-id-dialog>
      <!-- 投影確認ダイアログ -->
      <display-confirm-dialog v-bind:qData=candidateQuizData
        v-on:onOkClicked="onDisplayConfirmDialogOk"></display-confirm-dialog>
      <!-- 問題ファイルインポートダイアログ -->
      <import-quiz-data-dialog v-on:onOkClicked="onImportQuizDataDialogOk"></import-quiz-data-dialog>
      <!-- 投影画面設定ダイアログ -->
      <projection-setting-dialog v-on:onSizeChanged="onPjSettingDialogValueChange"></projection-setting-dialog>
      <!-- メッセージ通知ダイアログ -->
      <notification-dialog ref="notificationDialogComponent"
        v-bind:message=dialogMsg v-on:onOkClicked="onNotificationDialogOk"></notification-dialog>
    </div>
  </div>
</template>

<script>
  // 外だししているコンポーネント
  import QuestionCard from './MainScreen/QuestionCard'
  import SelectQuestionIdDialog from './MainScreen/SelectQuestionIdDialog'
  import DisplayConfirmDialog from './MainScreen/DisplayConfirmDialog'
  import ImportQuizDataDialog from './MainScreen/ImportQuizDataDialog'
  import ProjectionSettingDialog from './MainScreen/ProjectionSettingDialog'
  import NotificationDialog from './MainScreen/NotificationDialog'
  // 外だししているjsファイル
  import WindowUtil from '../logic/WindowUtil'
  import QuizDataUtil from '../logic/QuizDataUtil'
  import JsonFileUtil from '../logic/JsonFileUtil'

  export default {
    name: 'main-screen',
    components: {
      QuestionCard,
      SelectQuestionIdDialog,
      DisplayConfirmDialog,
      ImportQuizDataDialog,
      ProjectionSettingDialog,
      NotificationDialog
    },
    data () {
      return {
        pjWindow: null,
        quizDatas: null,
        currentQuizDataIdx: 0,
        displayedQuizData: null,
        candidateQuizData: null,
        nextQuizData: null,
        prevQuizData: null,
        isDisplayAnotherAnswers: false,
        dialogMsg: null
      }
    },
    methods: {
      onClickProjectionScreenLink () {
        if (this.pjWindow == null) {
          const targetHref = this.$router.resolve('projection').href
          const option = {
            width: 1280,
            height: 720,
            autoHideMenuBar: true
          }
          this.pjWindow = WindowUtil.openWindow(targetHref, option)
          this.pjWindow.on('closed', () => {
            // ウィンドウが閉じられたらインスタンスもnullにしておく
            this.pjWindow = null
          })
        } else {
          this.pjWindow.close()
          this.pjWindow = null
        }
      },
      onClickDisableQuestionBtn () {
        this.displayedQuizData = null
        this.sendMessageToPjWindow('displayQuizData', this.displayedQuizData)
      },
      onClickNextBtn () {
        this.currentQuizDataIdx = QuizDataUtil.getNextIdx(this.quizDatas, this.currentQuizDataIdx)
        this.updateQuizSelectCards()
      },
      onClickPrevBtn () {
        this.currentQuizDataIdx = QuizDataUtil.getPrevIdx(this.currentQuizDataIdx)
        this.updateQuizSelectCards()
      },
      updateQuizSelectCards () {
        this.candidateQuizData = QuizDataUtil.getQuizDataByIdx(this.quizDatas, this.currentQuizDataIdx)
        this.nextQuizData = QuizDataUtil.getQuizDataByIdx(this.quizDatas, this.currentQuizDataIdx + 1)
        this.prevQuizData = QuizDataUtil.getQuizDataByIdx(this.quizDatas, this.currentQuizDataIdx - 1)
      },
      showNotificationDialog (message) {
        this.dialogMsg = message
        // MainScreenから見てNotificationDialog内のModalコンポーネントは2階層分深いので、重ねて参照させる
        this.$refs.notificationDialogComponent.$refs.modal.show()
      },
      onNotificationDialogOk () {
        // ダイアログ表示用メッセージ変数をリセットしておく
        this.dialogMsg = ''
      },
      onDisplayConfirmDialogOk () {
        this.displayedQuizData = this.candidateQuizData
        // ProjectionScreenへ表示する問題データを送信する処理
        this.sendMessageToPjWindow('displayQuizData', this.displayedQuizData)
      },
      onSelectQuestionIdDialogOk (newQId) {
        const idx = QuizDataUtil.getQuizDatasIdxByQId(this.quizDatas, newQId)
        if (idx !== -1) {
          // 対応するindexがあった場合のみ更新
          this.currentQuizDataIdx = idx
          this.updateQuizSelectCards()
        }
      },
      onImportQuizDataDialogOk (res) {
        QuizDataUtil.createQuizDatas(res.path, res.pass).then((quizDatas) => {
          this.quizDatas = quizDatas
          this.currentQuizDataIdx = 0
          this.updateQuizSelectCards()
          this.showNotificationDialog('インポートが完了しました')
        }).catch((err) => {
          console.error(err)
          this.showNotificationDialog('インポートに失敗しました')
        })
      },
      onPjSettingDialogValueChange (res) {
        this.sendMessageToPjWindow('fontSizeChange', res)
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
      }
    },
    mounted: function () {
      // 設定ファイルが無い場合にあらかじめ生成する
      JsonFileUtil.loadFile('pjSetting').catch(() => {
        JsonFileUtil.saveFile('pjSetting', {
          qTextFontSize: 50,
          qAnswerFontSize: 40,
          qAnotherAnswerFontSize: 40
        })
      })
    }
  }
</script>

<style>
  .toUpTriangle {
    font-size: 200%;
  }
  .buttonArea {
    margin-top: 20px;
  }
</style>
