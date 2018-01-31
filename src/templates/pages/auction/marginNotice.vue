<template>
<div class="shop-wrapper  auction-wrapper">
    <div class="agreement-main">
        <section class="agreement-content">
            <header-nav :headers= "homeNav" style="z-index:3" 
                    @change="handleChange">
            </header-nav>
            <!-- 抢拍记录 -->
            <div class="agreement-top2" v-if="type == 1 && bidArr != null">
                <div class="bid-div border  shop-box-center">
                    <p class="fs40 p-20">状态</p>
                    <p class="fs40 p-20">价格</p>
                    <p class="fs40 p-20">竞拍人</p>
                    <p class="fs40 p-40">时间</p>
                </div>
                <div class="bid-div border  shop-box-center bg-white" 
                  v-for="(bid,index) in bidArr" :key="index">
                    <p class="fs40 p-20 text-overflow">{{bid.id}}</p>
                    <p class="fs40 p-20 text-overflow">￥{{bid.offerMoney}}</p>
                    <p class="fs40 p-20 text-overflow">{{bid.nickname}}</p>
                    <p class="fs40 p-40 text-overflow">{{bid.createTime | formatNotM}}</p>
                </div>
            </div>
            <!-- 卖家承诺 -->
             <div class="agreement-top" v-if="type == 2">
                <p class="agreement-h1 fs40 ">卖家承诺：</p>
                <div class="agreement-txt fs40">
                一、服务承诺
                </div>
                <div class="agreement-txt fs40">
                A.商家承诺
                </div>
                <p class="agreement-txt fs40">
                1.卖家承诺所发拍品均为真品。
                </p>
                <div class="agreement-txt fs40">
               2.卖家成交不卖，卖家应将保证金退一赔一给竞买成功人
                </div>
                <div class="agreement-txt fs40">
                二、竞拍活动基础服务
                </div>
                <div class="agreement-txt fs40">
                1.保证金保障，卖家入驻竞拍平台需缴纳较高的经营保证金，
买家维权有保障
                </div>
                <p class="agreement-txt fs40">
                三、拍卖特色服务
                </p>
                <div class="agreement-txt fs40">
               A、支持线下预览
                </div>
                <div class="agreement-txt fs40">
               支持线下预览是指卖家已选定场地预展拍品。竞买人可在竞
拍结束前，亲自或委托他人查看竞拍品实物
                </div>
            </div>
            <!-- 保证金须知 -->
            <div class="agreement-top" v-if="type == 3">
                <p class="agreement-h1 fs40 ">保证金须知：</p>
                <div class="agreement-txt fs40">
                一、凡是2015年1月1日后进入交易中心进行招投标活动的 项目，投标保证金的缴纳、退还全部实行网上提交。
                </div>
                <div class="agreement-txt fs40">
                    二、招标代理机构及招标人在编制公告时必须将《保证金管 理系统使用指南》作为公告内容之一，并提示投标人通过保 证金管理系统进行网
                </div>
                <p class="agreement-txt fs40">
                三、投标人应认真阅读《保证金管理系统使用指南》，熟悉 系统操作流程，以免因错误操作造成投标无效，《保证金管 理系统使用指南》详

                </p>
                <div class="agreement-txt fs40">
                四、为提高保证金管理系统的保密性、安全性与公正性，系 统登陆与使用采用数字证书CA认证方式。因此，各投标人 在使用系统前应先行
保证金须知：
                </div>
            </div>
            <content-no :statu="statu" v-if="isShowNo"></content-no>
        </section>
        <section class="shop-footer  shop-footer-fixed">
            <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
        </section>
    </div>
</div>
</template>

<script>
import headerNav from "components/headerNav"; //头部
// import filters from "@/lib/filters"; //过滤器
export default {
  name: "agreement",

  data() {
    return {
      homeNav: [
        { id: 1, name: "抢拍记录" },
        { id: 2, name: "卖家承诺" },
        { id: 3, name: "保证金须知" }
      ],
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      aucId: this.$route.params.aucId,
      type: this.$route.params.type,
      bidArr: null,
      statu: 2, //无信息插件状态
      isShowNo: false
    };
  },
  components: { headerNav},
  mounted() {
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.load();
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  watch: {
    //监听路由
    $route() {
      this.load();
    }
  },
  methods: {
    load() {
      let type = this.$route.params.type;
      this.type = type;
      if (type == 1) {
        this.loadBind();
      }
      this.commonFn.setTitle(this.homeNav[this.type - 1].name);
    },
    handleChange(e) {
      let busId = this.busId;
      let aucId = this.aucId;
      this.type = e;
      this.$router.push("/auction/notice/" + busId + "/" + aucId + "/" + e);
    },
    loadBind() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        auctionId: this.aucId,
        ucLogin: 1//不需要登陆
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.get_bid_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          console.log(myData, "myData");
          if (myData == null) {
            _this.isShowNo = true;
            return;
          }
          if (myData.offerList == null || myData.offerList.length == 0) {
            _this.isShowNo = true;
            return;
          }
          _this.bidArr = myData.offerList;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
.auction-wrapper {
  width: 100%;
  position: relative;
}
.agreement-main {
  width: 100%;
  position: relative;
  padding-bottom: 160/@dev-Width *1rem;
  .agreement-content {
    width: 100%;
    height: 85vh;
    background-color: #fff;
    .agreement-h1 {
      width: 100%;
      margin: 50/@dev-Width *1rem 0;
    }
    .agreement-top {
      padding: 148/@dev-Width *1rem 30/@dev-Width *1rem;
      .agreement-txt {
        text-align: justify;
        margin-bottom: 50 /@dev-Width *1rem;
      }
    }
  }
  .agreement-top2 {
    width: 100%;
    padding-top: 148/@dev-Width *1rem;
    .bid-div {
      width: 100%;
      background-color: #cccccc;
      line-height: 1;
      padding: 30/@dev-Width *1rem;
      .p-20 {
        width: 20%;
      }
      .p-40 {
        width: 38%;
      }
    }
    .bg-white {
      background-color: #fff !important;
    }
  }
  .shop-footer {
    width: 100%;
  }
}
</style>
