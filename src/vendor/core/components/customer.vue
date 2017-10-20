<template></template>
<script>
import Func from '../../lib';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      customer: { request: [], register: {} },
      async: [],
      pool: {},
    }
  },
  methods: {
    resolveRequest () {
      this.$store.dispatch('resolveCustomerRequest');
    },
    resolveRegister () {
      this.$store.dispatch('resolveCustomerRegister');
    },
  },
  computed: {
    ...mapGetters({
      isRequest: 'getCustomerRequestListener',
      isRegister: 'getCustomerRegisterListener',
      unresolvedRequest: 'getCustomerRequest',
      unresolvedRegister: 'getCustomerRegister',
    })
  },
    watch: {
      isRequest: function () {
        this.$nextTick(() => {
          this.customer.request = [...this.unresolvedRequest, ...this.customer.request];
          for (let i = 0; i < this.unresolvedRequest.length; i++) {
            const { request, payload } = this.unresolvedRequest[i];
            switch (typeof this.customer.register[request]) {
              case 'undefined':
                this.async.push(this.unresolvedRequest[i]);
                break;
              case 'function':
                this.pool[request](payload);
                break;
              case 'object':
                for (let j = 0; j < this.pool[request].length; j++) {
                  this.pool[request][j](payload);
                }
                break;
            }
          }
          this.resolveRequest();
        })
      },
      isRegister: function () {
        for (let i = 0; i < this.unresolvedRegister.length; i++) {
          const { register, page } = this.unresolvedRegister[i];
          this.customer.register[register] = page;
          switch (typeof this.pool[register]) {
            case 'undefined':
              this.pool[register] = page.$pool[register];
              break;
            case 'function':
              this.pool[register] = [page.$pool[register], this.pool[register]];
              break;
            case 'object':
              this.pool[register].push(page.$pool[register]);
              break;
          }
        }
        this.resolveRegister();
        for (let i = 0; i < this.async.length; i++) {
          const { request, payload } = this.async[i];
          if (this.customer.register.hasOwnProperty(request)) {
            this.pool[request](payload);
            this.async.splice(i, 1);
            i--;
          }
        }

      }
    },
    mounted () {
      self.$request = (subscription, payload) => {
        this.$request(subscription, payload)
      }
      self.$register = (subscription, payload) => {
        return this.$register(subscription, payload);
      }
      self.$components = self.$components || {};
      self.$components.customer = {};
      self.$components.customer.log = {
        request: this.customer.request,
        register: this.customer.register,
        subscribers: this.pool,
      }
    }
}
</script>