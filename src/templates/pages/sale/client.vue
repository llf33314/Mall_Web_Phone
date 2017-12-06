
<template>
  <div class="shop-wrapper sale-wrapper" v-if="seller != null">
    <header class="sale-header" v-if="member != null">
        <div class="header-img">
            <default-img :background="member.headimgurl"
                        :isHeadPortrait="1">
            </default-img>
        </div>
        <p class="fs60">{{member.nickname}}</p>
    </header>
    <div class="index-main" :class="{'main-margin': clientArr ==null || clientArr.length < 4}">
        <div class="index-msg border">
            <div class="index-msg-item">
                <p class="index-msg-title fs46">累计佣金(元)</p>
                <p class="index-msg-money fs70">{{seller.totalCommission || 0}}</p>
            </div>
            <div class="index-msg-item">
                <p class="index-msg-title fs46">积分</p>
                <p class="index-msg-money fs70">{{seller.incomeIntegral || 0}}</p>
            </div>
            <div class="index-msg-item">
                <p class="index-msg-title fs46">销售总额(元)</p>
                <p class="index-msg-money fs70">{{seller.saleMoney || 0}}</p>
            </div>
        </div>
        <div class="index-nav clearfix" v-if="clientArr != null">
            <div class="seller-item shop-box-center" v-for="(client,index) in clientArr" :key="index" >
                <div class="left-div ">
                    <div class="img-div">
                        <default-img :background="client.headimgurl"
                            :isHeadPortrait="1"></default-img>
                    </div>
                    <div class="div-title fs44 text-overflow">{{client.user_name || client.nickname}}</div>
                </div>
                <div class="right-div fs44">
                    推广收益积分：<em>{{client.income_integral}}</em>
                </div>
            </div>
        </div>
    </div>
    <technical-support v-if="$store.state.isAdvert == 1 && (clientArr !=null && clientArr.length > 4)"></technical-support>
    <div class="shop-footer-fixed" v-if="clientArr ==null || clientArr.length < 4">
      <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
    </div>
  </div>
</template>

<script>
import defaultImg from "components/defaultImg";
import filters from "@/lib/filters";
import technicalSupport from "components/technicalSupport"; //技术支持
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      seller: null, //销售员对象
      clientArr: null,
      curPage: 1, //页数
      pageCount: 1, //总页数
      member: null
    };
  },
  components: {
    defaultImg,
    technicalSupport
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle("我的客户");
    this.$store.commit("show_footer", false); //隐藏底部导航栏

    this.loadDatas({
      curPage: this.curPage
    }); //初始化数据
    this.scroll();
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  //相关操作事件
  methods: {
    scroll() {
      let _this = this;
      $(window).bind("scroll", function() {
        var isScroll =
          $(window).scrollTop() > 0 &&
          $(window).scrollTop() >=
            $(document).height() - $(window).height() - 1000;
        if (isScroll) {
          this.isMore = -1;
          _this.loadMore();
        }
      });
    },
    loadMore() {
      let pageCount = this.pageCount; //总页数
      if (this.curPage >= pageCount) {
        this.isMore = 3; //没有更多
        return;
      }
      if (this.isMore == 2) {
        return;
      }
      this.curPage++; //请求页数
      this.isMore = 2;
      this.loadDatas({
        curPage: this.curPage
      });
    },
    loadDatas(data) {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        curPage: data.curPage > 0 ? data.curPage : 1
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_client_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.seller = myData.seller;
          _this.member = myData.member;
          let page = myData.page;
          let list = page.subList;
          _this.curPage = page.curPage;
          _this.pageCount = page.pageCount;
          if (_this.curPage === 1) {
            //第一页数据
            _this.clientArr = list;
          } else {
            _this.clientArr = _this.clientArr.concat(list) || []; //拼接多页数据
          }
          _this.isMore = 1;
          if (_this.curPage >= _this.pageCount) {
            _this.isMore = 3; //没有更多
          }
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

.sale-wrapper {
  width: 100%;
  position: relative;
  .sale-header {
    width: 100%;
    height: 520/@dev-Width *1rem;
    background: url("../../../assets/img/sale.jpg")no-repeat;
    background-size: cover;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    .ik-box-orient(vertical);
    color: #fff;
    .header-img {
      width: 204/@dev-Width *1rem;
      height: 204/@dev-Width *1rem;
      background-position: center;
      background-size: cover;
      .border-radius(100%);
      overflow: hidden;
      margin-bottom: 20/@dev-Width *1rem;
    }
  }
  .index-main {
    width: 100%;
    background: #fff;
    .index-msg {
      width: 100%;
      .ik-box;
      height: 250/@dev-Width *1rem;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .index-msg-item {
      width: 33.33%;
      .ik-box-align(center);
      .ik-box-pack(center);
      .ik-box-orient(vertical);
      height: 100%;
      .ik-box;
    }
    .index-nav {
      width: 100%;
      .seller-item {
        height: 240/@dev-Width *1rem;
        padding: 0 45/@dev-Width *1rem;
        width: 100%;
        .left-div {
          width: 66%;
          .ik-box;
          .ik-box-pack(left);
          .ik-box-align(center);
          .img-div {
            width: 120/@dev-Width *1rem;
            height: 120/@dev-Width *1rem;
            background-position: center;
            background-size: cover;
            .border-radius(100%);
            overflow: hidden;
            margin-right: 34/@dev-Width *1rem;
          }
          .div-title {
            width: 50%;
          }
        }
        .right-div {
          width: 34%;
          em {
            color: #f7ba2a;
          }
        }
      }
    }
    .nav-item {
      float: left;
      width: 33.333%;
      height: 415/@dev-Width *1rem;
      border-bottom: 1px solid #ededed;
      border-right: 1px solid #ededed;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(center);
      .ik-box-orient(vertical);
      p {
        text-align: center;
      }
    }
    .nav-icon {
      font-size: 0;
      width: 150/@dev-Width *1rem;
      height: 150/@dev-Width *1rem;
      text-align: center;
      line-height: 150/@dev-Width *1rem;
      background: url("../../../assets/img/nav_bg.png") repeat;
      .border-radius(10px);
      margin-bottom: 32/@dev-Width *1rem;
      i {
        font-size: 100/@dev-Width *1rem;
        color: #fff;
      }
    }
  }
  .main-margin{
     margin-bottom: 250/@dev-Width *1rem;
  }
  .shop-footer-fixed {
    width: 100%;
  }
}
</style>

