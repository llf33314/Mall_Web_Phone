<template>
   <div class="shop-wrapper mybond-wapper">
        <header-nav :headers= "homeNav" style="z-index:3"
                    @change="handleChange">
        </header-nav>
        <div class="mybond-main" v-if="bidArr != null">
            <div class="mybond-item" v-for="(bid , index) in bidArr" :key="index">
                <p class="mybond-item-title fs42 border" v-if="type == 3">
                    <span>{{bid.order_id == null ? "竞拍成功，未转订单" : bid.auc_status == 1 &&  bid.order_id != null ? "竞拍成功，已转订单":"竞拍失败"}}</span>
                    <span class="mybond-item-bottom shop-bg" v-if="bid.order_id == null"  @click="proDetail(bid)">转订单</span>
                </p>
                <div class="border"  @click="proDetail(bid)">
                    <goods-info :obj="bid" :imgpath="imgUrl"></goods-info>
                </div>
                <p class="mybond-item-time" v-if="bid.create_time != null && type == 1"> 
                    出价时间：{{bid.create_time | formatNotM}}
                </p>
                <p class="mybond-item-time" v-if="bid.createTime != null && type == 2"> 
                    出价时间：{{bid.createTime | formatNotM}}
                </p>
            </div>
        </div>
        <content-no :statu="statu" v-if="isShowNo"></content-no>
    </div>
</template>

<script>
import headerNav from "components/headerNav"; //头部
import goodsInfo from "./child/goodsinfo"; //商品信息
import filters from "@/lib/filters"; //过滤器
export default {
  components: {
    headerNav,
    goodsInfo
  },
  data() {
    return {
      homeNav: [
        { id: 1, name: "我的竞拍" },
        { id: 2, name: "我的保证金" },
        { id: 3, name: "我的获拍" }
      ],
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      bidArr: [],
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
      this.bidArr = null;
      this.$router.push("/auction/myBidding/" + busId + "/" + value);
    },
    load() {
      let type = this.$route.params.type;
      this.type = type;
      console.log(type, "type");
      if (type == 1) {
        this.loadBind();
      } else if (type == 2) {
        this.loadMargin();
      } else if (type == 3) {
        this.loadHuo();
      }
      this.commonFn.setTitle(this.homeNav[this.type - 1].name);
    },
    //获取我的竞拍
    loadBind() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.my_bidding_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null || myData.length == 0) {
            _this.isShowNo = true;
            return;
          }
          console.log(myData, "myData");
          _this.bidArr = myData;
          _this.imgUrl = data.imgUrl;
          _this.isShowNo = false;
        }
      });
    },
    /**获取我的保证金 */
    loadMargin() {
      let _isNotNull = this.commonFn.isNotNull;
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.my_margin_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null || myData.length == 0) {
            _this.isShowNo = true;
            return;
          }
          console.log(myData, "myData");
          _this.bidArr = myData;
          _this.imgUrl = data.imgUrl;
          _this.isShowNo = false;
        }
      });
    },
    /**获取我的获拍 */
    loadHuo() {
      let _isNotNull = this.commonFn.isNotNull;
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.my_huo_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null || myData.length == 0) {
            _this.isShowNo = true;
            return;
          }
          console.log(myData, "myData");
          _this.bidArr = myData;
          _this.imgUrl = data.imgUrl;
          _this.isShowNo = false;
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
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
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
