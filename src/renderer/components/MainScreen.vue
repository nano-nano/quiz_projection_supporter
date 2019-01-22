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
          <question-card title="Current Displayed" v-bind:qId=currentDisplayedQId></question-card>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="toUpTriangle">▲▲▲</div>
      </div>

      <div class="row justify-content-center">
        <div class="col-3">
          <!-- ひとつ前の問題 -->
          <question-card title="Prev" v-bind:qId=prevQId></question-card>
        </div>

        <div class="col-6 align-self-center">
          <!-- 表示候補の問題 -->
          <question-card title="Displayed Candidate" v-bind:qId=currentCandidateQId></question-card>
        </div>

        <div class="col-3">
          <!-- ひとつ次の問題 -->
          <question-card title="Next" v-bind:qId=nextQId></question-card>
        </div>
      </div>

      <div class="row justify-content-center buttonArea">
        <div class="col-3">
          <b-button size="lg" variant="outline-secondary" block　@click="onClickPrevBtn()">
            ＜＜ Prev
          </b-button>
        </div>

        <div class="col-6">
          <p>
            <b-button size="lg" variant="primary" block @click="onClickShowCandidateBtn()">
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
      <select-question-id-dialog v-bind:qId=currentCandidateQId
        v-on:onOkClicked="onSelectQuestionIdDialogOk"></select-question-id-dialog>
    </div>
  </div>
</template>

<script>
  // 外だししているコンポーネント
  import QuestionCard from './MainScreen/QuestionCard'
  import SelectQuestionIdDialog from './MainScreen/SelectQuestionIdDialog'
  // 外だししているjsファイル
  import WindowUtil from '../logic/WindowUtil'
  import QuizDataUtil from '../logic/QuizDataUtil'

  export default {
    name: 'main-screen',
    components: {
      QuestionCard,
      SelectQuestionIdDialog
    },
    data () {
      return {
        isDisplayAnotherAnswers: false,
        pjWindow: null,
        currentDisplayedQId: null,
        currentCandidateQId: null,
        nextQId: null,
        prevQId: null
      }
    },
    methods: {
      onClickProjectionScreenLink () {
        if (this.pjWindow == null) {
          const targetHref = this.$router.resolve('projection').href
          this.pjWindow = WindowUtil.openWindow(targetHref, null)
        } else {
          this.pjWindow.close()
          this.pjWindow = null
        }
      },
      onClickLoadQuizDataLink () {
        // ダミー実装
        this.updateQuizSelectCards()
      },
      onClickShowCandidateBtn () {
        this.currentDisplayedQId = this.currentCandidateQId
      },
      onClickDisableQuestionBtn () {
        this.currentDisplayedQId = null
      },
      onSelectQuestionIdDialogOk (newQId) {
        if (newQId != null) {
          QuizDataUtil.updateCurrentIdxByQId(newQId).then(() => {
            // ちゃんと更新が終わってから表示を更新
            this.currentCandidateQId = newQId
            this.updateQuizSelectCards()
          })
        }
      },
      onClickNextBtn () {
        QuizDataUtil.next()
        this.updateQuizSelectCards()
      },
      onClickPrevBtn () {
        QuizDataUtil.prev()
        this.updateQuizSelectCards()
      },
      updateQuizSelectCards () {
        // 表示候補カードを更新
        const currentQuizData = QuizDataUtil.getCurrentQuizData()
        if (currentQuizData != null) {
          this.currentCandidateQId = currentQuizData.qId
        } else {
          this.currentCandidateQId = null
        }
        // ひとつ次カードを更新
        const nextQuizData = QuizDataUtil.getNextQuizData()
        if (nextQuizData != null) {
          this.nextQId = nextQuizData.qId
        } else {
          this.nextQId = null
        }
        // ひとつ前カードを更新
        const prevQuizData = QuizDataUtil.getPrevQuizData()
        if (prevQuizData != null) {
          this.prevQId = prevQuizData.qId
        } else {
          this.prevQId = null
        }
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
