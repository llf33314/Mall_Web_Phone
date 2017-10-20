<template>
   <div class="img-upload">
        <i class="iconfont icon-xiangji"></i>
        <p class="fs36">
                上传凭证(最多3张)
        </p>
        <input type="file" @click="readFile"/>
    </div>
</template>
<script>

export default {
    data: function () {
        return {
            imgData:[]
        }
    },
    mounted() {
       
    },
    methods:{
        readFile(){ 
            this.$emit('imgURL',this.imgData);
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/mixins.less';
@import '../../assets/css/base.less';
.img-upload{
    //display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover; 
    background-position: center;
    color: #999;
    border: 2px dashed #999;
    .border-radius(5px);
    text-align: center;
    .ik-box;
    .ik-box-align(center);
    .ik-box-pack(center);
    .ik-box-orient(vertical);
    i{
        font-size: 88/@dev-Width *1rem;
    }
    p{
        width: 75%;
    }
    input{
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        top: 0;
        left: 0;
        opacity: 0;
    }
}
</style>
