<template>
  <div
    :style="bg"
    :class="['good', 'df', 'center', defaultBg, isDisabled ? 'disabled' : '']">
    <div class="content tc">
      <span class="font12">
        {{ type }}
      </span>
    </div>
    <div class="f1 meta tc">
      <span class="font32">{{ number }}</span>{{ unit }}
    </div>
  </div>
</template>
<script>
  import { Func } from '../vendor/lib';
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        // 页面展示所需参数
        isDisabled: true, type: '未知', number: '0', unit: 'null', bg: '', defaultBg: '',
      }
    },
    computed: {
      ...mapGetters({
        memory: 'getAllocateVariable',
      })
    },
    methods: {
      allocate (payload) {
        this.$store.dispatch('allocateMemory', payload);
      },
      trimPayload () {
        if (!this.payload || Func.isEmptyObject(this.payload)) {
          return false;
        }
        const { goods_category, is_online, goods_num } = this.payload;
        this.number = this.payload.goods_name.match(/[0-9]+/)[0];
        this.allocate({
          goodCategory: goods_category,
          goodName: this.number,
          gid: this.payload.id,
        })
        switch (true) {
          case goods_category == 18:
            this.type = '流量';
            this.unit = 'M';
            this.defaultBg = 'll';
            break;
          case goods_category == 19:
            this.type = '话费';
            this.unit = '元';
            this.defaultBg = 'hf';
            break;
        }
        switch (true) {
          case this.memory.isTest:
            this.bg = '';
            break;
          case !this.memory.isTest:
            if (this.payload.goods_img && this.payload.goods_img != '') {
              this.bg = { backgroundImage: `url(${this.payload.goods_img})` };
            }
            break;
        }
        switch (true) {
          case is_online == 2:
            this.isDisabled = true;
            break;
          case goods_num == 0:
            this.isDisabled = true;
            break;
          case is_online == 1 && goods_num != 0:
            this.isDisabled = false;
            break;
        }
      }
    },
    props: ['payload'],
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
  .ll {
    background-image: url(../assets/images/postmark_forgive.png);
  }
  .hf {
    background-image: url(../assets/images/postmark_blue.png);
  }
  .good {
    background-repeat: no-repeat;
    background-size: 3.72rem 1.8rem;
    width: 3.72rem;
    height: 1.8rem;
    color: #fff;
  }
  .good .content {
    width: .72rem;
  }
  .good .content span {
    display: inline-block;
    width: .4rem;
    word-wrap: break-word;
  }
  .good.disabled {
    opacity: .5;
  }
</style>