<template>
    <div class="shop-wrapper refund-wrapper">
        <div class="refund-main comment-main">
            <section class="refund-passheader clearfix">
                <div class="header-title fs46">
                    <i class="iconfont icon-dui"></i>退款完成
                </div>
                <p class="fs46">退款金额: <span class="shopGray">￥7,199.00</span></p>
                <p class="fs46">退款时间: <span class="shopGray">2017-6-27  16:58</span></p>
            </section>
            <section class="refund-pass">
                <div class="refund-list border">
                    <p class="fs46">协商详情：</p>
                    <i class="iconfont icon-jiantou-copy"></i>
                </div>
                <div class="refund-list border">
                    <p class="fs46"><span class="shopGray">店铺名称</span> hipoh旗舰店</p>
                </div>
                <div class="refund-list border">
                    <p class="fs46"><span class="shopGray">退款类型</span> 退货退款</p>
                </div>
                <div class="refund-list border">
                    <p class="fs46"><span class="shopGray">退款金额</span> ￥7,199.00</p>
                </div>
            </section>

            <section class="shop-footer-fixed comment-footer1">
                <div class="shop-max-button fs52 shop-bg">
                    完成
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Lib from 'assets/js/Lib';
import divTextarea from '../../../components/divTextarea'
export default {
    name: 'address',	
    data () {
        return {
        }
    },
    mounted() {
       //todo 组件 divTextarea数据传出
    },
    components:{
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>

@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
/**------vars------*/
.ik-box {
    display: -webkit-box;
    display: -moz-box;
    display: -o-box;
    display: box;
}

.refund-wrapper {
    width: 100%;
}
.refund-wrapper .refund-main {
    position: relative;
    width: 100%;
    padding-bottom: 1.1rem;
}
.refund-wrapper section {
    width: 100%;
    background: #fff;
    margin-bottom: 0.2rem;
}

.refund-wrapper .refund-list {
    font-size: 0;
    width: 100%;
    height: 0.96666667rem;
    display: -webkit-box;
    display: -moz-box;
    display: -o-box;
    display: box;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    box-pack: justify;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    box-align: center;
    padding-left: 0.33333333rem;
    padding-right: 0.26666667rem;
}
.refund-wrapper .refund-list i{
    color: #c7c7cc;
    font-size: 0.28rem;
}
.comment-footer1{
    .shop-max-button{
        height: 134/@dev-Width *1rem;
        .border-radius(0);
    }
}
.refund-wrapper .shop-footer-fixed {
    margin: 0;
}
.refund-wrapper section {
    width: 100%;
    background: #fff;
    margin-bottom: 0.2rem;
}

.shop-footer-fixed, .shop-header {
    position: fixed;
    width: 100%;
    background: #fff;
}
.shop-footer-fixed {
    bottom: 0;
}
.refund-wrapper .refund-input {
    width: 80%;
    display: block;
    height: 100%;
    border: 0;
}
.refund-wrapper .refund-money {
    width: 100%;
}
.refund-wrapper .refund-money > div:nth-child(2) {
    background: #ededed;
    color: #999;
}
.refund-wrapper .refund-photo {
    width: 100%;
    padding: 0.31333333rem;
}
.refund-wrapper .refund-passheader {
    width: 100%;
    height: 2.53333333rem;
    padding: 0 0.4rem;
    display: -webkit-box;
    display: -moz-box;
    display: -o-box;
    display: box;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -o-box-pack: center;
    box-pack: center;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    box-orient: vertical;
    background-image: -webkit-gradient(linear, 50% 0, 0 100%, from(transparent), color-stop(0.5, transparent), color-stop(0.5, #f0f2f5), to(#f0f2f5)), -webkit-gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(0.5, transparent), color-stop(0.5, #f0f2f5), to(#f0f2f5));
    background-image: -moz-linear-gradient(50% 0 -45deg, transparent, transparent 50%, #f0f2f5 50%, #f0f2f5), -moz-linear-gradient(50% 0 -135deg, transparent, transparent 50%, #f0f2f5 50%, #f0f2f5);
    background-size: 11px 7px;
    background-repeat: repeat-x;
    background-position: 0 100%;
}
.refund-wrapper .refund-passheader .header-title {
    font-weight: bold;
    margin-bottom: 0.4rem;
}
.refund-wrapper .refund-passheader .header-title i {
    border: 2px solid #e4393c;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    color: #e4393c;
    font-weight: 100;
    padding: 0.06rem;
    font-size: 0.32rem;
    margin-right: 0.13333333rem;
}
.refund-wrapper .refund-passheader > p {
    width: 100%;
    margin: 0.03333333rem 0;
}
.refund-wrapper .shop-footer-fixed {
    margin: 0;
}
.refund-wrapper .refund-dialog {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
}
.refund-wrapper .refund-dialog .dialog-main {
    width: 100%;
    position: absolute;
    background: #fff;
    bottom: 0;
    animation: dialogShow 0.2s;
    -moz-animation: dialogShow 0.2s;
    /* Firefox */
    -webkit-animation: dialogShow 0.2s;
}
.refund-wrapper .refund-dialog .dialog-content {
    width: 100%;
    padding: 0.23333333rem 0 0.58666667rem 0.33333333rem;
}
.refund-wrapper .refund-dialog .dialog-title {
    width: 100%;
    text-align: center;
    padding-bottom: 0.33333333rem;
}
.refund-wrapper .refund-dialog .dialog-ul {
    width: 100%;
}
.refund-wrapper .refund-dialog .dialog-ul .refund-list {
    height: 0.78rem;
    padding-left: 0;
}
.refund-wrapper .refund-dialog .dialog-option {
    width: 0.4rem;
    height: 0.4rem;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 1px solid #c7c7cc;
    text-align: center;
    line-height: 0.4rem;
}
.refund-wrapper .refund-dialog .dialog-option > i {
    color: #fff;
}
.refund-wrapper .refund-dialog .selected {
    border: 0;
    background: #e4393c;
}

</style>
