<template>
<div class="order-wrapper">
    <header class="orderTotal-header">
        <div class="header-top">
            <div class="fs46">
                <i class="iconfont icon-jiantou-copy1"></i>
                返回
            </div>
            <div class="fs46 shop-textr">
                首页
            </div>
        </div>
        <div class="header-bottom clearfix" v-if="hasAddress">
            <p class="fs46">小多  158****8600</p>
            <div class="header-bottom-left">
                <p class="fs36 shopGray">广东省惠州市惠城区东平大道赛格假日广场赛格大厦10楼1004广东谷 通(多粉)</p>
            </div>
            <div class="header-bottom-right">
                <i class="iconfont icon-jiantou-copy "></i>
            </div>
        </div>
        <div class="header-bottom-no clearfix" v-else>
            <p class="fs42">
                <i class="iconfont icon-jia"></i>
                新增收货地址
            </p>
        </div>
    </header> 
    <section class="shop-main deltails-main">
        <div class="order-box">
            <div class="order-item">
                <div class="order-item-title fs40">
                    <div class="order-title-img">
                        <default-img :background="background"
                                    :isHeadPortrait="0">
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
                </div>
                <div class="order-item-box border">
                    <div class="order-item-content">
                        <div class="order-item-img">
                            <default-img :background="background"
                                        :isHeadPortrait="0">
                            </default-img>
                        </div>
                        <div class="order-item-txt">
                            <p class="fs42 text-overflow">Apple iPhone 7 Plus (A1661) 128GB 玫瑰金 色 移动联通电信4G手机</p>
                            <p class="fs36 shopGray">玫瑰金/128GB</p>
                            <div class="fs42 shop-font orderTotal-money">
                                <p>¥7,199.<span class="fs32">00</span></p>
                                <p class="shopGray">X1</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border orderTotal-list-box">
                    <div class="orderTotal-list border">
                        <p class="fs40">配送方式</p>
                        <p class="fs40">
                            快递配送
                            <i class="iconfont icon-jiantou-copy shopGray"></i>
                        </p>
                    </div>
                    <div class="orderTotal-list border"
                        @click="order_ulShow">
                        <p class="fs40">
                            折扣信息<span class="shopGray">(可点击展开编辑)</span>
                        </p>
                        <p class="fs40">
                            <i class="iconfont icon-jiantou shopGray"></i>
                            <i class="iconfont icon-up shopGray shop-hide"></i>
                        </p>
                    </div>
                    <div class="orderTotal-ul shop-hide">
                        <div class="orderTotal-list border">
                            <p class="fs40">积分抵扣</p>
                            <p class="fs40">
                                    <input class="switch small-switch shop-switch" type="checkbox" />
                            </p>
                        </div>
                        <div class="orderTotal-list border">
                            <p class="fs40"> 粉币抵扣</p>
                            <p class="fs40">
                                    <input class="switch small-switch shop-switch" type="checkbox" />
                            </p>
                        </div>
                        <div class="orderTotal-list border">
                            <p class="fs40"> 优惠券</p>
                            <p class="fs40">
                                <i class="iconfont icon-jiantou-copy shopGray"></i>
                            </p>
                        </div>
                    </div>
                    <div class="orderTotal-table border shopGray clearfix">
                        <p class="fs40 shop-fl">
                                买家留言：
                        </p>
                        <div class="fs40 shop-fr my-table" contenteditable="true">
                            请填写备注信息
                        </div>
                    </div>
                </div>
                    <div class="deltails-del border" style="padding-top: 0.2rem;">
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
                    共计1件商品 小计：
                    <span class="shop-font">￥<i class="fs52">7192</i>.70</span>
                </div>
            </div>
        </div>
    </section>
    <section class="orderTotal-footer clearfix">
        <div class="orderTotal-fr fs40 ">
            <p>合计：<span class="shop-font">￥14,398.00</span></p>
            <span>总额:￥14,398.00</span>
            <span>总优惠:￥0.00</span>
        </div>
        <div class="orderTotal-button fs40 shop-bg">
            去结算(2)
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
import footerNav from 'components/footerNav'
import defaultImg from 'components/defaultImg'
import shopDialog from 'components/shopDialog'

