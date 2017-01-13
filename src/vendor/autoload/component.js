import vendorLoadedConfig from '../config/load';

class Component {
    constructor (vendorModuleConfig) {
        // 绑定类方法
        ::this.initialize;
        ::this.loadVendorModule;
        ::this.loadVendorComponents;
        ::this.loadComponents;
        // 初始化实例
        this.initialize(vendorModuleConfig);
        this.loadVendorModule();
        this.loadVendorComponents();
    }
    // 
    initialize (vendorModuleConfig) {
        // 
        this.vendorModuleConfig = vendorModuleConfig;
        this.vendorComponents = [];
        this.vendorModule = [];
    }
    // 加载框架内部模块
    loadVendorModule () {
        // 循环加载模块
        for (let [key, value] of Object.entries(this.vendorModuleConfig)) {
            const module = require('../' + value + '/load');
            this.vendorModule.push(module.default);
        }
    }
    // 加载框架内部组件
    loadVendorComponents () {
        const vendorComponents = this.vendorComponents;
        // 循环加载各个模块的组件
        this.vendorModule.map((vendorModule) => {
            if (vendorModule.hasOwnProperty('appSetting') && vendorModule.appSetting.hasOwnProperty('components')) {
                for (let [key, value] of Object.entries(vendorModule.appSetting.components)) {
                    vendorComponents.push(value);
                }
            }
        })
    }
    // 
    loadComponents (Vue, components) {
        Vue.component('vendor-components', {
            render: function (createElement) {
                return createElement('div',
                    Array.apply(null, { length: 2 }).map((value, key) => {
                        return createElement(components[key], {
                            attrs: { class: 'core-' + key }
                        });
                    })
                );
            }
        });
    }
}

const component = new Component(vendorLoadedConfig.module);
const componentSetting = (Vue) => {
    component.loadComponents(Vue, component.vendorComponents);
}
export { componentSetting };
