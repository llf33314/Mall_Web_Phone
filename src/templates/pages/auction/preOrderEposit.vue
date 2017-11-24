<template>
    <div class="eposit-main">
        <div class="eposit-content">
            <p class="fs50 eposit-title">订单信息</p>
            <p class="fs40 border">预订商品:</p>
            <div class="eposit-goods border">
                <goods-info></goods-info>
            </div>
            <p class="eposit-money">
                <span class="">支付定金:</span>
                <span class="shop-font">￥200.<i class="fs32">00</i></span>
            </p>
        </div>
        <div class="eposit-bottom shop-bg">
            交定金
        </div>
    </div>
</template>

<script>
import goodsInfo from './child/goodsinfo' //商品信息
export default {
    components:{
	  goodsInfo
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
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
@import '../../../assets/css/common.less';
.eposit-main{
    width: 100%;
    .eposit-content{
        width: 100%;
        background: #fff;
        &>p:nth-child(2){
            padding:20/@dev-Width *1rem 30/@dev-Width *1rem;
        }
    }
    .eposit-title{
        width: 100%;
        text-align: center;
        padding: 50/@dev-Width *1rem 0 0;
    }
    .eposit-money{
        .shop-box-center;
        padding: 28/@dev-Width *1rem 30/@dev-Width *1rem;
        span{
            .shop-show;
            .fs40;
        }
    }
    
    .eposit-bottom{
        width: 95%;
        margin: 104/@dev-Width *1rem auto 0;
        height: 120/@dev-Width *1rem;
        .border-radius(5px);
        .ik-box;
        .ik-box-align(center);
        .ik-box-pack(center);
        .fs50;
    }
}
</style>
