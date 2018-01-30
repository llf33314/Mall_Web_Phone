
<template>
    <div class="shop-wrapper sale-wrapper" >
        <div class="seller-top">
            <div class="seller-nav">
                <i class="iconfont icon-jiantou-copy1" @click="back"></i>客户订单
            </div>
            <div class="seller-nav2 border">
                <header-nav :headers="headerArr" :selectId="type" :type.sync="type"></header-nav>
            </div>
       </div>
       <div class="seller-content" v-if="orderArr != null">
           <div class="seller-item" v-for="(order,index) in orderArr" :key="index">
              <div class="border ">
                   <div class="title-div">{{order.proName}}</div>
                   <div class="contet-div">买家:{{order.nickname}}</div>
                   <div class="contet-div">下单时间:{{order.create_time | format}}</div>
                   <div class="contet-div">支付状态:{{order.statusName}}</div>
              </div>
              <div class="contet-div">金额: ￥{{order.order_money}}</div>
           </div>
       </div>
       <content-no :statu="4" v-if="isShowNullContent"></content-no>
    </div>
</template>

<script>
import headerNav from "./setchlid/headerNav";
import more from "components/more";
import filter from "@/lib/filters";
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      orderArr: null,
      curPage: 1, //页数
      pageCount: 1, //总页数
      type: 0,
      headerArr: [
        { id: 0, name: "所有订单" },
        { id: 1, name: "待付款" },
        { id: 2, name: "已付款" },
        { id: 4, name: "已完成" }
      ],
      isShowNullContent: false
    };
  },
  components: {
    headerNav
  },
  watch: {
    type() {
      console.log(this.type, "type");
      this.orderArr = null;
      this.isMore = 2;
      this.curPage = 1;
      this.loadDatas({
        curPage: this.curPage
      }); //初始化数据
    }
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle("客户订单");
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
        status: _this.type,
        browerType: _this.$store.state.browerType, //浏览器类型
        curPage: data.curPage > 0 ? data.curPage : 1
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_client_order_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          let page = myData.page;
          let list = page.subList;
          if (list == null || list.length == 0) {
            _this.isShowNullContent = true;
          }
          _this.curPage = page.curPage;
          _this.pageCount = page.pageCount;
          if (_this.curPage === 1) {
            //第一页数据
            _this.orderArr = list;
          } else {
            _this.orderArr = _this.orderArr.concat(list) || []; //拼接多页数据
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
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
@import  (reference) "~assets/css/common.less";
@import "~assets/css/sellercommon.less";

.sale-wrapper {
  .seller-content {
    width: 100%;
    padding: 22/@dev-Width *1rem;
    padding-bottom: 0;
    margin-top: 270/@dev-Width *1rem;
    .seller-item {
      background: #fff;
      border: 2px solid #ececec;
      margin-bottom: 22/@dev-Width *1rem;
      .border-radius(2%);
      padding: 25/@dev-Width *1rem 0 0 43/@dev-Width *1rem;
      .title-div {
        .fs45;
        color: #5fa642;
        margin-bottom: 20/@dev-Width *1rem;
      }
      .contet-div {
        .fs42;
        color: #666666;
        margin-bottom: 20/@dev-Width *1rem;
      }
    }
  }
}
</style>

