<template>
  <div class="wrap result">
    <div class="container">
      <Banner :title="title" />
      <div class="pa3 tc">
        <div class="bg1"></div>
      </div>
      <div class="cr333 tc font18">兑换成功</div>
      <div class="tc cr666 font12 mt3">系统会在48小时之内（通常1～10分钟）充值成功</div>
      <div class="tc">
        <div class="bg2 meta font12 pl4 pr4 mt4 pt4">
          <div class="tc font14 cr333">{{ order.order_name }}</div>
          <p>订单编号：{{ order.order_number }}</p>
          <p>手机号码：{{ order.tel }}</p>
          <p>运营商户：{{ operator }}</p>
          <p>支付价格：{{ order.order_money }}翼豆</p>
        </div>
      </div>
    </div>
    <div class="font16 mb4 pb4">
      <div class="tc mb3"><span class="btn link primary bcrSkyBlue crfff" @click="redirectOrderDetail">查看订单</span></div>
      <div class="tc mb4"><span class="btn link contrast crSkyBlue" @click="redirectGoodsList">返回商城首页</span></div>
    </div>
  </div>
</template>
<script scoped>
  import { Func } from '../../vendor/lib';
  import Banner from '../../components/banner';

  export default {
    data () {
      return {
        title: '兑换结果',
        raw: {}, order: {}, operator: '',
      }
    },
    components: {
      Banner
    },
    methods: {
      bubble (subscription) {
        this.$store.dispatch('bubbleDelegation', { subscription, page: this });
      },
      request (subscription, payload) {
        this.$store.dispatch('requestCustomer', { request: subscription, payload, page: this });
      },
      redirectGoodsList () {
        this.request('redirect', {
          path: '/student/mall/goodslist',
          params: {
            exchange: 0,
          },
        });
      },
      redirectOrderDetail () {
        this.request('redirect', {
          path: '/student/mall/orderdetail',
          params: {
            oid: this.order.id,
          },
        });
      },
    },
    mounted () {
      this.bubble('selectExchangeResult');
    }
  }
</script>
<style scoped>
  .item {
    border-bottom: .12rem solid #f8f8f8;
  }
  .meta p {
    margin: .1rem 0;
    padding-left: .3rem;
    color: #666;
  }
  .fa-more {
    width: .6rem;
    height: .6rem;
    background-size: .6rem .6rem;
  }
  .bg1 {
    background-image: url('../../assets/images/laugh.png');
    height: 1.68rem;
    width: 1.7rem;
    background-size: 1.68rem 1.68rem;
    background-repeat: no-repeat;
    display: inline-block;
    margin-top: .9rem;
    margin-bottom: .4rem;
  }
  .bg2 {
    margin-top: .56rem;
    background-repeat: no-repeat;
    background-size: 8rem 4rem;
    background-image: url('../../assets/images/board.png');
    box-sizing: border-box;
    display: inline-block;
    height: 4rem;
    width: 8rem;
    text-align: left;
  }
  .result .btn {
    width: 5.08rem;
    border-radius: 1rem;
    padding: .24rem .25rem;
  }
</style>
