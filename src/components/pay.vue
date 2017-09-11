<template>
  <div class="pay">
    <div
      class="content df center"
      :style="isFixed ? { position: 'fixed' } : ''">
      <div class="df center font12 f1">
        <div class="df center ml3" v-if="isStock">
          <span class="font24 crGirlPink">{{ price }}</span>翼豆
        </div>
        <div class="ml3 cr999" v-if="isStock">
          余额:<span>{{ credit }}</span>
        </div>
      </div>
      <div
        :class="[isAuth ? 'bcrOrange' : 'bcrcecece', 'submit', 'crfff', 'tc', 'df', 'center']">
        <span class="font16" @click="submit">{{ notice }}</span>
        <i class="fa-icon fa-vippop" v-if="needRecharge"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        count: 0, payload: {}, isAuth: false, notice: '马上兑换', isFixed: true,
        price: 0, needRecharge: false, isStock: true,
        credit: 0,
      }
    },
    props: ['event'],
    computed: {
      ...mapGetters({
        memory: 'getAllocateVariable',
      })
    },
    methods: {
      bubble (subscription) {
        this.$store.dispatch('bubbleDelegation', { subscription, page: this });
      },
      request (subscription, payload) {
        this.$store.dispatch('requestCustomer', { request: subscription, payload, page: this });
      },
      register (subscription) {
        this.$store.dispatch('registerCustomer', { register: subscription, page: this });
      },
      submit () {
        if (this.needRecharge) {
          this.bubble('delegationLayer');
          return false;
        }
        if (this.isAuth) {
          this.request('createLayer', {
            title: '提醒',
            notice: ['确定兑换此商品？', `兑换商品将消耗 ${this.price} 翼豆`],
            submitEvent: 'exchangeGood',
            reqPage: this.$parent,
          });
        }
      },
      update () {
        this.$nextTick(() => {
          const isVip = ((this.memory.raw.user.is_vip) && (this.memory.raw.user.vip_type == 'is_vip'));
          this.credit = this.memory.raw.user.credit;
          this.price = this.memory.goodPrice;
          switch (true) {
            case this.memory.raw.goods.is_online == 2:
              this.notice = '商品下架';
              this.isStock = false;
              break;
            case this.memory.raw.goods.goods_num == 0:
              this.notice = '库存不足';
              this.isStock = false;
              break;
          }
          if ((!isVip) && (this.memory.raw.goods.goods_convert == 1)) {
            this.needRecharge = true;
          }
        })
      }
    },
    mounted () {
      this.register('createPayment');
    },
    watch: {
      'memory.payEvent' () {
        this.update();
      },
      'memory.goodPrice' (price) {
        if (!price) {
          return false;
        }
        this.update();
      },
      count () {
        this.isAuth = this.payload.auth;
        this.notice = this.payload.notice || this.notice;
      },
      'memory.countInput' () {
        if (this.memory.isInput) {
          this.isFixed = !this.memory.isInput;          
        } else {
          setTimeout(() => {
            this.isFixed = !this.memory.isInput;
          }, 200)
        }
      }
    }
  }
</script>
<style scoped>
  .content {
    height: 1.28rem;
    background-color: #f5f5f5;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .submit {
    height: 100%;
    padding: 0 .5rem;
  }
  .fa-vippop {
    height: .28rem;
    width: .48rem;
    background-size: .48rem .28rem;
    margin-left: .12rem;
  }
</style>