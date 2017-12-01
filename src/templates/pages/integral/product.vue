<template>
  <div id='app' class="shop-wrapper integral-wrapper" >
    <section class="section-content">
      <div class="integral-banner" v-if="imageList != null && imageList.length > 0">
        <banner :banner="imageList" :imgUrl="imgUrl"></banner>
      </div>
      <div class="integral-title">
        <div class="title-1">NIKE LUNAREPIC LOW FLYKNIT 2</div>
        <div class="title-2">
          <p>129999 积分</p>
          <p><span>23</span>人兑换</p>
        </div>
      </div>
      <div class="guige-div">
        <div class="guige-title">
          <p>规格</p>
          <p class="iconfont icon-jiantou"></p>
        </div>
        <div class="guige-item">
          <div class="name-div fs40">
            <span>颜色</span>
          </div>
          <div class="right-div">
            <span class="nav">银色</span>
            <span>黑色</span>
            <span>亮黑色</span>
            <span>玫瑰金</span>
          </div>
        </div>
        <!-- <div class="guige-item">
          <div class="name-div fs40">
            <span>尺寸</span>
          </div>
          <div class="right-div">
            <span class="nav">S</span>
            <span>M</span>
            <span>L</span>
            <span>LL</span>
            <span>X</span>
          </div>
        </div> -->
        
        <div class="guige-item2">
          <div class="name-div fs40">
            <span>数量</span>
          </div>
          <div class="right-div">
            <em class="em-choice">-</em>
            <input type="text" class="em-choice" v-model="buyNum"/>
            <em  class="em-choice">+</em>
          </div>
        </div>
      </div>
      <div class="integral-remark">
        <div class="title">兑换说明</div>
        <div>1、点击【立即兑换】，即可兑换成功；</div>
        <div>2、在【兑换记录】可查询已兑换的物品；</div>
        <div>3、兑换时间2017-03-21至2017-04-21.</div>
      </div>
    </section>
    <section class="shop-footer-fixed">
      <div class="bottom-bottom">兑换</div>
    </section>
  </div>
</template>

<script>
import defaultImg from "components/defaultImg";
import banner from "../goods/child/banner";
export default {
  name: "succeed",
  data() {
    return {
      background:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      productId: this.$route.params.productId,
      shopId: this.$route.params.shopId,
      imgUrl: "", //图片域名
      product: null, //商品对象
      productDetail: null, //商品详情
      specificaList: null, //规格集合
      integral: null, //积分商品信息
      member: null, //会员对象
      isMember: 0, //是否是会员 1是
      guige: null, //默认规格
      guigePriceList: null, //规格价集合
      imageList: null, //商品图片集合
      recordNum: 0,
      buyNum: 1
    };
  },
  components: {
    defaultImg,
    banner
  },
  mounted() {
    this.commonFn.setTitle("积分商品详情");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.loadDatas(); //初始化图片数据
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadDatas() {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        productId: _this.productId //商品id
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.integral_product_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.product = myData.product;
          _this.productDetail = myData.detail;
          _this.specificaList = myData.specificaList;
          _this.integral = myData.integral;
          _this.member = myData.member;
          _this.isMember = myData.isMember;
          _this.guige = myData.guige;
          _this.guigePriceList = myData.guigePriceList;
          _this.imageList = myData.imageList;
          _this.recordNum = myData.recordNum;
          console.log(myData, "myData");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
.section-content {
  margin-bottom: 240/@dev-Width *1rem;
  .integral-banner {
    width: 100%;
    height: 1239/@dev-Width *1rem;
    background: #fff;
  }
  .integral-title {
    width: 100%;
    height: 198/@dev-Width *1rem;
    padding: 0 30/@dev-Width *1rem;
    background: #fff;
    line-height: 1;
    .title-1 {
      .fs50;
      .text-overflow;
      width: 100%;
      padding: 40/@dev-Width *1rem 0;
    }
    .title-2 {
      .shop-box-justify;
      p:first-child {
        .shop-font;
      }
      p {
        .fs40;
        color: #a9a9a9;
        span {
          color: #000;
        }
      }
    }
  }
  .guige-div {
    background: #fff;
    .guige-title {
      padding: 60/@dev-Width *1rem 30/@dev-Width *1rem;
      .border;
      .shop-box-center;
      p {
        .fs42;
      }
      p:first-child {
        font-weight: bolder;
      }
      .icon-jiantou {
        color: #c7c7cc;
      }
    }
    .guige-item,
    .guige-item2 {
      width: 100%;
      padding: 30/@dev-Width *1rem;
      line-height: 1;
      .clearfix;
      div {
        float: left;
        font-size: 0;
        span,
        em.em-choice {
          .fs40;
          display: inline-block;
          padding: 26/@dev-Width *1rem 34/@dev-Width *1rem;
          margin: 0 *1rem 20/@dev-Width *1rem 0 20/@dev-Width *1rem;
        }
        span.nav {
          .shop-bg;
          .border-radius(3px);
        }
      }
      .name-div {
        color: #87858f;
        width: 20%;
        height: auto;
      }
      .right-div {
        width: 80%;
        em {
          width: 99/@dev-Width *1rem;
          color: #87858f;
          margin: 0 !important;
        }
        input {
          width: 120/@dev-Width *1rem;
          border: 0;
          margin: 0 3/@dev-Width *1rem !important;
          vertical-align: top;
          padding: 0;
        }
        em,
        input {
          height: 90/@dev-Width *1rem;
          text-align: center;
          display: inline-block;
          background: #f3f2f8;
          .border-radius(0);
        }
      }
    }
    .guige-item2 {
      padding-bottom: 40/@dev-Width *1rem;
      .right-div {
        float: right;
        margin-right: 40/@dev-Width *1rem;

        width: 31%;
      }
    }
  }
  .integral-remark {
    padding: 30/@dev-Width *1rem;
    margin: 20/@dev-Width *1rem 0;
    background: #fff;
    div {
      .fs40;
      color: #a9a9a9;
    }
    .title {
      font-weight: bolder;
      color: #000;
      margin-bottom: 30/@dev-Width *1rem;
    }
  }
}

.shop-footer-fixed {
  width: 100%;
  padding: 47/@dev-Width *1rem 50/@dev-Width *1rem;
  background: #fff;
  .bottom-bottom {
    .shopRose-bg;
    .fs52;
    color: #fff;
    text-align: center;
    width: 100%;
    height: 146/@dev-Width *1rem;
    line-height: 146/@dev-Width *1rem;
  }
}
</style>
