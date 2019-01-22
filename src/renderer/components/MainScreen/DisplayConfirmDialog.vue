<template>
  <div>
    <b-modal id="displayConfirmDialog" title="問題表示確認" @ok="onOkClicked()">
      次の問題が表示されます。よろしいですか？
      <p>{{quizData.qText}}</p>
      <p>{{quizData.qAnswer}}</p>
    </b-modal>
  </div>
</template>

<script>
  import QuizDataUtil from '../../logic/QuizDataUtil'

  export default {
    props: ['qId'],
    data () {
      return {
      }
    },
    methods: {
      onOkClicked () {
        this.$emit('onOkClicked')
      }
    },
    computed: {
      quizData: function () {
        return QuizDataUtil.getQuizDataFromQId(this.qId)
      }
    }
  }
</script>

<style>
</style>
