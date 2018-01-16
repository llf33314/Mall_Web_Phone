<template>
  <div style="width: 100%;">
    <!--按钮-->
    <div class="code-button" @click="isShow=true" >
      {{select==null?'国家/地区':'+'+select.areacode}}
    </div>
    <!--搜索页-->
    <popup v-model="isShow" position="right" class="mint-popup-3" :modal="false">
      <div class="code-main">
        <div class="code-top border">
          <input  class="fs50" placeholder="搜索国家/地区" v-model="content" />
          <i class="iconfont icon-guanbi" @click="selectCode(null)"></i>
        </div>
        <div class="code-content" v-if="searchData != null">
          <div class="border code-item" v-for="(code,index) in searchData" :key="index" @click="selectCode(code)">
            <span class="fs52 span_left">{{code.country}}</span>
            <span class="fs52 span_right">+{{code.areacode}}</span>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
 import {Popup} from 'mint-ui'
export default {
  props: {
  },
  components: {
    Popup
  },
  data: function() {
    return {
      content: "",
      codeArr: null,
      isShow:false,
      style:{},
      select:null
    };
  },
  computed: {
    searchData: function() {
      var _this = this;
      if (_this.content != null && _this.content != "") {
        return _this.codeArr.filter(function(code) {
          //当然如果是纯属字就可以不用转换小写了，处于习惯还是加上了
          return (  code.country.indexOf(_this.content)   !== -1  || code.englishname.indexOf(_this.content) !== -1 ); 
        });
      }
      return this.codeArr;
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      let _this = this;
      _this.ajaxRequest({
        url: h5App.activeAPI.areaPhoneList_post,
        loading: true,
        success: function(data) {
          _this.$store.commit("is_show_loading", false);
          //console.log(data.data);
          _this.codeArr = data.data;
        }
      });
    },
    selectCode(data){
      this.isShow = false;
      if(data == null){
        this.select = null
      }else{
        this.select = data;
      }
      this.$emit("selectCode",data);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
.code-button{
  width: 100%;
  padding: 40/ @dev-Width * 1rem 0 35/ @dev-Width * 1rem 0;
  color: #666;
}
.select-code{
  color: #333!important;
}
.mint-popup-3{
  width: 100%;
  height: 100%;
}
.code-main {
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  border: solid #dbdbdb;
  border-top: 1px;
  border-left: 1px;
  .code-top {
    width: 100%;
    height: 208/@dev-Width *1rem;
    line-height: 208/@dev-Width *1rem;
    .ik-box;
    .ik-box-pack(justify);
    .ik-box-align(center);
    input,
    i {
      display: block;
    }
    input {
      width: 84%;
      border: 0px;
      padding-left: 66/@dev-Width *1rem;
    }
    i {
      width: 16%;
      height: 100%;
      text-align: right;
      color: #333743;
      font-weight: bolder;
      font-size: 80/@dev-Width *1rem;
      padding-right: 74/@dev-Width *1rem;
    }
  }
  .code-content {
    padding-left: 62/@dev-Width *1rem;
    .code-item {
      height: 215/@dev-Width *1rem;
      width: 100%;
      .ik-box;
      .ik-box-pack(justify);
      .ik-box-align(center);
      span {
        display: block;
        color: #333743;
      }
      .span_left {
        width: 80%;
      }
      .span_right {
        width: 20%;
        text-align: right;
        padding-right: 74/@dev-Width *1rem;
      }
    }
  }
}
</style>
