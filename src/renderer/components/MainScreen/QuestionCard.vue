<template>
  <div>
    <b-card v-bind:title="title" v-bind:sub-title="this.qIdLabel" class="qCard">
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
    props: ['title', 'qData', 'qTextSummary'],
    data () {
      return {
        qIdLabel: '---',
        qTextLabel: '---',
        qAnswerLabel: '---'
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
      qData: function () {
        if (this.qData == null) {
          this.qIdLabel = '---'
          this.qTextLabel = '---'
          this.qAnswerLabel = '---'
        } else {
          this.qIdLabel = this.qData.qId
          this.qTextLabel = this.qTextSummary ? this.getSummaryText(this.qData.qText) : this.qData.qText
          this.qAnswerLabel = this.qTextSummary ? this.getSummaryText(this.qData.qAnswer) : this.qData.qAnswer
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
