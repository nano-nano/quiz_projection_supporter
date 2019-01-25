<template>
  <div>
    <b-modal id="displayConfirmDialog" title="問題表示確認" @ok="onOkClicked()">
      <p>次の問題が表示されます。よろしいですか？</p>
      <p>{{quizData.qText}}</p>
      <p>{{quizData.qAnswer}}</p>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: ['qData'],
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
        return this.qData == null ? {qText: '', qAnswer: ''} : this.qData
      }
    }
  }
</script>

<style>
</style>
