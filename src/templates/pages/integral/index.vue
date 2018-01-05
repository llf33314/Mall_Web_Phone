<template>
  <div id='app' class="shop-wrapper integral-wrapper" >
    <div class="integral-top">
      <div class="bg-div">
        <p class="fs40">我的积分</p>
        <p class="fs70" v-if="memberId == 0">还未登陆，请先登陆</p>
        <p v-if="memberId > 0">{{memberIntegral}}</p>
      </div>
      <div class="bg-color"></div>
      <div class="bg-tab">
        <div  @click="toIntegralRecord()"><i class="icon-event iconfont"></i>兑换记录</div>
        <div @click="toIntegralDetail()"><i class="icon-asset iconfont"></i>积分明细</div>
      </div>
    </div>
    <div class="integral-middle" v-if="imageList != null && imageList.length > 0">
      <banner :banner="imageList" :imgUrl="imgUrl" :height="'1.77rem'" :imgCla="'cla-img'"></banner>
    </div>
    <div class="integral-product" v-if="integralList != null">
      <div class="product-item" v-for="(integral , index) in integralList" :key="index" @click="toIntegralProduct(integral)">
          <div class="product-content">
            <div class="product-img">
              <default-img :background="imgUrl+integral.image_url" :isHeadPortrait="0"></default-img>
            </div>
            <div class="content-div">
              <p class="product-title">{{integral.pro_name}}</p>
              <p class="div-text">微会员积分兑换</p>
              <p class="shop-font">{{integral.money}}积分</p>
            </div>
          </div>
          <div class="div-icon iconfont icon-you"></div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from "components/defaultImg";
import banner from "../goods/child/banner";
export default {
  name: "succeed",
  data() {
    return {
      background: null,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      imgUrl: "", //图片域名
      integralObj: null, //积分对象
      integralList: null, //积分列表
      imageList: [], //轮播图片集合
      memberId: 0, //会员id
      memberIntegral: 0, //会员积分
      curPage: 1, //当前页数
      pageCount: 1 //总页数
    };
  },
  components: {
    defaultImg,
    banner
  },
  mounted() {
    this.commonFn.setTitle("积分商城");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.loadDatasImage(); //初始化图片数据
    this.loadProduct(this.curPage); //初始化积分商品
    let _this = this;
    $(window).bind("scroll", function() {
      var isScroll =
        $(window).scrollTop() > 0 &&
        $(window).scrollTop() >=
          $(document).height() - $(window).height() - 1000;
      if (isScroll) {
        _this.loadMore();
      }
    });
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadMore() {
      let pageCount = this.pageCount; //总页数
      if (this.curPage >= pageCount) {
        this.isMore = 3; //没有更多
        return;
      }
      if (this.isMore == 2) {
        return;
      }
      console.log(this.isMore, "this.isMore");
      this.curPage++; //请求页数
      this.isMore = 2;
      this.loadProduct({
        curPage: this.curPage
      });
    },
    loadDatasImage() {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        ucLogin: 1,//不需要登陆
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.integral_image_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.memberId = myData.memberId;
          _this.memberIntegral = myData.memberIntegral;
          _this.imageList = myData.imageList;
          console.log(myData, "myData");
        }
      });
    },
    loadProduct(data) {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        ucLogin: 1,//不需要登陆
        curPage: data.curPage || this.curPage || 1
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.integral_product_list_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          let page = myData.page;
          if (page == null) {
            _this.isMore = 3; //没有更多
            $(window).unbind("scroll");
            return;
          }
          _this.imgUrl = data.imgUrl;
          _this.curPage = page.curPage;
          _this.pageCount = page.pageCount;
          // _this.integralList = myData.subList;

          if (_this.curPage === 1) {
            //第一页数据
            _this.integralList = page.subList;
          } else {
            _this.integralList = _this.integralList.concat(page.subList) || []; //拼接多页数据
          }
          console.log("_this.integralList", _this.integralList);
          _this.isMore = 1;
          if (_this.curPage >= _this.pageCount) {
            _this.isMore = 3; //没有更多

            $(window).unbind("scroll");
          }
        }
      });
    },
    //跳转到积分明细
    toIntegralDetail() {
      this.$router.push("/integral/detail/" + this.busId);
    },
    //跳转到兑换明细
    toIntegralRecord() {
      this.$router.push("/integral/record/" + this.busId);
    },
    //跳转到积分商品页面
    toIntegralProduct(integral) {
      this.$router.push(
        "/integral/product/" +
          integral.busId +
          "/" +
          integral.product_id +
          "/" +
          integral.shop_id
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
.integral-top {
  width: 100%;
  .bg-div {
    height: 400/@dev-Width *1rem;
    background: url("../../../assets/img/integral-bg.jpg");
    color: #fff;
    p {
      .shop-textc;
    }
    p:first-child {
      padding: 100/@dev-Width *1rem 0 40/@dev-Width *1rem;
    }
    p:last-child {
      font-size: 150/@dev-Width *1rem;
    }
    .fs70 {
      font-size: 70/@dev-Width *1rem !important;
    }
  }
  .bg-color {
    .shopRose-bg;
    height: 10/@dev-Width *1rem;
  }
  .bg-tab {
    background: #f86076;
    height: 170/@dev-Width *1rem;
    .shop-box-center;
    color: #fff;
    div {
      .fs45;
      width: 50%;
      height: 100%;
      line-height: 170/@dev-Width *1rem;
      .shop-textc;
      i {
        margin-right: 45/@dev-Width *1rem;
      }
    }
  }
}
.integral-middle {
  width: 100%;
  // height: 272/@dev-Width *1rem;
  padding: 10/@dev-Width *1rem 0;
  background: #fff;
}
.integral-product {
  .product-item {
    margin-top: 10/@dev-Width *1rem;
    height: 300/@dev-Width *1rem;
    background: #fff;
    .shop-box-center;
    .product-content {
      width: 90%;
      .ik-box;
      .ik-box-pack(left);
      .ik-box-align(left);
      .product-img {
        height: 300/@dev-Width *1rem;
        width: 300/@dev-Width *1rem;
        background-size: cover;
      }
      .content-div {
        padding: 0 40/@dev-Width *1rem;
        width: 74%;
        .product-title {
          padding: 30/@dev-Width *1rem 0;
          .fs50;
          .text-overflow;
        }
        p {
          .fs40;
        }
        .div-text {
          color: #a9a9a9;
          padding-bottom: 30/@dev-Width *1rem;
        }
      }
    }
    .div-icon {
      width: 10%;
      .shop-textc;
      height: 100%;
      line-height: 300/@dev-Width *1rem;
    }
  }
}
</style>
