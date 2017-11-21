<template>
    <div class="shop-wrapper refund-wrapper">
        <div class="refund-main comment-main">
            <section class="refund-state">
                <div class="refund-list" @click="showDialog">
                    <p class="fs46">物流公司</p>
                    <p class="shopGray" >
                        <span class="fs36" v-if="selectDialogData != null && selectDialogData.value != null">{{selectDialogData.value}}</span>
                        <span class="fs36" v-else>请选择物流公司（必选）</span>

                        <i class="iconfont icon-jiantou-copy"></i>
                    </p>
                </div>
            </section>
            <section class="refund-money">
                <div class="refund-list border">
                    <p class="fs46">物流单号：</p>
                    <input placeholder="请输入物流单号(必填)" class="fs46 refund-input" v-model="wuliuNo" @blur="blurWuLiuNo">
                </div>
            </section>
            <section class="refund-money">
                <div class="refund-list border">
                    <p class="fs46">联系电话：</p>
                    <input placeholder="请输入收件人电话(必填)" class="fs46 refund-input" v-model="returnTelphone" @blur="blurPhone">
                </div>
            </section>
            <section class="refund-money">
                <div class="refund-list3 border">
                    <p class="fs46">退款说明：</p>
                     <textarea class="fs46 refund-input"  placeholder="请输入退货说明（可不填)" v-model="returnRemark"
                        @blur="blurRemark"></textarea>
                </div>
            </section>
            <section class="refund-photo comment-content"
                     style="background:#f0f2f5;padding-top:0;">
                <div class="refund-box comment-photo border clearfix"
                     style="padding:0">
                    <div class="comment-img"  v-if="imageArr != null" v-for="(image , index) in imageArr">
                        <!-- <img src="../../../assets/img/test/test1.jpg"/> -->
                         <default-img :background="imgUrl+image"
                                 :isHeadPortrait="1">
                        </default-img>
                        <i class="iconfont icon-guanbi" @click="removeImages(index)"></i>
                    </div>
                    <div class="comment-upload"  v-if="imageArr != null && imageArr.length < 3">
                        <img-upload :imgURL="imageArr" @returnUrl="returnUrl"></img-upload>
                    </div>
                </div>
            </section>
            <section class="shop-footer-fixed comment-footer1">
              <technical-support v-if="$store.state.isAdvert == 1" ></technical-support>
                <div class="shop-max-button fs52 shop-bg" @click="submitData">
                    提交退货物流申请
                </div>
            </section>
        </div>
         <dialog-show v-if="wuliuList != null && isShowDialog"  
          :selectData="selectDialogData"
          :dialogList="selectDialogList"
          :dialogTitle="selectTitle"
          @selectEvent="selectDialogs"
          @closeDialog="closeDialogs"></dialog-show>
    </div>
</template>
 <script>
