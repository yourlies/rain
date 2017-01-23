<template></template>
<script>
import Func from '../../lib';
import plugin from '../../autoload/plugin';
import { mapGetters } from 'vuex';

export default {
    data () {
        return {
            memory: { schedule: [], param: {}, stack: {}, heap: {} }
        }
    },
    computed: {
        ...mapGetters({
            isAllocated: 'getAllocateListener',
            request: 'getAllocateRequest'
        })
    },
    methods: {
        allocateMemory (variable) {
            this.$store.dispatch('allocateMemory', variable);
        },
        resolveMallocRequest () {
            this.$store.dispatch('resolveAllocateRequest');
        },
        newStack () {
            //
        },
        newHeap () {
            //
        },
        stackTreatment (schedule) {
            switch (schedule.operate) {
                case 'new':
                    this.memory.stack[schedule.variableName] = [];
                    break;
                case 'push':
                    this.memory.stack[schedule.variableName].push(schedule.variableValue);
                    break;
                case 'pop':
                    this.memory.stack[schedule.variableName].pop();
                    break;
                default:
                    break;
            }
        }
    },
    watch: {
        isAllocated: function () {
            this.memory.schedule = this.memory.schedule.concat(this.request);
            this.resolveMallocRequest();
            for (let i = 0; i < this.memory.schedule.length; i++) {
                if (this.memory.schedule[i]['type'] == 'stack') {
                    this.stackTreatment(this.memory.schedule[i]);
                }
            }
            console.log(this.memory.stack.history);
        }
    },
    mounted () {
        this.allocateMemory({ variableName: 'history', type: 'stack', operate: 'new' });
        this.allocateMemory({ variableName: 'history', variableValue: '/wiki', type: 'stack', operate: 'push' });
        this.allocateMemory({ variableName: 'history', variableValue: '/', type: 'stack', operate: 'push' });
        this.allocateMemory({ variableName: 'history', type: 'stack', operate: 'pop'});
    }
}
</script>