<template>
    <div class="shop-wrapper refund-wrapper" v-if="myData != null">
        <div class="refund-main comment-main">
            <section class="refund-goods clearfix" @click="toProductDetail()">
                <div class="goods-img">
                    <default-img :background="imgUrl+myData.productImageUrl"
                                 :isHeadPortrait="0"
                                 :size="'0.8'">
                    </default-img>
                </div>
                <div class="goods-delt">
                    <p class="fs40">{{myData.productName}}</p>
                    <p class="fs36 shopGray" v-if="myData.productSpecifica != null">
                      规格：{{myData.productSpecifica}}
                    </p>
                </div>
            </section>
            <section class="refund-state">
                <div class="refund-list2 border" v-for="way in wayList"
                @click="toReturn(way.id)">
                    <div class="fs46 list-txt">
                        <i class="iconfont" :class="way.cla"></i>
                        <div>
                            <p class="fs40">{{way.name}}</p>
                            <p class="fs36 shopGray">{{way.nameMsg}}</p>
                        </div>
                    </div>
                    <p class="shopGray">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </p>
                </div>
                <!-- <div class="refund-list2 border" >
                    <div class="fs46 list-txt">
                        <i class="iconfont icon-tuihuo"></i>
                        <div>
                            <p class="fs40">退货退款</p>
                            <p class="fs36 shopGray">已收到货，需要退换已收到的货物</p>
                        </div>
                    </div>
                    <p class="shopGray">
                        <i class="iconfont icon-jiantou-copy"></i>
                    </p>
                </div> -->
            </section>
        </div>
    </div>
</template>
 <script>

export default {
  components: {
  },
  data() {
    return {
      background: "",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      orderDetailId: this.$route.params.orderDetailId, //订单详情id
      shopId: 0, //店铺id
      productId: 0, //商品id
      wayList: [], //退款类型
      myData: {}, //返回数据
      orderType: 0, //活动类型 1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品
      activityId: 0, //活动id
      imgUrl: "" //图片域名
    };
  },
  mounted() {
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    //初始化退款类型
    this.loadDatas();
    this.commonFn.setTitle("退款类型");
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    //加载数据
    loadDatas() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        orderDetailId: _this.orderDetailId //订单详情
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.return_style_post,
        data: _data,
        success: function(data) {
          _this.imgUrl = data.imgUrl; //图片域名
          _this.myData = data.data; //返回数据
          _this.shopId = _this.myData.shopId; //店铺id
          _this.productId = _this.myData.productId; //商品id
          _this.wayList = _this.myData.returnWayList; //退款方式集合
          _this.orderType = _this.myData.orderType;//活动类型
          _this.activityId = _this.myData.activityId;//活动id
          _this.wayList.forEach((item, index) => {
            if (item.id == 1) {
              //退款
              item.name = "仅退款";
              item.nameMsg = "未收到货（包含未签收），或卖家协商同意前提下";
              item.cla = "icon-tuikuan";
            } else if (item.id == 2) {
              //退款退货
              item.name = "退货退款";
              item.nameMsg = "已收到货，需要退换已收到的货物";
              item.cla = "icon-tuihuo";
            }
          });
        }
      });
    },
    toReturn(wayId) {
      this.$router.push(
        "/return/apply/" +
          this.busId +
          "/" +
          this.orderDetailId +
          "/" +
          wayId +
          "/0"
      );
    },
    toProductDetail() {
      //跳转至商品详情页面
      this.$router.push(
        "/goods/details/" +
          this.shopId +
          "/" +
          this.busId +
          "/" +
          this.orderType +
          "/" +
          this.productId +
          "/" +
          this.activityId
      );
    }
  }
};
</script>

<style lang="less">
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
/**------vars------*/
.ik-box {
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: box;
}
.box-sizing {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  /* Firefox */
  -webkit-box-sizing: border-box;
  /* Safari */
}
.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.refund-wrapper {
  width: 100%;
}
.refund-wrapper .refund-main {
  position: relative;
  width: 100%;
  padding-bottom: 1.1rem;
}
.refund-wrapper section {
  width: 100%;
  background: #fff;
  margin-bottom: 0.2rem;
}
.refund-wrapper .refund-goods {
  padding: 0.16666667rem 0.1rem 0.16666667rem 0.26666667rem;
}
.refund-wrapper .refund-goods .goods-img {
  float: left;
  width: 1.78rem;
  height: 1.78rem;
  background-size: cover;
  background-position: center;
}
.refund-wrapper .refund-goods .goods-delt {
  width: 72%;
  float: left;
  margin-left: 0.13333333rem;
  text-align: justify;
}
.refund-wrapper .refund-goods .goods-delt p {
  margin: 0.13333333rem 0;
}
.refund-wrapper .refund-state {
  width: 100%;
}
.refund-wrapper .refund-list,
.refund-wrapper .refund-list2 {
  font-size: 0;
  width: 100%;
  height: 0.96666667rem;
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: box;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  box-pack: justify;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  box-align: center;
  padding-left: 0.33333333rem;
  padding-right: 0.26666667rem;
}
.refund-wrapper .refund-list i,
.refund-wrapper .refund-list2 i {
  color: #c7c7cc;
  font-size: 0.28rem;
}
.refund-wrapper .refund-list2 {
  height: 1.6rem;
}
.refund-wrapper .refund-list2 .list-txt {
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: box;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  box-pack: justify;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  box-align: center;
}
.refund-wrapper .refund-list2 .list-txt > i {
  color: #e4393c;
  font-size: 0.45333333rem;
  margin-right: 0.13333333rem;
}
.refund-wrapper .refund-input {
  width: 80%;
  display: block;
  height: 100%;
  border: 0;
}
.refund-wrapper .refund-money {
  width: 100%;
}
.refund-wrapper .refund-money > div:nth-child(2) {
  background: #ededed;
  color: #999;
}
.refund-wrapper .refund-photo {
  width: 100%;
  padding: 0.31333333rem;
}
.refund-wrapper .refund-passheader {
  width: 100%;
  height: 2.53333333rem;
  padding: 0 0.4rem;
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: box;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  box-pack: center;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  box-orient: vertical;
  background-image: -webkit-gradient(
      linear,
      50% 0,
      0 100%,
      from(transparent),
      color-stop(0.5, transparent),
      color-stop(0.5, #f0f2f5),
      to(#f0f2f5)
    ),
    -webkit-gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(0.5, transparent), color-stop(0.5, #f0f2f5), to(#f0f2f5));
  background-image: -moz-linear-gradient(
      50% 0 -45deg,
      transparent,
      transparent 50%,
      #f0f2f5 50%,
      #f0f2f5
    ),
    -moz-linear-gradient(50% 0 -135deg, transparent, transparent 50%, #f0f2f5
          50%, #f0f2f5);
  background-size: 11px 7px;
  background-repeat: repeat-x;
  background-position: 0 100%;
}
.refund-wrapper .refund-passheader .header-title {
  font-weight: bold;
  margin-bottom: 0.4rem;
}
.refund-wrapper .refund-passheader .header-title i {
  border: 2px solid #e4393c;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  color: #e4393c;
  font-weight: 100;
  padding: 0.06rem;
  font-size: 0.32rem;
  margin-right: 0.13333333rem;
}
.refund-wrapper .refund-passheader > p {
  width: 100%;
  margin: 0.03333333rem 0;
}
.refund-wrapper .shop-footer-fixed {
  margin: 0;
}
</style>
