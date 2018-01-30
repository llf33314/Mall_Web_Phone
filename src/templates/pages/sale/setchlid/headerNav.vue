<template>
    <div class="shop-header">
        <div class="header-nav fs42">
            <div class="header-itme"  
                v-for="header in headers"
                @click="selects(header.id)"
                :class="{'shop-font':header.id == selectNav || selectId == header.id}"
                :key = "header.id">
                <p v-text="header.name"></p>
                <em class="shop-bg"></em>
            </div>
        </div>
    </div> 
</template>
<script>
export default {
  props: ["headers", "status", "selectId", "isCanSelect"],
  data: function() {
    return {
      selectNav: ""
    };
  },
  mounted() {
    this.selectNav = this.$route.params.type || 0;
  },
  watch: {
    $route() {
      this.selectNav = this.$route.params.type || 0;
      this.onValue(this.selectNav);
    }
  },
  methods: {
    selects(e) {
      if (e == -1) {
        return;
      }
      if (!this.isCanSelect) {
        this.$emit("isCanSelect", e);
        return;
      }
      this.selectNav = e;

      this.onValue(e);
    },
    /** 
    * 传参 
    */
    onValue(e) {
      this.$emit("update:type", e);
      this.$emit("type-change", e);
    }
  }
};
</script>
<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
.shop-header {
  top: 0;
  background: #fff;
  .header-nav {
    height: 148/@dev-Width *1rem;
    em {
      height: 6 /@dev-Width *1rem;
      width: 100%;
      // position: absolute;
      // bottom: 0;
      display: none;
    }
  }
}
.shop-header {
  // position: fixed;
  width: 100%;
  background: #fff;
  .header-nav {
    .ik-box;
    .header-itme {
      position: relative;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(center);
      .ik-box-flex(1);
      .ik-box-orient(vertical);
    }
    a {
      display: block;
      text-align: center;
    }
    .shop-font {
      color: #4e95ef;
    }
    .shop-bg {
      background: #4e95ef;
    }
  }
}
</style>
