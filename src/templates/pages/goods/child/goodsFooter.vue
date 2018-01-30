<template>
  <div class="goods-content-nav">
    <p class="goods-nav border">
        <span class="fs40" @click="home">店铺主页</span>
        <span class="fs40" @click="myCenter">会员中心</span>
        <span class="fs40" v-if="qrcodeUrl != ''" @click="showDialog">关注我们</span>
        <span class="fs40" @click="toShop">线下门店</span>
    </p>
    <!---技术认证---->
    <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
</div>
</template>

<script>

export default {
  props: ["row", "qrcodeUrl"],
  components: {
  },
  watch: {
    row(a, b) {
      this.data = a;
    }
  },
  data() {
    return {
      data: "",
      spec_num: ""
    };
  },
  methods: {
    myCenter() {
      let busId = this.$route.params.busId;
      this.$parent.$parent.getMemberCenter(busId, 1);
    },
    home() {
      let busId = this.$route.params.busId;
      let shopId = this.$route.params.shopId;
      this.$parent.$parent.getPageId(busId, shopId, true);
    },
    toShop() {
      let busId = this.$route.params.busId;
      this.$router.push("/stores/" + busId);
    },
    showDialog() {
      this.$parent.showImage(this.qrcodeUrl);
    }
  },
  mounted() {}
};
</script>

<style>

</style>
