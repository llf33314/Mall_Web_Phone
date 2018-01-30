<template>
  <section class="grounpShare-main">
      <div class="grounpShare-bg" :style="{backgroundImage: 'url(' + grounpShare + ')'}">
          <img :src="grounpShare">
      </div>
      <div class="grounpShare-botton-box">
        <div class="grounpShare-botton">
            我知道了
        </div>
      </div>
  </section>
</template>

<script>

import grounpSharebg from "assets/img/grounpShare.png"
//import grounpShare from "./grounpShare"//分享
export default {
    data() {
        return {
            grounpShare: grounpSharebg
        };
    },
    components: {
    },
    mounted() {
       
    },
    beforeDestroy() {
        
    },
    methods: {
       
    }
}
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
@import  (reference) "~assets/css/common.less";
.grounpShare-main{
    width: 100%;
    position:fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    top:0;
    left: 0;
    .grounpShare-bg{
        background-size: 100% 100%;
        img{
            width: 100%;
            height: auto;
            opacity: 0;
        } 
    }
    .grounpShare-botton-box{
        width: 100%;
        position: absolute;
        bottom: 293 /@dev-Width * 1rem;
    }
    .grounpShare-botton{
        margin: 0 auto;
        width: 405/@dev-Width * 1rem;
        border: 10/@dev-Width * 1rem solid #f9ddab;
        padding: 50/@dev-Width * 1rem;
        line-height: 1;
        .border-radius(50px);
        background: #fff7e9;
        font-size: 68 /@dev-Width * 1rem;
        
    }
}
</style>
