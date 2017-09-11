<template>
  <div class="wrap">
    <Banner :title="title" />
    <div class="container" v-show="isLoad">
      <ul class="items" v-show="items.length != 0">
        <li class="item" v-for="item in items" @click="redirectOrderDetail(item.id)">
          <div class="pa3 df center">
            <div class="f1 cr666 font14">{{ item.create_time | formatTime }}</div>
            <div class="crSkyBlue font16" v-if="item.order_status == 1">充值中...</div>
            <div class="crGirlPink font16" v-if="item.order_status == 0">充值失败</div>
            <div class="cr333 font16" v-if="item.order_status == 3">充值成功</div>
          </div>
          <div class="pa3 df center bcrf8f8f8">
            <Good
              class="mr4"
              :payload="{
                goods_category: item.order_category,
                goods_num: item.goods_num,
                goods_name: item.order_name,
                is_online: 1,
                goods_img: item.goods_img,
              }" />
            <div class="ml4">
              <div class="font18 cr333">{{ item.order_name }}</div>
              <div class="font12 cr666">兑换号码：{{ item.tel }}</div>
            </div>
          </div>
          <div class="pa3 font14 cr666">支付:{{ item.order_money }}翼豆</div>
        </li>
      </ul>
      <div class="empty font14 tc" v-show="items.length == 0">
        <div class="bg"></div>
        <div><span ref="btn" class="btn contrast crSkyBlue link" @click="redirectGoodsList">GO</span></div>
      </div>
    </div>
    <div class="container" v-show="!isLoad">
      <div class="tc df cr666" style="margin-top: 3rem">页面加载中···</div>
    </div>
  </div>
</template>
<script scoped>
  import { mapGetters } from 'vuex';
  import { Func } from '../../vendor/lib';
  import Banner from '../../components/banner';
  import Good from '../../components/good';
  import Price from '../../components/price';
  import Operator from '../../components/operator';
  import Phone from '../../components/phone';
  import Pay from '../../components/pay';

  export default {
    data () {
      return {
        title: '兑换记录', items: [], isLoad: false,
      }
    },
    computed: {
      ...mapGetters({
        memory: 'getAllocateVariable',
      })
    },
    components: {
      Banner, Good, Price, Operator, Phone, Pay
    },
    filters: {
      formatTime (time) {
        return Func.formatTime(time, 'YYYY年MM月DD日 h:mm:ss');
      }
    },
    methods: {
      bubble (subscription) {
        this.$store.dispatch('bubbleDelegation', { subscription, page: this });
      },
      request (subscription, payload) {
        this.$store.dispatch('requestCustomer', { request: subscription, payload, page: this });
      },
      redirectOrderDetail (id) {
        this.request('redirect', {
          path: '/student/mall/orderdetail',
          params: {
            oid: id
          }
        })
      },
      redirectGoodsList (id) {
        this.request('redirect', {
          path: '/student/mall/goodslist',
          params: {},
        })
      }
    },
    mounted () {
      this.bubble('selectOrderList');
    },
    watch: {
      'memory.selectOrderList' (counter) {
        if (counter != 0) {
          this.isLoad = true;
        }
      }
    }
  }
</script>
<style scoped>
  .item {
    border-bottom: .16rem solid #eee;
  }
  .empty .bg {
    display: inline-block;
    margin-top: 3rem;
    width: 6rem;
    height: 4.8rem;
    background-size: 6rem;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/empty_record.png');
  }
  .empty .btn {
    width: 1.5rem;
    border-radius: .6rem;
    padding: .15rem .4rem;
  }
</style>