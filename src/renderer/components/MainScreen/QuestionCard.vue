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
    props: ['title', 'qId'],
    data () {
      return {
        qText: '---',
        qAnswer: '---'
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
            this.qText = quizData.qText
            this.qAnswer = quizData.qAnswer
          }
        }
      }
    }
  }
</script>

<style>
  .qCard {
    height: 180px;
  }
</style>
