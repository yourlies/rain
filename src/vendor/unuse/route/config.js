import { Php, Func } from '../lib';
import routerConfig from '../../config/router';

class Config {
    constructor () {
        ::this.loadViews; ::this.setRouter; ::this.initialize
        this.initialize(); this.loadViews();
        this.setRouter(); this.setAdmin(); this.setCustom();
    }

    initialize () {
        this.config = routerConfig;
        this.views = {}; this.views['./'] = {};
        this.admin = {}; this.custom = {}; this.router = {};
    }

    loadViews () {
        for (let [key, value] of Object.entries(this.config.router)) {
            const view = require('../../views/' + value);
            const dir = Php.explode('/', value);
            Func.storeClassification(this.views, dir, view);
        }
    }

    setRouter () {
        for (let [key, value] of Object.entries(this.config.router)) {
            const dir = Php.explode('/', value);
            if (/[^]\([a-z_][a-z0-9_]+\)/gi.test(key)) {
                const matches = key.match(/\([a-z_][a-z0-9_]+\)/gi);
                key = key.replace(/([^])\([a-z_][a-z0-9_]+\).*/i, '$1');
                this.router[key] = this.router[key] || {};
                this.router[key]['name'] = Php.trim(matches[0], '()');
            }
            this.router[key] = this.router[key] || {};
            this.router[key]['component'] = Func.readClassification(this.views, dir);
        }
    }

    setAdmin () {
        const admin = {};
        this.config.admin.map((value) => {
            admin[value] = admin[value] || '';
        });
        for (let [key, value] of Object.entries(this.config.router)) {
            if (admin.hasOwnProperty(value)) {
                this.admin[key] = this.admin[key] || '';
            }
        }
    }

    setCustom () {
        const custom = {};
        this.config.custom.map((value) => {
            custom[value] = custom[value] || '';
        });
        for (let [key, value] of Object.entries(this.config.router)) {
            if (custom.hasOwnProperty(value)) {
                this.custom[key] = this.custom[key] || '';
            }
        }
    }
}

const config = new Config();

export default config;
