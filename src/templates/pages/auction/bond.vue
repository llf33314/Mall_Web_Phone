<template>
   <div id='app' class="shop-wrapper payMoney-wapper">
        <section class="payMoney-main">
            <div class="">
                 <div class="payMoney-item border">
                    <div class="payMoney-title fs40">
                        拍品名称
                    </div>
                    <div class="payMoney-txt fs40">
                        iPhone 7
                    </div>
                </div>
                <div class="payMoney-item border">
                    <div class="payMoney-title fs40">
                        支付方式
                    </div>
                    <div class="payMoney-txt fs40">
                        微信支付
                    </div>
                </div>
                <div class="payMoney-item border">
                    <div class="payMoney-title fs40">
                        应付金额
                    </div>
                    <div class="payMoney-txt fs40">
                        ￥200.00
                    </div>
                </div>
            </div>
            <div class="payMoney-item fs40 ">
                <label class="el-checkbox__inner">
                    <input type="checkbox">
                    <span></span> 已阅读
                </label>
                <a class="shopBlue" href="./agreement.html">《用户竞拍服务协议》</a>
            </div>
            <div class="payMoney-buttom fs52">
                <div class="shop-max-button shop-bg" style="color: #fff;">
                    交保证金
                </div>
            </div>
        </section>
        <section class="shop-footer-ab shop-footer">
            <div class="shop-logo"></div>
        </section>
    </div>
</template>

<script>

export default {
    name: 'myAddress',	

    data () {
        return {
            isShow: false
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
.payMoney-wapper{
    background: #fff;
    width: 100%;
    height: 100%;
    .payMoney-main{
        width: 100%;
        padding: 30/@dev-Width *1rem;
        .payMoney-item{
            width: 100%;
            height: 124/@dev-Width *1rem;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(justify);
            line-height: 1;
        }
        .payMoney-buttom{
            margin: 20/@dev-Width *1rem auto 0;
            width: 90%;
            height: 158/@dev-Width *1rem;
        }
    }
}
.el-checkbox__inner{
    input{
        display: block;
        opacity: 0; 
        width: 60/@dev-Width *1rem ;
        height: 50/@dev-Width *1rem ;
        position: absolute;
        z-index: 2;
    }
}
</style>
