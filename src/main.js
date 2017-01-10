// 加载vue
import Vue from 'vue';
// 加载程序各种配置
import { appOptions, appSetting } from './vendor/autoload/module';
// 初始化程序设置
appSetting(Vue);
// 启动应用
const app = new Vue(appOptions);
