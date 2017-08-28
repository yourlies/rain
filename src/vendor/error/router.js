/**
 * modify: <因雨而生 958142428@qq.com 2017-05-02>
 */

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
            // 只要用户部分设置了路由，根目录路由即不加载
            if (key == '/' && !Func.isEmptyObject(this.userRouterConfig.routes)) {
                continue;
            }
            // 如果用户没有补完.vue后缀，自动补全
            if (!value.match('.vue')) {
                value = `${value}.vue`;
            }
            // 如果用户部分重写了路由，不再加载框架内部该路由的页面
            if (!this.userRouterConfig.routes.hasOwnProperty(key)) {
                const view = require('../' + value);
                Func.storeClassification(this.appRoutesViews, dir, view);
            }
        }
    }
    // 加载程序路由页面
    loadUserRouterViews () {
        for (let [key, value] of Object.entries(this.userRouterConfig.routes)) {
            if (/^\/{1,}/.test(value)) {
                value = value.match(/^\/{1,}(.*)/)[1];
            }
            const dir = Php.explode('/', value);
            const view = require('../../views/' + value);
            Func.storeClassification(this.appRoutesViews, dir, view);
        }
    }
    // 加载程序路由
    loadAppRoutes () {
        // 设置框架路由（框架内部路由将会被程序路由覆盖）
        for (let [key, value] of Object.entries(this.appRoutesConfig)) {
            // 检查路由中的key是否规范
            if (key.charAt(0) != '/') {
                key = '/' + key;
            }
            if (/^\/{2,}/.test(key)) {
                console.warn('不规范的路由key，' + '%c' + key, 'color:red;font-weight:bold', '，请检查并按照文档规范修正');
                key = '/' + key.match(/^\/{0,}(.*)/)[1];
            }
            // 检查路由中的value是否规范
            if (/^\/{2,}/.test(value)) {
                console.warn('不规范的路由value' + '%c' + value, 'color:red;font-weight:bold', '，请检查并按照文档规范修正');
                value = '/' + value.match(/^\/{0,}(.*)/)[1];
            }
            if (value.charAt(0) == '/') {
                value = value.match(/^\/{1,}(.*)/)[1];
            }
            // 如果设置了用户部分路由而没有设置用户根目录路由，则不加载入程序路由配置
            if (key == '/' && !this.userRouterConfig.routes.hasOwnProperty('/')) {
                continue;
            }
            const dir = Php.explode('/', value);
            this.appRoutes.push({ path: key, component: Func.readClassification(this.appRoutesViews, dir) });
        }
    }
}

const router = new Route();
export default router.appRoutes;
