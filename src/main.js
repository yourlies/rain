import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { routes } from './vendor/route';

import welcome from './vendor/wiki/components/welcome';
import wiki from './vendor/wiki/components/welcome';

console.log(routes);

// 装载vue-router
Vue.use(VueRouter);

// 实例化vue-router
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: routes
});

// 启动应用
const app = new Vue({
    el: '#app',
    template: '<App />',
    components: { App },
    router: router
});
