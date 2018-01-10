<template>
   <section class="shop-main fs40 my-add">
       <div class="address-div" :class="{'rose_div':roseColor != null}">
            <div class="shop-add-itme fs36" itmeid="1" v-if="addressArr != null && addressArr.length > 0"
                v-for="address in addressArr">
                <div class="shop-add-txt border clearfix">
                    <div class="add-left">
                        <p>{{address.memberAddress}}</p>
                        <p>{{address.memberName}}<span>{{address.memberPhone}}</span></p>
                    </div>
                    <div class="add-right" >
                        <i class="iconfont icon-jiantou-copy"  @click="editAddress(address.id)"></i>
                    </div>
                </div>
                <div class="shop-add-footer">
                    <div  @click="defaultAddress(address.id,address.memberId,address)">
                        <i class="iconfont icon-xuanzhong" :class="[address.memberDefault == 1?'shop-font':'shop-gray' ] " ></i>
                        设为默认
                    </div>
                    <div class="shop-add-button2">
                        <span @click="editAddress(address.id)">
                            <i class="iconfont icon-bianji"></i>
                            编辑
                        </span>
                        <!-- <span  @click="deleteItme($event)">
                            <i class="iconfont icon-shanchu"></i>
                            删除
                        </span> -->
                    </div>
                </div>
            </div>
            <section class="shop-main-no fs40 my-bond" v-if="isShow">
                <content-no :statu='4' :errorMsg="error"></content-no>
            </section>
            <technical-support v-if="$store.state.isAdvert == 1 && !isShowBottom"></technical-support>
            <div class="bottom-div clearfix">
              <technical-support v-if="$store.state.isAdvert == 1 && isShowBottom"></technical-support>
              <div  class="address-add-button fs52 shop-bg" @click="editAddress(0)" >
                    <i class="icon-jiaimg iconfont fs60"></i>新增收货地址
                </div>
            </div>
       </div>
    </section>
</template>

<script>
import technicalSupport from "components/technicalSupport"; //技术支持
import contentNo from "components/contentNo";
export default {
  name: "myAddress",

  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      integralId: this.$route.params.integralId, //积分id
      addressArr: [], //地址集合
      isShowBottom: false,
      isShow: true,
      bondStatu: 2,
      error: Language.address_null_error_msg,
      integralObj: sessionStorage.getItem("integralData"),
      roseColor: null
    };
  },
  components: {
    technicalSupport,
    contentNo
  },
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle(Language.title_my_address_msg);
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    if (this.commonFn.isNotNull(sessionStorage.getItem("integralData"))) {
      this.integralObj = JSON.parse(sessionStorage.getItem("integralData"));
      this.roseColor = "rose_cla";
    }
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadDatas() {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.address_list_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null || myData.length == 0) {
            _this.isShowBottom = true;
            return;
          }
          _this.imgUrl = data.imgUrl;
          _this.addressArr = myData;
          if (myData.length < 5) {
            _this.isShowBottom = true;
          }
          _this.isShow = false;
          console.log(myData, "myData");
        }
      });
    },
    editAddress(id) {
      let busId = this.busId;
      let url = "/address/edit/" + busId + "/" + id;
      if (this.commonFn.isNotNull(this.integralId)) {
        url += "/" + this.integralId;
      }
      //跳转到编辑地址页面
      this.$router.push(url);
    },
    defaultAddress(id, memberId, obj) {
      //设为默认地址
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        addressId: id,
        upMemberId: memberId
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.default_address_post,
        data: _data,
        success: function(data) {
          let addressBeforeUrl = sessionStorage.getItem("addressBeforeUrl");
          let orderData = _this.$store.state.orderData;
          if (orderData != null) {
            orderData.memberAddressDTO = obj;
          }
          if (_this.integralObj != null) {
            _this.submitIntegralData(id);
            return;
          }
          if (addressBeforeUrl != null) {
            location.href = addressBeforeUrl;
          } else {
            _this.$router.push("/my/center/" + _this.busId);
          }
        }
      });
    },
    submitIntegralData(receiveId) {
      let integralObj = this.integralObj;
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        productId: integralObj.productId, //商品id
        integralId: integralObj.integralId, //积分商品id
        productNum: integralObj.productNum, //购买id
        receiveId: receiveId
      };
      if (integralObj.productSpecificas != null) {
        _data.productSpecificas = integralObj.productSpecificas;
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.record_integral_post,
        loading: true,
        data: _data,
        success: function(data) {
          _this.$store.commit("is_show_loading", false); //关闭loading
          //进入地址列表页面
          sessionStorage.removeItem("addressBeforeUrl");
          sessionStorage.removeItem("integralData");
          _this.$router.push("/integral/record/" + _this.busId);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
.shop-add-itme {
  margin-bottom: 10/@dev-Width *1rem;
}
.address-div {
  padding-bottom: 135 /@dev-Width *1rem;
  .bottom-div {
    position: fixed;
    bottom: 0;
    width: 100%;
    .address-add-button {
      width: 100%;
      height: 135 /@dev-Width *1rem;
      line-height: 135 /@dev-Width *1rem;
      text-align: center;
      .fs60 {
        font-size: 60 /@dev-Width *1rem;
        font-weight: bold;
        margin-right: 20 /@dev-Width *1rem;
      }
    }
  }
  .shop-gray {
    color: #c3c3c3;
  }
}
.rose_div {
  .address-add-button {
    background: #f63855 !important;
  }
  .shop-font {
    color: #f63855 !important;
  }
}
</style>
