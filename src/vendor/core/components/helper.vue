<template>
<div>
<div class="rain-control">
    <div class="tool">
        <a class="actived">memory</a>
        <a>hook</a>
    </div>
    <div class="data">
        <div>schedule: {{ xx.memory.schedule }}</div>
        <div>variable: {{ xx.memory.variable }}</div>
    </div>
</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import Func from '../../lib';
import dependency from '../../autoload/dependency';

export default {
    data () {
        return {
            xx: {memory: {}}
        }
    },
    computed: {
        ...mapGetters({
            monitoringData: 'getMonitoringData',
            isChange: 'getDataListener',
        })
    },
    watch: {
        isChange: function () {
            this.xx = this.monitoringData;
        }
    }
}
</script>
<style>
.rain-control {
    box-shadow: 0 0 1px #aaa;
    border-radius: 2px;
    position: fixed;
    font-size: 15px;
    width: 240px;
    padding: 10px 13px;
    bottom: 3px;
    right: 3px;
}
.rain-control .tool a {
    margin-right: 5px;
}
.rain-control .actived {
    border-bottom: 1px solid #ddd;
}

</style>