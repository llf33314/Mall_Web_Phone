<template>
<div class="order-wrapper">
    <!--页头状态-->
    <header class="deltails-header shipped" v-if="order.orderStatus != 4" >
        <p class="fs52">{{order.orderStatusName}}</p>
        <p class="fs40" v-if="order.orderStatusMsg != ''">{{order.orderStatusMsg}}</p>
    </header> 
    <header class="deltails-header deltails-padding0 shop-textc  success" v-if="order.orderStatus == 4" >
        <i class="iconfont icon-chenggong"></i>
        <p class="fs52">{{order.orderStatusName}}</p>
    </header> 
    <section class="deltails-express" v-if="logistics != null || memberAddress != null">
        <!-- 暂没做 -->
        <div class="deltails-express-top border clearfix" v-if="logistics != null && logistics.length > 0">
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
        </div>
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
                <div class="order-item-title fs40 shop-box-justify">
                  <div class="shop-box-center">
                    <div class="order-title-img" style="">
                          <default-img :background="order.busImageUrl"
                                      :isHeadPortrait="1">
                          </default-img>
                      </div>
                    <span>{{order.busName}}</span>
                  </div>
                  <div class="shop-font ">{{order.orderStatusName}}</div>
                </div>
                <div class="order-shop border">
                    <p class="order-shop-name">
                        <i class="iconfont icon-dianpu"></i>
                        <span class="fs36">{{order.shopName}}</span>
                        <i class="iconfont icon-you"></i>
                    </p>
                    <p class="shopGray fs42">
                        共计{{order.totalNum}}个商品
                    </p>
                </div>
                <div class="order-item-box " v-for=" detail in orderDetailList">
                    <div class="order-item-content">
                        <div class="order-item-img">
                            <default-img :background="imgUrl+detail.productImageUrl"
                                    :isHeadPortrait="1">
                        </default-img>
                        </div>
                        <div class="order-item-txt">
                            <p class="fs42">{{detail.productName}}</p>
                            <p class="fs42 shop-font">¥{{detail.productPrice[0]}}.<span class="fs32">{{detail.productPrice[1]}}</span></p>
                            <p class="fs36 shopGray">
                                <span v-if="detail.productSpecificaValue != ''">{{detail.productSpecificaValue}}/</span>{{detail.productNum}}件
                            </p>
                        </div>
                    </div>
                    <div class="deltails-item-button">
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowApplyReturnButton == 1">
                            申请退款
                        </div> 
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowApplySaleButton == 1">
                            申请售后
                        </div>
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowReturnWuLiuButton == 1">
                            填写退货物流
                        </div>
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowUpdateReturnButton == 1">
                            修改退款
                        </div>
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowCloseReturnButton == 1">
                            撤销退款
                        </div>
                        <div class="deltails-button shop-bg fs36" v-if="detail.isShowCommentButton == 1">
                            去评价
                        </div>
                    </div>
                </div>
                <!-- <div class="deltails-item-button">
                    <div class="deltails-button shop-bg fs36">
                        填写退货物流
                    </div>
                    <div class="deltails-button shop-bg fs36">
                        修改退款
                    </div>
                    <div class="deltails-button shop-bg fs36">
                        撤销退款
                    </div>
                    <div class="deltails-button shop-bg fs36">
                        申请退款
                    </div>
                    <div class="deltails-button shop-bg fs36">
                        申请售后
                    </div>
                     <div class="deltails-button shop-bg fs36">
                        去评价
                    </div>
                </div> -->
                <div class="deltails-del border">
                    <p class="fs40">
                        <span>商品金额</span>
                        <span class="shop-font">￥{{order.productTotalMoney}}</span>
                    </p>
                    <p class="fs40">
                        <span>运费</span>
                        <span class="shop-font">+￥{{order.orderFreightMoney}}</span>
                    </p>
                    <p class="fs40">
                        <span>优惠</span>
                        <span class="shop-font">-￥{{order.orderYouhuiMoney}}</span>
                    </p>
                </div>
                <div class="deltails-money fs40">
                    实付金额：<span class="shop-font">￥{{order.orderMoney}}</span>
                </div>  
            </div>
        </div>
        <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
    </section>
    <section class="shop-footer-fixed deltails-footer"
    v-if="order.isShowKanWuLiuButton == 1 || order.isShowReceiveGoodButton == 1 || order.isShowGoPayButton == 1 || order.isShowDeleteButton == 1">
        <div class="deltails-button fs40 shop-bg" v-if="order.isShowKanWuLiuButton == 1">
            查看物流
        </div>
        <div class="deltails-button fs40 shop-bg" v-if="order.isShowReceiveGoodButton == 1">
            确认收货
        </div>
        <div class="deltails-button fs40 shop-bg" v-if="order.isShowGoPayButton == 1">
            去支付
        </div>
        <div class="deltails-button fs40 shop-bg" v-if="order.isShowDeleteButton == 1" @click="showDialogDelete">
            删除订单
        </div>
    </section>
    <section class="shop-main-no fs40 my-bond" v-if="isShow">
        <content-no :statu='bondStatu'></content-no>
    </section>
