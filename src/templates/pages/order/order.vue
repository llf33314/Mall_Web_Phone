<template>
<div class="order-wrapper">
    <!--页头状态-->
    <header class="deltails-header shipped" v-if="order.orderStatus != 4" >
        <p class="fs52">{{order.orderStatusName}}</p>
        <p class="fs40 p-msg" v-if="order.orderStatusMsg != ''">{{order.orderStatusMsg}}</p>
    </header> 
    <header class="deltails-header deltails-padding0 shop-textc  success" v-if="order.orderStatus == 4" >
        <i class="iconfont icon-chenggong"></i>
        <p class="fs52">{{order.orderStatusName}}</p>
    </header> 
    <section class="deltails-express" v-if="logistics != null || memberAddress != null">
        <!-- 暂没做 -->
        <!-- <div class="deltails-express-top border clearfix" v-if="logistics != null && logistics.length > 0">
            <div class="col-1">
                <i class="iconfont icon-kuaidi"></i>
            </div>
            <div class="col-2">
                <p class="fs40 shopGreen ">[惠州市] 正常签收，签收类型：本人签收，感谢使用 顺丰快递，期待再次为您服务。</p>
                <span class="fs32">2017-05-23 14:28:35</span>
            </div>
            <div class="col-1 shop-textr">
                <i class="iconfont icon-jiantou-copy shopGray"></i>
            </div>
        </div> -->
        <div class="deltails-express-bottom clearfix" v-if="memberAddress != null">
            <div class="col-1">
                <i class="iconfont icon-dizhi"></i>
            </div>
            <div class="col-2">
                <div class="fs40 deltails-name">
                    <span>收货人：{{memberAddress.memberName}}</span> 
                    <span>{{memberAddress.memberPhone}}</span>
                </div>
                <p class="fs40">收货地址：{{memberAddress.memberAddress}}</p>
            </div>
        </div>
        <div class="deltails-express-bottom clearfix" v-if="order.appointmentId != null && order.appointmentId > 0">
            <div class="col-2">
                <p class="fs40">提货人：{{order.appointmentUserName}}</p>
                <p class="fs40">提货时间：{{order.appointmentDate}} {{order.appointmentStartTime}} {{order.appointmentEndTime}} </p>
                <p class="fs40">自提点电话：{{order.appointmentUserPhone}}</p>
                <p class="fs40">自提点地址：{{order.appointmentAddress}}</p>
            </div>
        </div>
    </section>
    <section class="shop-main deltails-main">
        <div class="order-box">
            <div class="order-item">
                <div class="order-item-title fs40 shop-box-justify" @click="jumpBus(order)">
                  <div class="shop-box-center">
                    <div class="order-title-img" style="">
                          <default-img :background="order.busImageUrl"
                                      :isHeadPortrait="1"
                                      :size="'0.3'">
                          </default-img>
                      </div>
                    <span>{{order.busName}}</span>
                  </div>
                  <div class="shop-font ">{{order.orderStatusName}}</div>
                </div>
                <div class="order-shop border" @click="jumpShop(order)">
                    <p class="order-shop-name">
                        <i class="iconfont icon-dianpu"></i>
                        <span class="fs36">{{order.shopName}}</span>
                        <i class="iconfont icon-you"></i>
                    </p>
                    <p class="shopGray fs42">
                        共计{{order.totalNum}}个商品
                    </p>
                </div>
                <div class="order-item-box" v-for=" (detail,dIndex) in orderDetailList" :key="dIndex">
                    <div class="order-item-content" @click="toProductDetail(detail,order)">
                        <div class="order-item-img">
                            <default-img :background="imgUrl+detail.productImageUrl"
                                    :isHeadPortrait="1"
                                    :size="'0.8'">
                        </default-img>
                        </div>
                        <div class="order-item-txt">
                            <p class="fs42">{{detail.productName}}</p>
                            <p class="fs42 shop-font">
                              <span v-if="order.unit == null">¥</span>{{detail.productPrice[0]}}.<span class="fs32">{{detail.productPrice[1]}}</span>
                              <span v-if="order.unit != null">{{order.unit}}</span>
                              </p>
                            <p class="fs36 shopGray">
                                <span v-if="detail.productSpecificaValue != null && detail.productSpecificaValue != ''">{{detail.productSpecificaValue}}/</span>{{detail.productNum}}件
                            </p>
                        </div>
                    </div>
                    <div class="deltails-item-button">
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowApplyReturnButton == 1"
                          @click="goApplyReturn(detail.orderDetailId,detail.detailStauts,detail.returnId)"
                          >申请退款
                        </div> 
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowApplySaleButton == 1"
                          @click="goApplyReturn(detail.orderDetailId,detail.detailStauts,detail.returnId)"
                          >申请售后
                        </div>
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowReturnWuLiuButton == 1"
                         @click="goReturnWuliu(detail.returnId,detail.detailStauts)"
                         >填写退货物流
                        </div>
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowUpdateReturnButton == 1"
                         @click="goApplyReturn(detail.orderDetailId,detail.detailStauts,detail.returnId)"
                         >修改退款
                        </div>
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowCloseReturnButton == 1"
                         @click="goCloseReturn(detail.returnId)"
                         >撤销退款
                        </div>
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowCommentButton == 1"
                         @click="goComment(detail.orderDetailId,order.busId)"
                         >去评价
                        </div>
                    </div>
                </div>
                <div class="deltails-del border">
                    <p class="fs40">
                        <span>商品金额</span>
                        <span class="shop-font">
                          <em v-if="order.unit == null">¥</em>{{order.productTotalMoney}}
                          <em v-if="order.unit != null">{{order.unit}}</em>
                        </span>
                    </p>
                    <p class="fs40" v-if="order.orderFreightMoney != null && order.orderFreightMoney  > 0" >
                        <span>运费</span>
                        <span class="shop-font">
                          +<em v-if="order.unit == null">¥</em>{{order.orderFreightMoney}}
                          <em v-if="order.unit != null">{{order.unit}}</em>
                          </span>
                    </p>
                    <p class="fs40" v-if="order.orderYouhuiMoney != null && order.orderYouhuiMoney  > 0">
                        <span>优惠</span>
                        <span class="shop-font">
                          -<em v-if="order.unit == null">¥</em>{{order.orderYouhuiMoney}}
                          <em v-if="order.unit != null">{{order.unit}}</em>
                        </span>
                    </p>
                    <p class="fs40" v-if="order.buyerMessage != null">
                        <span>买家留言</span>
                        <span class="shop-font">{{order.buyerMessage}}</span>
                    </p>
                    <p class="fs40" v-if="order.busMessage != null">
                        <span>商家留言</span>
                        <span class="shop-font">{{order.busMessage}}</span>
                    </p>
                </div>
                <div class="deltails-money fs40 border">
                    实付金额：
                    <span class="shop-font">
                      <em v-if="order.unit == null">¥</em>{{order.orderMoney}} <em v-if="order.unit != null">{{order.unit}}</em>
                    </span>
                </div>  
            </div>
        </div>
        <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
    </section>
    <section class="shop-footer-fixed deltails-footer"
    v-if="order.isShowKanWuLiuButton == 1 || order.isShowReceiveGoodButton == 1 || order.isShowGoPayButton == 1 || order.isShowDeleteButton == 1 || order.orderType == 1">
        <!-- <div class="deltails-button fs40 shop-bg" v-if="order.isShowKanWuLiuButton == 1"
          >
            查看物流
        </div> -->
        <div class="deltails-button fs40 shop-bg" v-if="order.isShowReceiveGoodButton == 1" 
          @click="confirmReceipt(order.orderId)"
            >确认收货
        </div>
        <div class="deltails-button fs40 shop-bg" v-if="order.isShowGoPayButton == 1" 
          @click="returnGoPay(order.orderId,order.busId)"
            >去支付
        </div>
        <div class="deltails-button fs40 shop-bg" v-if="order.isShowDeleteButton == 1" 
        @click="showDialogDelete(order.orderId)"
            >删除订单
        </div>
        <div class="deltails-button fs40 shop-bg" v-if="order.isShowDeleteButton == 1" 
        @click="showDialogDelete(order.orderId)"
            >删除订单
        </div>
        <div class="deltails-button fs40 shop-bg" v-if="order.orderType == 1 && order.activityId > 0" 
        @click="groupBuyDetail(order.activityId,order.joinId,order.buyerUserId)"
            >查看团购详情
        </div>
    </section>
    <section class="shop-main-no fs40 my-bond" v-if="isShow">
        <content-no :statu='bondStatu'></content-no>
    </section>
