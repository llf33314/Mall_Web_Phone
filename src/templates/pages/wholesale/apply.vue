<template>
<div id='app' class="shop-wrapper apply-wapper">
    <header class="apply-notice">
        <i>i</i>
        <p class="fs40">基本信息的有效性决定您能否成为批发商，以及最终可获得 的折扣</p>
    </header>
    <section class="apply-main">
        <div class="apply-form">
            <div class="apply-item border">
                <div class="apply-title fs40">
                    姓名
                </div>
                <div class="apply-txt fs40">
                    <input placeholder="请输入本人真实姓名(必填)" v-model="name"
                    @blur="blurValidate(name,1)" />
                </div>
            </div>
            <div class="apply-item border">
                <div class="apply-title fs40">
                    公司名称
                </div>
                <div class="apply-txt fs40">
                    <input placeholder="请输入公司名称(必填)" v-model="companyName"
                    @blur="blurValidate(companyName,2)" />
                </div>
            </div>
            <div class="apply-item border">
                <div class="apply-title fs40">
                    手机号
                </div>
                <div class="apply-txt fs40">
                  <div class="shop-fl " style="width:18%">
                    <area-code :dataStyle="{
                      color:'#666',
                      padding: '0.2rem 0'
                      }"
                      @selectCode = "changeArea"></area-code>
                  </div>
                  <input placeholder="请输入手机号(必填)" class="apply-tel" v-model="telephone"
                  @blur="blurValidate(telephone,3)" />
                  <span class="apply-tel-button shop-font" v-text="getCodeMsg"
                      @click="getPhoneCode">
                      获取验证码
                  </span>
                </div>
            </div>
            <div class="apply-item border">
                <div class="apply-title fs40">
                    验证码
                </div>
                <div class="apply-txt fs40">
                    <input placeholder="请输入验证码(必填)" v-model="code"
                    @blur="blurValidate(code,4)" />
                </div>
            </div>
            <div class="apply-item border">
                <div class="apply-title fs40">
                    备注
                </div>
                <div class="apply-txt fs40">
                    <textarea class="table"  placeholder="请输入备注" v-model="remark"
                    @blur="blurValidate(remark,5)"></textarea>
                </div>
            </div>
        </div>
        <div class="apply-buttom fs52">
            <div class="shop-max-button shop-bg" 
                @click="submitApply">
                申请
            </div>
            <p class="fs40" v-if="pfApplayRemark != null">{{pfApplayRemark}}</p>
        </div>
    </section>
    <section class="shop-footer-ab shop-footer">
       <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
    </section>
    <shop-dialog ref="dialog"></shop-dialog>
</div>
</template>

