<template></template>
<script>
import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import { Php } from '../../lib';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      failed: {
        request: [],
        response: [],
      },
      count: {
        failed: 0,
      },
      unsoveld: [], soveld: [],
    }
  },
  methods: {
    errorHandle (error) {
      this.unsoveld.push(error);
      this.count.failed++;
    },
    xhr ({ url, options }) {
      return fetch(url, options)
      .catch((e) => {
        const error = { error: e, created_at: Php.time() };
        this.failed.request.push(error);
        this.errorHandle(error);
      })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        try {
          return JSON.parse(res)
        } catch (e) {
          const error = { error: e, created_at: Php.time(), msg: res };
          this.failed.response.push(error);
          this.errorHandle(error);
          return res;
        }
      })
    },
    push (communication) {
      switch (true) {
        case communication.hasOwnProperty('length'):
          for (let i = 0; i < communication.length; i++) {
            const req = communication[i];
            this.xhr(req);
          }
          break;
        default:
          this.xhr(communication);          
          break;
      }
    },
  },
  mounted () {
    self.$components = self.$components || {};
    self.$components.communication = this;
    self.communicationIsLoaded = true;
    self.$xhr = (url, options) => {
      this.xhr({ url, options });
    }
    if (typeof self.communicationOnLoaded == 'function') {
      self.communicationOnLoaded(this);
    }
  },
  watch: {
    'count.failed' () {
      for (let i = 0; i < this.unsoveld.length; i++) {
        console.log('%cError thrown:', 'color: red; font-weight: bold', this.unsoveld[i].error)
        console.log('%cresponse:', 'color: #06ab9a;', this.unsoveld[i])
        this.soveld.push(this.unsoveld[i]);
      }
      this.unsoveld = [];
    }
  }
}
</script>