<template>
  <div class="shop-main-no">
      <div class="shop-no-content">
      <div class="no-order" v-if="statu == 1">
        <div class="shop-no-icon">
          <i class="iconfont icon-order"></i>
        </div>
        <p class="fs52">{{msg}}</p>
        <a class="fs36" @click="lockMall"> 可以去逛逛哦~</a>
      </div>
      <div class="no-news" v-if="statu == 2">
        <div class="shop-no-icon">
          <i>!</i>
        </div>
        <a class="fs36"> 暂不相关信息</a>
      </div>
      <div class="no-shopcart" v-if="statu == 3">
        <div class="shop-no-icon">
          <i>!</i>
        </div>
        <p class="fs36 shopGray shop-textc">您的购物车还没有任何商品</p>
        <span class="no-button shopborder fs36"  @click="lockMall">去逛逛</span>
      </div>
      <div class="no-shopcart" v-if="statu == 4">
       <div class="shop-no-icon2">
          <i class="icon-zanwudizhi iconfont"></i>
        </div>
        <a class="fs42" style="color:#333"> {{errorMsg || '暂无相关信息'}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["statu", "errorMsg"],
  data: function() {
    return { msg: "您还没有相关的订单" };
  },
  mounted() {
    if (this.errorMsg != null) {
      this.msg = this.errorMsg;
    }
  },
  methods: {
    //逛商城
    lockMall() {
      let busId = this.$route.params.busId;
      this.$parent.getMemberCenter(busId,1);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
.shop-main-no {
  padding: (250+148)/@dev-Width *1rem 0 250/@dev-Width *1rem;
  .shop-no-content {
    width: 100%;
    text-align: center;
    line-height: 1;
    font-size: 0;
    .shop-no-icon {
      width: 215/@dev-Width *1rem;
      height: 215/@dev-Width *1rem;
      .border-radius(100%);
      background: #d1d2d4;
      margin: 0 auto;
      margin-bottom: 100/@dev-Width *1rem;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(center);
      i {
        color: #fff;
        font-size: 150/@dev-Width *1rem;
      }
    }
    .shop-no-icon2 {
      width: 215/@dev-Width *1rem;
      height: 215/@dev-Width *1rem;
      margin: 0 auto;
      margin-bottom: 100/@dev-Width *1rem;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(center);
      i {
        color: #d1d2d4 !important;
        font-size: 178/@dev-Width *1rem;
      }
    }
    p {
      margin-bottom: 50/@dev-Width *1rem;
    }
    a {
      color: #999;
    }
    .no-button {
      display: inline-block;
      padding: 20/@dev-Width *1rem 30/@dev-Width *1rem;
      .border-radius(6px);
    }
    .no-shopcart {
      width: 100%;
      .shop-no-icon {
        background: 0;
        border: 1px solid #7a7e83;
      }
      i {
        color: #7a7e83;
        font-weight: 100;
      }
    }
  }
}
</style>
