// load profile and get module configuration
import vendorLoadedConfig from '../config/load';
const vendorModuleConfig = vendorLoadedConfig.module;
// define module and components container
const vendorModule = [];
const components = [];
// load module
for (let [key, value] of Object.entries(vendorModuleConfig)) {
  const module = require('../' + value + '/load');
  vendorModule.push(module.default);
}
// load module's necessary components
vendorModule.map((vendorModule) => {
  // module must has property appSetting and components configuration in it
  if (vendorModule.hasOwnProperty('appSetting')
    && vendorModule.appSetting.hasOwnProperty('components')) {
    for (let [key, value] of Object.entries(vendorModule.appSetting.components)) {
      components.push(value);
    }
  }
})
// all components just added in vue's main template called App.vue
const loadComponents = function (Vue, components) {
  Vue.component('vendor-components', {
    render (createElement) {
      return createElement('div',
        Array.apply(null, { length: components.length }).map((value, key) => {
          return createElement(components[key], {
            attrs: { class: 'core-' + key }
          });
        })
      );
    }
  });
}
// provieded an api to configure
const componentSetting = (Vue) => {
  loadComponents(Vue, components);
}
export { componentSetting };
