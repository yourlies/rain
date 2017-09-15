class Welcome {
    /*
     * @description: 创建一个新评论
     */
    static say (page, component, id) {
        console.log('hello world')
        setTimeout(() => component.resolve(id), 1000)
    }

    static girlfriend (page, component, id) {
        setTimeout(() => {
            console.log('---------禁忌的边界线---------')
            console.log((new Date).toLocaleString())
            console.log('醒醒，你怎么可能会有女朋友！')
            console.log('---------禁忌的边界线---------')
            component.resolve(id);
        }, 2000)
    }

    static seemovie (page, component, id) {
        setTimeout(() => {
            console.log('---------禁忌的边界线---------')
            console.log((new Date).toLocaleString())
            console.log('看什么电影，要啥自行车？')
            console.log('---------禁忌的边界线---------')
            component.resolve(id);
        }, 2000)
    }
}

export default Welcome;