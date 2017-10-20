
<template>
    <div class="shop-wrapper sale-wrapper">
        <header class="sale-header">
            <div class="header-img">
                <default-img :background="background"
                            :isHeadPortrait="1">
                </default-img>
            </div>
            <p class="fs60">权律二</p>
        </header>
        <div class="index-main">
            <div class="index-msg border">
                <div class="index-msg-item">
                    <p class="index-msg-title fs46">累计佣金(元)</p>
                    <p class="index-msg-money fs70">0.00</p>
                </div>
                <div class="index-msg-item">
                    <p class="index-msg-title fs46">积分</p>
                    <p class="index-msg-money fs70">0.00</p>
                </div>
                <div class="index-msg-item">
                    <p class="index-msg-title fs46">销售总额(元)</p>
                    <p class="index-msg-money fs70">0.00</p>
                </div>
            </div>
            <div class="index-nav clearfix">
                <div class="nav-item">
                    <div class="nav-icon">
                        <i class="iconfont icon-shangdian"></i>
                    </div>
                    <p class="fs40">我的商城</p>
                    <p class="fs40">&nbsp</p>
                </div>
                <div class="nav-item">
                    <div class="nav-icon">
                        <i class="iconfont icon-paixingbang"></i>
                    </div>
                    <p class="fs40">销售员排行榜</p>
                    <p class="fs40">&nbsp</p>
                </div>
                <div class="nav-item">
                    <div class="nav-icon">
                        <i class="iconfont icon-kehu"></i>
                    </div>
                    <p class="fs40">我的客户 <br/>
                        <span class="shop-font">0</span><span class="shopGray">个</span></p>
                </div>
                <div class="nav-item">
                    <div class="nav-icon">
                        <i class="iconfont icon-icon182"></i>
                    </div>
                    <p class="fs40">二维码</p>
                    <p class="fs40">&nbsp</p>
                </div>
                <div class="nav-item">
                    <div class="nav-icon">
                        <i class="iconfont icon-icon-test"></i>
                    </div>
                    <p class="fs40">客户订单<br/>
                        <span class="shop-font">0</span><span class="shopGray">单</span>
                    </p>
                </div>
                <div class="nav-item">
                    <div class="nav-icon">
                        <i class="iconfont icon-tixian"></i>
                    </div>
                    <p class="fs40">我的提现</p>
                    <p class="fs40">&nbsp</p>
                </div>
                <div class="nav-item">
                    <div class="nav-icon">
                        <i class="iconfont icon-tuwen"></i>
                    </div>
                    <p class="fs40">推广海报</p>
                </div>
                <div class="nav-item">
                    <div class="nav-icon">
                        <i class="iconfont icon-huiyuanqia"></i>
                    </div>
                    <p class="fs40">我的会员卡</p>
                </div>
                <div class="nav-item">
                    <div class="nav-icon">
                        <i class="iconfont icon-kaidianguize"></i>
                    </div>
                    <p class="fs40">销售规则</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Lib from 'assets/js/Lib';
    import defaultImg from 'components/defaultImg'
    export default {
        data() {
            return {

            }
        },
        components:{
            defaultImg
        },

        //实例初始化最之前，无法获取到data里的数据
        beforeCreate(){


        },
        //在挂载开始之前被调用
        beforeMount(){


        },
        //已成功挂载，相当ready()
        mounted(){



        },
        //相关操作事件
        methods: {
            background:''
        }
    }
</script>

<style lang="less">
    @import '../../../assets/css/mixins.less';
    @import '../../../assets/css/base.less';

    .sale-wrapper{
        width: 100%;
        position: relative;
        .sale-header{
            width: 100%;
            height: 520/@dev-Width *1rem;
            background: url('../../../assets/img/sale.jpg')no-repeat;
            background-size: cover;
            .ik-box;
            .ik-box-pack(center);
            .ik-box-align(center);
            .ik-box-orient(vertical);
            color: #fff;
            .header-img{
                width: 204/@dev-Width *1rem;
                height: 204/@dev-Width *1rem;
                background-size:cover;
                background-position: center;
                .border-radius(100%);
                overflow: hidden;
                margin-bottom: 20/@dev-Width *1rem;
            }
        }
        .index-main{
            width: 100%;
            background: #fff;
            .index-msg{
                width: 100%;
                .ik-box;
                height: 250/@dev-Width *1rem;
                box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2)
            }
            .index-msg-item{
                width: 33.33%;
                .ik-box-align(center);
                .ik-box-pack(center);
                .ik-box-orient(vertical);
                height: 100%;
                .ik-box;
            }
            .index-nav{
                width: 100%;
                &>div:nth-child(3n){
                    border-right: 0;
                }
            }
            .nav-item{
                float: left;
                width: 33.333%;
                height: 400/@dev-Width *1rem;
                border-bottom: 1px solid #ededed;
                border-right: 1px solid #ededed;
                .ik-box;
                .ik-box-align(center);
                .ik-box-pack(center);
                .ik-box-orient(vertical);
                p{
                    text-align: center;
                }
            }
            .nav-icon{
                font-size: 0;
                width: 150/@dev-Width *1rem;
                height: 150/@dev-Width *1rem;
                text-align: center;
                line-height: 150/@dev-Width *1rem;
                background: url('../../../assets/img/nav_bg.png') repeat;
                .border-radius(10px);
                margin-bottom: 32/@dev-Width *1rem;
                i{
                    font-size: 100/@dev-Width *1rem;
                    color: #fff;
                }
            }
        }
    }
</style>

