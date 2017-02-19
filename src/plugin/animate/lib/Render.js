/*
 * @description: Render简单动画渲染引擎，提供对动画的渲染
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Animate {
    constructor () {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        //绑定类内参数作用域
        this.option = this.option.bind(this);
        this.action = this.action.bind(this);
        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.step = this.step.bind(this);
        //定义当前进度，目标位置，起始位置，偏移量
        this.progress = 0; this.targetPosition = 0; this.currentPosition = 0;
        //定义当前帧数，帧长度，帧总数，每帧偏移量，帧数组
        this.frameNumber = 0; this.frameLength = 0; this.frameCount = 0; this.tick = 0; this.frameArr = [];
        //控制动画是否进行
        this.stop = false;
        //调用动画的id
        this.raf = false;
    }
    //设置变量
    option (input) {
        //获取需要渲染的函数，动画前进方向
        [this.func] = [
            input.func,
        ];
        //获取动画目标位置，起始位置，偏移量
        [this.targetPosition, this.currentPosition] = [
            input.targetPosition,
            input.currentPosition,
        ];
        //获取帧总数，帧数组
        [this.frameCount, this.frameArr] = [
            input.frameCount,
            input.frameArr,
        ];
        //初始的进度为起始位置
        this.progress = this.currentPosition;
    }
    //渲染更新后的帧
    draw () {
        this.func(this.progress, this.frameNumber);
    }
    //更新每一帧的偏移量
    update () {
        //如果当前播放的帧没有达到帧的总数，说明还没有播放完
        if (this.frameNumber < this.frameCount) {
            this.frameLength = this.frameArr[this.frameNumber];
            this.progress -= this.frameLength;
            this.frameNumber++;
        } else {
            this.stop = true;
        }
    }
    //渲染步骤
    step () {
        this.update();
        this.draw();
        if (!this.stop) {
            this.raf = requestAnimationFrame(this.step);
        } else {
            cancelAnimationFrame(this.raf);
        }
    }
    //开始渲染
    action () {
        this.raf = requestAnimationFrame(this.step);
    }
}

export default Animate;