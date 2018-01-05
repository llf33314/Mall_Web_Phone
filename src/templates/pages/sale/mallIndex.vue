
<template>
    <div class="shop-wrapper sale-wrapper" >
      <div class="search-div">
        <div class="s-div" @click="search">
          <input placeholder="搜索商品" />  
          <i class="icon-sousuo iconfont"></i>
        </div> 
        <div class="set-div" @click="toSet"><i class="icon-shezhi1 iconfont"></i><span>设置</span></div>
      </div>
      <div class="nav-div" v-if="mallSet != null">
        <div class="banner-div">
          <default-img :background="imgUrl+mallSet.bannerPath" :isHeadPortrait="0" class="img-div"></default-img>
        </div>
        <div class="nav-content">
          <default-img :background="imgUrl+mallSet.mallHeadPath" :isHeadPortrait="1" class="img-div"></default-img>
          <div class="c-div-desc">
            <div class="nav-item-div" @click="toAllProduct">
              <p class="fs60">{{productList.length || 0}}</p>
              <p>全部商品</p>
            </div>
            <div class="rborder"></div>
            <div class="nav-item-div" @click="tel">
              <i class="iconfont icon-dianhua2"></i>
              <p >电话</p>
            </div>
            <div class="rborder"></div>
            <div class="nav-item-div" @click="toQQ">
              <i class="iconfont icon-QQ"></i>
              <p>QQ</p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-div" v-if="productList != null && productList.length > 0">
        <div class="pro-item-div" v-for="(product,index) in productList" :key="index" @click="toProductDetail(product)">
          <default-img :background="product.image_url" :isHeadPortrait="0" class="img-div"></default-img>
          <p class="title-p">{{product.pro_name}}</p>
          <p class="p-price">
            <span class="shopFont fs50">￥{{product.price | moneySplit1}}.<em>{{product.price | moneySplit2}}</em></span>
            <span class="fs34">销量：{{product.sale_total}}</span>
          </p>
        </div>
      </div>
      <wx-share :shareData="shareObj"></wx-share>
    </div>
</template>

