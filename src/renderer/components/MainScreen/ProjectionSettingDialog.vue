<template>
  <div>
    <b-modal id="projectionSettingDialog" title="投影画面設定" @ok="onOkClicked">
      <b-form-group label="問題文フォントサイズ" horizontal :label-cols="6">
        <b-form-input v-model="qTextFontSize" type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="解答フォントサイズ" horizontal :label-cols="6">
        <b-form-input v-model="qAnswerFontSize" type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="別解フォントサイズ" horizontal :label-cols="6">
        <b-form-input v-model="qAnotherAnswerFontSize" type="number"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
  import JsonFileUtil from '../../logic/JsonFileUtil'

  export default {
    data () {
      return {
        qTextFontSize: 50,
        qAnswerFontSize: 40,
        qAnotherAnswerFontSize: 40
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
      onOkClicked () {
        this.saveSetting()
      },
      saveSetting () {
        JsonFileUtil.saveFile('pjSetting', {
          qTextFontSize: parseInt(this.qTextFontSize),
          qAnswerFontSize: parseInt(this.qAnswerFontSize),
          qAnotherAnswerFontSize: parseInt(this.qAnotherAnswerFontSize)
        })
      }
    },
    created: function () {
      JsonFileUtil.loadFile('pjSetting').then((data) => {
        if (data != null) {
          this.qTextFontSize = data.qTextFontSize
          this.qAnswerFontSize = data.qAnswerFontSize
          this.qAnotherAnswerFontSize = this.qAnotherAnswerFontSize
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
      }
    }
  }
</script>

<style>
</style>
