// 加载vue
import Vue from 'vue';
// 加载vue-router
import VueRouter from 'vue-router';
// 在vue中使用vue-router
Vue.use(VueRouter);
// 加载程序路由
import routes from './router';

// filter dirty routes
for (let i = 0; i < routes.length; i++) {
  if (typeof routes[i].component == 'object'
    && routes[0].component.default) {
    routes[i].component = routes[i].component.default;    
  }
}

// 初始化vue-router数据
const routerOptions = {
  mode: 'history',
  base: __dirname,
  routes
}
// 实例化vue-router
const router = new VueRouter(routerOptions);
// 配置参数
const options = {
  appOptions: {
    router
  }
}
// 输出router
export default options;