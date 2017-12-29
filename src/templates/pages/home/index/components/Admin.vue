<template>
    <div class="admin shop-home-index">
      <div class="app-preview">
        <div class="app-entry">
          <div  class="clearfix" v-for="(data,index) in dataJson" :key="index">
            <commodity class="module pr" v-if="data.type == 1" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <shop-swiper class="module pr" v-if="data.type == 2" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <classify class="module pr" v-if="data.type == 3" :data="data"/>

            <div class="module pr" v-if="data.type == 4" :style="{'height': conversion(data.height)+'rem'}"></div>

            <search class="module pr" v-if="data.type == 5" :data="data"/>

            <reservation class="module pr" v-if="data.type == 6" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <shop-header class="module pr" v-if="data.type == 7" :data="data"/>

            <!--<Title class="module pr" v-if="data.type == 8"/>-->

            <!--<TextNav class="module pr" v-if="data.type == 9"/>-->

            <!--<PicNav class="module pr" v-if="data.type == 10"/>-->

            <!--<Window class="module pr" v-if="data.type == 11"/>-->

            <!--<GoShop class="module pr" v-if="data.type == 12"/>-->

            <!--<Notice class="module pr" v-if="data.type == 13"/>-->

            <!--<Guide class="module pr" v-if="data.type == 14"/>-->

            <!--<Coupon class="module pr" v-if="data.type == 15"/>-->

            <!--<Grouping class="module pr" v-if="data.type == 16"/>-->

            <commodity-list class="module pr" v-if="data.type == 17" :data="data" :_page="index" :pic-json="picJson[index]"/>

            <!--<RichText class="module pr" v-if="data.type == 18"/>-->

          </div>
        </div>
      </div>
    </div>
</template>

<script>
// // import Lib from '@/assets/js/Lib';

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
import ShopSwiper from "./Swiper";
import TextNav from "./TextNav";
import ShopTitle from "./Title";
import Window from "./Window";

export default {
  name: "Admin",
  data() {
    return {
      dataJson: "",
      picJson: ""
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
    ShopSwiper,
    TextNav,
    ShopTitle,
    Window
  },
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  //在挂载开始之前被调用
  beforeMount() {
    this.$store.commit("show_footer", false);
    this.getPageId(); //获取首页数据
  },
  //已成功挂载，相当ready()
  mounted() {},
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
          url: location.href
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
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "showAllNonBaseMenuItem"
        ]
      };
      this.$parent.$parent.getWxShare(_shareObj);
    }
  }
};
</script>

