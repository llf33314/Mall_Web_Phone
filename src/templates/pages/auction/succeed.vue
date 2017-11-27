<template>
  <div id='app' class="shop-wrapper auction-wrapper">
        <section class="bond-main">
            <div class="bond-dui iconfont icon-dui1">
            </div>
            <div class="bond-txt">
                <p class="fs66">报名成功</p>
                <p class="fs46 shopGray">恭喜，报名成功</p>
            </div>
            <div class="bond-button">
                <p class="shop-max-button fs52" @click="returnHomePage">继续逛逛</p>
                <p class="shop-max-button fs52" style="display:none;">返回首页</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "address",
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId") //商家id
    };
  },
 mounted() {
    this.commonFn.setTitle("保证金缴纳成功");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  components: {},
  methods: {
    returnHomePage() {
      //跳转到首页 todo
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/auction.less";
</style>
