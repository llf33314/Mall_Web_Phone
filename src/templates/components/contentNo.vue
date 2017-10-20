<template>
    <div class="shop-no-content">
    <div class="no-order" v-if="statu == 1">
      <div class="shop-no-icon">
        <i class="iconfont icon-order"></i>
      </div>
      <p class="fs52">您还没有相关的订单</p>
      <a class="fs36"> 可以去逛逛哦~</a>
    </div>
    <div class="no-news" v-if="statu == 2">
      <div class="shop-no-icon">
        <i>！</i>
      </div>
      <a class="fs36"> 暂不相关信息</a>
    </div>
    <div class="no-shopcart" v-if="statu == 3">
      <div class="shop-no-icon">
        <i>！</i>
      </div>
      <p class="fs36 shopGray">您的购物车还没有任何商品</p>
      <span class="no-button shopborder">去逛逛</span>
    </div>
  </div>
</template>
<script>

export default {
    props:['statu'],
    data: function () {
        return {

        }
    },
    mounted() {
       
    },
}
</script>
<style lang="less" scoped>

@import '../../assets/css/mixins.less';
@import '../../assets/css/base.less';

</style>
