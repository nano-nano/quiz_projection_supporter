<template>
  <div>
    <b-modal id="importQuizDataDialog" size="lg" title="問題データインポート"
     ok-title="読み込む" cancel-title="キャンセル" @ok="onOkClicked()" @cancel="onCancelClicked()">
      <b-form-group label="Excelファイル" horizontal :label-cols="2">
        <b-button @click="onFileSelectBtnClicked()">ファイル選択</b-button>
        {{filePath.split('/').slice(-1)[0]}}
      </b-form-group>
      <b-form-group label="パスワード" horizontal :label-cols="2">
        <b-form-input v-model="pass" type="text" placeholder="パスワード未設定の場合は空欄"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { remote, BrowserWindow } from 'electron'

export default {
  name: 'import-quiz-data-dialog',
  data () {
    return {
      filePath: '',
      pass: ''
    }
  },
  methods: {
    onFileSelectBtnClicked() {
      remote.dialog.showOpenDialog(BrowserWindow, (filePaths) => {
        this.filePath = (filePaths[0] == null) ? '' : filePaths[0]
      })
    },
    onOkClicked() {
      if (this.file !== '') {
        this.$emit('onOkClicked', {path: this.filePath, pass: this.pass})
        this.filePath = ''
        this.pass = ''
      }
    },
    onCancelClicked() {
      this.filePath = ''
      this.pass = ''
    }
  }
}
</script>

<style scoped>
</style>