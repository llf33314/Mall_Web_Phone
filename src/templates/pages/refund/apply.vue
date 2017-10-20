<template>
    <div class="shop-wrapper refund-wrapper">
        <div class="refund-main comment-main">
            <section class="refund-goods clearfix">
                <div class="goods-img">
                    <default-img :background="background"
                                 :isHeadPortrait="1">
                    </default-img>
                </div>
                <div class="goods-delt">
                    <p class="fs40">Apple iPhone 7 Plus (A1661) 128GB 玫瑰金 色 移动联通电信4G手机</p>
                    <p class="fs36 shopGray">规格：玫瑰金/128GB</p>
                    <p class="fs36 shop-font shop-textr">退款金额：￥7,199.00</p>
                </div>
            </section>
            <section class="refund-state">
                <div class="refund-list border">
                    <p class="fs46">货物状态</p>
                    <p class="shopGray">
                        <span class="fs36">请选择</span>
                        <i class="iconfont icon-jiantou-copy"></i>
                    </p>
                </div>
                <div class="refund-list" v-if="false">
                    <p class="fs46">退款原因</p>
                    <p class="shopGray">
                        <span class="fs36">请选择</span>
                        <i class="iconfont icon-jiantou-copy"></i>
                    </p>
                </div>
            </section>
            <section class="refund-money">
                <div class="refund-list border">
                    <p class="fs46">退款金额：<span class="shop-font">￥7199.00</span></p>
                </div>
                <div class="refund-list">
                    <p class="fs40">最多可退￥7199.00含，发货运费￥1.00</p>
                </div>
                <div class="refund-list">
                    <p class="fs46">退款说明：<span class="shopGray">选填</span></p>
                </div>
            </section>
            <section class="refund-photo comment-content">
                <p class="fs42">上传凭证：</p>
                <div class="refund-box comment-photo border clearfix"
                     style="padding:0;">
                    <div class="comment-img">
                        <img src="../../../assets/img/test/test1.jpg"/>
                        <i class="iconfont icon-guanbi"></i>
                    </div>
                    <div class="comment-img">
                        <img src="../../../assets/img/test/test1.jpg"/>
                        <i class="iconfont icon-guanbi"></i>
                    </div>
                    <div class="comment-img">
                        <img src="../../../assets/img/test/test1.jpg"/>
                        <i class="iconfont icon-guanbi"></i>
                    </div>
                    <div class="comment-img">
                        <img src="../../../assets/img/test/test1.jpg"/>
                        <i class="iconfont icon-guanbi"></i>
                    </div>
                    <div class="comment-upload">
                        <imgUpload :imgURL="imgData"></imgUpload>
                    </div>
                </div>
            </section>
            <section class="shop-footer-fixed comment-footer1">
                <div class="shop-max-button fs52 shop-bg">
                    提 交
                </div>
            </section>
        </div>
        <div class="refund-dialog shop-hide">
            <div class="dialog-main">
                <div class="dialog-content">
                    <p class="fs46 dialog-title border">退款原因</p>
                    <div class="dialog-ul">
                        <div class="refund-list border">
                            <p class="fs46">不喜欢/不想要</p>
                            <p class="dialog-option">
                                <i class="iconfont icon-dui"></i>
                            </p>
                        </div>
                        <div class="refund-list ">
                            <p class="fs46">其他</p>
                            <p class="dialog-option">
                                <i class="iconfont icon-dui"></i>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="shop-footer comment-footer1">
                    <div class="shop-max-button fs52 shop-bg">
                        关 闭
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import defaultImg from 'components/defaultImg'
    import imgUpload from 'components/imgUpload'
    export default {

        data () {
            return {
                isShow: false,
                background:''
            }
        },
        components:{
            defaultImg,imgUpload
        },
        mounted() {

        },
        methods: {
            //组件图片接受
            imgData(data){
                this.imgURL = data;
            }
        }
    }
</script>

