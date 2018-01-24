<template>
<div class="shop-wrapper group-wapper">
  <section class="group-main" v-if="groupProduct != null">
      <div class="group-top " :style="{backgroundImage: 'url(' + tuangoubg + ')'}">
          <div class="group-img" @click="toProductDetail(groupProduct.id,groupProduct.shopId,groupProduct.busId,groupObj.groupId)">
              <default-img :background="imgUrl+groupProduct.imageUrl"
                          :isHeadPortrait="0">
              </default-img>
          </div>
          <div class="group-title fs40">
            <p  @click="toProductDetail(groupProduct.id,groupProduct.shopId,groupProduct.busId,groupObj.groupId)">{{groupProduct.proName}}</p>
            <div class="group-price fs36 shop-font">团购价：<span class="fs40">￥{{groupProduct.price | moneySplit1}}</span>.{{groupProduct.price | moneySplit2}}</div>
          </div>
      </div>
       <count-down :times="times" :type="3"  v-if="times != null && times > 0"></count-down>
      <!-- <div class="group-time fs40 border" v-if="times != null && times.length > 0">
          剩余 <em>{{times.DD}}</em> 天
          <em >{{times.HH}}</em>时
          <em>{{times.mm}}</em>分
          <em >{{times.ss}}</em>秒
      </div> -->
      <div class="group-middle" >
        <div class="group-kaituan border shop-textc fs44 font-weight" v-if="groupObj.chaPeopleNum > 0 && groupObj.status == 1">
          还差<em class="shop-font">{{groupObj.chaPeopleNum}}</em>人就要开团啦
        </div>
        <div class="group-items border shop-box-center" v-if="joinList != null && joinList.length > 0"
          v-for="(join,index) in joinList" :key="index">
          <div class="left ">
            <span class="img">
              <default-img :background="join.headimgurl"
                          :isHeadPortrait="0">
              </default-img>
            </span>
            <span class="fs40">{{join.nickname}}</span>
            <span class="fs40 shop-bg group-bgs" v-if="join.joinType == 1">团长</span>
          </div>
          <div class="right">
            <span class="fs36">{{join.joinTime | format}} 开团</span>
          </div>
        </div>
        <div class="group-join-div" v-if="groupObj.chaPeopleNum > 0 && groupObj.isMember == 1">
          <div class="group-button-yellow fs50" @click="isShowShare=true">呼唤朋友来参团</div>
        </div>
      </div>
  </section>
  <section class="group-section" v-if="productArr != null">
      <div class="title-div fs40 font-weight">其他团购</div>
      <div class="group-goods-box clearfix" >
        <div class="group-goods"  v-for="(product,index) in productArr" :key="index"
        @click="toProductDetail(product.id,product.shop_id,busId,product.activityId)">
          <div class="group-goods-img">
            <default-img :background="product.image_url"
                        :isHeadPortrait="0">
            </default-img>
          </div>
          <div class="group-goods-text">
            <p class="fs42 group-names">{{product.pro_name}}</p>
            <p class="shop-font fs32">{{product.peopleNum}}人团：￥<span class="fs40">{{product.price | moneySplit1}}</span>.{{product.price | moneySplit2}}</p>
            <count-down :times="product.times" :type="2" ></count-down>
            <!-- <div class="group-goods-time">
              <span class="fs36">距离结束</span>
              <span class="fs36">
                <em>0</em> 天
                <em >0</em>时
                <em>00</em>分
                <em >00</em>秒
              </span>
            </div> -->
        </div>
      </div>
    </div>
  </section>
  <section class="shop-footer-fixed" v-if="groupObj != null && groupObj.isMember == 0 && groupObj.status == 1" >
      <div class="goods-footer-botton ui-col-2 fs50 shop-yellow"
          style="color:#fff" @click="moreGroupbuy">
          更多拼团
      </div>
      <div class="goods-footer-botton ui-col-2 fs50 shop-bg"
          style="color:#fff" @click="toSubmitOrder">
          我也要参团
      </div>
  </section>
   <section class="shop-footer-fixed" v-if="groupObj != null && groupObj.isMember == 1">
       <div class="goods-footer-botton2 ui-col-2 fs50 shop-yellow"
          style="color:#fff" @click="toOrderDetail">
          查看订单详情
      </div>
   </section>
   <section class="shop-footer-fixed" v-else-if="groupObj != null && (groupObj.status == -1 || groupObj.status == -2)">
       <div class="goods-footer-botton2 ui-col-2 fs50 shop-yellow"
          style="color:#fff" >
          {{groupObj.statusMsg}}
      </div>
   </section>
  <!-- 分享 -->
  <section class="grounpShare-main" v-show="isShowShare">
    <div class="grounpShare-bg" :style="{backgroundImage: 'url(' + grounpShare + ')'}">
        <img :src="grounpShare">
    </div>
    <div class="grounpShare-botton-box">
      <div class="grounpShare-botton shop-font" @click="isShowShare=false">
          我知道了
      </div>
    </div>