</div>
</template>

<script>
import footerNav from "components/footerNav";
import defaultImg from "components/defaultImg";
import technicalSupport from "components/technicalSupport"; //技术支持

export default {
  name: "my",

  data() {
    return {
      isShow: false,
      background:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg",
      orderId: 0, //订单id
      busId: 0, //商家id
      order: {}, //订单数据
      orderDetailList: [], //订单详情数据
      memberAddress: {}, //收货地址
      logistics: {}, //物流数据
      imgUrl: "" //图片域名
    };
  },
  components: {
    footerNav,
    defaultImg,
    technicalSupport
  },
  mounted() {
    let _this = this;
    //把路由带来的参数保存到页面
    _this.orderId = _this.$route.params.orderId;
    _this.busId = _this.$route.params.busId;
    _this.loadOrderDetail(); //初始化订单详情数据
    _this.$store.commit("show_footer", false); //隐藏底部导航栏
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
      _this.commonFn.ajax({
        url: h5App.activeAPI.order_detail_post,
        data: _data,
        success: function(data) {
          if (data.code == 1001) {
            location.href = data.url;
          }
          if (data.code != 1) {
            _this.$parent.$refs.bubble.show_tips(data.msg); //调用气泡显示
            return;
          }
          let order = data.data;
          _this.order = order; //订单数据
          _this.orderDetailList = order.detailResultList; //订单详情数据
          _this.memberAddress = order.memberAddressDTO; //收货地址数据
          _this.imgUrl = data.imgUrl; //图片域名
          //格式化价格
          _this.orderDetailList.forEach((item, index2) => {
            item.productPrice = _this.commonFn.moneySplit(item.productPrice);
          });
        }
      });
    },
    showDialogDelete() {
      let _this = this;
      //弹出询问框
      _this.$parent.$refs.dialog.showDialog({
        //弹出框组件调用
        btnNum: "2",
        dialogMsg: "如您主动删除此订单，您以后将无法看到此订单，请务必谨慎操作？",
        btnOne: "确定",
        btnTow: "关闭",
        dialogTitle: "删除订单提示",
        callback: {
          btnOne: function() {
            _this.deleteOrder();
          }
        }
      });
    },
    deleteOrder() {
      //删除订单接口
      let _this = this;
      let _data = {
        browerType: _this.$store.state.browerType,
        busId: _this.busId,
        url: location.href,
        orderId: this.orderId
      };
      _this.commonFn.ajax({
        url: h5App.activeAPI.delete_order_post,
        data: _data,
        success: function(data) {
          if (data.code == 1001) {
            location.href = data.url;
          }
          if (data.code != 1) {
            _this.$parent.$refs.bubble.show_tips(data.msg); //调用气泡显示
            return;
          }
          //$(window).back(-1);
          _this.$router.push("/order/list/" + _this.busId + "/0");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
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
    }
  }
  & > p:last-child {
    margin-bottom: 0;
  }
}
.deltails-money {
  text-align: right;
  padding: 40 /@dev-Width *1rem;
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
