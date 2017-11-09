/**
 * modify: <因雨而生 958142428@qq.com 2017-11-08>
 */

import { Php, Func, Core } from '../lib';
import userRouterConfig from '../../config/router';

const appRoutesConfig = {};
Object.assign(appRoutesConfig, userRouterConfig.routes);

const appRoutes = [];
const appRoutesViews = {};
appRoutesViews['./'] = {};

for (let [key, value] of Object.entries(userRouterConfig.routes)) {
  appRoutes.push({
    path: key, component: value,
  })
}

export default appRoutes;
