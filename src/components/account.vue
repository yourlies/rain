<template>
  <nav class="df center account pr4 pl4">
    <div class="content f1 df center">
      <div class="avatar" :style="{ backgroundImage: `url(${meta.avatar})` }"></div>
      <div class="ml3 df center">
        <span class="font18 link">{{ meta.nicename }}</span>
        <i class="fa-icon fa-vip" v-if="isVip"></i>
      </div>
    </div>
    <div class="font18 df center link cr666" @click="redirectGetCreditDetail">
      <span class="crGirlPink link">{{ meta.credit }}</span>翼豆
      <i class="fa-icon fa-more"></i>
    </div>
  </nav>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { Func } from '../vendor/lib';
  
  export default {
    data () {
      return {
        meta: {
          avatar: '',
          nicename: '',
          credit: '',
        },
        avatar: '',
        isVip: false,
        fake: {
          logo_130: 'http://www.ekwing.com/data/personal/1/50427/logo/130/1472092675.jpg',
        },
      }
    },
    computed: {
      ...mapGetters({
        memory: 'getAllocateVariable',
      })
    },
    methods: {
      bubble (subscription) {
        this.$store.dispatch('bubbleDelegation', { subscription, page: this });
      },
      redirectGetCreditDetail () {
        this.bubble('delegationGetCreditDetail');
      },
      trimPayload () {
        if (Func.isEmptyObject(this.payload)) {
          return false;
        }
        const logo_130 = this.payload.logo_130 || this.fake.logo_130;
        const nicename = this.payload.nicename || this.fake.nicename;
        const credit = this.payload.credit || this.fake.credit;
        this.meta.avatar = logo_130;
        this.meta.nicename = nicename;
        this.meta.credit = credit;
        this.isVip = ((this.memory.raw.user.is_vip) && (this.memory.raw.user.vip_type == 'is_vip'));
      },
    },
    props: ['payload'],
    mounted () {
      this.trimPayload();
    },
    watch: {
      payload () {
        this.$nextTick(() => {
          this.trimPayload();
        })
      }
    }
  }
</script>
<style scoped>
  .account {
    height: 2.105rem;
    border-bottom: .12rem solid #eee;
  }
  .account .avatar {
    width: 1.333rem;
    height: 1.333rem;
    border-radius: .6667rem;
    background-size: 1.333rem 1.333rem;
  }
  .account .fa-vip {
    height: .43rem;
    width: .53rem;
    background-size: .53rem .43rem;
    margin-left: .06rem;
  }
  .account .fa-more {
    width: .6rem;
    height: .6rem;
    background-size: .6rem;
  }
</style>