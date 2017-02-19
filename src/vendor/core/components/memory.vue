<template></template>
<script>
import Func from '../../lib';
import dependency from '../../autoload/dependency';
import { mapGetters } from 'vuex';

export default {
    data () {
        return {
            memory: { schedule: [], variable: {} }
        }
    },
    computed: {
        ...mapGetters({
            isAllocated: 'getAllocateListener',
            request: 'getAllocateRequest',
        })
    },
    methods: {
        allocateMemory (variable) {
            this.$store.dispatch('allocateMemory', variable);
        },
        resolveMallocRequest () {
            this.$store.dispatch('resolveAllocateRequest');
        },
    },
    watch: {
        isAllocated: function () {
            this.memory.schedule = this.memory.schedule.concat(this.request);
            this.resolveMallocRequest();
            for (let i = 0; i < this.memory.schedule.length; i++) {
                for (let [key, value] of Object.entries(this.memory.schedule[i])) {
                    this.memory.variable[key] = value;
                }
                this.$store.dispatch('reportData', { memory: this.memory });
            }
            this.$store.dispatch('modifyMemory', this.memory.variable);
        }
    },
    mounted () {
        this.$store.dispatch('allocateMemory', { xx: 11 });
    }
}
</script>