<template>
  <div class="price">
    <!-- 普通竖版 -->
    <div class="content" v-if="isNormal">
      <div class="df center font14 cr666" v-if="!isDisabled">
        {{ priceText }}<span class="crGirlPink">{{ price }}</span>翼豆
        <span class="free font10" v-if="isDiscount">特惠</span>
      </div>
      <div class="df center font14 crGirlPink" v-if="isDisabled">
        {{ disabledText }}
      </div>
      <div class="font12 cr999 del" v-if="hasFakePrice">
        <span>价格：</span><span>{{ fakePrice }}</span>翼豆
      </div>
    </div>
    <!-- 特殊竖版 -->
    <div :class="['content', 'df', 'center', isDiscount ? 'crGirlPink' : '']" v-if="isColumn">
      <div class="df center font18 pr4" v-if="!isDisabled">
        <span v-if="isDiscount">特惠:</span>{{ priceText }}<span :class="isDiscount ? '' : 'crGirlPink'">{{ price }}</span>翼豆
      </div>
      <div class="df center font18 crGirlPink" v-if="isDisabled">
        {{ disabledText }}
      </div>
      <div class="font14 cr999 del" v-if="hasFakePrice">
        <span>{{ fakePrice }}</span>翼豆
      </div>
    </div>
    <div v-if="isColumn && isDiscount" class="crGirlPink font14 mt3">距离结束还有：{{ remainTime | formatTime }}</div>
    <!-- 特殊横版 -->
    <div class="content df center" v-if="isRow">
      <div class="df center font18 pr2 cr666" v-if="!isDisabled">
        <span v-if="isDiscount">特惠:</span>{{ priceText }}<span class="crGirlPink">{{ price }}</span>翼豆
      </div>
      <div class="df center font14 crGirlPink" v-if="isDisabled">
        {{ disabledText }}
      </div>
      <div class="font14 cr999 del" v-if="hasFakePrice">
        <span>{{ fakePrice }}</span>翼豆
      </div>
    </div>
  </div>
</template>
<script>
  import { Php, Func } from '../vendor/lib';
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        // 页面展示所需信息
        price: 0, fakePrice: 0, remainTime: '', isNormal: true, isVip: false,
        priceText: '', fakePriceText: '', disabledText: '',
        isDiscount: false, isDisabled: false, hasFakePrice: true,
      }
    },
    filters: {
      formatTime (time) {
        return Func.formatTime(time, 'h天mm分ss秒');
      }
    },
    computed: {
      ...mapGetters({
        memory: 'getAllocateVariable',
      })
    },
    methods: {
      request (subscription, payload) {
        this.$store.dispatch('requestCustomer', { request: subscription, payload, page: this });
      },
      allocate (payload) {
        this.$store.dispatch('allocateMemory', payload);
      },
      trimPayload () {
        // 切换横竖版模式
        if (this.isColumn || this.isRow) {
          this.isNormal = false
        }
        if (!this.payload || Func.isEmptyObject(this.payload)) {
          return false;
        }
        this.isVip = ((this.memory.raw.user.is_vip) && (this.memory.raw.user.vip_type == 'is_vip'));
        // 商品的布尔值属性
        const { is_online, goods_num, goods_convert } = this.payload;
        let { is_discount } = this.payload;
        // 商品的非打折价
        const goods_price = this.payload.goods_price || this.fake.goods_price;
        const goods_price_vip = this.payload.ext.goods_price_vip;
        // 商品的打折价
        const { present_price_vip, present_price } = (this.payload.ext.discount_info
        && this.payload.ext.discount_info[0])
        || {};
        // 商品的打折起始时间
        const { discount_start_time, discount_end_time } = (this.payload.ext.discount_info
        && this.payload.ext.discount_info[0])
        || {};
        // 商品判断有效期判断
        if (is_discount == 1) {
          const now = Php.time();
          if ( 
            now < discount_start_time
            || now  > discount_end_time
            ) {
            is_discount = 0;
          }
          if (
            now > discount_start_time
            || now  < discount_end_time
            ) {
            this.remainTime = discount_end_time - now;
          }
        }
        // 商品价格判断
        switch (true) {
          // 未打折vip商品
          case is_discount == 0 && goods_convert == 1:
            this.hasFakePrice = false;
            this.isDiscount = false;
            this.price = goods_price;
            this.priceText = 'VIP专享:';
            this.fakePriceText = '';
            break;
          // 未打折非vip商品
          case is_discount == 0 && goods_convert == 2:
            this.hasFakePrice = true;
            this.isDiscount = false;
            if (this.isVip) {
              // 用户为vip
              this.fakePrice = goods_price;
              this.price = goods_price_vip;
              this.priceText = 'VIP专享:';
              this.fakePriceText = '';
            } else {
              // 用户为非vip
              this.price = goods_price;
              this.fakePrice = goods_price_vip;
              this.priceText = '';
              this.fakePriceText = 'VIP专享:';
            }
            break;        
          // 打折vip商品
          case is_discount == 1 && goods_convert == 1:
            this.hasFakePrice = true;
            this.isDiscount = true;
            this.price = present_price;
            this.fakePrice = goods_price;
            this.priceText = '';
            this.fakePriceText = '';
            break;
          // 打折非vip商品
          case is_discount == 1 && goods_convert == 2:
            this.hasFakePrice = true;
            this.isDiscount = true;
            this.priceText = '';
            this.fakePriceText = '';
            if (this.isVip) {
              // 用户为vip
              this.price = present_price_vip;
              this.fakePrice = goods_price_vip;
            } else {
              // 用户为非vip
              this.price = present_price;
              this.fakePrice = goods_price;
            }        
            break;
        }
        // 商品兑换判断
        switch (true) {
          // 商品缺货
          case goods_num == 0:
            this.isDisabled = true;
            this.hasFakePrice = false;
            this.disabledText = '库存不足';
            break;
          // 商品下架
          case is_online == 2:
            this.isDisabled = true;
            this.hasFakePrice = false;
            this.disabledText = '商品已下架';
            break;
        }
        this.allocate({ goodPrice: this.price });
      }
    },
    props: ['payload', 'isColumn', 'isRow'],
    mounted () {
      this.$nextTick(() => {
        this.trimPayload();
      })
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
  .price .free {
    background-color: #ff5959;
    color: #fff;
    padding: 0 .06rem;
    text-align: center;
    border-radius: 0.05rem;
    margin-left: .12rem;
  }
</style>