<script>
import areaCode from 'components/areaCode';//国家/地区
import shopDialog from "components/shopDialog";
export default {
  name: "apply",
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      pfApplayRemark: "",
      name: "", //姓名
      companyName: "", //公司名称
      telephone: "", //手机号码
      remark: "", //备注
      code: "", // 验证码
      isSend: false, //是否已经发送验证码
      waitTime: 60, //等待时间
      getCodeMsg: this.$t('get_validate_code_msg'),
      selectArea:''//选择区号
    };
  },
  components: {
    shopDialog,
    areaCode
  },
  mounted() {
    this.loadDatas(); //初始化协商详情数据
    this.commonFn.setTitle(this.$t('title.title_pifa_apply_msg'));
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadDatas() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.get_pf_apply_remark_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData != null) {
            _this.pfApplayRemark = myData.pfApplayRemark;
          }
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
    getPhoneCode() {
      let _this = this;
      if (!this.blurValidate(this.telephone, 3)) {
        return;
      }
      //还在倒计时不能获取验证码
      if (this.waitTime > 0 && this.waitTime < 60) {
        return;
      }
      let _data = {
        busId: this.busId, //商家id
        mobile: this.telephone ,//手机号码
        areaCode: this.selectArea.areacode//区号
      };
      this.time();
      this.ajaxRequest({
        url: h5App.activeAPI.pifa_send_msg_post,
        data: _data,
        loading: true,
        success: function(data) {
          _this.$store.commit("is_show_loading", false);
        }
      });
    },
    submitApply() {
      let _this = this;
      let vali = this.blurValidate;
      
      if (
        !vali(this.name, 1) ||
        !vali(this.companyName, 2) ||
        !vali(this.telephone, 3) ||
        !vali(this.code, 4) ||
        !vali(this.remark, 5)
      ) {
        return;
      }

      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        name: _this.name, //姓名必传
        companyName: _this.companyName, //公司名称必传
        telephone: _this.selectArea.areacode+","+_this.telephone, //手机号码必传
        remark: _this.remark, //备注
        code: _this.code //验证码必传
      };

      this.ajaxRequest({
        url: h5App.activeAPI.add_pifa_post,
        data: _data,
        loading: true,
        success: function(data) {
          _this.showDialogs();
          _this.$store.commit("is_show_loading", false);
        }
      });
    },
    showDialogs() {
      var _this = this;
      let msg = {
        btnNum: "1", //按钮数
        dialogTitle: this.$t('submit_success_msg'), //提交成功,
        dialogMsg: this.$t('submit_apply_wait_msg'), //内容,（您已提交申请，请耐心等待）
        btnOne: this.$t('good_msg'), //好的
        callback: {
          btnOne: function() {
            _this.toReturnMyApp();
          }
        }
      };
      _this.$parent.$refs.dialog.showDialog(msg);
    },
    blurValidate(obj, type) {
      let _showTip = this.$parent.$refs.bubble.show_tips; //冒泡提醒
      let _commonFn = this.commonFn; //公共js调用
      let _isNull = _commonFn.isNull; //不为空定义
      if (type == 1) {
        //验证姓名
        if (_isNull(obj)) {
          _showTip(this.$t('pifa_name_msg'));
          return false;
        } else if (obj.length > 25) {
          _showTip(this.$t('pifa_name_length_msg'));
          return false;
        }
      } else if (type == 2) {
        //验证公司名称
        if (_isNull(obj)) {
          _showTip(this.$t('pifa_company_name_msg'));
          return false;
        } else if (obj.length > 50) {
          _showTip(this.$t('pifa_company_name_length_msg'));
          return false;
        }
      } else if (type == 3) {
        //验证手机号码
        if (_isNull(obj) || !_commonFn.validPhone(obj)) {
          _showTip(this.$t('pifa_telePhone_msg'));
          return false;
        }
      } else if (type == 4) {
        //验证验证码
        if (_isNull(obj)) {
          _showTip(this.$t('pifa_validate_code_msg'));
          return false;
        }
      } else if (type == 5) {
        //验证备注
        if (obj.length > 100) {
          _showTip(this.$t('pifa_remark_length_msg'));
          return false;
        }
      }
      return true;
    },
    toReturnMyApp() {
      let busId = this.$route.params.busId;
      this.$router.push("/my/center/" + busId);
    },
    /** 
     * 接受国家地区编号
     */
    changeArea(val){
      this.selectArea = val;
    }
  }
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
.apply-wapper {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .apply-notice {
    font-size: 0;
    width: 100%;
    padding: 20/@dev-Width *1rem 50/@dev-Width *1rem;
    p {
      width: 88%;
      display: inline-block;
      color: #87858f;
    }
    i {
      text-align: center;
      line-height: 78/@dev-Width *1rem;
      display: inline-block;
      width: 80/@dev-Width *1rem;
      height: 80/@dev-Width *1rem;
      font-size: 48/@dev-Width *1rem;
      background: #10aeff;
      .border-radius(100%);
      color: #fff;
      margin-right: 40/@dev-Width *1rem;
      margin-top: 20/@dev-Width *1rem;
      vertical-align: top;
    }
  }
  .apply-main {
    width: 100%;
    padding-left: 25/@dev-Width *1rem;
    .apply-item {
      width: 100%;
      min-height: 120/@dev-Width *1rem;
      .ik-box;
      .ik-box-align(center);
      .apply-title {
        width: 20%;
      }
      .apply-txt {
        width: 80%;
        input,
        textarea {
          width: 100%;
          padding: 15/@dev-Width *1rem 0;
          border: 0;
        }
        .apply-tel {
          width: 50%;
          padding-left: 15/@dev-Width *1rem;
        }
        .apply-tel-button {
          display: inline-block;
          width: 30%;
          margin: 30/@dev-Width *1rem 0;
          text-align: center;
          border-left: 1px solid #e8e8ed;
        }
      }
    }
    .apply-buttom {
      margin-top: 25%;
      height: 148/@dev-Width *1rem;
      padding-right: 25/@dev-Width *1rem;
      p {
        margin-top: 28/@dev-Width *1rem;
        color: #87858f;
      }
    }
  }
}
.table {
  color: #666;
  width: 98%;
  height: 220 / @dev-Width *1rem;
  border: 0;
  outline: 0;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
