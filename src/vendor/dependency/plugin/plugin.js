// 加载依赖模块    
import pluginConfig from '../../../config/plugin';
// 插件程序加载类
class Plugin {
    constructor () {
        this.plugins = {};
        this.subscriber = pluginConfig.plugins;
        this.subscription = {};
        this.hooks = {};
        this.loadPlugins();
        this.addSubscription();
        this.addHooks();
    }

    loadPlugins () {
        for (let i = 0; i < this.subscriber.length; i++) {
            const subscriber = this.subscriber[i];
            try {
                this.plugins[subscriber] = require(`../../../plugin/${subscriber}/hook`);
            } catch (error) {
            console.warn('failed to require the plugin ' + subscriber + ', please check the plugin is conforms with the regulations');
            }
        }
    }

    addSubscription () {
        for (let index in this.plugins) {
            const subscriber = this.plugins[index];
            const subscription = subscriber.default.subscription;
            const callback = subscriber.default.callback;
            for (let i = 0; i < subscription.length; i++) {
                if (!this.subscription.hasOwnProperty(subscription[i])) {
                    this.subscription[subscription[i]] = [];
                }
                this.subscription[subscription[i]].push(callback);
            }
        }
    }

    addHooks () {
        const trigger = (subscription) => {
            if (this.subscription.hasOwnProperty(subscription)) {
                for (let i = 0; i < this.subscription[subscription].length; i++) {
                    this.subscription[subscription][i](subscription);
                }
            }
        };
        this.hooks = {
            trigger: trigger,
        };
    }
}

const plugin = new Plugin();
export default plugin.hooks;