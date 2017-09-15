<template>
  <div class="notice df center">
    <div class="f1">{{ notice }}</div>
    <div class="df center">
      <i class="fa-icon fa-close link" @click="cancelNotice"></i>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      cancelNotice () {
        this.$emit('cancelNotice')
      }
    },
    props: ['notice']
  }
</script>
<style scoped>
  .notice {
    color: #fff;
    background-color: #ff9b9b;
    height: 1.1rem;
    padding-left: .4rem;
    padding-right: .2rem;
  }
  .fa-close {
    width: .6rem;
    height: .6rem;
    background-size: .6rem;
  }
</style>