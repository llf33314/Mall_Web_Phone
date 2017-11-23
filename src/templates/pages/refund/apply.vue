<template>
    <div class="shop-wrapper refund-wrapper">
        <div class="refund-main comment-main">
            <section class="refund-goods clearfix">
                <div class="goods-img">
                    <default-img :background="imgUrl+returnData.productImageUrl"
                                 :isHeadPortrait="1">
                    </default-img>
                </div>
                <div class="goods-delt">
                    <p class="fs40">{{returnData.productName}}</p>
                    <p class="fs36 shopGray" v-if="returnData.productSpecifica != null">
                      规格：{{returnData.productSpecifica}}
                    </p>
                    <!-- <p class="fs36 shop-font shop-textr" v-if="returnData.returnMoneys != null">
                      退款金额：￥{{returnData.returnMoneys[0]}}.<span class="fs32">{{returnData.returnMoneys[1]}}</span>
                    </p> -->
                </div>
            </section>
            <section class="refund-state">
                <div class="refund-list border" v-if="returnData.isShowCargoStatus == 1 && cargoStatusData!= null"
                  @click="showDialogs(cargoStatusData,cargoStatusList,1,'货物状态')">
                    <p class="fs46">货物状态</p>
                    <p class="shopGray">
                        <span class="fs36">{{cargoStatusData.value}}</span>
                        <i class="iconfont icon-jiantou-copy"></i>
                    </p>
                </div>
                <div class="refund-list" v-if="returnReasonData != null" 
                  @click="showDialogs(returnReasonData,returnReasonList,2,'退款原因')">
                    <p class="fs46">退款原因</p>
                    <p class="shopGray">
                        <span class="fs36">{{returnReasonData.item_value}}</span>
                        <i class="iconfont icon-jiantou-copy"></i>
                    </p>
                </div>
            </section>
            <section class="refund-money">
                <div class="refund-list border" v-if="returnData.returnMoneys != null">
                    <p class="fs46">
                      退款金额：<span class="shop-font">￥{{returnData.returnMoneys[0]}}.<span class="fs32">{{returnData.returnMoneys[1]}}</span></span>
                    </p>
                </div>
                <div class="refund-list" v-if="isShowFreightMoney">
                    <p class="fs40">最多可退￥{{returnData.returnPrice[0]}}.{{returnData.returnPrice[1]}}
                     <span v-if="returnData.productFreight > 0">含，发货运费￥{{returnData.productFreight}}</span>
                    </p>
                </div>
            </section>
            <section class="refund-state">
               <div class="refund-list">
                    <div class="fs46">手机号码：</div>
                    <div class="refund-textarea">
                      <input class="v-input fs46" placeholder="必填" v-model="returnTelphone" 
                        @blur="blurPhone"/>
                    </div>
                </div>
            </section>
            <section class="refund-state " >
               <div class=" refund-list3" >
                    <div class="fs46">退款说明：</div>
                    <div class="refund-textarea">
                       <textarea class="table fs46"  placeholder="选填" v-model="returnRemark"
                        @blur="blurRemark"></textarea>
                    </div>
                </div>
            </section>
            <section class="refund-photo comment-content">
                <p class="fs42">上传凭证：</p>
                <div class="refund-box comment-photo border clearfix"
                     style="padding:0;">
                    <div class="comment-img"  v-if="imageArr != null" v-for="(image , index) in imageArr" >
                         <default-img :background="imgUrl+image"
                                 :isHeadPortrait="1">
                        </default-img>
                        <i class="iconfont icon-guanbi" @click="removeImages(index)"></i>
                    </div>
                    <div class="comment-upload" v-if="imageArr != null && imageArr.length < 3">
                      <img-upload :imgURL="imageArr" @returnUrl="returnUrl"></img-upload>
                    </div>
                </div>
            </section>
             <technical-support v-if="$store.state.isAdvert == 1" ></technical-support>
            <div class="shop-footer-fixed comment-footer1">
                <div class="shop-max-button fs52 shop-bg" @click="submitData">
                    提 交
                </div>
            </div>
        </div>
        <dialog-show v-if=" isShowDialog"  
          :selectData="selectDialogData"
          :dialogList="selectDialogList"
          :dialogType="selectType"
          :dialogTitle="selectTitle"
          @selectEvent="selectDialogs"
          @closeDialog="closeDialogs"></dialog-show>

    </div>
