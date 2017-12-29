
<template>
  <div class="shop-wrapper sale-wrapper">
    <div class="seller-top">
      <div class="seller-nav">
          <i class="iconfont icon-jiantou-copy1" @click="back"></i>我的二维码
      </div>
    </div>
    <div class="index-nav clearfix" >
      <div class="index-title">我的二维码</div>
      <div class="image-div" v-if="qrCodePath　!= null">
        <default-img :background="qrCodePath"
                          :isHeadPortrait="1"></default-img>
      </div>
      <div class="index-msg">将此链接或二维码图片发送给您的好友，并且好友
完成下单购买，您就可以获得商家设置的丰厚佣金哦</div>

    </div>
  </div>
</template>

<script>
import defaultImg from "components/defaultImg";
export default {
  data() {
    return {
      type: this.$route.params.type,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      qrCodePath: null,
      imgUrl: null
    };
  },
  components: {
    defaultImg
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle("我的二维码");
    this.$store.commit("show_footer", false); //隐藏底部导航栏

    this.loadDatas(); //初始化数据
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  //相关操作事件
  methods: {
    loadDatas(data) {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_two_code_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.qrCodePath = myData.qrCodePath;
          _this.getWxShare(myData);
        }
      });
    },
    //获取微信分享数据
    getWxShare(myData) {
       let title = myData.mallName || myData.userName;
      if(title.split("的商城").length == 1){
        title += "的商城";
      }
      let desc = myData.mallIntroducation;
      let _shareObj = {
        title: title,
        desc: desc,
        url: location.href,
        imgUrl: this.imgUrl + myData.mallHeadPath,
        isOpenAllMenu: true, //显示所有功能按钮接口
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "showAllNonBaseMenuItem"
        ]
      };
      this.$parent.getWxShare(_shareObj);
    },
    back() {
      window.history.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
@import "./css/sellercommon.less";

.sale-wrapper {
  .seller-top {
    height: 4vh;
  }
  .index-nav {
    margin-top: 6vh;
    background: #fff;
    height: 94vh;
    .index-title {
      .fs50;
      .shop-textc;
      padding-top: 110/@dev-Width *1rem;
    }
    .image-div {
      width: 440/@dev-Width *1rem;
      height: 440/@dev-Width *1rem;
      margin: 120/@dev-Width *1rem auto;
    }
    .index-msg {
      .fs36;
      color: #666666;
      width: 74vw;
      margin: 0 auto;
    }
  }
}
</style>

