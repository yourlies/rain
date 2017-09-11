<template>
  <div class="wrap">
    <Banner :title="title" :payload="banner" />
    <Notice v-if="isNotice" @cancelNotice="cancelNotice" :notice="notice" />
    <!-- 商品列表导航栏 -->
    <Custom
      :isFixed="true"
      v-show="isFixed" 
      :isSelected="isSelected"
      @exchangeGoodsList="exchangeGoodsList" />
    <!-- container -->
    <div ref="container" class="container" @scroll="mountCustom" v-show="isLoad">
      <Account ref="account" :payload="user" />
      <!-- 商品列表导航栏 -->
      <Custom :isFixed="false" :isSelected="isSelected" @exchangeGoodsList="exchangeGoodsList" />
      <ul class="items row pb4" v-show="items.length != 0">
        <li class="item col-mb-6" v-for="item in items" @click="redirectGoodsDetail(item.id)">
          <div class="item-content">
            <Good :payload="item" />
            <Operator :payload="item" class="operator" />
            <Price :payload="item" />
          </div>      
        </li>
      </ul>
      <div class="df center tc" v-show="items.length == 0">
        <div class="empty"></div>
      </div>
      <div class="cr666 tc pt4 pb4 mt4" v-show="items.length != 0">更多商品敬请期待～</div>
    </div>
    <div class="container" v-show="!isLoad">
      <div class="tc df cr666" style="margin-top: 3rem">页面加载中···</div>
    </div>
  </div>
</template>
<script scoped>
  import { mapGetters } from 'vuex';
  import Banner from '../../components/banner';
  import Notice from '../../components/notice';
  import Account from '../../components/account';
  import Custom from '../../components/custom';
  import Good from '../../components/good';
  import Price from '../../components/price';
  import Operator from '../../components/operator';

  export default {
    data () {
      return {
        title: '翼豆商城', isLoad: false,
        // 兑换次数用尽提示
        isNotice: false, notice: '',
        // 切换兑换商品导航
        isSelected: false, isSelecting: false, topFixed: 0, isFixed: false,
        // 页面缓存数据
        raw: {}, items: [], order: {}, user: {},
        // 此页面对外跳转所需所有默认参数
        params: { size: 10, exchange: 0 },
        // 此页面顶部导航
        banner: { title: '兑换记录', path: '/student/mall/orderlist', params: {} }
      }
    },
    components: {
      Banner, Notice, Account, Good, Price, Operator, Custom
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
      request (subscription, payload) {
        this.$store.dispatch('requestCustomer', { request: subscription, payload, page: this });
      },
      // 商品切换导航吸顶
      mountCustom ({ target }) {
        this.isFixed = target.scrollTop > this.topFixed;
      },
      // 关闭兑换次数用尽提示
      cancelNotice () {
        this.isNotice = false;
      },
      exchangeGoodsList () {
        this.params.exchange = this.params.exchange == 1 ? 0 : 1;
        switch (true) {
          case !this.isSelecting:
            this.isSelected = !this.isSelected;
            this.bubble('selectGoodsList');
            break;
        }
      },
      redirectGoodsDetail (id) {
        const params = { ...this.params, gid: id }
        delete params.exchange;
        this.$nextTick(() => {
          this.request('redirect', {
            path: '/student/mall/goodsdetail', params
          });
        })
      },
    },
    mounted () {
      this.bubble('selectGoodsList');
    },
    watch: {
      'memory.selectGoodsList' (counter) {
        if (counter == 0) {
          return false;
        }
        this.$nextTick(() => {
          if (this.order.ll.limit || this.order.hf.limit) {
            this.isNotice = true;
            switch (true) {
              case this.order.ll.limit && this.order.hf.limit:
                this.notice = '本月兑换机会已用尽，下月再来吧~';
                break;
              case this.order.ll.limit:
                this.notice = '本月流量兑换机会已用尽，请下月再来充值流量~';
                break;
              case this.order.hf.limit:
                this.notice = '本月话费兑换机会已用尽，请下月再来充值话费~';
                break;
            }
          }
        })
        
        this.$nextTick(() => {
          this.topFixed = this.$refs.account.$el.offsetHeight;
          this.isFixed = this.$refs.container.scrollTop > this.topFixed;
        })
        this.isLoad = true;
      }
    }
  }
</script>
<style scoped>
  .operator {
    margin-top: .6rem;
    margin-bottom: .2rem;
  }
  .items {
    width: 10.16rem;
    position: relative;
    left: -0.03rem;
  }
  .item {
    box-sizing: border-box;
    text-align: center;
    padding-top: .68rem;
    border-bottom: .03rem solid #eee;
    border-left: .03rem solid #eee;
    padding-bottom: .4rem;
    height: 5.2rem;
  }
  .item-content {
    display: inline-block;
  }
  .empty {
    width: 10rem;
    height: 10rem;
    background-size: 10rem;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/empty_good.png');
  }
  .price {
    text-align: left;
  }
</style>