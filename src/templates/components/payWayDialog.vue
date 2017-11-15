<template>
     <sp-dialog 
        :title="name"
        :visible.sync="isShow"
        :center="'center'">
        <div class="payment-dialog-main"  v-if="dialogList != null && dialogList.length > 0">
            
            <div class="payment-dialog-list shop-box-center border"
                v-for="obj in dialogList"
                @click="selectDialog(obj)" >
                <div class="payment-dialog-title shop-box-center">
                    <i class="iconfont " :class="'icon-'+obj.claName"></i>
                    <span class="fs42">{{obj.wayName}}</span>
                </div>
                <i class="iconfont icon-jiantou-copy fs40"></i>
            </div>
        </div>
     </sp-dialog>
</template>
<script>
import spDialog from "components/spDialog";
export default {
  name: "payWayDialog",
  props: ["name", "dialogList", "type","busId"],
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
      selectDialog(obj){
          this.$emit("selectDialog",[this.type,obj,this.busId]);
          this.isShow = false;
      }
  },
  mounted() {
    this.isShow = true;
  }
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

