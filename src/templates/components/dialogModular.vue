<template>
  <transition name="dialog">
    <section class="shop-dialog" v-show="isShow">
      <div class="dialog-main">
        <div class="dialog-content">
          <p class="dialog-title fs50"
              v-text="dialogTitle">
          </p>
        </div>
        <slot></slot>
      </div>
    </section>
  </transition>
</template>
<script>

export default {
    props:['dialogTitle'],
    data: function () {
        return {
            isShow: true,
        }
    }, 
    methods: {
    }    
}
</script>

<style lang="less" scoped>
@import '../../assets/css/mixins.less';
@import '../../assets/css/base.less';
.shop-dialog{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
    .ik-box;
    .ik-box-align(center);
    .ik-box-pack(center);
    .dialog-main{
        width: 90%;
        background: #fff;
        margin: 0 auto;
        .border-radius(5px);
        animation: dialogShow 0.25s;
        -moz-animation: dialogShow 0.25s;	/* Firefox */
        -webkit-animation: dialogShow 0.25s;
        .dialog-content{
            text-align: center;
            padding: 60/@dev-Width *1rem ;
            // .dialog-title{
            //     margin-bottom: 80/@dev-Width *1rem ;
            // }
        }
        .dialog-bottom{
            width: 100%;
            font-size: 0;
            display: -webkit-box;
            .dialog-button{
                text-align: center;
                .ik-box;
                .ik-box-flex(1);
                .ik-box-pack(center);
                color: #25ae5f;
                padding: 45/@dev-Width *1rem 0;
            }
            &>span:nth-child(2){
                border-left:1px solid #e2e2e2; 
            }
        }
    }
}
@keyframes dialogShow{
    from {transform: scale(0)}
    to {transform: scale(1)}
}
@-moz-keyframes dialogShow{ /* Firefox */
    from {transform: scale(0)}
    to {transform: scale(1)}
}
@-webkit-keyframes dialogShow{/* Safari 和 Chrome */
    from {transform: scale(0)}
    to {transform: scale(1)}
}

</style>
