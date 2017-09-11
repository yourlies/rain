<template></template>
<script>
  import { mapGetters } from 'vuex';
  import { Func } from '../vendor/lib'
  export default {
    data () {
      return {
        payload: {}, history: [], count: 0, currentIndex: 0, query: '',
      }
    },
    computed: {
      ...mapGetters({
        memory: 'getAllocateVariable',
      })
    },
    methods: {
      register (subscription) {
        this.$store.dispatch('registerCustomer', { register: subscription, page: this });
      },
      bubble (subscription) {
        this.$store.dispatch('bubbleDelegation', { subscription, page: this });
      },
    },
    mounted () {
      this.register('redirect');
      const { path, query } = this.$route;
      const currentIndex = this.history.push({ path, query });
      this.currentIndex = currentIndex - 1;
    },
    watch: {
      count () {
        const { next, params, path } = this.payload;
        switch (next) {
          case 'back':
            if (this.$route.path === '/student/mall/goodslist') {
              this.bubble('delegationBack');
              return false;
            }
            // if (this.memory.isApp) {
            //   this.bubble('delegationBack');
            //   return false;
            // }
            // this.$nextTick(() => {
            //   this.currentIndex--;
            //   const history = this.history[this.currentIndex];
            //   this.$router.push({ path: history.path, query: history.query });
            // })
            this.$router.back();
            break;
          case 'seamless':
            this.$router.push({ path, params: { ...this.memory.basic, ...params } });
            break;
          default:
            if (this.memory.isApp) {
              const req = Func.bodyPack({ params, type: 'get', url: path });
              this.query = `https://mapi.ekwing.com${req.query}`;
              this.$nextTick(() => {
                this.bubble('delegationRedirect');
              });
              return false;
            }
            const query = { ...params, ...this.memory.basic }
            this.history.splice(this.currentIndex + 1, this.history.length - 1);
            const currentIndex = this.history.push({ path, query });
            this.currentIndex = currentIndex - 1;
            this.$router.push({ path, query });
            break;
        }
      }
    }
  }
</script>