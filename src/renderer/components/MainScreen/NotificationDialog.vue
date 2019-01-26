<template>
  <div>
    <b-modal ref="modal" hide-header ok-only>
      <p>{{message}}</p>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: ['message'],
    data () {
      return {
      }
    },
    onOkClicked () {
      this.$emit('onOkClicked')
    }
  }
</script>

<style>
</style>
