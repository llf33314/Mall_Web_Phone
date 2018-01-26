<template>
<div id='app' class="shop-wrapper share-wrapper">
        <div class="comment-main share-main">
            <p class="share-title">这个宝贝很不错，你也来看看吧!</p>
            <div class="comment-content share-content" v-if="comment != null">
                <p class="comment-txt fs46">{{comment.content}}</p>
                <div class="comment-photo border clearfix" v-if="imageList != null && imageList.length > 0">
                    <div class="comment-img border-img" v-for="image in imageList">
                        <default-img :background="imgUrl+image.imageUrl"
                            :isHeadPortrait="0"
                            :size="'0.8rem'">
                        </default-img>
                    </div>
                </div>
            </div>
            <div class="comment-goods clearfix share-content" v-if="product != null" @click="toProductDetail">
                <div class="goods-img">
                    <default-img :background="imgUrl+product.productImageUrl"
                        :isHeadPortrait="0"
                        :size="'0.8rem'">
                    </default-img>
                </div>
                <div class="goods-txt">
                    <p class="fs40">{{product.productName}}</p>
                    <p class="fs36 shopGray">
                        <em v-if="product.productSpecifica != null">{{product.productSpecifica}}/</em>{{product.productNum}}件
                    </p>
                </div>
            </div>
        </div>
        <section class="shop-footer comment-footer3">
            <div class="shop-max-button fs52" @click="toProductDetail">
                去看看
            </div>
        </section>
        <!-- 微信分享 -->
        <wx-share :shareData="shareObj" ></wx-share>
    </div>  
</template>

