<template>
    <div class="shop-wrapper sale-wrapper"  v-if="seller != null">
        <div class="seller-top">
            <div class="top-title">可提现佣金(元)</div>
            <div class="top-div">
                <div class="fs100">{{withdrawMoney | moneySplit1}}.<em class="fs76">{{withdrawMoney | moneySplit2}}</em></div>
                <div class="detail-button" @click="commissionDetail">查看明细</div>
            </div>
            <div class="border border-div"></div>
            <div class="fs40 top-nav">累积提现佣金: {{seller.canPresentedCommission }}</div>
        </div>
        <div class="seller-content">
            <div class="seller-cash">
                <div class="seller-cash-item">
                    <div class="cash-div">
                        <p class="fs46">累计佣金</p>
                        <p class="fs60">{{seller.totalCommission | moneySplit1}}.<em class="fs46">{{seller.totalCommission | moneySplit2}}</em></p>
                        <p class="fs42">所有佣金</p>
                    </div>
                    <div class="cash-div">
                        <p class="fs46">佣金</p>
                        <p class="fs60">{{seller.commission | moneySplit1}}.<em class="fs46">{{seller.commission | moneySplit2}}</em></p>
                        <p class="fs42">当前账户的佣金</p>
                    </div>
                </div>
                <div class="seller-cash-item">
                    <div class="cash-div">
                        <p class="fs46">冻结佣金</p>
                        <p class="fs60">{{seller.freezeCommission | moneySplit1}}.<em class="fs46">{{seller.freezeCommission | moneySplit2}}</em></p>
                        <p class="fs42">结算期内的佣金</p>
                    </div>
                    <div class="cash-div">
                        <p class="fs46">可提现</p>
                        <p class="fs60">{{seller.canPresentedCommission | moneySplit1}}.<em class="fs46">{{seller.canPresentedCommission | moneySplit2}}</em></p>
                        <p class="fs42">结算后的佣金</p>
                    </div>
                </div>
            </div>
            <div class="remark1">买家付款后将获得申请佣金；买家确认收货后获得代理佣金；结算期后，佣金可提现；结算期内，买家退货，佣金将自动扣除。
              <p  class="shop-font" v-if="sellerSet == null">注意：商家没有设置提现规则，暂时不能提现</p>
            </div>
            <div v-if="sellerSet != null">
              <p class="shop-font fs42 remark2" v-if="sellerSet.withdrawalType == 1">注意：可用佣金满{{sellerSet.withdrawalLowestMoney}}元后方能申请提现
                <em v-if="withdrawMoney > 0">,您目前可提现<span>${withdrawMoney }</span></em>
              </p>
              <p class="shop-font fs42 remark2" v-if="sellerSet.withdrawalType == 2">注意：您目前只能申请{{sellerSet.withdrawalMultiple }}的倍数提现
                <em v-if="withdrawMoney > 0">,您目前可提现<span>${withdrawMoney }</span></em>
              </p>
            </div>
            <div class="withdraw-button " :class="[withdrawMoney > 0 ? 'blue-bg' : 'gray-bg']" @click="withdraw">我要提现</div>
            <div class="seller-record" v-if="withdrawList != null && withdrawList.length > 0">
                <p class="fs40">提现记录</p>
                <div class="border" >
                    <span>时间</span>
                    <span>金额</span>
                    <span>状态</span>
                </div>
                <div class="border" v-for="(withdraw , index) in withdrawList" :key="index">
                    <span>{{withdraw.applayTime | format}}</span>
                    <span>￥{{withdraw.withdrawMoney}}</span>
                    <span>{{withdraw.withdrawStatus == 1 ? "已申请": withdraw.withdrawStatus == 2 ? "待打款" :"已打款"}}</span>
                </div>
            </div>
             <div class="seller-record" v-else>
                <p class="fs40">提现记录</p>
                <div class="fs40 gray-color" >暂无提现记录</div>
             </div>
        </div>
    </div>
</template>
      <script>
