// 加载框架服务器通信控制组件
import delegation from './components/delegation';
// 加载框架页面交互控制组件
import hook from './components/hook';
// 框架内存通用管理组件
import memory from './components/memory';
// 框架调试组件
import helper from './components/helper';
// 输出程序配置
export default {
    appSetting: {
        components: {
            delegation, hook, memory, helper
        }
    }
};