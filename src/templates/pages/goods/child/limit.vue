<template>
    <div class="goods-selected-main" >
        <div class="fs40" v-text="'已选 '+data+' '+spec_num+'份 '">
        </div> 
        <i class="iconfont icon-jiantou-copy shopGray"></i>
    </div>
</template>

<script>
export default {
  props: ["row", "num"],
  watch: {
    row(a, b) {
      this.data = a;
    },
    num(a, b) {
      this.spec_num = a;
    }
  },
  data() {
    return {
      data: "",
      spec_num: ""
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
@import (reference) "~assets/css/base.less";
@import (reference) "~assets/css/mixins.less";
@import (reference) "~assets/css/common.less";
.goods-selected-main {
  width: 100%;
  .ik-box;
  .ik-box-align(center);
  .ik-box-pack(justify);
  i {
    color: #c7c7cc;
  }
}
</style>
