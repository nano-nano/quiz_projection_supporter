<template>
  <div class="pjBase">
    <div class="container-flued">
      <b-card class="qTextCard">
        <p class="card-text">
            {{qText}}
        </p>
      </b-card>

      <div class="qAnswerArea">
        <b-card v-bind:class="[isDisplayAnotherAnswers ? 'qAnswerCard-AnotherAnswer' : 'qAnswerCard-WoAnotherAnswer']">
          <p class="card-text">
            {{qAnswer}}
          </p>
        </b-card>

        <b-card class="qAnotherAnswerCard" v-if="isDisplayAnotherAnswers">
          <p class="card-text">
            {{qAnotherAnswer}}
          </p>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['qId'],
    data () {
      return {
        qText: '',
        qAnswer: '',
        qAnotherAnswer: '',
        isDisplayAnotherAnswers: false
      }
    },
    mounted: function () {
      const ipc = this.$electron.ipcRenderer
      ipc.on('displayQuizData', (event, arg) => {
        if (arg != null) {
          this.qText = arg.qText
          this.qAnswer = arg.qAnswer
          this.qAnotherAnswer = arg.qAnotherAnswer
        } else {
          this.qText = ''
          this.qAnswer = ''
          this.qAnotherAnswer = ''
        }
      })
      ipc.on('isDisplayAnotherAnswers', (event, arg) => {
        this.isDisplayAnotherAnswers = arg
      })
    }
  }
</script>

<style scoped>
  /* 全画面表示するために高さを100%にする */
  html, body, div#app {
    height: 100%;
    margin: 0;
  }

  .pjBase {
    background-color: black;
    height: 100vh;
    margin: 0;
  }

  .container-flued {
    height: 100vh;
    padding: 3vh;
  }

  .qTextCard {
    height: 64%;
    font-size: 300%;
  }

  .qAnswerArea {
    height: 35%;
    margin-top: 1%;
  }

  .qAnswerCard-AnotherAnswer {
    height: 50%;
    font-size: 250%;
  }
  .qAnswerCard-WoAnotherAnswer {
    height: 100%;
    font-size: 250%;
  }

  .qAnotherAnswerCard {
    height: 50%;
    font-size: 250%;
  }
</style>
