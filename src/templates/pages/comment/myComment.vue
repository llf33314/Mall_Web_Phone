<template>
    <div class="mycomment-wrapper">
        <div class="mycomment-item">
            <div class="item-top">
                <p class="item-spec-time">
                    <span class="fs36">规格：128g,玫瑰金</span>
                    <span class="fs36">2017-11-3  11：06</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import defaultImg from "components/defaultImg";
export default {
  name: "mycomment",

  data() {
    return {
        
    };
  },
  components: {
    defaultImg
  },
  mounted() {
   
  },
  beforeDestroy() {
   
  },
  methods: {
    //初始化样式
    loadDatas() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.is_apply_seller_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null) {
            return;
          }
          console.log(myData, "myData");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
.mycomment-wrapper{
    width: 100%;
    .mycomment-item{
        width: 100%;
        background: #fff;
        padding: 30 /@dev-Width * 1rem ; 
        margin-bottom: 30 /@dev-Width * 1rem ;
        font-size: 0;
        .item-top{
            width: 100%;
            padding: 0 20 /@dev-Width * 1rem ; 
        }
        .item-center{
            width: 100%;
            padding: 0 20 /@dev-Width * 1rem ; 
        }
        .item-bottom{
            width: 100%;
            padding: 0 20 /@dev-Width * 1rem ; 
        }
    }
}
</style>
