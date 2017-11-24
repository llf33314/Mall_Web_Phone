<template>
   <div class="shop-wrapper mybond-wapper">
        <header-nav :headers= "homeNav" style="z-index:3"
                    @change="handleChange">
        </header-nav>
        <div class="mybond-main">
            <div class="mybond-item">
                <p class="mybond-item-title fs42 border">
                    <span>竞拍成功，已转订单</span>
                    <span class="mybond-item-bottom shop-bg">转订单</span>
                </p>
                <div class="border">
                    <goods-info></goods-info>
                </div>
                <p class="mybond-item-time">
                    竞拍时间：2017-07-12 03:20
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import headerNav from 'components/headerNav'
import goodsInfo from './child/goodsinfo' //商品信息
export default {	
    components:{
	  headerNav,goodsInfo
    },
    data () {
        return {
            homeNav:[
            { id: 0, name: "我的竞拍" },
            { id: 1, name: "我的保证金" },
            { id: 3, name: "我的获拍" }
            ],
        }
    },
    mounted() {
        
    },
    methods: {
        /** 
         * 页头导航接值
         */
        handleChange(value){
            console.log(value);
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
@import '../../../assets/css/common.less';
.mybond-main{
    width: 100%;
    position: relative;
    padding-top:148/@dev-Width *1rem;
    .mybond-item{
        width: 100%;
        margin-top: 20/@dev-Width *1rem;
        background: #fff;
    }
    .mybond-item-title{
        padding: 9/@dev-Width *1rem 48/@dev-Width *1rem;
        .shop-box-center;
        span{
            display: block;
            padding: 18/@dev-Width *1rem 0;
        }
        span.mybond-item-bottom{
            padding: 18/@dev-Width *1rem 38/@dev-Width *1rem;
            .border-radius(5px);
        }
    }
    .mybond-item-time{
        text-align: right;
        .fs42;
        padding: 25/@dev-Width *1rem  50/@dev-Width *1rem 45/@dev-Width *1rem 0;
    }
}
</style>
