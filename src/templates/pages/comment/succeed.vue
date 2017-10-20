<template>
<div id='app' class="shop-wrapper order-wrapper">
    <header class="deltails-header deltails-padding0 shop-textc">
            <i class="iconfont icon-chenggong"></i>
            <p class="fs52">评论</p>
    </header>
    <div class="comment-main order-item">
        <div class="comment-content">
            <div class="comment-goods clearfix">
                <div class="goods-img">
                    <default-img :background="background"
                            :isHeadPortrait="0">
                    </default-img>
                </div>
                <div class="goods-txt">
                    <p class="fs40">Apple iPhone 7 Plus (A1661) 128GB 玫瑰金 色 移动联通电信4G手机</p>
                    <p class="fs36 shopGray">玫瑰金/128GB/1件/包邮</p>
                    <p class="fs36 shopGray"
                    style="color:#e4393c;">已好评</p>
                </div>
            </div>
            <p class="comment-txt fs46">手机非常流畅，刚刚查了序列号，是真品，喜欢的赶紧下 手吧！快递也非常给力！</p>
            <div class="comment-photo border clearfix">
                <div class="comment-img border-img">
                    <default-img :background="background"
                            :isHeadPortrait="0">
                    </default-img>
                </div>
                <div class="comment-img border-img">
                    <default-img :background="background"
                                :isHeadPortrait="0">
                    </default-img>>
                </div>
                <div class="comment-img border-img">   
                    <default-img :background="background"
                            :isHeadPortrait="0">
                    </default-img>
                </div>
            </div>
        </div>
    </div>
    <section class="shop-footer comment-footer2">
        <div class="shop-max-button fs52 shop-bg">
            分享评价给好友
        </div>
    </section>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import defaultImg from '../../../components/defaultImg'
export default {
    name: 'succeed',	
    data () {
        return {
            background:''
        }
    },
    mounted() {
    },
    components:{
        defaultImg
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
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
    background-image:url('../../../assets/img/pinglun_bg.jpg');
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
.comment-main{
    width: 100%;
    padding-bottom:134/@dev-Width *1rem; 
    .comment-goods{
        background: #fff;
        padding: 20/@dev-Width *1rem 40/@dev-Width *1rem;
        margin-bottom: 20/@dev-Width *1rem;
        .goods-img{
            float: left;
            width: 264/@dev-Width *1rem;
            height: 264/@dev-Width *1rem;
            background-size: cover; 
            background-position: center;
        }
        .goods-txt{
            width: 72%;
            float: right;
            &>p:last-child{
                margin-top: 48/@dev-Width *1rem;
            }
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
            .comment-upload{
                color: #999;
                border: 2px dashed #999;
                .border-radius(5px);
                text-align: center;
                .ik-box;
                .ik-box-align(center);
                .ik-box-pack(center);
                .ik-box-orient(vertical);
                i{
                    font-size: 88/@dev-Width *1rem;
                }
                p{
                    width: 75%;
                }
            }
        }
        .comment-txt{
            width: 100%;
            padding: 0 40/@dev-Width *1rem;
        }
    }
}
.comment-footer2{
    .shop-max-button{
        height: 134/@dev-Width *1rem;
        width: 92%;
        margin: 0 auto;
        color: #fff;
    }
}
</style>
