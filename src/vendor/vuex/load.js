// 加载vue
import Vue from 'vue';
// 加载vue-router
import Vuex from 'vuex';
// 加载core模块
import core from './modules/core';
// 加载helper模块
import helper from './modules/helper';
// 在vue中使用vuex
Vue.use(Vuex);
// 配置store参数
const store = new Vuex.Store({
    modules: {
        core, helper
    }
});
// 配置程序参数
const options = {
    appOptions: {
        store
    }
}
// 输出程序配置
export default options;