</div>
</template>

<script>
import orderCommon from "./js/orderCommon"; //公用的订单业务js

export default {
  name: "my",

  data() {
    return {
      isShow: false,
      background: null,
      orderId: this.$route.params.orderId, //订单id
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      order: {}, //订单数据
      orderDetailList: [], //订单详情数据
      memberAddress: {}, //收货地址
      logistics: {}, //物流数据
      orderType: 0, //活动类型 1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品
      activityId: 0, //活动id
      imgUrl: "", //图片域名
      bondStatu: 2
    };
  },
  components: {},
  mounted() {
    let _this = this;
    //把路由带来的参数保存到页面
    _this.loadOrderDetail(); //初始化订单详情数据
    _this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.commonFn.setTitle("订单详情");
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadOrderDetail() {
      //初始化订单详情数据
      let _this = this;
      let _data = {
        browerType: _this.$store.state.browerType,
        busId: _this.busId,
        url: location.href,
        orderId: this.orderId
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.order_detail_post,
        data: _data,
        success: function(data) {
          let order = data.data;
          _this.order = order; //订单数据
          _this.orderDetailList = order.detailResultList; //订单详情数据
          _this.memberAddress = order.memberAddressDTO; //收货地址数据
          _this.imgUrl = data.imgUrl; //图片域名
          //格式化价格
          _this.orderDetailList.forEach((item, index2) => {
            item.productPrice = _this.commonFn.moneySplit(item.productPrice);
          });
          _this.orderType = order.orderType; //活动类型
          _this.activityId = order.activityId; //活动id
          _this.busId = order.busId;
        }
      });
    },
    showDialogDelete(orderId) {
      //弹出删除订单的弹出框
      this.showDeleteOrderDialog(orderId);
    },
    returnGoPay(orderId, busId) {
      // 去支付 跳转至提交订单页面
      sessionStorage.setItem("payUrl", location.href);
      this.$router.push("/order/settlement/" + busId + "/3/" + orderId);
    },
    confirmReceipt(orderId) {
      //确认收货
      this.showConfirmDialogs(orderId);
    },
    goApplyReturn(detailId, detailStatus, returnId) {
      //跳入申请退款的页面
      sessionStorage.setItem("refundReturnUrl", location.href);
      //退款类型url
      let _typeUrl = "/return/classify/" + this.busId + "/" + detailId;
      //退款申请页面
      let _applyUrl =
        "/return/apply/" + this.busId + "/" + detailId + "/-1/" + returnId;

      if (detailStatus == -3) {
        //申请退款 跳转到选择退款类型页面
        this.$router.push(_typeUrl);
      } else if (detailStatus == -1) {
        //商家拒绝退款  跳转到修改退款页面
        this.$router.push(_applyUrl);
      }
    },
    goReturnWuliu(returnId, detailStatus) {
      //跳入填写物流的页面
      this.$router.push("/return/logistics/" + this.busId + "/" + returnId);
    },
    goUpdateReturn(orderDetailId) {
      //跳入修改退款页面
    },
    goCloseReturn(returnId) {
      //调用关闭退款的接口
      this.showCloseReturnDialog(returnId);
    },
    goComment(orderDetailId, busId) {
      //跳入去评价的页面
      this.$router.push("/comment/" + busId + "/" + orderDetailId);
    },
    toProductDetail(detail, order) {
      let productId = detail.productId;
      let shopId = detail.shopId;
      let busId = order.busId;
      let url =
        "/goods/details/" +
        shopId +
        "/" +
        busId +
        "/" +
        this.orderType +
        "/" +
        productId +
        "/" +
        this.activityId;
      if (this.commonFn.isNotNull(detail.saleMemberId)) {
        url += "/" + detail.saleMemberId + "/0";
      }
      if(this.orderType == 2){
        //跳到积分商品页面
        url = "/integral/product/"+busId+"/"+productId+"/"+shopId;
      }
      //跳转至商品详情页面
      this.$router.push(url);
    },
    groupBuyDetail(groupBuyId, joinId, memberId) {
      //查看团购详情
      let busId = this.busId;
      this.$router.push(
        "/groupbuy/detail/" +
          busId +
          "/" +
          groupBuyId +
          "/" +
          joinId +
          "/" +
          memberId
      );
    },
    /**跳转到商家页面 */
    jumpBus(e) {
      this.$router.push("/stores/" + e.busId);
    },
    /**跳转到店铺页面 */
    jumpShop(e) {
      this.$parent.getPageId(e.busId, e.shopId, true);
    }
  }
};
</script>

