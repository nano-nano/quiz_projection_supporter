<template>
  <div class="pjBase">
    <b-container fluid="">
      <!-- 問題文表示エリア -->
      <b-card class="qTextCard" :style="{ backgroundColor: qBackgroundColor }">
        <p class="card-text" :style="{ fontSize: qTextFontSize + 'px', color: qStringColor }">
            {{(this.isDisplayQId && qId !== '') ? `【${qId}】` : ''}}{{qText}}
        </p>
      </b-card>

      <div class="qAnswerArea">
        <!-- 解答表示エリア -->
        <b-card :class="[isDisplayAnotherAnswers ? 'qAnswerCard-AnotherAnswer' : 'qAnswerCard-WoAnotherAnswer']"
           :style="{ backgroundColor: qBackgroundColor }">
          <p class="card-text" :style="{ fontSize: qAnswerFontSize + 'px', color: qStringColor }">
            {{qAnswer}}
          </p>
        </b-card>

        <!-- 別解表示エリア -->
        <b-card class="qAnotherAnswerCard" v-if="isDisplayAnotherAnswers" :style="{ backgroundColor: qBackgroundColor }">
          <p class="card-text" :style="{ fontSize: qAnotherAnswerFontSize + 'px', color: qStringColor }">
            【別解】{{qAnotherAnswer}}
          </p>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import JsonFileUtils from '@/utils/JsonFileUtils.js'

import Constants from '@/Constants.js'

export default {
  data () {
    return {
      qId: '',
      qText: '',
      qAnswer: '',
      qAnotherAnswer: '',
      isDisplayAnotherAnswers: false,
      isDisplayQId: false,
      qTextFontSize: 50,
      qAnswerFontSize: 40,
      qAnotherAnswerFontSize: 40,
      qStringColor: '#000000',
      qBackgroundColor: '#ffffff'
    }
  },
  created: function () {
    JsonFileUtils.loadFile(Constants.PJ_SETTING_FILE_NAME).then((data) => {
      if (data != null) {
        this.qTextFontSize = data.qTextFontSize
        this.qAnswerFontSize = data.qAnswerFontSize
        this.qAnotherAnswerFontSize = data.qAnotherAnswerFontSize
        this.qStringColor = data.qStringColor
        this.qBackgroundColor = data.qBackgroundColor
      }
    })
  },
  mounted: function () {
    ipcRenderer.on('displayQuizData', (event, arg) => {
      if (arg != null) {
        this.qId = arg.qId
        this.qText = arg.qText
        this.qAnswer = arg.qAnswer
        this.qAnotherAnswer = arg.qAnotherAnswer
      } else {
        this.qId = ''
        this.qText = ''
        this.qAnswer = ''
        this.qAnotherAnswer = ''
      }
    })
    ipcRenderer.on('isDisplayAnotherAnswers', (event, arg) => {
      this.isDisplayAnotherAnswers = arg
    })
    ipcRenderer.on('isDisplayQId', (event, arg) => {
      this.isDisplayQId = arg
    })
    ipcRenderer.on('fontSizeChange', (event, arg) => {
      this.qTextFontSize = arg.qTextFontSize
      this.qAnswerFontSize = arg.qAnswerFontSize
      this.qAnotherAnswerFontSize = arg.qAnotherAnswerFontSize
    })
    ipcRenderer.on('colorChange', (event, arg) => {
      this.qStringColor = arg.qStringColor
      this.qBackgroundColor = arg.qBackgroundColor
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
  .container-fluid {
    height: 100vh;
    padding: 3vh;
  }
  .qTextCard {
    height: 64%;
  }
  .qAnswerArea {
    height: 35%;
    margin-top: 1%;
  }
  .qAnswerCard-AnotherAnswer {
    height: 50%;
  }
  .qAnswerCard-WoAnotherAnswer {
    height: 100%;
  }
  .qAnotherAnswerCard {
    height: 50%;
  }
  .card-body {
    padding: 10px;
  }
</style>