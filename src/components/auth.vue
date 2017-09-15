<template>
<div></div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Func } from '../vendor/lib';
import state from '../backend/Fake';

export default {
  data () {
    return {
      count: 0, isLayer: false,
      payload: {}, emit: { payload: {} },
    }
  },
  computed: {
    ...mapGetters({
      memory: 'getAllocateVariable',
    })
  },
  methods: {
    bubble (subscription, page) {
      this.$store.dispatch('bubbleDelegation', { subscription, page });
    },
    register (subscription) {
      this.$store.dispatch('registerCustomer', { register: subscription, page: this });
    },
    request (subscription, payload) {
      this.$store.dispatch('requestCustomer', { request: subscription, payload, page: this });
    },
    allocate (payload) {
      this.$store.dispatch('allocateMemory', payload);
    },
    debug () {
      const params = this.$route.query;
      const { uid, token, v } = params;
      if (!uid || !token || !v) {
        switch (true) {
          case this.memory.isTest:
            this.request('createLayer', {
              title: '这个弹窗不是bug别担心',
              notice: [
                '* 非走查模式会自动消失',
                `版本号: ${v}`,
                `令牌: ${token}`,
                `用户id: ${uid}`,
                `bug鉴定: 参数出错`,
              ],
            })
            break;
        }
      }
    }
  },
  mounted () {
    self.redirect = this;
    this.register('auth');
    const params = this.$route.query;
    const { uid, v, token } = params;
    this.allocate({ debug: this.memory.debug ? this.memory.debug + 1 : 0 });
    this.allocate({ basic: { uid, token, v } });
    this.allocate({ load: this.memory.load ? this.memory.load + 1 : 0 });
    this.allocate({ isTest: state.isTest });
    this.allocate({ isApp: state.isApp });
  },
  watch: {
    count () {
      const { param, page } = this.payload.req;
      page.emit.payload[param] = this.memory.params[param];
    },
    'memory.debug' () {
      this.$nextTick(() => {
        this.debug();
      })
    },
    'memory.load' () {
      
    }
  }
}
</script>