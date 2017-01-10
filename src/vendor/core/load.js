// 加载框架服务器通信控制组件
import delegation from './components/delegation';
// 加载框架页面交互控制组件
import hook from './components/hook';
// 输出程序配置
export default {
    appSetting: {
        components: {
            delegation, hook
        }
    }
};