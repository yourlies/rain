// state
const state = {
  // 定义钩子函数组件
  isTriggered: 0, hook: { subscriptions: [] },
  // 定义代理事件数据
  isBubbled: 0, isModel: 0,
  delegation: { subscriptions: [], subscribers: [], counter: 0, },
  // 
  isApplied: 0, memory: { request: [], variable: {} },
  // 
  isRegister: 0, isRequest: 0, customer: { register: [], request: [], counter: 0, },
}
// getters
const getters = {
  //
  getDelegationBubbleListener: state => state.isBubbled,
  getDelegationModelListener: state => state.isModel,
  getDelegationSubscriptions: state => state.delegation.subscriptions,
  getDelegationSubscribers: state => state.delegation.subscribers,
  //
  getHookListener: state => state.isTriggered,
  getHookSubscriptions: state => state.hook.subscriptions,
  // 
  getAllocateListener: state => state.isApplied,
  getAllocateRequest: state => state.memory.request,
  getAllocateVariable: state => state.memory.variable,
  // 
  getCustomerRequestListener: state => state.isRequest,
  getCustomerRegisterListener: state => state.isRegister,
  getCustomerRequest: state => state.customer.request,
  getCustomerRegister: state => state.customer.register,
}
// actions
const actions = {
  // 触发钩子事件
  triggerHook ({ commit }, subscription) {
    commit('TRIGGER_HOOK', subscription);
  },
  // 清除钩子事件
  resolveHookSubscriptions ({ commit }) {
    commit('RESOLVE_HOOK_SUBSCRIPTIONS');
  },
  // 冒泡代理事件
  bubbleDelegation ({ commit }, { subscription, page, rely }) {
    commit('BUBBLE_DELEGATION', { subscription, page, rely });
  },
  modelDelegation ({ commit }, { subscription, page, processor, onloaded }) {
    commit('MODEL_DELEGATION', { subscription, page, processor, onloaded });
  },
  // 清除代理事件
  resolveDelegationSubscriptions ({ commit }) {
    commit('RESOLVE_DELEGATION_SUBSCRIPTIONS');
  },
  // 清除代理事件
  resolveDelegationSubscribers ({ commit }) {
    commit('RESOLVE_DELEGATION_SUBSCRIBERS');
  },
  // 冒泡用户组件事件
  requestCustomer ({ commit }, { request, payload, page }) {
    commit('REQUEST_CUSTOMER', { request, payload, page });
  },
  // 注册用户组件事件
  registerCustomer ({ commit }, { register, page }) {
    commit('REGISTER_CUSTOMER', { register, page });
  },
  // 清除用户组件事件
  resolveCustomerRegister ({ commit }) {
    commit('RESOLVE_CUSTOMER_REGISTER');
  },
  // 清除用户组件事件
  resolveCustomerRequest ({ commit }) {
    commit('RESOLVE_CUSTOMER_REQUEST');
  },
  // 
  allocateMemory ({ commit }, variable) {
    commit('ALLOCATE_MEMORY', variable);
  },
  //
  modifyMemory ({ commit }, variable) {
    commit('MODIFY_MEMORY', variable)
  },
  //
  resolveAllocateRequest({ commit }) {
    commit('RESOLVE_ALLOCATE_REQUEST');
  }
}
// mutations
const mutations = {
  // 触发钩子事件
  TRIGGER_HOOK (state, subscription) {
    state.isTriggered++;
    state.hook.subscriptions.push(subscription);
  },
  // 清除钩子事件
  RESOLVE_HOOK_SUBSCRIPTIONS (state) {
    state.hook.subscriptions = [];
  },
  // 冒泡代理事件
  BUBBLE_DELEGATION (state, { subscription, page, rely }) {
    state.isBubbled++;
    state.delegation.counter++;
    state.delegation.subscriptions[state.delegation.counter - 1] = {
      id: state.isBubbled,
      subscription,
      page,
      rely
    }
  },
  MODEL_DELEGATION (state, { subscription, page, processor, onloaded }) {
    state.isModel++;
    state.delegation.subscribers.push({
      id: state.isModel,
      subscription,
      page,
      processor,
      onloaded,
    })
  },
  // 清除代理事件
  RESOLVE_DELEGATION_SUBSCRIPTIONS (state) {
    state.delegation.counter = 0;
    state.delegation.subscriptions = [];
  },
  RESOLVE_DELEGATION_SUBSCRIBERS (state) {
    state.delegation.subscribers = [];
  },
  // 冒泡用户组件事件
  REQUEST_CUSTOMER (state, { request, payload, page }) {
    state.isRequest++;
    state.customer.counter++;
    state.customer.request[state.customer.counter - 1] = { request, payload, page };
  },
  REGISTER_CUSTOMER (state, { register, page }) {
    state.isRegister++;
    state.customer.register.push({ register, page });
  },
  // 清除用户组件事件
  RESOLVE_CUSTOMER_REQUEST ({ commit }) {
    state.customer.counter = 0;
    state.customer.request = [];
  },
  // 清除用户组件事件
  RESOLVE_CUSTOMER_REGISTER ({ commit }) {
    state.customer.register = [];
  },
  //
  ALLOCATE_MEMORY (state, variable) {
    state.isApplied++;
    state.memory.request.push(variable);
  },
  //
  MODIFY_MEMORY (state, variable) {
    state.memory.variable = { ...state.memory.variable, ...variable };
  },
  //
  RESOLVE_ALLOCATE_REQUEST (state) {
    state.memory.request = [];
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}