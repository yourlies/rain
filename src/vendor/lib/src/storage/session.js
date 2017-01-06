/*
 * @description: Store接口基类，提供对localstorage操作的底层接口
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Session {
    static get (key) {
        return window.sessionStorage.getItem(key);
    }
    static set (key, value) {
        window.sessionStorage.setItem(key, value);
    }
}

export default Session;