<template>
  <div class="operator df center font9">
    <span :class="isYd ? '' : 'disabled'">移动</span>
    <span :class="isLt ? '' : 'disabled'">联通</span>
    <span :class="isDx ? '' : 'disabled'">电信</span>
    <div class="cr999 font12" v-if="isOperator">{{ disabledText }}</div>
    <div class="hr"></div>
  </div>
</template>
<script>
  import { Func } from '../vendor/lib';

  export default {
    data () {
      return {
        disabled: [], disabledText: '',
        isYd: false, isLt: false, isDx: false,
      }
    },
    props: ['payload', 'isOperator'],
    methods: {
      trimPayload () {
        if (!this.payload || Func.isEmptyObject(this.payload)) {
          return false;
        }
        const { operator_sum } = this.payload.ext;
        this.isYd = (operator_sum & 1) == 1;
        this.isLt = (operator_sum & 2) == 2;
        this.isDx = (operator_sum & 4) == 4;
        if (!this.isYd) {
          this.disabled.push('移动');
        }
        if (!this.isLt) {
          this.disabled.push('联通');
        }
        if (!this.isDx) {
          this.disabled.push('电信');
        }
        this.disabledText = this.disabled.length > 0 ? this.disabled.join('，') + '用户不支持兑换' : '';
      },
    },
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
  .operator span {
    color: #333;
    width: .84rem;
    border: 1px solid #333;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 0.05rem;
    margin-right: .16rem;
  }
  .operator span.disabled {
    color: #cecece;
    border: 1px solid #cecece;
  }
</style>