export default {
  name: 'my',	

  data () {
    return {
        hasAddress: false,
        isShow:false,
        background: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg'
    }
  },
  components:{
	  footerNav,defaultImg,shopDialog
  },
  methods: {
    order_ulShow(){
        $('.orderTotal-ul').toggleClass('shop-hide');
        $('.icon-up').toggleClass('shop-hide');
        $('.icon-jiantou').toggleClass('shop-hide');
    }
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
.orderTotal-header{
        width: 100%;
        font-size: 0;
        margin-bottom: 30 /@dev-Width *1rem;
        .header-top{
            width: 100%;
            background: #f0f2f5;
            padding: 0 48 /@dev-Width *1rem;
            height: 138/@dev-Width *1rem;
            .ik-box;
            .ik-box-pack(justify);
            .ik-box-align(center);
            &>div{
                width: 20%;
                height: 100%;
                padding: 37 /@dev-Width *1rem 0;
                i{
                    color: #b2b2b2;
                }
            }
        }
        .header-bottom,.header-bottom-no{
            width: 100%;
            background: #fff;
            padding: 40 /@dev-Width *1rem 48 /@dev-Width *1rem; 
            border-top: 0 ;
            border-bottom: 16 /@dev-Width *1rem  solid transparent;
            -webkit-border-image:url('../../../assets/img/order_border.png') repeat; /* Safari 5 */
            -o-border-image:url('../../../assets/img/order_border.png') repeat; /* Opera */
            border-image:url('../../../assets/img/order_border.png') repeat;
            -webkit-border-image-slice: 12 0;
            -o-border-border-image-slice: 12 0;
            border-image-slice: 12 0;
            .header-bottom-left{
                width: 95%;
                float: left;
            }
            .header-bottom-right{
                float: left;
                width: 5%;
                color: #c7c7cc;
            }
            &>p{
                margin-bottom: 20/@dev-Width *1rem;
            }
        }
        .header-bottom-no {
            width: 100%;
            text-align: center;
            height: 268/@dev-Width *1rem;
            background: #fff;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(center);
            p{
                width: 80%;
                padding: 30/@dev-Width *1rem 0;
            }
            .iconfont{
                color: #c7c7cc;
                font-size: 68/@dev-Width *1rem;
                vertical-align: -0.08rem;
                margin-right: 10/@dev-Width *1rem;
            }
        }
    }
    .orderTotal-money{
        .ik-box;
        .ik-box-pack(justify);
        margin-top: 50/@dev-Width *1rem;
    }
    .orderTotal-list-box{
        width: 100%;
        padding-left: 30/@dev-Width *1rem;
        .iconfont{
            color: #c7c7cc;
            font-size: 40/@dev-Width *1rem;
            margin-right: 10/@dev-Width *1rem;
        }
    }
    .orderTotal-list{
        width: 100%;
        .ik-box;
        .ik-box-pack(justify);
        .ik-box-align(center);
        height: 122/@dev-Width *1rem;
        padding-right: 20/@dev-Width *1rem;
    }
    .orderTotal-table{
        width: 100%;
        padding: 40/@dev-Width *1rem 0;
        padding-right: 20/@dev-Width *1rem;
        .my-table{
            width: 80%;
        }
    }
    .orderTotal-footer{
        width: 100%;
        background: #fff;
        position: fixed;
        bottom: 0;
        .orderTotal-fr{
            width: 75%;
            float: left;
            padding: 20/@dev-Width *1rem 0;
            padding-left: 45/@dev-Width *1rem ;
        }
        .orderTotal-button{
            width: 25%;
            float: left;
            color: #fff;
            height: 164/@dev-Width *1rem;
            line-height:164/@dev-Width *1rem;
            text-align: center;
        }
    }

 .switch {
    display: inline-block;
    text-align: start;
    text-indent: 0;
    text-transform: none;
    text-shadow: none;
    word-spacing: normal;
    letter-spacing: normal;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    -webkit-rtl-ordering: logical;
    -webkit-user-select: text;
    text-rendering: auto;
    -webkit-writing-mode: horizontal-tb;
    position: relative;
    box-sizing: border-box;
    outline: 0;
    border: 1px solid #d2d2d2;
    background-color: #d2d2d2;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    vertical-align: middle;
}
 .small-switch {
    width: 45px;
    height: 24px;
    border-radius: 14px;
}
 .switch:before {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #d2d2d2;
    text-align: right;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform .3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
}
 .small-switch:before {
    width: 21px;
    height: 21px;
    border-radius: 15px;
    line-height: 27px;
    padding-right: 10px;
}
.switch:after {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    content: "";
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform .3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
}
 .small-switch:after {
    width: 21px;
    height: 21px;
    border-radius: 15px;
    line-height: 22px;
    padding-right: 10px;
}
 .small-switch:checked:after {
    width: 21px;
    height: 21px;
    border-radius: 20px;
    -webkit-transform: translateX(21px);
    transform: translateX(21px);
}
</style>
