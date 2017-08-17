<template></template>
<script>
import Func from '../../lib';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      customer: { request: [], register: {} }
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
            if (this.customer.register.hasOwnProperty(this.unresolvedRequest[i].request)) {
              this.customer.register[this.unresolvedRequest[i].request].count++;
              this.customer.register[this.unresolvedRequest[i].request].payload = this.unresolvedRequest[i].payload;
            }
          }
          this.resolveRequest();
        })
      },
      isRegister: function () {
        for (let i = 0; i < this.unresolvedRegister.length; i++) {
          this.customer.register[this.unresolvedRegister[i].register] = this.unresolvedRegister[i].page;
        }
        this.resolveRegister();
      }
    },
    mounted () {
      // 
    }
}
</script>