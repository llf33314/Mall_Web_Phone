<template>
    <div class="refund-dialog shop-show" v-if="dialogList != null" >
        <div class="dialog-main">
            <div class="dialog-content">
                <p class="fs46 dialog-title border">退款原因</p>
                <div class="dialog-ul">
                    <div class="refund-list border" v-for="item in dialogList"
                    @click="selectDialog(item)">
                        <p class="fs46">{{item.value}}</p>
                        <p class="dialog-option">
                            <i class="iconfont" :class="[data.id == item.id,'icon-yes','icon-dui']"></i>
                        </p>
                    </div>
                </div>
            </div>
            <div class="shop-footer comment-footer1">
                <div class="shop-max-button fs52 shop-bg" @click="closeDialog">
                    关 闭
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
  props: ["dialogList", "selectData"],
  data: function() {
    return {
      list: [],
      isShowDialog: false,
      data: {}
    };
  },
  watch: {
    selectData() {
      this.data = this.selectData;
    }
  },
  mounted() {
    this.list = this.dialogList;
    this.data = this.selectData;
    console.log(this.selectData, "selectData");
  },
  methods: {
    selectDialog(data) {
      this.$emit("selectEvent", data);
    },
    closeDialog() {
      this.$emit("closeDialog", false);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/mixins.less";
@import "../../../../assets/css/base.less";
.refund-dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  .dialog-main {
    width: 100%;
    position: absolute;
    background: #fff;
    bottom: 0;
    animation: dialogShow 0.2s;
    -moz-animation: dialogShow 0.2s; /* Firefox */
    -webkit-animation: dialogShow 0.2s;
  }
  .dialog-content {
    width: 100%;
    padding: 35/@dev-Width *1rem 0 88/@dev-Width *1rem 50/@dev-Width *1rem;
  }
  .dialog-title {
    width: 100%;
    text-align: center;
    padding-bottom: 50/@dev-Width *1rem;
  }
  .dialog-ul {
    width: 100%;
    .refund-list {
      height: 117/@dev-Width *1rem;
      padding-left: 0;
    }
    & > div:last-child {
    }
  }
  .dialog-option {
    width: 60/@dev-Width *1rem;
    height: 60/@dev-Width *1rem;
    .border-radius(100%);
    border: 1px solid #c7c7cc;
    text-align: center;
    line-height: 60/@dev-Width *1rem;
    & > i {
      color: #fff;
    }
  }
  .selected {
    border: 0;
    background: #e4393c;
  }
}
.refund-list {
  font-size: 0;
  width: 100%;
  height: 145 / @dev-Width *1rem;
  .ik-box;
  .ik-box-pack(justify);
  .ik-box-align(center);
  padding-left: 50/@dev-Width *1rem;
  padding-right: 40/@dev-Width *1rem;
  i {
    color: #c7c7cc;
    font-size: 42/@dev-Width *1rem;
  }
}
.comment-footer1 {
  .shop-max-button {
    height: 134/@dev-Width *1rem;
    .border-radius(0);
  }
}
</style>
