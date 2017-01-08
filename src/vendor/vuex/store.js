import Vue from 'vue';
import Vuex from 'vuex';
// import vuexConfig from '../../config/vuex';

Vue.use(Vuex);

const state = {
    //定义钩子函数组件
    isTriggered: 0, hook: { subscriptions: [] },
    //定义代理事件数据
    isBubbled: 0, delegation: { subscriptions: [] },
};

const mutations = {
    //通用功能
    TRIGGER_HOOK (state, subscription) {
        state.isTriggered++;
        state.hook.subscriptions.push(subscription);
    },
    RESOLVE_HOOK_SUBSCRIPTIONS (state) {
        state.hook.subscriptions = [];
    },
    //事件代理
    BUBBLE_DELEGATION (state, subscription, page) {
        state.isBubbled++;
        state.delegation.subscriptions.push({
            id: state.isBubbled,
            subscription: subscription,
            page: page,
        });
    },
    RESOLVE_DELEGATION_SUBSCRIPTIONS (state) {
        state.delegation.subscriptions = [];
    },
    //
    SWITCH_ADMIN_MODELS (state, status) {
        state.admin = status;
    },
};

Object.assign(mutations, vuexConfig.store.mutations);
Object.assign(state, vuexConfig.store.state);

//整合初始状态和变更函数，我们就得到了我们所需的 stroe
//至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations,
});
