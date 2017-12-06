<template>
  <div class="goods-content-nav">
    <p class="goods-nav border">
        <span class="fs40">店铺主页</span>
        <span class="fs40" @click="myCenter">会员中心</span>
        <span class="fs40">关注我们</span>
        <span class="fs40">线下门店</span>
    </p>
    <!---技术认证---->
    <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
</div>
</template>

<script>
import technicalSupport from "components/technicalSupport"; //技术支持

export default {
  props: ["row"],
  components: {
    technicalSupport
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
      this.$router.push("/my/center/" + this.$route.params.busId);
    }
  },
  mounted() {}
};
</script>

<style>

</style>
