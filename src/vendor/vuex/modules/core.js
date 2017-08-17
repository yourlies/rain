// state
const state = {
    // 定义钩子函数组件
    isTriggered: 0, hook: { subscriptions: [] },
    // 定义代理事件数据
    isBubbled: 0, delegation: { subscriptions: [] },
    // 
    isApplied: 0, memory: { request: [], variable: [] },
    // 
    isRegister: 0, isRequest: 0, customer: { register: [], request: [] },
}
// getters
const getters = {
    //
    getDelegationListener: state => state.isBubbled,
    getDelegationSubscriptions: state => state.delegation.subscriptions,
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
    bubbleDelegation ({ commit }, { subscription, page }) {
        commit('BUBBLE_DELEGATION', { subscription, page });
    },
    // 清除代理事件
    resolveDelegationSubscriptions ({ commit }) {
        commit('RESOLVE_DELEGATION_SUBSCRIPTIONS');
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
    BUBBLE_DELEGATION (state, { subscription, page }) {
        state.isBubbled++;
        state.delegation.subscriptions.push({
            id: state.isBubbled,
            subscription: subscription,
            page: page,
        });
    },
    // 清除代理事件
    RESOLVE_DELEGATION_SUBSCRIPTIONS (state) {
        state.delegation.subscriptions = [];
    },
    // 冒泡用户组件事件
    REQUEST_CUSTOMER (state, { request, payload, page }) {
        state.isRequest++;
        state.customer.request.push({ request, payload, page });
    },
    REGISTER_CUSTOMER (state, { register, page }) {
        state.isRegister++;
        state.customer.register.push({ register, page });
    },
    // 清除用户组件事件
    RESOLVE_CUSTOMER_REQUEST ({ commit }) {
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
        state.memory.variable = variable;
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