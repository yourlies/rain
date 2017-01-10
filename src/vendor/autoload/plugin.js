import vendorLoadedConfig from '../config/load';

// 加载类库函数
import { Php, Func } from '../lib';
// 加载根组件
import App from '../../App';
// 自动加载类
class PluginAutoLoad {
    constructor () {
        // 绑定类方法
        ::this.initialize;
        ::this.loadVendorPlugin;
        //
        this.initialize();
        this.loadVendorPlugin();
    }

    initialize () {
        // 框架模块配置
        this.vendorPluginConfig = vendorLoadedConfig.plugin;
        //
        this.vendorPlugin = {};
    }
    //
    loadVendorPlugin () {
        for (let [key, value] of Object.entries(this.vendorPluginConfig)) {
            const plugin = require('../' + value + '/load');
            for (let [key, value] of Object.entries(plugin.default.vendorModulePlugin)) {
                this.vendorPlugin[key] = value;
            }
        }
    }
}
const options = new PluginAutoLoad();

export default options.vendorPlugin;
