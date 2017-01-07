import { Php, Func } from '../lib';
import userRouterConfig from '../../config/router';
import vendorRouterConfig from '../config/router';

class Route {
    constructor () {
        // 绑定类方法
        ::this.loadUserRouterViews;
        ::this.loadVendorRouterViews;
        ::this.loadAppRoutes;
        ::this.initialize
        // 初始化路由
        this.initialize();
        // 装载框架内部路由页面
        this.loadVendorRouterViews();
        // 装载用户路由页面
        this.loadUserRouterViews();
        // 设置路由
        this.loadAppRoutes();
    }

    initialize () {
        // 用户路由配置
        this.userRouterConfig = userRouterConfig;
        // 框架内部路由配置
        this.vendorRouterConfig = vendorRouterConfig;
        // 程序路由页面
        this.appRoutesViews = {};
        // 初始化根目录
        this.appRoutesViews['./'] = {};
        // 程序路由配置
        this.appRoutesConfig = {};
        // 合并路由
        Object.assign(this.appRoutesConfig, this.vendorRouterConfig.routes);
        // 用户路由将覆盖框架内部路由
        Object.assign(this.appRoutesConfig, this.userRouterConfig.routes);
        // 程序路由
        this.appRoutes = [];
    }
    // 加载框架内部路由页面
    loadVendorRouterViews () {
        for (let [key, value] of Object.entries(this.vendorRouterConfig.routes)) {
            const dir = Php.explode('/', value);
            const view = require('../' + value);
            Func.storeClassification(this.appRoutesViews, dir, view);
        }
    }
    // 加载程序路由页面
    loadUserRouterViews () {
        for (let [key, value] of Object.entries(this.userRouterConfig.routes)) {
            const dir = Php.explode('/', value);
            const view = require('../../views/' + value);
            Func.storeClassification(this.appRoutesViews, dir, view);
        }
    }
    // 加载程序路由
    loadAppRoutes () {
        // 设置框架内部路由（会被程序路由覆盖）
        for (let [key, value] of Object.entries(this.appRoutesConfig)) {
            const dir = Php.explode('/', value);
            this.appRoutes.push({ path: key, component: Func.readClassification(this.appRoutesViews, dir) });
        }
    }
}

const router = new Route();
export default router.appRoutes;
