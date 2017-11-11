<template>
    <div class="shop-header">
        <div class="header-nav fs42">
            <div class="header-itme"  
                v-for="header in headers"
                @click="selects(header.id)"
                :class="{'shop-font':header.id == selectNav}"
                :key = "header.id">
                <p v-text="header.name"></p>
                <em class="shop-bg"></em>
            </div>
        </div>
    </div> 
</template>
<script>
export default {
  props: ["headers","status"],
  data: function() {
    return {
      selectNav: ""
    };
  },
  mounted() {
    this.selectNav = this.$route.params.type;
  },
  methods: {
    selects(e) {
      this.selectNav = e;
      let busId = this.$route.params.busId;
      let shopId = this.$route.params.shopId;
      
      if(this.status === 'order' ){
        this.$router.push('/order/list/'+ busId + "/" + e);
        return
      }
      if(this.status === 'cart' ){
        console.log('cart',e)
        this.$router.push('/cart/'+shopId+'/'+ busId + "/" + e);
        return
      }
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
</style>
