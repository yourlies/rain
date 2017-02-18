<template></template>
<script>
import Func from '../../lib';
import { mapGetters } from 'vuex';
import plugin from '../../autoload/plugin';
const subscribers = plugin.model;

const delegation = {
    data () {
        return {
            subscriptions: { unresolved: [], resolved: [], current: {}, workload: 0 },
        }
    },
    computed: {
        ...mapGetters({
            unresolvedSubscriptions: 'getDelegationSubscriptions',
            isBubbled: 'getDelegationListener',
        })
    },
    methods: {
        trigger (subscription) {
            this.$store.dispatch('triggerHook', subscription, this);
        },
        resolved (id) {
            if (
                this.subscriptions.current.hasOwnProperty(`subscription${id.subscription}`)
                && this.subscriptions.current[`subscription${id.subscription}`].hasOwnProperty(`subscriber${id.subscriber}`)
            ) {
                this.subscriptions.current[`subscription${id.subscription}`][`subscriber${id.subscriber}`] = true;
                this.subscriptions.length--;
            }
            if (this.subscriptions.length <= 0) {
                this.trigger('loadingstop');
            }
        },
        resolveSubscriptions () {
            this.$store.dispatch('resolveDelegationSubscriptions');
        },
        bubble (subscription, page, component, id) {
            subscribers.bubble(subscription, page, component, id);
        },
        handle () {
            this.subscriptions.unresolved = this.subscriptions.unresolved.concat(this.unresolvedSubscriptions);
            this.resolveSubscriptions();
            const length = this.subscriptions.unresolved.length;
            for (let i = 0; i < length; i++) {
                const subscription = this.subscriptions.unresolved.shift();
                this.call(subscription.subscription, subscription.page, subscription.id);
                this.subscriptions.resolved.push(subscription);
                this.subscriptions.workload++;
            }
        },
        call (subscription, page, id) {
            this.bubble(subscription, page, this, id);
        },
    },
    watch: {
        '$route.path': function () {
            if (this.unresolvedSubscriptions.length != 0) {
                this.trigger('loadingstart');
            }
            this.subscriptions.current = [];
            this.subscriptions.length = 0;
            for (let i = 0; i < this.unresolvedSubscriptions.length; i++) {
                this.subscriptions.current[`subscription${this.unresolvedSubscriptions[i]['id']}`] = subscribers.subscription(this.unresolvedSubscriptions[i]['subscription']);
                this.subscriptions.length++;
                this.subscriptions.workload++;
            }
        },
        isBubbled: function () {
            this.handle();
        },
        'subscriptions.workload': function () {
            this.$store.dispatch('reportData', { delegation: this.subscriptions })
        }
    },
}

export default delegation;
</script>