<template>
  <div class="header">
    <nav class="df center between content">
      <div class="link df placeholder back">
          <i class="fa-icon fa-back" @click="back"></i>
      </div>
      <div class="font18" @click="counter">{{ title }}</div>
      <div class="link placeholder" v-if="!payload"></div>
      <div
        class="link placeholder record font16"
        v-if="payload"
        @click="request('redirect', { path: payload.path, params: payload.params })">
        {{ payload.title }}
      </div>
    </nav>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        count: 0,
      }
    },
    methods: {
      request (subscription, payload) {
        this.$store.dispatch('requestCustomer', { request: subscription, payload, page: this });
      },
      back () {
        this.request('redirect', { next: 'back' });
      },
      debug () {
        if (!this.memory.isTest) {
          return false;
        }
        if (this.count == 11) {
          this.request('createLayer', {
            title: 'debug',
            notice: ['进入debug模式'],
          });
        }
        switch (this.$route.path) {
          case '/student/mall/goodsdetail':
            this.request('createPayment', {
              auth: true,
            })
            break;
        }
      },
      counter () {
        this.count++;
      }
    },
    computed: {
      ...mapGetters({
        memory: 'getAllocateVariable',
      })
    },
    props: ['title', 'payload'],
    watch: {
      count () {
        if (this.count > 10) {
          this.debug();
        }
      }
    }
  }
</script>
<style scoped>
  @import '../assets/css/test.css';
  nav {
    height: 1.2rem;
    line-height: .48rem;
    background-color: #f5f5f5;
    width: 100%;
    left: 0;
    top: 0;
    position: fixed;
  }
  .header {
    height: 1.2rem;
  }
  .placeholder {
    width: 3rem;
  }
  .record {
    display: inline-block;
    padding-right: .4rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: right;
  }
  .back {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: .3rem;
  }
  .fa-back {
    width: .7rem;
    height: .7rem;
    background-size: .7rem;
  }
</style>