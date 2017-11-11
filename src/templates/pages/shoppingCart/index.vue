<template>
<div id='app' class="shop-wrapper order-wrapper">
    <header-nav :headers= 'homeNav'></header-nav>
    <section class="shop-main-no fs40 my-bond" v-if="isShow">
        <content-no :statu='bondStatu'></content-no>
    </section>
    <section class="shop-main order-main shoopCart-main" v-else>
        <div class="order-box">
            <div class="order-item">
                <div class="order-item-title fs40">
                    <i class="iconfont icon-dui"></i>
                    <div class="order-title-img">
                      <default-img :background="background"
                                  :isHeadPortrait="1">
                      </default-img>
                    </div>
                    <span>广东谷通科技有限公司</span>
                </div>
                <div class="shopping-box">
                    <div class="order-shop border">
                        <p class="order-shop-name">
                            <i class="iconfont icon-dui"></i>
                            <i class="iconfont icon-dianpu"></i>
                            <span class="fs36">江北店</span>
                            <i class="iconfont icon-you"></i>
                        </p>
                        <p class="fs42 shopGray">
                            编辑
                        </p>
                    </div>
                    <div class="order-item-box">
                        <div class="order-item-content  border"
                            style="width:120%" @touchmove="delete_show($event)"
                            @touchstart="delete_a($event)">
                            <div class="shoopCart-content">
                                <div class="order-item-img">
                                  <default-img :background="background"
                                                :isHeadPortrait="0">
                                  </default-img>
                                    <i class="iconfont icon-dui"></i>
                                </div>
                                <div class="order-item-txt">
                                    <p class="fs42">Apple iPhone 7 Plus (A1661) 128GB 玫瑰金 色 移动联通电信4G手机</p>
                                    <p class="fs36 shopGray">玫瑰金/128GB/1件/包邮</p>
                                    <p class="fs42 shop-font">¥7,199.<span class="fs32">00</span></p>
                                </div>
                            </div>
                            <div class="shoopCart-delete fs42 shop-bg"
                                @click.stop="delete_dialog">
                                删除
                            </div>
                        </div>
                        <div class="order-item-content  border"
                            style="width:120%" @touchmove="delete_show($event)"
                            @touchstart="delete_a($event)">
                            <div class="shoopCart-content">
                                <div class="order-item-img">
                                  <default-img :background="background"
                                                :isHeadPortrait="0">
                                  </default-img>
                                  <i class="iconfont icon-dui"></i>
                                </div>
                                <div class="order-item-txt">
                                    <p class="fs42">Apple iPhone 7 Plus (A1661) 128GB 玫瑰金 色 移动联通电信4G手机</p>
                                    <p class="fs36 shopGray">玫瑰金/128GB/1件/包邮</p>
                                    <p class="fs42 shop-font">¥7,199.<span class="fs32">00</span></p>
                                </div>
                            </div>
                            <div class="shoopCart-delete fs42 shop-bg"
                                    @click.stop="delete_dialog">
                                删除
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shopping-footer clearfix">
            <div class="shopping-footer-l fs40">
                <i class="iconfont icon-dui"></i>
                合计：<span class="shop-font">￥7,199.00</span>
            </div>
            <div class="shopping-footer-r">
                <div class="shopping-buttom fs50 shop-yellow">
                    继续选购
                </div>
                <div class="shopping-buttom fs50 shop-bg">
                    去结算(1)
                </div>
            </div>
        </div>
    </section>
    <shop-dialog ref="dialog"></shop-dialog>
    <footer-nav :navshow="isNavshow"></footer-nav> 
</div>
</template>

<script>
import defaultImg from 'components/defaultImg'
import headerNav from 'components/headerNav'
import footerNav from 'components/footerNav'
import shopDialog from 'components/shopDialog'
import contentNo from 'components/contentNo'
export default {
  name: 'shippingCart',	
  data(){
    return{
      isPhoto: false,
      homeNav:['购物车', '批发商购物车'],
      isNavshow: 'shop',
      isShow: false,
      bondStatu: 3,
      isdeltaX:'',
      background:''
    }
  },
  components:{
	  footerNav,defaultImg,shopDialog,headerNav,contentNo
  },
  methods:{
      //删除弹出窗
      delete_dialog(e){
          var _this = this;
          _this.disableScroll();
          var msg = {//弹出框组件调用
              'btnNum': '2',
              'dialogMsg': '是否删除该商品？',
              'btnOne': '是',
              'btnTow': '否',
              'dialogTitle':'提示',
              'callback': {
                  'btnOne': function () {
                      //关闭
                      //_this.allowScroll();
                      console.log('确定');
                      $(e.target).parents('.order-item-content').remove(); 
                  },
                  'btnTow': function () {
                      //确定
                      //_this.allowScroll();
                      console.log('取消');
                      $(e.target).parents('.order-item-content').animate({left:"0%"},300);
                  }
              }
          }
          _this.$refs.dialog.showDialog(msg);//弹出框
      },
      delete_show(e){
          var deltaX;//保存X移动距离
          if (e.targetTouches.length == 1) {
      　　　　 e.preventDefault();// 阻止浏览器默认事件，重要 
              var touch = e.targetTouches[0];
              deltaX = touch.pageX-this.isdeltaX;
              if(deltaX<0){
                  //向左
                  $(e.target).parents('.order-item-content').animate({left:"-20%"});
                  return;
              }else{
                  //向右
                  $(e.target).parents('.order-item-content').animate({left:"0%"});
                  return;
              }
          }
      },
      delete_a(e){
          //获取初始值；
          var touch = e.targetTouches[0];
          this.isdeltaX = touch.pageX;
      }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';

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
.shoopCart-main{
    width: 100%;
    .order-box{
        background: #fff;
    }
    .order-item-content{
        width: 120%;
    }
    .shoopCart-content{
        width: 85%;
        .ik-box;
        .ik-box-pack(justify);
    }
    .icon-dui{
        background:#bfbfbf;
        color: #fff;
        margin-right: 20/@dev-Width *1rem;
        padding: 3px;
    }
    .order-box{
        width: 100%;
        overflow: hidden;
    }
    .order-item-img{
        position: relative;
        i{
            position: absolute;
            top:0;
            left: 0;
        }
    }
    .shoopCart-delete{
        width: 15%;
        height: 300/@dev-Width *1rem;
        color: #fff;
        text-align: center;
        line-height: 300/@dev-Width *1rem;
    }
    .shopping-footer{
        width: 100%;
        background: #fff;
        position: fixed;
        height: 164/@dev-Width *1rem;
        bottom: 1.05333333rem;
        border-top: 1px solid #e2e2e2;
        .shopping-footer-l{
            width: 45%;
            float: left;
            height: 100%;
            .ik-box;
            .ik-box-align(center);
            padding-left: 38/@dev-Width *1rem;
        }
        .shopping-footer-r{
            width: 55%;
            float: left;
            height: 100%;
            .ik-box;
            .shopping-buttom{
                .ik-box;
                .ik-box-flex(1);
                height: 100%;
                text-align: center;
                color: #fff;
                .ik-box-pack(center);
                .ik-box-align(center);
            }
        }
    }
}
</style>
