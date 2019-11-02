<template>
  <div>
    <b-card :title="title" :sub-title="this.qIdLabel" class="question-card">
      <p class="card-text">
        {{qTextLabel}}
      </p>
      <p class="card-text">
        {{qAnswerLabel}}
      </p>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'question-card',
  props: {
    title: String,
    qData: Object,
    summaryDisplay: Boolean,
    anotherNotice: Boolean
  },
  data () {
    return {
      qIdLabel: '---',
      qTextLabel: '---',
      qAnswerLabel: '---'
    }
  },
  methods: {
    getSubstringText (target, length) {
      if (target.length > length) {
        return target.substr(0, length) + '...'
      } else {
        return target
      }
    }
  },
  watch: {
    qData: function () {
      if (this.qData == null) {
        this.qIdLabel = '---'
        this.qTextLabel = '---'
        this.qAnswerLabel = '---'
      } else {
        this.qIdLabel = this.qData.qId.toString()
        this.qTextLabel = this.getSubstringText(this.qData.qText, this.summaryDisplay ? 10 : 50)
        this.qAnswerLabel = this.getSubstringText(this.qData.qAnswer, this.summaryDisplay ? 10 : 50)
         + (this.qData.qAnotherAnswer != '' && this.anotherNotice ? '【別解あり】' : '')
      }
    }
  }
}
</script>

<style>
.question-card {
  height: 200px;
}
</style>