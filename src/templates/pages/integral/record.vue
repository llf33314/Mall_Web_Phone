<template>
  <div id='app' class="shop-wrapper integral-wrapper">
    <div class="integral-top">
      <div class="bg-back icon-yuanq iconfont icon-jiantou-copy1" @click="back"></div>
      <div class="bg-div" v-if="integralObj != null">
        <p class="fs40">累计兑换</p>
        <p >{{integralObj.totalIntegral || 0}}</p>
      </div>
    </div>
    <div class="integral-middle">

    </div>
    <div class="integral-product" v-if="integralArr != null">
      <div class="product-item" v-for="(integral,index) in integralArr" :key="index">
          <div class="product-content">
            <p class="fs46 text-overflow">{{integral.det_pro_name}}</p>
            <p class="div-text fs40">{{integral.times | formatNot}}</p>
          </div>
          <div class="div-icon shop-font fs46">-{{integral.order_money}}</div>
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
      integralObj: null,
      curPage: 1, //当前页数
      pageCount: 1, //总页数
      statu: 2, //无信息插件状态
      isShowNo: false, //是否显示没有内容的插件
      isShowMore: false //是否显示 没有更多的 插件
    };
  },
  components: { contentNo, more },
  mounted() {
    this.commonFn.setTitle("兑换记录");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.loadIntegralDetail({
      curPage: 1
    });
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
      this.loadIntegralDetail({
        curPage: this.curPage
      });
    },
    loadIntegralDetail(data) {
      console.log(data.curPage, "data.curPage");
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        curPage: data.curPage > 0 ? data.curPage : 1
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.integral_record_list_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.integralObj = myData;
          let pageUtil = data.data.pageUtil;
          if (pageUtil == null) {
            _this.isMore = 3; //没有更多
            $(window).unbind("scroll");
            return;
          }
          let newOrderList = pageUtil.subList;
          _this.curPage = pageUtil.curPage; //当前页数
          _this.pageCount = pageUtil.pageCount; //总页数
          console.log(pageUtil, "myData");
          if (_this.curPage === 1) {
            //第一页数据
            _this.integralArr = newOrderList;
          } else {
            _this.integralArr = _this.integralArr.concat(newOrderList) || []; //拼接多页数据
          }
          console.log("_this.integralArr", _this.integralArr);
          // _this.isShowNullContent = false;
          _this.isMore = 1;
          if (_this.curPage >= _this.pageCount) {
            _this.isMore = 3; //没有更多
            $(window).unbind("scroll");
          }
        }
      });
    },
    back() {
      // window.history.go(-1);
      this.$router.push("/integral/index/" + this.busId);
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
      .text-overflow;
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
