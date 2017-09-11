/* author: damon<cuizhongzhi@moyi365.com>
 * Date: 2016-12-26
 * nameSpace: bridgeClass
 * js与app交互
 * 1. bridgeClass.jsEventHook app可以调用js的方法,
      以bridgeClass.jsEventHook['your function name '] = function() {...} 的形式定义到各自的业务中去
 * 2. bridgeClass.toJsEvent 提供给app调用的统一方法, mixParams为json字符串 || 单值
 * 2. bridgeClass.toLocalEvent js调用app的统一方法, mixParams为json字符串 || 单值
 */

window.bridgeClass = {
    '__CONF__': {
        'appContext': 'jscomm',
        'appUrl': 'ekwing:abc',
    },
    'jsEventHook': {},
    'toJsEvent': function(strEventName, mixParams) {
        if (bridgeClass.jsEventHook[strEventName] 
            && "function" == typeof(bridgeClass.jsEventHook[strEventName])) {
            mixParams = bridgeClass.parseParams(mixParams);
            bridgeClass.jsEventHook[strEventName](mixParams);
        }
        else {
            var error = new Error('bridgeClass.jsEventHook["' + strEventName + '"] is undefined.');
            bridgeClass.log(error);
            return false;
        }
    },
    'toLocalEvent': function(strEventName, mixParams, debugTrace) {
        //检测mixParams是否有url字段, 如果有直接拼接url前缀
        if (typeof mixParams === typeof {}
            && mixParams.url) {
            mixParams.url  = bridgeClass.rewireUrl(mixParams.url);
        }
        //如果非string, 转换成json string
        if (typeof mixParams !== typeof "string") {
            mixParams = JSON.stringify(mixParams);
        }

        debugTrace && debugTrace('debugTrace[toLocalEvent][Params]', mixParams);

        //ios拦截url
        if (!window[bridgeClass.__CONF__.appContext]) {
            var iFrame;
            var arrJson = {'event': strEventName, 'params': mixParams}
            var strSrc = bridgeClass.__CONF__.appUrl.concat('?'.concat(JSON.stringify(arrJson)));
            debugTrace && debugTrace('debugTrace[ios][url]', strSrc);
            iFrame = document.createElement("iframe");
            iFrame.setAttribute("src", strSrc);
            iFrame.setAttribute("style", "display:none;");
            iFrame.setAttribute("height", "0px");
            iFrame.setAttribute("width", "0px");
            iFrame.setAttribute("frameborder", "0");
            document.body.appendChild(iFrame);
            iFrame.parentNode.removeChild(iFrame);
            iFrame = null;
        }
        //android
        else {
            debugTrace && debugTrace('debugTrace[Android][toLocalEvent]', strEventName, mixParams);
            window[bridgeClass.__CONF__.appContext].toLocalEvent(strEventName, mixParams);
        }
    },
    //代替console.log
    'log':  console.log || function() {},
    //解析参数: 如果是json直接将json解开
    'parseParams': function(mixParams) {
        var rtn = mixParams;
        try {
            var rtn = JSON.param(mixParams);
        }
        catch (e) {
            rtn = mixParams;
        }

        return mixParams;
    },
    //获取重写url, 如果使用requireJs,自动拼装GC('REQ_BASE_URL')
    'rewireUrl': function(strUrl) {
        if (GC 
            && GC('REQ_BASE_URL')) {
            if (!/^http[s]{0,1}:\/\/.*/.test(strUrl)) {
                strUrl = GC('REQ_BASE_URL').concat(strUrl);
                return strUrl.replace('//', '/');
            }
        }

        return strUrl;
    },
    '__CB__':function(func){    
        var randomId = (new Date()).getTime()   ;
        bridgeClass.jsEventHook["callback" + randomId]= function() {
            func.apply(this, arguments)
            delete bridgeClass.jsEventHook["callback" + randomId];
        }
        return  "callback" + randomId;              
    }
}