<script>
import defaultImg from "components/defaultImg";
import wxShare from "components/wxShare"; //微信分享
export default {
  name: "myAddress",

  data() {
    return {
      isShow: false,
      background: null,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      id: this.$route.params.id,
      imgUrl: "", //图片域名
      comment: null, //评论对象
      product: null, //商品对象
      imageList: [] //图片集合
    };
  },
  components: {
    defaultImg,
    wxShare
  },
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("评论分享");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
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
        id: this.id, //评论id
        browerType: _this.$store.state.browerType, //浏览器类型
        ucLogin: 1//不需要登陆
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.comment_success_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.comment = myData.mallComment;
          _this.imageList = myData.imageList;
          _this.product = myData.productResult;
          console.log(myData, "myData");
        }
      });
    },
      //获取微信分享数据
    getWxShare(myData) {
      let _shareObj = {
        title: "评价分享",
        desc: "评价分享",
        url: location.href,
        imgUrl: "",
        isOpenAllMenu: true, //显示所有功能按钮接口
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
      };
      this.shareObj = _shareObj;
    },
    toProductDetail() {
      //前往商品详情也页面
      let orderType = this.product.orderType || 0;
      let activityId = this.product.activityId || 0;
      let shopId = this.product.shopId;
      let busId = this.busId;
      let productId = this.product.productId;
      this.$router.push(
        "/goods/details/" +
          shopId +
          "/" +
          busId +
          "/" +
          orderType +
          "/" +
          productId +
          "/" +
          activityId
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
.comment-main {
  width: 100%;
  padding-bottom: 134/@dev-Width *1rem;
  .comment-goods {
    background: #fff;
    padding: 20/@dev-Width *1rem 40/@dev-Width *1rem;
    margin-bottom: 20/@dev-Width *1rem;
    .goods-img {
      float: left;
      width: 264/@dev-Width *1rem;
      height: 264/@dev-Width *1rem;
      background-size: cover;
      background-position: center;
    }
    .goods-txt {
      width: 72%;
      float: right;
      & > p:last-child {
        margin-top: 48/@dev-Width *1rem;
      }
    }
  }
  .comment-content {
    font-size: 0;
    background: #fff;
    padding: 40/@dev-Width *1rem 0 0;
    width: 100%;
    .comment-textarea {
      width: 92%;
      margin: 0 auto;
      display: block;
      height: 620/@dev-Width *1rem;
      border: 1px solid #ededed;
      background: 0;
      padding: 10/@dev-Width *1rem;
    }
    .comment-photo {
      width: 100%;
      text-align: justify;
      padding: 40/@dev-Width *1rem;
      .comment-upload,
      .comment-img {
        //display: inline-block;
        float: left;
        position: relative;
        width: 22%;
        height: 230/@dev-Width *1rem;
        background-size: cover;
        background-position: center;
        margin-top: 40/@dev-Width *1rem;
        margin-right: 30/@dev-Width *1rem;
        input {
          position: absolute;
          width: 100%;
          height: 100%;
          display: block;
          top: 0;
          left: 0;
          opacity: 0;
        }
      }
      .comment-img {
        position: relative;
        i {
          width: 60/@dev-Width *1rem;
          height: 60/@dev-Width *1rem;
          text-align: center;
          line-height: 60/@dev-Width *1rem;
          background: rgba(0, 0, 0, 0.6);
          color: #e0e0e8;
          font-size: 36/@dev-Width *1rem;
          .border-radius(100%);
          position: absolute;
          top: -8%;
          right: -8%;
        }
      }
      .border-img {
        border: 1px solid #ededed;
        width: 26%;
        height: 280/@dev-Width *1rem;
      }
      .comment-upload {
        color: #999;
        border: 2px dashed #999;
        .border-radius(5px);
        text-align: center;
        .ik-box;
        .ik-box-align(center);
        .ik-box-pack(center);
        .ik-box-orient(vertical);
        i {
          font-size: 88/@dev-Width *1rem;
        }
        p {
          width: 75%;
        }
      }
    }
    .comment-txt {
      width: 100%;
      padding: 0 40/@dev-Width *1rem;
    }
  }
  .comment-main-footer {
    width: 100%;
    padding: 0 45/@dev-Width *1rem;
    background: #fff;
    font-size: 0;
    .comment-button {
      text-align: center;
      width: 33%;
      display: inline-block;
      padding: 48/@dev-Width *1rem 0;
      color: #888;
      i {
        font-size: 68/@dev-Width *1rem;
      }
      & > i:first-child {
        display: inline-block;
      }
      & > i:last-child {
        display: none;
      }
    }
    .selected {
      color: #e4393c;
      & > i:first-child {
        display: none;
      }
      & > i:last-child {
        display: inline-block;
      }
    }
  }
}
.comment-footer1 {
  .shop-max-button {
    height: 134/@dev-Width *1rem;
    .border-radius(0);
  }
}
.comment-footer2 {
  .shop-max-button {
    height: 134/@dev-Width *1rem;
    width: 92%;
    margin: 0 auto;
    color: #fff;
  }
}
.comment-footer3 {
  .shop-max-button {
    height: 134/@dev-Width *1rem;
    width: 92%;
    margin: 0 auto;
    color: #fff;
    font-weight: bold;
    .border-radius(50px);
    border: 1px solid #f53e18;
    background: -o-radial-gradient(#f55211, #f6423a); /* Opera 11.1 - 12.0 */
    background: -webkit-radial-gradient(
      #f55211,
      #e7242c
    ); /* Safari 5.1 - 6.0 */
    background: -moz-radial-gradient(#f55211, #f6423a); /* Firefox 3.6 - 15 */
    background: radial-gradient(#f55211, #f6423a); /* 标准的语法 */
  }
}
.share-wrapper {
  width: 100%;
  height: 100%;
  background: url("../../../assets/img/fengxiang_bg.jpg")no-repeat;
  background-size: cover;
  .share-main {
    font-size: 0;
    width: 100%;
    padding: 100/@dev-Width *1rem 36/@dev-Width *1rem;
  }
  .share-title {
    width: 100%;
    font-size: 70/@dev-Width *1rem;
    text-align: center;
    color: #fff;
    font-weight: bold;
    text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 60/@dev-Width *1rem;
  }
  .share-content {
    background: #fff;
    margin: 0 auto;
    .border-radius(8px);
    margin-bottom: 45/@dev-Width *1rem;
  }
}
</style>
