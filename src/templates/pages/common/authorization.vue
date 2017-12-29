<template>
    <div class="shop-wrapper">
        <div class="title_div" v-if="isError">请用微信浏览器扫描二维码</div>
        <div class="title_div" v-if="isSuccess">您已授权成功</div>
        <div class="error_url_image"><img src="../../../assets/img/error/error_url.png"/></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      isError: false,
      isSuccess: false
    };
  },
  mounted() {
    this.commonFn.setTitle("提示");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.load();
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    /** 
         * 获取底部菜单
         */
    load() {
      let _this = this;
      let _busId = this.$route.params.busId || _this.$store.state.busId || null;
      if (_busId == null || _busId == "") {
        return;
      }
      _this.ajaxRequest({
        status: false,
        url: h5App.activeAPI.busGrant_get + _busId,
        data: {},
        type: "get",
        status: false,
        success: function(data) {
          if (data.code == 1026) {
            _this.isError = true;
          } else if (data.code == 0) {
            _this.isSuccess = true;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
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