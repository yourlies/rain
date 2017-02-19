import Frame from './Frame';
import Render from './Render';

/*
 * @description: Animate简单基本引擎，提供对Animate动画的基础api支持
 * @author: Changle
 * @update: Changle (2016-10-30 23:00)
 */
class Loading {
    constructor () {
        //绑定类内参数作用域
        this.option = this.option.bind(this);
        this.calculate = this.calculate.bind(this);
        this.render = this.render.bind(this);
        this.play = this.play.bind(this);
        //加载依赖
        this.Frame = new Frame();
        this.Render = new Render();
        //定义指向的位置dom的名字和元素
        this.elName = ''; this.el = null;
        //定义目标位置，起始位置，偏移量
        this.targetPosition = 0; this.currentPosition = 0; this.offset = 0;
        //定义帧数组，帧总数
        this.frameArr = []; this.frameCount = 0;
        //定义动画前进方向
        this.positiveForward = false;
    }
    //设置变量并计算，同时渲染
    option (input) {
        ///获取指向的位置dom元素
        [this.elName, this.time] = [
            input.elName,
            input.time,
        ];
        this.calculate();
        this.render();
    }
    //计算变量
    calculate () {
        //计算出目标位置和起始位置以及偏移量，前进方向
        this.position();
        //根据播放动画时间算出帧数，每秒六十帧
        this.frameCount = Math.ceil((this.time / 1000) * 60);
        //调用Frame类算出帧数组
        this.Frame.option({
            frameCount: this.frameCount,
            offset: this.offset,
            animationType: 'linearAnimation',
        });
        //获取帧数组
        this.frameArr = this.Frame.frameArr;
    }
    //计算目标位置和当前位置
    position () {
        this.el = document.querySelector(this.elName);
        this.targetPosition = 1800;
        this.currentPosition = -200;
        this.offset = this.currentPosition - this.targetPosition;
    }
    //渲染动画
    render () {
        //定义需要渲染的动画
        const func = (progress, frameNumber) => {
            this.el.style.left = progress + 'px';
        }
        //调用Render类进行渲染
        this.Render.option({
            func: func,
            targetPosition: this.targetPosition,
            currentPosition: this.currentPosition,
            frameArr: this.frameArr,
            frameCount: this.frameCount,
        });
    }
    //播放已经渲染完毕的动画
    play () {
        this.Render.action();
    }
}

export default Loading;