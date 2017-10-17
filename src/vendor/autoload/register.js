const register = {};
register.install = function (Vue, options) {
  // register event bubble function
  Vue.prototype.$bubble = function (subscription, payload = {}) {
    this.$store.dispatch('bubbleDelegation', { subscription, page: this, ...payload });
  }
  // customer register event function
  Vue.prototype.$register = function (subscription, payload = {}) {
    this.$store.dispatch('registerCustomer', { register: subscription, page: this, ...payload });
    this.$pool = typeof this.$pool == 'object' ? this.$pool : {};
    return {
      then: (func) => {
        if (typeof func == 'function') {
          this.$pool[subscription] = func;
        }
      }
    }
  }
  // customer request event function
  Vue.prototype.$request = function (subscription, payload = {}) {
    this.$store.dispatch('requestCustomer', { request: subscription, page: this, payload });
  }
  // customer aollocate variable
  Vue.prototype.$allocate = function (payload = {}) {
    this.$store.dispatch('allocateMemory', payload);
  }
}

const registerSetting = function (Vue) {
  Vue.use(register)
}

export { registerSetting }