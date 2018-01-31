<template>
  <div class="helppay-wrapper" v-if="orderObj != null">
      <section class="helppay-choice"> 
          <p class="helppay-title fs36">我在商城挑选好了商品，是时候该你仗义疏财了，快帮我付个款吧~</p>
          <div class="helppay-coupon">
              <p class="fs42 coupon-money">
                  代付金额:<span class="fs60 shop-font">￥{{orderObj.orderMoney}}</span>
              </p>
              <p class="fs42 coupon-men" v-if="orderObj.recevieUserName != null">收货人:{{orderObj.recevieUserName}}</p>
          </div>
          <div class="helppay-time fs44" v-if="orderObj.times != null && orderObj.times > 0 && orderObj.isShowTimes == 1">
                剩余支付时间：
                <count-down :times="orderObj.times"
                ></count-down>
          </div>
          <div class="helppay-choice-box">
                <div class="helppay-choice-buttom fs52 f23" v-if="orderObj.isShowAliPay == 1"  @click="submitPay(2)">
                    支付宝安全支付
                </div>
                <div class="helppay-choice-buttom fs52 f23" v-if="orderObj.isShowWxPay == 1" @click="submitPay(1)">
                    微信安全支付
                </div>
                <div class="helppay-choice-buttom fs52 f23" v-if="orderObj.isShowDaifu == 1" @click="sendDaifu">
                    发起代付请求
                </div>
                <div class="helppay-choice-buttom fs52 ff8" @click="goBuy()">
                    我也要购买
                </div>
                <div class="helppay-choice-explain fs50">
                    说明：
                    <p class="fs46">1.付款前务必和好友再次确认，避免是诈骗行为。</p>
                    <p class="fs46">2.如果发生退款，钱将退还到你的支付宝账号里。</p>
                </div>
          </div>
        </section>
        <section class="helppay-inf" v-if="orderObj.productResultList != null"> 
            <p class="fs50 border">代付订单信息</p>
            <div class="helppay-goods clearfix" v-for="(product,index) in orderObj.productResultList" :key="index"
                @click="toReturnProduct(product.productId,product.shopId)">
                <div class="helppay-img">
                    <default-img :background="imgUrl+product.productImageUrl"
                                :isHeadPortrait="0" :size="'0.8'">
                    </default-img>
                </div>
                <div class="helppay-goods-inf">
                    <p class="fs50">{{product.productName}}</p>
                    <p>
                        <span class="fs46 shopGray">数量*{{product.productNum}}</span>
                        <span class="fs50 shop-font">￥{{product.productPrice}}</span>
                    </p>
                </div>
            </div>
        </section>
      <technical-support></technical-support>
      <wx-share  :shareData="shareObj"></wx-share>
  </div>
</template>

<script>
import countDown from "./componet/countDown"; //倒计时