<style lang="less" scoped>
@import (reference) "~assets/css/base.less";
@import (reference) "~assets/css/mixins.less";
//我的订单
.order-content {
  width: 100%;
  background: #fff;
  .logistics-title {
    padding: 50/ @dev-Width *1rem 35/ @dev-Width *1rem;
    line-height: 1;
    .logistics-img {
      width: 60/ @dev-Width *1rem;
      height: 60/ @dev-Width *1rem;
      .border-radius(100%);
      margin-right: 20/ @dev-Width *1rem;
      border: 1px solid #ededed;
    }
  }
  .logistics-list {
    width: 100%;
    padding-left: 82/ @dev-Width *1rem;
    padding-right: 30/ @dev-Width *1rem;
    line-height: 1;
    overflow: hidden;
    .logistics-item {
      padding: 40/@dev-Width *1rem 0 40/@dev-Width *1rem 82/ @dev-Width *1rem;
      position: relative;
      height: 235/@dev-Width *1rem;
      .logistics-txt {
        line-height: 0.35rem;
        margin-bottom: 15/@dev-Width *1rem;
      }
      em {
        position: absolute;
        width: 25/@dev-Width *1rem;
        height: 25/@dev-Width *1rem;
        background: #dddddd;
        top: 50/@dev-Width *1rem;
        left: -((25+3)/2)/@dev-Width *1rem;
        .border-radius(100%);
      }
      &::after {
        content: "";
        position: relative;
        display: inline-block;
        width: 3/@dev-Width *1rem;
        height: 200%;
        background: #dddddd;
        left: -(86)/@dev-Width *1rem;
        top: -(120)/@dev-Width *1rem;
      }
    }
    & > div:first-child {
      color: #0bb453;
      em {
        background: #0bb453;
        box-shadow: 0px 0px 0px 2px rgba(11, 180, 83, 0.3);
      }
    }
  }
}
.order-main {
  padding-top: 148/@dev-Width *1rem;
}
.order-main,
.deltails-main {
  position: relative;
  .order-box {
    width: 100%;
  }
  .order-item {
    width: 100%;
    margin-bottom: 20/@dev-Width *1rem;
    background: #fff;
  }
  .order-item-title {
    padding: 0 40/@dev-Width *1rem;
    background: #fafafa;
    height: 135 /@dev-Width *1rem;
    .ik-box;
    .ik-box-align(center);
    .order-title-img {
      width: 80 /@dev-Width *1rem;
      height: 80 /@dev-Width *1rem;
      .border-radius(100%);
      border: 1px solid #efefef;
      background-size: cover;
      overflow: hidden;
    }
    span {
      margin-left: 20 /@dev-Width *1rem;
      font-weight: bold;
    }
  }
  .order-shop {
    width: 100%;
    height: 116 /@dev-Width *1rem;
    padding-left: 40 /@dev-Width *1rem;
    padding-right: 30/@dev-Width *1rem;
    .ik-box;
    .ik-box-align(center);
    .ik-box-pack(justify);
    font-size: 0;
  }
  .order-shop-name {
    span {
      margin: 30/@dev-Width *1rem;
    }
  }
  .order-item-content,
  .order-number-time {
    .ik-box;
    .ik-box-pack(justify);
    width: 100%;
    padding: 24/@dev-Width *1rem 30/@dev-Width *1rem 24/@dev-Width *1rem 40/@dev-Width *1rem;
    .order-item-img {
      width: 265 /@dev-Width *1rem;
      height: 265 /@dev-Width *1rem;
      background-size: cover;
    }
    .order-item-txt {
      width: 73%;
      p {
        margin-bottom: 20 /@dev-Width *1rem;
      }
    }
  }
  .order-item-total,
  .order-item-button,
  .order-number-time {
    width: 100%;
    padding: 38/@dev-Width *1rem 30/@dev-Width *1rem 38/@dev-Width *1rem 40/@dev-Width *1rem;
    text-align: right;
    .order-button {
      color: #fff;
      width: 254/@dev-Width *1rem;
      height: 88 /@dev-Width *1rem;
      line-height: 88/@dev-Width *1rem;
      display: inline-block;
      .border-radius(5px);
      text-align: center;
      margin-left: 20/@dev-Width *1rem;
    }
  }
}
//订单详情
.deltails-header {
  color: #fff;
  .ik-box;
  .ik-box-pack(center);
  .ik-box-orient(vertical);
  padding-left: 115/@dev-Width *1rem;
  width: 100%;
  background-size: 100%;
  height: 316/@dev-Width *1rem;
  background-position: center;
  margin-bottom: 30/@dev-Width *1rem;
  & > p:first-child {
    margin-bottom: 30/@dev-Width *1rem;
  }
  .p-msg {
    width: 50%;
  }
}
.deltails-padding0 {
  padding-left: 0;
  i {
    font-size: 148/@dev-Width *1rem;
  }
}
.deltails-express {
  width: 100%;
  padding: 0 42/@dev-Width *1rem;
  background: #fff;
  font-size: 0;
  margin-bottom: 30/@dev-Width *1rem;
  .deltails-express-top {
    padding: 35/@dev-Width *1rem 0;
    .ik-box;
    width: 100%;
    p {
      line-height: 1.5em;
      margin-bottom: 20/@dev-Width *1rem;
    }
    .col-1 {
      width: 8%;
      line-height: 1rem;
    }
    .col-2 {
      width: 85%;
    }
  }
  .deltails-express-bottom {
    .ik-box;
    padding: 30/@dev-Width *1rem 0;
    .col-1 {
      line-height: 0.6rem;
      width: 8%;
    }
    .col-2 {
      width: 92%;
    }
    .deltails-name {
      .ik-box;
      .ik-box-pack(justify);
      span {
        display: block;
      }
    }
  }
}
.deltails-item-button {
  text-align: right;
  font-size: 0;
  margin-bottom: 60/@dev-Width *1rem;
}
.deltails-button {
  display: inline-block;
  padding: 20/@dev-Width *1rem 15/@dev-Width *1rem;
  .border-radius(5px);
  margin-right: 30/@dev-Width *1rem;
  text-align: center;
}
.deltails-del {
  padding-left: 30 /@dev-Width *1rem;
  padding-bottom: 35 /@dev-Width *1rem;
  line-height: 1;
  p {
    margin-bottom: 30 /@dev-Width *1rem;
    .ik-box;
    .ik-box-pack(justify);
    padding-right: 25 /@dev-Width *1rem;
    span {
      display: block;
      em {
        display: inline !important;
      }
    }
  }
  & > p:last-child {
    margin-bottom: 0;
  }
}
.deltails-money {
  text-align: right;
  padding: 40 /@dev-Width *1rem;
  em {
    display: inline !important;
  }
}
.deltails-footer {
  padding: 35 /@dev-Width *1rem 0;
  font-size: 0;
  text-align: right;
  border-top: 1px solid #ddd;
  width: 100%;
  .deltails-button {
    color: #fff;
    display: inline-block;
    .border-radius(5px);
    text-align: center;
    margin-left: 20/@dev-Width *1rem;
  }
}
.deltails-main {
  padding-bottom: 180 /@dev-Width *1rem;
}
.shop-footer-fixed {
  background: #fff;
}
//已发货
.shipped {
  background-image: url("../../../assets/img/orderfahuo_bg.jpg");
}
//付款
.payment {
  background-image: url("../../../assets/img/orderfukuan_bg.jpg");
}
//成功
.success {
  background-image: url("../../../assets/img/ordercg_bg.jpg");
}
</style>
