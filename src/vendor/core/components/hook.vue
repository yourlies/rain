<template></template>
<script>
import Func from '../../lib';
import dependency from '../../autoload/dependency';
import { mapGetters } from 'vuex';

const plugin = dependency.plugin;

export default {
    data () {
        return {
            subscriptions: { unresolved: [], resolved: [] },
        };
    },
    computed: {
        ...mapGetters({
            isTriggered: 'getHookListener',
            unresolvedSubscriptions: 'getHookSubscriptions'
        })
    },
    methods: {
        handle () {
            this.subscriptions.unresolved = this.subscriptions.unresolved.concat(this.unresolvedSubscriptions);
            this.resolveSubscriptions();
            const length = this.subscriptions.unresolved.length;
            for (let i = 0; i < length; i++) {
                const subscription = this.subscriptions.unresolved.shift();
                this.call(subscription);
                this.subscriptions.resolved.push(subscription);
            }
        },
        resolveSubscriptions () {
            this.$store.dispatch('resolveHookSubscriptions');
        },
        trigger (subscription) {
            this.$store.dispatch('triggerHook', subscription);
        },
        call (method) {
            plugin.trigger(method);
        },
    },
    watch: {
        isTriggered: function () {
            this.handle();
        }
    }
}
</script>