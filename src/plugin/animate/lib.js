/*
 * @description: Animate简单基本引擎，提供对Animate动画的基础api支持
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Animate {
    constructor () {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        this.progress = 0;
        this.position = 0;
        this.offset = 0;
        this.stop = false;
        this.raf = false;
    }

    option (input) {
        [this.func, this.progress, this.position] = [
            input.func,
            input.progress,
            input.position,
        ];
        this.offset = this.position - this.progress;
        this.positiveForward = this.position - this.progress > 0;
        this.tick = this.offset / 60;
    }

    action () {
        this.raf = requestAnimationFrame(this.step);
    }

    draw = () => {
        this.func(this);
    }

    update = () => {
        if (this.offset > 0 && this.positiveForward || !(this.offset > 0) && !this.positiveForward) {
            this.offset -= this.tick;
            this.position -= this.tick;
        } else {
            this.stop = true;
        }
    }

    step = () => {
        this.update();
        this.draw();
        if (!this.stop) {
            this.raf = requestAnimationFrame(this.step);
        } else {
            cancelAnimationFrame(this.raf);
            this.stop = false;
        }
    }
}

export default Animate;