<template>
<div class="goods-wrapper">
    <div class="goods-main">
        <section class="goods-img-display">
            <div class="goods-img-box" @touchmove.prevent>
                <div class="goods-img">
                    <img src="../../../assets/img/test/test1.jpg">
                </div>
                <div class="goods-img">
                    <img src="../../../assets/img/test/test2.jpg">
                </div>
                <div class="goods-img">
                    <img src="../../../assets/img/test/test2.jpg">
                </div>
            </div>
            <p class="goods-origin-box">
                <i class="goods-origin img-selecte"></i>
                <i class="goods-origin"></i>
                <i class="goods-origin"></i>
            </p>
        </section>
        <section class="goods-info">
            <div class="goods-info-name">
                <em class="em-tag">爆款</em>
                <span class="fs40">Apple iPhone 7 Plus (A1661) 128G 玫瑰金色 移动联通电信 4G手机</span>
            </div>
            <p class="fs40 shop-font goods-info-money">
                价格:  ￥<span class="fs50">6,899</span>.00 
                <span class="fs36 shopGray">原价:<del>￥6,899.00</del></span>
            </p>
            <div class="goods-info-other fs40">
                <div class="shop-font">
                    秒杀价:￥<span class="fs50">6,899.</span>00
                </div>
                <div class="fs36 goods-info-time shopGray">
                    距结束<span>5天</span>
                    <em>99</em> :
                    <em>99</em> :
                    <em>99</em>
                </div>
            </div>
            <p class="goods-info-other fs40 shopGray">
                <span>
                    运费: ￥5
                </span>
                <span>
                    库存:9999
                </span>
                <span>
                    销量:9.9万
                </span>
            </p>
        </section>
        <section class="goods-selected"
                @click="dialogShow">
            <div class="goods-selected-main">
                <div class="fs40">
                    已选  玫瑰金，128GB，1个
                </div>
                <i class="iconfont icon-jiantou-copy shopGray"></i>
            </div>
        </section>
        <section class="goods-address">
            <div class="goods-address-main border">
                <div class="fs40 goods-address-txt text-overflow">
                    <i class="iconfont icon-dingwei shopFont"></i>
                    送至：广东省惠州市惠城区东平大道赛格假日广场赛格大厦...
                </div>
                <i class="iconfont icon-jiantou-copy shopGray"></i>
            </div>
            <div class="shopGray fs40 goods-address-postage">
                免运费
            </div>
        </section>
        <section class="goods-prove">
            <span class="fs40"><i class="iconfont icon-chenggong shopGreen"></i>企业认证</span>
            <span class="fs40"><i class="iconfont icon-chenggong shopGreen"></i>担保交易</span>
            <span class="fs40"><i class="iconfont icon-chenggong shopGreen"></i>线下门店</span>
        </section>
        <section class="goods-shop">
            <div class="goods-shop-main clearfix">
                <div class="goods-shop-info">
                    <div class="goods-shop-img">
                        <default-img :background="background"
                            :isHeadPortrait="0">
                        </default-img>
                    </div>
                    <div class="goods-shop-txt">
                        <div class="goods-shop-name">
                            <span class="fs46 text-overflow">权律二的店铺aaaaaaaaaaaaaa</span><em class="em-flag">旗舰店</em>
                        </div>
                        <div class="fs40 shopGray">
                            <span class="goods-shop-km text-overflow">0000km</span>    
                            <span class="goods-shop-tel text-overflow">东湖西路666号aaaaaa</span>
                        </div>
                    </div>
                </div>
                <div class="goods-shop-rigtn">
                    <div class="shopborder goods-shop-buttom fs42">
                        收藏商品
                    </div>
                    <div class="shopborder goods-shop-buttom fs42">
                        进店逛逛
                    </div>
                </div>
            </div>
        </section>
         <section class="goods-content">
            <div class="goods-content-nav shop-header">
                <div class="header-nav">
                    <div class="header-itme shop-font">
                        <!-- <p class="fs42">商品详情</p> -->
                        <router-link to="./router/details">商品详情</router-link>
                        <em class="shop-bg"></em>
                    </div>
                     <div class="header-itme" >
                        <router-link to="./router/spec">规格参数</router-link>
                        <em ></em>
                    </div> 
                    <div class="header-itme" >
                        <router-link to="./router/comment">规格参数</router-link>
                        <em ></em>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </section>
        <section class="goods-footer">
            <div class="goods-footer-no fs40" v-if="isSoldOut">
                商品已经下架啦~
            </div>
            <div class="goods-footer-content">
                <div class="goods-footer-botton ui-col-1 fs32">
                    <i class="iconfont icon-xiaoxi shop-font"></i>
                    客服
                </div >
                <div class="goods-footer-botton ui-col-1 fs32 border-left">
                    <i class="iconfont icon-yinhang"></i>
                    购物车
                    <em class="goods-footer-num shop-bg">1</em>
                </div>
                <div class="goods-footer-botton ui-col-2 fs50 shop-yellow shopFff"
                    @click="dialogShow">
                    加入购物车
                </div>
                <div class="goods-footer-botton ui-col-2 fs50 shop-bg shopFff"
                    @click="dialogShow">
                    立即购买
                </div>
            <!--<div class="goods-footer-botton ui-col-2 fs50 shop-bg">
                    交保证金报名
                </div> -->
            </div>
        </section>
    </div>
    <div class="goods-dialog" v-show="isShow"
        @click.self="dialogClose">
        <div class="goods-dialog-main">
            <div class="goods-dialog-title  border">
                <span class="text-overflow fs40">Apple iPhone 7 Plus (A1661) 128G 玫瑰金色 移动联通电</span>
                <i class="iconfont icon-guanbi fs40"
                @click.self="dialogClose"></i>
            </div>
            <div v-if="isShop">
                <div class="goods-dialog-detl border clearfix">
                    <div class="goods-dialog-img">
                        <default-img :background="background"
                            :isHeadPortrait="1">
                        </default-img>
                    </div>
                    <div class="goods-dialog-txt">
                        <p class="fs42 shop-font"><span class="fs32">¥</span>7,199.<span class="fs32">00</span></p>
                        <p class="fs36 shopGray">商品编号：9527</p>
                    </div>
                </div>
                <div class="goods-dialog-choice">
                    <div class="goods-choice-list clearfix">
                        <div class="goods-choice-title fs36">
                            颜色
                        </div>
                        <div class="goods-choice-box">
                            <em class="fs40 em-choice">金色</em>
                            <em class="fs40 em-choice">金色</em>
                            <em class="fs40 em-choice">金色</em>
                            <em class="fs40 em-choice">金色</em>
                            <em class="fs40 em-choice">金色</em>
                        </div>
                    </div>
                    <div class="goods-choice-list clearfix">
                        <div class="goods-choice-title fs36">
                            选择容量
                        </div>
                        <div class="goods-choice-box">
                            <em class="fs40 em-choice">32G</em>
                            <em class="fs40 em-choice">128G</em>
                            <em class="fs40 em-choice">32G</em>
                            <em class="fs40 em-choice">128G</em>
                        </div>
                    </div>
                    <div class="goods-choice-list clearfix">
                        <div class="goods-choice-title fs36">
                            数量
                        </div>
                        <div class="goods-choice-box2">
                            <em class="em-choice">-</em>
                            <em class="em-choice">1</em>
                            <em class="em-choice">+</em>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isWholesale">
                <div class="goods-dialog-detl border clearfix">
                    <div class="goods-dialog-img">
                        <default-img :background="background"
                            :isHeadPortrait="0">
                        </default-img>
                    </div>
                    <div class="goods-dialog-txt">
                        <p class="fs42 shop-font"><span class="fs32">¥</span>7,199.<span class="fs32">00</span></p>
                        <p class="fs36 shop-font">批发价:￥6,999.00</p>
                        <p class="fs36 shop-font">库存29994件</p>
                        <p class="fs36 shopGray">本商品2手起批</p>
                    </div>
                </div>
                <div class="goods-dialog-choice">
                    <div class="goods-choice-list2 border">
                        <div class="fs40">按一手货下单</div>
                        <div class="goods-choice-button">
                            <span class="fs36">减一手</span>
                            <span class="fs36 shop-bg">加一手</span>
                        </div>
                    </div>
                    <div class="goods-choice-list clearfix border"
                    style="padding-bottom:20px">
                        <div class="goods-choice-title fs36">
                            内存
                        </div>
                        <div class="goods-choice-box ">
                            <em class="fs40 em-choice shop-bg">金色
                                <i class="fs36">1</i>
                            </em>
                            <em class="fs40 em-choice">金色</em>
                            <em class="fs40 em-choice">金色</em>
                            <em class="fs40 em-choice">金色</em>
                            <em class="fs40 em-choice">金色</em>
                        </div>
                    </div>
                    <div class="goods-choice-option1 border">
                        <ul class="goods-choice-ul">
                            <li class="goods-choice-li">
                                <p class="fs36">尺寸</p>
                                <div class="goods-option">
                                    <p class="fs36">qqq</p>
                                </div>
                            </li>
                        </ul>
                    </div> 
                    <div class="goods-choice-option2 border">
                        <ul class="goods-choice-ul">
                            <li class="goods-choice-li">
                                <p class="fs36">尺寸</p>
                                <div class="goods-option">
                                    <p class="fs36">qqq</p>
                                    <p class="fs36">qqq</p>
                                    <p class="fs36">qqq</p>
                                </div>
                            </li>
                            <li class="goods-choice-li">
                                <p class="fs36">尺寸</p>
                                    <div class="goods-option">
                                    <p class="fs36">qqq</p>
                                    <p class="fs36">qqq</p>
                                    <p class="fs36">qqq</p>
                                </div>
                            </li>
                            <li class="goods-choice-li">
                                <p class="fs36">尺寸</p>
                                    <div class="goods-option">
                                    <p class="fs36">qqq</p>
                                    <p class="fs36">qqq</p>
                                    <p class="fs36">qqq</p>
                                </div>
                            </li>
                            <li class="goods-choice-li">
                                <p class="fs36">数量</p>
                                    <div class="goods-option-number">
                                    <p class="fs42">
                                        <em class="em-choice">-</em>
                                        <em class="em-choice">1</em>
                                        <em class="em-choice">+</em>
                                    </p>
                                </div>
                                <div class="goods-option-number">
                                    <p class="fs42">
                                        <em class="em-choice">-</em>
                                        <em class="em-choice">1</em>
                                        <em class="em-choice">+</em>
                                    </p>
                                </div>
                                <div class="goods-option-number">
                                    <p class="fs42">
                                        <em class="em-choice">-</em>
                                        <em class="em-choice">1</em>
                                        <em class="em-choice">+</em>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="goods-choice-Total fs36 shop-textr">
                        满2手，达到批发条件，<span class="fs46 shop-font">￥43,106</span>
                        <span class="shop-font">.00 </span>共2件
                    </div>
                </div>
            </div>
            <div class="goods-dialog-footer">
                <div class="goods-dialog-button fs52 shop-yellow">
                    加入购物车
                </div>
                <div class="goods-dialog-button fs52  shop-bg">
                    <span v-if="isShop">立刻购买</span>
                    <span v-if="isWholesale">立刻批发</span>
                </div>
                <div class="goods-dialog-button fs52  shop-bg shop-hide">
                    确 定
                </div> 
            </div>
        </div>
    </div>  
