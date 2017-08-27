<template></template>
<script>
import Func from '../../lib';
import dependency from '../../autoload/dependency';
import { mapGetters } from 'vuex';

const models = dependency.model;
const delegation = {
    data () {
        return {
            subscriptions: {
                unresolved: [], resolved: [], workload: 0,
                current: {}, currentCount: 0,
                subscribers: models.config
            },
        }
    },
    computed: {
        ...mapGetters({
            unresolvedSubscriptions: 'getDelegationSubscriptions',
            isBubbled: 'getDelegationListener',
        })
    },
    methods: {
        resolve (id) {
            if (
                this.subscriptions.current.hasOwnProperty(`subscription${id.subscription}`)
                && this.subscriptions.current[`subscription${id.subscription}`].hasOwnProperty(`subscriber${id.subscriber}`)
            ) {
                this.subscriptions.current[`subscription${id.subscription}`][`subscriber${id.subscriber}`] = true;
                this.subscriptions.currentCount--;
            }
            if (this.subscriptions.currentCount <= 0) {
                this.trigger('loadingstop');
            }
        },
        trigger (subscription) {
            this.$store.dispatch('triggerHook', subscription, this);
        },
        bubble (subscription, page, component, id) {
            models.bubble(subscription, page, component, id);
        },
        resolveSubscriptions () {
            this.$store.dispatch('resolveDelegationSubscriptions');
        },
        handle () {
            this.subscriptions.unresolved = this.subscriptions.unresolved.concat(this.unresolvedSubscriptions);
            this.resolveSubscriptions();
            const length = this.subscriptions.unresolved.length;
            for (let i = 0; i < length; i++) {
                const subscription = this.subscriptions.unresolved.shift();
                this.call(subscription.subscription, subscription.page, subscription.id);
                console.log('%cEvent bubble:', 'font-weight: bold;', subscription.subscription)
                console.log('%cpayload:', 'color: #06ab9a;', subscription)
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
            if (this.unresolvedSubscriptions.length > 0) {
                this.trigger('loadingstart');
            }
            for (let i = 0; i < this.unresolvedSubscriptions.length; i++) {
                this.subscriptions.current[`subscription${this.unresolvedSubscriptions[i]['id']}`] = models.subscription(this.unresolvedSubscriptions[i]['subscription']);
                this.subscriptions.currentCount++;
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