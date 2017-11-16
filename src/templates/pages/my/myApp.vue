<template>
  <div class="shop-wrapper ">
     <section class="shop-main fs40 my-index">
        <div class="my-header shop-bg">
            <div class="my-indexUser">
               <default-img :background="background"
                            :isHeadPortrait="1">
                </default-img>
            </div>
            <p class="fs46">{{memberName}}</p>
        </div>
        <div class="my-content fs46">
            <div class="my-order">
                <div class="my-list border" @click="returnMyOrder(0);">
                    <div>
                        <i class="iconfont icon-order"></i>
                        我的订单
                    </div>
                    <div class="my-right fs32">
                        查看全部订单
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <ul class="my-nav fs36">
                    <li @click="returnMyOrder(1);">
                        <i class="iconfont icon-zhifu"></i>
                        <p>待支付</p>
                    </li>
                    <li @click="returnMyOrder(2);">
                        <i class="iconfont icon-daifahuo"></i>
                        <p>待发货</p>
                    </li>
                    <li @click="returnMyOrder(3);">
                        <i class="iconfont icon-daishouhuo"></i>
                        <p>待收货</p>
                    </li>
                    <li  @click="returnMyOrder(5);">
                        <i class="iconfont icon-daipingjia"></i>
                        <p>待评价</p>
                    </li>
                    <li  @click="returnRefundOrder();">
                        <i class="iconfont icon-tuikuan"></i>
                        <p>退款/售后</p>
                    </li>   
                </ul>
            </div>
            <div class="my-path">
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-8"></i>
                        我的会员
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-youhuiquan"></i>
                        我的优惠券
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-daipingjia"></i>
                        我的评价
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-fav"></i>
                        我的收藏
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-daifahuo"></i>
                        快递查询
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
            </div>
            <div class="my-path">
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-jingpai"></i>
                        我的竞拍
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border"  @click="returnMyOrder(8);">
                    <div>
                        <i class="iconfont icon-miaoshaweixuanzhong"></i>
                        我的秒杀
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border" v-if="isOpenPf" @click="pifaShow()">
                    <div>
                        <i class="iconfont icon-pifaguize"></i>
                        我的批发
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border"  @click="returnMyOrder(7);">
                    <div>
                        <i class="iconfont icon-tuangou"></i>
                        我的团购
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-daishouchanpin"></i>
                        我的预售
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border" v-if="isOpenSeller" @click="sellerShow()">
                    <div>
                        <i class="iconfont icon-jingjiren"></i>
                        超级销售员
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
import footerNav from "components/footerNav";
import defaultImg from "components/defaultImg";
import technicalSupport from "components/technicalSupport"; //技术支持

export default {
  name: "my",

  data() {
    return {
      busId: this.$route.params.busId,
      isNavshow: "my",
      myData: null,
      memberName: "未知用户", //用户名
      isOpenPf: false, //是否开启批发 true 开启
      isOpenSeller: false, //是否开启销售员
      background:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg"
    };
  },
  components: {
    footerNav,
    defaultImg,
    technicalSupport
  },
  mounted() {
    this.commonFn.setTitle("我的");
    this.loads();
  },
  methods: {
    loads() {
      let _this = this;
      _this.$store.state.busId = _this.busId;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面地址
        browerType: _this.$store.state.browerType //浏览器类型 1微信 99 其他浏览器
      };
      _this.commonFn.ajax({
        url: h5App.activeAPI.my_center_post,
        data: _data,
        success: function(data) {
          if (data.code == 1001) {
            location.href = data.url;
          }
          if (data.code != 0) {
            return;
          }
          let _returnData = data.data;
          _this.myData = _returnData;
          _this.memberName = _returnData.memberName; //用户名称
          _this.background = _returnData.memberImageUrl; //用户头像

          if (_returnData.isOpenPf == 1) {
            _this.isOpenPf = true;
          }
          if (_returnData.isOpenSeller == 1) {
            _this.isOpenSeller = true;
          }
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
        dialogTitle: "超级销售员提示",
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
            msg.btnNum = 2;
            msg.callback = {
              btnOne: _this.returnApplySeller
            };
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
        dialogTitle: "批发商提示",
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
        //跳转至超级批发商首页
        _this.returnPifaAll();
      } else if (_pfStatus == -1) {
        //审核失败，询问是否跳转至申请批发商页面
        msg.btnNum = 2;
        msg.callback = {
          btnOne: _this.returnApplyPifa
        };
        _isShow = true;
      }
      if (_isShow) {
        _this.$parent.$refs.dialog.showDialog(msg);
      }
    },
    returnApplySeller() {
      //跳转至超级销售员申请页面
    },
    returnSellerIndex() {
      //跳转至超级销售员首页
    },
    returnApplyPifa() {
      this.$store.commit("mutationData", { busId: this.busId });
      //跳转至批发商申请页面
      this.$router.push("/wholesale/apply/" + this.busId);
    },
    returnPifaAll() {
      //跳转至批发商品页面
    },
    returnMyOrder(type) {
      this.$store.commit("mutationData", { busId: this.busId });
      this.$router.push("/order/list/" + this.busId + "/" + type);
    },
    returnRefundOrder() {
      this.$store.commit("mutationData", { busId: this.busId });
      this.$router.push("/return/list/" + this.busId);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";

.my-index {
  width: 100%;
  color: #666;
  margin-bottom: 148 /@dev-Width *1rem;
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
</style>