</template>

<script>
import axios from "axios";
import defaultImg from "components/defaultImg";
import imgUpload from "components/imgUpload";
import dialogShow from "./component/selectDialog";
import technicalSupport from "components/technicalSupport"; //技术支持
export default {
  data() {
    return {
      isShow: false,
      background: "",
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      orderDetailId: this.$route.params.orderDetailId, //订单详情id
      returnType: this.$route.params.returnType, //退款方式
      returnId: this.$route.params.returnId, //退款id
      returnData: {}, //查询退款信息返回的数据
      cargoStatusList: [], //货物状态
      cargoStatusData: {}, //获取状态对象
      returnReasonList: [], //退款原因
      returnReasonData: {}, //退款原因对象
      returnImageUrls: [], //退款图片
      isShowFreightMoney: false, //是否显示运费
      imgUrl: "", //图片域名
      returnRemark: "", //退款说明
      returnTelphone: "", //退款手机号
      imageArr: [], //上传图片的集合
      isShowDialog: false, //是否显示退款原因弹出框
      isShowCargo: false, //是否显示货物状态
      submitReturnUrl: "", //提交数据后调回页面
      selectDialogData: {}, //弹出框选中的对象
      selectDialogList: [], //弹出框集合
      selectType: 1, //弹出框类型
      selectTitle: "" //弹出框标题
    };
  },
  components: {
    defaultImg,
    imgUpload,
    dialogShow,
    technicalSupport
  },
  mounted() {
    this.commonFn.setTitle(Language.title_return_apply_msg);//退款申请
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
        browerType: _this.$store.state.browerType, //浏览器类型
        orderDetailId: _this.orderDetailId, //订单详情
        returnId: _this.returnId //退款id
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.return_post,
        data: _data,
        success: function(data) {
          _this.imgUrl = data.imgUrl; //图片域名
          _this.returnData = data.data; //返回数据
          let myData = _this.returnData;
          if (myData.returnPrice > 0) {
            _this.isShowFreightMoney = true;
          }
          myData.returnMoneys = _this.commonFn.moneySplit(myData.returnPrice);
          if (myData.cargoStatusList != null) {
            _this.cargoStatusList = myData.cargoStatusList; //货物状态集合
          }
          if (myData.returnReasonList != null) {
            _this.returnReasonList = myData.returnReasonList; //退款原因
            _this.returnReasonList.forEach((element, index) => {
              element.id = element.item_key;
              element.value = element.item_value;
            });
          }
          if (_this.returnReasonList.length > 0) {
            //给默认的退款原因赋值
            _this.returnReasonData = _this.returnReasonList[0];
            if (myData.retReasonId != null && myData.retReasonId > 0) {
              _this.returnReasonList.forEach((item, index) => {
                if (item.id == myData.retReasonId) {
                  _this.returnReasonData = item;
                }
              });
            }
          }
          if (_this.cargoStatusList.length > 0) {
            //给默认的货物状态赋值
            _this.cargoStatusData = _this.cargoStatusList[0];
            if (myData.cargoStatus != null && myData.cargoStatus >= 0) {
              _this.cargoStatusList.forEach((item, index) => {
                if (item.id == myData.cargoStatus) {
                  _this.cargoStatusData = item;
                }
              });
            }
          }
          if (myData.retRemark != null) {
            _this.returnRemark = myData.retRemark;
          }
          if (myData.returnPhone != null) {
            _this.returnTelphone = myData.returnPhone;
          }
          if (myData.returnId != null) {
            _this.returnId = myData.returnId;
          }
          if (myData.returnWay != null && myData.returnWay > 0) {
            _this.returnType = myData.returnWay;
          }
          if (
            myData.returnImageUrls != null &&
            myData.returnImageUrls.length > 0
          ) {
            myData.returnImageUrls.forEach((item, index) => {
              _this.$set(_this.imageArr, _this.imageArr.length, item);
            });
          }
        }
      });
    },
    blurPhone() {
      //改变手机号事件
      let flag = this.commonFn.validPhone(this.returnTelphone);
      if (!flag) {
        this.$parent.$refs.bubble.show_tips(Language.telephone_msg);
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
    //组件图片接受
    returnUrl(data) {
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
    showDialogs(data, list, type, title) {
      //显示弹出框
      this.isShowDialog = true;
      this.selectDialogData = data;
      this.selectDialogList = list;
      this.selectType = type;
      this.selectTitle = title;
    },
    selectDialogs(data) {
      if (data[0] == 1) {
        //货物状态
        this.cargoStatusData = data[1];
      } else if (data[0] == 2) {
        //退款原因
        this.returnReasonData = data[1];
      }
      this.isShowDialog = false;
    },
    closeDialogs() {
      //关闭弹出框
      this.isShowDialog = false;
    },
    submitData() {
      let _this = this;
      let data = _this.returnReasonData;
      let returnType = _this.returnType;
      if (data == null || data == null || data.id == "") {
        _this.$parent.$refs.bubble.show_tips("请选择退款原因");
        return;
      }
      if (_this.returnTelphone == null || _this.returnTelphone == "") {
        _this.$parent.$refs.bubble.show_tips(Language.telephone_msg);
      }
      if (!_this.blurPhone()) {
        return;
      }
      if (returnType == null || returnType == 0 || returnType == "") {
        _this.$parent.$refs.bubble.show_tips("请选择处理方式");
      }
      if (!this.blurRemark()) {
        return;
      }
      let _data = {
        busId: _this.busId,
        url: location.href,
        browerType: _this.$store.state.browerType,
        id: _this.returnId,
        orderId: _this.returnData.orderId,
        orderDetailId: _this.orderDetailId,
        shopId: _this.returnData.shopId,
        retHandlingWay: returnType,
        retReasonId: _this.returnReasonData.id,
        retReason: _this.returnReasonData.value,
        retRemark: _this.returnRemark,
        retMoney: _this.returnData.returnPrice,
        retTelephone: _this.returnTelphone
      };
      if (_this.cargoStatusData != null) {
        //货物状态
        _data.cargoStatus = _this.cargoStatusData.id;
      }
      if (_this.imageArr != null) {
        //退款图片
        _data.imagesUrl = _this.imageArr.toString();
      }
      console.log(_data);
      _this.ajaxRequest({
        url: h5App.activeAPI.return_save_post,
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

<style lang="less" scoped>
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
  .refund-list3 {
    height: 250 / @dev-Width *1rem;
    .ik-box-align(stretch);
    padding-top: 20/@dev-Width *1rem;
    padding-bottom: 20/@dev-Width *1rem;
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
  .refund-textarea {
    width: 80%;
    height: auto;
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
    position: fixed;
    width: 100%;
    background: #fff;
    .footer-nav,
    .header-nav {
      .ik-box;
      .footer-itme,
      .header-itme {
        position: relative;
        .ik-box;
        .ik-box-align(center);
        .ik-box-pack(center);
        .ik-box-flex(1);
        .ik-box-orient(vertical);
      }
      a {
        display: block;
        text-align: center;
      }
    }
  }
}
.comment-footer1 {
  .shop-max-button {
    height: 134/@dev-Width *1rem;
    .border-radius(0);
  }
}
.comment-content {
  font-size: 0;
  background: #fff;
  padding: 40/@dev-Width *1rem 0 0;
  width: 100%;
  .comment-textarea {
    width: 92%;
    margin: 0 auto;
    display: block;
    height: 620/@dev-Width *1rem;
    border: 1px solid #ededed;
    background: 0;
    padding: 10/@dev-Width *1rem;
  }
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
        z-index: 1;
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
  .comment-txt {
    width: 100%;
    padding: 0 40/@dev-Width *1rem;
  }
}
.table {
  width: 98%;
  height: 220 / @dev-Width *1rem;
  border: 0;
  outline: 0;
  word-wrap: break-word;
  // border: 1px solid #ddd;
}
.v-input {
  width: 98%;
  height: 100 / @dev-Width *1rem;
  border: 0;
  outline: 0;
  word-wrap: break-word;
}
</style>
