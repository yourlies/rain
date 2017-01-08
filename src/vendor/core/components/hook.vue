<script>
// import hooks from '../plugin';
// import { actions, getters } from '../vuex';

export default {
    data () {
        return {
            subscriptions: { unresolved: [], resolved: [] },
        };
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
        call (method) {
            hooks.trigger(method);
        },
    },
    vuex: {
        getters: {
            isTriggered: getters.getHookListener,
            unresolvedSubscriptions: getters.getHookSubscriptions,
        },
        actions: {
            resolveSubscriptions: actions.resolveHookSubscriptions,
        }
    },
    watch: {
        isTriggered: function () {
            this.handle();
        }
    }
}
</script>