<template>
    <div class="imgbox">
        <div class="user-head-portrait" 
            :style="{backgroundImage: 'url(' + background + ')'}">
        </div>
        <!-- <img src="../../assets/img/default.png"
             class="default-img"
             v-if="isHeadPortrait==1 && background == undefined"></img>
        <img src="../../assets/img/kuaidiyuan.png"
             class="default-img"
             v-if="isHeadPortrait==0 && background == undefined"></img> -->
            <div v-if="isHeadPortrait==0 && background == undefined" class="default-img">
                 <i class="iconfont icon-tupianjiazaizhong-" style="color:#d6d6d6;"></i>
            </div>
            <div v-if="isHeadPortrait==1 && background == undefined" class="default-img">
                 <i class="iconfont icon-ren1"></i>
            </div>
    </div>
</template>
<script>

export default {
    props:['background','isHeadPortrait'],
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
.imgbox{
    width: 101%;
    height: 101%;
    position: relative;
}
.user-head-portrait{
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    z-index: 1;
}
.default-img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    line-height: 1;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    .iconfont{
        font-size: 200/@dev-Width *1rem;
        // color: #d6d6d6;
        color: #fff;
    }
}
</style>
