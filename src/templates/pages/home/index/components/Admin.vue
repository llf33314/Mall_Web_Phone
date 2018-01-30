<template>
    <div class="admin home-page-admin-bb">
      <div class="app-preview">
        <div class="app-entry">
          <div  class="clearfix" v-for="(data,index) in dataJson" :key="index">

            <commodity class="module pr" v-if="data.type == 1" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <swiper class="module pr" v-if="data.type == 2" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <classify class="module pr" v-if="data.type == 3" :data="data"/>

            <div class="module pr" v-if="data.type == 4" :style="{'height': conversion(data.height)+'rem'}"></div>

            <search class="module pr" v-if="data.type == 5" :data="data"/>

            <reservation class="module pr" v-if="data.type == 6" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <shop-header class="module pr" v-if="data.type == 7" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <shop-title class="module pr" v-if="data.type == 8" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <text-nav class="module pr" v-if="data.type == 9" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <pic-nav class="module pr" v-if="data.type == 10" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <window class="module pr" v-if="data.type == 11" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <go-shop class="module pr" v-if="data.type == 12" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <notice class="module pr" v-if="data.type == 13" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <guide class="module pr" v-if="data.type == 14" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <!--<Coupon class="module pr" v-if="data.type == 15" :data="data" :_page="index" :pic-json="picJson[index]"/>-->

            <grouping class="module pr" v-if="data.type == 16" :data="data" :_page="index" :pic-json="picJson[index]" @getProductSpec="dialogSpec"/>

            <rich-text class="module pr" v-if="data.type == 18" :data="data"/>

          </div>
        </div>
      </div>
      <!-- 微信分享 -->
      <wx-share :shareData="shareObj" ></wx-share>

      <spec-dialog v-if="isShowSpec" :isShow.sync="isShowSpec" :specData="specData"></spec-dialog>
      

      <div class="pfj">
        <div style="height:51px;"></div>
        <div class="pfj-title">批发商</div>
        <div style="height:33px;"></div>
        <div class="pfj-main">1、申请成为批发商.
          1、申请成为批发商.</div>
        <div><i class="pfj-close" onclick="pfclose()"></i></div>
      </div>
    </div>
</template>

<script>
// //

import Classify from "./Classify";
import Commodity from "./Commodity";
import CommodityList from "./CommodityList";
import Coupon from "./Coupon";
import GoShop from "./GoShop";
import Grouping from "./Grouping";
import Guide from "./Guide";
import ShopHeader from "./Header";
import Notice from "./Notice";
import PicNav from "./PicNav";
import Reservation from "./Reservation";
import RichText from "./RichText";
import Search from "./Search";
import Swiper from "./Swiper";
import TextNav from "./TextNav";
import ShopTitle from "./Title";
import Window from "./Window";

import specDialog from "components/specDialog"; //规格弹出框

export default {
  name: "Admin",
  data() {
    return {
      dataJson: "",
      picJson: "",
      shareObj: null, //分享内容
      isShowSpec: false, //是否显示弹出框
      specData: null,
      pageData: null //页面数据
    };
  },
  components: {
    Classify,
    Commodity,
    CommodityList,
    Coupon,
    GoShop,
    Grouping,
    Guide,
    ShopHeader,
    Notice,
    PicNav,
    Reservation,
    RichText,
    Search,
    Swiper,
    TextNav,
    ShopTitle,
    Window,
    specDialog
  },
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  //在挂载开始之前被调用
  beforeMount() {
    this.$store.commit("show_footer", false);
    this.getPageId(); //获取首页数据
  },
  //已成功挂载，相当ready()
  mounted() {
    // console.log("url---index---", location.href);
  },
  //相关操作事件
  methods: {
    conversion(num) {
      return num / (320 / (1242 / 150));
    },
    //获取首页数据
    getPageId() {
      var self = this;
      this.ajaxRequest({
        url: h5App.activeAPI.page_index_get,
        data: {
          pageId: this.$route.params.pageId,
          url: location.href,
          ucLogin: 1 //1不需要登陆
        },
        type: "get",
        success: function(res) {
          let mydata = res.data;
          self.dataJson = JSON.parse(mydata.dataJson);
          self.picJson = JSON.parse(mydata.picJson);
          sessionStorage.setItem("busId", mydata.busId);
          sessionStorage.setItem("shopId", mydata.shopId);
          self.$store.commit("mutationData", {
            busId: mydata.busId,
            shopId: mydata.shopId
          });
          self.pageData = mydata;
          self.getWxShare(mydata);
          self.commonFn.setTitle(mydata.shareTitle);
        }
      });
    },
    //获取微信分享数据
    getWxShare(mydata) {
      let _shareObj = {
        title: mydata.shareTitle,
        desc: mydata.shareTitle,
        url: location.href,
        imgUrl: mydata.sharePicture,
        isOpenAllMenu: true, //显示所有功能按钮接口
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
      };
      this.shareObj = _shareObj;
      // this.$parent.$parent.reloadUrl();
      // this.$parent.$parent.shareObj = _shareObj;
    },
    //获取弹出框规格信息
    dialogSpec(data) {
      this.specData = data;
      this.isShowSpec = true;
      console.log(this.specData, "this.specData2122");
    },
    shoppingall() {}
  }
};
</script>

<style lang="less" scoped>
@import "../css/index.css";
</style>
