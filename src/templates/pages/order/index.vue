<template>
<div id='app' class="shop-wrapper  order-wrapper">  
    <header-nav :headers= "homeNav" v-if="homeNav != null && homeNav.length > 0" :status="'order'"></header-nav>  
    <content-no :statu="statu" :errorMsg="errorMsg" v-if="isShowNullContent"></content-no>
    <section class="shop-main order-main" v-if="!isShowNullContent && orderList != null">
        <div class="order-box">
            <div class="order-item" v-for="(busItem,index) in orderList">
                <div class="order-item-title fs40">
                    <div class="order-title-img">
                        <default-img :background="busItem.busImageUrl"
                                        :isHeadPortrait="1">
                        </default-img>
                    </div>
                    <span>{{busItem.busName}}</span>
                </div>
                <div class="order-shop border">
                    <p class="order-shop-name">
                        <i class="iconfont icon-dianpu"></i>
                        <span class="fs36">{{busItem.shopName}}</span>
                        <i class="iconfont icon-you"></i>
                    </p>
                    <p class="shop-font fs42">
                        {{busItem.orderStatusName}}
                    </p>
                </div>
                <div class="order-item-box " v-for="detail in busItem.detailResultList">
                    <div class="order-item-content  border" @click="returnOrderDetail(busItem.orderId)">
                        <div class="order-item-img">
                            <default-img  
                                :background="imgUrl+detail.productImageUrl"
                                        :isHeadPortrait="0">
                            </default-img>
                        </div>
                        <div class="order-item-txt">
                            <p class="fs42">{{detail.productName}}</p>
                            <p class="fs42 shop-font">¥{{detail.productPrice[0]}}.<span class="fs32">{{detail.productPrice[1]}}</span></p>
                            <p class="fs36 shopGray">
                                <span v-if="detail.productSpecificaValue != ''">{{detail.productSpecificaValue}}/</span>
                                {{detail.productNum}}件</p>
                        </div>
                    </div>
                    <div class="order-item-button fs42 border"  v-if="detail.isShowApplyReturnButton == 1 || detail.isShowCommentButton == 1 ">
                        <div class="order-button shop-bg" 
                            v-if="detail.isShowApplyReturnButton == 1"
                            @click="returnApplyReturn(detail.orderDetailId)">
                            申请退款
                        </div>
                        <div class="order-button shop-bg"
                            v-if="detail.isShowCommentButton == 1"
                            @click="returnToComment(detail.orderDetailId,busItem.busId)">
                            去评论
                        </div>
                    </div>
                </div>
                
                <div class="order-number-time border">
                    <div class="order-number fs42">
                        订单号：<span>{{busItem.orderNo}}</span>
                    </div>
                    <div class="order-time fs42">
                        下单时间：<span>{{busItem.orderCreateTime}}</span>
                    </div>
                </div>
                <div class="order-item-total border fs42">
                    共计{{busItem.totalNum}}件商品 合计：￥{{busItem.orderMoney[0]}}.{{busItem.orderMoney[1]}}
                </div>
                <div class="order-item-button fs42"  v-if="busItem.isShowGoPayButton == 1 || busItem.isShowReceiveGoodButton == 1 || busItem.isShowDaifuButton == 1">
                    <div class="order-button shop-bg" 
                        v-if="busItem.isShowGoPayButton == 1"
                        @click="returnToPay(busItem.orderId,busItem.busId)">
                        去支付
                    </div>
                    <div class="order-button shop-bg"
                        v-if="busItem.isShowReceiveGoodButton == 1"
                        @click="sure_dialog(busItem.orderId)">
                        确定收货
                    </div>
                    <div class="order-button shop-bg" 
                        v-if="busItem.isShowDaifuButton == 1"
                        @click="returnDaifu(busItem.orderId,busItem.busId)">
                        代付详情
                    </div>
                </div>
                <!-- <div class="order-item-button fs42">
                    <div class="order-button shop-bg">
                        查看订单
                    </div>
                </div>
                <div class="order-item-button fs42">
                    <span>更多</span>
                    <div class="order-button shop-bg">
                        退货物流
                    </div>
                    <div class="order-button shop-bg">
                        查看物流
                    </div>
                    <div class="order-button shop-bg">
                        修改退订
                    </div>
                    <div class="order-button shop-bg"
                       @click="revoke_dialog">
                        撤销退款
                    </div>
                </div> -->
            </div>
        </div>
        <more :is-more="isMore"></more>
    </section>
    <section class="shop-main-no fs40 my-bond" v-if="isShow">
        <content-no :statu='bondStatu'></content-no>
    </section>
    <shop-dialog ref="dialog"></shop-dialog>
</div>
</template>

<script>
import contentNo from "components/contentNo";
import headerNav from "components/headerNav";
import shopDialog from "components/shopDialog";
import defaultImg from "components/defaultImg";
import more from "components/more"; //加载更多
import orderCommon from "./js/orderCommon"; //公用的订单业务js

