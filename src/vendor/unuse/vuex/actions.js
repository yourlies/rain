import vuexConfig from '../../config/vuex';

class actions {
    //通用功能函数
    static triggerHook ({ dispatch }, subscription) {
        dispatch('TRIGGER_HOOK', subscription);
    }
    static resolveHookSubscriptions ({dispatch}) {
        dispatch('RESOLVE_HOOK_SUBSCRIPTIONS');
    }
    //事件代理
    static bubbleDelegation ({ dispatch }, subscription, input) {
        dispatch('BUBBLE_DELEGATION', subscription, input);
    }
    static resolveDelegationSubscriptions ({ dispatch }) {
        dispatch('RESOLVE_DELEGATION_SUBSCRIPTIONS');
    }
};

Object.assign(actions, vuexConfig.actions);

export default actions;