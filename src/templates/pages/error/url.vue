<template>
    <div class="shop-wrapper">
        <div class="title_div">链接已失效</div>
        <div class="error_url_image"><img src="../../../assets/img/error/error_url.png"/></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId")
    };
  },
  mounted() {
    this.commonFn.setTitle("提示");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  }
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
.shop-wrapper {
  background: #fff;
  height: 100%;
  width: 100%;
  padding-top: 222/@dev-Width *1rem;
  .title_div {
    font-size: 90/@dev-Width *1rem;
    color: #596f82;
    text-align: center;
  }
  .error_url_image {
    height: 554/@dev-Width *1rem;
    width: 615/@dev-Width *1rem;
    margin: 180/@dev-Width *1rem auto;
  }
}
</style>