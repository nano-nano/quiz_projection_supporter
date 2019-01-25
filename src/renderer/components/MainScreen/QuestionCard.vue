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
          this.qTextLabel = this.qTextSummary ? this.getSubstringText(this.qData.qText, 8) : this.getSubstringText(this.qData.qText, 50)
          this.qAnswerLabel = this.qTextSummary ? this.getSubstringText(this.qData.qAnswer, 8) : this.getSubstringText(this.qData.qAnswer, 50)
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
