<template>
<div>
<div class="rain-control">
    <div class="tool">
        <a class="actived">delegation</a>
        <a>hook</a>
    </div>
    <div class="data">
        <div>unresolved: {{ monitoringData.delegation.unresolved }}</div>
        <div>resolved: {{ monitoringData.delegation.resolved }}</div>
    </div>
</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import Func from '../../lib';
import plugin from '../../autoload/plugin';

export default {
    computed: {
        ...mapGetters({
            monitoringData: 'getMonitoringData',
        })
    },
    mounted () {
        console.log('test');
        console.log(this.monitoringData);
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