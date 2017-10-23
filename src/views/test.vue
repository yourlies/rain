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
      this.$bubble('asd')
    }
  }
</script>