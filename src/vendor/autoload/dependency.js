import vendorLoadedConfig from '../config/load';

class Dependency {
    constructor (vendorDependencyConfig) {
        // 绑定类方法
        ::this.initialize;
        ::this.loadVendorDependency;
        // 
        this.initialize(vendorDependencyConfig);
        this.loadVendorDependency();
    }

    initialize (vendorDependencyConfig) {
        // 框架模块配置
        this.vendorDependencyConfig = vendorDependencyConfig;
        // 
        this.vendorDependencySetting = {};
        this.vendorDependency = {};
    }
    // 
    loadVendorDependency () {
        for (let [key, value] of Object.entries(this.vendorDependencyConfig)) {
            const dependency = require('../dependency/' + value + '/load');
            for (let [key, value] of Object.entries(dependency.default.vendorModuleDependency)) {
                this.vendorDependency[key] = value;
            }
        }
    }
}
const options = new Dependency(vendorLoadedConfig.dependency);

export default options.vendorDependency;
