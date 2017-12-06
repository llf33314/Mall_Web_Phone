
<template>
    <div class="shop-wrapper sale-wrapper" >
        <div class="seller-top">
            <div class="seller-nav">
                <i class="iconfont icon-jiantou-copy1" @click="back"></i>佣金明细
            </div>
            <div class="seller-nav2 border">
                <header-nav :headers="headerArr" :selectId="type" :type.sync="type"></header-nav>
            </div>
       </div>
       <div class="seller-content" v-if="commissionArr != null">
           <div class="seller-item" v-for="(commission,index) in commissionArr" :key="index">
              <div class="border ">
                   <div class="title-div">{{commission.income_type == 2 ? commission.det_pro_name:'通过关注获取'}}</div>
                   <div class="contet-div">买家:{{commission.nickname}}</div>
                   <div class="contet-div">时间:{{commission.income_time | format}}</div>
                   <div class="contet-div">状态:{{commission.statusName}}</div>
              </div>
              <div class="contet-div" v-if="commission.income_money > 0">金额: ￥{{commission.income_money}}</div>
           </div>
       </div>
       <content-no :statu="4" v-if="isShowNullContent"></content-no>
    </div>
</template>

<script>
import defaultImg from "components/defaultImg";
import contentNo from "components/contentNo";
import headerNav from "./setchlid/headerNav";
// import more from "components/more";
import filter from "@/lib/filters";
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      commissionArr: null,
      type: 0,
      headerArr: [
        { id: 0, name: "全部" },
        { id: 1, name: "待审核" },
        { id: 2, name: "已完成" },
        { id: 3, name: "无效" }
      ],
      isShowNullContent: false
    };
  },
  components: {
    defaultImg,
    headerNav,
    contentNo
  },
  watch: {
    type() {
      this.orderArr = null;
      this.loadDatas(); //初始化数据
    }
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle("佣金明细");
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
        status: _this.type,
        browerType: _this.$store.state.browerType, //浏览器类型
        type: this.type
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_commion_detail_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null || myData.length == 0) {
            _this.isShowNullContent = true;
          }
          _this.commissionArr = myData;
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
@import "./css/sellercommon.less";

.sale-wrapper {
  .seller-content {
    width: 100%;
    padding: 22/@dev-Width *1rem;
    padding-bottom: 0;
    margin-top: 270/@dev-Width *1rem;
    .seller-item {
      background: #fff;
      border: 2px solid #ececec;
      margin-bottom: 22/@dev-Width *1rem;
      .border-radius(2%);
      padding: 25/@dev-Width *1rem 0 0 43/@dev-Width *1rem;
      .title-div {
        .fs45;
        color: #5fa642;
        margin-bottom: 20/@dev-Width *1rem;
      }
      .contet-div {
        .fs42;
        color: #666666;
        margin-bottom: 20/@dev-Width *1rem;
      }
    }
  }
}
</style>

