<template>
  <div class="custom" :style="{ height: content.height }">
    <nav :style="isFixed ? { position: 'fixed' } : ''" ref="content" class="content df center pr4 pl4">
      <div class="f1">
        <div class="font18 df center link cr666" v-show="isFixed" @click="redirectGetCreditDetail">
          <span class="crGirlPink">123</span>翼豆
          <i class="fa-icon fa-more"></i>
        </div>
        <div class="font16" v-show="!isFixed">全部商品</div>
      </div>
      <div class="df center">
        <i :class="['fa-icon', isSelected ? 'fa-radio-selected' : 'fa-radio']" @click="selected"></i>
        <div class="font14">我能兑换的商品</div>
      </div>
    </nav>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        content: {},
      }
    },
    methods: {
      selected () {
        this.$emit('exchangeGoodsList', this.isSelected)
      },
      bubble (subscription) {
        this.$store.dispatch('bubbleDelegation', { subscription, page: this });
      },
      redirectGetCreditDetail () {
        this.bubble('delegationGetCreditDetail');
      },
    },
    props: ['isFixed', 'isSelected'],
    mounted () {
      if (this.isFixed) {
        this.content.height = this.$refs.content.offsetHeight;
      }
    }
  }
</script>
<style scoped>
  .custom .content {
    z-index: 1;
    width: 10rem;
    box-sizing: border-box;
    border-bottom: .02667rem solid #eee;
    height: 1.2rem;
    background-color: #fff;
  }
  .custom .fa-radio, .fa-radio-selected {
    width: .48rem;
    height: .48rem;
    background-size: .48rem .48rem;
    margin-right: .16rem;
  }
  .custom .fa-more {
    width: .6rem;
    height: .6rem;
    background-size: .6rem;
  }
</style>