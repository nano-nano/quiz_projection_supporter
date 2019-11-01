<template>
  <div class="mainScreen">
    <!-- ナビゲーションバー -->
    <b-navbar type="dark" variant="secondary">
      <b-navbar-brand href="#">Quiz Projection Supporter</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item href="#" >
            投影画面を{{(pjWindow == null) ? '開く' : '閉じる'}}
          </b-nav-item>
          <b-nav-item-dropdown text="設定">
            <b-dropdown-item href="#" >問題データを読み込む</b-dropdown-item>
            <b-dropdown-item href="#" >投影画面設定</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>

    <!-- メインUI -->
    <div class="main-ui-area">
      <b-row align-h="center">
        <!-- 現在表示中の問題 -->
        <div class="col-8">
          <question-card title="現在表示中" :qData="displayedQuizData"></question-card>
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
          <question-card title="表示候補" :qData="candidateQuizData"></question-card>
        </b-col>
        <!-- ひとつ次の問題 -->
        <b-col cols="3">
          <question-card title="ひとつ次" :qData="nextQuizData" summaryDisplay></question-card>
        </b-col>
      </b-row>

      <!-- 問題送り/戻し操作UI -->
      <b-row align-h="center" class="button-area">
        <b-col cols="3">
          <b-button size="lg" variant="outline-secondary" block>
            ＜＜ 前
          </b-button>
        </b-col>
        <b-col cols="6">
          <p>
            <b-button size="lg" variant="primary" block :disabled="(candidateQuizData == null)">
              投影画面へ表示
            </b-button>
          </p>
        </b-col>
        <b-col cols="3">
          <b-button size="lg" variant="outline-secondary" block>
            次 ＞＞
          </b-button>
        </b-col>
      </b-row>
      
      <b-row align-h="center">
        <b-col cols="3">
          <b-button variant="outline-secondary" size="lg" block>投影画面の表示を消す</b-button>
        </b-col>
        <b-col cols="2">
          <b-button variant="outline-secondary" size="lg" block>問題IDで選択</b-button>
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
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  name: 'main-screen',
  components: {
    QuestionCard,
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

  },
  watch: {

  },
  mounted: function() {

  }
}
</script>

<style scoped>
.main-ui-area {
  margin: 10px;
}
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