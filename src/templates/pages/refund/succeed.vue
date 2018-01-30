<template>
    <div class="shop-wrapper refund-wrapper" v-if="returnData != null ">
        <div class="refund-main comment-main">
            <section class="refund-passheader clearfix">
                <div class="header-title fs46">
                    <i class="iconfont icon-dui"></i>退款完成
                </div>
                <p class="fs46" v-if="returnData.returnPrice != null">
                    退款金额: <span class="shopGray">￥{{returnData.returnPrice | moneySplit1}}.{{returnData.returnPrice | moneySplit2}}</span>
                </p>
                <p class="fs46" v-if="returnData.createTime != null">
                    退款时间: <span class="shopGray">{{returnData.createTime | formatNotM}}</span>
                </p>
            </section>
            <section class="refund-pass">
                <div class="refund-list border" @click="returnXieDetail">
                    <p class="fs46">协商详情：</p>
                    <i class="iconfont icon-jiantou-copy"></i>
                </div>
                <div class="refund-list border">
                    <p class="fs46"><span class="shopGray">店铺名称</span> {{returnData.shopName}}</p>
                </div>
                <div class="refund-list border">
                    <p class="fs46"><span class="shopGray">退款类型</span> {{returnData.typeName}}</p>
                </div>
                <div class="refund-list border" v-if="returnData.returnPrice != null">
                    <p class="fs46">
                        <span class="shopGray">退款金额</span> ￥{{returnData.returnPrice | moneySplit1}}.{{returnData.returnPrice | moneySplit2}}
                    </p>
                </div>
                <div class="refund-list border">
                    <p class="fs46"><span class="shopGray">退款原因</span> {{returnData.retReasonName}}</p>
                </div>
                <div class="refund-list border">
                    <p class="fs46"><span class="shopGray">退款说明</span> {{returnData.retRemark}}</p>
                </div>
                <div class="refund-list border">
                    <p class="fs46" v-if="returnData.createTime != null"><span class="shopGray">申请时间</span> {{returnData.createTime | formatNotM}}</p>
                </div>
            </section>

            <section class="shop-footer-fixed comment-footer1">
                <div class="shop-max-button fs52 shop-bg" @click="finish">
                    完成
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import filte from "../../../lib/filters";
export default {
  name: "successd",
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家di
      returnId: this.$route.params.returnId, //退款id
      returnData: {} //初始化数据
    };
  },
  mounted() {
    this.loadDatas(); //初始化申请退款数据
    this.commonFn.setTitle("退款完成详情");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadDatas() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        orderDetailId: _this.orderDetailId, //订单详情
        returnId: _this.returnId //退款id
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.return_finish_detail_post,
        data: _data,
        success: function(data) {
          _this.imgUrl = data.imgUrl; //图片域名
          _this.returnData = data.data; //返回数据
          if (_this.returnData.retHandlingWay == 1) {
            _this.returnData.typeName = "仅退款";
          } else if (_this.returnData.retHandlingWay == 2) {
            _this.returnData.typeName = "退货退款";
          }
          if (
            _this.returnData.retRemark == null ||
            _this.returnData.retRemark == ""
          ) {
            _this.returnData.retRemark = "无";
          }
        }
      });
    },
    returnXieDetail() {
      //跳转至协商详情页面
      this.$router.push("/return/consult/" + this.busId + "/" + this.returnId);
    },
    finish() {
      //点击完成返回到上一级的页面
      history.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
/**------vars------*/
.ik-box {
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: box;
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

.refund-wrapper .refund-list {
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
.refund-wrapper .refund-list i {
  color: #c7c7cc;
  font-size: 0.28rem;
}
.comment-footer1 {
  .shop-max-button {
    height: 134/@dev-Width *1rem;
    .border-radius(0);
  }
}
.refund-wrapper .shop-footer-fixed {
  margin: 0;
}
.refund-wrapper section {
  width: 100%;
  background: #fff;
  margin-bottom: 0.2rem;
}

.shop-footer-fixed,
.shop-header {
  position: fixed;
  width: 100%;
  background: #fff;
}
.shop-footer-fixed {
  bottom: 0;
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
.refund-wrapper .refund-dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
}
.refund-wrapper .refund-dialog .dialog-main {
  width: 100%;
  position: absolute;
  background: #fff;
  bottom: 0;
  animation: dialogShow 0.2s;
  -moz-animation: dialogShow 0.2s; /* Firefox */
  -webkit-animation: dialogShow 0.2s;
}
.refund-wrapper .refund-dialog .dialog-content {
  width: 100%;
  padding: 0.23333333rem 0 0.58666667rem 0.33333333rem;
}
.refund-wrapper .refund-dialog .dialog-title {
  width: 100%;
  text-align: center;
  padding-bottom: 0.33333333rem;
}
.refund-wrapper .refund-dialog .dialog-ul {
  width: 100%;
}
.refund-wrapper .refund-dialog .dialog-ul .refund-list {
  height: 0.78rem;
  padding-left: 0;
}
.refund-wrapper .refund-dialog .dialog-option {
  width: 0.4rem;
  height: 0.4rem;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  border: 1px solid #c7c7cc;
  text-align: center;
  line-height: 0.4rem;
}
.refund-wrapper .refund-dialog .dialog-option > i {
  color: #fff;
}
.refund-wrapper .refund-dialog .selected {
  border: 0;
  background: #e4393c;
}
</style>
