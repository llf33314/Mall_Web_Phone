<template>
    <div class="shop-wrapper">
        <div class="error_image"><img src="../../../assets/img/error/404.png"/></div>
        <div class="title_div">
            <p class="fs50">有可能的原因：</p>
            <ul>
                <li class="fs50">商家可能已过期</li>
                <li class="fs50">商品可能已失效</li>
                <li class="fs50">链接已过期</li>
                <li class="fs50">服务器开小差了</li>
            </ul>
        </div>
        <div class="button-div fs46" @click="toHome">返回店铺首页</div>
        <div class="shop-footer-fixed">
            <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
        </div>
    </div>
</template>

<script>
import technicalSupport from "components/technicalSupport"; //技术支持
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId")
    };
  },
  components: {
    technicalSupport  
  },
  mounted() {
    this.commonFn.setTitle("提示");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
      toHome(){
          this.$parent.getPageId(this.busId,0,true);
      }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
.shop-wrapper {
  //   background: #fff;
  height: 100%;
  width: 100%;
  padding-top: 250/@dev-Width *1rem;
  .error_image {
    margin: 0 auto;
    height: 504/@dev-Width *1rem;
    width: 750/@dev-Width *1rem;
    img {
    }
  }
  .title_div {
    width: 750/@dev-Width *1rem;
    margin: 0 auto;
    margin-top: 150/@dev-Width *1rem;
    font-size: 90/@dev-Width *1rem;
    text-align: left;
    color: #999999;
    ul {
      margin-left: 120/@dev-Width *1rem;
      li {
        list-style: disc;
      }
    }
  }
  .button-div {
    border: 1px solid #da3931;
    color: #e4393c;
    width: 360/@dev-Width *1rem;
    height: 100/@dev-Width *1rem;
    line-height: 100/@dev-Width *1rem;
    text-align: center;
    margin: 0px auto;
    margin-top: 156/@dev-Width *1rem;
    .border-radius(5px);
  }
  .shop-footer-fixed{
      width: 100%;
  }
}
</style>

