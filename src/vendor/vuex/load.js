// 加载vue
import Vue from 'vue';
// 加载vue-router
import Vuex from 'vuex';
// 
import core from './modules/core';

// 在vue中使用vue-router
Vue.use(Vuex);

// 实例化vue-router
const store = new Vuex.Store({
    modules: {
        core
    }
});
// 配置参数
const options = {
    appOptions: {
        store
    }
}
// 输出router
export default options;