</section>
<wx-share :shareData="shareObj"></wx-share>
</div>
</template>

<script>
import defaultImg from "components/defaultImg";
import tuangoubg from "assets/img/tungoubg.jpg";
import grounpSharebg from "assets/img/grounpShare.png";
import countDown from "../home/classify_child/countDown";
import filter from "@/lib/filters";
import wxShare from "components/wxShare"; //微信分享
export default {
  data() {
    return {
      tuangoubg: tuangoubg,
      grounpShare: grounpSharebg,
      isShowShare: false, //是否显示分享
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      id: this.$route.params.id, //团购id
      joinId: this.$route.params.joinId, //参团id
      memberId: this.$route.params.memberId, //参团会员id
      groupObj: null, //团购
      groupProduct: null, //团购商品
      productArr: null, //商品集合
      joinList: null, //参团集合
      imgUrl: null, //图片域名
      Interval: "",
      times: 1, //团购倒计时
      curPage: 1, //当前页数
      pageCount: 1, //总页数
      shopId: 0, //店铺id
      isMore: 2,
      shareObj: null //分享内容
    };
  },
  components: {
    defaultImg,
    countDown,
    wxShare
  },
  watch: {
    isShowShare(e) {
      if (e) {
        this.commonFn.disableScroll(); //禁止页面滚动
      } else {
        this.commonFn.allowScroll(); //允许页面滚动
      }
    }
  },
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("团购详情");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    let _this = this;

    $(window).bind("scroll", function() {
      var isScroll =
        $(window).scrollTop() > 0 &&
        $(window).scrollTop() >=
          $(document).height() - $(window).height() - 1000;
      if (isScroll) {
        _this.loadMore();
      }
    });
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadDatas() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        ucLogin: 1,//不需要登陆
        id: this.id, //团购id
        joinId: this.joinId, //参团id
        buyerUserId: this.memberId
      };
      this.ajaxRequest({
        url: h5App.activeAPI.goupbuy_detail_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          console.log(myData, "mydata");
          _this.groupObj = myData;
          _this.groupProduct = myData.productMap;
          _this.times = _this.groupProduct.times;
          _this.imgUrl = data.imgUrl;
          // _this.productArr = myData.productList;
          _this.joinList = myData.joinList;

          _this.shopId = _this.groupProduct.shopId;
          _this.getWxShare(myData);
          _this.productAjax();
        }
      });
    },
    //获取微信分享数据
    getWxShare(myData) {
      let _shareObj = {
        title: myData.title,
        desc: myData.describe,
        url: location.href,
        imgUrl: this.imgUrl + myData.productMap.imageUrl,
        isOpenAllMenu: true, //显示所有功能按钮接口
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
      };
      this.shareObj = _shareObj;
    },
    loadMore() {
      let pageCount = this.pageCount; //总页数
      if (this.curPage >= pageCount) {
        this.isMore = 3; //没有更多
        return;
      }
      if (this.isMore == 2) {
        return;
      }
      this.curPage++; //请求页数
      this.isMore = 2;
      this.productAjax(this.curPage);
    },
    /**
         * 商品搜索接口
         */
    productAjax(curPage) {
      let _this = this;
      if (_this.shopId == 0) {
        return;
      }
      let _data = {
        url: _this.$store.state.loginDTO_URL,
        browerType: _this.$store.state.browerType,
        ucLogin: 1,//不需要登陆
        shopId: _this.shopId,
        busId: _this.busId,
        type: 1, //	类型，1.团购 3.秒杀 4.拍卖 5 粉币 6预售 7批发	可不传
        curPage: curPage || 1 //	当前页	可不传
      };
      this.ajaxRequest({
        status: false,
        url: h5App.activeAPI.phoneProduct_productAll_post,
        data: _data,
        success: function(data) {
          if (data.code == 1) {
            //接口失败显示
            _this.subList = [];
            $(window).unbind("scroll");
            return;
          }
          _this.curPage = data.data.productList.curPage; //当前页数
          _this.pageCount = data.data.productList.pageCount; //总页数
          let newSubList = data.data.productList.subList; //商品数组
          if (_this.curPage === 1) {
            //第一页数据
            _this.productArr = newSubList;
          } else {
            _this.productArr = _this.productArr.concat(newSubList) || []; //拼接多页数据
          }
          _this.isMore = 1;
          if (_this.curPage >= _this.pageCount) {
            $(window).unbind("scroll");
            _this.isMore = 3; //没有更多
          }
        }
      });
    },
    //跳转到提交订单页面
    toSubmitOrder() {
      let groupProduct = this.groupProduct;
      let shopId = groupProduct.shopId;
      let _this = this;
      let goodsData = this.goodsData;
      let _data = {
        productId: groupProduct.id, //商品id，必传
        busId: this.busId, //商家id，必传
        productNum: 1, //productNum	商品数量，必传
        price: groupProduct.price, //商品价格，必传
        type: 1, //查看商品类型，1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品
        activityId: this.id, //活动id
        joinActivityId: this.joinId //参团id
      };
      if (groupProduct.specificaIds != null) {
        _data.productSpecificas = groupProduct.specificaIds;
      }
      if (groupProduct.invId != null) {
        _data.invId = groupProduct.id;
      }
      console.log("_data", _data);
      _this.ajaxRequest({
        url: h5App.activeAPI.liji_buy_post,
        data: _data,
        success: function(data) {
          // _this.commonFn.allowScroll();
          sessionStorage.setItem("payUrl", location.href);
          //跳转到提交订单的页面
          _this.$router.push("/order/settlement/" + _this.busId + "/2");
        }
      });
    },
    moreGroupbuy() {
      //更多来拼团
      let shopId = this.groupProduct.shopId;
      let busId = this.busId;
      this.$router.push("/classify/" + shopId + "/" + busId + "/1/k=k");
    },
    // 跳转到订单详情页面
    toOrderDetail() {
      let busId = this.busId;
      let orderId = this.groupObj.orderId;
      this.$router.push("/order/detail/" + busId + "/" + orderId);
    },
    //跳转到商品详情页面
    toProductDetail(proId, shopId, busId, groupId) {
      this.$router.push(
        "/goods/details/" + shopId + "/" + busId + "/1/" + proId + "/" + groupId
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
.group-wapper {
  width: 100%;
  position: relative;
  padding-bottom: 150 /@dev-Width * 1rem;
  .group-main {
    background: #fff;
    .group-top {
      width: 100%;
      background-size: 100% 100%;
      padding-top: 56/@dev-Width * 1rem;
      .group-img {
        width: 70vw;
        height: 70vw;
        margin: 0 auto;
        overflow: hidden;
      }
      .group-title {
        margin: 0 auto;
        padding: 36/@dev-Width * 1rem 0 60/@dev-Width * 1rem;
        width: 70vw;
        background: #fff;
        text-align: center;
        color: #242424;
        line-height: 1;
      }
      .group-price {
        margin-top: 38 /@dev-Width * 1rem;
      }
    }
    .group-middle {
      width: 100%;
      .group-kaituan {
        padding: 40/@dev-Width * 1rem 0;
      }
      .group-items {
        height: 155/@dev-Width * 1rem;
        line-height: 1;
        .left,
        .right {
          font-size: 0;
          span {
            display: inline-block;
            vertical-align: middle;
            margin: 0 10/@dev-Width * 1rem;
          }
          .img {
            width: 108/@dev-Width * 1rem;
            height: 108/@dev-Width * 1rem;
            .border-radius(100%);
            overflow: hidden;
          }
          .group-bgs {
            .border-radius(50px);
            padding: 15/@dev-Width * 1rem 25/@dev-Width * 1rem;
          }
        }
        .left {
          padding-left: 30/@dev-Width * 1rem;
        }
        .right {
          padding-right: 30/@dev-Width * 1rem;
        }
      }
      .group-join-div {
        width: 100%;
        padding: 30/@dev-Width * 1rem 0;
        .group-button-yellow {
          width: 55%;
          .border-radius(50px);
          background-color: #ff8522;
          text-align: center;
          color: #fff;
          // padding: 40/@dev-Width * 1rem 0;
          height: 150/@dev-Width * 1rem;
          line-height: 150/@dev-Width * 1rem;
          margin: 0px auto;
        }
      }
    }
  }
  .group-section {
    .title-div {
      text-align: center;
      padding: 72/@dev-Width * 1rem 0 66/@dev-Width * 1rem;
    }
    .group-goods-box {
      width: 100%;
      padding: 0 7/@dev-Width * 1rem;
      & > div:nth-of-type(2n) {
        margin-right: 0;
      }
    }
    .group-goods {
      float: left;
      width: 49.5%;
      margin-right: 10/@dev-Width * 1rem;
      margin-bottom: 15/@dev-Width * 1rem;
      background: #fff;
      .group-goods-img {
        margin: 2px auto 0;
        width: 540/@dev-Width * 1rem;
        height: 540/@dev-Width * 1rem;
        overflow: hidden;
      }
      .group-goods-text {
        width: 100%;
        padding: 20/@dev-Width * 1rem;
        padding-bottom: 15/@dev-Width * 1rem;
        line-height: 1;
        p:first-child {
          margin-bottom: 60/@dev-Width * 1rem;
          height: 100/@dev-Width * 1rem;
        }
      }
    }
  }
}
.font-weight {
  font-weight: bolder;
}
.shop-footer-fixed {
  width: 100%;
  z-index: 2;
  max-width: 8.28rem;
  .shop-box-justify;
  .goods-footer-botton,
  .goods-footer-botton2 {
    width: 50%;
    height: 135/@dev-Width * 1rem;
    text-align: center;
    line-height: 135/@dev-Width * 1rem;
  }
  .goods-footer-botton2 {
    width: 100% !important;
  }
}
.grounpShare-main {
  width: 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 11;
  .grounpShare-bg {
    background-size: 100% 100%;
    img {
      width: 100%;
      height: auto;
      opacity: 0;
    }
  }
  .grounpShare-botton-box {
    width: 100%;
    position: absolute;
    bottom: 293 /@dev-Width * 1rem;
  }
  .grounpShare-botton {
    margin: 0 auto;
    width: 415/@dev-Width * 1rem;
    border: 10/@dev-Width * 1rem solid #f9ddab;
    padding: 50/@dev-Width * 1rem;
    line-height: 1;
    .border-radius(50px);
    background: #fff7e9;
    font-size: 68 /@dev-Width * 1rem;
  }
}
</style>
