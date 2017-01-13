import vendorLoadedConfig from '../config/load';

class Plugin {
    constructor (vendorPluginConfig) {
        // 绑定类方法
        ::this.initialize;
        ::this.loadVendorPlugin;
        // 
        this.initialize(vendorPluginConfig);
        this.loadVendorPlugin();
    }

    initialize (vendorPluginConfig) {
        // 框架模块配置
        this.vendorPluginConfig = vendorPluginConfig;
        // 
        this.vendorPluginSetting = {};
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
const options = new Plugin(vendorLoadedConfig.plugin);

export default options.vendorPlugin;
