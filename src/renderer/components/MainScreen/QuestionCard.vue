<template>
  <div>
    <b-card v-bind:title="title" v-bind:sub-title="qNo" >
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
  export default {
    props: ['title', 'qNo'],
    data () {
      return {
        qText: 'Question',
        qAnswer: 'Answer'
      }
    },
    watch: {
      qNo: function () {
        // 実際にはここに問題文を取得する処理が入る
        this.qText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + this.qNo
      }
    }
  }
</script>

<style>
</style>
