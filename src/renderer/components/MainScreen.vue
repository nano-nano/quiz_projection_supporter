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
              <b-dropdown-item href="#" @click="onClickLoadQuizDataLink()">Load QuizData File</b-dropdown-item>
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
      <select-question-id-dialog v-on:onOkClicked="onSelectQuestionIdDialogOk"></select-question-id-dialog>
      <display-confirm-dialog v-bind:qData=candidateQuizData
        v-on:onOkClicked="onDisplayConfirmDialogOk"></display-confirm-dialog>
    </div>
  </div>
</template>

<script>
  // 外だししているコンポーネント
  import QuestionCard from './MainScreen/QuestionCard'
  import SelectQuestionIdDialog from './MainScreen/SelectQuestionIdDialog'
  import DisplayConfirmDialog from './MainScreen/DisplayConfirmDialog'
  // 外だししているjsファイル
  import WindowUtil from '../logic/WindowUtil'
  import QuizDataUtil from '../logic/QuizDataUtil'

  export default {
    name: 'main-screen',
    components: {
      QuestionCard,
      SelectQuestionIdDialog,
      DisplayConfirmDialog
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
        isDisplayAnotherAnswers: false
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
      onClickLoadQuizDataLink () {
        // ダミー実装
        this.quizDatas = QuizDataUtil.createQuizDatas()
        this.currentQuizDataIdx = 0
        this.updateQuizSelectCards()
      },
      onDisplayConfirmDialogOk () {
        this.displayedQuizData = this.candidateQuizData
        // ProjectionScreenへsendする処理
      },
      onClickDisableQuestionBtn () {
        this.displayedQuizData = null
      },
      onSelectQuestionIdDialogOk (newQId) {
        this.currentQuizDataIdx = QuizDataUtil.getQuizDatasIdxByQId(this.quizDatas, newQId)
        this.updateQuizSelectCards()
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
      }
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
