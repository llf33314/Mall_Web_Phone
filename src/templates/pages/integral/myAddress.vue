<template>
   <section class="shop-main fs40 my-add">
       <div class="address-div-2" :class="{'rose_div':roseColor != null}">
            <div class="shop-add-itme-1 fs36" itmeid="1" v-if="addressArr != null && addressArr.length > 0"
                v-for="(address,index) in addressArr" :key="index">
                <div class="shop-add-txt border clearfix shop-box-center">
                    <div class="i-add-left"  @click="defaultAddress(address.memberId,address,index)">
                      <i class="iconfont icon-yes fs52" :class="[address.memberDefault == 1?'shop-pink':'shop-gray' ] "></i>
                    </div>
                    <div class="i-add-right fs36">
                      <div class="f_p ">{{address.memberAddress}}</div>
                      <div class="shop-box-center ad-bottom">
                        <div><span>{{address.memberName}}</span><span>{{address.memberPhone}}</span></div>
                        <div >
                          <span @click="editAddress(address.id)">
                            <i class="iconfont icon-bianji"></i>
                            编辑
                          </span>
                          <span  @click="deleteItme($event)">
                              <i class="iconfont icon-shanchu"></i>
                              删除
                          </span>
                        </div>
                      </div>
                        
                    </div>
                </div>
            </div>
            <div class="add-address-div" @click="editAddress(0)">
              <i class="iconfont icon-jiaimg fs52"></i><span class="fs36">新增收货地址</span>
            </div>
            <section class="shop-main-no fs40 my-bond" v-if="isShow">
                <content-no :statu='4' :errorMsg="error"></content-no>
            </section>
            <div class="bottom-div clearfix">
              <div  class="address-add-button fs52"  @click="submitIntegralData">
                立即兑换
              </div>
            </div>
       </div>
    </section>
</template>

<script>
export default {
  name: "myAddress",

  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      integralId: this.$route.params.integralId || 0, //积分id
      addressArr: [], //地址集合
      isShowBottom: false,
      isShow: true,
      bondStatu: 2,
      error: this.$t("address_null_error_msg"),
      integralObj: sessionStorage.getItem("integralData") || null,
      roseColor: null
    };
  },
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle(this.$t("title.title_my_address_msg"));
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
    defaultAddress(memberId, obj, index) {
      //设为默认地址
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        addressId: obj.id,
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
          _this.addressArr.forEach((item, iIndex) => {
            if (item.id == obj.id) {
              item.memberDefault = 1;
            } else {
              item.memberDefault = 0;
            }
            _this.$set(_this.addressArr, iIndex, item);
          });
        }
      });
    },
    submitIntegralData() {
      let integralObj = this.integralObj;
      if (integralObj == null) {
        return;
      }
      let receiveId = 0;
      for (var index = 0; index < this.addressArr.length; index++) {
        var item = this.addressArr[index];
        if (item.memberDefault == 1) {
          receiveId = item.id;
          break;
        }
      }
      if (receiveId == 0) {
        this.$parent.$refs.bubble.show_tips("请选择您的收货地址");
        return;
      }
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
          // sessionStorage.removeItem("addressBeforeUrl");
          // sessionStorage.removeItem("integralData");
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
.shop-main {
  background: #fff;
  height: 100%;
  .shop-add-itme-1 {
    height: 250/@dev-Width *1rem;
    padding: 50/@dev-Width *1rem 19/@dev-Width *1rem 55/@dev-Width *1rem 76/@dev-Width *1rem;

    .i-add-left {
      width: 4%;
      text-align: right;
      .shop-pink {
        color: #f63854;
      }
      .shop-gray {
        color: #c3c3c3;
      }
    }
    .i-add-right {
      width: 90%;
      .f_p {
        max-height: 67/@dev-Width *1rem;
        width: 100%;
        padding-bottom: 10/@dev-Width *1rem;
        .text-overflow;
      }
      .ad-bottom div:first-child {
        width: 68%;
        span:first-child {
          display: inline-block;
          margin-right: 40/@dev-Width *1rem;
          max-width: 50%;
          .text-overflow;
        }
      }
      .ad-bottom div:last-child {
        width: 32%;
        span:first-child {
          margin-right: 58/@dev-Width *1rem;
        }
      }
    }
  }
}
.shop-add-itme {
  margin-bottom: 10/@dev-Width *1rem;
}
.address-div-2 {
  padding-bottom: 135 /@dev-Width *1rem;
  .bottom-div {
    position: fixed;
    bottom: 160/@dev-Width *1rem;
    width: 100%;
    padding: 0 50/@dev-Width *1rem;
    .address-add-button {
      width: 100%;
      height: 146 /@dev-Width *1rem;
      line-height: 146 /@dev-Width *1rem;
      text-align: center;
      .border-radius(5px);
      .fs52 {
        font-size: 52 /@dev-Width *1rem;
        font-weight: bold;
        margin-right: 20 /@dev-Width *1rem;
      }
    }
  }
  .add-address-div {
    height: 132 /@dev-Width *1rem;
    line-height: 132/@dev-Width *1rem;
    padding-left: 76/@dev-Width *1rem;
    i {
      color: #c7c7cc;
      margin-right: 27/@dev-Width *1rem;
      font-weight: bolder;
    }
    span {
      color: #333333;
    }
  }
}
.rose_div {
  .address-add-button {
    background: #f63854;
    color: #fff;
  }
  .shop-font {
    color: #f63855 !important;
  }
}
</style>
