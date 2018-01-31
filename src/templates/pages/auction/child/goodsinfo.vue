<template>
    <div class="goodsinfo-box" v-if="obj != null">
        <div class="goodsinfo-img">
            <default-img :background="imgpath+(obj.pro_img_url ||  obj.proImgUrl)"
                        :isHeadPortrait="0" :size="'0.8'">
            </default-img>
        </div>
        <div class="goodsinfo-text">
            <p class="goodsinfo-name">{{obj.pro_name || obj.proName}}
                <em v-if="obj.auc_type != null">{{obj.auc_type == 1 ? "降价拍" : "升价拍"}}</em>
            </p>
            <p class="fs42" v-if="obj.auc_price != null && obj.aucNo == null "> &nbsp;</p>
            <p class="fs42" v-if="obj.auc_price != null ||  obj.marginMoney  != null">保证金：<span class="shop-font">￥{{obj.auc_price || obj.marginMoney | moneySplit1}}.<span class="fs32">{{obj.auc_price || obj.marginMoney | moneySplit2}}</span></span></p>
            <p class="fs42" v-if="obj.aucNo != null">竞拍编号：<span>{{obj.aucNo}}</span></p>
            <p class="fs42" v-if="obj.depositMoney != null">定金：<span>{{obj.depositMoney}}</span></p>
            <p class="fs42" v-if="obj.depositNo != null">定金编号：<span>{{obj.depositNo}}</span></p>
        </div>
    </div>
</template>

<script>
// import filters from "@/lib/filters";
export default {
  props: ["obj", "imgpath"],
  components: {
  },
  watch: {
    obj(a, b) {
      this.datas = a;
    }
  },
  data() {
    return {
      datas: "",
      busId: this.$route.params.busId || sessionStorage.getItem("busId")
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
@import  (reference) "~assets/css/common.less";
.goodsinfo-box {
  width: 100%;
  position: relative;
  padding: 30/@dev-Width * 1rem 48/@dev-Width * 1rem;
  .clearfix;
  .goodsinfo-img {
    float: left;
    width: 265/@dev-Width * 1rem;
    height: 265/@dev-Width * 1rem;
    overflow: hidden;
  }
  .goodsinfo-text {
    float: right;
    width: 70%;
    .pro-price {
      span:first-child {
        margin-right: 10/@dev-Width * 1rem;
      }
    }
  }
  .goodsinfo-name {
    width: 100%;
    height: 116/@dev-Width * 1rem;
    .fs42;
    margin-bottom: 25/@dev-Width * 1rem;
    em {
      border: 1px solid #e4393c;
      color: #e4393c;
      .fs36;
      padding: 10/@dev-Width * 1rem 20/@dev-Width * 1rem;
      .border-radius(5px);
      line-height: 1;
    }
  }
}
</style>
