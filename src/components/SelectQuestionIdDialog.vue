<template>
  <div>
    <b-modal id="selectQuestionIdDialog" title="問題IDを選択して表示" @ok="onOkClicked()"
     ok-title="選択する" cancel-title="キャンセル">
      <b-form-group label="表示したい問題ID" label-for="selectQId" horizontal :label-cols="6">
        <b-form-input id="selectQId" v-model="newQId" type="text"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        newQId: ''
      }
    },
    methods: {
      onOkClicked () {
        if (this.newQId !== '') {
          this.$emit('onOkClicked', this.newQId)
          this.newQId = ''
        }
      }
    }
  }
</script>

<style scoped>
</style>