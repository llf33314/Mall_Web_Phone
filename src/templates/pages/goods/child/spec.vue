<template>
  <div class="spec-wrapper">
    <div class="spec-no " v-if="isShow == 0">
        <p class="fs40 shopGray">暂无规格</p>
    </div>
    <div class="spec-content" v-if="isShow == 1">
      <div class="spec-box" v-for="item in specData">
        <p class="spec-list boder">
          <span class="fs40">{{item.paramsName}}</span>
          <span class="fs40">{{item.paramsValue}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  components: {
    
  },
  data () {
    return {
      isShow:-1,
      specData:''
    }
  },
  methods: {
  /**
   * 查询商品规格参数（商品详情页面）
   */
  specAjax(){
    let _this = this;
    _this.textNo = name;
    _this.ajaxRequest({
      'status':false,
      'url': h5App.activeAPI.phoneProduct_getProductParams_post,
      'data':{
          productId :  _this.$route.params.goodsId,
      },
      'success':function(data){
        console.log(data,'specData');
        if(data.code == 1 || !data.data.length>0){
          _this.isShow = 0;
          return
        }
        _this.isShow = 1;
        _this.specData = data.data;
        } 
      })
    },
  },
  mounted () {
      this.specAjax();
  }
}
</script>

<style lang="less" scoped>
@import '../../../../assets/css/mixins.less';
@import '../../../../assets/css/base.less';
.spec-wrapper{
  .spec-no{
      width: 100%;
      text-align: center;
      // background: #fff;
      padding-top:  109/@dev-Width *1rem;
      padding-bottom:  46/@dev-Width *1rem;
  }
  .spec-content{
    background: #fff;
    padding: 30/@dev-Width *1rem;
    .spec-box{
      width: 100%;
      border: 1px solid #ddd;
    }
    .spec-list{
      width: 100%;
      span{
        display: inline-block;
        padding: 30/@dev-Width *1rem;
      }
      span:first-of-type{
        width: 25%;
        border-right: 1px solid #ddd;
      }
      span:last-of-type{
        width: 75%;
      }
    }
  }
}
</style>
