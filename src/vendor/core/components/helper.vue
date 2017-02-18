<template>
<div>
<div class="rain-control">
    <div class="tool">
        <a class="actived">delegation</a>
        <a>hook</a>
    </div>
    <div class="data">
        <div>unresolved: {{ xx.delegation.unresolved }}</div>
        <div>resolved: {{ xx.delegation.resolved }}</div>
        <div>current: {{ xx.delegation.current }}</div>
        <div>workload: {{ xx.delegation.workload }}</div>
        <div>subscribers: {{ xx.delegation.subscribers }}</div>
    </div>
</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import Func from '../../lib';
import plugin from '../../autoload/plugin';

export default {
    data () {
        return {
            xx: {delegation: {}}
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
    bottom: 0;
    right: 0;
}
.rain-control .tool a {
    margin-right: 5px;
}
.rain-control .actived {
    border-bottom: 1px solid #ddd;
}

</style>