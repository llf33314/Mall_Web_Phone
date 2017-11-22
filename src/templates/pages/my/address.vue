<template>
  <div class="shop-wrapper" style="height: 100%;">
        <section class="shop-main fs40 address-main">
            <div class="indexborder clearfix">
                 <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        收件人
                    </div>
                    <div class="shop-fl right">
                        <input placeholder="姓名" class="right-txt" v-model="addressObj.memName">
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        联系电话
                    </div>
                    <div class="shop-fl right">
                        <input placeholder="手机号码" class="right-txt" v-model="addressObj.memPhone">
                    </div>
                </div>
                 <!--<div class="address-list border clearfix">
                    <div class="shop-fl left">
                        选择省
                    </div>
                    <div class="shop-fl right">
                        <select class="right-txt">
                            <option>{{addressObj.provincename}}</option>
                        </select>
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        选择市
                    </div>
                    <div class="shop-fl right">
                        <select class="right-txt">
                            <option>{{addressObj.cityname}}</option>
                        </select>
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        选择区
                    </div>
                    <div class="shop-fl right">
                        <select class="right-txt">
                            <option>{{addressObj.areaname}}</option>
                        </select>
                    </div>
                </div> -->
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                       选择地址
                    </div>
                    <div class="shop-fl right">
                        <textarea class="right-txt" v-model="memberAddress" @click="cli" 
                        v-text="addressObj.provincename+addressObj.cityname+addressObj.areaname+addressObj.memAddress"/>
                    </div>
                </div>
                <!-- <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        详细地址
                    </div>
                    <div class="shop-fl right">
                        <textarea class="right-txt" v-model="addressObj.memAddress" @click="cli"/>
                    </div>
                </div> -->
            </div>
        </section>
        <section class="address-button fs52">
            <div class="shop-max-button shop-bg">
               保存 
            </div>
        </section> 
        <section class="shop-footer-ab">
            <div class="shop-logo"></div>
        </section>
  </div>
</template>

<script>
import { map } from "components/gt-ui/index.js";
import { Popup } from "mint-ui";
export default {
  name: "address",
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      id: this.$route.params.id || 0,
      addressObj: {},
      memberAddress:""
    };
  },
  mounted() {
    this.loadDatas(); //初始化数据
    if (this.id > 0) {
      this.commonFn.setTitle("编辑地址");
    } else {
      this.commonFn.setTitle("新增地址");
    }
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  components: {
    Popup
  },
  methods: {
    loadDatas() {
      if (this.id == 0) {
        return;
      }
      //初始化地址
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        addressId: this.id
      };

      _this.ajaxRequest({
        url: h5App.activeAPI.address_id_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.addressObj = myData;
          console.log(myData, "myData");
        }
      });
    },
    cli() {
      map.show.call(this).then(function(e) {
        console.log(e);
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";

.address-main {
  background: #fff;
  padding-left: 28 / @dev-Width * 1rem;
  .left {
    width: 20%;
  }
  .right {
    width: 80%;
    height: 100%;
    input {
      width: 100%;
      height: 98%;
      border: 0;
      color: #666;
    }
    select {
      width: 100%;
      height: 98%;
      border: 0;
      color: #666;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background: url("../../../assets/img/icon/left.png") no-repeat scroll 96%
        center transparent;
      padding-right: 14px;
      background-size: 8%;
    }
    select::-ms-expand {
      display: none;
    }
    .table {
      color: #666;
      width: 98%;
      max-height: 200%;
      border: 0;
      outline: 0;
      word-wrap: break-word;
      overflow-x: hidden;
      overflow-y: auto;
    }
    textarea {
      border: 0;
      width: 96%;
      height: 150/@dev-Width *1rem;
    }
  }
}
.address-button {
  height: 140/ @dev-Width * 1rem;
  margin: 20% auto 0;
  width: 90%;
}
.address-list {
  width: 100%;
  .left {
    line-height: 3.5em;
  }
  .right {
    .right-txt {
      padding: 40/ @dev-Width * 1rem 0 35/ @dev-Width * 1rem 0;
    }
  }
}
</style>
