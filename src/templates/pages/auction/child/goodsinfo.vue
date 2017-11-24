<template>
    <div class="goodsinfo-box">
        <div class="goodsinfo-img">
            <default-img :background="a"
                        :isHeadPortrait="1">
            </default-img>
        </div>
        <div class="goodsinfo-text">
            <p class="goodsinfo-name">这是一条很长的商品名称超级长商品名称商 品名称转行
                <em>升价拍</em>
            </p>
            <p class="fs42">保证金 &nbsp;：<span class="shop-font">￥200.<span class="fs32">00</span></span></p>
            <p class="fs42">竞拍编号：<span>GLC1335133154512</span></p>
        </div>
    </div>
</template>

<script>
import defaultImg from 'components/defaultImg'
export default {
    porps:[],
    components:{
	  defaultImg
    },
    data () {
        return {
           
        }
    },
    mounted() {
        
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
@import '../../../../assets/css/mixins.less';
@import '../../../../assets/css/base.less';
@import '../../../../assets/css/common.less';
.goodsinfo-box{
    width: 100%;
    position: relative;
    padding: 30/@dev-Width * 1rem 48/@dev-Width * 1rem;
    .clearfix;
    .goodsinfo-img{
        float: left;
        width: 265/@dev-Width * 1rem;
        height: 265/@dev-Width * 1rem;
        overflow: hidden;
    }
    .goodsinfo-text{
        float: right;
        width: 70%;
    }
    .goodsinfo-name{
        width: 100%;
        .fs42;
        margin-bottom: 25/@dev-Width * 1rem;
        em{
            border: 1px solid #e4393c;
            color: #e4393c;
            .fs36;
            padding: 10/@dev-Width * 1rem 20/@dev-Width * 1rem;
            .border-radius(5px);
            line-height: 1;
        }
    }
}
</style>
