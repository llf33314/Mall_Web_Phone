
<template>
  <div class="shop-wrapper sale-wrapper">
    <div class="seller-top">
      <div class="seller-nav">
          <i class="iconfont icon-jiantou-copy1" @click="back"></i>{{title[type]}}
      </div>
    </div>
     <div class="index-nav clearfix" v-if="incomeList != null">
          <div class="seller-item shop-box-center" v-for="(income,index) in incomeList" :key="index" >
              <div class="left-div ">
                  <div class="img-div">
                      <default-img :background="income.headimgurl"
                          :isHeadPortrait="1"></default-img>
                  </div>
                  <div class="seller-content">
                    <div class="div-title fs45">{{income.user_name || income.nickname}}</div>
                    <div class="div-title fs40">{{income.income_time | format}}</div>
                    <div class="div-title fs40">{{income.det_pro_name}}</div>
                  </div>
              </div>
              <div class="right-div">
                  <span v-if="type == 1">￥{{income.income_commission}}</span>
                  <span v-else-if="type == 2">{{income.income_integral}}积分</span>
                  <span v-else-if="type == 3">￥{{income.income_money}}</span>
                  <span v-else>￥0.00</span>
              </div>
          </div>
      </div>
       <content-no :statu="4" v-if="isShowNullContent"></content-no>
  </div>
</template>

<script>
import filters from "@/lib/filters";
export default {
  data() {
    return {
      type: this.$route.params.type,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      incomeList: null, //累计佣金集合
      title: { 1: "累计佣金", 2: "累计积分", 3: "销售总额" },
      isShowNullContent: false
    };
  },
  components: {
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle(this.title[this.type]);
    this.$store.commit("show_footer", false); //隐藏底部导航栏

    this.loadDatas(); //初始化数据
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  //相关操作事件
  methods: {
    loadDatas(data) {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        type: this.type
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_total_income_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.incomeList = myData.incomeList;
          if (_this.incomeList == null || _this.incomeList.length == 0) {
            _this.isShowNullContent = true;
          }
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
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
@import  (reference) "~assets/css/common.less";
@import  (reference) "~assets/css/sellercommon.less";

.sale-wrapper {
  .index-nav {
    background: #fff;
    width: 100%;
    margin-top: 119/@dev-Width *1rem;
    .seller-item {
      // height: 336/@dev-Width *1rem;
      padding: 66/@dev-Width *1rem 45/@dev-Width *1rem;
      width: 100%;
      .border;
      .left-div {
        width: 80%;
        .ik-box;
        .ik-box-pack(left);
        .ik-box-align(center);
        .img-div {
          width: 158/@dev-Width *1rem;
          height: 158/@dev-Width *1rem;
          background-position: center;
          background-size: cover;
          .border-radius(100%);
          overflow: hidden;
          margin-right: 34/@dev-Width *1rem;
        }
        .seller-content {
          width: 50%;
          .div-title {
            .text-overflow;
          }
          .div-title:nth-child(2),
          .div-title:nth-child(3) {
            margin-top: 40/@dev-Width *1rem;
          }
        }
      }
      .right-div {
        width: 15%;
        .shop-font;
        .fs46;
      }
    }
  }
}
</style>

