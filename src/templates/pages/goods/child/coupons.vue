<template>
  <section class="goods-selected">
    <div class="goods-selected-main" >
        <div class="fs40">查看所含优惠卷
        </div>
        <i class="iconfont icon-jiantou-copy shopGray"></i>
    </div>
</section>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import (reference) "~assets/css/base.less";
@import (reference) "~assets/css/mixins.less";
.goods-selected {
    width: 100%;
    padding: 30/@dev-Width *1rem 22/@dev-Width *1rem 30/@dev-Width *1rem 46/@dev-Width *1rem;
    .goods-selected-main {
      width: 100%;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(justify);
      i {
        color: #c7c7cc;
      }
    }
  }
</style>
