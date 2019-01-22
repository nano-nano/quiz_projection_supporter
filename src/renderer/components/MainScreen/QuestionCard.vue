<template>
  <div>
    <b-card v-bind:title="title" v-bind:sub-title="qId" class="qCard">
      <p class="card-text">
        {{qText}}
      </p>
      <p class="card-text">
        {{qAnswer}}
      </p>
    </b-card>
  </div>
</template>

<script>
  import QuizDataUtil from '../../logic/QuizDataUtil'

  export default {
    props: ['title', 'qId', 'qTextSummary'],
    data () {
      return {
        qText: '---',
        qAnswer: '---',
        summaryQText: '---'
      }
    },
    methods: {
      getSummaryText (target) {
        if (target.length > 8) {
          // 先頭から8文字分だけ切り出して、残りを省略
          return target.substr(0, 8) + '...'
        } else {
          return target
        }
      }
    },
    watch: {
      qId: function () {
        if (this.qId == null) {
          this.qText = '---'
          this.qAnswer = '---'
        } else {
          const quizData = QuizDataUtil.getQuizDataFromQId(this.qId)
          if (quizData == null) {
            this.qText = '---'
            this.qAnswer = '---'
          } else {
            this.qText = this.qTextSummary ? this.getSummaryText(quizData.qText) : quizData.qText
            this.qAnswer = this.qTextSummary ? this.getSummaryText(quizData.qAnswer) : quizData.qAnswer
          }
        }
      }
    }
  }
</script>

<style>
  .qCard {
    height: 200px;
  }
</style>
