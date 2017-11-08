const register = {};

const processor = function (page, subscription) {
  this.page = page;
  this.subscription = subscription;
  this.pool = {};
}
processor.prototype.mount = function (methods) {
  if (typeof methods == 'object') {
    for (let i = 0; i < methods.length; i++) {
      this[methods[i]] = function (method) {
        this.pool[methods[i]] = method;
        if (i == methods.length - 1) {
          this.page.$store.dispatch('requestCustomer', {
            request: this.subscription, page: this, payload: this.pool
          });
        }
        return this;
      }
    }
  } else {
    this[methods] = function (method) {
      this.pool[methods[i]] = method;
      this.page.$store.dispatch('requestCustomer', {
        request: this.subscription, page: this, payload: this.pool
      });
      return this;
    }
  }
}
processor.prototype.then = function (func) {
  func(this);
  return this;
}

register.install = function (Vue, options) {
  // register event bubble function
  Vue.prototype.$bubble = function (subscription, payload = {}) {
    this.$store.dispatch('bubbleDelegation', { subscription, page: this, ...payload });
  }
  // event subscriber for component
  Vue.prototype.$model = function (subscription, payload = {}) {
    this.$store.dispatch('modelDelegation', { subscription, page: this, ...payload });
  }
  // customer register event function
  Vue.prototype.$register = function (subscription, payload = {}) {
    this.$store.dispatch('registerCustomer', {
      register: subscription, page: this, ...payload
    });
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
  // customer extend a component
  Vue.prototype.$extend = function (componentOptions) {
    return componentOptions;
    // const component = Vue.extend(componentOptions);
    // return new component();
  }
  Vue.prototype.$processor = function (subscription) {
    return new processor(this, subscription);
  }
}

const registerSetting = function (Vue) {
  Vue.use(register)
}

export { registerSetting }