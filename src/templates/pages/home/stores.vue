<template>
  <div class="stores-wrapper">
    <div class="stores-item" v-for="item in shopData">
      <div class="item-center">
        <div class="fs46">{{item.sto_name}}</div>
        <p class="fs42"><i class="icon-dianhua1 iconfont"></i> 0752-134567</p>
        <p class="fs42"><i class="icon-dingwei iconfont"></i> {{item.address}}</p>
        <em class="border"></em>
      </div>
      <div class="item-img">
        <default-img :isHeadPortrait="0" :background="imgUrl+item.stoPicture"></default-img>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from 'components/defaultImg'
export default {
    components: {
      defaultImg
    },
    data () {
      return {
        shopData:'',
        imgUrl:'http://maint.yifriend.net/upload/'
      }
    },
    beforeCreate() {
      this.$store.commit('show_footer',0);
    },
    mounted(){
      this.commonFn.setTitle('选择门店');
      this.shopListAjax();
    },
    methods: {
      /** 
       * 店铺列表接口
      */
      shopListAjax(){
        let _this = this;
        _this.commonFn.ajax({
            'url': h5App.activeAPI.phonePage_shopList_post,
            'data':{
                busId : _this.$store.state.busId
            },
            'success':function(data){
                console.log(data);
                //_this.imgUrl = data.imgUrl ;
                _this.shopData = data.data;
            }
        })
      }
    },
    beforeDestroy(){
       this.$store.commit('show_footer',true);
    }
}
</script>

<style lang="less">
  @import '../../../assets/css/mixins.less';
  @import '../../../assets/css/base.less';
  .stores-wrapper{
    height: 100%;
    .stores-item{
      width: 100%;
      padding: 30/@dev-Width *1rem 20/@dev-Width *1rem 30/@dev-Width *1rem 45/@dev-Width *1rem;
      .ik-box;
      .ik-box-pack(justify);
      // line-height: 1;
      .item-center{
        width: 69%;
        position: relative;
        &>div,&>p:first-of-type{
          margin-bottom: 20/@dev-Width *1rem
        }
        i{
          color:#b6c2d6;
        }
        .border{
          position: absolute;
          right: -5px;
          width: 2px;
          height: 150/@dev-Width *1rem;
          top: 20px;
          background:#dfdfdd;
        }
      }
      .item-img{
        width: 255/@dev-Width *1rem;
        height: 255/@dev-Width *1rem;
        .border-radius(5px);
        margin-left: 68/@dev-Width *1rem;
        overflow: hidden;
      }
    }
  }
</style>
