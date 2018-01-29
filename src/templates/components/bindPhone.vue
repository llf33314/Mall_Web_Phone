<template>
    <div>
        <dialog-modular :dialogTitle = "'绑定手机号码'">
            <div class="dialog-input-main">
                <div class="dialog-input-box">
                    <div class="dialog-input code_div" >
                        <div class="div2 fs45">
                          <area-code @selectCode="returnAreaCode" :dataStyle="{color: '#666666'}"></area-code>
                        </div>
                        <!-- <div @click="isShowAreaCode=true">
                          <em class="fs45">+{{areaCodeStr}}</em>
                          <i class="iconfont icon-jiantou"></i>
                        </div> -->
                        <input class="fs50" placeholder="请输入手机号码" v-model="telPhone"/>
                    </div>
                    <div class="dialog-input dialog-code">
                        <input class="fs50" placeholder="请输入验证码" v-model="code"/>
                        <span class="fs50 style-main-font" @click="getValiCode" v-text="getCodeMsg">获取验证码</span>
                    </div>
                </div>
                <div class="dialog-bottom">
                    <div class="border"></div>
                    <span class="fs50 dialog-button3 style-main-font " 
                        @click="confirmPhone"
                        >确定
                    </span>
                </div>
            </div>
        </dialog-modular>
        
    </div>
</template>
<script>
import dialogModular from "components/dialogModular"; //绑定手机号码弹出框
import areaCode from "components/areaCode"; //绑定手机号码
export default {
  props: ["phone", "type"],
  data: function() {
    return {
      code: "",
      waitTime: 60, //等待时间
      getCodeMsg: this.$t('get_validate_code_msg'),
      telPhone: null,
      areaCodeData: null
    };
  },
  components: {
    dialogModular,
    areaCode
  },
  methods: {
    //获取短信验证码
    getValiCode() {
      let _phone = this.telPhone;
      let _commonfn = this.commonFn;
      let _isNull = _commonfn.isNull;
      if (_isNull(_phone) || !_commonfn.validPhone(_phone)) {
        this.$store.commit("error_msg", "请输入手机号码");
        return;
      }
      let _this = this;
      let _data = {
        busId: this.$route.params.busId || sessionStorage.getItem("busId"),
        phone: _phone,
        type: 1,
        areaCode: areaCodeData.areacode
      };
      this.time();
      _this.ajaxRequest({
        url: h5App.activeAPI.validate_code_get,
        data: _data,
        loading: true,
        type: "get",
        success: function(data) {
          _this.$store.commit("is_show_loading", false);
        }
      });
    },
    time() {
      let _this = this;
      let waitTime = this.waitTime;
      if (waitTime == 0) {
        this.getCodeMsg = this.$t('get_validate_code_msg'); //"获取验证码";
        waitTime = 60;
      } else {
        this.getCodeMsg = waitTime + "秒后重发";
        this.waitTime--;
        setTimeout(function() {
          _this.time();
        }, 1000);
      }
    },
    confirmPhone() {
      let _phone = this.telPhone;
      let _commonfn = this.commonFn;
      let _isNull = _commonfn.isNull;
      let _code = this.code;
      if (_isNull(_phone) || !_commonfn.validPhone(_phone)) {
        this.$store.commit("error_msg", "请输入手机号码");
        return;
      }
      if (_isNull(_code)) {
        this.$store.commit("error_msg", "请输入验证码");
        return;
      }
      let _this = this;
      let _data = {
        busId: this.$route.params.busId || sessionStorage.getItem("busId"),
        url: location.href,
        browerType: _this.$store.state.browerType,
        phone: _phone,
        code: _code,
        areaId: _this.areaCodeData.id,
        areaCode: _this.areaCodeData.areacode
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.bind_phone_post,
        data: _data,
        loading: true,
        vmParent: _this.$parent.$parent,
        success: function(data) {
          console.log(data, "data");
          _this.$store.commit("is_show_loading", false, _this.$parent.$parent);
          _this.$emit("update:isShowMemberPhone", false);
          _this.$emit("confirmPhones", [_phone]);
        }
      });
    },
    returnAreaCode(data) {
      console.log("--------11", data);
      if (data == null || data == "") {
        return;
      }
      this.areaCodeData = data;
    }
  }
};
//使用
//  this.$root.$refs.bubble.show_tips('最多只能选择3个');//bubble_hint*/
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
@import "../../assets/css/common.less";
// .dialog-main{
//   .border-radius(2px);
// }
.dialog-button3 {
  width: 100%;
  display: block;
  text-align: center;
  height: 140/@dev-Width *1rem;
  line-height: 140/@dev-Width *1rem;
  margin-top: 65/@dev-Width *1rem;
  border-top: 1px solid #e0e0e0;
}
.code_div {
  .ik-box;
  .ik-box-pack(justify);
  // .ik-box-align(center);
  input {
    width: 80% !important;
    display: block;
    padding-left: 35/@dev-Width *1rem;
  }
  .div2 {
    width: 20%;
    // border-right: 1px solid #d1d1d5;
    // .ik-box;
    // .ik-box-pack(justify);
    // .ik-box-align(center);
    // em {
    //   vertical-align: sub;
    //   display: block;
    // }
    // i {
    //   display: block;
    //   color: #c7c7cc;
    //   padding: 0 20/@dev-Width *1rem;
    // }
  }
}
</style>
