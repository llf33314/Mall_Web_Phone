<template>
<section class="goods-shop">
    <div class="goods-shop-main clearfix">
        <div class="goods-shop-info">
            <div class="goods-shop-img">
                <default-img :background="imgUrl+data.shopImageUrl"
                    :isHeadPortrait="0" :size="'0.2'">
                </default-img>
            </div>
            <div class="goods-shop-txt">
                <div class="goods-shop-name" :class="{'text-overflow':!data.categoryName}">
                    <span class="fs46" :class="{'text-overflow':data.categoryName}">{{data.shopName}}</span>
                    <em class="em-flag" v-if="data.categoryName">旗舰店</em>
                </div>
                <div class="fs40 shopGray text-overflow">
                    {{data.shopAddress}}
                </div>
            </div>
        </div>
        <div class="goods-shop-rigtn" v-if="isErrors">
            <div class="style-main-border goods-shop-buttom fs42" 
                v-if="!data.isCollect"
                @click="collectProductAjax()">收藏商品
            </div>
            <div class="style-main-border goods-shop-buttom fs42"
                @click="collectProductAjax()"
                v-else>已收藏
            </div>
            <div class="style-main-border goods-shop-buttom fs42" 
            @click="toShop()">进店逛逛
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
  props: ["row", "imgUrl", "isErrors"],
  components: {},
  watch: {
    row(a, b) {
      this.data = a;
    }
  },
  data() {
    return {
      data: ""
    };
  },
  methods: {
    collectProductAjax() {
      let _this = this;
      _this.ajaxRequest({
        url: h5App.activeAPI.phoneProduct_collectProduct_post,
        data: {
          busId: _this.$store.state.busId,
          url: _this.$store.state.loginDTO_URL,
          browerType: _this.$store.state.browerType,
          productId: _this.$route.params.goodsId
        },
        success: function(data) {
          if (data.code == 0) {
            _this.data.isCollect = !_this.data.isCollect;
            if (_this.data.isCollect) {
              _this.$store.commit("error_msg", "收藏成功");
            } else {
              _this.$store.commit("error_msg", "取消成功");
            }
          }
        }
      });
    },
    /**
        进店逛逛
         */
    toShop() {
      let busId = this.$route.params.busId;
      let shopId = this.$route.params.shopId;
      this.$parent.$parent.getPageId(busId, shopId, true);
    }
  },
  mounted() {}
};
</script>

<style  lang="less" scoped>
@import (reference) "~assets/css/base.less";
@import (reference) "~assets/css/mixins.less";
.goods-shop {
  padding: 28/@dev-Width *1rem 30/@dev-Width *1rem;
  .goods-shop-main {
    width: 100%;
    .goods-shop-info {
      float: left;
      width: 63%;
    }
    .goods-shop-rigtn {
      float: right;
      width: 37%;
      height: 158/@dev-Width *1rem;

      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(right);
      .goods-shop-buttom {
        letter-spacing: 1px;
        display: block;
        .border-radius(3px);
        padding: 5px 3px;
        margin-left: 10/@dev-Width *1rem;
      }
    }
    .goods-shop-img {
      vertical-align: 0.4rem;
      display: inline-block;
      width: 88/@dev-Width *1rem;
      height: 88/@dev-Width *1rem;
      background-size: cover;
      .border-radius(100%);
      overflow: hidden;
    }
    .goods-shop-txt {
      display: inline-block;
      width: 82%;
      margin-left: 25 /@dev-Width *1rem;
      .goods-shop-name {
        margin-bottom: 30 /@dev-Width *1rem;
      }
      span {
        max-width: 74%;
        display: inline-block;
        vertical-align: -2px;
      }
      .goods-shop-km {
        width: 33%;
      }
      .goods-shop-tel {
        width: 64%;
      }
    }
  }
}
</style>
