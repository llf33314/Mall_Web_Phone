<template>
     <sp-dialog 
        :title="name"
        :visible.sync="isCardRecevie"
        :center="'center'">
        <div class="payment-dialog-main"  v-if="list != null && list.length > 0">
            
            <div class="payment-dialog-list shop-box-center border"
                v-for="obj in list">
                <div class="payment-dialog-title shop-box-center">
                    <i class="iconfont icon-alipay"></i>
                    <span class="fs42">支付宝支付</span>
                </div>
                <i class="iconfont icon-jiantou-copy fs40"></i>
            </div>
            <!-- <div class="payment-dialog-list shop-box-center border">
                <div class="payment-dialog-title shop-box-center">
                    <i class="iconfont icon-weixinzhifu"></i>
                    <span class="fs42">微信支付</span>
                </div>
                <i class="iconfont icon-jiantou-copy fs40"></i>
            </div>
                <div class="payment-dialog-list shop-box-center border">
                <div class="payment-dialog-title shop-box-center">
                    <i class="iconfont icon-daifukuan-"></i>
                    <span class="fs42">找人代付</span>
                </div>
                <i class="iconfont icon-jiantou-copy fs40"></i>
            </div>
            <div class="payment-dialog-list shop-box-center border">
                <div class="payment-dialog-title shop-box-center">
                    <i class="iconfont icon-chuzhiqia"></i>
                    <span class="fs42">储值卡支付</span>
                </div>
                <i class="iconfont icon-jiantou-copy fs40"></i>
            </div>
            <div class="payment-dialog-list shop-box-center border">
                <div class="payment-dialog-title shop-box-center">
                    <i class="iconfont icon-fen"></i>
                    <span class="fs42">粉币支付</span>
                </div>
                <i class="iconfont icon-jiantou-copy fs40"></i>
            </div>
            <div class="payment-dialog-list shop-box-center border">
                <div class="payment-dialog-title shop-box-center">
                    <i class="iconfont icon-huodaofukuan"></i>
                    <span class="fs42">货到付款</span>
                </div>
                <i class="iconfont icon-jiantou-copy fs40"></i>
            </div> -->
        </div>
     </sp-dialog>
</template>
<script>
import spDialog from "components/spDialog";
export default {
  name: "payWayDialog",
  props: ["name", "dialogList"],
  data: function() {
    return {
      list: [],
      isShowDialog: false,
      data: {},
      type: 0
    };
  },
  components: {
    spDialog
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
.payment-dialog-main {
  width: 100%;
  .payment-dialog-list {
    width: 100%;
    padding: 30/@dev-Width *1rem;
    font-size: 0;
    i.icon-jiantou-copy {
      color: #c7c7cc;
    }
    .payment-dialog-title {
      i {
        display: block;
        font-size: 95/@dev-Width *1rem;
      }
      span {
        display: block;
        margin-left: 30/@dev-Width *1rem;
      }
    }
    .icon-alipay {
      color: #08aaeb;
    }
    .icon-weixinzhifu {
      color: #00c901;
    }
    .icon-fen,
    .icon-daifukuan-,
    .icon-huodaofukuan,
    .icon-chuzhiqia {
      color: #f7ba2a;
    }
  }
}
</style>

