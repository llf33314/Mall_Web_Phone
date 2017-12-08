
<template>
    <div class="shop-wrapper sale-wrapper" >
        <div class="seller-nav">
            <default-img :background="mallSeller.headImagePath" :isHeadPortrait="1" class="img-div"></default-img>
            <div class="nav-right">
                <p class="bgfont1"></p>
                <p class="fs50">我是<em>{{mallSeller.userName || ""}}</em></p>
                <p class="fs50">我要为<em>{{mallSet.mallName || ""}}</em>代言</p>
            </div>
        </div>
        <div class="pro-div" v-if="productMap != null"  @click="productDetail">
            <default-img :background="imgUrl+productMap.image_url" :isHeadPortrait="0" class="img-div"></default-img>
            <div class="pro-title-div">
                <p class="fs50 c-wite">{{productMap.pro_name}}</p>
                <p class="fs50">￥{{productMap.price}}</p>
            </div>
        </div>
        <div class="code-div">
          <div class="code-title-div"></div>
          <div class="code-main-div">
             <default-img :background="mallSeller.qrCodePath" :isHeadPortrait="0" class="img-div"></default-img>
             <default-img :background="mallSeller.qrCodePath" :isHeadPortrait="0" class="img-div-float"></default-img>
             <img src="../../../assets/img/seller/xwz.png"  class="img-div" />
          </div>
          <div class="fs-rose-color">关注我们&nbsp;加入有礼品&nbsp;购买有惊喜</div>
        </div>
        <div class="zq-div">
          <div class="zq-title-div">如何赚钱</div>
          <p><span>第一步</span><span>转发商品链接或商品图片给微信好友；</span></p>
          <p><span>第二步</span><span>从您转发的链接或图片进入商场的好友，系统将自动定为您的客户，它们在微信商场中购买任何商品，您都可以获得销售佣金</span></p>
          <p><span>第三步</span><span>您可以在销售中心查看【我的客户】和【客户订单】，好友确认收货后佣金方可提现。</span></p>
        </div>
    </div>
</template>

<script>
import defaultImg from "components/defaultImg";
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      saleMemberId: this.$route.params.saleMemberId, //销售员id
      proId: this.$route.params.proId, //商品id
      imgUrl: null,
      mallSeller: {
        headImagePath: null
      }, //销售员对象
      productMap: null, //商品集合
      mallSet: {
        mallName: null
      } //商城设置
    };
  },
  components: {
    defaultImg
  },
  //已成功挂载，相当ready()
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("分享页面");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  watch: {
    productMap() {
      this.$nextTick(function() {
        $(".pro-div").height($(window).width());
      });
    }
  },
  //相关操作事件
  methods: {
    loadDatas() {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        saleMemberId: this.saleMemberId, //销售员id
        productId: this.proId //商品id
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_share_product_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          // console.log(myData, "myData");
          _this.mallSeller = myData.mallSeller;
          _this.productMap = myData.productMap;
          _this.mallSet = myData.mallSet;
          _this.imgUrl = data.imgUrl;
        }
      });
    },
    productDetail() {
      console.log(this.productMap);
      let product = this.productMap;
      let shopId = product.shop_id;
      let busId = this.busId;
      let productId = product.id;
      let saleMemberId = this.saleMemberId;
      this.$router.push(
        "/goods/details/" +
          shopId +
          "/" +
          busId +
          "/8/" +
          productId +
          "/0/" +
          saleMemberId +
          "/" +
          0
      );
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";

.sale-wrapper {
  width: 100%;
  position: relative;
  background-color: #fff;
  .seller-nav {
    padding: 59/@dev-Width *1rem 39/@dev-Width *1rem 65/@dev-Width *1rem 43/@dev-Width *1rem;
    .ik-box;
    .ik-box-pack(left);
    .ik-box-align(center);
    .img-div {
      width: 179/@dev-Width *1rem;
      height: 179/@dev-Width *1rem;
      .border-radius(100%);
      overflow: hidden;
    }
    .nav-right {
      width: 76%;
      border: 1px solid #ececec;
      padding: 34 /@dev-Width *1rem;
      position: relative;
      .border-radius(5px);
      z-index: 1;
      margin-left: 40/@dev-Width *1rem;
      p {
        em {
          color: #ffb401;
        }
      }
      .bgfont1 {
        position: absolute;
        top: 90/@dev-Width *1rem;
        left: -11/@dev-Width *1rem;
        width: 20 /@dev-Width *1rem;
        height: 20 /@dev-Width *1rem;
        background: #fff;
        border-top: 1px solid;
        border-left: 1px solid;
        border-color: #ececec;
        transform: rotate(-45deg);
      }
    }
  }
  .pro-div {
    position: relative;
    .img-div {
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .pro-title-div {
      height: 252/@dev-Width *1rem;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 70/@dev-Width *1rem 95/@dev-Width *1rem 60/@dev-Width *1rem 58/@dev-Width *1rem;
      width: 100%;
      line-height: 1;
      z-index: 2;
      p {
        .text-overflow;
      }
      p:last-child {
        padding: 38/@dev-Width *1rem 0 0 10/@dev-Width *1rem;
        color: #ff2828;
      }
    }
  }
  .code-div {
    height: 866/@dev-Width *1rem;
    padding: 79/@dev-Width *1rem 173/@dev-Width *1rem 119/@dev-Width *1rem 117/@dev-Width *1rem;
    .code-title-div {
      background: url("../../../assets/img/seller/code-title.jpg") no-repeat
        center center;
      background-size: 625/@dev-Width *1rem;
      margin-bottom: 53/@dev-Width *1rem;
      height: 60/@dev-Width *1rem;
    }
    .code-main-div {
      position: relative;
      width: 100%;
      height: 430/@dev-Width *1rem;
      margin-bottom: 68/@dev-Width *1rem;
      .shop-box-center;
      .img-div,
      .img-div-float {
        width: 403/@dev-Width *1rem;
        height: 403/@dev-Width *1rem;
      }
      .img-div-float {
        position: absolute;
        right: 0;
        bottom: 0;
        opacity: 0;
      }
    }
    .fs-rose-color {
      color: #951b30;
      height: 58/@dev-Width *1rem;
      line-height: 58/@dev-Width *1rem;
      .fs48;
      .shop-textc;
    }
  }
  .zq-div {
    .clearfix;
    .zq-title-div {
      height: 96/@dev-Width *1rem;
      line-height: 1;
      .fs40;
    }
    p {
      padding: 0 35/@dev-Width *1rem 50/@dev-Width *1rem 50/@dev-Width *1rem;
      .fs40;
      .clearfix;
      span {
        display: block;
        float: left;
      }
      span:last-child {
        color: #666666;
        padding-left: 44/@dev-Width *1rem;
        width: 85%;
      }
    }
    p:first-child {
      margin-bottom: 40/@dev-Width *1rem;
    }
  }
}
.c-wite {
  color: #fff;
}
</style>

