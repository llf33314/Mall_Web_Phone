
<template>
    <div class="shop-wrapper sale-wrapper" >
    </div>
</template>

<script>
import defaultImg from "components/defaultImg";
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      saleMemberId: this.$route.params.saleMemberId, //销售员id
      mallSeller: null, //销售员对象
      isSeller: 1, //是否销售员 1是  0不是,要跳转至异常页面
      productList: null, //商品集合
      mallSet: null //商城设置
    };
  },
  components: {
    defaultImg
  },
  //已成功挂载，相当ready()
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("商城首页");
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
        browerType: _this.$store.state.browerType, //浏览器类型
        saleMemberId: this.saleMemberId
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_mall_index_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          console.log(myData, "myData");
          _this.mallSeller = myData.mallSeller;
          _this.isSeller = myData.isSeller;
          _this.productList = myData.productList;
          _this.mallSet = myData.mallSet;
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";

.sale-wrapper {
  width: 100%;
  position: relative;
}
</style>

