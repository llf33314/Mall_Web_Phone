<template>
  <div>
    <div class="mycomment-wrapper" v-if="commentArr != null && commentArr.length > 0"
          v-infinite-scroll="loadDatas"
          infinite-scroll-distance="200">
        <div class="mycomment-item" v-for="(comment,cIndex) in commentArr" :key="cIndex">
            <div class="item-top">
                <p class="item-spec-time shopGray">
                    <span class="fs36" v-if="comment.productSpecifica != null">规格：{{comment.productSpecifica}}</span>
                    <span class="fs36" v-else>&nbsp;</span>
                    <span class="fs36">{{comment.commentTime}}</span>
                </p>
                <div class="item-comment fs44">
                  {{comment.content}}
                </div>
                <div class="item-comment-photo clearfix" v-if="comment.commentImageList != null && comment.commentImageList.length > 0">
                    <div class="comment-img" v-for="(image,iIndex) in comment.commentImageList" :key="iIndex">
                        <default-img :background="imgUrl+image.imageUrl"
                                    :isHeadPortrait="1"
                                    :size="'0.3'">
                        </default-img>
                    </div>
                </div>
            </div>
            <div class="item-center clearfix" @click="jumpProductDetail(comment)">
                <div class="comment-img">
                    <default-img :background="imgUrl+comment.productImageUrl"
                                :isHeadPortrait="0"
                                :size="'0.8'">
                    </default-img>
                </div>
                <div class="item-center-text">
                    <p class="text-overflow fs42">{{comment.productName}}</p>
                    <p class="fs40"><span v-if="comment.unit == null">￥</span>{{comment.productPrice}}<span v-if="comment.unit != null">{{comment.unit}}</span></p>
                    <p class="fs40 shop-font">{{comment.feel == 1 ? "好评" : comment.feel == 0 ? "中评" : comment.feel == -1 ? "差评" : ""}}</p>
                </div>
            </div>
            <div class="item-bottom" v-if="comment.replyContent != null">
                <div class="comment-reply fs36"  v-html="'[商家回复] : '+comment.replyContent">
                </div>
            </div>
        </div>
        <more :is-more="isMore"></more>
    </div>
    <content-no :statu="'2'" v-else></content-no>
    </div>
</template>

<script>
import more from "components/more"; //加载更多
export default {
  name: "mycomment",

  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      curPage: 1, //当前页数
      pageCount: 0, //总页数
      imgUrl: "", //图片域名
      commentArr: [], //评论集合
      isMore: 2 //控制没有更多的显示 1 未加载；2 加载中 ；3 没有更多了；4 出错了
    };
  },
  components: {
    more
  },
  mounted() {
    let _this = this;
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("我的评论");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    //初始化样式
    loadDatas() {
      let _this = this;
      if (this.isMore == 3 || this.isMore == 1) {
        return;
      }
      this.isMore = 1;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        curPage: this.curPage || 1
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.comment_list_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null) {
            _this.isMore = 3;
            return;
          }
          _this.imgUrl = data.imgUrl;
          _this.curPage = myData.curPage;
          _this.pageCount = myData.pageCount;
          console.log(myData, "myData");
          if (_this.curPage === 1) {
            //第一页数据
            _this.commentArr = myData.commentResultList;
          } else {
            _this.commentArr =
              _this.commentArr.concat(myData.commentResultList) || []; //拼接多页数据
          }
          if (_this.curPage >= _this.pageCount) {
            _this.isMore = 3; //没有更多
            return;
          }
          _this.isMore = 2;
          _this.curPage++; //当前页数
        }
      });
    },
    //跳转到商品详情页面
    jumpProductDetail(e) {
      let busId = e.busId || this.busId;
      let orderType = e.orderType || 0;
      let productId = e.productId;
      let activityId = e.activityId || 0;
      let shopId = e.shopId;
      let _url =
        "/goods/details/" +
        shopId +
        "/" +
        busId +
        "/" +
        orderType +
        "/" +
        productId +
        "/" +
        activityId;
      if (orderType == 2) {
        //跳到积分商品页面
        _url = "/integral/product/" + busId + "/" + productId + "/" + shopId;
      }
      this.$router.push(_url);
    }
  }
};
</script>

<style lang="less" scoped>
@import (reference) "~assets/css/base.less";
@import (reference) "~assets/css/mixins.less";
.mycomment-wrapper {
  width: 100%;
  .mycomment-item {
    line-height: 1;
    width: 100%;
    background: #fff;
    padding: 30 /@dev-Width * 1rem;
    margin-bottom: 30 /@dev-Width * 1rem;
    font-size: 0;
    .item-top {
      width: 100%;
      padding: 0 20 /@dev-Width * 1rem;
    }
    .item-center {
      width: 100%;
      background: #f5f5f5;
      padding: 15 /@dev-Width * 1rem;
    }
    .item-bottom {
      width: 100%;
      position: relative;
    }
    .item-spec-time {
      .ik-box;
      .ik-box-pack(justify);
      .ik-box-align(center);
      span {
        display: block;
      }
    }
    .item-comment {
      color: #000;
      padding: 40 /@dev-Width * 1rem 0;
    }
    .item-comment-photo {
      width: 100%;
      & > div:last-of-type {
        margin-right: 0;
      }
      margin-bottom: 40 /@dev-Width * 1rem;
    }
    .comment-img {
      float: left;
      width: 232 /@dev-Width * 1rem;
      height: 232 /@dev-Width * 1rem;
      border: 1px solid #ededed;
      margin-right: 30 /@dev-Width * 1rem;
      overflow: hidden;
    }
    .item-center-text {
      width: 74%;
      float: right;
      padding-top: 15/@dev-Width * 1rem;
      & > p {
        width: 100%;
        margin-bottom: 45 /@dev-Width * 1rem;
      }
      & > p:last-child {
        margin-bottom: 0;
      }
    }
    .comment-reply {
      width: 100%;
      margin-top: 48/@dev-Width*1rem;
      background: #f2f2f2;
      padding: 30/@dev-Width*1rem;
      text-align: justify;
      .border-radius(2px);
      position: relative;
      line-height: 1.5em;
      &::after {
        content: " ";
        position: absolute;
        top: -20/@dev-Width*1rem;
        left: 28/@dev-Width*1rem;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #f2f2f2;
      }
      img {
        width: 42/@dev-Width*1rem;
        height: 42/@dev-Width*1rem;
      }
    }
  }
}
.more-main {
  padding-bottom: 20px;
}
</style>