export default {
  components: {
    countDown,
  },
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      orderId: this.$route.params.orderId, //订单id
      imgUrl: "", //图片域名
      orderObj: [], //订单对象
      shareObj:null, //分享内容
    };
  },
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("找人代付");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadDatas() {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        ucLogin: 1,//不需要登陆
        orderId: _this.orderId //订单id
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.get_daifu_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.orderObj = myData;
          console.log(myData, "myData");
          _this.getWxShare(myData);
        }
      });
    },
    //获取微信分享数据
    getWxShare(myData) {
      let _shareObj = {
        title: "帮我付款才是真友谊",
        desc: "你的一笔小开支，是我们关系的一大步，为我付款吧！",
        url: location.href,
        imgUrl: this.imgUrl + myData.productResultList[0].productImageUrl,
        isOpenAllMenu: true, //显示所有功能按钮接口
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
        ]
      };
      this.shareObj = _shareObj;
    },
    toReturnProduct(productId, shopId) {
      //跳转至订单详情页面
      let orderType = this.orderObj.orderType;
      let activityId = this.orderObj.activityId;
      let busId = this.orderObj.busId;
      this.$router.push(
        "/goods/details/" +
          shopId +
          "/" +
          busId +
          "/" +
          orderType +
          "/" +
          productId +
          "/" +
          activityId
      );
    },
    goBuy() {
      //跳转至全部商品页面
      let shopId = this.orderObj.shopId;
      let busId = this.busId;
      let orderType = this.orderObj.orderType;
      this.$router.push(
        "/classify/" + shopId + "/" + busId + "/" + orderType + "/k=k"
      );
    },
    sendDaifu() {
      let browerType = this.$store.state.browerType;
      let msg = "请点击右上角，把代付信息分享给朋友或朋友圈";
      if (browerType != 1) {
        msg = "请把链接分享给好友";
      }
      //发送代付请求
      this.$store.commit("error_msg", msg); //弹出框
    },
    submitPay(dfPayWay) {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        orderId: _this.orderId, //订单id
        dfPayWay: dfPayWay //支付方式 1微信  2支付宝
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.freind_daifu_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (_this.commonFn.isNotNull(myData)) {
            location.href = myData;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';

.helppay-wrapper {
  width: 100%;
  .helppay-choice,
  .helppay-inf {
    line-height: 1;
    width: 100%;
    background: #fff;
    margin-bottom: 30/@dev-Width *1rem;
  }
  .helppay-title {
    padding: 48/ @dev-Width *1rem 35/ @dev-Width *1rem;
    text-align: justify;
  }
  .helppay-coupon {
    width: 100%;
    height: 272/@dev-Width *1rem;
    border-top: 0;
    border-top: 14 /@dev-Width *1rem solid transparent;
    border-bottom: 14 /@dev-Width *1rem solid transparent;
    -webkit-border-image: url("../../../assets/img/order_border.png") repeat; /* Safari 5 */
    -o-border-image: url("../../../assets/img/order_border.png") repeat; /* Opera */
    border-image: url("../../../assets/img/order_border.png") repeat;
    -webkit-border-image-slice: 12 0;
    -o-border-border-image-slice: 12 0;
    border-image-slice: 12 0;

    padding-left: 160/@dev-Width *1rem;
    padding-right: 60/@dev-Width *1rem;
    position: relative;
    margin-bottom: 78/@dev-Width *1rem;
    .coupon-money {
      height: 100%;
      .ik-box;
      .ik-box-align(center);
      span {
        vertical-align: -0.04rem;
      }
    }
    .coupon-men {
      position: absolute;
      bottom: 30/@dev-Width *1rem;
      right: 60/@dev-Width *1rem;
    }
    &::after {
      content: "";
      width: 236/@dev-Width *1rem;
      height: 100%;
      background: url("../../../assets/img/helppay_coupon.png") no-repeat;
      background-size: cover;
      position: absolute;
      left: 0;
      top: -1px;
    }
  }
  .helppay-time {
    width: 55%;
    margin: 0 auto;
    text-align: center;
  }
  .helppay-choice-box {
    width: 100%;
    padding: 80/@dev-Width *1rem 28/@dev-Width *1rem;
    .helppay-choice-buttom {
      color: #fff;
      text-align: center;
      padding: 38/@dev-Width *1rem 0;
      .border-radius(8px);
      margin-top: 38/@dev-Width *1rem;
    }
  }
  .helppay-choice-explain {
    width: 100%;
    margin-top: 80/@dev-Width *1rem;
    color: #333333;
    p {
      color: #666666;
      margin-top: 40/@dev-Width *1rem;
    }
  }
  .helppay-inf {
    width: 100%;
    padding-left: 25/@dev-Width *1rem;
    & > p {
      padding: 30/@dev-Width *1rem 0;
      color: #666666;
    }
  }
  .helppay-goods {
    width: 100%;
    padding: 20/@dev-Width *1rem 0;
  }
  .helppay-img {
    float: left;
    width: 200/@dev-Width *1rem;
    height: 200/@dev-Width *1rem;
    overflow: hidden;
  }
  .helppay-goods-inf {
    float: right;
    width: 78%;
    padding-right: 30/@dev-Width *1rem;
    p:last-child {
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(justify);
      margin-top: 75/@dev-Width *1rem;
      span {
        display: block;
      }
    }
  }
}
//颜色
.f23 {
  background: #f23030;
}
.f23 {
  background: #f23030;
}
.ff8 {
  background: #ff8522;
}
</style>
