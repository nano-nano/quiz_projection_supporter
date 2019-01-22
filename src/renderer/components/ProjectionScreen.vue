<template>
  <div class="pjBase">
    <div class="container-flued">
      <b-card class="qTextCard">
        <p class="card-text">
            {{qText}}
        </p>
      </b-card>

      <div class="qAnswerArea">
        <b-card class="qAnswerCard-AnotherAnswer">
          <p class="card-text">
            {{qAnswer}}
          </p>
        </b-card>

        <b-card class="qAnotherAnswerCard">
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
        qText: 'それなりに長そうな問題文が来たときの想定ができるようにそれなりの長さの文章をここに表示します。',
        qAnswer: 'それなりに長そうな答え。',
        qAnotherAnswer: 'それなりに長そうな別解表示用。'
      }
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
