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
             <!--isHeadPortrait-0-商品默认图/ 1-用户头像默认图-->
            <div v-if="isHeadPortrait==0" class="default-img1">
                 <i class="iconfont icon-tupianjiazaizhong-" 
                    :style="{'font-size':imgSize+'rem','margin-top':'-'+(imgSize/2)+'rem','margin-left':'-'+(imgSize/2)+'rem'}"></i>
            </div>
            <div v-if="isHeadPortrait==1" class="default-img2" >
                 <i class="iconfont icon-ren1" :style="{'font-size':imgSize+'rem','margin-top':'-'+(imgSize/2)+'rem','margin-left':'-'+(imgSize/2)+'rem'}"></i>
            </div>
    </div>
</template>
<script>

export default {
    name:'defaultImg',
    props:['background','isHeadPortrait','size'],
    data: function () {
        return {
            imgSize : 1.8
        }
    },
    mounted() {
        if(this.size != undefined){
            this.imgSize = this.size;
        }
    },
}
</script>
<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
.imgbox{
    width: 100%;
    height: 100%;
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
.default-img1,
.default-img2{
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
        color:#d6d6d6;
    }
    i{
        position: absolute;
        top: 50%;
        left: 50%;
    }
}
.default-img2{
    background: #eee;
    .iconfont{
        font-size: 150/@dev-Width *1rem;
        color: #cecece;
    }
}
</style>
