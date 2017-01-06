import { Php, Func } from '../lib';
import routerConfig from '../../config/router';
import vendorRouterConfig from '../config/router';

class Config {
    constructor () {
        ::this.loadViews; ::this.loadVendorViews; ::this.setRoutes; ::this.initialize
        this.initialize(); this.loadViews(); this.loadVendorViews();
        this.setRoutes();
    }

    initialize () {
        this.config = routerConfig;
        this.vendorConfig = vendorRouterConfig;
        this.views = {}; this.views['./'] = {};
        this.admin = {}; this.custom = {}; this.router = [];
    }

    loadVendorViews () {
        for (let [key, value] of Object.entries(this.vendorConfig.router)) {
            const view = require('../../views/' + value);
            const dir = Php.explode('/', value);
            Func.storeClassification(this.views, dir, view);
        }
    }

    loadViews () {
        for (let [key, value] of Object.entries(this.config.router)) {
            const view = require('../../views/' + value);
            const dir = Php.explode('/', value);
            Func.storeClassification(this.views, dir, view);
        }
    }

    setRoutes () {
        for (let [key, value] of Object.entries(this.config.router)) {
            const dir = Php.explode('/', value);
            this.router.push({ path: key, component: Func.readClassification(this.views, dir) });
        }
        for (let [key, value] of Object.entries(this.vendorConfig.router)) {
            const dir = Php.explode('/', value);
            this.router.push({ path: key, component: Func.readClassification(this.views, dir) });
        }
    }
}

const config = new Config();

export default config;