<style lang="less" scoped>

    @import '../../../assets/css/mixins.less';
    @import '../../../assets/css/base.less';

    .refund-wrapper{
        width: 100%;
        .refund-main{
            position: relative;
            width: 100%;
            padding-bottom: 165 / @dev-Width *1rem;
        }
        section{
            width: 100%;
            background: #fff;
            margin-bottom: 30 / @dev-Width *1rem;
        }
        .refund-goods{
            padding:25 / @dev-Width *1rem 15 / @dev-Width *1rem 25 / @dev-Width *1rem 40 / @dev-Width *1rem;
            .goods-img{
                float: left;
                width: 267 / @dev-Width *1rem;
                height: 267 / @dev-Width *1rem;
                background-size:cover;
                background-position: center;
            }
            .goods-delt{
                width: 72%;
                float: left;
                margin-left: 20 / @dev-Width *1rem;
                text-align: justify;
                p{
                    margin: 20 / @dev-Width *1rem 0;
                }
            }
        }
        .refund-state{
            width: 100%;
        }
        .refund-list,.refund-list2{
            font-size: 0;
            width: 100%;
            height: 145 / @dev-Width *1rem;
            .ik-box;
            .ik-box-pack(justify);
            .ik-box-align(center);
            padding-left: 50/@dev-Width *1rem;
            padding-right: 40/@dev-Width *1rem;
            i{
                color: #c7c7cc;
                font-size: 42/@dev-Width *1rem;
            }
        }
        .refund-list2{
            height: 240 / @dev-Width *1rem;
            .list-txt{
                .ik-box;
                .ik-box-pack(justify);
                .ik-box-align(center);
                &>i{
                    color: #e4393c;
                    font-size: 68 / @dev-Width *1rem;
                    margin-right: 20 / @dev-Width *1rem;
                }
            }
        }
        .refund-input{
            width: 80%;
            display: block;
            height: 100%;
            border: 0;
        }
        .refund-money{
            width: 100%;
            &>div:nth-child(2){
                background: #ededed;
                color:#999;
            }
        }
        .refund-photo{
            width: 100%;
            padding: 47/@dev-Width *1rem;
        }
        .refund-passheader{
            width: 100%;
            height: 380/@dev-Width *1rem;
            padding: 0 60/@dev-Width *1rem;
            .ik-box;
            .ik-box-pack(center);
            .ik-box-orient(vertical);
            background-image:-webkit-gradient(linear,50% 0,0 100%,from(transparent), color-stop(.5,transparent),color-stop(.5,#f0f2f5),to(#f0f2f5)),
            -webkit-gradient(linear,50% 0,100% 100%,from(transparent), color-stop(.5,transparent),color-stop(.5,#f0f2f5),to(#f0f2f5));
            background-image:-moz-linear-gradient(50% 0 -45deg,transparent,transparent 50%,#f0f2f5 50%,#f0f2f5),
            -moz-linear-gradient(50% 0 -135deg,transparent,transparent 50%,#f0f2f5 50%,#f0f2f5);
            background-size:11px 7px;
            background-repeat:repeat-x;
            background-position:0 100%;
            .header-title{
                font-weight: bold;
                margin-bottom: 60/@dev-Width *1rem;
                i{
                    border: 2px solid #e4393c;
                    .border-radius(100%);
                    color: #e4393c;
                    font-weight: 100;
                    padding: 9/@dev-Width *1rem;
                    font-size: 48/@dev-Width *1rem;
                    margin-right: 20/@dev-Width *1rem;
                }
            }
            &>p{
                width: 100%;
                margin:  5/@dev-Width *1rem 0;
            }

        }
        .shop-footer-fixed{
            position: fixed;
            width: 100%;
            background: #fff;
            .footer-nav,.header-nav{
                .ik-box;
                .footer-itme,.header-itme{
                    position: relative;
                    .ik-box;
                    .ik-box-align(center);
                    .ik-box-pack(center);
                    .ik-box-flex(1);
                    .ik-box-orient(vertical);
                }
                a{
                    display: block;
                    text-align: center
                }
            }
        }
        .refund-dialog{
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: fixed;
            z-index: 99;
            top: 0;
            left: 0;
            .dialog-main{
                width: 100%;
                position: absolute;
                background: #fff;
                bottom: 0;
                animation: dialogShow 0.2s;
                -moz-animation: dialogShow 0.2s;	/* Firefox */
                -webkit-animation: dialogShow 0.2s;
            }
            .dialog-content{
                width: 100%;
                padding: 35/@dev-Width *1rem 0 88/@dev-Width *1rem 50/@dev-Width *1rem;
            }
            .dialog-title{
                width: 100%;
                text-align: center;
                padding-bottom: 50/@dev-Width *1rem;
            }
            .dialog-ul{
                width: 100%;
                .refund-list{
                    height: 117/@dev-Width *1rem;
                    padding-left: 0;
                }
                &>div:last-child{

                }
            }
            .dialog-option{
                width: 60/@dev-Width *1rem;
                height: 60/@dev-Width *1rem;
                .border-radius(100%);
                border: 1px solid #c7c7cc;
                text-align: center;
                line-height: 60/@dev-Width *1rem;
                &>i{
                    color: #fff;
                }
            }
            .selected{
                border: 0;
                background: #e4393c;
            }
        }
    }
    .comment-footer1{
        .shop-max-button{
            height: 134/@dev-Width *1rem;
            .border-radius(0);
        }
    }
    .comment-content{
        font-size: 0;
        background: #fff;
        padding: 40/@dev-Width *1rem 0 0;
        width: 100%;
        .comment-textarea{
            width: 92%;
            margin: 0 auto;
            display: block;
            height: 620/@dev-Width *1rem;
            border: 1px solid #ededed;
            background: 0;
            padding: 10/@dev-Width *1rem;
        }
        .comment-photo{
            width: 100%;
            text-align: justify;
            padding: 40/@dev-Width *1rem;
            .comment-upload,.comment-img{
                //display: inline-block;
                float: left;
                position: relative;
                width: 22%;
                height: 230/@dev-Width *1rem;
                background-size: cover;
                background-position: center;
                margin-top: 40/@dev-Width *1rem;
                margin-right: 30/@dev-Width *1rem;
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
            .comment-img{
                position: relative;
                i{
                    width: 60/@dev-Width *1rem;
                    height: 60/@dev-Width *1rem;
                    text-align: center;
                    line-height: 60/@dev-Width *1rem;
                    background: rgba(0,0,0,0.6);
                    color:#e0e0e8;
                    font-size: 36/@dev-Width *1rem;
                    .border-radius(100%);
                    position: absolute;
                    top:-8%;
                    right: -8%;
                }
            }
            .border-img{
                border:1px solid #ededed;
                width:26%;
                height: 280/@dev-Width *1rem;
            }
        }
        .comment-txt{
            width: 100%;
            padding: 0 40/@dev-Width *1rem;
        }
    }
</style>
