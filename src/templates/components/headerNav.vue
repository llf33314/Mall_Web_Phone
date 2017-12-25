<template>
    <div class="shop-header">
        <div class="header-nav fs42">
            <div class="header-itme"  
                v-for="header in headers"
                @click="selects(header.id)"
                :class="[header.id == selectNav ? selectFontColor : '']"
                :key = "header.id">
                <p v-text="header.name"></p>
                <em :class="[selectbg ? selectbg : 'shop-bg']"></em>
            </div>
        </div>
    </div> 
</template>
<script>
export default {
  props: ["headers", "status", "selectColor","selectbg"],
  data: function() {
    return {
      selectNav: "",
      selectFontColor: "shop-font"
    };
  },
  mounted() {
    this.selectNav = this.$route.params.type || 0;
    this.selectFontColor = this.selectColor || "shop-font";
    console.log(this.selectFontColor,"selectFontColor",this.selectNav)
  },
  watch: {
    $route() {
      this.selectNav = this.$route.params.type || 0;
    }
  },
  methods: {
    selects(e) {
      if (e == -1) {
        return;
      }
      this.selectNav = e;
      let busId = this.$route.params.busId;
      let shopId = this.$route.params.shopId;

      if (this.status === "order") {
        this.$router.push("/order/list/" + busId + "/" + e);
        return;
      }
      if (this.status === "cart") {
        console.log("cart", e);
        this.$router.push("/cart/" + shopId + "/" + busId + "/" + e);
        return;
      }
      this.onValue(e);
    },
    /** 
    * 传参 
    */
    onValue(e) {
      this.$emit("change", e);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
.shop-header {
  top: 0;
  background: #fff;
  .header-nav {
    height: 148/@dev-Width *1rem;
    em {
      height: 6 /@dev-Width *1rem;
      width: 100%;
      position: absolute;
      bottom: 0;
      display: none;
    }
  }
}
.shop-header {
  position: fixed;
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
  }
}
.style-main-font{
  em{
    display: block!important;
  }
}
</style>
