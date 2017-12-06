
<template>
  <div class="shop-wrapper sale-wrapper" v-if="seller != null">
    <header class="sale-header" v-if="member != null">
        <div class="header-img">
            <default-img :background="member.headimgurl"
                        :isHeadPortrait="1">
            </default-img>
        </div>
        <p class="fs60">{{member.nickname}}</p>
    </header>
    <div class="index-main" >
        <div class="index-msg border">
            <div class="index-msg-item">
                <p class="index-msg-title fs46">累计佣金(元)</p>
                <p class="index-msg-money fs70">{{seller.totalCommission || 0}}</p>
            </div>
            <div class="index-msg-item">
                <p class="index-msg-title fs46">积分</p>
                <p class="index-msg-money fs70">{{seller.incomeIntegral || 0}}</p>
            </div>
            <div class="index-msg-item">
                <p class="index-msg-title fs46">销售总额(元)</p>
                <p class="index-msg-money fs70">{{seller.saleMoney || 0}}</p>
            </div>
        </div>
        <div class="index-nav clearfix" >
          <p class="fs40">经纪人说明</p>
          <p class="fs40">1、当消费金额满2000元可申请成为全民经纪人。</p>
          <p class="fs40">2、当A消费达到规定金额成为全民经纪人后，B通过A推荐并进行消费，则A可获得相对应的佣金提成，而B消费达到规定金额后亦可申请成为全民经纪人；C通过B的推荐且进行消费，则B可获得相对应的佣金提成，而A无任何收入，以此类推，此过程为经纪人代理。</p>
          <p class="fs40">3、所获得佣金达到最低提现要求且满7天将自动提现到个人微信钱包。</p>
        </div>
    </div>
  </div>
</template>

<script>
import defaultImg from "components/defaultImg";
import filters from "@/lib/filters";
import technicalSupport from "components/technicalSupport"; //技术支持
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      sellerSet: null,
      member: null,
      seller: null //销售员对象
    };
  },
  components: {
    defaultImg,
    technicalSupport
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle("销售规则");
    this.$store.commit("show_footer", false); //隐藏底部导航栏

    this.loadDatas(); //初始化数据
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  //相关操作事件
  methods: {
    loadDatas() {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_sale_rule_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.seller = myData.seller;
          _this.member = myData.member;
          _this.sellerSet = myData.sellerSet;
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
.sale-wrapper {
  background: #fff;
  width: 100%;
  height: 100%;
  position: relative;
  .sale-header {
    width: 100%;
    height: 520/@dev-Width *1rem;
    background: url("../../../assets/img/sale.jpg")no-repeat;
    background-size: cover;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    .ik-box-orient(vertical);
    color: #fff;
    .header-img {
      width: 204/@dev-Width *1rem;
      height: 204/@dev-Width *1rem;
      background-position: center;
      background-size: cover;
      .border-radius(100%);
      overflow: hidden;
      margin-bottom: 20/@dev-Width *1rem;
    }
  }
  .index-main {
    width: 100%;
    background: #fff;
    .index-msg {
      width: 100%;
      .ik-box;
      height: 250/@dev-Width *1rem;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .index-msg-item {
      width: 33.33%;
      .ik-box-align(center);
      .ik-box-pack(center);
      .ik-box-orient(vertical);
      height: 100%;
      .ik-box;
    }
    .index-nav {
      width: 100%;
      padding: 0 78/@dev-Width *1rem;
      p:nth-child(1) {
        font-weight: bolder;
        padding-top: 59/@dev-Width *1rem;
      }
      p {
        line-height: 80/@dev-Width *1rem;
      }
    }
  }
}
</style>

