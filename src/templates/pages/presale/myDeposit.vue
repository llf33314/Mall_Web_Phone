<template>
   <div class="shop-wrapper mybond-wapper">
        <header-nav :headers= "homeNav" style="z-index:3"
                    @change="handleChange">
        </header-nav>
        <div class="mybond-main" v-if="presaleArr != null">
            <div class="mybond-item" v-for="(presale , index) in presaleArr" :key="index">
                <p class="mybond-item-title fs42 border" v-if="type == 1">
                    <span v-if="presale.depositStatus == 0">未支付</span>
                    <span v-else-if="presale.depositStatus == 1">已支付</span>
                    <span v-else-if="presale.depositStatus == -1">已返还</span>
                    <span class="shopRgba" >由第三方发货</span>
                </p>
                <div class="border"  @click="proDetail(presale)">
                    <goods-info :obj="presale" :imgpath="imgUrl"></goods-info>
                </div>
                <p class="mybond-item-time" v-if="presale.depositStatus != 0 && type == 1"> 
                    <span v-if="presale.depositStatus == 0">未支付</span>
                    <span v-if="presale.depositStatus == 1 && presale.payTime != null">支付时间：{{presale.payTime | formatNotM}}</span>
                    <span v-if="presale.depositStatus == -1 && presale.returnTime">返还时间：{{presale.returnTime | formatNotM}}</span>
                </p>
            </div>
        </div>
        <content-no :statu="statu" v-if="isShowNo"></content-no>
    </div>
</template>

<script>
import headerNav from "components/headerNav"; //头部
import goodsInfo from "../auction/child/goodsinfo"; //商品信息
import filters from "@/lib/filters"; //过滤器
export default {
  components: {
    headerNav,
    goodsInfo
  },
  data() {
    return {
      homeNav: [
        { id: 1, name: "我的定金" },
        { id: -1, name: " " },
        { id: -1, name: " " }
      ],
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      presaleArr: [],
      imgUrl: "",
      type: this.$route.params.type,
      statu: 2, //无信息插件状态
      isShowNo: false
    };
  },
  mounted() {
    console.log("1111111111");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.load();
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  watch: {
    $route() {
      this.load();
    }
  },
  methods: {
    /** 
     * 页头导航接值
     */
    handleChange(value) {
      this.type = value;
      let busId = this.busId;
      this.presaleArr = null;
      this.$router.push("/auction/myDeposit/" + busId + "/" + value);
    },
    //获取我的竞拍
    load() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.my_deposit_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null || myData.length == 0) {
            _this.isShowNo = true;
            return;
          }
          console.log(myData, "myData");
          _this.presaleArr = myData;
          _this.imgUrl = data.imgUrl;
        }
      });
    },
    proDetail(obj) {
      let busId = this.busId;
      let shopId = obj.shop_id || obj.shopId;
      let proId = obj.pro_id || obj.proId;
      let aucId = obj.auc_id || obj.aucId;
      this.$router.push(
        "/goods/details/" + shopId + "/" + busId + "/4/" + proId + "/" + aucId
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
@import  (reference) "~assets/css/common.less";
.mybond-main {
  width: 100%;
  position: relative;
  padding-top: 148/@dev-Width *1rem;
  .mybond-item {
    width: 100%;
    margin-top: 20/@dev-Width *1rem;
    background: #fff;
  }
  .mybond-item-title {
    padding: 9/@dev-Width *1rem 48/@dev-Width *1rem;
    .shop-box-center;
    span {
      display: block;
      padding: 18/@dev-Width *1rem 0;
    }
    span.mybond-item-bottom {
      padding: 18/@dev-Width *1rem 38/@dev-Width *1rem;
      .border-radius(5px);
    }
  }
  .mybond-item-time {
    text-align: right;
    .fs42;
    padding: 25/@dev-Width *1rem 50/@dev-Width *1rem 45/@dev-Width *1rem 0;
  }
}
</style>
