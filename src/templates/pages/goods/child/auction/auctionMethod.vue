<template>
<section class="goods-auction" >
    <div class="goods-auction-title border " >
        <span class="fs42">竞拍玩法</span>
        <span class="fs42">玩法详情
            <i class="icon-jiantou-copy iconfont" style="color:#c7c7cc;vertical-align: middle;" ></i>
        </span>
    </div>
    <div class="goods-auction-rule">
        <span ><em>1</em>出价竞拍</span>
        <span ><em>2</em>获拍转单</span>
        <span ><em>3</em>支付订单</span>
        <span ><em>4</em>竞拍成功</span>
    </div> 
</section>
</template>

<script>

export default {
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
@import (reference) "~assets/css/common.less";
.goods-auction {
    width: 100%;
    padding-left: 30/@dev-Width *1rem;
    .goods-auction-title {
      padding: 35/@dev-Width *1rem 0;
      padding-right: 30/@dev-Width *1rem;
      .shop-box-center;
      span {
        .shop-show;
      }
    }
    .goods-auction-rule {
      width: 100%;
      padding: 46/@dev-Width *1rem 0;
      text-align: center;
      .fs36;
      span {
        margin: 0 3px;
      }
      em {
        .shop-inblock;
        .fs40;
        width: 50/@dev-Width *1rem;
        height: 50/@dev-Width *1rem;
        line-height: 50/@dev-Width *1rem;
        background: #e4393c;
        color: #fff;
        margin-right: 2px;
        .border-radius(100%);
      }
    }
  }
</style>
