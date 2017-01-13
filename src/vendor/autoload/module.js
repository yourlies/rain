import vendorLoadedConfig from '../config/load';

class Module {
    constructor (vendorModuleConfig) {
        // 绑定类方法
        ::this.initialize;
        ::this.loadVendorModule;
        ::this.loadVendorModuleSetting;
        //
        this.initialize(vendorModuleConfig);
        this.loadVendorModule();
        this.loadVendorModuleSetting();
    }

    initialize (vendorModuleConfig) {
        // 框架模块配置
        this.vendorModuleConfig = vendorModuleConfig;
        this.vendorModule = [];
        this.vendorModuleSetting = {};
    }
    //
    loadVendorModule () {
        // 循环加载模块
        for (let [key, value] of Object.entries(this.vendorModuleConfig)) {
            const module = require('../' + value + '/load');
            this.vendorModule.push(module.default);
        }
    }

    loadVendorModuleSetting () {
        // 循环加载各个模块的程序配置选项
        this.vendorModule.map((vendorModule) => {
            if (vendorModule.hasOwnProperty('appOptions')) {
                Object.assign(this.vendorModuleSetting, vendorModule.appOptions);
            }
        });
    }
}

const module = new Module(vendorLoadedConfig.module);
const moduleOptions = module.vendorModuleSetting;

export { moduleOptions };
