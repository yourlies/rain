// 加载插件
import plugin from './plugin';
// 配置插件参数
const options = {
    vendorModuleDependency: {
        plugin
    }
}
// 输出router
export default options;