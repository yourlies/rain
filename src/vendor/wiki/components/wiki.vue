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
        <pre class="rain-quoteblock">
    project
    |--src
        |--vendor        //项目框架核心文件
        |--config        //项目配置文件
        |--views         //view页面层
        |--model         //model模型层
        |--function.js   //通用函数文件
        |--App.vue       //框架首页文件
        |--main.js       //框架入口文件
        </pre>
        <div class="rain-subtitle"><h1>项目食用说明</h1></div>
        <ul class="rain-items">
            <li class="rain-item rain-text">本项目无需过多的安装和配置步骤，只需git克隆下来下载依赖文件即可快速上手</li>
        </ul>
        <div class="rain-span">安装过程如下</div>
        <pre class="rain-language">
    # copy the frame
    git clone https://github.com/changlor/rain.git
    # cd to your project
    cd path/to/your/project
    # install dependencies
    npm install
    # serve with hot reload at localhost:8080
    npm run dev
    # build for production with minification
    npm run build
        </pre>
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
.rain-language {
    margin: 6px 0;
    background-color: #e6e6e6;
    border-radius: 2px;
    padding: 6px;
    color: #333;
    line-height: 20px;
}
.rain-items {
    margin-top: 15px;
    padding-left: 20px;
}
.rain-span {
    font-size: 15px;
    color: #555;
}
</style>