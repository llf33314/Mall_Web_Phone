<template>
<div id='app' class="shop-wrapper order-wrapper"  v-if="comment != null ">
    <header class="deltails-header deltails-padding0 shop-textc">
            <i class="iconfont icon-chenggong"></i>
            <p class="fs52">评论成功</p>
    </header>
    <div class="comment-main order-item" v-if="comment != null">
        <div class="comment-content">
            <div class="comment-goods clearfix" v-if="product != null" @click="toProductDetail">
                <div class="goods-img">
                    <default-img :background="imgUrl+product.productImageUrl"
                            :isHeadPortrait="0">
                    </default-img>
                </div>
                <div class="goods-txt">
                    <p class="fs40">{{product.productName}}</p>
                    <p class="fs36 shopGray">
                        <em v-if="product.productSpecifica != null">{{product.productSpecifica}}/</em>{{product.productNum}}件
                    </p>
                    <p class="fs36 shopGray"
                    style="color:#e4393c;">{{comment.feel}}</p>
                </div>
            </div>
            <p class="comment-txt fs46" v-if="comment != null">{{comment.content}}</p>
            <div class="comment-photo border clearfix" v-if="imageList != null && imageList.length > 0">
                <div class="comment-img border-img" v-for="image in imageList">
                    <default-img :background="imgUrl+image.imageUrl"
                            :isHeadPortrait="0">
                    </default-img>
                </div>
            </div>
        </div>
    </div>
    <section class="shop-footer comment-footer2"  v-if="comment != null ">
        <div class="shop-max-button fs52 shop-bg" @click="toShareComment">
            分享评价给好友
        </div>
    </section>
</div>
</template>

<script>
import defaultImg from "components/defaultImg";
export default {
  name: "succeed",
  data() {
    return {
      background:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      id: this.$route.params.id,
      imgUrl: "", //图片域名
      comment: null, //评论对象
      product: null, //商品对象
      imageList: [] //图片集合
    };
  },
  components: {
    defaultImg
  },
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("评论成功");
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
        browerType: _this.$store.state.browerType //浏览器类型
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
          let feel = _this.comment.feel;
          if (feel == 1) {
            _this.comment.feel = "好评";
          } else if (feel == 0) {
            _this.comment.feel = "中评";
          } else if (feel == -1) {
            _this.comment.feel = "差评";
          }
        }
      });
    },
    toShareComment() {
      let busId = this.busId;
      let id = this.id;
      //前往分享订单的页面
      this.$router.push("/comment/share/" + busId + "/" + id);
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
.deltails-header {
  color: #fff;
  .ik-box;
  .ik-box-pack(center);
  .ik-box-orient(vertical);
  padding-left: 115/@dev-Width *1rem;
  width: 100%;
  background-size: 100%;
  height: 316/@dev-Width *1rem;
  background-position: center;
  background-image: url("../../../assets/img/pinglun_bg.jpg");
  margin-bottom: 30/@dev-Width *1rem;
  & > p:first-child {
    margin-bottom: 30/@dev-Width *1rem;
  }
}
.deltails-padding0 {
  padding-left: 0;
  i {
    font-size: 148/@dev-Width *1rem;
  }
}
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
}
.comment-footer2 {
  .shop-max-button {
    height: 134/@dev-Width *1rem;
    width: 92%;
    margin: 0 auto;
    color: #fff;
  }
}
</style>
