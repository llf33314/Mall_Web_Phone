<template>
<div id='app' class="shop-wrapper  order-wrapper">  
    <header-nav :headers= 'homeNav'></header-nav>  
    <section class="shop-main order-main">
        <div class="order-box">
            <div class="order-item">
                <div class="order-item-title fs40">
                    <div class="order-title-img">
                        <default-img :background="background"
                                        :isHeadPortrait="1">
                        </default-img>
                    </div>
                    <span>广东谷通科技有限公司</span>
                </div>
                <div class="order-shop border">
                    <p class="order-shop-name">
                        <i class="iconfont icon-dianpu"></i>
                        <span class="fs36">江北店</span>
                        <i class="iconfont icon-you"></i>
                    </p>
                    <p class="shop-font fs42">
                        待发货
                    </p>
                </div>
                <div class="order-item-box ">
                    <div class="order-item-content  border">
                        <div class="order-item-img">
                            <default-img :background="background"
                                        :isHeadPortrait="0">
                            </default-img>
                        </div>
                        <div class="order-item-txt">
                            <p class="fs42">Apple iPhone 7 Plus (A1661) 128GB 玫瑰金 色 移动联通电信4G手机</p>
                            <p class="fs42 shop-font">¥7,199.<span class="fs32">00</span></p>
                            <p class="fs36 shopGray">玫瑰金/128GB/1件/包邮</p>
                        </div>
                    </div>
                </div>
                <div class="order-number-time border">
                    <div class="order-number fs42">
                        订单号：<span>DCS95270012</span>
                    </div>
                    <div class="order-time fs42">
                        下单时间：<span>2017.03.17 16:02:00</span>
                    </div>
                </div>
                <div class="order-item-total border fs42">
                    共计1件商品 合计：￥7,199.00
                </div>
                <div class="order-item-button fs42">
                    <div class="order-button shop-bg">
                        取消订单
                    </div>
                    <div class="order-button shop-bg">
                        去支付
                    </div>
                </div>
                    <div class="order-item-button fs42">
                    <div class="order-button shop-bg">
                        查看订单
                    </div>
                    <div class="order-button shop-bg"
                        @click="sure_dialog">
                        确定收货
                    </div>
                </div>
                <div class="order-item-button fs42">
                    <span>更多</span>
                    <div class="order-button shop-bg">
                        退货物流
                    </div>
                    <div class="order-button shop-bg">
                        查看物流
                    </div>
                    <div class="order-button shop-bg">
                        修改退订
                    </div>
                    <div class="order-button shop-bg"
                       @click="revoke_dialog">
                        撤销退款
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="shop-main-no fs40 my-bond" v-if="isShow">
        <content-no :statu='bondStatu'></content-no>
    </section>
    <shop-dialog ref="dialog"></shop-dialog>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo'
import headerNav from 'components/headerNav'
import shopDialog from 'components/shopDialog'
import defaultImg from 'components/defaultImg'

export default {
    name: 'myorder',	
    data () {
        return {
            homeNav: ['全部', '待付款', '待发货','待收货','已完成'],
            bondStatu: 2,
            isShow: false,
            background: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg'
        }
    },
    mounted() {

    },
    components:{
        headerNav,contentNo,shopDialog,defaultImg
    },
    methods: {
        order_ulShow(){
            $('.orderTotal-ul').toggleClass('shop-hide');
            $('.icon-up').toggleClass('shop-hide');
            $('.icon-jiantou').toggleClass('shop-hide');
        },
        sure_dialog(){
            var _this = this;
           // _this.disableScroll();
            var msg = {//弹出框组件调用
                'btnNum': '2',
                'dialogMsg': '确定已经到货？',
                'btnOne': '关闭',
                'btnTow': '确定',
                'dialogTitle':'提示',
                'callback': {
                    'btnOne': function () {
                        //关闭
                        //_this.allowScroll();
                    },
                    'btnTow': function () {
                        //确定
                        //_this.allowScroll();
                    }
                }
            }
            console.log( _this.$refs)
            _this.$refs.dialog.showDialog(msg);//弹出框
        },
        revoke_dialog(){
            var _this = this;
            //_this.disableScroll();
            var msg = {//弹出框组件调用
                'btnNum': '2',
                'dialogMsg': '如您主动关闭正在处理的退款后，您将无法 再次发起退款申请，请务必谨慎操作。',
                'btnOne': '确定',
                'btnTow': '关闭',
                'dialogTitle':'提示',
                'callback': {
                    'btnOne': function () {
                        //确定
                        //_this.allowScroll();
                    },
                    'btnTow': function () {
                        //关闭
                        //_this.allowScroll();
                    }
                }
            }
            _this.$refs.dialog.showDialog(msg);//弹出框
        }
    }
}
</script>

