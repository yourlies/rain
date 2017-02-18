<template>
<div class="rain rain__wiki">
    <div class="rain-body body">
        <div class="rain-title title"><h1>介绍</h1></div>
        <div class="rain-subtitle"><h1>框架前言</h1></div>
        <div class="rain-brief">
            愿得一框架，白首不分离，此框架即应运而生，生根发芽，生机勃勃的吸取养分，昂首星空，展望未来
        </div>
        <div class="rain-note">
            此框架为基于vue.js的一款事件驱动型的前端框架，建立的初衷亦是学习巩固前端(<s>姿势</s>)知识，亦是通过搭建一个框架，体会其中的思想
        </div>
        <div class="rain-subtitle"><h1>前世今生</h1></div>
        <ul class="rain-items">
            <li class="rain-item rain-text">本框架原为学习vue.js后小试牛刀的第二个作品所写的一款博客，经过再三多次修改，一步步成型，最后砍掉views和具体代码逻辑所成</li>
            <li class="rain-item rain-text">框架原本只有view层和处理层以及逻辑层，三部分组成，后在实践中一步一步的完善和修改，逐渐的变成了现在的结构</li>
        </ul>
        <div class="rain-subtitle"><h1>框架的目录结构</h1></div>
        <div class="rain-quoteblock">
                
        </div>
    </div>
</div>
</template>
<style>
.rain__wiki .body {
    padding: 40px;
}
.rain-subtitle h1 {
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: 300;
    font-size: 22px;
    border-bottom: 1px dashed #afafaf;
}
.rain-brief {
    color: #888;
    font-style: italic;
    font-size: 15px;
}
.rain-text {
    margin: 5px 0;
    color: #333;
}
.rain-note {
    margin: 5px 0;
    color: #333;
    border-left: 4px solid #777;
    padding-left: 6px;
}
.rain-quoteblock {
    margin: 6px 0;
    background-color: #e6e6e6;
    border-radius: 2px;
    padding: 6px;
    color: #333;
}
.rain-items {
    margin-top: 15px;
    padding-left: 20px;
}
</style>