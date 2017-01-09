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
        this.vendorModule = [];
        // 程序入口配置选项
        this.appOptions = {};
    }
    // 加载程序入口配置选项
    loadAppOptions () {
        // 设置程序文档结点
        this.appOptions.el = '#app';
        // 设置程序模板
        this.appOptions.template = '<App />';
        // 设置程序根组件
        this.appOptions.components = { App };
        this.vendorModule.map((vendorModule) => {
            // 循环加载模块并将其赋值
            for (let [key, value] of Object.entries(vendorModule)) {
                Object.assign(this[key], value);
            }
        })
    }
    // 加载框架内部模块
    loadVendorModule () {
        // 循环加载模块
        for (let [key, value] of Object.entries(vendorModuleConfig)) {
            const module = require('../' + value + '/load');
            this.vendorModule.push(module.default);
        }
    }
}
// 实例化autoload
const options = new AutoLoad();
// 程序配置选项
const appOptions = options.appOptions;

export { appOptions };
