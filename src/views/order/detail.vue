<template>
  <div class="wrap">
    <Banner :title="title" />
    <div class="container" v-show="isLoad">
      <div class="pa3 tc">
        <!-- <div class="mt4 mb4 crSkyBlue font28">充值中...</div> -->
        <div class="crSkyBlue font28 mt4 mb4" v-if="order.order_status == 1">充值中...</div>
        <div class="crGirlPink font28 mt4 mb2" v-if="order.order_status == 0">充值失败</div>
        <div class="cr333 font28 mt4 mb4" v-if="order.order_status == 3">充值成功</div>
        <Price class="tc df mb4" isRow="true" :payload="item" v-if="order.order_status != 0" />
        <div class="font14 tc cr333" v-if="order.order_status == 0">(翼豆已退还至账户)</div>
      </div>
      <div class="hr mb4"></div>
      <div class="pl4 pr4 df center">
        <span class="font16" @click="redirectGoodDetail">商品详情</span><i class="fa-icon fa-more"></i>
      </div>
      <div class="ml4 hr mt4"></div>
      <div class="pa4 mt1 df center item">
        <Good :payload="item" />
        <div class="ml4">
          <div class="font18 cr333">{{ order.order_name }}</div>
          <Operator class="mt3" :payload="item" />
        </div>
      </div>
      <div class="meta font14 pl4 pr4 mt4">
        <p>订单编号：{{ order.order_number }}</p>
        <p>下单时间：{{ order.create_time | formatTime }}</p>
        <p>手机号码：{{ order.tel | mosaicPhone }}</p>
        <p>运营商户：{{ operator }}</p>
        <p>充值面额：{{ order.order_name }}</p>
      </div>
    </div>
    <div class="container" v-show="!isLoad">
      <div class="tc df cr666" style="margin-top: 3rem">页面加载中···</div>
    </div>
    <div class="tc mb4 font12 cr999">最终解释权归翼课网所有</div>
  </div>
</template>
<script scoped>
  import { mapGetters } from 'vuex';
  import { Func } from '../../vendor/lib';
  import Banner from '../../components/banner';
  import Good from '../../components/good';
  import Price from '../../components/price';
  import Operator from '../../components/operator';

  export default {
    data () {
      return {
        title: '订单详情', item: {}, raw: {}, operator: '', order: {}, isLoad: false,
        params: {
          size: 10,
        }
      }
    },
    components: {
      Banner, Good, Price, Operator
    },
    computed: {
      ...mapGetters({
        memory: 'getAllocateVariable',
      })
    },
    filters: {
      formatTime (time) {
        return Func.formatTime(time, 'YYYY-MM-DD h:mm');
      },
      trimName (str) {
        const chips = (str + '').match(/[0-9]+/);
        if (chips) {
          return chips[0];
        }
      },
      mosaicPhone (phone) {
        if (!!phone && phone.length) {
          return phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
        }
        return phone;
      }
    },
    methods: {
      bubble (subscription) {
        this.$store.dispatch('bubbleDelegation', { subscription, page: this });
      },
      request (subscription, payload) {
        this.$store.dispatch('requestCustomer', { request: subscription, payload, page: this });
      },
      redirectGoodDetail () {
        this.$nextTick(() => {
          const params = { ...this.params, gid: this.item.id }
          this.request('redirect', {
            path: '/student/mall/goodsdetail', params
          })
        });
      }
    },
    mounted () {
      this.bubble('selectOrderDetail');
    },
    watch: {
      'memory.selectOrderDetail' (counter) {
        if (counter != 0) {
          this.isLoad = true;
          console.log(this.raw);
        }
      }
    }
  }
</script>
<style scoped>
  .item {
    border-bottom: .12rem solid #f8f8f8;
  }
  .meta p {
    margin: .05rem 0;
    color: #666;
  }
  .fa-more {
    width: .6rem;
    height: .6rem;
    background-size: .6rem .6rem;
  }
</style>
