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
                </div>
            </section>
            <section class="refund-state">
                <div class="refund-list2 border">
                    <div class="fs46 list-txt">
                        <i class="iconfont icon-tuikuan"></i>
                        <div>
                            <p class="fs40">仅退款</p>
                            <p class="fs36 shopGray">未收到货（包含未签收），或卖家协商同意前提下</p>
                        </div>
                    </div>
                    <p class="shopGray">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </p>
                </div>
                <div class="refund-list2 border">
                    <div class="fs46 list-txt">
                        <i class="iconfont icon-tuikuan"></i>
                        <div>
                            <p class="fs40">退货退款</p>
                            <p class="fs36 shopGray">已收到货，需要退换已收到的货物</p>
                        </div>
                    </div>
                    <p class="shopGray">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>
 <script>
import Lib from 'assets/js/Lib';

import defaultImg from 'components/defaultImg'

export default {
  components: {
    defaultImg
  },
  data () {
    return {
        background:''
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
/**------vars------*/
.ik-box {
    display: -webkit-box;
    display: -moz-box;
    display: -o-box;
    display: box;
}
.box-sizing {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    /* Firefox */
    -webkit-box-sizing: border-box;
    /* Safari */
}
.text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
.refund-wrapper .refund-goods {
    padding: 0.16666667rem 0.1rem 0.16666667rem 0.26666667rem;
}
.refund-wrapper .refund-goods .goods-img {
    float: left;
    width: 1.78rem;
    height: 1.78rem;
    background-size: cover;
    background-position: center;
}
.refund-wrapper .refund-goods .goods-delt {
    width: 72%;
    float: left;
    margin-left: 0.13333333rem;
    text-align: justify;
}
.refund-wrapper .refund-goods .goods-delt p {
    margin: 0.13333333rem 0;
}
.refund-wrapper .refund-state {
    width: 100%;
}
.refund-wrapper .refund-list,
.refund-wrapper .refund-list2 {
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
.refund-wrapper .refund-list i,
.refund-wrapper .refund-list2 i {
    color: #c7c7cc;
    font-size: 0.28rem;
}
.refund-wrapper .refund-list2 {
    height: 1.6rem;
}
.refund-wrapper .refund-list2 .list-txt {
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
}
.refund-wrapper .refund-list2 .list-txt > i {
    color: #e4393c;
    font-size: 0.45333333rem;
    margin-right: 0.13333333rem;
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
