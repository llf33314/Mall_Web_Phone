<template>
  <div class="wrapper" v-cloak>
    <div v-html="style"></div> <!--主题切换渲染style-->
    <router-view ref="main"/>
    <bubble-hint ref="bubble"></bubble-hint>
    <shop-dialog ref="dialog"></shop-dialog>
    <top ref="top" v-if="$store.state.showTop" :shopId="$store.state.shopId"></top>
    <loading ref="loading"></loading>
    <footer-nav ref="footer_nav" :busId="$store.state.busId"></footer-nav>

    <!-- <wx-share :shareData="shareObj"></wx-share> -->
    <!-- <iframe ref="footer_nav" src="https://deeptel.com.cn/mallPage/82/79B4DE7C/pageIndex.do" class="material"></iframe> -->
  </div>
</template>

<script>
import bubbleHint from "components/bubble_hint.vue"; //气泡
import loading from "components/loading.vue"; //loading
import shopDialog from "components/shopDialog.vue"; //弹窗
import Top from "components/Top"; //置顶
import footerNav from "components/footerNav"; //置顶
import ajax from "@/lib/ajax.js";
// import wxShare from "components/wxShare"; //微信分享

export default {
  components: {
    bubbleHint,
    loading,
    shopDialog,
    Top,
    footerNav,
    // wxShare
  },
  computed: {
    listenshowpage1() {
      return this.$store.state.busId;
    }
  },
  watch: {
    $route() {
      this.$store.commit("mutationData", {
        loginDTO_URL: window.location.href
      });
      this.loadData();
      document.body.scrollTop = 0;
    },
    listenshowpage1(a, b) {
      if (a != b) {
        this.getShopStyle(a);
      }
    }
  },
  data() {
    return {
      style: "",
      Messenger: "",
      shareObj: null //分享内容
    };
  },
  created() {
    this.browser_type();
    this.commonFn.setFontSize();
  },
  mounted() {
    this.$store.commit("mutationData", { firstUrl: location.href });
    // console.log("url---app---",this.$store.state.firstUrl);
 },
  methods: {
    /** 
     * 判断浏览器类型
    */
    browser_type() {
      let browser = this.commonFn.checkPlatform();
      browser === "Messenger" ? (this.Messenger = 1) : (this.Messenger = 99);
      this.$store.commit("mutationData", { browerType: this.Messenger });
    },
    //获取页面样式
    getShopStyle(busId) {
      busId = busId || sessionStorage.getItem("busId");
      if (busId == 0) {
        return;
      }
      let _this = this;
      _this.ajaxRequest({
        url: h5App.activeAPI.getShopStyle_post,
        data: {
          busId: busId
        },
        status:false,
        success: function(data) {
          let myData = data.data;
          if (myData != null && myData.length > 0) {
            _this.style = "<style>";
            _this.style +=  ".style-main-bg{ background: " +  myData[0] + "!important;color: #fff!important;}";
            _this.style += ".style-main-font{color:" + myData[0] + "!important;}";
            _this.style += ".style-witch:checked{border-color:" + myData[0] + "!important;background-color:" +  myData[0] + "!important;}";
            _this.style += ".style-main-border{color:" +  myData[0] + "!important;border:1px solid " + myData[0] + "!important;}";
            if (myData.length > 1) {
              let color = "#fff";
              if( myData[1] == "#ffe6e9" || myData[1] == "#f8f0db" || myData[1] == "#c4eff6"){
                color = myData[0];
              }
              _this.style += ".style-middle-bg{ background: " +  myData[1] + "!important;color: "+color+"!important;}";
              _this.style += ".style-middle-font{color: " + myData[1] + "!important;}";
            }
            if (myData.length > 2) {
              _this.style += ".style-right-bg{ background: " + myData[2] + "!important;color: #000!important;}";
              _this.style += ".style-right-font{color: " + myData[2] + "!important;}";
            }
            _this.style += "</style>";
          }
        }
      });
    },
    //获取店铺id
    getShopId(busId) {
      if (busId == 0) {
        return null;
      }
      let _this = this;
      _this.ajaxRequest({
        url: h5App.activeAPI.get_shop_id_post,
        data: {
          busId: busId
        },
        status:false,
        success: function(data) {
          let shopId = data.data;
          if (shopId != null && shopId != "" && typeof shopId != "undefined") {
            sessionStorage.setItem("shopId", shopId);
            _this.$store.commit("mutationData", { shopId: shopId });

            _this.getPageId(busId, shopId);
          }
          return shopId;
        }
      });
      // return shopId;
    },
    //获取首页id
    getPageId(busId, shopId, isReturn) {
      let _this = this;
      busId =
        busId || this.$route.params.busId || sessionStorage.getItem("busId");
      shopId =
        shopId || this.$route.params.shopId || sessionStorage.getItem("shopId");
      if (busId == 0) {
        return;
      }
      let saleMemberId = this.getSaleMemberId();
      if (this.commonFn.isNotNull(saleMemberId) && saleMemberId > 0) {
        this.$router.push("/seller/mallindex/" + busId + "/" + saleMemberId);
        return;
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.get_home_page_id_post,
        data: {
          busId: busId,
          shopId: shopId
        },
        status:false,
        success: function(data) {
          let datas = data.data;
          let pageId = data.data.pageId;
          if (pageId != null && pageId != "" && typeof pageId != "undefined") {
            sessionStorage.setItem("pageId", pageId);
            sessionStorage.setItem("shopId", shopId);
            _this.$store.commit("mutationData", { pageId: pageId });
            if (isReturn) {
              if("#/index/" + pageId == location.hash){
                location.reload();
                return;
              }
              //跳转首页
              _this.$router.push("/index/" + pageId);
            }
            return;
          }
        }
      });
      //return pageId;
    },
    //跳转会员中心地址
    getMemberCenter(busId, type) {
      let _this = this;
      let _commonFn = this.commonFn.isNotNull;
      busId =
        busId || this.$route.params.busId || sessionStorage.getItem("busId");
      if (busId == 0) {
        return 0;
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.get_member_post,
        data: {
          busId: busId
        },
        status:false,
        success: function(data) {
          let myData = data.data;
          if (type == 1 && _commonFn(myData.memberCenterUrl)) {
            //跳转到会员中心
            location.href = myData.memberCenterUrl;
            return;
          } else if (type == 2 && _commonFn(myData.memberCouponUrl)) {
            //我的优惠券
            location.href = myData.memberCouponUrl;
            return;
          }
        }
      });
    },
    loadData() {
      let busId = this.$route.params.busId || sessionStorage.getItem("busId");
      let shopId =
        this.$route.params.shopId || sessionStorage.getItem("shopId");
      let pageId =
        this.$route.params.pageId || sessionStorage.getItem("pageId");
      if (busId != null && busId != "" && typeof busId != "undefined") {
        sessionStorage.setItem("busId", busId);
        this.$store.commit("mutationData", { busId: busId });
      }
      if (shopId != null && shopId != "" && typeof shopId != "undefined") {
        sessionStorage.setItem("shopId", shopId);
        this.$store.commit("mutationData", { shopId: shopId });
      } else if (busId > 0) {
        this.getShopId(busId);
      }
      if (pageId != null && pageId != "" && typeof pageId != "undefined") {
        sessionStorage.setItem("pageId", pageId);
        this.$store.commit("mutationData", { pageId: pageId });
      } else if (shopId > 0 && busId > 0) {
        this.getPageId(busId, shopId, false);
      }
    },
    getSaleMemberId() {
      let saleMemberId = this.$route.params.saleMemberId;
      let _isNotNull = this.commonFn.isNotNull;
      if (_isNotNull(saleMemberId)) {
        sessionStorage.setItem("saleMemberId", saleMemberId);
        return saleMemberId;
      }
      let desc = this.$route.params.desc;
      if (_isNotNull(desc) && desc != "-") {
        desc = desc.split("-");
        if (desc != null && desc.length > 0) {
          if (_isNotNull(desc[0])) {
            sessionStorage.setItem("saleMemberId", saleMemberId);
            return desc[0];
          }
        }
      }
      saleMemberId = sessionStorage.getItem("saleMemberId");
      if (_isNotNull(saleMemberId) && saleMemberId > 0) {
        return saleMemberId;
      }
      return 0;
    },
    setSaleMemberId(saleMemberId) {
      sessionStorage.setItem("saleMemberId", saleMemberId);
    },
    isLogin(busId) {
      let _this = this;
      busId =
        busId || this.$route.params.busId || sessionStorage.getItem("busId");
      _this.ajaxRequest({
        url: h5App.activeAPI.is_login_post,
        data: {
          busId: busId,
          url: location.href, //当前页面地址
          browerType: _this.$store.state.browerType //浏览器类型 1微信 99 其他浏览器
        },
        success: function(data) {}
      });
    } 
  }
};
</script>

<style lang="less">
[v-cloak] {
    display: none;
}
.wrapper {
  height: 100%;
  width: 100%;
  max-width: 8.30rem;
  margin: 0 auto;
}
</style>
