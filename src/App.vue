<template>
  <div class="wrapper">
    <!-- <div v-html="style"></div> 主题切换渲染style-->
    <router-view ref="main"/>
    <bubble-hint ref="bubble"></bubble-hint>
    <shop-dialog ref="dialog"></shop-dialog>
    <top ref="top" v-if="$store.state.showTop"></top>
    <!-- <loading :is-loading-show="isLoadingShow"></loading> -->
    <footer-nav ref="footer_nav" v-if="$store.state.showfooter"></footer-nav>
    <!-- <iframe ref="footer_nav" src="https://deeptel.com.cn/mallPage/82/79B4DE7C/pageIndex.do" class="material"></iframe> -->
  </div>
</template>

<script>
import bubbleHint from 'components/bubble_hint.vue';//气泡
import loading from 'components/loading.vue';//loading
import shopDialog from 'components/shopDialog.vue';//弹窗
import Top from 'components/Top';//置顶
import footerNav from 'components/footerNav';//置顶

export default {
  components: {
    bubbleHint,
    loading,
    shopDialog,
    Top,
    footerNav
  },
  watch: {
    '$route'(){
      this.$store.commit('mutationData',{loginDTO_URL:window.location.href});
      this.loadData();
    }
  },
  data () {
    return {
      isLoadingShow: false,
      style:'',
      Messenger:''
    }
  },
  created() {
    this.browser_type();
    let _data = {
        shopId:29,
        busId:42,
        browerType: this.Messenger
      }
    this.$store.commit('mutationData',_data);
  },
  mounted(){
    // this.style = "<style>.aaa{color:red}</style>"
    this.commonFn.setFontSize();
      //this.$store.commit('mutationData',{showfooter:true});
  },
  methods: {
    /** 
     * 判断浏览器类型
    */
    browser_type(){
      let browser = this.commonFn.checkPlatform();
      browser === 'Messenger' ? this.Messenger = 1: this.Messenger = 99;
    },
    //获取店铺id
    getShopId(busId){
      let _this = this;
      _this.commonFn.ajax({
          'url': h5App.activeAPI.get_shop_id_post,
          'data':{
              busId : busId
          },
          'success':function(data){
            let shopId = data.data;
             if(shopId != null && shopId != "" && typeof(shopId) != "undefined"){
              sessionStorage.setItem("shopId",shopId);
              _this.$store.commit('mutationData' , {shopId:shopId});

              _this.getPageId(busId,shopId);
            }
            return shopId;
          }
      });
     // return shopId;
    },
    //获取首页id
    getPageId(busId,shopId){
      let _this = this;
      _this.commonFn.ajax({
          'url': h5App.activeAPI.get_home_page_id_post,
          'data':{
              busId : busId,
              shopId : shopId
          },
          'success':function(data){
              let pageId = data.data.pageId;
              if(pageId != null && pageId != "" && typeof(pageId) != "undefined"){
                sessionStorage.setItem("pageId",pageId);
                _this.$store.commit('mutationData' , {pageId:pageId});
              }
          }
      });
      //return pageId;
    },loadData(){
      let busId = this.$route.params.busId || sessionStorage.getItem("busId");
      let shopId = this.$route.params.shopId || sessionStorage.getItem("shopId");
      let pageId = this.$route.params.pageId || sessionStorage.getItem("pageId");
      if(busId != null && busId != "" && typeof(busId) != "undefined"){
        sessionStorage.setItem("busId",busId);
        this.$store.commit('mutationData' , {busId:busId});
      }
      if(shopId != null && shopId != "" && typeof(shopId) != "undefined"){
        sessionStorage.setItem("shopId",shopId);
        this.$store.commit('mutationData' , {shopId:shopId});
      }else if(busId > 0){
        this.getShopId(busId);
      }
      if(pageId != null && pageId != "" && typeof(pageId) != "undefined"){
        sessionStorage.setItem("pageId",pageId);
        this.$store.commit('mutationData' , {pageId:pageId});
      }else if(shopId > 0 && busId > 0){
        this.getPageId(busId,shopId);
      }
    }
  
  }
}

</script>

<style lang="less">
.wrapper{
  height: 100%;
}
</style>
