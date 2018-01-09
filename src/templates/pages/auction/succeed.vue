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
                <p class="shop-max-button fs52" @click="returnAuctionAll">继续逛逛</p>
                <p class="shop-max-button fs52" @click="returnHomePage">返回首页</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "address",
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      shopId : this.$route.params.shopId || sessionStorage.getItem("shopId"), //店铺id
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
      //跳转到首页
      // this.$parent.getMemberCenter(this.busId,1);
       this.$parent.getPageId(this.busId,this.shopId,true);
    },
    returnAuctionAll(){
      let aucId = this.$route.params.aucId;
      let proId = this.$route.params.proId;
      // this.$router.push("/goods/details/"+this.shopId+"/"+this.busId+"/4/"+proId+"/"+aucId);

      this.$router.push("/classify/"+this.shopId+"/"+this.busId+"/4/k=k");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/auction.less";
</style>
