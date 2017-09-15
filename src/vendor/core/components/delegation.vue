<template></template>
<script>
import { Func } from '../../lib';
import dependency from '../../autoload/dependency';
import { mapGetters } from 'vuex';

const models = dependency.model;
const delegation = {
    data () {
        return {
            subscriptions: {
                unresolved: [], transaction: [], workload: 0,
                current: {}, currentCount: 0,
                subscribers: models.config,
            },
            async: [], pending: [], resolved: [], rejected: [],
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
            console.log('%crecevied resolved event', 'color: blue;font-weight:bold;')
            this.resolved.push({ name: id.name });
            let relyHasResolved = false;
            for (let i = 0; i < this.async.length; i++) {
                if (this.async[i].rely == id.name) {
                    const subscription = this.async[i];
                    console.log(`%cawiat event #${subscription.subscription}#`, 'color: red;');
                    console.log('%cbegin to resolve', 'color: #06ab9a;');
                    this.async[i] = '';
                    if (Func.isEmptyObject(subscription)) {
                        continue;
                    }
                    this.call(subscription.subscription, subscription.page, subscription.id);
                    console.log('%cEvent bubble:', 'font-weight: bold;', subscription.subscription)
                    console.log('%cpayload:', 'color: #06ab9a;', subscription)
                    this.subscriptions.transaction.push(subscription);
                    this.subscriptions.workload++;

                }
                // console.log(`%cawiat event #${this.async[i].rely}#`, 'color: red;')
                // if (this.resolved[j].name == rely) {
                    // relyHasResolved = true;
                    // break;
                // }
            }

            // trim async array
            for (let i = 0; i < this.async.length; i++) {
                if (this.async[i] == '') {
                    this.async.splice(i, 1);
                    i--;
                }
            }

            console.log('%ccurrent async event', 'color: red;', this.async)

            // if (relyHasResolved) {
                // console.log(`%crely #${rely}#`, 'color: red;', 'has resolved');
            // }
            

            // console.log('%ccurrent resolved', 'color: red;', this.resolved);
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
            this.pending = [ ...this.subscriptions.unresolved ];
            // 判断事件是否存在依赖
            for (let i = 0; i < length; i++) {
                const { rely, subscription, id } = this.subscriptions.unresolved[i];
                if (!rely) {
                    continue;
                }
                // console.log('%cEvent:', 'font-weight: bold;', subscription);
                // console.log('%chas rely', 'color: red;', rely);
                // console.log('%cEvent id', 'color: red;', id);
                let relyHasResolved = false;
                for (let j = 0; j < this.resolved.length; j++) {
                    if (this.resolved[j].name == rely) {
                        relyHasResolved = true;
                        break;
                    }
                }

                if (relyHasResolved) {
                    console.log(`%crely #${rely}#`, 'color: red;', 'has resolved');
                }
                if (!relyHasResolved) {
                    this.async.push(this.pending[i]);
                    this.pending[i] = '';
                }
            }
            this.subscriptions.unresolved = [];
            // console.log('%cresolvedEvent', 'color: red;', this.resolved);
            // 
            const pendingLength = this.pending.length;
            for (let i = 0; i < pendingLength; i++) {
                const subscription = this.pending.shift();
                if (Func.isEmptyObject(subscription)) {
                    continue;
                }
                this.call(subscription.subscription, subscription.page, subscription.id);
                console.log('%cEvent bubble:', 'font-weight: bold;', subscription.subscription)
                console.log('%cpayload:', 'color: #06ab9a;', subscription)
                this.subscriptions.transaction.push(subscription);
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