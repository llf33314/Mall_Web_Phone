
<template>
  <div class="shop-wrapper sale-wrapper">
   <div class="index-nav clearfix" v-if="imageUrl != null">
      <img :src="imageUrl" class="p-code">
      <div class="p-footer">
          好友通过扫描海报购买商品，您将获得佣金
      </div>
    </div>
    <div class="index-nav clearfix" v-else>
      <div class="p-scan">
          <img :src="qrCodePath" class="p-code" v-if="qrCodePath != null"><img :src="headImageUrl" class="p-headicon" v-if="headImageUrl != null">
      </div>
      <div class="p-footer">
          好友通过扫描海报购买商品，您将获得佣金
      </div>
    </div>
   

<!-- 
    <div class="index-msg">好友通过扫描海报二维码关注公众号，您将获得奖励积分</div> 
    <section class="sale-section section1"></section>
    <section class="sale-section section2"></section>
    <section class="sale-section section3">
      
    </section>
    <section class="sale-section section4"></section>
    <section  class="section5">
          好友通过扫描海报购买商品，您将获得佣金
    </section> -->
    <!-- <wx-share :shareData="shareObj"></wx-share> -->
  </div>
</template>

<script>
import defaultImg from "components/defaultImg";
// import wxShare from "components/wxShare"; //微信分享
export default {
  data() {
    return {
      type: this.$route.params.type,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      qrCodePath: null,
      imageUrl: null,
      headImageUrl: null,
      imgUrl: null,
      shareObj: null //分享内容
    };
  },
  components: {
    defaultImg
    // wxShare
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle("推广海报");
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
        url: h5App.activeAPI.seller_promotion_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.imageUrl = myData.imageUrl;
          _this.qrCodePath = myData.qrCodePath;
          _this.headImageUrl = myData.headImagePath;
          _this.getWxShare(myData);
        }
      });
    },
    //获取微信分享数据
    getWxShare(myData) {
      //  let title = myData.mallName || myData.userName;
      // if(title.split("的商城").length == 1){
      //   title += "的商城";
      // }
      // let desc = myData.mallIntroducation;
      // let _shareObj = {
      //   title: title,
      //   desc: desc,
      //   url: location.href,
      //   imgUrl: this.imgUrl + myData.mallHeadPath,
      //   isOpenAllMenu: true, //显示所有功能按钮接口
      //   jsApiList: [
      //     "onMenuShareTimeline",
      //     "onMenuShareAppMessage",
      //   ]
      // };
      // this.shareObj = _shareObj;
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

.sale-wrapper {
  // height: 100%;
  background: #fdecd2;
  .index-nav {
    position: relative;
    // height: 100%;
    width: 100%;
    background: url("../../../assets/img/seller/tg-code.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: top;
    background-color: #fdecd2;
  }
  .p-scan {
    // height: 93vh;
    height: 1862/@dev-Width *1rem;
    padding: 990/@dev-Width *1rem 350/@dev-Width *1rem 0 168/@dev-Width *1rem;
    img {
      width: 353/@dev-Width *1rem;
      height: 353/@dev-Width *1rem;
    }
    .p-headicon {
      width: 145/@dev-Width *1rem;
      height: 145/@dev-Width *1rem;
      vertical-align: top;
      margin-left: 43/@dev-Width *1rem;
    }
  }
  .p-footer {
    color: #333333;
    background: #fff;
    height: 155/@dev-Width *1rem;
    line-height: 155/@dev-Width *1rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    // padding: 60/@dev-Width *1rem 0;
    .shop-textc;
    .fs40;
  }
}
</style>