<style lang="less">
@charset "utf-8";
.shop-home-index {
  //替换里面的样式
  .app-preview .app-header {
    height: 1.81125rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAAiCAMAAACTI/xQAAAAQlBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz4TCVIAAAAFXRSTlMA8vCt9s8nbCkJ1rSrcyMcBsfEKgfLFioNAAAAn0lEQVRIx+3w0qrdiaxa0urn1vqt3zb//9ungbnjmqiqjyln0zcljojwslabwc1melmsf7sced/zE91AhuUXCzKoJi4gw9QEQnHGxA8uKjbHLbW0GYSkuT49KT6SMRQ9DMMwDAc4jbgk2Js0cgfUU7ug+EGlfUFxJ9VsaC6Wt6Nu+su3QkGF3A3/lAjyF3VVH3Ny/eN20GwEY4KTXFp5d1sXMVOoch+2aaaaaelftksuqmcc)
      no-repeat 50%;
  }
  .app-preview .app-entry {
    width: 8.28rem;
    margin: 0 auto;
    padding-bottom: 0.284625rem;
    min-height: 5.175rem;
  }
  .app-preview .app-title h1 {
    padding: 0.46575rem 1.5525rem 0;
    height: 1.19025rem;
    line-height: 1.19025rem;
    font-size: 0.414rem;
    color: #fff;
    font-weight: 700;
    text-align: center;
    background: url(data:image/png;base64,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)
      no-repeat;
  }
  .app-preview .app-title h1 span {
    display: inline-block;
    height: 1.19025rem;
    width: 5.175rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .app-preview .app-add-field {
    position: relative;
    left: -0.025875rem;
    top: -0.025875rem;
    border: 0.025875rem solid #ddd;
    padding: 0 0.36225rem 0.1035rem;
    background: #f8f8f8;
    width: 9.05625rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .app-preview .js-add-region h4 {
    text-align: center;
    font-size: 0.36225rem;
    line-height: 1.035rem;
    font-weight: 700;
    color: inherit;
    text-rendering: optimizelegibility;
  }
  .app-preview .js-add-region ul {
    color: #333;
    font-size: 0.3105rem;
    margin-left: -0.129375rem;
    zoom: 1;
  }
  .app-preview .js-add-region ul:after {
    content: "";
    display: table;
    clear: both;
  }
  .app-preview .js-add-region li {
    float: left;
    display: table;
    margin: 0 0 0.25875rem 0.129375rem;
    background: #fff;
  }
  .app-preview .js-add-region li a {
    display: table-cell;
    width: 1.5525rem;
    height: 1.035rem;
    box-sizing: border-box;
    border: 0.025875rem solid #d1d1d1;
    line-height: 0.36225rem;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    color: #07d;
    text-decoration: none;
  }
  .app-sidebar {
    position: relative;
    float: left;
    width: 12.42rem;
    margin-left: 0.5175rem;
    padding-bottom: 0.5175rem;
    font-size: 0.36225rem;
  }
  .app-sidebar .arrow,
  .app-sidebar .arrow:after {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.207rem 0.25875rem 0.207rem 0;
    border-color: transparent #d1d1d1 transparent transparent;
    position: absolute;
    left: -0.25875rem;
    top: 0.491625rem;
  }
  .app-sidebar .arrow:after {
    content: "";
    border-right-color: #f8f8f8;
    left: 0.025875rem;
    top: -0.207rem;
  }
  .app-sidebar .app-sidebar-inner {
    padding: 0.3105rem 0.25875rem;
    min-height: 0.7245rem;
    background: #f8f8f8;
    border-radius: 0.129375rem;
    border: 0.025875rem solid #d1d1d1;
  }
  .shade {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #fff;
    opacity: 0.8;
  }
  .app-entry .action {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 0 0.129375rem;
    margin-left: 0.025875rem;
    font-size: 0.3105rem;
    cursor: pointer;
  }
  .app-preview .module:hover .actions {
    display: block;
  }
  .fade {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 99998;
    -moz-opacity: 0.4;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  .shop-btn {
    display: inline-block;
    width: 3.027375rem;
    height: 0.750375rem;
    line-height: 0.750375rem;
    text-align: center;
    font-size: 0.284625rem;
    color: #fff;
    border-radius: 0.077625rem;
    -webkit-border-radius: 0.077625rem;
  }
  .add-shop {
    background-color: #ff8522;
  }
  .now-shop {
    background-color: #f23030;
  }
  .attr-lay {
    z-index: 99999;
    position: fixed;
    bottom: 0;
    width: 8.28rem;
    padding-bottom: 0.142313rem;
    background-color: #fff;
  }
  .attr-lay .delete {
    display: inline-block;
    width: 0.25875rem;
    height: 0.25875rem;
    position: absolute;
    right: 0.09315rem;
    top: 0.09315rem;
  }
  .lay-header {
    background-color: #fff;
    height: 1.52145rem;
    position: relative;
    border-bottom: 0.025875rem solid #cbc9c9;
  }
  .lay-header .img-box {
    width: 1.9665rem;
    height: 1.9665rem;
    border: 0.025875rem solid #edeef1;
    border-radius: 0.077625rem;
    background-color: #fff;
    position: absolute;
    left: 0.25875rem;
    top: -0.58995rem;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    display: box;
    box-orient: horizontal;
    box-pack: center;
    box-align: center;
  }
  .img-box img {
    max-width: 100%;
    max-height: 100%;
  }
  .lay-header .header-box {
    position: relative;
    left: 2.561625rem;
    top: 0.621rem;
    width: 5.252625rem;
    font-size: 0.284625rem;
    color: #828282;
  }
  .lay-header .sum {
    color: #f20000;
    font-size: 0.3105rem;
    line-height: 1.6;
  }
  .lay-header .inv-num {
    font-size: 0.232875rem;
  }
  .lay-content {
    padding: 0 0.181125rem;
    background-color: #fff;
    font-size: 0.284625rem;
    color: #828282;
  }
  .lay-content .content-box .title {
    line-height: 1.8;
  }
  .lay-content .inv-list {
    overflow: hidden;
  }
  .lay-content .inv-list .inv-item {
    float: left;
    width: 1.423125rem;
    height: 0.5175rem;
    line-height: 0.5175rem;
    border: 0.025875rem solid #cbcccc;
    margin-right: 0.25875rem;
    margin-bottom: 0.142313rem;
    text-align: center;
    border-radius: 0.077625rem;
  }
  .lay-content .inv-list .inv-item-active {
    border-color: #f23030;
    color: #f23030;
  }
  .lay-bottom {
    text-align: center;
    background-color: #fff;
    padding-top: 0.284625rem;
  }
  em {
    font-style: normal;
  }
  .gw_num {
    border: 0.025875rem solid #828282;
    height: 0.543375rem;
    line-height: 0.543375rem;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0.142313rem;
  }
  .gw_num em {
    width: 0.608062rem;
    color: #7a7979;
    cursor: pointer;
    font-size: 0.3312rem;
    background-color: #cbc9c9;
  }
  .gw_num .num,
  .gw_num em {
    display: block;
    height: 100%;
    float: left;
    text-align: center;
  }
  .gw_num .num {
    width: 0.67275rem;
    font-style: normal;
    font-size: 0.245812rem;
    border: 0;
  }
  .gw_num em.add {
    float: right;
    border-right: 0;
  }
  body,
  html {
    overflow-x: hidden;
    background: #fff;
  }
  .tpl-shop-header {
    position: relative;
    height: 2.5875rem;
    background-repeat: no-repeat;
    background-position-x: center;
    background-size: cover;
  }
  .tpl-shop-title {
    position: absolute;
    bottom: 0.25875rem;
    left: 2.5875rem;
    font-size: 0.414rem;
    color: #fff;
    text-shadow: 0 0.025875rem 0.05175rem rgba(0, 0, 0, 0.5);
  }
  .tpl-shop-avatar {
    position: absolute;
    left: 0.25875rem;
    bottom: -1.035rem;
    width: 2.07rem;
    height: 2.07rem;
  }
  .tpl-shop-avatar img {
    width: 2.07rem;
    height: 2.07rem;
    background-color: #e4e4e4;
    border-radius: 0.077625rem;
    box-shadow: 0 0 0.025875rem 0.025875rem rgba(0, 0, 0, 0.2);
  }
  .tpl-shop-content {
    padding: 0.181125rem 0;
    border: 0.025875rem solid #e4e4e4;
    background: #fff;
  }
  .tpl-shop-content ul {
    margin: 0 0 0 2.22525rem;
    padding: 0;
  }
  .tpl-shop-content li {
    float: left;
    width: 33%;
    list-style: none;
    border-right: 0.025875rem solid #e4e4e4;
    box-sizing: border-box;
    margin-top: 0.25875rem;
    margin-bottom: 0.15525rem;
  }
  .tpl-shop-content li:last-child {
    border-right: 0 none;
  }
  .clearfix:after {
    display: table;
    clear: both;
  }
  .tpl-shop-content li a {
    display: block;
    margin-top: -0.25875rem;
    margin-bottom: -0.15525rem;
  }
  .tpl-shop-content span {
    display: block;
    font-size: 0.3105rem;
    text-align: center;
    color: #999;
  }
  .tpl-shop-content .count {
    height: 0.543375rem;
    line-height: 0.543375rem;
    font-size: 0.46575rem;
    color: #333;
    overflow: hidden;
  }
  .tpl-shop-content .user {
    height: 0.46575rem;
    line-height: 0.46575rem;
    margin-bottom: 0.077625rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAQlBMVEUAAABmZmZmZmZlZWVmZmZlZWVmZmZlZWVlZWVlZWVjY2NYWFhlZWVmZmZmZmZkZGRmZmZjY2NlZWVmZmZdXV1mZmZyqh8jAAAAFXRSTlMA9eupdFv53rpmOA3j2KB/S0gmIxYpzRrtAAAAVUlEQVQY073ONw6AMBBE0XVOZJj7XxXbQsCInt/t0xYj/7SltLM4D6hMpFEzRGhFovD9mhpZolxFHUIZYGZZRyAuz11sQG+w5ZqpcaddJ4VXvhMokRNY5wa4LKaYBwAAAABJRU5ErkJggg==)
      50% no-repeat;
    background-size: contain;
  }
  #shop-nav {
    width: 8.28rem;
    height: 1.035rem;
    line-height: 1.035rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -4.14rem;
    -webkit-transform: translateZ(0);
    text-align: center;
    color: #333;
    font-size: 0.3105rem;
    border: 0.025875rem solid #ddd;
    box-sizing: border-box;
    z-index: 5000;
  }
  #shop-nav .nav-item {
    width: 28%;
    height: 100%;
    float: left;
    display: block;
    box-sizing: border-box;
    border-left: 0.025875rem solid #ddd;
  }
  #shop-nav .nav-item a {
    color: #333;
  }
  #shop-nav .nav-item img {
    width: 0.5175rem;
  }
  #shop-nav .nav-item img:after {
    width: 0;
    display: inline-block;
    vertical-align: middle;
  }
  .control-group {
    margin-bottom: 0.25875rem;
  }
  .control-label {
    width: 2.251125rem;
    cursor: default;
    display: block;
    float: left;
    font-size: 0.36225rem;
    line-height: 0.46575rem;
    text-align: right;
    padding-top: 0.129375rem;
  }
  .controls {
    margin-left: 2.406375rem;
    word-break: break-all;
  }
  .clearfix:after,
  .clearfix:before,
  .control-group:after,
  .control-group:before {
    display: table;
    line-height: 0;
    content: "";
  }
  .icon-add {
    display: inline-block;
    width: 0.36225rem;
    height: 0.36225rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAAJ1BMVEUAAABEuwBEuwBEuwBEuwBEuwBEuwBEuwBEuwBEuwBEuwBEuwD///+U89UVAAAAC3RSTlMA8YQUU/nQ89LTVNhGsE4AAABPSURBVAjXY2Bg1ghNMmBgYHDcvXu3CAMDy24QcGAw3L37zO7dwgzaYHoTQzaY3sEQvefMmTOnt0Lp7VDxbTB1MH1wcxgWQsxlYNYMB9oDAFRaNDh1GDzkAAAAAElFTkSuQmCC)
      no-repeat 0;
  }
  .controls > .radio:first-child {
    padding-top: 0.129375rem;
  }
  .checkbox.inline,
  .radio.inline {
    display: inline-block;
    padding-top: 0.129375rem;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .checkbox,
  .radio {
    padding-left: 0.414rem;
    cursor: pointer;
  }
  .checkbox input[type="checkbox"],
  .radio input[type="radio"] {
    float: left;
    margin-left: -0.5175rem;
    margin-left: -0.414rem;
    margin-top: 0.1035rem;
  }
  .checkbox.inline + .checkbox.inline,
  .radio.inline + .radio.inline {
    margin-left: 0.25875rem;
  }
  .controls-card {
    padding: 0.5175rem;
    margin-right: 0.5175rem;
    border: 0.025875rem solid #e5e5e5;
    background: #fff;
  }
  .controls-card .controls-card-tab {
    padding-bottom: 0.25875rem;
    margin-bottom: 0.25875rem;
    border-bottom: 0.025875rem solid #e5e5e5;
  }
  .controls-card .controls-card-item {
    margin-bottom: 0.25875rem;
  }
  .app-preview .photo-block {
    min-height: 2.5875rem;
    margin: 0.1035rem;
    text-align: center;
    overflow: hidden;
    position: relative;
    background-color: #f8f8f8;
    background-size: 0.15525rem 0.15525rem;
  }
  .goods-card ul li {
    display: inline-block;
    margin: 0.1035rem 0;
    position: relative;
    vertical-align: top;
  }
  .goods-card01 ul li:nth-child(3n-2) {
    width: 100%;
  }
  .goods-card01 ul li:nth-child(3n-2) .photo-block {
    height: 7.5555rem;
  }
  .goods-card01 ul li:nth-child(3n),
  .goods-card01 ul li:nth-child(3n-1) {
    width: 50%;
    box-sizing: border-box;
  }
  .goods-card01 ul li:nth-child(3n-1) a.simpleness {
    margin-left: 0;
  }
  .goods-card01 ul li:nth-child(3n) a.simpleness {
    margin-right: 0;
  }
  .goods-card01 ul li:nth-child(3n) .simpleness-price,
  .goods-card01 ul li:nth-child(3n-1) .simpleness-price {
    left: auto;
  }
  .goods-card01 ul li:nth-child(3n-2) .goods-title {
    font-size: 0.36225rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 85%;
    line-height: 1.3;
    overflow: hidden;
    color: #333;
    margin-bottom: 0.129375rem;
  }
  .goods-card01 ul li:nth-child(3n) .goods-title,
  .goods-card01 ul li:nth-child(3n-1) .goods-title {
    height: 0.828rem;
    margin-bottom: 0.129375rem;
    line-height: 1.3;
    font-size: 0.336375rem;
    overflow: hidden;
    color: #333;
    padding-top: 0.077625rem;
  }
  .goods-card02 ul li {
    width: 100%;
  }
  .goods-card02 ul li .goods-title {
    font-size: 0.36225rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 85%;
    line-height: 1.3;
    overflow: hidden;
    color: #333;
    margin-bottom: 0.129375rem;
  }
  .goods-card02 ul li .goods-sub-title {
    width: 100%;
    margin-bottom: 0.15525rem;
    word-break: break-all;
    line-height: 0.414rem;
    padding-top: 0;
    color: #666;
    white-space: normal;
    font-size: 0.3105rem;
  }
  .goods-card03 ul li {
    width: 50%;
    box-sizing: border-box;
  }
  .goods-card03 ul li .goods-title {
    height: 0.828rem;
    margin-bottom: 0.129375rem;
    line-height: 1.3;
    font-size: 0.336375rem;
    overflow: hidden;
    color: #333;
    padding-top: 0.077625rem;
  }
  .goods-card04 ul li {
    width: 100%;
  }
  .goods-card04 .photo-block {
    width: 3.234375rem;
    float: left;
    margin-right: 0.336375rem;
  }
  .goods-card04 ul li .goods-title {
    font-size: 0.36225rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 85%;
    line-height: 1.3;
    color: #333;
    margin-bottom: 0.129375rem;
  }
  .goods-card04 .good-buy {
    margin-right: 0.129375rem;
  }
  .app-preview .link {
    min-height: 2.5875rem;
    display: block;
    margin: 0 0.1035rem;
    border: 0.025875rem solid #e5e5e5;
    background: #fff;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  }
  .app-preview .link.simpleness {
    border: 0;
  }
  .app-preview .goods-card01 ul li:nth-child(3n-2) .link.simpleness,
  .app-preview .link.simpleness .photo-block {
    margin: 0;
  }
  .app-preview .link.simpleness .goods-price {
    color: #fff;
    margin: 0;
    float: right;
    max-width: 1.81125rem;
    overflow: hidden;
    line-height: 0.56925rem;
    height: 0.56925rem;
    padding: 0 0.129375rem;
  }
  .app-preview .link.simpleness .simpleness-price {
    position: absolute;
    height: 0.56925rem;
    bottom: 0;
    right: 0.25875rem;
    margin: 0.25875rem 0;
    padding-left: 0;
    white-space: nowrap;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.4);
    background-clip: border-box;
    border-radius: 0.05175rem;
  }
  .app-preview
    .goods-card01
    ul
    li:nth-child(3n-2)
    .link.simpleness
    .simpleness-price {
    margin: 0.129375rem 0;
  }
  .app-preview img {
    max-width: 100%;
  }
  .app-preview .goods-card03 .photo-block {
    height: 3.700125rem;
  }
  .app-preview .goods-card03 .photo-block img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    vertical-align: bottom;
  }
  .app-preview .info-price {
    padding-right: 0.207rem;
    padding-left: 0.25875rem;
    margin-top: 0.181125rem;
    position: relative;
  }
  .app-preview .goods-price {
    font-size: 0.388125rem;
    display: inline-block;
    margin: 0.05175rem 0.25875rem 0.25875rem 0;
    font-weight: 700;
    padding: 0;
    color: #f60;
  }
  .sc-goods-list {
    font-size: 0;
    padding: 0.129375rem;
    list-style: none;
    margin: 0;
  }
  .app-preview .actions .actions-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .app-preview .actions {
    position: absolute;
    left: 0;
    bottom: 0;
    display: none;
    height: 100%;
    width: 8.28rem;
    border: 0.05175rem dashed rgba(255, 0, 0, 0.5);
    box-sizing: border-box;
    z-index: 9999;
  }
  .app-preview .good-buy {
    position: absolute;
  }
  .app-preview .good-buy.btn1,
  .app-preview .good-buy.btn2,
  .app-preview .good-buy.btn3,
  .app-preview .good-buy.btn4 {
    background-image: url(data:image/png;base64,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);
    background-repeat: no-repeat;
    background-size: 5.770125rem;
  }
  .app-preview .good-buy.btn1 {
    right: 0.25875rem;
    bottom: 0.25875rem;
    height: 0.646875rem;
    width: 0.77625rem;
    background-position: -2.872125rem -0.077625rem;
  }
  .app-preview .good-buy.btn2 {
    right: 0.25875rem;
    bottom: 0.207rem;
    height: 0.5175rem;
    width: 0.5175rem;
    background-position: -0.98325rem -0.181125rem;
  }
  .app-preview .good-buy.btn3 {
    bottom: 0.25875rem;
    right: 0.025875rem;
    height: 0.646875rem;
    width: 1.035rem;
    background-position: -3.907125rem -0.15525rem;
  }
  .app-preview .good-buy.btn4 {
    right: 0.25875rem;
    bottom: 0.25875rem;
    height: 0.5175rem;
    width: 1.060875rem;
    background-position: -1.733625rem -0.181125rem;
  }
  .controls-card-tab label {
    margin-right: 0.5175rem;
  }
  .simpleness-title {
    display: none;
  }
  .left-10 {
    left: 0.25875rem;
  }
  .app-preview .goods-card01 ul li:nth-child(3n-2) .simpleness-title,
  .app-preview .goods-card02 ul li .simpleness-title {
    float: left;
    margin: 0;
    padding-left: 0.25875rem;
    max-width: 70%;
    line-height: 0.56925rem;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.3105rem;
    display: block;
    overflow: hidden;
  }
  .simpleness-big {
    position: relative;
    height: auto;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0.129375rem 0;
  }
  .simpleness-big,
  .simpleness-big-title {
    padding-left: 0;
    white-space: nowrap;
    overflow: hidden;
  }
  .simpleness-big-title {
    color: #333;
    min-width: 0.25875rem;
    min-height: 0.56925rem;
    float: left;
    max-width: 70%;
    text-overflow: ellipsis;
  }
  .simpleness-big-price,
  .simpleness-big-title {
    font-size: 0.36225rem;
    font-weight: 700;
    margin: 0;
    line-height: 0.56925rem;
  }
  .simpleness-big-price {
    position: absolute;
    right: 0;
    top: 0;
    color: #f60;
    float: right;
    max-width: 1.81125rem;
    overflow: hidden;
    height: 0.56925rem;
    padding: 0 0.129375rem;
  }
  .simpleness-big-box {
    height: 0.56925rem;
  }
  .app-preview .goods-card02 .link.simpleness {
    margin: 0;
    background: none;
  }
  .app-preview .goods-card04 .simpleness {
    padding-bottom: 0.207rem;
    border-bottom: 0.025875rem solid #e5e5e5;
  }
  .app-preview .goods-card04 .simpleness .link {
    border: 0;
    background: none;
    margin: 0;
  }
  .app-preview .goods-card03 .goods-buy {
    right: 0;
    bottom: 0;
    width: 1.216125rem;
    height: 1.035rem;
    box-sizing: border-box;
    padding: 0.181125rem 0.25875rem;
    color: #fff;
    font-size: 0.336375rem;
    line-height: 0.336375rem;
    background: #ff495b;
    position: absolute;
  }
  .app-preview .rush .photo-block {
    margin: 0;
  }
  .app-preview .rush .sales {
    position: relative;
    height: 1.035rem;
    margin-top: 0;
  }
  .app-preview .rush .goods-price {
    color: #ff495b;
  }
  .swiper-wrapper {
    height: auto;
  }
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    height: auto;
    text-align: center;
    font-size: 0.46575rem;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .swiper-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
    padding: 0 0.388125rem;
    z-index: 10;
    background-color: rgba(51, 51, 51, 0.8);
    color: #fff;
    font-size: 0.36225rem;
    line-height: 2;
  }
  .swiper-pagination-bullet-active {
    background: rgba(0, 122, 255, 0.5);
  }
  .classify {
    min-height: 0.77625rem;
    font-size: 0.414rem;
  }
  .classify td {
    background-color: #fff !important;
    width: 25%;
  }
  .search input {
    width: 7.633125rem;
    height: 1.035rem;
    font-size: 0.344914rem;
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    border-radius: 0.129375rem;
    border: 0.025875rem solid #555;
    text-indent: 1em;
  }
  .find_icon {
    width: 0.36225rem;
    height: 0.414rem;
    display: inline-block;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAdVBMVEUAAACwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLB8p+1eaaaajnrstlma+RAI9evKGSImkh7x4qN8cWNdRzWtWFI7xZmEQj/SwItM27drLdwYUTAAAAHRSURBVEjHvVXZgoIwDGwplyD3qQLisf3/T9zBrRa6hbIvO08mzTSTNESygNUE18jm3HHjp0+M6CvESrgZ2wwvryKQOlT8irL1cDbSKfaRttYkrXw+XqzrmjDvhNPjxZvXkzjwOZ02PrzjLBbhknKekja6+yPO7VpzcDuCcfut30Xqkujw5UDpQfWOuB/xegZyDEzpJ5TmZA0NTpOlCw2qyDpi5F+0o4cj3cbyedxohrxnadncbs1hswvwoodnqogqgmnwmdkydqzzwvob5xcdieh8vujrzuao8nyyceeuychcxqbmy0bgilqfcwyxatgfnpzl6p9sgw/C18dyd3RpoSI2vwNmI5LW0/zSEBHPBZqKOCjfi2ua1gDzP29kBtvbemc6nz2ARdtfXIVJWmrOoXF9J2ZcSQA8cEdL9OgoCL66x6blo2f0NgdcdXhaihy5Tg8OtIyC6narV8G7wugceO0xnI9cMMmhIseg3ua7L/8p6UJGWFgkp5cddblgRGrlLD1yFTSAklow5Lpe/oNI2OefSxsq7EYz+cEgTu9xLRaFzEFTogHzy749sIXvXQcHYx+yd1HeXkYqGDXZiwTR8kPanYP6ZD+KQWmTGZ5F/gPfdV48HFwtT3wAAAAASUVORK5CYII=);
    position: absolute;
    top: 50%;
    margin-top: -0.181125rem;
    right: 0.207rem;
    background-size: cover;
  }
  .searchFindBtn {
    width: 0.7245rem;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0.25875rem;
    box-sizing: border-box;
    padding: 0.025875rem;
    overflow: hidden;
  }
  .flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .flex-v {
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .flex-align-center {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .flex-pack-center {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .flex-pack-justify {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .flex-1 {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .flex-1.nav label {
    color: #e4393c;
  }
  .flex-2 {
    -webkit-box-flex: 2;
    -ms-flex: 2;
    flex: 2;
  }
  .flex-3 {
    -webkit-box-flex: 3;
    -ms-flex: 3;
    flex: 3;
  }
  .flex-4 {
    -webkit-box-flex: 4;
    -ms-flex: 4;
    flex: 4;
  }
  .flex-5 {
    -webkit-box-flex: 5;
    -ms-flex: 5;
    flex: 5;
  }
  footer {
    height: 0.970313rem;
    border-top: 0.025875rem solid #b2b2b2;
    background-color: #f9f9f9;
  }
  footer ul {
    height: 100%;
  }
  footer li a {
    display: box;
    box-orient: vertical;
    box-pack: center;
    box-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    text-align: center;
    height: 100%;
  }
  footer img {
    display: block;
    width: 0.46575rem;
    height: 0.46575rem;
    overflow: hidden;
    margin: 0.1rem auto 0;
  }
  footer label {
    font-size: 0.232875rem;
    display: block;
    color: #7a7e83;
    line-height: 0.46575rem;
  }
  .goods-label {
    background-color: #ee343f;
    color: #fff;
    padding: 0.05175rem;
    border-radius: 0.1035rem;
    margin-right: 0.077625rem;
  }
  .original {
    font-size: 0.905625rem;
    color: #9a9a9a;
  }
  .original label {
    position: relative;
  }
  .original i {
    width: 100%;
    position: absolute;
    height: 0.05175rem;
    background-color: #999;
    top: 50%;
    margin-top: -0.05175rem;
  }
  .list-scale {
    width: 13.9725rem;
    position: relative;
    -webkit-transform: scale(0.23148148148148148);
    transform: scale(0.23148148148148148);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }
  .goods-card01 ul li:nth-child(3n-2) .list-scale {
    width: 30.5325rem;
  }
  .pfj {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: hsla(0, 0%, 100%, 0.9);
    z-index: 99999;
    display: none;
  }
  .pfj-title {
    font-size: 0.414rem;
    text-align: center;
    color: #000;
  }
  .pfj-main {
    width: 6.36525rem;
    margin: 0 auto;
    font-size: 0.336375rem;
    line-height: 0.595125rem;
    color: #626262;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .pfj-close {
    width: 0.543375rem;
    height: 0.5175rem;
    position: absolute;
    background: url(data:image/jpeg;base64,/9j/4aaqskzjrgabaqaaaqabaad/2wbdaaudbaqeawuebaqfbqugbwwibwchbw8lcwkmeq8seheperetfhwxexqafrergceygh0dhx8fexcijciejbwehx7/2wbdaqufbqcgbw4ica4efbeuhh4ehh4ehh4ehh4ehh4ehh4ehh4ehh4ehh4ehh4ehh4ehh4ehh4ehh4ehh4ehh4ehh7/wgARCAAUABUDAREAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAABgIDBQj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAADp00SJaGB2YQhC5//EACkQAAICAQMCAwkAAAAAAAAAAAECAwQFABExBkESITIiJTRCUlNhkbH/2gAIAQEAAT8Aura6VuTZOsstrBzyGS7XG7vTc8zR9yh5Ze3qXWa6hrUqdY0VXI273wFeBwTOdud+yDktwBrBYOWuJrmWsG7k7ZDWJFdljXbhI17Iv7PJ11FmkxMcUMMDXMjaJSnTQgPMw/ijlmPkBqjirfRc5zc0MF2tOvvEVoSDRG5beAfZB9Sc/NqtNBYrpYglWWKRQyOjbqynggjXSdGIz28zM8li9alkjaWTYlI0chY0+lRz+T5nW+qFcYPL36WOd4qcixzpW8jHC7F/H4Bt7IJG+3apgv/EABQRAQAAAAAAAAAAAAAAAAAAADD/2gAIAQIBAT8AH//EABQRAQAAAAAAAAAAAAAAAAAAADD/2gAIAQMBAT8AH//Z)
      no-repeat;
    background-size: cover;
    bottom: 0.98325rem;
    left: 50%;
    margin-left: -0.25875rem;
  }
  .commodity .h292 {
    height: 7.5555rem !important;
  }
  .commodity .h100 {
    height: 2.5875rem !important;
  }
  .commodity .h55 {
    height: 1.423125rem !important;
  }
  .commodity .w1180 {
    width: 30.5325rem !important;
  }
  .commodity .w540 {
    width: 13.9725rem !important;
  }
  .commodity .w240 {
    width: 6.21rem !important;
  }
  .commodity .w280 {
    width: 7.245rem !important;
  }
  .commodity .fz35 {
    font-size: 0.905625rem !important;
  }
  .commodity .fz12 {
    font-size: 0.3105rem !important;
  }
  .groupingModule {
    overflow: hidden;
  }
  .groupingModule .grouping-leftNav table {
    width: 100%;
    min-height: 8.357625rem;
  }
  .groupingModule .grouping-leftNav-l {
    position: relative;
    width: 2.1735rem;
    background-color: #f2f2f2;
    vertical-align: top;
  }
  .groupingModule .grouping-leftNav-l > div {
    border-bottom: 0.025875rem solid #e5e5e5;
    margin-top: -0.025875rem;
    position: relative;
  }
  .groupingModule .grouping-leftNav-l > div.index:before {
    content: "";
    position: absolute;
    width: 0.1035rem;
    height: 100%;
    background: #f44;
  }
  .groupingModule .grouping-leftNav-l > div a {
    display: block;
    width: 2.1735rem;
    padding: 0.5175rem 0.25875rem 0.5175rem 0.388125rem;
    font-size: 0.36225rem;
    line-height: 0.46575rem;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    word-wrap: break-word;
    color: #38f;
  }
  .groupingModule .grouping-leftNav-r {
    vertical-align: top;
  }
  .groupingModule .grouping-leftNav-commodity {
    border-bottom: 0.025875rem solid #e5e5e5;
    margin-left: 0.25875rem;
    position: relative;
    font-size: 0;
  }
  .groupingModule .grouping-leftNav-commodity > div {
    display: inline-block;
    vertical-align: top;
  }
  .groupingModule .grouping-leftNav-commodity-pic {
    position: relative;
    display: block;
    width: 1.5525rem;
    height: 1.5525rem;
    background-color: #7ecef4;
    margin: 0.25875rem 0.25875rem 0.25875rem 0;
  }
  .groupingModule .grouping-leftNav-r-title {
    display: block;
    margin: 0;
    padding: 0.25875rem 0;
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.36225rem;
  }
  .groupingModule .grouping-leftNav-r-price {
    color: #f44;
    font-size: 0.36225rem;
    padding: 0;
  }
  .groupingModule .grouping-leftNav-r-buy {
    display: block;
    position: absolute;
    right: 0.25875rem;
    bottom: 0.25875rem;
    width: 1.5525rem;
    height: 1.29375rem;
    -webkit-tap-highlight-color: transparent;
  }
  .groupingModule .grouping-leftNav-r-buy span {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0.56925rem;
    height: 0.56925rem;
    text-align: center;
    line-height: 0.621rem;
    font-size: 0.3105rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAALVBMVEUAAAD/RET/RET/R0f/RET/RET/RET/RUX/RET/RUX/RET/Rkb/S0v/RUX/RES8OoGHAAAADnRSTlMA8cFEOOfZraWZg20ikKe0sNoAAADMSURBVCjPYoABr6ZEMY0lDKiAeeo7MIg0QBZl0XsHBY8cEKI8de/g4PkBuLDhOyQgDBPlfocCNkCF76EKv4UrxqbcDl34MdgZcujCD0GOYX+HAQqAwn6Ywk+AwnAPMjDAvQoMjXeYwu8MGDixCU9gYMUmHMDghyyMsHMdNuFXDH3YhF8w6CELI1yYBxGCAzD3GYMcNuGHgLrpmwAAAIZhGH/WQqC3R1fslNMkI7NgzsnxeVUemxgSWiIOEMEnsAXNgBzsI0mUioDRNXIDN7lxzeexzbQAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-size: 0.56925rem;
  }
  .grouping-topNav table {
    width: 100%;
    table-layout: fixed;
  }
  .grouping-topNav td {
    line-height: 1.035rem;
    border: 0 none;
    outline: 0 none;
    background-color: #fff;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .grouping-topNav td.index {
    position: relative;
    top: 0.025875rem;
    line-height: 1.009125rem;
    color: #ed5050;
    border-bottom: 0.025875rem solid #ed5050;
  }
  .reservation .h1 {
    height: 0.15525rem;
  }
  .reservation .w1 {
    width: 0.336375rem;
  }
  .reservation {
    width: 8.28rem;
    min-height: 3.2085rem;
    padding: 0.1656rem 0.3105rem;
    box-sizing: border-box;
    border-bottom: 0.025875rem solid #f0f0f0;
    position: relative;
    font-size: 0;
  }
  .reservation .reservation_m {
    overflow: hidden;
  }
  .reservation .res-photo {
    width: 3.345638rem;
    height: 1.940625rem;
    background-size: cover;
    background-position: 50% 50%;
  }
  .reservation .res-m,
  .reservation .res-photo {
    float: left;
  }
  .reservation .res-m {
    width: 4.19175rem;
  }
  .reservation .res-photo {
    text-align: center;
  }
  .reservation .res-photo img {
    max-width: 3.36375rem;
    min-height: 1.9872rem;
  }
  .reservation .res-title {
    color: #333;
    font-size: 0.276862rem;
  }
  .reservation .res-m1 {
    color: #989898;
    font-size: 0.232875rem;
    height: 0.6624rem;
    overflow: hidden;
  }
  .reservation .res-m2 {
    color: #ff5252;
    font-size: 0.188887rem;
  }
  .reservation .res-money span.r-money {
    width: 1.953562rem;
    display: inline-block;
    color: #cf1747;
    font-size: 0.388125rem;
  }
  .reservation .res-btn {
    display: inline-block;
    vertical-align: top;
  }
  .reservation .res-money button {
    width: 2.07rem;
    height: 0.628763rem;
    background-color: #529422;
    color: #fff;
    font-size: 0.284625rem;
    border: 0;
    border-radius: 0.077625rem;
    box-shadow: 0.077625rem 0.077625rem 0.077625rem #555;
  }
  .reservation .res-money button img {
    margin-left: 0.077625rem;
    vertical-align: text-top;
  }
  .reservation .res-p {
    color: #c8c8c8;
    font-size: 0.232875rem;
    text-align: center;
  }
  .reservation .res-p span {
    color: #d85b75;
  }
  .reservation_b {
    height: 0.414rem;
    line-height: 0.414rem;
    position: absolute;
    font-size: 0.232875rem;
    color: #fff;
    text-align: center;
    bottom: 0.1656rem;
  }
  .reservation_b .icon_time {
    width: 2.095875rem;
    background-color: #cf1747;
    float: left;
    border-right: 0.025875rem solid #fff;
  }
  .reservation_b .icon_time img {
    width: 0.336375rem;
    height: 0.336375rem;
    margin-right: 0.129375rem;
    vertical-align: middle;
  }
  .reservation_b .time-d {
    width: 2.32875rem;
    float: left;
    background-color: #ffb422;
    border-top-right-radius: 0.5175rem;
    border-bottom-right-radius: 0.5175rem;
  }
  .reservation_b.end-a .time-d {
    background-color: #b7b5b1;
  }
  .reservation_b.end-a .icon_time {
    background-color: #807c7d;
  }
  .reservation .clock {
    width: 1.474875rem;
    position: absolute;
    left: 0;
    top: 0;
  }
  .box21 {
    width: 0.543375rem;
    height: 0.543375rem;
  }
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7,
  html,
  li,
  p,
  span,
  table,
  td,
  th,
  tr,
  ul {
    margin: 0;
    padding: 0;
    font: inherit;
    font-size: 100%;
  }
  hr {
    border: 0;
    border-top: 0.025875rem solid #cecece;
    margin: 0.25875rem 0;
    display: block;
    clear: both;
  }
  ol,
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  body {
    font-family: Helvetica, STHeiti, Microsoft YaHei, Verdana, Arial, Tahoma,
      sans-serif;
    color: #333;
  }
  .mg {
    margin: 0 auto;
  }
  .fl-l {
    float: left;
  }
  .fl-l,
  .fl-r {
    display: inline;
  }
  .fl-r {
    float: right;
  }
  .pa {
    position: absolute;
  }
  .pr {
    position: relative;
  }
  .block {
    display: block;
  }
  .none {
    display: none;
  }
  .inb {
    display: inline-block;
    *display: inline;
    zoom: 1;
  }
  .vam,
  .vam-tip {
    vertical-align: middle;
  }
  .vam-tip {
    width: 0;
    display: inline-block;
  }
  .oh {
    overflow: hidden;
  }
  .cb {
    clear: both;
  }
  .box-s {
    box-sizing: border-box;
  }
  .f0 {
    font-size: 0;
  }
  .f12 {
    font-size: 0.3105rem;
  }
  .f13 {
    font-size: 0.336375rem;
  }
  .f14 {
    font-size: 0.36225rem;
  }
  .f16 {
    font-size: 0.414rem;
  }
  .f18 {
    font-size: 0.46575rem;
  }
  .f20 {
    font-size: 0.5175rem;
  }
  .f72 {
    font-size: 1.863rem;
  }
  .tc {
    text-align: center;
  }
  .text-l {
    text-align: left;
  }
  .text-r {
    text-align: right;
  }
  .fb {
    font-weight: 700;
  }
  .cp {
    cursor: pointer;
  }
  .omit {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .bg-cover {
    background-size: cover;
  }
  .bg-contain,
  .bg-cover {
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
  .bg-contain {
    background-size: contain;
  }
  .m-l-7 {
    margin-left: 0.181125rem !important;
  }
  .m-l-18 {
    margin-left: 0.46575rem !important;
  }
  .m-t-20 {
    margin-top: 0.5175rem !important;
  }
  .m-t-21 {
    margin-top: 0.543375rem !important;
  }
  .m-t-30 {
    margin-top: 0.77625rem !important;
  }
  .m-r-35 {
    margin-right: 0.905625rem !important;
  }
  .m-b-20 {
    margin-bottom: 0.5175rem !important;
  }
  .p-20 {
    padding: 0.5175rem !important;
  }
  .bg-f8 {
    background: #f8f8f8;
  }
  .line-h-29 {
    line-height: 0.750375rem !important;
  }
  input {
    color: #747d88;
    font-family: 微软雅黑;
    resize: none;
  }
  .icon-x16,
  .icon-x20,
  .icon-x22,
  .icon-x24 {
    display: inline-block;
  }
  .icon-x16 {
    width: 0.414rem;
    height: 0.414rem;
  }
  .icon-x20 {
    width: 0.5175rem;
    height: 0.5175rem;
  }
  .icon-x22 {
    width: 0.56925rem;
    height: 0.56925rem;
  }
  .icon-x24 {
    width: 0.621rem;
    height: 0.621rem;
  }
  .curr {
    color: #5593e2;
  }
  .autoWh {
    width: 100%;
    height: 100%;
  }
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    border: 0;
    -ms-interpolation-mode: bicubic;
  }
  .app-entry td[colspan="1"] {
    width: 25% !important;
  }
  .app-entry td[colspan="2"] {
    width: 50% !important;
  }
  .app-entry td[colspan="3"] {
    width: 75% !important;
  }
  .app-entry td[colspan="4"] {
    width: 100% !important;
  }
  * {
    -webkit-text-size-adjust: 100% !important;
  }
  .bg-con {
    background: no-repeat 50%;
    background-size: contain !important;
  }
  .bg-cov {
    background: no-repeat 50%;
    background-size: cover !important;
  }
  .swiper-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .swiper-container-no-flexbox .swiper-slide {
    float: left;
  }
  .swiper-container-vertical > .swiper-wrapper {
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    box-sizing: content-box;
  }
  .swiper-container-android .swiper-slide,
  .swiper-wrapper {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  .swiper-container-multirow > .swiper-wrapper {
    -webkit-box-lines: multiple;
    -moz-box-lines: multiple;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .swiper-container-free-mode > .swiper-wrapper {
    transition-timing-function: ease-out;
    margin: 0 auto;
  }
  .swiper-slide {
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .swiper-container-autoheight,
  .swiper-container-autoheight .swiper-slide {
    height: auto;
  }
  .swiper-container-autoheight .swiper-wrapper {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    transition-property: height, -webkit-transform;
    transition-property: transform, height;
    transition-property: transform, height, -webkit-transform;
  }
  .swiper-container .swiper-notification {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    opacity: 0;
    z-index: -1000;
  }
  .swiper-wp8-horizontal {
    -ms-touch-action: pan-y;
    touch-action: pan-y;
  }
  .swiper-wp8-vertical {
    -ms-touch-action: pan-x;
    touch-action: pan-x;
  }
  .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    top: 50%;
    width: 0.698625rem;
    height: 1.1385rem;
    margin-top: -0.56925rem;
    z-index: 10;
    cursor: pointer;
    background-size: 0.698625rem 1.1385rem;
    background-position: 50%;
    background-repeat: no-repeat;
  }
  .swiper-button-next.swiper-button-disabled,
  .swiper-button-prev.swiper-button-disabled {
    opacity: 0.35;
    cursor: auto;
    pointer-events: none;
  }
  .swiper-button-prev,
  .swiper-container-rtl .swiper-button-next {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z' fill='%23007aff'/%3E%3C/svg%3E");
    left: 0.25875rem;
    right: auto;
  }
  .swiper-button-prev.swiper-button-black,
  .swiper-container-rtl .swiper-button-next.swiper-button-black {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z'/%3E%3C/svg%3E");
  }
  .swiper-button-prev.swiper-button-white,
  .swiper-container-rtl .swiper-button-next.swiper-button-white {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z' fill='%23fff'/%3E%3C/svg%3E");
  }
  .swiper-button-next,
  .swiper-container-rtl .swiper-button-prev {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z' fill='%23007aff'/%3E%3C/svg%3E");
    right: 0.25875rem;
    left: auto;
  }
  .swiper-button-next.swiper-button-black,
  .swiper-container-rtl .swiper-button-prev.swiper-button-black {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z'/%3E%3C/svg%3E");
  }
  .swiper-button-next.swiper-button-white,
  .swiper-container-rtl .swiper-button-prev.swiper-button-white {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z' fill='%23fff'/%3E%3C/svg%3E");
  }
  .swiper-pagination {
    position: absolute;
    text-align: center;
    transition: 0.3s;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    z-index: 10;
  }
  .swiper-pagination.swiper-pagination-hidden {
    opacity: 0;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 0.25875rem;
    left: 0;
    width: 100%;
  }
  .swiper-pagination-bullet {
    width: 0.207rem;
    height: 0.207rem;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
  }
  button.swiper-pagination-bullet {
    border: none;
    margin: 0;
    padding: 0;
    box-shadow: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
  .swiper-pagination-clickable .swiper-pagination-bullet {
    cursor: pointer;
  }
  .swiper-pagination-white .swiper-pagination-bullet {
    background: #fff;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #007aff;
  }
  .swiper-pagination-white .swiper-pagination-bullet-active {
    background: #fff;
  }
  .swiper-pagination-black .swiper-pagination-bullet-active {
    background: #000;
  }
  .swiper-container-vertical > .swiper-pagination-bullets {
    right: 0.25875rem;
    top: 50%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }
  .swiper-container-vertical
    > .swiper-pagination-bullets
    .swiper-pagination-bullet {
    margin: 0.129375rem 0;
    display: block;
  }
  .swiper-container-horizontal
    > .swiper-pagination-bullets
    .swiper-pagination-bullet {
    margin: 0 0.129375rem;
  }
  .swiper-pagination-progress {
    background: rgba(0, 0, 0, 0.25);
    position: absolute;
  }
  .swiper-pagination-progress .swiper-pagination-progressbar {
    background: #007aff;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }
  .swiper-container-rtl
    .swiper-pagination-progress
    .swiper-pagination-progressbar {
    -webkit-transform-origin: right top;
    transform-origin: right top;
  }
  .swiper-container-horizontal > .swiper-pagination-progress {
    width: 100%;
    height: 0.1035rem;
    left: 0;
    top: 0;
  }
  .swiper-container-vertical > .swiper-pagination-progress {
    width: 0.1035rem;
    height: 100%;
    left: 0;
    top: 0;
  }
  .swiper-pagination-progress.swiper-pagination-white {
    background: hsla(0, 0%, 100%, 0.5);
  }
  .swiper-pagination-progress.swiper-pagination-white
    .swiper-pagination-progressbar {
    background: #fff;
  }
  .swiper-pagination-progress.swiper-pagination-black
    .swiper-pagination-progressbar {
    background: #000;
  }
  .swiper-container-3d {
    -webkit-perspective: 31.05rem;
    -o-perspective: 31.05rem;
    perspective: 31.05rem;
  }
  .swiper-container-3d .swiper-cube-shadow,
  .swiper-container-3d .swiper-slide,
  .swiper-container-3d .swiper-slide-shadow-bottom,
  .swiper-container-3d .swiper-slide-shadow-left,
  .swiper-container-3d .swiper-slide-shadow-right,
  .swiper-container-3d .swiper-slide-shadow-top,
  .swiper-container-3d .swiper-wrapper {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .swiper-container-3d .swiper-slide-shadow-bottom,
  .swiper-container-3d .swiper-slide-shadow-left,
  .swiper-container-3d .swiper-slide-shadow-right,
  .swiper-container-3d .swiper-slide-shadow-top {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  }
  .swiper-container-3d .swiper-slide-shadow-left {
    background-image: linear-gradient(270deg, rgba(0, 0, 0, 0.5), transparent);
  }
  .swiper-container-3d .swiper-slide-shadow-right {
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.5), transparent);
  }
  .swiper-container-3d .swiper-slide-shadow-top {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);
  }
  .swiper-container-3d .swiper-slide-shadow-bottom {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent);
  }
  .swiper-container-coverflow .swiper-wrapper,
  .swiper-container-flip .swiper-wrapper {
    -ms-perspective: 31.05rem;
  }
  .swiper-container-cube,
  .swiper-container-flip {
    overflow: visible;
  }
  .swiper-container-cube .swiper-slide,
  .swiper-container-flip .swiper-slide {
    pointer-events: none;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 1;
  }
  .swiper-container-cube .swiper-slide .swiper-slide,
  .swiper-container-flip .swiper-slide .swiper-slide {
    pointer-events: none;
  }
  .swiper-container-cube .swiper-slide-active,
  .swiper-container-cube .swiper-slide-active .swiper-slide-active,
  .swiper-container-flip .swiper-slide-active,
  .swiper-container-flip .swiper-slide-active .swiper-slide-active {
    pointer-events: auto;
  }
  .swiper-container-cube .swiper-slide-shadow-bottom,
  .swiper-container-cube .swiper-slide-shadow-left,
  .swiper-container-cube .swiper-slide-shadow-right,
  .swiper-container-cube .swiper-slide-shadow-top,
  .swiper-container-flip .swiper-slide-shadow-bottom,
  .swiper-container-flip .swiper-slide-shadow-left,
  .swiper-container-flip .swiper-slide-shadow-right,
  .swiper-container-flip .swiper-slide-shadow-top {
    z-index: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .swiper-container-cube .swiper-slide {
    visibility: hidden;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    width: 100%;
    height: 100%;
  }
  .swiper-container-cube.swiper-container-rtl .swiper-slide {
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
  }
  .swiper-container-cube .swiper-slide-active,
  .swiper-container-cube .swiper-slide-next,
  .swiper-container-cube .swiper-slide-next + .swiper-slide,
  .swiper-container-cube .swiper-slide-prev {
    pointer-events: auto;
    visibility: visible;
  }
  .swiper-container-cube .swiper-cube-shadow {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
    -webkit-filter: blur(1.29375rem);
    filter: blur(1.29375rem);
    z-index: 0;
  }
  .swiper-container-fade.swiper-container-free-mode .swiper-slide {
    transition-timing-function: ease-out;
  }
  .swiper-container-fade .swiper-slide {
    pointer-events: none;
    transition-property: opacity;
  }
  .swiper-container-fade .swiper-slide .swiper-slide {
    pointer-events: none;
  }
  .swiper-container-fade .swiper-slide-active,
  .swiper-container-fade .swiper-slide-active .swiper-slide-active {
    pointer-events: auto;
  }
  .swiper-zoom-container {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
  }
  .swiper-zoom-container > canvas,
  .swiper-zoom-container > img,
  .swiper-zoom-container > svg {
    max-width: 100%;
    max-height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
  }
  .swiper-scrollbar {
    border-radius: 0.25875rem;
    position: relative;
    -ms-touch-action: none;
    background: rgba(0, 0, 0, 0.1);
  }
  .swiper-container-horizontal > .swiper-scrollbar {
    position: absolute;
    left: 1%;
    bottom: 0.077625rem;
    z-index: 50;
    height: 0.129375rem;
    width: 98%;
  }
  .swiper-container-vertical > .swiper-scrollbar {
    position: absolute;
    right: 0.077625rem;
    top: 1%;
    z-index: 50;
    width: 0.129375rem;
    height: 98%;
  }
  .swiper-scrollbar-drag {
    height: 100%;
    width: 100%;
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.25875rem;
    left: 0;
    top: 0;
  }
  .swiper-scrollbar-cursor-drag {
    cursor: move;
  }
  .swiper-lazy-preloader {
    width: 1.08675rem;
    height: 1.08675rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -0.543375rem;
    margin-top: -0.543375rem;
    z-index: 10;
    -webkit-transform-origin: 50%;
    transform-origin: 50%;
    -webkit-animation: swiper-preloader-spin 1s steps(12) infinite;
    animation: swiper-preloader-spin 1s steps(12) infinite;
  }
  .swiper-lazy-preloader:after {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath id='a' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round' d='M60 7v20'/%3E%3C/defs%3E%3Cuse xlink:href='%23a' opacity='.27'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(30 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(60 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(90 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(120 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(150 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.37' transform='rotate(180 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.46' transform='rotate(210 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.56' transform='rotate(240 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.66' transform='rotate(270 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.75' transform='rotate(300 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.85' transform='rotate(330 60 60)'/%3E%3C/svg%3E");
    background-position: 50%;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .swiper-lazy-preloader-white:after {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath id='a' stroke='%23fff' stroke-width='11' stroke-linecap='round' d='M60 7v20'/%3E%3C/defs%3E%3Cuse xlink:href='%23a' opacity='.27'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(30 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(60 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(90 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(120 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(150 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.37' transform='rotate(180 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.46' transform='rotate(210 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.56' transform='rotate(240 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.66' transform='rotate(270 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.75' transform='rotate(300 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.85' transform='rotate(330 60 60)'/%3E%3C/svg%3E");
  }
}
@-webkit-keyframes swiper-preloader-spin {
  to {
    -webkit-transform: rotate(1turn);
  }
}
@keyframes swiper-preloader-spin {
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>
