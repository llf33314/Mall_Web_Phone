
<template>
    <div class="shop-wrapper sale-wrapper" v-if="sellerObj != null">
        <header class="sale-header" v-if="member != null">
            <div class="header-img">
                <default-img :background="member.headimgurl"
                            :isHeadPortrait="1">
                </default-img>
            </div>
            <p class="fs60">{{member.nickname}}</p>
        </header>
        <div class="index-main">
            <div class="index-msg border">
                <div class="index-msg-item" @click="totalIncome(1)">
                    <p class="index-msg-title fs46">累计佣金(元)</p>
                    <p class="index-msg-money fs70">{{sellerObj.seller.totalCommission || 0}}</p>
                </div>
                <div class="index-msg-item" @click="totalIncome(2)">
                    <p class="index-msg-title fs46">积分</p>
                    <p class="index-msg-money fs70">{{sellerObj.seller.incomeIntegral || 0}}</p>
                </div>
                <div class="index-msg-item" @click="totalIncome(3)">
                    <p class="index-msg-title fs46">销售总额(元)</p>
                    <p class="index-msg-money fs70">{{sellerObj.seller.saleMoney || 0}}</p>
                </div>
            </div>
            <div class="index-nav clearfix">
                <div class="nav-item" @click="myMall">
                    <div class="nav-icon">
                        <i class="iconfont icon-shangdian"></i>
                    </div>
                    <p class="fs40">我的商城</p>
                    <p class="fs40">&nbsp</p>
                </div>
                <div class="nav-item" @click="sellerRank">
                    <div class="nav-icon">
                        <i class="iconfont icon-paixingbang"></i>
                    </div>
                    <p class="fs40">销售员排行榜</p>
                    <p class="fs40">&nbsp</p>
                </div>
                <div class="nav-item" @click="myClient">
                    <div class="nav-icon">
                        <i class="iconfont icon-kehu"></i>
                    </div>
                    <p class="fs40">我的客户 <br/>
                        <span class="shop-font">{{sellerObj.sellerCount}}</span><span class="shopGray">个</span></p>
                </div>
                <div class="nav-item" @click="twoCode">
                    <div class="nav-icon">
                        <i class="iconfont icon-icon182"></i>
                    </div>
                    <p class="fs40">二维码</p>
                    <p class="fs40">&nbsp</p>
                </div>
                <div class="nav-item" @click="myClientOrder">
                    <div class="nav-icon">
                        <i class="iconfont icon-icon-test"></i>
                    </div>
                    <p class="fs40">客户订单<br/>
                        <span class="shop-font">{{sellerObj.sellerOrderCount}}</span><span class="shopGray">单</span>
                    </p>
                </div>
                <div class="nav-item" @click="withdraw">
                    <div class="nav-icon">
                        <i class="iconfont icon-tixian"></i>
                    </div>
                    <p class="fs40">我的提现</p>
                    <p class="fs40">&nbsp</p>
                </div>
                <div class="nav-item" @click="promotion">
                    <div class="nav-icon">
                        <i class="iconfont icon-tuwen"></i>
                    </div>
                    <p class="fs40">推广海报</p>
                </div>
                <div class="nav-item" @click="returnMember(sellerObj.memberUrl)">
                    <div class="nav-icon">
                        <i class="iconfont icon-huiyuanqia"></i>
                    </div>
                    <p class="fs40">我的会员卡</p>
                </div>
                <div class="nav-item" @click="saleRule">
                    <div class="nav-icon">
                        <i class="iconfont icon-kaidianguize"></i>
                    </div>
                    <p class="fs40">销售规则</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import defaultImg from "components/defaultImg";
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      sellerObj: null,
      member: null
    };
  },
  components: {
    defaultImg
  },
  //已成功挂载，相当ready()
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("超级销售员");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
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
        url: h5App.activeAPI.seller_index_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          console.log(myData, "myData");
          _this.sellerObj = myData;
          _this.member = myData.member;
        }
      });
    },
    //销售员排行榜
    sellerRank() {
      this.$router.push("/seller/rank/" + this.busId);
    },
    //我的客户
    myClient() {
      this.$router.push("/seller/client/" + this.busId);
    },
    //客户订单
    myClientOrder() {
      this.$router.push("/seller/clientOrder/" + this.busId);
    },
    //累计佣金
    totalIncome(type) {
      this.$router.push("/seller/totalIncome/" + this.busId + "/" + type);
    },
    //我的二维码
    twoCode() {
      let saleMemberId = this.sellerObj.seller.memberId;
      this.$router.push("/seller/twoCode/" + this.busId+"/"+saleMemberId);
    },
    //推广海报
    promotion() {
      let saleMemberId = this.sellerObj.seller.memberId;
      this.$router.push("/seller/promotion/" + this.busId+"/"+saleMemberId);
    },
    //销售规则
    saleRule() {
      this.$router.push("/seller/saleRule/" + this.busId);
    },
    //跳转到会员中心
    returnMember(url) {
      location.href = url;
    },
    //我的提现
    withdraw() {
      this.$router.push("/seller/withdraw/" + this.busId);
    },
    myMall() {
      let url = "";
      let sellerObj = this.sellerObj;
      if (sellerObj.isMallSet == 1) {
        //进入销售员首页
        url =
          "/seller/mallindex/" + this.busId + "/" + sellerObj.seller.memberId;
      } else {
        //进入商城设置页面
        url = "/seller/mallset/" + this.busId + "/1/-";
      }
      // url = "/seller/mallset/" + this.busId + "/1/-";

      sessionStorage.setItem("returnUrl", location.href);
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";

.sale-wrapper {
  width: 100%;
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
      & > div:nth-child(3n) {
        border-right: 0;
      }
    }
    .nav-item {
      float: left;
      width: 33.333%;
      height: 415/@dev-Width *1rem;
      border-bottom: 1px solid #ededed;
      border-right: 1px solid #ededed;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(center);
      .ik-box-orient(vertical);
      p {
        text-align: center;
      }
    }
    .nav-icon {
      font-size: 0;
      width: 150/@dev-Width *1rem;
      height: 150/@dev-Width *1rem;
      text-align: center;
      line-height: 150/@dev-Width *1rem;
      background: url("../../../assets/img/nav_bg.png") repeat;
      .border-radius(10px);
      margin-bottom: 32/@dev-Width *1rem;
      i {
        font-size: 100/@dev-Width *1rem;
        color: #fff;
      }
    }
  }
}
</style>

