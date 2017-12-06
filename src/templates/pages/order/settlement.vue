<template>
<div class="order-wrapper">
    <!-- 头部导航 + 收货地址区域 + 新增收货地址区域 -->
    <header class="orderTotal-header" :class="[orderData.proType == 0,'order-header']">
        <!-- 导航 -->
        <div class="header-top">
            <div class="fs46" @click="backBefore">
                <i class="iconfont icon-jiantou-copy1"></i>
                返回
            </div>
            <div class="fs46 shop-textr">
                首页
            </div>
        </div>
        <div v-if="orderData.proTypeId == 0 && isShowAddress">
        <!-- 收货地址区域 -->
          <div class="header-bottom clearfix" v-if="hasAddress && memberAddresss != null"
           @click="toAddress">
              <p class="fs46">{{memberAddresss.memberName}}  {{memberAddresss.memberPhone}}</p>
              <div class="header-bottom-left">
                  <p class="fs36 shopGray">{{memberAddresss.memberAddress}}</p>
              </div>
              <div class="header-bottom-right">
                  <i class="iconfont icon-jiantou-copy "></i>
              </div>
          </div>
          <!-- 新增收货地址区域 -->
          <div class="header-bottom-no clearfix" v-else
            @click="toAddress">
              <p class="fs42">
                  <i class="iconfont icon-jia"></i>
                  新增收货地址
              </p>
          </div>
        </div>
    </header> 
    <section class="shop-main deltails-main" v-if="orderList != null && orderList.length > 0">
        <div class="order-box">
            <div class="order-item" v-for="bus in orderList">
                <!-- 商家头像和名称区域 -->
                <div class="order-item-title fs40">
                    <div class="order-title-img">
                        <default-img :background="bus.busImageUrl"
                                    :isHeadPortrait="0">
                        </default-img>
                    </div>
                    <span>{{bus.busName}}</span>
                </div>
                <div v-for="shop in bus.shopResultList">
                    <!-- 店铺名称区域 -->
                    <div class="order-shop border">
                        <p class="order-shop-name">
                            <i class="iconfont icon-dianpu"></i>
                            <span class="fs36">{{shop.shopName}}</span>
                            <i class="iconfont icon-you"></i>
                        </p>
                    </div>
                    <!-- 商品循环 -->
                    <div class="order-item-box border" v-for="product in shop.productResultList">
                        <div class="order-item-content">
                            <div class="order-item-img" @click="toProductDetail(product.productId,product.shopId,bus.busId)">
                                <default-img :background="imgUrl+product.productImageUrl"
                                            :isHeadPortrait="0">
                                </default-img>
                            </div>
                            <div class="order-item-txt">
                                <p class="fs42 text-overflow"  @click="toProductDetail(product.productId,product.shopId,bus.busId)">{{product.productName}}</p>
                                <p class="fs36 shopGray" v-if="product.productSpecificaValue != null">{{product.productSpecificaValue}}</p>
                                <div class="fs42 shop-font orderTotal-money">
                                    <div>
                                      <p  v-if="product.productOldPrice > product.productPrice && orderData.type > 0" style="margin-bottom:0" >
                                        <span class="span-block">原价：</span>
                                        <del>¥{{product.productOldPrice | moneySplit1}}.{{product.productOldPrice | moneySplit2}}</del>
                                        
                                        </p>
                                      <p>
                                        <span class="span-block" 
                                        v-if="orderData.type > 0 && orderData.typePriceName != null">{{orderData.typePriceName}}：</span>
                                        ¥{{product.productPrice | moneySplit1}}.{{product.productPrice | moneySplit2}}
                                      </p>
                                    </div>
                                    <p class="shopGray">X{{product.productNum}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="border orderTotal-list-box" v-if="product.pfSpecResultList != null && product.pfSpecResultList.length > 0">
                          <div class=" clearfix pf-div" v-for="pfSpec in product.pfSpecResultList">
                            <p class="fs40 shop-fl pf-spec-left">规格：{{pfSpec.specificaValues}} X {{pfSpec.totalNum}}</p>
                            <div class="fs40 shop-fr text-overflow pf-spec-right shop-font" >批发价：{{pfSpec.pfPrice}}元</div>
                          </div>
                        </div>
                    </div>
                    <!-- 优惠券 -->
                    <div class="border orderTotal-list-box" v-if="shop.isCanUseYhqDiscount == 1 && shop.couponList != null && shop.couponList.length > 0">
                      <div class="orderTotal-list border" @click="showDialogs(shop.couponList,3,shop.shopId,bus.isSelectDiscount,shop.selectCoupon)">
                          <p class="fs40"> 优惠券</p>
                          <p class="fs40">
                              <span v-if="shop.selectCoupon != null">{{shop.selectCoupon.couponsName || ""}}
                                <em v-if="shop.selectCoupon.couponsFrom == 2 && shop.selectCoupon.addUser == 1 && shop.useCouponNum > 0"> X{{shop.useCouponNum}}</em>
                              </span>
                              <i class="iconfont icon-jiantou-copy shopGray"></i>
                          </p>
                      </div>
                    </div>
                </div>
                <div class="border orderTotal-list-box">
                    <div class="orderTotal-list border" v-if="bus.deliveryWayList != null && bus.deliveryWayList.length > 0 && orderData.proTypeId == 0"
                      @click="showDialogs(bus.deliveryWayList,2,bus.busId,bus.isSelectDiscount,bus.selectDelivery)">
                        <p class="fs40">配送方式</p>
                        <p class="fs40">
                            {{bus.selectDelivery.wayName}}
                            <i class="iconfont icon-jiantou-copy shopGray"></i>
                        </p>
                    </div>
                    <!-- 到店自提区域 -->
                    <div class="clearfix " v-if="bus.selectDelivery != null && bus.selectDelivery.id == 2">
                      <div class="border clearfix orderTotal-table">
                         <p class="fs40 shop-fl">提货人：</p>
                         <input  class="fs40 shop-fr my-table" placeholder="请填写提货人姓名（必填）" v-model="bus.appointmentUserName"
                         @blur="blurName(bus.appointmentUserName)"/>
                      </div>
                      <div class="border clearfix orderTotal-table">
                         <p class="fs40 shop-fl">手机号码：</p>
                         <input  class="fs40 shop-fr my-table" placeholder="请填写提货人手机号码（必填）" v-model="bus.appointmentUserPhone"
                            @blur="blurPhone(bus.appointmentUserPhone)" />
                      </div>
                      <div class="border clearfix orderTotal-table">
                         <p class="fs40 shop-fl">提货地址：</p>
                         <div  class="fs40 shop-fr my-table text-overflow" placeholder="请填选择提货地址（必选）" v-text="bus.takeAddress"
                          @click="showTakeAddress(bus.busId,bus.takeDataArr,bus.takeId)"></div>
                      </div>
                      <div class="border clearfix orderTotal-table">
                         <p class="fs40 shop-fl">提货时间：</p>
                         <div  class="fs40 shop-fr my-table"   @click="showDialogs(bus.takeTimeList,4,bus.busId,0,bus.selectTakeTime)" 
                            v-if="(bus.takeTimeList != null && bus.takeTimeList.length > 0) || bus.selectTakeTime != null"
                            v-text="bus.selectTakeTime.times +' '+ bus.selectTakeTime.startTime +'-'+ bus.selectTakeTime.endTime"></div>
                          <div  class="fs40 shop-fr my-table" v-else ></div>
                      </div>
                    </div>
                    <!-- 会员折扣，联盟折扣，积分抵扣 和 粉币抵扣区域 -->
                    <div v-if="(bus.isCanUseUnionDiscount == 1 && bus.unionStatus == 1) || bus.isCanUseMemberDiscount == 1 || bus.isCanUseFenbiDiscount == 1 || bus.isCanUseJifenDiscount == 1">
                      <div class="orderTotal-list border"
                          @click="order_ulShow">
                          <p class="fs40">折扣信息<span class="shopGray">(可点击展开编辑)</span></p>
                          <p class="fs40">
                              <i class="iconfont icon-jiantou shopGray"></i>
                              <i class="iconfont icon-up shopGray shop-hide"></i>
                          </p>
                      </div>
                      <!-- 各种抵扣 -->
                      <div class="orderTotal-ul shop-hide">
                        <div class="orderTotal-list border" v-if="bus.isCanUseUnionDiscount == 1 && bus.unionStatus == 1"  >
                              <p class="fs40">联盟折扣</p>
                              <p class="fs40">
                                  <input class="switch small-switch shop-switch" type="checkbox" value="1"
                                    v-model="bus.isSelectUnion" 
                                    @change="caculationOrder(1)"/>
                              </p>
                          </div>
                          <div class="orderTotal-list border" v-if="bus.isCanUseMemberDiscount == 1">
                              <p class="fs40">会员折扣</p>
                              <p class="fs40">
                                  <input class="switch small-switch shop-switch" type="checkbox" value="1"
                                    v-model="bus.isSelectDiscount" 
                                    @change="caculationOrder(2)"/>
                              </p>
                          </div>
                          <div class="orderTotal-list border" v-if="bus.isCanUseFenbiDiscount == 1">
                              <p class="fs40"> 粉币抵扣
                                <em class="shop-font" v-if="bus.fenbiMoney > 0 && bus.fenbiNum > 0 && bus.fenbiDisabled == 0">
                                  有{{bus.fenbiNum}}粉币，可抵扣¥{{bus.fenbiMoney}}
                                </em>
                                <em class="shop-font" v-else>不可用</em>
                              </p>
                              <p class="fs40">
                                  <input class="switch small-switch shop-switch" type="checkbox" value="1"
                                    :disabled = "bus.fenbiDisabled == 1 ? true : false"
                                    v-model="bus.isSelectFenbi"
                                    @change="caculationOrder(3)"/>
                              </p>
                          </div>
                          <div class="orderTotal-list border" v-if="bus.isCanUseJifenDiscount == 1">
                              <p class="fs40">积分抵扣
                                <em class="shop-font" v-if="bus.jifenMoney > 0 && bus.jifenNum > 0 && bus.jifenDisabled == 0">
                                  有{{bus.jifenNum}}积分，可抵扣¥{{bus.jifenMoney}}
                                </em>
                                <em class="shop-font" v-else>不可用</em>
                              </p>
                              <p class="fs40">
                                  <input class="switch small-switch shop-switch" type="checkbox" value="1"
                                  :disabled = "bus.jifenDisabled == 1 ? true : false"
                                    v-model="bus.isSelectJifen" 
                                    @change="caculationOrder(4)"/>
                              </p>
                          </div>
                      </div>
                    </div>
                    <!-- 买家留言区域 -->
                    <div class="orderTotal-table border shopGray clearfix">
                        <p class="fs40 shop-fl">
                                买家留言：
                        </p>
                        <input class="fs40 shop-fr my-table" placeholder=" 请填写备注信息" v-model="bus.buyerMessage" 
                            @blur="blurBuyerMessage(bus.buyerMessage)"/>
                    </div>
                </div>
                <!-- 显示优惠价格 -->
                <div class="deltails-del border" style="padding-top: 0.2rem;">
                    <p class="fs40">
                        <span>商品金额</span>
                        <span class="shop-font">￥{{bus.productTotalMoney}}</span>
                    </p>
                    <p class="fs40" v-if="bus.productFreightMoney != null && bus.productFreightMoney > 0">
                        <span>运费</span>
                        <span class="shop-font">+￥{{bus.productFreightMoneyOld }}</span>
                    </p>
                    <p class="fs40" v-if="bus.isCanUseUnionDiscount == 1 && bus.unionYouhuiMoney > 0">
                        <span>联盟折扣</span>
                        <span class="shop-font">-￥{{bus.unionYouhuiMoney > 0 ? bus.unionYouhuiMoney : 0}}</span>
                    </p>
                    <p class="fs40" v-if="bus.isCanUseMemberDiscount == 1 && bus.memberYouhuiMoney  > 0">
                        <span>会员折扣</span>
                        <span class="shop-font">-￥{{bus.memberYouhuiMoney  > 0 ? bus.memberYouhuiMoney : 0 }}</span>
                    </p>
                    <p class="fs40" v-if="bus.isCanUseYhqDiscount == 1 && bus.couponYouhuiMoney > 0">
                        <span>优惠券抵扣</span>
                        <span class="shop-font">-￥{{bus.couponYouhuiMoney > 0 ? bus.couponYouhuiMoney : 0}}</span>
                    </p>
                    <p class="fs40" v-if="bus.isCanUseFenbiDiscount == 1 && bus.fenbiYouhuiMoney && bus.fenbiDisabled == 0">
                        <span>粉币抵扣</span>
                        <span class="shop-font">-￥{{bus.fenbiYouhuiMoney > 0 ? bus.fenbiYouhuiMoney : 0}}</span>
                    </p>
                    <p class="fs40" v-if="bus.isCanUseJifenDiscount == 1 && bus.jifenYouhuiMoney > 0 && bus.jifenDisabled == 0">
                        <span>积分抵扣</span>
                        <span class="shop-font">-￥{{bus.jifenYouhuiMoney > 0 ? bus.jifenYouhuiMoney : 0}}</span>
                    </p>
                </div>
                <div class="deltails-money fs40">
                    共计{{bus.totalNum}}件商品 小计：
                    <span class="shop-font">￥<i class="fs52">{{bus.totalMoney | moneySplit1}}</i>.{{bus.totalMoney | moneySplit2}}</span>
                </div>
            </div>

        </div>
        <!-- 选择支付方式区域 -->
        <div class="border orderTotal-list-box" style="background-color:#fff;" 
          v-if="orderData.payWayList != null && orderData.payWayList.length > 0">
          <div class="orderTotal-list border" @click="showDialogs(orderData.payWayList,1,-1,0,selectPayWay)">
              <p class="fs40">支付方式</p>
              <p class="fs40">
                  {{selectPayWay.wayName}}
                  <i class="iconfont icon-jiantou-copy shopGray"></i>
              </p>
          </div>
        </div>

        <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
    </section>
    <section class="orderTotal-footer clearfix" v-if="orderList != null && orderList.length > 0">
        <div class="orderTotal-fr fs40 ">
            <!-- 实际支付的价格 -->
            <p>合计：<span class="shop-font">￥{{orderData.totalPayMoney | moneySplit1}}</i>.{{orderData.totalPayMoney | moneySplit2}}</span></p>
            <!-- 优惠前的价格 -->
            <span>总额:￥{{orderData.totalMoney | moneySplit1}}</i>.{{orderData.totalMoney | moneySplit2}}</span>
            <span>总优惠:￥{{orderData.totalYouHuiMoney | moneySplit1}}</i>.{{orderData.totalYouHuiMoney | moneySplit2}}</span>
        </div>
        <div class="orderTotal-button fs40 shop-bg" @click="submitOrder">
            提交订单
        </div>
    </section>
    <section class="shop-main-no fs40 my-bond" v-if="bondStatu > 0">
        <content-no :statu='bondStatu'></content-no>
    </section>
    <!-- 支付方式  和 配送方式弹出框 -->
    <section class="shop-main-no fs40 my-bond" 
      v-if="isShow && dialogArr != null && dialogArr.length > 0 && (dialogType == 1 || dialogType == 2)">
        <pay-way-dialog :name="dialogName" :dialogList="dialogArr" :type="dialogType"  :busId="dialogBusId"
          :closeDialog.sync="isShow"
          @selectDialog="selectDialogChange"
        ></pay-way-dialog>
    </section>
    <!-- 优惠券弹出框 -->
    <section class="shop-main-no fs40 my-bond" 
      v-if="isShow && dialogArr != null && dialogArr.length > 0 && dialogType == 3">
        <coupon-dialog :name="dialogName" :dialogList="dialogArr" :type="dialogType"  :busId="dialogBusId"
          :closeDialog.sync="isShow"
          @selectDialog="selectDialogChange"
        ></coupon-dialog>
    </section>
    <!-- 选择时间 -->
    <section class="shop-main-no2 fs40 my-bond" 
      v-if="isShow && dialogArr != null && dialogArr.length > 0 && dialogType == 4">
      <times-dialog :name="dialogName" :dialogList="dialogArr" :type="dialogType"  :busId="dialogBusId" :selectData="selectObj"
          :closeDialog.sync="isShow"
          @selectDialog="selectDialogChange"
        ></times-dialog>
    </section>
    <!-- 选择地址 -->
    <section class="shop-main-no fs40 my-bond" 
      v-if="isShow && dialogArr != null && dialogArr.length > 0 && dialogType == 5">
      <take-address-dialog :name="dialogName" :dialogList="dialogArr" :type="dialogType"  :busId="dialogBusId" :selectData="selectObj"
          :closeDialog.sync="isShow"
          @selectDialog="selectDialogChange"
        ></take-address-dialog>
    </section>
    <shop-dialog ref="dialog"></shop-dialog>
    <section v-show="isShowFlowPhone">
       <dialog-modular :dialogTitle = "'流量充值'">
        <div class="dialog-input-main">
            <div class="dialog-input-box">
                <div class="dialog-input">
                    <input class="fs50" placeholder="请输入手机号码" v-model="orderData.flowPhone"/>
                </div>
                <!-- <div class="dialog-input dialog-code">
                    <input class=" fs50" placeholder="请输入验证码"/>
                    <span class="fs50 shopGreen">获取验证码</span>
                </div> -->
            </div>
           <div class="dialog-bottom">
                <span class="fs50 dialog-button2" 
                    @click="confirmPhone()"
                    >提交订单
                </span>
            </div>
        </div>
    </dialog-modular>
    </section>
</div>

</template>

<script>
//组件
import footerNav from "components/footerNav";
import defaultImg from "components/defaultImg";
import shopDialog from "components/shopDialog";
import payWayDialog from "components/payWayDialog"; //支付方式
import technicalSupport from "components/technicalSupport"; //技术支持
import dialogModular from "components/dialogModular"; //流量弹出框
import couponDialog from "./componet/couponDialog"; //优惠券弹出框
import timesDialog from "./componet/timeDialog"; //时间弹出框
import takeAddressDialog from "./componet/takeAddressDialog"; //提货地址弹出框
//过滤器
import filte from "@/lib/filters"; //过滤器
//js
import calculation from "./js/calculationOrder"; //订单计算js
import submitOrder from "./js/submitOrder"; //提交订单js

export default {
  name: "submitOrder",

  data() {
    return {
      hasAddress: false,
      isShow: false,
      bondStatu: -1,
      background:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      from: 0, //来源 1 购物车结算进入 0 立即购买进入 2 去支付，必传
      cartIds: "", //购物车id
      memberAddresss: {}, //粉丝收货地址
      payWayList: [], //支付集合
      orderList: [], //订单集合
      orderData: {}, //订单对象
      imgUrl: "", //图片域名
      selectPayWay: {}, //选中的支付方式
      dialogName: "选择支付方式", //标题
      dialogArr: [], //弹出框集合
      dialogType: 1,
      dialogBusId: 0, //弹出框需要的商家id
      isUseMemberDiscount: 0, //是否选择了会员折扣
      selectObj: {}, //记录选中的对象
      isSelectDaodianPay: false, //是否选择了到店支付
      ids: "", //当 from = 0 时 此值为购物车id;  如 from = 2 时 此值为订单id
      isShowFlowPhone: false, //是否显示流量充值
      isShowAddress: true
    };
  },
  components: {
    footerNav,
    defaultImg,
    shopDialog,
    technicalSupport,
    payWayDialog,
    couponDialog,
    timesDialog,
    takeAddressDialog,
    dialogModular
  },
  mounted() {
    this.commonFn.setTitle(Language.submit_order_title);
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    if (this.$route.params.from != null) {
      this.from = this.$route.params.from;
    }
    let data = this.$store.state.orderData;
    if (this.commonFn.isNull(data) || data.length == 0) {
      this.loadDatas(); //初始化协商详情数据
    } else {
      let imgUrl = this.$store.state.imgUrl;
      this.imgUrl = imgUrl; //图片域名
      this.getorderResult(data, this);
    }
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  watch: {
    orderList() {
      console.log(this.orderList, "this.orderList---------");
    },
    /**
     * 监听支付方式集合
     */
    payWayList() {
      this.changePayWay();
    },
    /**
     * 监控选中的支付，  当选择到店支付 不用计算运费
     */
    selectPayWay() {
      let _this = this;
      let _commonFn = this.commonFn;
      let _floatSub = _commonFn.floatSub; //减法
      let _floatAdd = _commonFn.floatAdd; //加法
      if (_commonFn.isNull(this.selectPayWay)) {
        return;
      }
      let payWayId = this.selectPayWay.id;
      if (payWayId == 6) {
        _this.isSelectDaodianPay = true;
      }
      if (!_this.isSelectDaodianPay) {
        return;
      }
      // let _orderData = _this.orderData;
      // //定义运费差价
      // let chaFreightMoney = 0;
      // _this.orderList.forEach((bus, index) => {
      //   let freightMoney = bus.productFreightMoney;
      //   let oldFreightMoney = bus.productFreightMoneyOld;
      //   let busFreight = 0;
      //   if (payWayId == 6) {
      //     busFreight = freightMoney;
      //   } else {
      //     busFreight = -freightMoney;
      //   }
      //   bus.shopResultList.forEach((shop, index) => {
      //     shop.totalFreightMoney = _floatSub(
      //       shop.totalFreightMoney,
      //       busFreight
      //     );
      //   });
      //   bus.productFreightMoneyOld = _floatSub(oldFreightMoney, busFreight);
      //   // console.log(bus.totalMoney, "----", busFreight);
      //   bus.totalMoney = _floatSub(bus.totalMoney, busFreight);
      //   bus.totalNewPrice = _floatSub(bus.totalNewPrice, busFreight);

      //   chaFreightMoney = _floatAdd(chaFreightMoney, busFreight);

      //   _this.$set(_this.orderList, index, bus);
      // });
      // let totalPayMoney = _orderData.totalPayMoney;
      // _orderData.totalPayMoney = _floatSub(totalPayMoney, chaFreightMoney);
      // _orderData.totalMoney = _floatSub(_orderData.totalMoney, chaFreightMoney);
      // // console.log(totalPayMoney, "---", "totalPayMoney", chaFreightMoney);
    }
  },
  methods: {
    /**
     * 支付方式（只有当配送方式选择 到店自提  才能选择到店支付）
     */
    changePayWay() {
      let _this = this;
      let list = this.orderList;
      let payWayLists = _this.payWayList;
      list.forEach((bus, index) => {
        for (let i = 0; i < payWayLists.length; i++) {
          let way = payWayLists[i];
          if (bus.selectDelivery.id == 1 && way.id == 6) {
            way.isHide = true; //快递配送 且 到店支付，隐藏起来
            continue;
          } else {
            way.isHide = false;
          }
          if (bus.selectDelivery.id == 2 && way.id == 2) {
            way.isHide = true; //到店自提  且 货到付款， 隐藏起来
            continue;
          } else {
            way.isHide = false;
          }
        }
        // payWayLists.forEach((way, index) => {
        // });
      });
    },
    //改变到店自提  选择了到店自提后 清空运费
    changeDeliv(item) {
      // console.log(item,"item")
      let _this = this;

      let _commonFn = this.commonFn;
      let _floatSub = _commonFn.floatSub; //减法
      let _floatAdd = _commonFn.floatAdd; //加法
      if (_commonFn.isNull(this.selectPayWay)) {
        return;
      }
      let deliverWayId = item.selectDelivery.id;
      if (deliverWayId == 2) {
        _this.isSelectDaodianPay = true;
      }
      if (!_this.isSelectDaodianPay) {
        return;
      }
      let _orderData = _this.orderData;
      //定义运费差价
      let chaFreightMoney = 0;
      _this.orderList.forEach((bus, index) => {
        let freightMoney = bus.productFreightMoney;
        let oldFreightMoney = bus.productFreightMoneyOld;
        let busFreight = 0;
        if (deliverWayId == 2) {
          busFreight = freightMoney;
        } else {
          busFreight = -freightMoney;
        }
        bus.shopResultList.forEach((shop, index) => {
          shop.totalFreightMoney = _floatSub(
            shop.totalFreightMoney,
            busFreight
          );
        });
        bus.productFreightMoneyOld = _floatSub(oldFreightMoney, busFreight);
        // console.log(bus.totalMoney, "----", busFreight);
        bus.totalMoney = _floatSub(bus.totalMoney, busFreight);
        bus.totalNewPrice = _floatSub(bus.totalNewPrice, busFreight);

        chaFreightMoney = _floatAdd(chaFreightMoney, busFreight);

        _this.$set(_this.orderList, index, bus);
      });
      let totalPayMoney = _orderData.totalPayMoney;
      _orderData.totalPayMoney = _floatSub(totalPayMoney, chaFreightMoney);
      _orderData.totalMoney = _floatSub(_orderData.totalMoney, chaFreightMoney);
      // console.log(totalPayMoney, "---", "totalPayMoney", chaFreightMoney);
    },
    order_ulShow() {
      $(".orderTotal-ul").toggleClass("shop-hide");
      $(".icon-up").toggleClass("shop-hide");
      $(".icon-jiantou").toggleClass("shop-hide");
    },
    /**初始化数据 */
    loadDatas() {
      let _this = this;
      let _data = {
        from: _this.from,
        busId: this.$route.params.busId || sessionStorage.getItem("busId"),
        url: location.href,
        browerType: _this.$store.state.browerType
      };
      if (_this.from == 1) {
        _data.cartIds = _this.$route.params.ids;
      } else if (_this.from == 2) {
        _data.orderId = _this.$route.params.ids;
      }
      _this.ajaxRequest({
        status: false,
        url: h5App.activeAPI.to_order_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl; //图片域名
          _this.getorderResult(myData, _this);
        }
      });
    },
    getorderResult(myData, _this) {
      _this.orderData = myData;
      _this.memberAddresss = myData.memberAddressDTO; //选中的收货地址
      if (_this.memberAddresss != null) {
        _this.hasAddress = true;
      }
      _this.payWayList = myData.payWayList; //支付方式
      _this.orderList = myData.busResultList; //订单集合
      _this.orderList.forEach((item, index) => {
        if (myData.proTypeId == 0) {
          item.isSelectDiscount = true;
        }
        if (
          item.deliveryWayList != null &&
          item.deliveryWayList.length > 0 &&
          item.selectDelivery == null
        ) {
          //默认选中第一个配送方式
          item.selectDelivery = item.deliveryWayList[0]; //选中的配送方式
        } else {
          if (item.selectDelivery.id == 2) {
            _this.isShowAddress = false;
          }
        }
        item.productFreightMoneyOld = item.productFreightMoney;
        if (item.selectTakeTime != null) {
          _this.showTakeTime(item.takeId, item.busId);
        }
      });
      //支付方式集合
      if (myData.selectPayWay != null) {
        _this.selectPayWay = myData.selectPayWay;
      } else if (_this.payWayList != null && _this.payWayList.length > 0) {
        //赋值默认的支付方式
        _this.selectPayWay = _this.payWayList[0];
      }
      _this.orderData.typePriceName =
        Language.order_type_price_name[myData.type];
      _this.caculationOrder(0); //初始化计算订单
    },
    /**
     * 显示弹出框
     * list 弹出框显示的集合
     * type 弹出框类型 1 支付方式  2配送方式 3 优惠券 4提货时间 5 提货地址
     * busId 商家id
     * isSelectDiscount 是否选中优惠券 
     * defaultObj 选中数据
     */
    showDialogs(list, type, busId, isSelectDiscount, defaultObj) {
      let titleNames = "";
      if (type == 1) {
        //选择支付方式
        titleNames = "选择支付方式";
      } else if (type == 2) {
        titleNames = "选择配送方式";
      } else if (type == 3) {
        titleNames = "选择优惠券";
        this.isUseMemberDiscount = isSelectDiscount;
      } else if (type == 4) {
        titleNames = "选择提货时间";
      } else if (type == 5) {
        titleNames = "选择提货地址";
      }
      this.selectObj = defaultObj;
      this.dialogName = titleNames;
      this.dialogArr = list;
      this.isShow = true;
      this.dialogType = type;
      if (busId > 0) {
        this.dialogBusId = busId;
      }
    },
    //选中弹出框事件
    selectDialogChange(data) {
      console.log("data", data);
      let _this = this;
      let obj = data[1];
      //改变选中对象
      if (data[0] == 1) {
        //选择支付方式
        this.selectPayWay = data[1];
      } else if (data[0] == 2) {
        //选择配送方式  如果配送方式是到店自提，则查询到店自提时间，并改变支付方式
        for (let i = 0; i < _this.orderList.length; i++) {
          let item = _this.orderList[i];
          if (item.busId == data[2]) {
            item.selectDelivery = data[1];

            if (obj.id == 2) {
              _this.isShowAddress = false;
              //到店自提
              _this.showTakeTime(item.takeId, item.busId);
              //选择了货到付款
              //选择到店自提，也选择了货到付款，则清空选择的支付方式
              if (this.selectPayWay.id == 2) {
                _this.clearPayWay(2);
              }
            } else {
              _this.isShowAddress = true;
              //没有选择到店自提，但选择了支付方式，则清空选择的支付方式
              if (this.selectPayWay.id == 6) {
                _this.clearPayWay(6);
              }
            }
            _this.changePayWay();
            _this.changeDeliv(item);
            break;
          }
        }
      } else if (data[0] == 3) {
        //选择优惠券
        for (let i = 0; i < _this.orderList.length; i++) {
          let bus = _this.orderList[i];
          for (let j = 0; j < bus.shopResultList.length; j++) {
            let shop = bus.shopResultList[j];
            if (shop.shopId == data[2]) {
              shop.selectCoupon = obj;
              break;
            }
          }
        }
        this.caculationOrder(5); //计算优惠券优惠的
      } else if (data[0] == 4) {
        //选中时间
        for (let i = 0; i < _this.orderList.length; i++) {
          let bus = _this.orderList[i];
          if (bus.busId == data[2]) {
            bus.selectTakeTime = obj;
            _this.$set(_this.orderList, i, bus);
            break;
          }
        }
      } else if (data[0] == 5) {
        //选中提货地址
        for (let i = 0; i < _this.orderList.length; i++) {
          let bus = _this.orderList[i];
          if (bus.busId == data[2]) {
            bus.takeId = obj.id;
            bus.takeAddress = obj.visitAddressDetail;
            _this.$set(_this.orderList, i, bus);
            //重新获得自提点时间
            _this.showTakeTime(obj.id, bus.busId);
            break;
          }
        }
      }
    },
    /**
     * 清空支付方式
     */
    clearPayWay(wayId) {
      let _this = this;
      //没有选择到店自提，但选择了支付方式，则清空选择的支付方式
      if (this.selectPayWay.id == wayId) {
        for (let i = 0; i < _this.payWayList.length; i++) {
          let payWay = _this.payWayList[i];
          if (payWay.id != wayId) {
            _this.selectPayWay = payWay;
            break;
          }
        }
      }
    },
    /**
     * 获取到店自提地址 并显示  弹出框
     */
    showTakeAddress(busId, takeArr, takeId) {
      let _this = this;
      let _commonFn = _this.commonFn;
      let address = _this.memberAddresss;
      if (_commonFn.isNotNull(takeArr) && takeArr.length > 0) {
        _this.showDialogs(takeArr, 5, busId, 0, takeId);
        return;
      }
      let _data = {
        busId: busId
      };
      if (address != null && _commonFn.isNotNull(address.addressProvince)) {
        _data.provinceIds = address.addressProvince;
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.get_take_their_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          for (let i = 0; i < _this.orderList.length; i++) {
            let bus = _this.orderList[i];
            if (bus.busId == busId) {
              bus.takeDataArr = myData;
              _this.$set(_this.orderList, i, bus);
              _this.showDialogs(bus.takeDataArr, 5, bus.busId, 0, bus.takeId);
              break;
            }
          }
        }
      });
    },
    /**
     * 获取到店自提时间
     */
    showTakeTime(id, busId) {
      let _this = this;
      let _data = {
        takeId: id
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.get_take_their_time_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null && myData == "") {
            return;
          }
          for (let i = 0; i < _this.orderList.length; i++) {
            let bus = _this.orderList[i];
            if (bus.busId == busId) {
              bus.takeTimeList = myData;
              if (_this.commonFn.isNull(bus.selectTakeTime)) {
                bus.selectTakeTime = myData[0];
              }
              _this.$set(_this.orderList, i, bus);
              break;
            }
          }
        }
      });
    },
    /**
     * 验证提货人姓名
     */
    blurName(obj) {
      let _this = this;
      let _commonFm = this.commonFn;
      if (_commonFm.isNull(obj)) {
        _this.$parent.$refs.bubble.show_tips(Language.tihuo_name_msg);
        return false;
      } else if (obj.length > 15) {
        _this.$parent.$refs.bubble.show_tips(Language.tihuo_name_length_msg);
        return false;
      }
      return true;
    },
    /**
     * 验证提货人手机号码
     */
    blurPhone(obj) {
      let _this = this;
      let _commonFm = this.commonFn;
      if (_commonFm.isNull(obj) || !_commonFm.validPhone(obj)) {
        _this.$parent.$refs.bubble.show_tips(Language.tihuo_phone_msg);
        return false;
      }
      return true;
    },
    /**
     * 验证买家留言
     */
    blurBuyerMessage(obj) {
      let _this = this;
      let _commonFm = this.commonFn;
      if (_commonFm.isNotNull(obj) && obj.length >= 100) {
        _this.$parent.$refs.bubble.show_tips("买家留言长度不能超过100个字");
        return false;
      }
      return true;
    },
    /**
     * 进入新增收货地址页面
     */
    toAddress() {
      this.orderData.selectPayWay = this.selectPayWay;
      this.$store.commit("img_url", this.imgUrl);
      this.$store.commit("orderData_change", this.orderData);
      sessionStorage.setItem("addressBeforeUrl", location.href);
      this.$router.push("/address/" + this.busId);
    },
    toProductDetail(productId, shopId, busId) {
      let type = this.orderData.type || 0;
      let activityId = this.orderData.activityId;
      //进入商品详情页面
      this.$router.push(
        "/goods/details/" +
          shopId +
          "/" +
          busId +
          "/" +
          type +
          "/" +
          productId +
          "/" +
          activityId
      );
    },
    /**
     * 显示流量充值弹出框
     */
    showFlowPhone() {
      let _this = this;
      this.isShowFlowPhone = true;
      // console.log("_this.$refs.dialogModular", _this.$refs.dialogModular);
      // _this.$refs.dialogModular.showDialog();
    },
    /** */
    confirmPhone() {
      let flowPhone = this.orderData.flowPhone;
      let _commonfn = this.commonFn;
      let _isNull = _commonfn.isNull;
      if (_isNull(flowPhone) || !_commonfn.validPhone(flowPhone)) {
        this.$parent.$refs.bubble.show_tips(Language.flow_phone_msg);
        return;
      }
      this.submitOrder();
    },
    backBefore() {
      //返回前页
      let url = sessionStorage.getItem("payUrl");
      if (this.commonFn.isNotNull(url)) {
        location.href = url;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "./css/settlement.less"; //样式
</style>
