/* /---------------define CG--------------\ */
/* | 用法: CG(arg1[, arg2])               | */
/* | 说明: 1.CG(arg1) -> 读配置项         | */
/* |       2.CG(arg1, arg2) -> 写配置项   | */
/* \--------------------------------------/ */
(function(glo) { //{{{
    var __CONF__ = {};

    function GC() {
        switch (arguments.length) {
            case 2:
                return set(arguments[0], arguments[1]);
            default:
                return get(arguments[0]);
        }
    }

    function get(key) {
        return __CONF__[key];
    }

    function set(key, value) {
        __CONF__[key] = value;

        return __CONF__[key];
    }

    glo.GC = GC;

    function GetModelData(modelId) {
        var strData = document.getElementById(modelId).getElementsByTagName("div")[0].innerHTML;
        strData = strData.replace(/(^\s*)|(\s*$)/g, "");
        return JSON.parse(strData);
    }
    glo.GetModelData = GetModelData;
})(window);
//}}}

var objDate = new Date();

//设置配置项
GC('REQ_BASE_URL', './');
GC('JS_URL', '//res.ekwing.com/js/');
GC('version', objDate.getTime());
GC('debug', false);
GC('ROOT_MAPI',"//mapi.ekwing.com/");
GC('ROOT_API',"//api.ekwing.com/");
//requirejs config
//require.config({ //{{{
//    baseUrl: '//res.ekwing.com/js/student',
//    urlArgs: 'v=' + GC('version'),
//    paths: {
//        bridge: [GC('JS_URL') + 'mb/bridge'],
//        bridge_debug: [GC('JS_URL') + 'student/bridge_debug'],
//        debug: [GC('JS_URL') + 'student/debug'],
//        domReady: [GC('JS_URL') + 'plugins/domReady'],
//        avalon: [GC('JS_URL') + 'plugins/avalon'],
//        jq: [GC('JS_URL') + 'plugins/jquery'],
//        listloading: [GC('JS_URL') + 'mb/listloading'],
//        flexAll: [GC('JS_URL') + 'mb/flexible-all'],
//        iscroll: [GC('JS_URL') + 'plugins/iscroll']
//    }
//});
//}}}