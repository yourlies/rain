import { Php, Func } from '../lib';
import App from '../../App';
import { componentSetting } from './component';
import { moduleOptions } from './module';

const appSetting = (Vue) => {
    componentSetting(Vue);
};
const appOptions = {};
// 设置程序文档结点
appOptions.el = '#app';
// 设置程序模板
appOptions.template = '<App />';
// 设置程序根组件
appOptions.components = { App };
Object.assign(appOptions, moduleOptions);

export { appSetting, appOptions }
