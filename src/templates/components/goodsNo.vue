<template>
   <section class="goods-no">
        <i class="iconfont icon-zanwushuju"></i>
        <p>没有找到相关的商品</p>
    </section>
</template>
<script>

export default {
    props:['statu'],
    data: function () {
        return {

        }
    },
    mounted() {
       
    },
}
</script>
<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
.goods-no{
    width: 100%;
    color: #ccc;
    text-align: center;
    margin-top: 118/@dev-Width *1rem;
    i{
        font-size: 360/@dev-Width *1rem ;
        margin-left: 55/@dev-Width *1rem ;
    }
    p{
        font-size: 42/@dev-Width *1rem ;
        text-align: center;
    }
}

</style>
