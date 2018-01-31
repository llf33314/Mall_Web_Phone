<template>
<section class="goods-address">
    <div class="goods-address-main border" v-if="data.memberAddress != null">
        <div class="fs40 goods-address-txt text-overflow">
            <i class="iconfont icon-dingwei style-main-font"></i>
            送至：{{data.memberAddress}}
        </div>
        <!-- <i class="iconfont icon-jiantou-copy shopGray"></i> -->
    </div>
    <div class="shopGray fs40 goods-address-postage">
        运费 : <span v-text="data.freightMoney == null || data.freightMoney == 0 ? '免运费': data.freightMoney"></span>
    </div>
</section>
</template>

<script>
export default {
    props:['row'],
    watch: {
        'row'(a,b){
          this.data = a;
        }
    },
    data () {
        return {
            data:''
        }
    },
    methods:{

    },
    mounted () {
        
    }

}
</script>

<style lang="less" scoped>
@import (reference) "~assets/css/base.less";
@import (reference) "~assets/css/mixins.less";
.goods-address {
    width: 100%;
    padding-left: 46/@dev-Width *1rem;
    .goods-address-main {
      width: 100%;
      padding: 30/@dev-Width *1rem 0;
      .goods-address-txt {
        width: 94%;
        // float: left;
      }
      .shopGray {
        color: #c7c7cc;
      }
    }
    .goods-address-postage {
      padding: 30/@dev-Width *1rem 0;
    }
  }
</style>
