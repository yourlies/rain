/*
 * @description: Frame动画帧类，计算动画的帧，并返回帧的数组
 * @author: Changle
 * @update: Changle (2016-10-30 23:00)
 */
class Frame {
    constructor () {
        //绑定类内参数作用域
        this.option = this.option.bind(this);
        this.calculate = this.calculate.bind(this);
        //定义偏移量，动画帧数组和动画帧总数
        this.offset = 0; this.frameArr = []; this.frameCount = 0;
    }
    //设置并计算变量值
    option (input) {
        //获取动画的帧总数，偏移量和动画类型
        [this.frameCount, this.offset, this.animationType] = [
            input.frameCount,
            input.offset,
            input.animationType,
        ];
        //计算获得动画帧数组
        this.calculate();
    }
    //计算动画帧数组
    calculate () {
        //循环遍历每一帧
        for (let i = 0; i < this.frameCount; i++) {
            //算出某某动画类型的每一帧的变化率
            const rate = this[this.animationType](i, this.frameCount);
            //将变化率和偏移量相乘获得最终的帧偏移量，并压入数组
            this.frameArr.push(rate * this.offset);
        };
    }
    //正弦函数动画类型
    sineAnimation (frame, frameCount) {
        const after = Math.sin((-Math.PI / 2) + Math.PI * (frame / frameCount));
        const before = Math.sin((-Math.PI / 2) + Math.PI * ((frame - 1) / frameCount));
        const rate = (after - before) / 2;
        if (frame > 0) {
            return rate;
        }
        return -rate;
    }
    //一次函数动画类型
    linearAnimation (frame, frameCount) {
        if (frame > 0) {
            const after = frame / frameCount;
            const before = (frame - 1) / frameCount;
            const rate = after - before;
            return rate;
        }
        return 0;
    }
    //自定义函数动画类型
     customAnimation (frame, frameCount) {
        //
     }
}

export default Frame;