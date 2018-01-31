<template>
<section class="goods-prove">
    <span class="fs40" >
        <i class="iconfont icon-chenggong shopGreen" v-if="data.stoType"></i>
        {{data.stoType}}
    </span>
    <span class="fs40" v-if="data.isSecuritytrade">
        <i class="iconfont icon-chenggong shopGreen"></i>
        担保交易
    </span>
    <span class="fs40">
        <i class="iconfont icon-chenggong shopGreen"></i>
        线下门店
    </span>
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

<style  lang="less" scoped>
@import (reference) "~assets/css/base.less";
@import (reference) "~assets/css/mixins.less";
 .goods-prove {
    padding: 48/@dev-Width *1rem 30/@dev-Width *1rem;
    line-height: 1;
    span {
      margin-right: 30/@dev-Width *1rem;
    }
    i {
      font-size: 48/@dev-Width *1rem;
      font-weight: bold;
      margin-right: 3px;
      vertical-align: -0.02rem;
    }
  }
</style>
