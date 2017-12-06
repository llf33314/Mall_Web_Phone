
<template>
    <div class="shop-wrapper sale-wrapper" >
       <div class="seller-top">
            <div class="seller-nav">
                <i class="iconfont icon-jiantou-copy1" @click="back"></i>销售员排行榜
            </div>
            <div class="seller-nav2 border">
                <header-nav :headers="headerArr" :selectId="type" :type.sync="type"></header-nav>
            </div>
       </div>
        <div class="seller-content" v-if="rankArr != null">
            <div class="seller-item" v-for="(rank,index) in rankArr" :key="index">
                <div class="item-left">
                    <div class="blue-color index-div">{{index+1}}</div>
                    <div class="img-div">
                        <default-img :background="rank.headimgurl"
                            :isHeadPortrait="1"></default-img>
                    </div>
                    <div class="text-overflow">{{rank.user_name || rank.nickname}}</div>
                </div>
                <div class="item-right shop-font">{{rank.sale_money}}</div>
            </div>
            <more :isMore="isMore"></more>
        </div>
    </div>
</template>

<script>
import defaultImg from "components/defaultImg";
import headerNav from "./setchlid/headerNav";
import more from "components/more";
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      rankArr: null,
      type: 1, //类型 1 周榜 2月榜 3年榜 4总榜
      curPage: 1, //页数
      pageCount: 1, //总页数
      headerArr: [
        { id: 1, name: "周榜" },
        { id: 2, name: "月榜" },
        { id: 3, name: "年榜" },
        { id: 4, name: "总榜" }
      ],
      isMore: -1
    };
  },
  components: {
    defaultImg,
    headerNav,
    more
  },
  watch: {
    type() {
      //   console.log(this.type,"type");
      this.rankArr = null;
      this.isMore = 2;
      this.curPage = 1;
      this.loadDatas({
        curPage: this.curPage
      }); //初始化数据
    }
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle("销售员排行榜");
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
        type: this.type,
        curPage: data.curPage > 0 ? data.curPage : 1
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_rank_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          let page = myData.page;
          let list = page.subList;
          _this.curPage = page.curPage;
          _this.pageCount = page.pageCount;
          if (_this.curPage === 1) {
            //第一页数据
            _this.rankArr = list;
          } else {
            _this.rankArr = _this.rankArr.concat(list) || []; //拼接多页数据
          }
          //   _this.isShowNullContent = false;
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
@import "./css/sellercommon.less";

.sale-wrapper {
  .seller-content {
    background: #fff;
    margin-top: 270/@dev-Width *1rem;
    z-index: 1;
    .border;
    .seller-item {
      height: 152/@dev-Width *1rem;
      padding: 0 100/@dev-Width *1rem 0 70/@dev-Width *1rem;
      .shop-box-center;
      .item-left {
        width: 90%;
        .shop-box-center;
        .index-div {
          width: 5%;
        }
        div {
          .fs40;
        }
        .img-div {
          width: 120/@dev-Width *1rem;
          height: 120/@dev-Width *1rem;
          background-position: center;
          background-size: cover;
          .border-radius(100%);
          overflow: hidden;
          margin: 0 90/@dev-Width *1rem 0 70/@dev-Width *1rem;
        }
        .text-overflow {
          width: 60%;
        }
      }
      .item-right {
        width: 10%;
        .fs40;
      }
    }
  }
  .blue-color {
    color: #4e95ef;
  }
}
</style>

