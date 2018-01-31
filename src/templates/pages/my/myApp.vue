<template>
  <div class="shop-wrapper ">
     <section class="shop-main fs40 my-index" :class="{'margin-bottom-clear' : !$store.state.isShowFooter}">
        <div class="my-header shop-bg" @click="toLogin">
            <div class="my-indexUser">
               <default-img :background="background"
                            :isHeadPortrait="1"
                            :size="'1'">
                </default-img>
            </div>
            <p class="fs46">{{memberName}}</p>
        </div>
        <div class="my-content fs46">
            <div class="my-order">
                <div class="my-list border" @click="returnMyOrder(0);">
                    <div>
                        <i class="iconfont icon-order"></i>
                        {{$t("page.myApp.my_order")}}
                        <!-- 我的订单 -->
                    </div>
                    <div class="my-right fs32">
                        {{$t("page.myApp.show_all_order")}}
                        <!-- 查看全部订单 -->
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <ul class="my-nav fs36">
                    <li @click="returnMyOrder(1);">
                        <i class="iconfont icon-zhifu"></i>
                        <p><!--待支付--> {{$t("page.myApp.wait_pay")}}</p>
                    </li>
                    <li @click="returnMyOrder(2);">
                        <i class="iconfont icon-daifahuo"></i>
                        <p><!--待发货-->{{$t("page.myApp.wait_delivery")}}</p>
                    </li>
                    <li @click="returnMyOrder(3);">
                        <i class="iconfont icon-daishouhuo"></i>
                        <p><!--待收货-->{{$t("page.myApp.wait_take_delivery")}}</p>
                    </li>
                    <li  @click="returnMyOrder(5);">
                        <i class="iconfont icon-daipingjia"></i>
                        <p><!--待评价-->{{$t("page.myApp.wait_comment")}}</p>
                    </li>
                    <li  @click="returnRefundOrder();">
                        <i class="iconfont icon-tuikuan"></i>
                        <p><!--退款/售后-->{{$t("page.myApp.refund")}}</p>
                    </li>   
                </ul>
            </div>
            <div class="my-path">
                <div class="my-list border" @click="memberCenter(1)">
                    <div>
                        <i class="iconfont icon-8"></i>
                        <!-- 我的会员 -->{{$t("page.myApp.my_member")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border" @click="memberCenter(2)">
                    <div>
                        <i class="iconfont icon-youhuiquan"></i>
                        <!-- 我的优惠券 -->{{$t("page.myApp.my_coupons")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border" @click="toReturnMyComment">
                    <div>
                        <i class="iconfont icon-daipingjia"></i>
                        <!-- 我的评价 -->{{$t("page.myApp.my_comment")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border" @click="toCollect">
                    <div>
                        <i class="iconfont icon-fav"></i>
                        <!-- 我的收藏 -->{{$t("page.myApp.my_collect")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <!-- <div class="my-list border">
                    <div>
                        <i class="iconfont icon-daifahuo"></i>
                         快递查询 {{$t("page.myApp.express_inquiry")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div> -->
            </div>
            <div class="my-path">
                <div class="my-list border" @click="toAuction">
                    <div>
                        <i class="iconfont icon-jingpai"></i>
                        <!-- 我的竞拍 -->{{$t("page.myApp.my_auction")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border"  @click="returnMyOrder(8);">
                    <div>
                        <i class="iconfont icon-miaoshaweixuanzhong"></i>
                        <!-- 我的秒杀 -->{{$t("page.myApp.my_seckill")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border" v-if="isOpenPf" @click="pifaShow()">
                    <div>
                        <i class="iconfont icon-pifaguize"></i>
                        <!-- 我的批发 -->{{$t("page.myApp.my_wholesale")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border"  @click="returnMyOrder(7);">
                    <div>
                        <i class="iconfont icon-tuangou"></i>
                        <!-- 我的团购 -->{{$t("page.myApp.my_groupbuy")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border" @click="toDeposit">
                    <div>
                        <i class="iconfont icon-daishouchanpin"></i>
                        <!-- 我的预售 -->{{$t("page.myApp.my_presale")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border" v-if="isOpenSeller" @click="sellerShow()">
                    <div>
                        <i class="iconfont icon-jingjiren"></i>
                        <!-- 超级销售员 -->{{$t("page.myApp.super_salesman")}}
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
            </div>
        </div>
     <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
    </section>
    <!-- <footer-nav :navshow='isNavshow'></footer-nav>  -->
  </div>
</template>

<script>
// import Lib from 'assets/js/Lib';
// import { Toast } from 'mint-ui';
export default {
  name: "my",

  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      isNavshow: "my",
      myData: null,
      memberName: this.$t('unknown_user_msg'), //用户名
      isOpenPf: false, //是否开启批发 true 开启
      isOpenSeller: false, //是否开启销售员
      background: null,
      isLogin: 0
    };
  },
  components: {
  },
  mounted() {
    // console.log(this.$t('title.title_my_msg'),"this.$t('title.title_my_msg')")
    this.commonFn.setTitle(this.$t('title.title_my_msg'));
    this.loads();
  },
  methods: {
    toLogin() {
      if (this.isLogin == 0) {
        this.$parent.isLogin(this.busId);
      }
    },
    loads() {
      let _this = this;
      _this.$store.state.busId = _this.busId;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面地址
        browerType: _this.$store.state.browerType, //浏览器类型 1微信 99 其他浏览器
        ucLogin: 1//不需要登陆
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.my_center_post,
        data: _data,
        success: function(data) {
          let _returnData = data.data;
          _this.myData = _returnData;
          if (_returnData.memberName != null) {
            _this.memberName = _returnData.memberName; //用户名称
          }
          if (_returnData.memberImageUrl != null) {
            _this.background = _returnData.memberImageUrl; //用户头像
          }

          if (_returnData.isOpenPf == 1) {
            _this.isOpenPf = true;
          }
          if (_returnData.isOpenSeller == 1) {
            _this.isOpenSeller = true;
          }
          _this.isLogin = _returnData.isLogin;
        }
      });
    },
    sellerShow() {
      //进入超级销售员首页 如未申请销售员，则跳转至超级销售员申请页面
      let _this = this;
      let _myData = _this.myData;
      let _sellerStatus = _myData.sellerStatus;
      let _isShow = false; //是否显示弹出框
      let msg = {
        dialogTitle: this.$t('seller_tishi_msg'),
        dialogMsg: _myData.sellerErrorMsg
      };
      //是否需要申请销售员的状态
      let _isApply =
        _sellerStatus == "-2" || _sellerStatus == "-4" || _sellerStatus == "-1";
      //是否达到了申请销售员的条件
      let _isMin =
        _myData.minCosumeMoney > 0 &&
        _myData.consumeMoney > 0 &&
        _myData.minCosumeMoney > _myData.consumeMoney;
      //没有开通超级销售员
      if (_isApply) {
        if (_isMin) {
          //申请销售员还未达到条件
          msg.btnNum = 1;
          _isShow = true;
        } else {
          if (_sellerStatus == "-1") {
            //审核失败，询问是否跳转至申请销售员页面
            msg.btnNum = 1;
            // msg.callback = {
            //   btnOne: _this.returnApplySeller
            // };
            _isShow = true;
          } else {
            //还未申请销售员 跳转至销售员申请页面
            _this.returnApplySeller();
          }
        }
      } else if (_sellerStatus == "0" || _sellerStatus == "-3") {
        //审核中和 已暂停使用的状态
        msg.btnNum = 1;
        _isShow = true;
      } else if (_sellerStatus == "1") {
        //跳转至超级销售员首页
        _this.returnSellerIndex();
      }
      if (_isShow) {
        _this.$parent.$refs.dialog.showDialog(msg);
      }
    },
    pifaShow() {
      let _this = this;
      let _myData = _this.myData;
      let _pfStatus = _myData.pfStatus;
      let _isShow = false; //是否显示弹出框
      let msg = {
        dialogTitle: this.$t('pifa_tishi_msg'),
        dialogMsg: _myData.pfErrorMsg
      };
      //没有开通批发商
      if (_pfStatus == "-2") {
        //还未申请批发商 跳转至申请批发商页面
        _this.returnApplyPifa();
      } else if (_pfStatus == "0") {
        msg.btnNum = 1;
        _isShow = true;
      } else if (_pfStatus == "1") {
        //跳转至批发商首页
        _this.returnPifaAll();
      } else if (_pfStatus == -1) {
        //审核失败，询问是否跳转至申请批发商页面
        msg.btnNum = 2;
        msg.callback = {
          btnOne: _this.returnPifaAll
        };
        _isShow = true;
      }
      if (_isShow) {
        _this.$parent.$refs.dialog.showDialog(msg);
      }
    },
    returnApplySeller() {
      //跳转至超级销售员申请页面
      this.$router.push("/seller/apply/" + this.busId);
    },
    returnSellerIndex() {
      //跳转至超级销售员首页
      this.$router.push("/seller/index/" + this.busId);
    },
    returnApplyPifa() {
      //跳转至批发商申请页面
      this.$router.push("/wholesale/apply/" + this.busId);
    },
    returnPifaAll() {
      let shopId = sessionStorage.getItem("shopId");
      let busId = this.busId;
      if (shopId == null || shopId == "") {
        getShopId();
        return;
      }
      //跳转至批发商品页面
      this.$router.push("/classify/" + shopId + "/" + busId + "/7/k=k");
    },
    //我的订单
    returnMyOrder(type) {
      this.$router.push("/order/list/" + this.busId + "/" + type);
    },
    //退款列表
    returnRefundOrder() {
      this.$router.push("/return/list/" + this.busId);
    },
    //我的评论
    toReturnMyComment() {
      this.$router.push("/my/comment/" + this.busId);
    },
    //我的拍卖
    toAuction() {
      let busId = this.busId;
      this.$router.push("/auction/myBidding/" + busId + "/1");
    },
    //我的定金
    toDeposit() {
      let busId = this.busId;
      this.$router.push("/presale/myDeposit/" + busId + "/1");
    },
    //我的收藏
    toCollect() {
      let busId = this.busId;
      this.$router.push("/my/collect/" + busId);
    },
    //获取店铺id
    getShopId(busId) {
      let _this = this;
      _this.ajaxRequest({
        url: h5App.activeAPI.get_shop_id_post,
        data: {
          busId: busId
        },
        success: function(data) {
          let shopId = data.data;
          if (shopId != null && shopId != "" && typeof shopId != "undefined") {
            sessionStorage.setItem("shopId", shopId);
            _this.$store.commit("mutationData", { shopId: shopId });
            _this.returnPifaAll();
          }
          return shopId;
        }
      });
      // return shopId;
    },
    //跳转到会员中心的页面
    memberCenter(type) {
      let busId = this.busId;
      this.$parent.getMemberCenter(busId,type);
    }
  }
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';

.my-index {
  width: 100%;
  color: #666;
  padding-bottom: 148 /@dev-Width *1rem;
  .my-header {
    width: 100%;
    height: 520 /@dev-Width *1rem;
    background-image: url("../../../assets/img/myHbg.png");
    background-size: cover;
    background-repeat: no-repeat;
    .ik-box;
    .ik-box-align(center);
    .ik-box-pack(center);
    .ik-box-orient(vertical);
    color: #fff;
    .my-indexUser {
      font-size: 0;
      width: 210 /@dev-Width *1rem;
      height: 210 /@dev-Width *1rem;
      .border-radius(100%);
      border: 6/@dev-Width *1rem solid #fff;
      overflow: hidden;
      color: rgba(0, 0, 0, 0);
      margin-bottom: 25 /@dev-Width *1rem;
    }
  }
  .my-order {
    background: #fff;
    margin-bottom: 30 /@dev-Width *1rem;
    .my-list {
      line-height: 1;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(justify);
      height: 135 /@dev-Width *1rem;
      padding: 0 56 /@dev-Width *1rem;
      i {
        font-size: 68 /@dev-Width *1rem;
      }
      .my-right {
        color: #9e9e9e;
        i {
          font-size: 36 /@dev-Width *1rem;
          color: #d7d7db;
        }
      }
    }
    .my-nav {
      .ik-box;
      .ik-box-pack(justify);
      padding: 0 35 /@dev-Width *1rem;
      color: #666;
      li {
        text-align: center;
        width: 20%;
        padding: 55 /@dev-Width *1rem 0;
        i {
          font-size: 68 /@dev-Width *1rem;
        }
      }
    }
  }
  .my-path {
    width: 100%;
    background: #fff;
    margin-bottom: 20 /@dev-Width *1rem;
    .my-list {
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(justify);
      height: 135 /@dev-Width *1rem;
      padding: 0 56 /@dev-Width *1rem;
      i {
        font-size: 68 /@dev-Width *1rem;
        vertical-align: -0.05rem;
      }
      .my-right {
        font-size: 45 /@dev-Width *1rem;
        color: #d7d7db;
      }
    }
  }
}

.margin-bottom-clear {
    margin-bottom: 0!important;
}
</style>
