<template>
<div id='app' class="shop-wrapper ">
    <div class="comment-main">
        <div class="comment-goods clearfix" v-if="productObj != null"
            @click="toReturnProductDetail(productObj.productId,productObj.shopId,productObj.busId)">
            <div class="goods-img">
                <default-img  :background="imgUrl+productObj.productImageUrl"
                              :isHeadPortrait="0"
                              :size="'0.8rem'">
                </default-img>
            </div>
            <div class="goods-txt">
                <p class="fs40">{{productObj.productName}}</p>
                <p class="fs36 shopGray">
                   <em v-if="productObj.productSpecifica != null">{{productObj.productSpecifica}}/</em>{{productObj.productNum}}件
                </p>
            </div>
        </div>
        <div class="comment-content">
            <textarea class="comment-textarea fs46" v-model="content" @blur="blurValidate"
                placeholder="请写下你的评价"></textarea>
            <div class="comment-photo border clearfix">
                <div class="comment-img"  v-if="imageArr != null" v-for="(image , index) in imageArr">
                    <default-img :background="imgUrl+image"
                                 :isHeadPortrait="0"
                                 :size="'0.8rem'">
                    </default-img>
                    <i class="iconfont icon-guanbi"  @click="removeImages(index)"></i>
                </div>
                 <div class="comment-upload"  v-if="imageArr != null && imageArr.length < 3">
                    <img-upload :imgURL="imageArr" @returnUrl="returnUrl"></img-upload>
                </div>
            </div>
            <div class="comment-main-footer">
                <div class="comment-button fs46 " :class="{'selected':feel==1}"
                @click="comment_selected(1)">
                    <i class="iconfont icon-daipingjia"></i>
                    <i class="iconfont icon-haoping "></i>
                    好评
                </div>
                <div class="comment-button fs46"  :class="{'selected':feel==0}"
                @click="comment_selected(0)">
                    <i class="iconfont icon-zhongping"></i>
                    <i class="iconfont icon-zhongping1 "></i>
                    中评
                </div>
                <div class="comment-button fs46  "  :class="{'selected':feel==-1}"
                @click="comment_selected(-1)">
                    <i class="iconfont icon-chaping"></i>
                    <i class="iconfont icon-chaping1"></i>
                    差评
                </div>
            </div>
        </div>
    </div>
    <section class="shop-footer-fixed comment-footer1">
        <div class="shop-max-button fs52 shop-bg" @click="submitComment">
            发表评价
        </div>
    </section>
</div>
</template>

<script>
import defaultImg from "components/defaultImg";
import imgUpload from "components/imgUpload";
export default {
  name: "comment",

  data() {
    return {
      imageArr: [],
      background: null,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      orderDetailId: this.$route.params.orderDetailId,
      imgUrl: "", //图片域名
      productObj: {}, //商品对象
      content: "", //评论内容
      feel: 1
    };
  },
  components: {
    defaultImg,
    imgUpload
  },
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("评论");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    //切换评论
    comment_selected(feel) {
      this.feel = feel;
    },
    removeImages(index) {
      //删除图片
      this.imageArr.splice(index, 1);
    },
    //组件图片接受
    returnUrl(data) {
      let _this = this;
      if (_this.imageArr != null && data != null) {
        data.forEach((item, index) => {
          //重新给图片集合赋值
          _this.$set(_this.imageArr, _this.imageArr.length, item);
        });
      } else if (data != null) {
        _this.imageArr = data;
      }
    },
    //初始化样式
    loadDatas() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        orderDetailId: this.orderDetailId, //订单详情id
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.to_comment_product_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.productObj = myData;
          console.log(myData, "myData");
        }
      });
    },
    blurValidate() {
      let _isNull = this.commonFn.isNull;
      let content = this.content;
      let _show_tip = this.$parent.$refs.bubble.show_tips;
      if (_isNull(content)) {
        _show_tip(this.$t('comment_content_null_msg'));
        return false;
      } else if (content.length > 240) {
        _show_tip(this.$t('comment_content_length_msg'));
        return false;
      }
      return true;
    },
    /**
     * 提交评论
     */
    submitComment() {
      let _this = this;
      let comment = this.productObj;
      if (!this.blurValidate()) {
        return false;
      }
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        orderId: comment.orderId, //订单id
        orderDetailId: this.orderDetailId, //订单详情id
        productId: comment.productId, //商品id
        content: this.content,
        feel: this.feel
      };
      if (this.imageArr != null && this.imageArr.length > 0) {
        _data.imageUrls = this.imageArr.toString();
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.save_comment_post,
        data: _data,
        loading: true,
        success: function(data) {
          let busId = _this.busId;
          let id = data.data;
          //跳入评论成功页面
          _this.$router.push("/comment/success/" + busId + "/" + id);
          _this.$store.commit("is_show_loading", false);
        }
      });
    },
    //跳转商品详情页面
    toReturnProductDetail(productId, shopId, busId) {
      let orderType = productObj.orderType || 0;
      let activityId = productObj.activityId || 0;
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
        width: 265/@dev-Width *1rem;
        height: 265/@dev-Width *1rem;
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
        z-index: 1;
        img {
          width: 100%;
          height: 100%;
        }
        i {
          z-index: 2;
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
  width: 100%;
  .shop-max-button {
    height: 134/@dev-Width *1rem;
    .border-radius(0);
  }
}
.icon-guanbi {
  z-index: 2;
}
</style>