import filter from "@/lib/filters";
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      seller: null, //销售员
      withdrawList: null, //提现列表
      sellerSet: null, //商城设置
      withdrawMoney: 0
    };
  },
  components: {
  },
  //已成功挂载，相当ready()
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("我的提现");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  //相关操作事件
  methods: {
    loadDatas() {
      //初始化数据
      let _this = this;
      let _commonfn = this.commonFn;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_my_withdraw_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.seller = myData.seller;
          _this.withdrawList = myData.withdrawList;
          _this.sellerSet = myData.sellerSet;
          _this.withdrawMoney = myData.withdrawMoney;
          if (_this.seller != null) {
            let seller = _this.seller;
            //计算佣金
            seller.commission = _commonfn.floatAdd(
              seller.canPresentedCommission,
              seller.freezeCommission
            );
          }
        }
      });
    },
    //提现
    withdraw() {
      let _this = this;
      if (this.withdrawMoney == 0) {
        _this.$store.commit("error_msg", "您实际能提现的佣金为0，请继续累积");
        return;
      }
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        withdrawMoney: this.withdrawMoney
      };
      let msg = {
        btnNum: 2, //按钮显示个数
        btnOne: "取消", //按钮文字
        btnTow: "确定", //按钮文字
        dialogTitle: "提现提醒",
        dialogMsg: "您确认要提现" + this.withdrawMoney + "元",
        callback: {
          btnOne: "", //点击按执行方法
          btnTow: function() {
            _this.ajaxRequest({
              url: h5App.activeAPI.seller_add_withdraw_post,
              loading: true,
              data: _data,
              success: function(data) {
                _this.$store.commit("is_show_loading", false);
              }
            });
          } //点击按执行方法
        }
      };
      _this.$parent.$refs.dialog.showDialog(msg); //调用方法
    },
    commissionDetail(){
      this.$router.push("/seller/commission/detail/"+this.busId);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";

.sale-wrapper {
  width: 100%;
  position: relative;
  background: #fff;
  .seller-top {
    width: 100%;
    background: #2e9bff;
    padding: 30/@dev-Width *1rem;
    padding-bottom: 0;
    color: #fff;
    .top-title {
      .fs54;
      padding: 40/@dev-Width *1rem 0 110/@dev-Width *1rem 0;
    }
    .top-div {
      .ik-box;
      .ik-box-pack(justify);
      .ik-box-align(center);
      line-height: 1;
      height: 90/@dev-Width *1rem;
    }
    .detail-button {
      width: 240/@dev-Width *1rem;
      height: 90/@dev-Width *1rem;
      line-height: 90/@dev-Width *1rem;
      border: 1px solid #fff;
      .border-radius(25px);
      .fs40;
      .shop-textc;
    }
    .border-div {
      padding-bottom: 48/@dev-Width *1rem;
      border-bottom: 1px solid #fff;
    }
    .top-nav {
      height: 123/@dev-Width *1rem;
      line-height: 123/@dev-Width *1rem;
    }
  }
  .seller-content {
    .seller-cash {
      width: 100%;
      padding: 54/@dev-Width *1rem 0 0 80/@dev-Width *1rem;
      .seller-cash-item {
        .ik-box;
        .ik-box-pack(justify);
        .ik-box-align(center);
        .cash-div {
          width: 48%;
          .margin-88;
          p:nth-child(2) {
            margin: 25/@dev-Width *1rem 0;
          }
          p:last-child {
            .gray-color;
          }
        }
      }
    }
    .remark1 {
      .margin-88;
      .gray-color;
      padding: 0 35/@dev-Width *1rem 0 30/@dev-Width *1rem;
      font-size: 38/@dev-Width *1rem;
    }
    .remark2 {
      padding: 0 0 73/@dev-Width *1rem 30/@dev-Width *1rem;
    }
    .withdraw-button {
      margin: 0 30/@dev-Width *1rem;
      height: 137/@dev-Width *1rem;
      line-height: 137/@dev-Width *1rem;
      .border-radius(5px);
      color: #fff;
      .shop-textc;
      .fs46;
    }
    .seller-record {
      padding: 28/@dev-Width *1rem;
      line-height: 1;
      p {
        margin-bottom: 60/@dev-Width *1rem;
      }
      div {
        height: 82/@dev-Width *1rem;
        line-height: 82/@dev-Width *1rem;
        width: 100%;
        font-size: 0;
        span {
          .gray-color;
          .fs36;
          display: inline-block;
        }
        span:nth-child(1) {
          width: 42%;
        }
        span:nth-child(2),
        span:nth-child(3) {
          width: 28%;
        }
      }
      .fs40 {
        font-size: 40/@dev-Width *1rem !important;
      }
    }
  }
}
.margin-88 {
  margin-bottom: 88/@dev-Width *1rem;
}
.gray-color {
  color: #666666;
}
.gray-bg {
  background-color: #cdcdcd;
}
.blue-bg {
  background-color: #2e9afd;
}
</style>

  