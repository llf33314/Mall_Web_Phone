<template>
     <sp-dialog 
        :title="name"
        :visible.sync="isShow"
        :center="'center'">
        <div class="payment-dialog-main"  v-if="dialogList != null && dialogList.length > 0">
            
            <div class="payment-dialog-list shop-box-center border"
                v-for="obj in dialogList"
                @click="selectDialog(obj)" >
                <!-- 折扣券 -->
                <div class="payment-dialog-title shop-box-center" v-if="obj.cardType == 0 ">
                    <i class="iconfont " >{{obj.discount | moneySplit1}}.{{obj.discount | moneySplit2}}折</i>
                    <span class="fs42">{{obj.discount}}折优惠券</span>
                </div>
                <!-- 满减券 -->
                <div class="payment-dialog-title shop-box-center" v-if="obj.cardType == 1 ">
                    <i class="iconfont ">￥{{obj.reduceCost}}</i>
                    <span class="fs42">满{{obj.cashLeastCost}}减{{obj.reduceCost}}</span>
                    <span class="fs42">消费满{{obj.cashLeastCost}}元可用</span>
                </div>
                <i class="iconfont icon-jiantou-copy fs40"></i>
            </div>
        </div>
     </sp-dialog>
</template>
<script>
import spDialog from "components/spDialog";
import filte from "../../../../lib/filters";
export default {
  name: "payWayDialog",
  props: ["name", "dialogList", "type", "busId", "isSelectDiscount"],
  data: function() {
    return {
      list: [],
      isShowDialog: false,
      data: {},
      isShow: true
    };
  },
  components: {
    spDialog
  },
  watch: {
    isShow() {
      this.$emit("update:closeDialog", this.isShow);
      this.$emit("closeDialog-change", this.isShow);
    }
  },
  methods: {
    selectDialog(obj) {
      if (obj.cardType == 0 && this.isSelectDiscount == 1) {
        this.$parent.$parent.$refs.bubble.show_tips("会员折扣和折扣券不能同时使用");
        return;
      }
      this.$emit("selectDialog", [this.type, obj, this.busId]);
      this.isShow = false;
    }
  },
  mounted() {
    console.log("dialogList", this.dialogList);
    this.isShow = true;
  }
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/mixins.less";
@import "../../../../assets/css/base.less";
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
    .icon-weixinzhifu,
    .icon-daodianzhifu,
    .icon-miankuaidi {
      color: #00c901;
    }
    .icon-fenbizhifu,
    .icon-daifukuan,
    .icon-huodaofukuan,
    .icon-chuzhika {
      color: #f7ba2a;
    }
  }
}
</style>

