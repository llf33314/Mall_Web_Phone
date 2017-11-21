<template>
<div id='app' class="shop-wrapper ">
    <div class="comment-main">
        <div class="comment-goods clearfix">
            <div class="goods-img">
                <default-img :background="background"
                            :isHeadPortrait="0">
                </default-img>
            </div>
            <div class="goods-txt">
                <p class="fs40">Apple iPhone 7 Plus (A1661) 128GB 玫瑰金 色 移动联通电信4G手机</p>
                <p class="fs36 shopGray">玫瑰金/128GB/1件/包邮</p>
            </div>
        </div>
        <div class="comment-content">
            <textarea class="comment-textarea fs46"
                placeholder="请写下你的评价"></textarea>
            <div class="comment-photo border clearfix">
                <div class="comment-img">
                    <img src="../../../assets/img/test/test1.jpg">
                    <i class="iconfont icon-guanbi"></i>
                </div>
                <div class="comment-img">
                    <img src="../../../assets/img/test/test2.jpg">
                    <i class="iconfont icon-guanbi"></i>
                </div>
                <div class="comment-img">
                    <img src="../../../assets/img/test/test1.jpg">
                    <i class="iconfont icon-guanbi"></i>
                </div>
                <div class="comment-img">
                    <img src="../../../assets/img/test/test2.jpg">
                    <i class="iconfont icon-guanbi"></i>
                </div>
                 <div class="comment-upload">
                    <imgUpload :imgURL="imgData"></imgUpload>
                </div>
            </div>
            <div class="comment-main-footer">
                <div class="comment-button fs46"
                @click="comment_selected($event)">
                    <i class="iconfont icon-daipingjia"></i>
                    <i class="iconfont icon-haoping "></i>
                    好评
                </div>
                <div class="comment-button fs46"
                @click="comment_selected($event)">
                    <i class="iconfont icon-zhongping"></i>
                    <i class="iconfont icon-zhongping1 "></i>
                    中评
                </div>
                <div class="comment-button fs46  selected"
                @click="comment_selected($event)">
                    <i class="iconfont icon-chaping"></i>
                    <i class="iconfont icon-chaping1"></i>
                    差评
                </div>
            </div>
        </div>
    </div>
    <section class="shop-footer-fixed comment-footer1">
        <div class="shop-max-button fs52 shop-bg">
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
      imgURL: [],
      background:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      orderDetailId: this.$route.params.orderDetailId
    };
  },
  components: {
    defaultImg,
    imgUpload
  },
  mounted() {
    this.loadDatas(); //初始化协商详情数据
    this.commonFn.setTitle("评论");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    //切换评论
    comment_selected(e) {
      var _e = $(e.target);
      $(".comment-button").removeClass("selected");
      if (_e.is("i")) {
        _e.parents(".comment-button").addClass("selected");
        return;
      }
      _e.addClass("selected");
    },
    //删除上传图片
    dele_img(e) {
      $(e.target)
        .parents(".comment-img")
        .remove();
    },
    //组件图片接受
    imgData(data) {
      this.imgURL = data;
    },
    //初始化样式
    loadDatas() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.is_apply_seller_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null) {
            return;
          }
          console.log(myData, "myData");
        }
      });
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
        img {
          width: 100%;
          height: 100%;
        }
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
</style>