<script>
import defaultImg from "components/defaultImg";
import filte from "@/lib/filters";
import wxShare from "components/wxShare"; //微信分享
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      saleMemberId: this.$route.params.saleMemberId, //销售员id
      mallSeller: null, //销售员对象
      isSeller: 1, //是否销售员 1是  0不是,要跳转至异常页面
      productList: null, //商品集合
      mallSet: null, //商城设置
      background: "/static/img/kuaidiyuan.21c5411.png",
      imgUrl: null,
      shareObj: null,//分享内容
    };
  },
  components: {
    defaultImg,
    wxShare
  },
  //已成功挂载，相当ready()
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("商城首页");
    this.$store.commit("show_footer", true); //显示底部导航栏
    // console.log(this.$parent.getPageId(this.busId,0))
    this.$parent.setSaleMemberId(this.saleMemberId);
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
        saleMemberId: this.saleMemberId,
        ucLogin: 1,//不需要登陆
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_mall_index_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          console.log(myData, "myData");
          _this.mallSeller = myData.mallSeller;
          _this.isSeller = myData.isSeller;
          _this.productList = myData.productList;
          _this.mallSet = myData.mallSet;
          _this.imgUrl = data.imgUrl;
          _this.getWxShare(myData);
        }
      });
    },
    //获取微信分享数据
    getWxShare(myData) {
      let _shareObj = {
        title: this.mallSet.mallName,
        desc:  this.mallSet.mallIntroducation || this.mallSet.mallName,
        url: location.href,
        imgUrl: this.imgUrl + this.mallSet.mallHeadPath,
        isOpenAllMenu: true, //显示所有功能按钮接口
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
        ]
      };
      this.shareObj = _shareObj;
    },
    //进入商城设置页面
    toSet() {
      this.$router.push("/seller/mallset/" + this.busId + "/1/-");
    },
    //进入商品详情页面
    toProductDetail(obj) {
      let saleMemberId = this.mallSeller.memberId;
      this.$router.push(
        "/goods/details/" +
          obj.shop_id +
          "/" +
          obj.user_id +
          "/0/" +
          obj.id +
          "/0/" +
          saleMemberId +
          "/0"
      );
    },
    //打电话
    tel() {
      let contactNumber = this.mallSet.contactNumber;
      console.log(contactNumber, "contactNumber");
      if (this.commonFn.isNull(contactNumber)) {
        return;
      }
      window.location.href = "tel://" + contactNumber;
    },
    //进入QQ聊天
    toQQ() {
      let qq = this.mallSet.qq;
      location.href =
        "http://wpa.qq.com/msgrd?v=3&amp;uin=" +
        qq +
        "&amp;site=qq&amp;menu=yes";
    },
    //进入全部商品页面
    toAllProduct() {
      let saleMemberId = this.mallSeller.memberId;
      this.$router.push("/classify/0/" + this.busId + "/8/k=k/" + saleMemberId);
    },
    //进入搜索页面
    search() {
      let saleMemberId = this.mallSeller.memberId;
      this.$router.push("/search/" + this.busId + "/8/k=k/" + saleMemberId);
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
  .search-div {
    width: 100%;
    // height: 137/@dev-Width *1rem;
    padding: 24/@dev-Width *1rem 14/@dev-Width *1rem 16/@dev-Width *1rem 39/@dev-Width *1rem;
    .shop-box-center;
    .s-div {
      width: 92%;
      height: 99/@dev-Width *1rem;
      background-color: #eef2f5;
      padding-left: 80/@dev-Width *1rem;
      position: relative;
      overflow: hidden;
      .border-radius(10px);
      .fs0;
      input {
        width: 100%;
        height: 100%;
        .fs40;
        background-color: #eef2f5;
        border: 0;
        width: 100%;
        outline: 0;
        word-wrap: break-word;
      }
      i {
        position: absolute;
        left: 20/@dev-Width *1rem;
        top: 25%;
        color: #999999;
      }
    }
    .set-div {
      width: 8%;
      .shop-textc;
      .fs0;
      i {
        .fs64;
      }
      span {
        .fs26;
      }
    }
  }
  .nav-div {
    position: relative;
    .border;
    .banner-div {
      width: 100%;
      height: 463/@dev-Width *1rem;
      .img-div {
        width: 100%;
        height: 100%;
      }
    }
    .nav-content {
      height: 198/@dev-Width *1rem;
      line-height: 1;
      .img-div {
        position: absolute;
        left: 29/@dev-Width *1rem;
        bottom: 40/@dev-Width *1rem;
        height: 312/@dev-Width *1rem;
        width: 312/@dev-Width *1rem;
        .border-radius(5px);
        overflow: hidden;
        z-index: 2;
        -webkit-box-shadow: 0 0 0.1rem #d2d2d2;
        box-shadow: 0 0 0.1rem #d2d2d2;
      }
      .c-div-desc {
        width: 70%;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 198/@dev-Width *1rem;
        .ik-box;
        .ik-box-pack(justify);
        .ik-box-align(center);
        .nav-item-div {
          padding: 32/@dev-Width *1rem 0 43/@dev-Width *1rem 0;
          width: 32%;
          height: 100%;
          .shop-textc;
          vertical-align: bottom;
          p.iconfont {
            vertical-align: bottom;
            height: 100%;
          }
          i {
            display: block;
            .fs66;
            padding-bottom: 20/@dev-Width *1rem;
            color: #444444;
            height: 80/@dev-Width *1rem;
          }
          p:last-child {
            .fs40;
            color: #7a7e83;
          }
          .fs60 {
            vertical-align: bottom;
            height: 80/@dev-Width *1rem;
            line-height: 80/@dev-Width *1rem;
            padding-bottom: 20/@dev-Width *1rem;
          }
        }
        .rborder {
          border-right: 1px solid #cccccc;
          padding: 44/@dev-Width *1rem 0;
        }
      }
    }
  }
  .main-div {
    padding-bottom: 158/@dev-Width *1rem;
    width: 100%;
    .clearfix;
    .pro-item-div {
      width: 50%;
      float: left;
      .img-div {
        width: 550/@dev-Width *1rem;
        height: 550/@dev-Width *1rem;
      }
      .title-p {
        .text-more-overflow(2);
        .fs44;
        width: 100%;
        height: 115/@dev-Width *1rem;
        overflow: hidden;
        .p-padding;
      }
      .p-price {
        line-height: 1;
        height: 141/@dev-Width *1rem;
        .p-padding;
        .shop-box-center;
        .fs0;
        span {
          display: block;
          width: 50%;
          .text-overflow;
          em {
            .fs34;
          }
        }
        span:last-child {
          color: #87858f;
          .shop-textr;
        }
      }
      .p-padding {
        padding: 0 52/@dev-Width *1rem 0 28/@dev-Width *1rem;
      }
    }
  }
}
</style>

