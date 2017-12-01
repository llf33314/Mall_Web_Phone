<template>
  <div id='app' class="shop-wrapper integral-wrapper" >
    <div class="integral-top">
      <div class="bg-back icon-yuanq iconfont icon-jiantou-copy1" @click="back"></div>
      <div class="bg-div">
        <p class="fs40">当前积分</p>
        <p v-if="integralObj != null">{{integralObj.memberIntegral || 0}}</p>
      </div>
    </div>
    <div class="integral-middle">

    </div>
    <div class="integral-product" v-if="integralArr != null">
      <div class="product-item" v-for="(integral,index) in integralArr" :key="index">
          <div class="product-content">
            <p class="fs46 text-overflow">{{integral.itemName}}</p>
            <p class="div-text fs40">{{integral.createDate | formatNot}}</p>
          </div>
          <div class="div-icon shop-font fs46">{{integral.number}}</div>
      </div>
    </div>
    <content-no :statu="statu" v-if="isShowNo"></content-no>
    <more :isMore="3" v-if="isShowMore"></more>
  </div>
</template>

<script>
import contentNo from "components/contentNo"; //无内容显示
import more from "components/more"; //更多
import filte from "@/lib/filters";
export default {
  name: "succeed",
  data() {
    return {
      background:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      imgUrl: "", //图片域名
      integralArr: null, //积分集合
      integralObj: null, //积分数据
      statu: 2, //无信息插件状态
      isShowNo: false, //是否显示没有内容的插件
      isShowMore: false //是否显示 没有更多的 插件
    };
  },
  components: { contentNo, more },
  mounted() {
    this.commonFn.setTitle("积分明细");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.loadIntegralDetail();
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadIntegralDetail(data) {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.integral_detail_post,
        data: _data,
        success: function(data) {
          let myData = data.data;

          _this.integralObj = myData;
          let integralList = myData.integralList;
          if (integralList == null) {
            _this.isShowNo = true;
            return;
          }
          console.log(integralList, "myData", myData);
          _this.integralArr = integralList;
          _this.isShowMore = true;
        }
      });
    },
    back() {
      window.history.go(-1);
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
  position: relative;
  z-index: 1;
  .icon-yuanq {
    display: block;
    width: 70/@dev-Width *1rem;
    height: 70/@dev-Width *1rem;
    line-height: 70/@dev-Width *1rem;
    border: 0px solid #c9c9c9;
    color: #fff;
    background: #ac273b;
    .border-radius(100%);
    .shop-textc;
    position: absolute;
    top: 27/@dev-Width *1rem;
    left: 27/@dev-Width *1rem;
    z-index: 2;
  }
  .bg-div {
    height: 400/@dev-Width *1rem;
    background: url("../../../assets/img/integral-bg.jpg");
    color: #fff;
    p {
      .shop-textc;
    }
    p:first-child {
      .fs40;
      padding-top: 100/@dev-Width *1rem;
    }
    p:last-child {
      font-size: 150 /@dev-Width *1rem;
      line-height: 1;
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
.integral-product {
  .product-item {
    .border;
    height: 210/@dev-Width *1rem;
    background: #fff;
    padding: 0 30/@dev-Width *1rem;
    .shop-box-center;
    .product-content {
      width: 80%;
      line-height: 1;
      .div-text {
        color: #a9a9a9;
        padding-top: 28/@dev-Width *1rem;
      }
    }
    .div-icon {
      width: 20%;
      .shop-textr;
      height: 100%;
      line-height: 300/@dev-Width *1rem;
    }
  }
}
</style>
