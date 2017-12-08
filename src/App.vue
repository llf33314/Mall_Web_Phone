<template>
  <div class="wrapper">
    <!-- <div v-html="style"></div> 主题切换渲染style-->
    <router-view ref="main"/>
    <bubble-hint ref="bubble"></bubble-hint>
    <shop-dialog ref="dialog"></shop-dialog>
    <top ref="top" v-if="$store.state.showTop"></top>
    <loading ref="loading"></loading>
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
import ajax from '@/lib/ajax.js'



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
      _this.ajaxRequest({
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
    getPageId(busId,shopId,isReturn){
      let _this = this;
      busId =  busId ||  this.$route.params.busId || sessionStorage.getItem("busId");
      let saleMemberId = this.getSaleMemberId();
      if(this.commonFn.isNotNull(saleMemberId) && saleMemberId > 0){
        this.$router.push("/seller/mallindex/"+busId+"/"+saleMemberId);
        return;
      }
      _this.ajaxRequest({
          'url': h5App.activeAPI.get_home_page_id_post,
          'data':{
              busId : busId,
              shopId : shopId ||  this.$route.params.shopId || sessionStorage.getItem("shopId")
          },
          'success':function(data){
            let datas = data.data;
              let pageId = data.data.pageId;
              debugger
              if(pageId != null && pageId != "" && typeof(pageId) != "undefined"){
                sessionStorage.setItem("pageId",pageId);
                _this.$store.commit('mutationData' , {pageId:pageId});
                if(isReturn ){
                  //跳转首页
                }
                return;
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
    },
    getSaleMemberId(){
      let saleMemberId = this.$route.params.saleMemberId;
      let _isNotNull = this.commonFn.isNotNull;
      if(_isNotNull(saleMemberId)){
        sessionStorage.setItem("saleMemberId",saleMemberId);
        return saleMemberId;
      }
      let desc = this.$route.params.desc;
      if(_isNotNull(desc) && desc != "-"){
        desc = desc.split("-");
        if(desc != null && desc.length > 0){
          if(_isNotNull(desc[0])){
            sessionStorage.setItem("saleMemberId",saleMemberId);
            return desc[0];
          }
        }
      }
      saleMemberId = sessionStorage.getItem("saleMemberId");
      if(_isNotNull(saleMemberId) && saleMemberId > 0){
        return saleMemberId;
      }
      return 0;
    },setSaleMemberId(saleMemberId){
      sessionStorage.setItem("saleMemberId",saleMemberId);
    }
  
  }
}

</script>

<style lang="less">
.wrapper{
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
}
</style>