<style lang="less" scoped>

@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';

.order-content{
        width: 100%;
        background: #fff;
        .logistics-title{
            padding: 50/ @dev-Width *1rem 35/ @dev-Width *1rem;
            line-height: 1; 
            .logistics-img{
                width: 60/ @dev-Width *1rem;
                height: 60/ @dev-Width *1rem;
                .border-radius(100%);
                margin-right: 20/ @dev-Width *1rem;
                border: 1px solid #ededed;
            }
        }
        .logistics-list{
            width: 100%;
            padding-left: 82/ @dev-Width *1rem;
            padding-right: 30/ @dev-Width *1rem;
            line-height: 1;
            overflow: hidden;
            .logistics-item{
                padding: 40/@dev-Width *1rem 0 40/@dev-Width *1rem 82/ @dev-Width *1rem ;
                position: relative;
                height: 235/@dev-Width *1rem;
                .logistics-txt{
                    line-height: 0.35rem;
                    margin-bottom: 15/@dev-Width *1rem;
                }
                em{
                    position: absolute;
                    width: 25/@dev-Width *1rem;
                    height: 25/@dev-Width *1rem;
                    background: #dddddd;
                    top: 50/@dev-Width *1rem;
                    left: -((25+3)/2)/@dev-Width *1rem;
                    .border-radius(100%);
                }
                &::after{
                    content: '';
                    position: relative;
                    display: inline-block;
                    width: 3/@dev-Width *1rem;
                    height: 200%;
                    background: #dddddd;
                    left: -(86)/@dev-Width *1rem;
                    top: -(120)/@dev-Width *1rem;;
                }
            }
            &>div:first-child{
                color: #0bb453;
                em{
                    background: #0bb453;
                    box-shadow: 0px 0px 0px 2px  rgba(11, 180, 83, 0.3);
                }
            }
        }
    }
    .order-main{
        padding-top: 148/@dev-Width *1rem;
    }
    .order-main,.deltails-main{
        position: relative;
        .order-box{
            width: 100%;
        }
        .order-item{
            width: 100%;
            margin-bottom: 20/@dev-Width *1rem;
            background: #fff;
        }
        .order-item-title{
            padding: 0 40/@dev-Width *1rem;
            background: #fafafa;
            height: 135 /@dev-Width *1rem;
            .ik-box;
            .ik-box-align(center);
            .order-title-img{
                width: 80 /@dev-Width *1rem;
                height: 80 /@dev-Width *1rem;
                .border-radius(100%);
                border: 1px solid #efefef;
                background-size: cover;
                overflow:hidden
            }
            span{
                margin-left: 20 /@dev-Width *1rem;
                font-weight: bold;
            }
        }
        .order-shop{
            width: 100%;
            height: 116 /@dev-Width *1rem;
            padding-left: 40 /@dev-Width *1rem;
            padding-right: 30/@dev-Width *1rem;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(justify);
            font-size: 0;
        }
        .order-shop-name{
            span{
                    margin: 30/@dev-Width *1rem;
            }
        }
        .order-item-content,.order-number-time{
            .ik-box;
            .ik-box-pack(justify);
            width: 100%;
            padding: 24/@dev-Width *1rem 30/@dev-Width *1rem  24/@dev-Width *1rem 40/@dev-Width *1rem;
            .order-item-img{
                width: 265  /@dev-Width *1rem;
                height: 265 /@dev-Width *1rem;
                background-size: cover; 
            }
            .order-item-txt{
                width: 73%;
                p{
                    margin-bottom: 20 /@dev-Width *1rem
                }
            }
        }
        .order-item-total,.order-item-button,.order-number-time{
            width: 100%; 
            padding: 38/@dev-Width *1rem 30/@dev-Width *1rem  38/@dev-Width *1rem 40/@dev-Width *1rem;
            text-align: right;
            .order-button{
                color: #fff;
                width: 254/@dev-Width *1rem;
                height: 88 /@dev-Width *1rem;
                line-height: 88/@dev-Width *1rem;
                display: inline-block;
                .border-radius(5px);
                text-align: center;
                margin-left: 20/@dev-Width *1rem;
            }
        }
    }
</style>
