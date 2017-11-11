<template>
    <div class="sp-dialog" v-show="visible" @click.self="handleClose">
        <div class="sp-dialog-main">
            <div class="sp-dialog-title border">
                    <div class="text-overflow fs40">{{title}}</div>
                    <i class="iconfont icon-guanbi fs40"
                     @click="handleClose"></i>
            </div>
            <div class="sp-dialog-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
  

  export default {
    name: 'splDialog',
    props: {
      title: {
        type: String,
        default: true
      },
      visible: {
        type: Boolean,
        default: true
      },
    },

    watch: {
      visible(val) {
        if(val){
            this.commonFn.disableScroll();
        }else{
            this.commonFn.allowScroll();
        }
      }
    },

    computed: {

    },

    methods: {
       handleClose(){
            this.$emit('update:visible', false);
            this.$emit('visible-change', false);
        }
    },

    mounted() {
      
    }
  };
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
.sp-dialog{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    .sp-dialog-main{
        width: 100%;
        position: absolute;
        background: #fff;
        bottom: 0;
        animation: dialogShow 0.2s;
        -moz-animation: dialogShow 0.2s;	/* Firefox */
        -webkit-animation: dialogShow 0.2s;
    }
    .sp-dialog-title{
        font-size: 0;
        width: 100%;
        padding-left:  30/@dev-Width *1rem;
        .ik-box;
        .ik-box-pack(justify);
        .ik-box-align(center);
        div{
            padding: 30/@dev-Width *1rem 0;
            width: 85%;
        }
        &>i{
            padding: 30/@dev-Width *1rem;
            display: block;
        }
    }
}
@keyframes dialogShow{
    from {bottom: -100%;}
    to {bottom: 0%;}
}
@-moz-keyframes dialogShow{ /* Firefox */
    from {bottom: -100%;}
    to {bottom: 0%;}
}
@-webkit-keyframes dialogShow{/* Safari 和 Chrome */
    from {bottom: -100%;}
    to {bottom: 0%;}
}
/*
 <sp-dialog 
    :title="'卡卷包'"标题
    :visible.sync="isCardRecevie">
       内容
    </sp-dialog>
*/
</style>

