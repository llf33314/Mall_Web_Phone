<template>
  <div class="helppay-wrapper">
      <section class="helppay-choice"> 
          <p class="helppay-title fs36">我在商城挑选好了商品，是时候该你仗义疏财了，快帮我付个款吧~</p>
          <div class="helppay-coupon">
              <p class="fs42 coupon-money">
                  代付金额:<span class="fs60 shop-font">￥6666.00</span>
              </p>
              <p class="fs42 coupon-men">收货人:勤勤</p>
          </div>
          <div class="helppay-time fs44">
                剩余支付时间：
                <count-down :times="time"
                ></count-down>
          </div>
          <div class="helppay-choice-box">
                <div class="helppay-choice-buttom fs52 f23">
                    支付宝安全支付
                </div>
                <div class="helppay-choice-buttom fs52 f23">
                    发起代付请求
                </div>
                <div class="helppay-choice-buttom fs52 ff8">
                    我也要购买
                </div>
                <div class="helppay-choice-explain fs50">
                    说明：
                    <p class="fs46">1.付款前务必和好友再次确认，避免是诈骗行为。</p>
                    <p class="fs46">2.如果发生退款，钱将退还到你的支付宝账号里。</p>
                </div>
          </div>
        </section>
        <section class="helppay-inf"> 
            <p class="fs50 border">代付订单信息</p>
            <div class="helppay-goods clearfix">
                <div class="helppay-img">
                    <default-img :background="a"
                                :isHeadPortrait="1">
                    </default-img>
                </div>
                <div class="helppay-goods-inf">
                    <p class="fs50">iPhone7 plus</p>
                    <p>
                        <span class="fs46 shopGray">数量*1</span>
                        <span class="fs50 shop-font">￥6666.00</span>
                    </p>
                </div>
            </div>
        </section>
      <technical-support></technical-support>
  </div>
</template>

<script>
import technicalSupport from 'components/technicalSupport' //技术支持
import countDown from './componet/countDown';//倒计时
import defaultImg from "components/defaultImg";

export default {
  components: {
      technicalSupport,countDown,defaultImg
  },
  data () {
    return {
        time: 1
    }
  },
  created() {
  },
  mounted(){
   
  },
  methods: {
  
  }
}

</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";


.helppay-wrapper{
    width: 100%;
    .helppay-choice,
    .helppay-inf{
        line-height: 1;
        width: 100%;
        background: #fff;
        margin-bottom: 30/@dev-Width *1rem;
    }
    .helppay-title{
        padding: 48/ @dev-Width *1rem 35/ @dev-Width *1rem;
        text-align: justify;
    }
    .helppay-coupon{
        width: 100%;
        height: 272/@dev-Width *1rem; 
        border-top: 0 ;
        border-top: 14 /@dev-Width *1rem  solid transparent;
        border-bottom: 14 /@dev-Width *1rem  solid transparent;
        -webkit-border-image:url('../../../assets/img/order_border.png') repeat; /* Safari 5 */
        -o-border-image:url('../../../assets/img/order_border.png') repeat; /* Opera */
        border-image:url('../../../assets/img/order_border.png') repeat;
        -webkit-border-image-slice: 12 0;
        -o-border-border-image-slice: 12 0;
        border-image-slice: 12 0;

        padding-left: 160/@dev-Width *1rem;
        padding-right: 60/@dev-Width *1rem;
        position: relative;
        margin-bottom: 78/@dev-Width *1rem;
        .coupon-money{
            height: 100%;
            .ik-box;
            .ik-box-align(center);
            span{
                vertical-align: -0.04rem;
            }
        }
        .coupon-men{
            position: absolute;
            bottom: 30/@dev-Width *1rem;
            right: 60/@dev-Width *1rem;
        }
        &::after{
            content:'';
            width: 236/@dev-Width *1rem;
            height: 100%;
            background: url('../../../assets/img/helppay_coupon.png') no-repeat;
            background-size: cover;
            position: absolute;
            left: 0;
            top: -1px;
        }
    }
    .helppay-time{
        width: 55%;
        margin: 0 auto;
        text-align: center;
    }
    .helppay-choice-box{
        width: 100%;
        padding: 80/@dev-Width *1rem 28/@dev-Width *1rem;
        .helppay-choice-buttom{
            color:#fff;
            text-align: center;
            padding: 38/@dev-Width *1rem 0;
            .border-radius(8px);
            margin-top: 38/@dev-Width *1rem;
        }
    }
    .helppay-choice-explain{
        width: 100%;
        margin-top: 80/@dev-Width *1rem;
        color: #333333;
        p{
            color: #666666;
            margin-top: 40/@dev-Width *1rem;
        }
    }
    .helppay-inf{
        width: 100%;
        padding-left: 25/@dev-Width *1rem;
        &>p{
            padding: 30/@dev-Width *1rem 0;
            color: #666666;
        }
    }
    .helppay-goods{
        width: 100%;
        padding: 20/@dev-Width *1rem 0;
    }
    .helppay-img{
        float: left;
        width: 200/@dev-Width *1rem ;
        height: 200/@dev-Width *1rem ;
        overflow: hidden;
    }
    .helppay-goods-inf{
        float: right;
        width: 78%;
        padding-right: 30/@dev-Width *1rem;
        p:last-child{
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(justify);
            margin-top: 75/@dev-Width *1rem;
            span{
                display: block;
            }
        }
    }
}
//颜色
.f23{
    background: #f23030;
}
.f23{
    background: #f23030;
}
.ff8{
    background: #ff8522;
}
</style>
