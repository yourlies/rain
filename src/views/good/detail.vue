<template>
  <div class="wrap">
    <Banner :title="title" />
    <div class="container" v-show="isLoad">
      <Good :payload="item" />
      <Operator class="ml4" :isOperator="true" :payload="item" />
      <div class="hr"></div>
      <Price class="ml4 mt4" :payload="item" :isColumn="true" />
      <Phone :payload="user" />
      <div class="ek-meta good-detail pl4 pr4" v-html="item.goods_info_desc"></div>
      <Pay event="selectGoodsDetail" />
    </div>
    <div class="container" v-show="!isLoad">
      <div class="tc df cr666" style="margin-top: 3rem">页面加载中···</div>
    </div>
  </div>
</template>
<script scoped>
  import { mapGetters } from 'vuex';
  import Banner from '../../components/banner';
  import Good from '../../components/good';
  import Price from '../../components/price';
  import Operator from '../../components/operator';
  import Phone from '../../components/phone';
  import Pay from '../../components/pay';

  export default {
    data () {
      return {
        title: '商品详情',
        item: {}, raw: {}, user: {}, isLoad: false,
        params: {
          size: 10, exchange: 0,
        }
      }
    },
    components: {
      Banner, Good, Price, Operator, Phone, Pay
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
      modifyCustom ({ target }) {
        this.custom.isFixed = target.scrollTop > this.custom.topFixed;
      },
      cancelNotice () {
        this.isNotice = false;
      },
      selectGoods (isSelected) {
        this.bubble('selectGoods');
      }
    },
    mounted () {
      this.bubble('selectGoodsDetail');
    },
    watch: {
      'memory.selectGoodsDetail' (counter) {
        if (counter != 0) {
          this.isLoad = true;
        }
      }
    }
  }
</script>
<style scoped>
  .good {
    margin: 1rem auto;
    transform: scale(1.2);
  }
  .operator {
    margin-bottom: .28rem;
  }
  .phone {
    margin-top: .4rem;
    margin-bottom: .4rem;
  }
  .pay {
    height: 2rem;
  }
</style>