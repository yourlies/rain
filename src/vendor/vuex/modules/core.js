// state
const state = {
    //定义钩子函数组件
    isTriggered: 0, hook: { subscriptions: [] },
    //定义代理事件数据
    isBubbled: 0, delegation: { subscriptions: [] },
}
// getters
const getters = {
    //
    getDelegationListener: state => state.isBubbled,
    getDelegationSubscriptions: state => state.delegation.subscriptions,
    //
    getHookListener: state => state.isTriggered,
    getHookSubscriptions: state => state.hook.subscriptions
}
// actions
const actions = {
    // 触发钩子事件
    triggerHook ({ commit }, subscription) {
        commit('TRIGGER_HOOK', { subscription });
    },
    // 清除钩子事件
    resolveHookSubscriptions ({ commit }) {
        commit('RESOLVE_HOOK_SUBSCRIPTIONS');
    },
    // 冒泡代理事件
    bubbleDelegation ({ commit }, subscription, input) {
        commit('BUBBLE_DELEGATION', subscription, input);
    },
    // 清除代理事件
    resolveDelegationSubscriptions ({ commit }) {
        commit('RESOLVE_DELEGATION_SUBSCRIPTIONS');
    }
}
// mutations
const mutations = {
    // 触发钩子事件
    TRIGGER_HOOK (state, { subscription }) {
        state.isTriggered++;
        state.hook.subscriptions.push(subscription);
    },
    // 清除钩子事件
    RESOLVE_HOOK_SUBSCRIPTIONS (state) {
        state.hook.subscriptions = [];
    },
    // 冒泡代理事件
    BUBBLE_DELEGATION (state, subscription, page) {
        console.log(subscription)
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
}

export default {
    state,
    getters,
    actions,
    mutations
}