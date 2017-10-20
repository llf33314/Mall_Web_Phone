<template>
    <div class="imgbox">
        <div class="user-head-portrait" 
            :style="{backgroundImage: 'url(' + background + ')'}">
        </div>
        <img src="../../assets/img/default.png" 
             class="default-img"
             v-if="isHeadPortrait==1 && background==''"></img>
        <img src="../../assets/img/kuaidiyuan.png" 
             class="default-img"
             v-if="isHeadPortrait==0 && background==''"></img>
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
}
</style>
