<template>
  <div>
    <b-modal id="projectionSettingDialog" title="投影画面設定" ok-title="反映して閉じる" ok-only @ok="onOkClicked">
      <b-form-group label="問題文フォントサイズ" horizontal :label-cols="6">
        <b-form-input v-model="qTextFontSize" type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="解答フォントサイズ" horizontal :label-cols="6">
        <b-form-input v-model="qAnswerFontSize" type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="別解フォントサイズ" horizontal :label-cols="6">
        <b-form-input v-model="qAnotherAnswerFontSize" type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="投影文字色" horizontal :label-cols="6">
        <b-form-input v-model="qStringColor" type="color"></b-form-input>
      </b-form-group>
      <b-form-group label="投影背景色" horizontal :label-cols="6">
        <b-form-input v-model="qBackgroundColor" type="color"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import JsonFileUtils from '@/utils/JsonFileUtils.js'
import Constants from '@/Constants.js'

export default {
  data () {
    return {
      qTextFontSize: 50,
      qAnswerFontSize: 40,
      qAnotherAnswerFontSize: 40,
      qStringColor: '#000000',
      qBackgroundColor: '#ffffff'
    }
  },
  methods: {
    onSizeChanged () {
      this.$emit('onSizeChanged', {
        qTextFontSize: this.qTextFontSize,
        qAnswerFontSize: this.qAnswerFontSize,
        qAnotherAnswerFontSize: this.qAnotherAnswerFontSize
      })
      this.saveSetting()
    },
    onColorChanged () {
      this.$emit('onColorChanged', {
        qStringColor: this.qStringColor,
        qBackgroundColor: this.qBackgroundColor
      })
      this.saveSetting()
    },
    onOkClicked () {
      this.saveSetting()
    },
    saveSetting () {
      JsonFileUtils.saveFile(Constants.PJ_SETTING_FILE_NAME, {
        qTextFontSize: parseInt(this.qTextFontSize),
        qAnswerFontSize: parseInt(this.qAnswerFontSize),
        qAnotherAnswerFontSize: parseInt(this.qAnotherAnswerFontSize),
        qStringColor: this.qStringColor,
        qBackgroundColor: this.qBackgroundColor
      })
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
  watch: {
    qTextFontSize: function () {
      this.onSizeChanged()
    },
    qAnswerFontSize: function () {
      this.onSizeChanged()
    },
    qAnotherAnswerFontSize: function () {
      this.onSizeChanged()
    },
    qStringColor: function () {
      this.onColorChanged()
    },
    qBackgroundColor: function () {
      this.onColorChanged()
    }
  }
}
</script>

<style scoped>
</style>