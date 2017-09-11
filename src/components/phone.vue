<template>
  <div class="phone df center pl4 pr4">
    <div class="f1 df between column">
      <input
        type="text"
        ref="phone"
        class="font18"
        placeholder="请输入需要充值的手机号码"
        v-model="phone"
        @blur="switchFakeInput"
        @input="trimInput"
        @focus="switchInputStatus(true)"
        v-show="!isFake" />
      <input
        type="text"
        class="font20"
        ref="fakePhone"
        v-model="fakePhone"
        @focus="switchInput"
        v-show="isFake" />
      <div :class="['placeholder', 'mb3', isError ? 'crGirlPink' : 'cr999']">{{ notice }}</div>
    </div>
    <div class="df center">
      <transition name="clear" mode="out-in" appear>
        <i
          class="fa-icon fa-wrong link mb3"
          @click="clear"
          v-show="phone != '' && !isFake" />
      </transition>
      <i class="fa-icon ml3 mb3 fa-account link" @click="selectAddressPhone"></i>
    </div>
 </div>
</template>
<script>
  import { Php, Func } from '../vendor/lib';
  import { mapGetters } from 'vuex';
  export default {
    data () {
      return {
        phone: '',
        fakePhone: '',
        isFake: false,
        isError: true,
        iDefault: false,
        notice: '无效的手机号码',
      }
    },
    props: ['payload'],
    computed: {
      ...mapGetters({
        memory: 'getAllocateVariable',
      })
    },
    methods: {
      request (subscription, payload) {
        this.$store.dispatch('requestCustomer', { request: subscription, payload, page: this });
      },
      bubble (subscription) {
        this.$store.dispatch('bubbleDelegation', { subscription, page: this });
      },
      allocate (payload) {
        this.$store.dispatch('allocateMemory', payload);
      },
      switchInputStatus (isInput) {
        this.allocate({
          isInput,
          countInput: this.memory.countInput ?  0 : this.memory.countInput++
        });
      },
      clear () {
        this.phone = '';
        this.fakePhone = '';
        this.$nextTick(() => {
          this.switchFakeInput();
          this.switchInput();
          this.switchInputStatus(true);
          this.isError = true;
          this.notice = '';
        })
      },
      trimInput () {
        this.phone = `${this.phone}`;
        if (!this.phone.match(/^[0-9]+$/)) {
          const number = this.phone.match(/[0-9]+/);
          this.phone = number ? number[0] : '';
        }
        if (this.phone.length > 11) {
          this.phone = this.phone.substring(0, 11);
        }
        if (this.phone.length == 11) {
          this.allocate({ phone: this.phone })
          this.switchFakeInput();
        }
      },
      switchFakeInput () {
        this.switchInputStatus(false);
        if (this.phone == '') {
          this.notice = '';
          this.isError = true;
          return false;
        }
        if (this.phone.length != 11) {
          this.request('createPayment', { auth: false });
        }
        if (this.phone.length == 11) {
          this.bubble('validatePhone');
        }
        this.$nextTick(() => {
          const phone = [];
          phone.push(this.phone.slice(0, 3));
          phone.push(this.phone.slice(3, 7));
          phone.push(this.phone.slice(7));
          this.fakePhone = phone.join(" ");
          this.isFake = true;
        });
      },
      switchInput () {
        if (this.isDefault) {
          this.isDefault = false;
          this.phone = '';
          this.isError = true;
          this.notice = '';
          this.request('createPayment', {
            auth: false,
          })
        };
        this.switchInputStatus(true);
        this.isFake = false;
        this.$nextTick(() => {
          this.$refs.phone.focus();
        })
      },
      trimPayload () {
        if (!this.payload || Func.isEmptyObject(this.payload)) {
          return false;
        }
        this.phone = this.phone || this.payload.tel || '';
        this.phone = `${this.phone}`;
        if (this.phone) {
          this.isDefault = true;
        }
        this.$nextTick(() => {
          this.switchFakeInput();
        });
      },
      selectAddressPhone () {
        this.bubble('selectAddressPhone');
      }
    },
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
  .phone {
    background-color: #f5f5f5;
    height: 1.96rem;
  }
  .phone input {
    width: 6.8rem;
    color: #333;
    border: 0;
    background-color: transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .phone .fa-wrong {
    background-color: #ccc;
    width: .46rem;
    height: .46rem;
    background-size: .47rem;
    background-position: center;
    border-radius: 1rem;
  }
  .phone .fa-account {
    width: .6rem;
    height: .6rem;
    background-size: .6rem .6rem;
  }
  .phone .placeholder {
    height: .1rem;
  }
</style>