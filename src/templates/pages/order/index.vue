<template>
<div id='app' class="shop-wrapper  order-wrapper">  
    <header-nav :headers= "homeNav" v-if="homeNav != null && homeNav.length > 0 && isShowNav" :status="'order'"></header-nav>  
    <content-no :statu="statu" :errorMsg="errorMsg" v-if="isShowNullContent"></content-no>
    <section class="shop-main order-main" v-if="!isShowNullContent && orderList != null" :class="{'order-main2' : !isShowNav ,'padding-bottom-clear' : !$store.state.isShowFooter}">
        <div class="order-box" 
          v-infinite-scroll="getOrderList"
          infinite-scroll-distance="100">
            <div class="order-item" v-for="(busItem,index) in orderList" :key="index">
                <div class="order-item-title fs40" @click="jumpBus(busItem)">
                    <div class="order-title-img">
                        <default-img :background="busItem.busImageUrl"
                                        :isHeadPortrait="1"
                                        :size="'0.3'">
                        </default-img>
                    </div>
                    <span>{{busItem.busName}}</span>
                </div>
                <div class="order-shop border"  @click="jumpShop(busItem)">
                    <p class="order-shop-name">
                        <i class="iconfont icon-dianpu"></i>
                        <span class="fs36">{{busItem.shopName}}</span>
                        <i class="iconfont icon-you"></i>
                    </p>
                    <p class="shop-font fs42">
                        {{busItem.orderStatusName}}
                    </p>
                </div>
                <div class="order-item-box " v-for="(detail,index2) in busItem.detailResultList" :key="index2"  v-if="busItem.orderPayWay != 5">
                    <div class="order-item-content  border" @click="returnOrderDetail(busItem.orderId)">
                        <div class="order-item-img">
                            <default-img  
                                :background="imgUrl+detail.productImageUrl"
                                        :isHeadPortrait="0" 
                                        :size="'0.8'">
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
                            @click="returnApplyReturn(detail.orderDetailId)"
                            >申请退款
                        </div>
                        <div class="order-button shop-bg"
                            v-if="detail.isShowCommentButton == 1"
                            @click="returnToComment(detail.orderDetailId,busItem.busId)"
                            >去评论
                        </div>
                    </div>
                </div>
                <div class="order-item-box"  v-if="busItem.orderPayWay == 5">
                  <div class="order-item-content  border" style="padding:0.5rem;">
                  <span class="fs42">扫码支付</span>
                  <span class="fs42" style="margin-left:0.5rem;">订单金额：{{busItem.orderMoney[0]}}.{{busItem.orderMoney[1]}}</span>
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
                        @click="returnToPay(busItem)"
                        >去支付
                    </div>
                    <div class="order-button shop-bg"
                        v-if="busItem.isShowReceiveGoodButton == 1"
                        @click="sure_dialog(busItem.orderId)"
                        >确定收货
                    </div>
                    <div class="order-button shop-bg" 
                        v-if="busItem.isShowDaifuButton == 1"
                        @click="returnDaifu(busItem.orderId,busItem.busId)"
                        >代付详情
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
import headerNav from "components/headerNav";
import shopDialog from "components/shopDialog";
import more from "components/more"; //加载更多
import orderCommon from "./js/orderCommon"; //公用的订单业务js

export default {
  name: "myorder",
  data() {
    return {
      homeNav: this.$t('order_nav_msg'),
      isNavshow: "my",
      isShowNav: false,
      statu: 1,
      bondStatu: 2,
      isShow: false,
      isShowNullContent: false,
      background: null,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      type: this.$route.params.type || 0, //查看订单类型 0查看全部订单 1待付款订单 2待发货订单 3已发货订单 4已完成订单 5 待评价 6 退款 7团购 8 秒杀
      curPage: 0, //当前页数
      pageCount: 1, //页面总数
      orderId: 0, //订单id
      orderList: [], //订单集合
      isMore: 2, //控制没有更多的显示 1 未加载；2 加载中 ；3 没有更多了；4 出错了
      imgUrl: "", //图片域名
      errorMsg: "", //错误提示语
      clickOrderId: "" ,//点击事件保存的订单id
    };
  },
  mounted() {
    let _this = this;
    _this.setTitle();
    if (this.homeNav != null && this.homeNav.length > 0) {
      for (let i = 0; i < this.homeNav.length; i++) {
        let navs = this.homeNav[i];
        if (navs.id == this.type) {
          this.isShowNav = true;
          break;
        }
      }
    }
  },
  watch: {
    $route(a, b) {
      this.type = this.$route.params.type;
      this.isMore = 2;
      this.curPage = 1;
      this.getOrderList();
      this.setTitle();
    }
  },
  components: {
    headerNav,
    shopDialog,
    more
  },
  beforeDestroy() {
    //离开后的操作
    this.isMore = -1;
  },
  methods: {
    getOrderList() {
      let _this = this;
      if (this.isMore == 3 || this.isMore == 1) {
        return;
      }
      this.isMore = 1;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面地址
        browerType: _this.$store.state.browerType, //浏览器类型 1微信 99 其他浏览器
        type: _this.type,
        curPage: _this.curPage
      };
      _this.ajaxRequest({
        status: false,
        url: h5App.activeAPI.order_list_post,
        data: _data,
        success: function(data) {
          if (data.code != 0) {
            _this.isMore = 3; 
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
          if (_this.curPage >= _this.pageCount) {
            _this.isMore = 3; //没有更多
            return;
          }
          _this.isMore = 2;
          _this.curPage++; //请求页数
        }
      });
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
    returnToPay(busItem) {
      let orderPayWay = busItem.orderPayWay; //支付方式
      let orderId = busItem.orderId;
      let busId = busItem.busId;
      // 去支付 跳转至提交订单页面
      sessionStorage.setItem("payUrl", location.href);
      this.$router.push("/order/settlement/" + busId + "/3/" + orderId);
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
      this.commonFn.setTitle(this.$t('title.order_title_data_msg')[_this.type].name);
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
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';

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
.padding-bottom-clear {
    padding-bottom: 0!important;
}
.order-main2 {
  padding-top: 0;
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
  .order-item-content {
    line-height: 1;
    font-size: 0;
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
  padding-bottom: 20px;
}
</style>
