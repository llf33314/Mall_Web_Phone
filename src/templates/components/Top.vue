<template>
   <section class="top-box" v-show="isShow">
        <i class="iconfont icon-zhiding" v-if=" scroll >= 300"
            @click="top()"></i>
        <em class="icon-kefu"
            @click="qqUrl()"></em>
    </section>
</template>
<script>
export default {
  data: function() {
    return {
      scroll: "",
      QQ: "",
      isShow: true
    };
  },
  mounted() {
    let _this = this;
    $(window).bind("scroll", function() {
      //if ($(window).scrollTop() > 0 && $(window).scrollTop() >= ($(document).height() - $(window).height()) - 1000) {
      _this.scroll = $(window).scrollTop();
      //}
    });
    this.qqAjax();
  },
  methods: {
    top() {
      $(document.documentElement).animate(
        {
          scrollTop: 0
        },
        200
      );
      $(document.body).animate(
        {
          scrollTop: 0
        },
        200
      );
    },
    qqUrl() {
      window.location.href =
        "http://wpa.qq.com/msgrd?v=3&amp;uin=&amp;site=" +
        this.QQ +
        "&amp;menu=yes";
    },
    /**
         * 客服QQ
         */
    qqAjax() {
      let _this = this;
      let _shopId = _this.$store.state.shopId;
      _this.ajaxRequest({
        status: false,
        url: h5App.activeAPI.phonePage_getCustomer_post,
        data: {
          shopId: _shopId //todo 参数没有
        },
        success: function(data) {
          if (data.code != 0) {
            _this.isShow = false;
          }
          _this.QQ = data.data.qq;
          _this.$store.commit("is_Advert", data.data.isAdvert);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
.top-box {
  position: fixed;
  z-index: 10;
  font-size: 0;
  line-height: 1;
  width: 123/@dev-Width *1rem;
  color: #b2b2b2;
  text-align: center;
  bottom: 240/@dev-Width *1rem;
  right: 40/@dev-Width *1rem;
  i {
    display: block;
    font-size: 116/@dev-Width *1rem;
    margin-bottom: 28/@dev-Width *1rem;
    margin: 0 auto;
  }
  .icon-kefu {
    display: block;
    .ik-icon("../../assets/img/icon/kefu.png", 110/@dev-Width *1rem , 110/@dev-Width *1rem ,100%,100%);
  }
}
</style>
