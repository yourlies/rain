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
            if (this.customer.register.hasOwnProperty(request)) {
              this.pool[request](payload);
            } else {
              this.async.push(this.unresolvedRequest[i]);
            }
          }
          this.resolveRequest();
        })
      },
      isRegister: function () {
        for (let i = 0; i < this.unresolvedRegister.length; i++) {
          const { register, page } = this.unresolvedRegister[i];
          this.customer.register[register] = page;
          this.pool[register] = page.$pool[register];
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
      }
    }
}
</script>