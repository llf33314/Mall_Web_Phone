<template>
  <div class="shop-wrapper ">
     <section class="shop-main fs40 my-index">
        <div class="my-header shop-bg">
            <div class="my-indexUser">
               <default-img :background="background"
                            :isHeadPortrait="1">
                </default-img>
            </div>
            <p class="fs46">duofeng</p>
        </div>
        <div class="my-content fs46">
            <div class="my-order">
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-order"></i>
                        我的订单
                    </div>
                    <div class="my-right fs32">
                        查看全部订单
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <ul class="my-nav fs36">
                    <li>
                        <i class="iconfont icon-zhifu"></i>
                        <p>待支付</p>
                    </li>
                      <li>
                        <i class="iconfont icon-daifahuo"></i>
                        <p>待发货</p>
                    </li>
                    <li>
                        <i class="iconfont icon-daishouhuo"></i>
                        <p>待收货</p>
                    </li>
                    <li>
                        <i class="iconfont icon-daipingjia"></i>
                        <p>待评价</p>
                    </li>
                    <li>
                        <i class="iconfont icon-tuikuan"></i>
                        <p>退款/售后</p>
                    </li>   
                </ul>
            </div>
            <div class="my-path">
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-8"></i>
                        我的会员
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-youhuiquan"></i>
                        我的优惠券
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-daipingjia"></i>
                        我的评价
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-fav"></i>
                        我的收藏
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-daifahuo"></i>
                        快递查询
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
            </div>
            <div class="my-path">
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-jingpai"></i>
                        我的竞拍
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-miaoshaweixuanzhong"></i>
                        我的秒杀
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-pifaguize"></i>
                        我的批发
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-tuangou"></i>
                        我的团购
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-daishouchanpin"></i>
                        我的预售
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
                <div class="my-list border">
                    <div>
                        <i class="iconfont icon-jingjiren"></i>
                        超级销售员
                    </div>
                    <div class="my-right fs32">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="shop-footer">
        <div class="shop-logo"></div>
    </section>
    <footer-nav :navshow='isNavshow'></footer-nav> 
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
      isNavshow: 'my',
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


.my-index{
  width: 100%;
  color: #666;
  margin-bottom: 65 /@dev-Width *1rem; 
  .my-header{
      width: 100%;
      height: 520 /@dev-Width *1rem;
      background-image: url('../../../assets/img/myHbg.png');
      background-size: cover;
      background-repeat: no-repeat;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(center);
      .ik-box-orient(vertical);
      color: #fff;
      .my-indexUser{
          font-size: 0;
          width: 210 /@dev-Width *1rem;
          height: 210 /@dev-Width *1rem;
          .border-radius(100%);
          border: 6/@dev-Width *1rem solid #fff;
          overflow: hidden;
          color: rgba(0,0,0,0);
          margin-bottom: 25 /@dev-Width *1rem
      }
  }
  .my-order{
      background: #fff;
      margin-bottom: 30 /@dev-Width *1rem;
      .my-list{
          line-height: 1;
          .ik-box;
          .ik-box-align(center);
          .ik-box-pack(justify);
          height: 135 /@dev-Width *1rem;
          padding: 0 56 /@dev-Width *1rem;
          i{
              font-size: 68 /@dev-Width *1rem
          }
          .my-right{
              color: #9e9e9e;
              i{
                  font-size: 36 /@dev-Width *1rem; 
                  color: #d7d7db;
              }
          }
      }
      .my-nav{
          .ik-box;
          .ik-box-pack(justify);
          padding: 0 35 /@dev-Width *1rem;
          color: #666;
          li{
              text-align: center;
              width: 20%;
              padding: 55 /@dev-Width *1rem 0; 
              i{
              font-size: 68 /@dev-Width *1rem;
              }
          }
      }
  }
  .my-path{
      width: 100%;
      background: #fff;
      margin-bottom: 20 /@dev-Width *1rem;
        .my-list{
          .ik-box;
          .ik-box-align(center);
          .ik-box-pack(justify);
          height: 135 /@dev-Width *1rem;
          padding: 0 56 /@dev-Width *1rem;
          i{
              font-size: 68 /@dev-Width *1rem;
              vertical-align: -0.05rem
              
          }
          .my-right{
              font-size: 45 /@dev-Width *1rem; 
              color: #d7d7db;
          }
      }
  }
}
</style>
