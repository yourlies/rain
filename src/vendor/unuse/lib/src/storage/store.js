/*
 * @description: Store接口基类，提供对localstorage操作的底层接口
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Store {
    //保存数据到localstorage
    static set (key, value) {
        window.localStorage.setItem(key, value);
    }
    //读取localstorage数据
    static get (key) {
        return window.localStorage.getItem(key);
    }
}

export default Store;