import defaultImg from "components/defaultImg";
import imgUpload from "components/imgUpload";
import dialogShow from "./component/selectDialog";
import technicalSupport from "components/technicalSupport"; //技术支持
export default {
  components: {
    defaultImg,
    imgUpload,
    dialogShow,
    technicalSupport
  },
  data() {
    return {
      imgURL: "sss",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      returnId: this.$route.params.returnId,
      isShowDialog: false, //是否显示弹出框
      selectDialogData: {}, //选中弹出框对象
      selectDialogList: [], //弹出框里面的集合
      selectTitle: "选择物流公司", //弹出框标题
      imageArr: [], //上传图片集合
      submitReturnUrl: "", //提交数据后调回页面
      wuliuList: [], //物流集合
      returnRemark: "", //退款说明
      returnTelphone: "", //联系电话
      wuliuNo: "" //物流单号
    };
  },
  mounted() {
    this.commonFn.setTitle("填写退货物流信息");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.submitReturnUrl = sessionStorage.getItem("refundReturnUrl");
    if (this.submitReturnUrl != null && this.submitReturnUrl != "") {
      let obj = this.submitReturnUrl.split("#");
      if (obj != null && obj.length > 1) {
        this.submitReturnUrl = obj[1];
      }
    } else {
      this.submitReturnUrl = "/order/list/" + this.busId + "/0";
    }
    this.loadDatas(); //初始化申请退款数据
    this.getWuLiuList(); //获取物流公司
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    showDialog() {
      //显示弹出框
      this.isShowDialog = true;
    },
    selectDialogs(data) {
      //选中弹出框内容事件
      this.selectDialogData = data[1];
      this.isShowDialog = false;
    },
    closeDialogs(data) {
      //关闭弹出框时间
      this.isShowDialog = false;
    },
    returnUrl(data) {
      //组件图片接受
      let _this = this;
      if (_this.imageArr != null && data != null) {
        data.forEach((item, index) => {
          //重新给图片集合赋值
          _this.$set(_this.imageArr, _this.imageArr.length, item);
        });
      } else if (data != null) {
        _this.imageArr = data;
      }
    },
    removeImages(index) {
      //删除图片
      this.imageArr.splice(index, 1);
    },
    blurPhone() {
      //改变手机号事件
      let flag = this.commonFn.validPhone(this.returnTelphone);
      if (!flag) {
        this.$parent.$refs.bubble.show_tips("请填写正确的手机号码");
      }
      return flag;
    },
    blurRemark() {
      //验证退款说明
      let remark = this.returnRemark;
      if (remark.length > 200) {
        this.$parent.$refs.bubble.show_tips("退款说明不能超过200个字");
        return false;
      }
      return true;
    },
    blurWuLiuNo() {
      //验证物流单号
      let no = this.wuliuNo;
      if (no == null || no == "") {
        this.$parent.$refs.bubble.show_tips("请填写正确的物流单号");
        return false;
      } else if (!this.commonFn.validateWuliuNo(no)) {
        this.$parent.$refs.bubble.show_tips("请填写正确的物流单号");
        return false;
      }
      return true;
    },
    getWuLiuList() {
      //获取物流集合集合
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.return_logistics_post,
        data: _data,
        success: function(data) {
          _this.selectDialogList = data.data;
          _this.selectDialogList.forEach((item, index) => {
            item.id = item.item_key;
            item.value = item.item_value;
          });
        }
      });
    },
    loadDatas() {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        orderDetailId: _this.orderDetailId, //订单详情
        returnId: _this.returnId //退款id
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.return_logistics_detail_post,
        data: _data,
        success: function(data) {
          _this.imgUrl = data.imgUrl; //图片域名
          let returnData = data.data; //返回数据
          _this.wuliuNo = returnData.wlNo; //物流单号
          _this.returnTelphone = returnData.wlTelephone; //物流手机号码
          _this.returnRemark = returnData.wlRemark; //物流说明
          if (
            returnData.wlImagesUrl != null &&
            returnData.wlImagesUrl.length > 0
          ) {
            returnData.wlImagesUrl.forEach((item, Index) => {
              _this.$set(_this.imageArr, _this.imageArr.length, item);
            });
          }
          //物流公司
          if (returnData.wlCompanyId != null && returnData.wlCompany != null) {
            _this.selectDialogData = {
              id: returnData.wlCompanyId,
              value: returnData.wlCompany
            };
          }
        }
      });
    },
    submitData() {
      //提交退款信息
      let _this = this;
      let data = _this.selectDialogData;
      if (data == null || data.id == null || data.id == "") {
        _this.$parent.$refs.bubble.show_tips("请选择物流公司");
        return false;
      } else if (
        !_this.blurWuLiuNo() ||
        !_this.blurPhone() ||
        !_this.blurRemark()
      ) {
        return false;
      }
      let _data = {
        busId: _this.busId,
        url: location.href,
        browerType: _this.$store.state.browerType,
        id: _this.returnId,
        wlCompanyId: _this.selectDialogData.id,
        wlCompany: _this.selectDialogData.value,
        wlNo: _this.wuliuNo,
        wlTelephone: _this.returnTelphone,
        wlRemark: _this.returnRemark
      };
      if (_this.imageArr != null) {
        //退款图片
        _data.wlImagesUrl = _this.imageArr.toString();
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.return_logistics_save_post,
        data: _data,
        success: function(data) {
          if (_this.submitReturnUrl == null || _this.submitReturnUrl == "") {
            _this.submitReturnUrl = "/order/list/" + this.busId + "/0";
          }
          _this.$router.push(_this.submitReturnUrl);
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";

.refund-wrapper {
  width: 100%;
  .refund-main {
    position: relative;
    width: 100%;
    padding-bottom: 165 / @dev-Width *1rem;
  }
  section {
    width: 100%;
    background: #fff;
    margin-bottom: 30 / @dev-Width *1rem;
  }
  .technicalSupport {
    background: #f0f2f5;
  }
  .refund-goods {
    padding: 25 / @dev-Width *1rem 15 / @dev-Width *1rem 25 / @dev-Width *1rem 40 / @dev-Width *1rem;
    .goods-img {
      float: left;
      width: 267 / @dev-Width *1rem;
      height: 267 / @dev-Width *1rem;
      background-size: cover;
      background-position: center;
    }
    .goods-delt {
      width: 72%;
      float: left;
      margin-left: 20 / @dev-Width *1rem;
      text-align: justify;
      p {
        margin: 20 / @dev-Width *1rem 0;
      }
    }
  }
  .refund-state {
    width: 100%;
  }
  .refund-list,
  .refund-list2,
  .refund-list3 {
    font-size: 0;
    width: 100%;
    height: 145 / @dev-Width *1rem;
    .ik-box;
    .ik-box-pack(justify);
    .ik-box-align(center);
    padding-left: 50/@dev-Width *1rem;
    padding-right: 40/@dev-Width *1rem;
    i {
      color: #c7c7cc;
      font-size: 42/@dev-Width *1rem;
    }
  }
  .refund-list2 {
    height: 240 / @dev-Width *1rem;
    .list-txt {
      .ik-box;
      .ik-box-pack(justify);
      .ik-box-align(center);
      & > i {
        color: #e4393c;
        font-size: 68 / @dev-Width *1rem;
        margin-right: 20 / @dev-Width *1rem;
      }
    }
  }
  .refund-list3 {
    height: 250 / @dev-Width *1rem;
    .ik-box-align(stretch);
    padding-top: 20/@dev-Width *1rem;
    padding-bottom: 20/@dev-Width *1rem;
  }
  .refund-input {
    width: 80%;
    display: block;
    height: 100%;
    border: 0;
  }
  .refund-money {
    width: 100%;
    & > div:nth-child(2) {
      background: #ededed;
      color: #999;
    }
  }
  .refund-photo {
    width: 100%;
    padding: 47/@dev-Width *1rem;
  }
  .refund-passheader {
    width: 100%;
    height: 380/@dev-Width *1rem;
    padding: 0 60/@dev-Width *1rem;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-orient(vertical);
    background-image: -webkit-gradient(
        linear,
        50% 0,
        0 100%,
        from(transparent),
        color-stop(0.5, transparent),
        color-stop(0.5, #f0f2f5),
        to(#f0f2f5)
      ),
      -webkit-gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(0.5, transparent), color-stop(0.5, #f0f2f5), to(#f0f2f5));
    background-image: -moz-linear-gradient(
        50% 0 -45deg,
        transparent,
        transparent 50%,
        #f0f2f5 50%,
        #f0f2f5
      ),
      -moz-linear-gradient(50% 0 -135deg, transparent, transparent 50%, #f0f2f5
            50%, #f0f2f5);
    background-size: 11px 7px;
    background-repeat: repeat-x;
    background-position: 0 100%;
    .header-title {
      font-weight: bold;
      margin-bottom: 60/@dev-Width *1rem;
      i {
        border: 2px solid #e4393c;
        .border-radius(100%);
        color: #e4393c;
        font-weight: 100;
        padding: 9/@dev-Width *1rem;
        font-size: 48/@dev-Width *1rem;
        margin-right: 20/@dev-Width *1rem;
      }
    }
    & > p {
      width: 100%;
      margin: 5/@dev-Width *1rem 0;
    }
  }
  .shop-footer-fixed {
    margin: 0;
  }
  .refund-dialog {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    .dialog-main {
      width: 100%;
      position: absolute;
      background: #fff;
      bottom: 0;
      animation: dialogShow 0.2s;
      -moz-animation: dialogShow 0.2s;
      /* Firefox */
      -webkit-animation: dialogShow 0.2s;
    }
    .dialog-content {
      width: 100%;
      padding: 35/@dev-Width *1rem 0 88/@dev-Width *1rem 50/@dev-Width *1rem;
    }
    .dialog-title {
      width: 100%;
      text-align: center;
      padding-bottom: 50/@dev-Width *1rem;
    }
    .dialog-ul {
      width: 100%;
      .refund-list {
        height: 117/@dev-Width *1rem;
        padding-left: 0;
      }
      & > div:last-child {
      }
    }
    .dialog-option {
      width: 60/@dev-Width *1rem;
      height: 60/@dev-Width *1rem;
      .border-radius(100%);
      border: 1px solid #c7c7cc;
      text-align: center;
      line-height: 60/@dev-Width *1rem;
      & > i {
        color: #fff;
      }
    }
    .selected {
      border: 0;
      background: #e4393c;
    }
  }
}
.comment-content {
  font-size: 0;
  background: #fff;
  padding: 40/@dev-Width *1rem 0 0;
  width: 100%;
  .comment-photo {
    width: 100%;
    text-align: justify;
    padding: 40/@dev-Width *1rem;
    .comment-upload,
    .comment-img {
      //display: inline-block;
      float: left;
      position: relative;
      width: 22%;
      height: 230/@dev-Width *1rem;
      background-size: cover;
      background-position: center;
      margin-top: 40/@dev-Width *1rem;
      margin-right: 30/@dev-Width *1rem;
      input {
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        top: 0;
        left: 0;
        opacity: 0;
      }
      i {
        z-index: 2;
      }
    }
    .comment-img {
      position: relative;
      i {
        width: 60/@dev-Width *1rem;
        height: 60/@dev-Width *1rem;
        text-align: center;
        line-height: 60/@dev-Width *1rem;
        background: rgba(0, 0, 0, 0.6);
        color: #e0e0e8;
        font-size: 36/@dev-Width *1rem;
        .border-radius(100%);
        position: absolute;
        top: -8%;
        right: -8%;
      }
    }
    .border-img {
      border: 1px solid #ededed;
      width: 26%;
      height: 280/@dev-Width *1rem;
    }
  }
}
// @keyframes dialogShow {
//     from {
//         bottom: -100%;
//     }
//     to {
//         bottom: 0%;
//     }
// }
// @-moz-keyframes dialogShow {
//     /* Firefox */
//     from {
//         bottom: -100%;
//     }
//     to {
//         bottom: 0%;
//     }
// }
// @-webkit-keyframes dialogShow {
//     /* Safari 和 Chrome */
//     from {
//         bottom: -100%;
//     }
//     to {
//         bottom: 0%;
//     }
// }
.comment-footer1 {
  width: 100%;
  .shop-max-button {
    height: 134/@dev-Width *1rem;
    .border-radius(0);
  }
}
</style>
