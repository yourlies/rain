import { Php, Func } from '../lib';
import App from '../../App';
import vendorModuleConfig from '../config/load';

class AutoLoad {
    constructor () {
        // 绑定类方法
        ::this.initialize;
        ::this.loadAppOptions;
        ::this.loadVendorModule;
        // 初始化路由
        this.initialize();
        // 加载框架模块
        this.loadVendorModule();
        // 加载程序入口配置选项
        this.loadAppOptions();
    }

    initialize () {
        // 框架模块配置
        this.vendorModuleConfig = vendorModuleConfig;
        // 框架模块
        this.vendorModule = {};
        // 程序入口配置选项
        this.appOptions = {};
    }
    // 加载程序入口配置选项
    loadAppOptions () {
        this.appOptions.el = '#app';
        this.appOptions.template = '<App />';
        this.appOptions.components = { App };
        for (let [key, value] of Object.entries(this.vendorModule)) {
            Object.assign(this[key], value);
        }
    }
    // 加载框架内部模块
    loadVendorModule () {
        for (let [key, value] of Object.entries(vendorModuleConfig)) {
            const module = require('../' + value + '/load');
            Object.assign(this.vendorModule, module.default);
        }
    }
}

const options = new AutoLoad();
const appOptions = options.appOptions;

export { appOptions };
