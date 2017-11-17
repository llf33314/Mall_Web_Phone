<template>
     <sp-dialog 
        :title="name"
        :visible.sync="isShow"
        :center="'center'">
        <div class="payment-dialog-main"  v-if="dialogList != null && dialogList.length > 0">
            
            <div class="payment-dialog-list shop-box-center border"
                v-for="obj in dialogList"
                @click="selectDialog(obj)" >
                 <i class="  fs40 shop-font" :class="[selectData == obj.id ? 'icon-yigouxuan iconfont' : 'icon-yuangy']"></i>
                <div class="payment-dialog-title shop-box-center">
                    <span class="fs42">{{obj.visitAddressDetail}}</span>
                </div>
                <!-- <i class="iconfont icon-dui1 fs40 shop-font" v-if="selectData == obj.id"></i>
                 <i class="iconfont  fs40 shop-font" v-else></i> -->
            </div>
        </div>
     </sp-dialog>
</template>
<script>
import spDialog from "components/spDialog";
export default {
  name: "payWayDialog",
  props: ["name", "dialogList", "type", "busId", "selectData"],
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
      this.$emit("selectDialog", [this.type, obj, this.busId]);
      this.isShow = false;
    }
  },
  mounted() {
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
      width: 92%;
      text-align: justify;
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
    .icon-chuzhika,
    .icon-daodianziti {
      color: #f7ba2a;
    }
    .icon-yuangy {
      display: block;
      width: 70/@dev-Width *1rem;
      height: 70/@dev-Width *1rem;
      border: 1px solid #c9c9c9;
      .border-radius(100%);
    }
    .icon-yigouxuan {
      font-size: 76/@dev-Width *1rem;
    }
  }
}
</style>

