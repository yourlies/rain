// import vuexConfig from '../../config/vuex';

class getters {
    //
    static getDelegationListener = state => state.isBubbled;
    static getDelegationSubscriptions = state => state.delegation.subscriptions;
    //
    static getHookListener = state => state.isTriggered;
    static getHookSubscriptions = state => state.hook.subscriptions;
}

Object.assign(getters, vuexConfig.getters);

export default getters;