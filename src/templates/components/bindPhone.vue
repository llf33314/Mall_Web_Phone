<template>
    <div>
        <dialog-modular :dialogTitle = "'绑定手机号码'">
            <div class="dialog-input-main">
                <div class="dialog-input-box">
                    <div class="dialog-input">
                        <input class="fs50" placeholder="请输入手机号码" v-model="telPhone"/>
                    </div>
                    <div class="dialog-input dialog-code">
                        <input class=" fs50" placeholder="请输入验证码" v-model="code"/>
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
export default {
  props: ["phone", "type"],
  data: function() {
    return {
      code: "",
      waitTime: 60, //等待时间
      getCodeMsg: Language.get_validate_code_msg,
      telPhone: null
    };
  },
  components: {
    dialogModular
  },
  methods: {
    //获取短信验证码
    getValiCode() {
      let _phone = this.telPhone;
      let _commonfn = this.commonFn;
      let _isNull = _commonfn.isNull;
      if (_isNull(_phone) || !_commonfn.validPhone(_phone)) {
        this.$parent.$parent.$refs.bubble.show_tips("请输入手机号码");
        return;
      }
      let _this = this;
      let _data = {
        busId: this.$route.params.busId || sessionStorage.getItem("busId"),
        phone: _phone,
        type: 1
      };
      this.time();
      _this.ajaxRequest({
        url: h5App.activeAPI.validate_code_get,
        data: _data,
        loading: true,
        type: "get",
        success: function(data) {
          _this.commonFn.loading(_this, false);
        }
      });
    },
    time() {
      let _this = this;
      let waitTime = this.waitTime;
      if (waitTime == 0) {
        this.getCodeMsg = Language.get_validate_code_msg; //"获取验证码";
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
        this.$parent.$parent.$refs.bubble.show_tips("请输入手机号码");
        return;
      }
      if (_isNull(_code)) {
        this.$parent.$parent.$refs.bubble.show_tips("请输入验证码");
        return;
      }
      let _this = this;
      let _data = {
        busId: this.$route.params.busId || sessionStorage.getItem("busId"),
        url: location.href,
        browerType: _this.$store.state.browerType,
        phone: _phone,
        code: _code
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.bind_phone_post,
        data: _data,
        loading: true,
        vmParent: _this.$parent.$parent,
        success: function(data) {
          console.log(data, "data");
          _this.commonFn.loading(_this, false, _this.$parent.$parent);
          _this.$emit("update:isShowMemberPhone", false);
          _this.$emit("confirmPhones", [_phone]);
        }
      });
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
.dialog-button3 {
  width: 100%;
  display: block;
  text-align: center;
  height: 140/@dev-Width *1rem;
  line-height: 140/@dev-Width *1rem;
  margin-top: 65/@dev-Width *1rem;
  border-top: 1px solid #e0e0e0;
}
</style>
