<template>
    <div class="rain">
        <div class="rain-body">
            <div class="rain-title"><h1>欢迎使用雨博客前端模板</h1></div>
            <div class="rain-meta">
                --您可以借助rain快速搭建网站
                <a>我的博客</a>，<router-link to="/wiki">查看文档</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import marked from 'marked';

export default {
    data () {
        return {
            document: '_welcome_',
        }
    },
    methods: {
        marked (str) {
            return marked(str);
        }
    },
    mounted () {
        //
    },
}
</script>