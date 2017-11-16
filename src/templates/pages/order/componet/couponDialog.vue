<template>
     <sp-dialog 
        :title="name"
        :visible.sync="isShow"
        :center="'center'">
        <div class="scroll">
            
            <div class="coupon-box" v-if="dialogList != null && dialogList.length > 0">
                <div class="coupon-item clearfix"  
                  v-for="obj in dialogList"
                  >
                    <div class="coupon-item-letf">
                        <!--span里面是大字体-->
                        <p v-if="obj.cardType == 1">￥<span>{{obj.reduceCost}}</span></p>
                        <p v-if="obj.cardType == 0"><span>{{obj.discount*10 | moneySplit1}}</span>.{{obj.discount*10 | moneySplit2}}折</p>
                    </div>
                    <div class="coupon-item-center">
                        <div>
                            <div class="coupon-item-title fs50">{{obj.couponsName}}</div>
                            <div class="coupon-item-text">
                                <p class="fs36" v-if="obj.cardType == 1">消费满{{obj.cashLeastCost}}元可用</p>
                                <p class="fs36">有效期：2017/10/1~2017/11/1</p>
                            </div>
                        </div>
                    </div>
                    <div class="coupon-item-rigth" @click="selectDialog(obj)">
                        <span class="fs60">使用</span>
                    </div>
                </div>
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
.scroll {
  width: 100%;
  max-height: 94vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.coupon-box {
  width: 100%;
  padding: 0 38/@dev-Width *1rem;
  .coupon-item {
    width: 100%;
    height: 339/@dev-Width *1rem;
    background: url("../../../../assets/img/coupon_bg.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 36/@dev-Width *1rem;
    & > div {
      height: 100%;
      float: left;
      .ik-box;
      .ik-box-align(center);
    }
    .coupon-item-letf {
      width: 28%;
      font-size: 80/@dev-Width *1rem;
      color: #fff;
      .ik-box-pack(center);
      span {
        font-size: 120/@dev-Width *1rem;
      }
    }
    .coupon-item-center {
      width: 53%;
      padding: 0 40/@dev-Width *1rem;
      .coupon-item-title {
        width: 100%;
        margin-bottom: 52/@dev-Width *1rem;
      }
      .coupon-item-text {
        width: 100%;
        color: #999;
      }
    }
    .coupon-item-rigth {
      width: 19%;
      span {
        display: block;
        margin: 0 auto;
        width: 60/@dev-Width *1rem;
        color: #ff4949;
      }
    }
  }
}
</style>

