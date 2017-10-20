<template>
    <header class="shop-header">
      <div class="header-nav fs42">
        <div class="header-itme"  
            v-for="header in headers">
          <p v-text="header"></p>
          <em class="shop-bg"></em>
        </div>
      </div>
    </header> 
</template>
<script>

export default {
    props:['headers'],
    data: function () {
        return {

        }
    },
    mounted() {
       
    },
}
</script>
<style lang="less" scoped>

@import '../../assets/css/mixins.less';
@import '../../assets/css/base.less';
.shop-header{
    top: 0;
    background: #fff;
    .header-nav{
        height: 148/@dev-Width *1rem;
        em{
            height: 6 /@dev-Width *1rem;
            width: 100%;
            position: absolute;
            bottom: 0;
            display: none;
        }
    }
}
.shop-header{
    position: fixed;
    width: 100%;
    background: #fff;
    .header-nav{
        .ik-box;
        .header-itme{
            position: relative;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(center);
            .ik-box-flex(1);
            .ik-box-orient(vertical);
        }
        a{
            display: block;
            text-align: center
        }
    }
}
</style>
