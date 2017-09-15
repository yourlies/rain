<template>
  <div>
    <banner />
    <div class="container">
      欢迎使用rain框架构建您的项目
    </div>
  </div>
</template>
<script>
  import banner from '../components/header.vue';
  export default {
    components: {
      banner
    },
    methods: {
      bubble (subscription, payload = {}) {
        this.$store.dispatch('bubbleDelegation', { subscription, page: this, rely: payload.rely });
      },
    },
    mounted () {
      // 
    }
  }
</script>