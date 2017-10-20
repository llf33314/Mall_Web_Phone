<template>
<div class="order-wrapper">
    <!--页头状态-->
    <header class="deltails-header shipped" >
        <p class="fs52">卖家已发货</p>
        <p class="fs40">还剩4天21时自动确认</p>
    </header> 
    <header class="deltails-header payment" >
        <p class="fs52">等待买家付款</p>
        <p class="fs40">还剩2天21时自动关闭</p>
    </header>
    <header class="deltails-header deltails-padding0 shop-textc  success" >
        <i class="iconfont icon-chenggong"></i>
        <p class="fs52">交易成功</p>
    </header> 
    <section class="deltails-express">
        <div class="deltails-express-top border clearfix">
            <div class="col-1">
                <i class="iconfont icon-kuaidi"></i>
            </div>
            <div class="col-2">
                <p class="fs40 shopGreen ">[惠州市] 正常签收，签收类型：本人签收，感谢使用 顺丰快递，期待再次为您服务。</p>
                <span class="fs32">2017-05-23 14:28:35</span>
            </div>
            <div class="col-1 shop-textr">
                <i class="iconfont icon-jiantou-copy shopGray"></i>
            </div>
        </div>
        <div class="deltails-express-bottom clearfix">
            <div class="col-1">
                <i class="iconfont icon-dizhi"></i>
            </div>
            <div class="col-2">
                <div class="fs40 deltails-name">
                    <span>收货人：小二</span> 
                    <span>13282545756</span>
                </div>
                <p class="fs40">收货地址：惠州市惠城区赛格大厦10楼</p>
            </div>
        </div>
    </section>
    <section class="shop-main deltails-main">
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
                    <p class="shopGray fs42">
                        共计一个商品
                    </p>
                </div>
                <div class="order-item-box ">
                    <div class="order-item-content">
                        <div class="order-item-img">
                            <default-img :background="background"
                                    :isHeadPortrait="1">
                        </default-img>
                        </div>
                        <div class="order-item-txt">
                            <p class="fs42">Apple iPhone 7 Plus (A1661) 128GB 玫瑰金 色 移动联通电信4G手机</p>
                            <p class="fs42 shop-font">¥7,199.<span class="fs32">00</span></p>
                            <p class="fs36 shopGray">玫瑰金/128GB/1件/包邮</p>
                        </div>
                    </div>
                </div>
                <div class="deltails-item-button">
                    <div class="deltails-button shop-border fs36">
                        填写退货物流
                    </div>
                    <div class="deltails-button shop-border fs36">
                        修改退款
                    </div>
                    <div class="deltails-button shop-border fs36">
                        撤销退款
                    </div>
                    <div class="deltails-button shop-border fs36">
                        申请退款
                    </div>
                    <div class="deltails-button shop-border fs36">
                        申请售后
                    </div>
                     <div class="deltails-button shop-border fs36">
                        去评价
                    </div>
                </div>
                <div class="deltails-del border">
                    <p class="fs40">
                        <span>商品金额</span>
                        <span class="shop-font">￥7,199.00</span>
                    </p>
                    <p class="fs40">
                        <span>运费</span>
                        <span class="shop-font">+￥0.00</span>
                    </p>
                    <p class="fs40">
                        <span>积分</span>
                        <span class="shop-font">-￥6.30</span>
                    </p>
                </div>
                <div class="deltails-money fs40">
                    实付金额：<span class="shop-font">￥7192.70</span>
                </div>  
            </div>
        </div>
        <div class="shop-footer">
            <div class="shop-logo"></div>
        </div>
    </section>
    <section class="shop-footer-fixed deltails-footer">
        <div class="deltails-button fs40 shop-bg">
            查看物流
        </div>
        <div class="deltails-button fs40 shop-bg">
            确认收货
        </div>
    </section>
    <section class="shop-main-no fs40 my-bond" v-if="isShow">
        <content-no :statu='bondStatu'></content-no>
    </section>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import footerNav from 'components/footerNav'
import defaultImg from 'components/defaultImg'

export default {
  name: 'my',	

  data () {
    return {
        isShow:false,
        background: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg'
    }
  },
  components:{
	  footerNav,defaultImg
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
    //我的订单
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
                overflow:hidden;
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
    //订单详情
    .deltails-header{
        color: #fff;
        .ik-box;
        .ik-box-pack(center);
        .ik-box-orient(vertical);
        padding-left: 115/@dev-Width *1rem ;
        width: 100%;
        background-size: 100%;
        height: 316/@dev-Width *1rem;
        background-position: center;
        margin-bottom:  30/@dev-Width *1rem;
        &>p:first-child{
            margin-bottom: 30/@dev-Width *1rem;
        }
    }
    .deltails-padding0{
        padding-left: 0;
        i{
            font-size: 148/@dev-Width *1rem;
        }
    }
    .deltails-express{
        width: 100%;
        padding: 0 42/@dev-Width *1rem;
        background: #fff;
        font-size: 0;
        margin-bottom:  30/@dev-Width *1rem;
        .deltails-express-top{
            padding: 35/@dev-Width *1rem 0;
            .ik-box;
            width: 100%;
            p{
                line-height: 1.5em;
                margin-bottom: 20/@dev-Width *1rem;
            }
            .col-1{
                width: 8%;
                line-height: 1rem;
            }
            .col-2{
                width: 85%;
            }
        }
        .deltails-express-bottom{
            .ik-box;
            padding: 30/@dev-Width *1rem 0;
            .col-1{
                line-height: 0.6rem;
                width: 8%;
            }
            .col-2{
                width: 92%;
                
            }
            .deltails-name{
                .ik-box;
                .ik-box-pack(justify);
                span{
                    display: block;
                }
            }
        }
    }
    .deltails-item-button{
        text-align: right;
        font-size: 0;
        margin-bottom: 60/@dev-Width *1rem;
    }
    .deltails-button{
        display: inline-block;
        padding: 20/@dev-Width *1rem 15/@dev-Width *1rem;
        .border-radius(5px);
        margin-right: 30/@dev-Width *1rem;
    }
    .deltails-del{
        padding-left: 30 /@dev-Width *1rem;
        padding-bottom: 35 /@dev-Width *1rem;
        line-height: 1;
        p{
            margin-bottom: 30 /@dev-Width *1rem;
            .ik-box;
            .ik-box-pack(justify);
            padding-right: 25 /@dev-Width *1rem;
            span{
                display: block;
            }
        }
        &>p:last-child{
            margin-bottom: 0;
        }
    }
    .deltails-money{
        text-align: right;
        padding: 40 /@dev-Width *1rem;
    }
    .deltails-footer{
        padding: 35 /@dev-Width *1rem 0;
        font-size: 0;
        text-align: right;
        border-top: 1px solid #ddd; 
        .deltails-button{
            color: #fff;
            display: inline-block;
            .border-radius(5px);
            text-align: center;
            margin-left: 20/@dev-Width *1rem;
        }
    }
    .deltails-main{
        padding-bottom: 180 /@dev-Width *1rem;
    }
.shop-footer-fixed{
    background: #fff;
}
//已发货
.shipped{
    background-image:url('../../../assets/img/orderfahuo_bg.jpg');
}
//付款
.payment{
    background-image:url('../../../assets/img/orderfukuan_bg.jpg');
}
//成功
.success{
    background-image:url('../../../assets/img/ordercg_bg.jpg');
}
</style>