export default {
  name: "myorder",
  data() {
    return {
      homeNav: Language.order_nav_msg,
      isNavshow: "my",
      statu: 1,
      bondStatu: 2,
      isShow: false,
      isShowNullContent: false,
      background:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      type: this.$route.params.type, //查看订单类型 0查看全部订单 1待付款订单 2待发货订单 3已发货订单 4已完成订单 5 待评价 6 退款 7团购 8 秒杀
      curPage: 0, //当前页数
      pageCount: 1, //页面总数
      orderId: 0, //订单id
      orderList: [], //订单集合
      isMore: 2, //控制没有更多的显示 1 未加载；2 加载中 ；3 没有更多了；4 出错了
      imgUrl: "", //图片域名
      errorMsg: "", //错误提示语
      clickOrderId: "" //点击事件保存的订单id
    };
  },
  mounted() {
    let _this = this;
    this.getOrderList({
      curPage: 1
    });
    $(window).bind("scroll", function() {
      var isScroll =
        $(window).scrollTop() > 0 &&
        $(window).scrollTop() >=
          $(document).height() - $(window).height() - 1000;
      if (isScroll) {
        _this.loadMore();
      }
    });
    _this.setTitle();
  },
  watch: {
    $route(a, b) {
      this.type = this.$route.params.type;
      this.getOrderList({
        curPage: 1,
        type: this.type
      });
      this.setTitle();
    }
  },
  components: {
    headerNav,
    contentNo,
    shopDialog,
    defaultImg,
    more
  },
  beforeDestroy() {
    //离开后的操作
    this.isMore = -1;
  },
  methods: {
    loadMore() {
      let pageCount = this.pageCount; //总页数
      if (this.curPage >= pageCount) {
        this.isMore = 3; //没有更多
        return;
      }
      if (this.isMore != 2) {
        this.isMore = -1;
        return;
      }
      this.curPage++; //请求页数
      this.isMore = -1;
      // console.log("加载更多");
      this.getOrderList({
        curPage: this.curPage
      });
      this.setTitle();
    },
    getOrderList(data) {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面地址
        browerType: _this.$store.state.browerType, //浏览器类型 1微信 99 其他浏览器
        type: data.type >= 0 ? data.type : _this.type,
        curPage: data.curPage > 0 ? data.curPage : 1
      };
      _this.ajaxRequest({
        status: false,
        url: h5App.activeAPI.order_list_post,
        data: _data,
        success: function(data) {
          if (data.code != 0) {
            _this.errorMsg = data.msg;
            _this.isShowNullContent = true; //有数据关闭
            return;
          }
          let _returnData = data.data; //定义返回数据
          _this.orderData = _returnData;
          let newOrderList = _returnData.orderResultList; //保存订单集合
          _this.curPage = _returnData.curPage; //当前页数
          _this.pageCount = _returnData.pageCount; //总页数
          _this.imgUrl = data.imgUrl; //图片地址
          //   循环设置 价钱
          newOrderList.forEach((item, index) => {
            item.orderMoney = _this.commonFn.moneySplit(item.orderMoney);
            item.detailResultList.forEach((detailItem, index2) => {
              detailItem.productPrice = _this.commonFn.moneySplit(
                detailItem.productPrice
              ); //价钱显示效果
            });
          });
          if (_this.curPage === 1) {
            //第一页数据
            _this.orderList = newOrderList;
          } else {
            _this.orderList = _this.orderList.concat(newOrderList) || []; //拼接多页数据
          }
          _this.isShowNullContent = false;
          _this.isMore = -1;
          if (_this.curPage >= _this.pageCount) {
            _this.isMore = 3; //没有更多
          }
        }
      });
    },
    order_ulShow() {
      $(".orderTotal-ul").toggleClass("shop-hide");
      $(".icon-up").toggleClass("shop-hide");
      $(".icon-jiantou").toggleClass("shop-hide");
    },
    sure_dialog(orderId) {
      this.showConfirmDialogs(orderId);
    },
    revoke_dialog() {},
    returnApplyReturn(orderDetailId) {
      //跳转申请退款页面
      sessionStorage.setItem("refundReturnUrl", location.href);
      this.$router.push("/return/classify/" + this.busId + "/" + orderDetailId);
    },
    returnToComment(orderDetailId, busId) {
      //跳转至去评价页面
      this.$router.push("/comment/" + busId + "/" + orderDetailId);
    },
    returnToPay(orderId, busId) {
      // 去支付 跳转至提交订单页面
      sessionStorage.setItem("payUrl", location.href);
      this.$router.push("/order/settlement/" + busId + "/2/" + orderId);
    },
    returnDaifu(orderId, busId) {
      //跳转至代付详情页面
      this.$router.push("/daifu/" + busId + "/" + orderId);
    },
    returnOrderDetail(orderId) {
      //跳转至订单详情页面
      this.$router.push("/order/detail/" + this.busId + "/" + orderId);
    },
    setTitle() {
      //设置页头
      let _this = this;
      this.commonFn.setTitle(Language.order_title_data_msg[_this.type].name);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";

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
  padding: 148/@dev-Width *1rem 0;
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
.more-main {
  margin-bottom: 0px;
}
</style>
