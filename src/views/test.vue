<template>
  <div>{{ comment }}</div>
</template>
<script>
  export default {
    data () {
      return {
        comment: 'what?',
      }
    },
    mounted () {
      this.$register('qwe').then(() => {
        console.log(1)
      })
      for (let i = 0; i < 1000; i++) {
        this.$bubble('asd')
      }
    }
  }
</script>