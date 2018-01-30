<template>
  <div class="stores-wrapper">
    <div class="head-div">
       <i class="iconfont icon-jiantou-copy1" @click="back"></i>
       <div>
         <p class="title_p">粉币商城</p>
         <!-- <p class="title_index">首页</p> -->
       </div>
    </div>
    <div class="store-div">
      <div class="stores-item" v-for="(item,index) in shopData" :key="index"  @click="toPage(item)">
        <div class="item-center">
          <div class="fs50 first-div">{{item.shopName}}</div>
          <p class="fs44 add_p">{{item.address}}</p>
          <em class="border"></em>
        </div>
        <div class="item-right">
          <i class="icon-jiantou-copy iconfont"></i>
        </div>
      </div>
    </div>
    <div class="shop-footer-fixed">
     <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      shopData: "",
    };
  },
  beforeCreate() {},
  mounted() {
    this.commonFn.setTitle("粉币商城");
    this.shopListAjax();
    this.$store.commit("show_footer", false);
  },
  methods: {
    /** 
       * 店铺列表接口
      */
    shopListAjax() {
      let _this = this;
      _this.ajaxRequest({
        url: h5App.activeAPI.queryFenbiShopByBusId_post,
        data: {
          busId: _this.$store.state.busId
        },
        success: function(data) {
          _this.shopData = data.data;
        }
      });
    },
    back() {
      window.history.go(-1);
    },
    //进入粉币商品列表
    toPage(item) {
      let shopId = item.id;
      let busId = this.$route.params.busId;
      this.$parent.getPageId(busId, shopId, true);
      // this.$router.push("/classify/" + id + "/" + busId + "/5/k=k");
    }
  },
  beforeDestroy() {
    this.$store.commit("show_footer", true);
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
.stores-wrapper {
  height: 100%;
  background: url("../../../assets/img/fenbi_store_bg.jpg") no-repeat;
  background-size: cover;
  .head-div {
    height: 140/@dev-Width *1rem;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    color: #fff;
    div {
      .fs50;
      width: 18%;
    }
    div {
      text-align: right;
      width: 60%;
      padding-right: 34/@dev-Width *1rem;
      .ik-box;
      .ik-box-pack(justify);
      .ik-box-align(center);
      p.title_p {
        width: 40%;
        text-align: left;

      }
      p.title_index{
        width: 20%;
        text-align: right;
      }
    }
    i {
      display: block;
      width: 40%;
      padding-left: 58/@dev-Width *1rem;
    }
  }
  .store-div {
    margin: 65/@dev-Width *1rem 28/@dev-Width *1rem 40/@dev-Width *1rem 26/@dev-Width *1rem;
  }
  .stores-item {
    width: 100%;
    margin-bottom: 40/@dev-Width *1rem;
    background: #fff;
    overflow: hidden;
    border: 1px solid #888171;
    .border-radius(5px);
    .ik-box;
    .ik-box-pack(justify);
    padding: 64/@dev-Width *1rem 49/@dev-Width *1rem 66/@dev-Width *1rem 50/@dev-Width *1rem;
    // line-height: 1;
    .item-center {
      width: 83%;
      position: relative;
      .first-div {
        margin-bottom: 58/@dev-Width *1rem;
      }
      p {
        width: 90%;
        height: 40p/@dev-Width *1rem;
        .text-more-overflow;
      }
      .add_p {
        color: #888888;
      }
      .border {
        position: absolute;
        right: -5px;
        width: 1px;
        height: 100%;
        top: 0;
        background: #dfdfdd;
      }
    }
    .item-right {
      width: 12%;
      .ik-box;
      .ik-box-pack(center);
      .ik-box-align(center);
      font-size: 0;
      i {
        width: 34/@dev-Width *1rem;
        width: 65/@dev-Width *1rem;
        color: #999999;
      }
    }
  }
  .shop-footer-fixed {
    width: 100%;
  }
}
</style>
