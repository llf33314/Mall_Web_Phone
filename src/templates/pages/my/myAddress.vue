<template>
   <section class="shop-main fs40 my-add">
       <div class="address-div">
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
                        <i class="iconfont icon-xuanzhong" :class="[address.memberDefault == 1?'shop-font':'shop-gray' ] "></i>
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
            <technical-support v-if="$store.state.isAdvert == 1 && !isShowBottom"></technical-support>
            <div class="bottom-div clearfix">
              <technical-support v-if="$store.state.isAdvert == 1 && isShowBottom"></technical-support>
              <div  class="address-add-button fs52 shop-bg" @click="editAddress(0)">
                    <i class="icon-jiaimg iconfont fs60"></i>新增收货地址
                </div>
            </div>
       </div>
    </section>
</template>

<script>
import technicalSupport from "components/technicalSupport"; //技术支持
export default {
  name: "myAddress",

  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      addressArr: [], //地址集合
      isShowBottom: false
    };
  },
  components: {
    technicalSupport
  },
  mounted() {
    this.loadDatas(); //初始化数据
    this.commonFn.setTitle("我的地址");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    /**
     * 删除地址
     */
    deleteItme(e) {
      console.log(1);
      $(e.target)
        .parents(".shop-add-itme")
        .remove();
    },
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
          _this.imgUrl = data.imgUrl;
          _this.addressArr = myData;
          if (myData.length < 5) {
            _this.isShowBottom = true;
          }
          console.log(myData, "myData");
        }
      });
    },
    editAddress(id) {
      let busId = this.busId;
      //跳转到编辑地址页面
      this.$router.push("/address/edit/" + busId + "/" + id);
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
          // location.reload();
          let addressBeforeUrl = sessionStorage.getItem("addressBeforeUrl");
          // console.log("addressBeforeUrl", addressBeforeUrl);
          let orderData = _this.$store.state.orderData;
          orderData.memberAddressDTO = obj;
          if (addressBeforeUrl != null) {
            location.href = addressBeforeUrl;
          } else {
            _this.$router.push("/my/center/" + _this.busId);
          }
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
</style>
