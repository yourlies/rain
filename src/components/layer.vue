<template>
<div>
  <div class="layer" v-show="isLayer">
    <div class="shadow"></div>
    <div class="content tc cr333">
      <div class="bcrThinOrange pt4 pb4 font16">{{ layer.title }}</div>
      <div class="font15 mt4 mb4 pl4 pr4 pb2">
        <div v-for="notice in layer.notice">{{ notice }}</div>
      </div>
      <div class="df center tc font15">
        <span class="btn link contrast crOrange" @click="cancel">{{ layer.cancel }}</span>
        <div class="placeholder"></div>
        <span class="btn link primary" @click="submit">{{ layer.submit }}</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      count: 0, isLayer: false, emit: {},
      layer: {},
      payload: {},
      history: [],
    }
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
    submit () {
      switch (true) {
        case this.payload.next == 'rollback':
          this.request('createLayer', { res: 'rollback' });
          break;
        case this.payload.next == 'callback':
          this.payload.submitCallback();
          break;
        default:
          this.bubble(this.layer.submitEvent || 'submitLyaer', this.layer.reqPage);
          this.emit.payload = this.layer.submitItem;
          break;
      }
      this.cancel();
    },
    cancel () {
      this.layer = {};
      this.isLayer = false;
    },
  },
  mounted () {
    this.register('createLayer');
  },
  watch: {
    count () {
      this.cancel();
      this.isLayer = true;
      switch (true) {
        case this.payload.res == 'rollback':
          this.history.pop();
          this.layer = this.history[this.history.length - 1];
          break;
        default:
          this.layer.notice = this.payload.notice;
          this.layer.title = this.payload.title;
          this.layer.submit = this.payload.submit || '确定';
          this.layer.cancel = this.payload.cancel || '取消';
          this.layer.submitEvent = this.payload.submitEvent;
          this.layer.submitItem = this.payload.submitItem;
          this.layer.reqPage = this.payload.reqPage;
          break;
      }
      this.history.push({ ...this.layer });
    }
  }
}
</script>
<style scoped>
  .layer .shadow {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .5;
  }
  .layer .content {
    position: absolute;
    left: .9rem;
    top: 6.7rem;
    width: 8.2rem;
    border-radius: .2rem;
    background-color: #fff;
    overflow: hidden;
    padding-bottom: .6rem;
  }
  .layer .placeholder {
    width: .3rem;
  }
  .layer .btn {
    border-radius: .6rem;
    width: 2.5rem;
    text-align: center;
  }
  .layer .primary {
    background-color: #ffd744;
    border: 2px solid #ffd744;
  }
</style>