</div>
</template>
 <script>

import defaultImg from 'components/defaultImg'

export default {
  components: {
    defaultImg
  },
  data () {
    return {
        isShow:false,
        isSoldOut:false,//判断下架
        isPhoto: false,//
        isShop: false,//判断不是批发
        isWholesale: false,//判断是批发弹出
        background: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg'
    }
  },
  methods: {
    dialogShow(){
        this.isShow = true;
    },
    dialogClose(){
        this.isShow = false;
    }

  }
}
</script>

<style lang="less">
@import '../../../../assets/css/mixins.less';
@import './../../../assets/css/base.less';
.goods-wrapper{
    width: 100%;
    position: relative;
    section{
        margin-bottom: 30/@dev-Width *1rem;
        background: #fff;
        font-size: 0;
    }
    .goods-main{
        padding-bottom: 168/@dev-Width *1rem;
    }
    .goods-img-display{
        position: relative;
        width: 100%;
        height: 1130/@dev-Width *1rem;
         margin-bottom: 0;
        .goods-img-box{
            width: 100%;
            height: 100%;
            overflow: hidden;
            .ik-box;
            .goods-img{
                width: 100%;
                height: 100%;
                display: flex;
                display: -webkit-box;
                display: -ms-flexbox;
                flex-shrink: 0;
                img{
                    margin: 0 auto;
                    display: block;
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        .goods-origin-box{
            width: 100%;
            text-align: center;
            font-size: 0;
            position: absolute;
            bottom: 5%;
            i{
                display: inline-block;
                width: 8px;
                height: 8px;
                background: #cccccc;
                .border-radius(100%);
                margin: 0 3px;
            }
            .img-selecte{
                background: #e4393c;
                width: 14px;
                .border-radius(20px);
            }
        }
    }
    .goods-info{
        width: 100%;
        padding: 30/@dev-Width *1rem 46/@dev-Width *1rem;
        .goods-info-money{
            margin: 15/@dev-Width *1rem 0;
            .shopGray{
                margin-left: 20/@dev-Width *1rem;
            }
        }
        .goods-info-other{
            .ik-box;
            .ik-box-pack(justify);
            &>span{
                display: block;
            }
            .goods-info-time{
                span{
                   color: #333333;
                   margin: 3px;
                }
                em{
                   font-size: 32/@dev-Width *1rem;
                   display: inline-block;
                   background: #ffcc00;
                   color: #333333;
                   padding: 1px 2px;
                   .border-radius(3px);
                }
            }
        }
    }
    .goods-selected{
        width: 100%;
        padding: 30/@dev-Width *1rem 22/@dev-Width *1rem 30/@dev-Width *1rem 46/@dev-Width *1rem;
        .goods-selected-main{
            width: 100%;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(justify);
            i{
                color: #c7c7cc;
            }
        }
    }
    .goods-address{
        width: 100%;
        padding-left: 46/@dev-Width *1rem;
        .goods-address-main{
            width: 100%;
            padding: 30/@dev-Width *1rem 0;
            .goods-address-txt{
                width: 94%;
                float: left;
            }
            .shopGray{
                color: #c7c7cc;
            }
        }
        .goods-address-postage{
            padding: 30/@dev-Width *1rem 0;
        }
    }
    .goods-prove{
        padding: 48/@dev-Width *1rem 30/@dev-Width *1rem;
        line-height: 1;
        span{
            margin-right: 30/@dev-Width *1rem;
        }
        i{
            font-size: 48/@dev-Width *1rem;
            font-weight: bold;
            margin-right: 3px;
            vertical-align: -0.02rem;
        }
    }
    .goods-shop{
        padding: 28/@dev-Width *1rem 30/@dev-Width *1rem ;
        .goods-shop-main{
            width: 100%;
            .goods-shop-info{
                float: left;
                width: 60%;
            }
            .goods-shop-rigtn{
                float: right;
                width: 40%;
                height: 158/@dev-Width *1rem;
                .ik-box;
                .ik-box-align(center);
                .ik-box-pack(justify);
                .goods-shop-buttom{
                    display: block;
                    .border-radius(3px);
                    padding: 5px 3px;
                }
            }
            .goods-shop-img{
                vertical-align: 0.4rem;
                display: inline-block;
                width: 88/@dev-Width *1rem;
                height: 88/@dev-Width *1rem;
                background-size: cover;
                .border-radius(100%);
                overflow: hidden;
                
            }
            .goods-shop-txt{
                display: inline-block;
                width: 82%;
                margin-left: 25 /@dev-Width *1rem;
                .goods-shop-name{
                    margin-bottom: 30 /@dev-Width *1rem;
                }
                span{
                    max-width: 74%;
                    display: inline-block;
                    vertical-align: -2px;
                }
                .goods-shop-km{
                    width: 33%;
                }
                .goods-shop-tel{
                    width: 64%;
                }
            }
        }
    }
    .goods-content{
        width: 100%;
        position: relative;
        .goods-content-nav{
            position: relative;
        }
        .goods-content-photo{
            width: 100%;
            img{
                width: 100%;
                height: auto;
                display: block;
            }
        }
    }
    .goods-footer{
        margin: 0;
        width: 100%;
        position: fixed;
        bottom: 0;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
        z-index: 1;
        .goods-footer-no{
            text-align: center;
            background: #666;
            color: #fff;
            line-height: l;
            padding: 38/@dev-Width *1rem 0;
        }
        .goods-footer-content{
            .ik-box;
            &>div:nth-last-child(2),&>div:nth-last-child(1){
            color: #fff;
            }
        }
        .goods-footer-botton{
            position: relative;
            height: 158/@dev-Width *1rem;
            text-align: center;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(center);
            .ik-box-orient(vertical);
            i{
                margin-bottom: 10/@dev-Width *1rem;
                display: block;
                font-size: 68/@dev-Width *1rem;
            }
            em{
                font-size: 12px;
                position: absolute;
                top: 5%;
                right: 20%;
                width: 18px;
                height: 18px;
                line-height: 18px;
                color: #fff;
                display: block;
                .border-radius(100%);
            }
        }
        .border-left{
            border-left: 1px solid #f1f1f1; 
        }
    }
    .ui-col-2{
        .ik-box-flex(3)
    }
    .ui-col-1{
        .ik-box-flex(2)
    }
    .goods-dialog{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        .goods-dialog-main{
            width: 100%;
            position: absolute;
            background: #fff;
            bottom: 0;
            animation: dialogShow 0.2s;
            -moz-animation: dialogShow 0.2s;	/* Firefox */
            -webkit-animation: dialogShow 0.2s;
        }
        .goods-dialog-title{
            font-size: 0;
            width: 100%;
            padding-left:  30/@dev-Width *1rem;
            &>span{
                padding: 30/@dev-Width *1rem 0;
                width: 90%;
                display: inline-block;
            }
            &>i{
                padding: 30/@dev-Width *1rem;
                display: inline-block;
                vertical-align: top;
            }
        }
        .goods-dialog-detl{
            padding:  15/@dev-Width *1rem 0;
            padding-left:  30/@dev-Width *1rem;
            width: 100%;
            .goods-dialog-img{
                width: 265/@dev-Width *1rem;
                height: 265/@dev-Width *1rem;
                float: left;
                background-size: 100%;
                margin-right: 30/@dev-Width *1rem;
            }
            .goods-dialog-txt{
                float: left;
                width: 70%;
                padding: 10/@dev-Width *1rem 0;
                p{
                    margin-bottom: 10/@dev-Width *1rem;
                }
                .fs42{
                    margin-bottom: 30/@dev-Width *1rem;
                }
            }
        }
        .goods-dialog-choice{
            padding-left:  30/@dev-Width *1rem;
            width: 100%;
            font-size: 0;
            padding-bottom: 20/@dev-Width *1rem;
            .goods-choice-list2{
                width: 100%;
                .ik-box;
                .ik-box-align(center);
                .ik-box-pack(justify);
                height: 168 / @dev-Width *1rem;
                span{
                    display: inline-block;
                    padding: 20/@dev-Width *1rem;
                    background: #f3f2f8;
                    .border-radius(3px);
                    margin-right: 35/@dev-Width *1rem;
                }
            }
            .goods-choice-option1,.goods-choice-option2{
                width: 100%;
                padding-right: 35/@dev-Width *1rem;
                padding-bottom: 35/@dev-Width *1rem;
                .goods-choice-ul{
                    width: 100%;
                    .ik-box;
                    padding-right:35/@dev-Width *1rem; 
                    li{
                        text-align: center;
                    }
                    &>li:first-child{
                        text-align: left;
                    }
                    &>li:last-child{
                        text-align: right;
                    }
                }
                .goods-choice-li{
                    .ik-box-flex(1);
                }
            }
            .goods-choice-option2{
                .goods-choice-li{
                    p{
                        width: 100%;
                        height: 120/@dev-Width *1rem;
                        .ik-box;
                        .ik-box-align(center);
                        .ik-box-pack(center);
                    }
                }
                .goods-choice-ul{
                    &>li:first-child{
                        p{
                            .ik-box-pack(start);
                        }
                    }
                    &>li:last-child{
                        p{
                             .ik-box-pack(end);
                        }
                    }
                }
                .goods-option-number{
                    font-size: 0;
                    p{
                        font-size: 0;
                    }
                    em{
                        margin-right: 2px;
                        font-size: 42/ @dev-Width *1rem;
                    }
                    &>P>em:first-child,&>P>em:last-child{
                        font-weight: bold;
                        color: #87858f;
                    }
                }
            }
            .goods-choice-list{
                width: 100%;
                .goods-choice-title{
                    margin-top: 48 / @dev-Width *1rem;
                    float: left;
                    color: #87858f;
                    width: 80/@dev-Width *1rem;
                    margin-right: 20/@dev-Width *1rem;
                    height: 92 / @dev-Width *1rem;
                    .ik-box;
                    .ik-box-align(center);
                    line-height: 15px;
                }
                .goods-choice-box{
                    float: left;
                    width: 90%;
                    em{
                        margin-top: 48 / @dev-Width *1rem;
                        position: relative;
                    }
                    i{
                        text-align: center;
                        display: block;
                        position: absolute;
                        top: -18/ @dev-Width *1rem;
                        right: -18/ @dev-Width *1rem;
                        .border-radius(100%);
                        width: 50 / @dev-Width *1rem;
                        height: 50 / @dev-Width *1rem;
                        line-height: 46 / @dev-Width *1rem;
                        border: 1px solid #fff;
                        background:#ff3b30;
                        color: #fff;
                    }
                }
                .goods-choice-box2{
                    em{
                        padding: 0;
                        line-height: 90/ @dev-Width *1rem;
                        color: #87858f;
                        margin-top: 48 / @dev-Width *1rem;
                        width: 98/ @dev-Width *1rem;
                        height: 90/ @dev-Width *1rem;
                        text-align: center;
                        margin-right: 2px;
                        .border-radius(0);
                        font-weight: bold;
                        font-size: 68/ @dev-Width *1rem;
                        vertical-align: top;
                    }
                    &>em:nth-child(1){
                        border-top-left-radius: 3px;
                        border-bottom-left-radius: 3px;
                    }
                    &>em:nth-child(2){
                        font-size: 40/ @dev-Width *1rem;
                        font-weight:normal;
                        color: #333;
                        width: 120/ @dev-Width *1rem;
                    }
                    &>em:nth-child(3){
                        border-top-right-radius: 3px;
                        border-bottom-right-radius: 3px;
                    }
                }
            }
            .goods-choice-Total{
                width: 100%;
                padding: 40/@dev-Width *1rem  40/@dev-Width *1rem 0;
            }
        }
        .goods-dialog-footer{
            width: 100%;
            .ik-box;
            .goods-dialog-button{
                .ik-box-flex(1);
                text-align: center;
                color: #fff;
                padding: 40/@dev-Width *1rem 0;
            }
        }
    }

}
.goods-info-txt{
    width: 100%;
    padding: 30/@dev-Width *1rem 0;
    color: #87858f;
}
.shop-header{
    position: fixed;
    width: 100%;
    background: #fff;
    .header-nav{
        .ik-box;
        .header-itme{
            position: relative;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(center);
            .ik-box-flex(1);
            .ik-box-orient(vertical);
            a{
                font-size: 14px;
            }
        }
        a{
            display: block;
            text-align: center
        }
    }
}
@keyframes dialogShow{
    from {bottom: -100%;}
    to {bottom: 0%;}
}
@-moz-keyframes dialogShow{ /* Firefox */
    from {bottom: -100%;}
    to {bottom: 0%;}
}
@-webkit-keyframes dialogShow{/* Safari 和 Chrome */
    from {bottom: -100%;}
    to {bottom: 0%;}
}
</style>
