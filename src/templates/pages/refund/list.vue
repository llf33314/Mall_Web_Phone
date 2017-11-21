<template>
<div id='app' class="shop-wrapper  order-wrapper">  
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
                    <!-- <p class="shop-font fs42">
                        {{busItem.returnStatusDesc}}
                    </p> -->
                </div>
                <div class="order-item-box " v-for="detail in busItem.detailResultList">
                    <div class="order-item-content  border"  @click="toProductDetail(detail.productId,detail.shopId,busItem.busId,busItem.orderType,busItem.activityId)">
                        <div class="order-item-img">
                            <default-img  
                                :background="imgUrl+detail.productImageUrl"
                                        :isHeadPortrait="0">
                            </default-img>
                        </div>
                        <div class="order-item-txt">
                            <p class="fs42">{{detail.productName}}</p>
                            <p class="fs36 shopGray">
                                <span v-if="detail.productSpecificaValue != ''">{{detail.productSpecificaValue}}/</span>
                                {{detail.productNum}}件</p>
                            <p class="fs42 shop-font shop-textr">退款金额：¥{{detail.returnMoney[0]}}.<span class="fs32">{{detail.returnMoney[1]}}</span></p>
                        </div>
                    </div>
                    <div class="order-item-button fs42 border" >
                        <div class="order-button shop-bg" 
                            v-if="detail.isShowApplyReturnButton == 1 || detail.isShowApplySaleButton == 1"
                            @click="returnApplyReturn(detail.orderDetailId,detail.detailStauts)">
                            申请退款
                        </div>
                        <div class="order-button shop-bg" 
                            v-if="detail.isShowUpdateReturnButton == 1"
                            @click="returnApplyReturn(detail.orderDetailId,detail.detailStauts,detail.returnId)">
                            修改退款
                        </div>
                         <div class="order-button shop-bg" style="width:2rem;"
                            v-if="detail.isShowReturnWuliuButton == 1"
                            @click="returnWuliu(detail.returnId,detail.detailStauts)">
                            填写退货物流
                        </div>
                        <div class="order-button shop-bg" 
                            v-if="detail.isShowKanJinduButton == 1" 
                            @click="returnXieDetail(detail.returnId)">
                            查看进度
                        </div>
                         <div class="order-button shop-bg" 
                            v-if="detail.isShowCloseReturnButton == 1"
                            @click="closeApplyReturn(detail.returnId)">
                            撤销退款
                        </div>
                        <div class="order-button shop-bg" 
                            v-if="detail.isShowReturnDetailButton == 1"
                            @click="showReturnDetail(detail.returnId)">
                            查看详情
                        </div>
                    </div>
                    <div class="order-shop border " v-if="detail.returnTypeDesc != null || detail.returnStatusDesc != null">
                      <p class="fs42">
                        <i class="iconfont  shop-font" style="font-size: 0.36rem" :class="[detail.returnType == 2?'icon-tuihuo':'icon-tuikuan']"></i> {{detail.returnTypeDesc}}</p><!-- 左边显示 -->
                      <p class="shop-font fs42">{{detail.returnStatusDesc}}</p><!-- 右边显示 -->
                  </div>
                </div>
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
import shopDialog from "components/shopDialog";
import defaultImg from "components/defaultImg";
import orderCommon from "../order/js/orderCommon"; //公用的订单业务js
import more from "components/more"; //加载更多

export default {
  name: "myorder",
  data() {
    return {
      isNavshow: "my",
      statu: 1,
      bondStatu: 2,
      isShow: false,
      isShowNullContent: false,
      background:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      type: 6, //查看订单类型 0查看全部订单 1待付款订单 2待发货订单 3已发货订单 4已完成订单 5 待评价 6 退款 7团购 8 秒杀
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
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
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
    contentNo,
    shopDialog,
    defaultImg,
    more
  },
  methods: {
    loadMore() {
      this.curPage++; //请求页数
      let pageCount = this.pageCount; //总页数
      if (this.curPage >= pageCount) {
        this.isMore = 3; //没有更多
        return;
      }
      if (this.isMore != 1) {
        this.isMore = -1;
        return;
      }
      console.log("加载更多", this.isMore);
      this.isMore = 2;
      this.getOrderList({
        curPage: this.curPage
      });
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
              detailItem.returnMoney = _this.commonFn.moneySplit(
                detailItem.returnMoney
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
          _this.isMore = 2;
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
    closeApplyReturn(returnId) {
      //撤销退款
      this.showCloseReturnDialog(returnId);
    },
    returnApplyReturn(detailId, detailStatus, returnId) {
      //跳转申请退款页面.
      console.log(detailStatus);
      sessionStorage.setItem("refundReturnUrl", location.href);
      let _typeUrl = "/return/classify/" + this.busId + "/" + detailId;
      let _applyUrl =
        "/return/apply/" + this.busId + "/" + detailId + "/-1/" + returnId;

      this.isMore = -1;
      if (detailStatus == -3) {
        //申请退款 跳转到选择退款类型页面
        this.$router.push(_typeUrl);
      } else if (detailStatus == -1) {
        //商家拒绝退款  跳转到修改退款页面
        this.$router.push(_applyUrl);
      }
    },
    showReturnDetail(returnId, orderDetailId) {
      //跳转至退款详情页面
      this.isMore = -1;
      this.$router.push("/return/succeed/" + this.busId + "/" + returnId);
    },
    returnWuliu(returnId, detailStatus) {
      //填写退货物流
      this.isMore = -1;
      this.$router.push("/return/logistics/" + this.busId + "/" + returnId);
    },
    toProductDetail(productId, shopId, busId, orderType, activityId) {
      //跳转至商品详情页面
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
    setTitle() {
      this.commonFn.setTitle("退货/售后");
    },
    returnXieDetail(returnId) {
      //跳转至协商详情页面
      this.isMore = -1;
      this.$router.push("/return/consult/" + this.busId + "/" + returnId);
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
// .order-main {
//   padding: 148/@dev-Width *1rem 0;
// }
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
