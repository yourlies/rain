import { Php, Store, Session } from './vendor/lib/src';

import marked from 'marked';
import moment from 'moment';
import hljs from './vendor/lib/src/highlight/highlight';

//无限分类赋值
const storeClassification = function (object, dir, value, index = 0) {
    if (index == 0 && dir.length == 1) {
        object['./'][dir[0]] = value;
    } else {
        object[dir[index]] = !object.hasOwnProperty(dir[index]) ? {} : object[dir[index]];
        index == dir.length - 1
        ? object[dir[index]] = value
        : storeClassification(object[dir[index]], dir, value, index + 1)
    }
}
//无限分类读取
const readClassification = function (object, dir, index = 0) {
    if (dir.length == index) {
        return object;
    } else {
        return dir.length == 1
        ? object['./'][dir[index]]
        : readClassification(object[dir[index]], dir, index + 1);
    }
}
//渲染md为html
const parseMarkdown = function (md, config) {
    if (Php.empty(md)) {
        md = '';
    }

    if (Php.empty(config)) {
        config = {
            highlight: (code) => {
                return hljs.highlightAuto(code).value
            },
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        };
    }
    marked.setOptions(config);
    return marked(md);
}

const formatTime = function (time) {
    return moment.unix(time).format('YYYY年MM月DD日');
}

const readUserInfo = function () {
    let userInfo = Session.get('userInfo');
    try {
        userInfo = JSON.parse(userInfo);
    } catch (e) {
        userInfo = {};
    }
    userInfo = userInfo || {};
    userInfo.token = typeof userInfo.token == 'string' ? userInfo.token : '';
    userInfo.username = typeof userInfo.username == 'string' ? userInfo.username : '';
    return userInfo;
}

const isEmptyObject = function (object) {
    for (let name in object) {
        return false;
    }
    return true;
}

const toUrl = function (url, params) {
    let paramsArr = [];
    if (params) {
        Object.keys(params).forEach(item => {
            paramsArr.push(item + '=' + params[item]);
        })
        url.search(/\?/) === -1
            ? url += '?' + paramsArr.join('&')
            : url += '&' + paramsArr.join('&');
    }
    return url;
}

const bodyParse = function (req) {
    const res = {};
    let chips = [];
    chips = req.split('?');
    res.url = chips[0];
    res.params = chips[1] && chips[1].split('&');
    return res;
}

const bodyPack = function (data) {
    const req = {};
    let body = [];
    for (let [key, value] of Object.entries(data.params)) {
        body.push(key + '=' + value);
    }
    req.body = body.join('&');
    switch (data.type) {
        case 'get':
            req.query = `${data.url}?${req.body}`;
            break;
    }
    return req;
}

export default {
    bodyPack,
    formatTime,
    bodyParse,
    parseMarkdown,
    storeClassification,
    readClassification,
    readUserInfo,
    isEmptyObject,
    toUrl
}