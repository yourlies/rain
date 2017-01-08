import moduleConfig from '../config/load';
import App from '../../App';
const appOptions = {
    el: '#app',
    template: '<App />',
    components: { App },
}
for (let [key, value] of Object.entries(moduleConfig)) {
    const module = require('../' + value + '/load');
    Object.assign(appOptions, module.default.appOptions);
}
export { appOptions };