// load profile and get module configuration
import vendorLoadedConfig from '../config/load';
const vendorModuleConfig = vendorLoadedConfig.module;
// define module container
const vendorModule = [];
// load module
for (let [key, value] of Object.entries(vendorModuleConfig)) {
  const module = require('../' + value + '/load');
  vendorModule.push(module.default);
}
// defined module options container
let vendorModuleOptions = {};
// combine module's options
vendorModule.map((vendorModule) => {
  if (vendorModule.hasOwnProperty('appOptions')) {
    vendorModuleOptions = { ...vendorModuleOptions, ...vendorModule.appOptions };
  }
});
// provided options
const moduleOptions = vendorModuleOptions;
export { moduleOptions };
