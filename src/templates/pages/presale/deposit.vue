<template>
   <div id='app' class="shop-wrapper payMoney-wapper">
        <section class="payMoney-main" v-if="presaleObj != null">
            <div class="fs50 presale-title">订单信息</div>
            <div class="fs40 border presale-title2">预定商品：</div>
             <div class="goodsinfo-box border" @click="toProduct">
              <div class="goodsinfo-img" v-if="productImage != null">
                  <default-img :background="imgUrl+productImage.image_url"
                              :isHeadPortrait="1">
                  </default-img>
              </div>
              <div class="goodsinfo-text">
                  <p class="goodsinfo-name">{{productObj.proName}}</p>
              </div>
          </div>
            <div class="">
                <div class="payMoney-item border" v-if="selectPayWay != null"
                    @click="showDialog">
                    <div class="payMoney-title fs40">
                        支付方式
                    </div>
                    <div class="payMoney-txt fs40 shop-font">
                        {{selectPayWay.wayName}}
                    </div>
                </div>
                <div class="payMoney-item border" v-if="presaleObj.presale != null">
                    <div class="payMoney-title fs40">
                        支付定金
                    </div>
                    <div class="payMoney-txt fs40 shop-font" v-if="presaleObj.presale.depositPercent > 0">
                        ￥{{presaleObj.presale.depositPercent | moneySplit1}}.{{presaleObj.presale.depositPercent | moneySplit2}}
                    </div>
                </div>
                <div class="payMoney-item border" v-if="presaleObj.orderPrice != null && presaleObj.orderPrice > 0">
                    <div class="payMoney-title fs40">
                        订购金额
                    </div>
                    <div class="payMoney-txt fs40 shop-font">
                        ￥{{presaleObj.orderPrice | moneySplit1}}.{{presaleObj.orderPrice | moneySplit2}}
                    </div>
                </div>
            </div>
        </section>
        <section class="presale-button"  v-if="presaleObj != null">
            <div class="payMoney-buttom fs52">
                <div class="shop-max-button shop-bg" style="color: #fff;" @click="submitData">
                    交定金
                </div>
            </div>
        </section>
        <section class="shop-footer-ab shop-footer">
            <div class="shop-logo"></div>
        </section>
        <!-- 支付方式   -->
        <section class="shop-main-no fs40 my-bond" 
        v-if="isShowPayWay">
            <pay-way-dialog :name="title" :dialogList="payWayList" 
            :closeDialog.sync="isShowPayWay"
            @selectDialog="selectDialogChange"
            ></pay-way-dialog>
        </section>
    </div>
</template>

<script>
import payWayDialog from "components/payWayDialog"; //支付方式
import defaultImg from "components/defaultImg";
import filte from "@/lib/filters"; //过滤器
export default {
  name: "myAddress",

  data() {
    return {
      isShow: false,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      proId: this.$route.params.proId, //商品id
      presaleId: this.$route.params.presaleId, //预售id
      invId: this.$route.params.invId, //库存id
      num: this.$route.params.num, //数量
      isAgree: false, //是否同意
      presaleObj: null, //拍卖对象
      productObj: null, //商品对象
      selectPayWay: null, //选择支付方式对象
      payWayList: null, //支付方式集合
      isShowPayWay: false, //是否显示支付方式
      title: "选择支付方式", //支付方式弹出框
      imgUrl: "", //图片域名
      productImage: null //商品图片
    };
  },
  components: {
    payWayDialog,
    defaultImg
  },
  mounted() {
    if (this.agree == 1) {
      this.isAgree = true;
    }
    this.commonFn.setTitle("交保证金报名");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.loadData();
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadData() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        invId: this.invId,
        proId: this.proId,
        presaleId: this.presaleId,
        num: this.num
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.get_presale_deposit,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          console.log(myData, "myData");
          _this.presaleObj = myData;
          if (myData.imagelist != null) {
            _this.productImage = myData.imagelist;
          }
          _this.productObj = myData.product;
          _this.payWayList = myData.payWayList;
          if (_this.selectPayWay == null) {
            _this.selectPayWay = _this.payWayList[0];
          }
        }
      });
    },
    submitData() {
      let _this = this;
      let presaleObj = this.presaleObj;
      let _productObj = this.productObj;
      let _selectPayWay = this.selectPayWay;
      let _commonFn = this.commonFn;
      //提交数据
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        productId: _productObj.id, //商品id
        presaleId: this.presaleId, //拍卖id
        depositMoney: presaleObj.presale.depositPercent, //定金金额 必传
        proName: _productObj.proName, //商品名称
        proImgUrl: this.productImage.image_url, //商品图片
        proSpecificaIds: presaleObj.proSpecificaIds, //商品规格id
        payWay: _selectPayWay.id, //选择的支付方式
        orderMoney: presaleObj.orderPrice, //订购价  预定时价格必传
        proNum: this.num //订购数量
      };
      console.log(_data, "---");
      _this.ajaxRequest({
        url: h5App.activeAPI.add_deposit_post,
        data: _data,
        loading: true,
        success: function(data) {
          //各种跳转
          let reData = data.data;
          let url = reData.payUrl;
          if (_commonFn.isNotNull(url)) {
            location.href = url;
            return;
          }
          if (reData.payWay == 2) {
            let busId = _this.busId;
            //跳转到支付成功页面
            // url = "/auction/success/" + busId;
            // _this.$router.push(url);
            _this.toProduct();
          }
          _this.$store.commit("is_show_loading", false);
        }
      });
    },
    //跳转到商品页面
    toProduct() {
      let proId = this.proId;
      let busId = this.busId;
      let activityId = this.presaleId;
      let shopId = this.productObj.shopId;
      this.$router.push(
        "/goods/details/" +
          shopId +
          "/" +
          busId +
          "/6/" +
          proId +
          "/" +
          activityId
      );
    },
    //显示 弹出框
    showDialog() {
      this.isShowPayWay = true;
    },
    //选中弹出框
    selectDialogChange(data) {
      this.selectPayWay = data[1];
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
.payMoney-wapper {
  width: 100%;
  height: 100%;
  .payMoney-main {
    background: #fff;
    width: 100%;
    padding: 30/@dev-Width *1rem;
    .presale-title {
      text-align: center;
      padding-top: 50/@dev-Width *1rem;
    }
    .presale-title2 {
      padding: 20/@dev-Width *1rem 0;
    }
    .payMoney-item {
      width: 100%;
      height: 100/@dev-Width *1rem;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(justify);
      line-height: 1;
    }
    .goodsinfo-box {
      width: 100%;
      position: relative;
      padding: 23/@dev-Width * 1rem 0 25/@dev-Width * 1rem 30/@dev-Width * 1rem;
      .clearfix;
      .goodsinfo-img {
        float: left;
        width: 265/@dev-Width * 1rem;
        height: 265/@dev-Width * 1rem;
        overflow: hidden;
      }
      .goodsinfo-text {
        float: right;
        width: 70%;
      }
      .goodsinfo-name {
        width: 100%;
        height: 116/@dev-Width * 1rem;
        .fs42;
        margin-bottom: 25/@dev-Width * 1rem;
        em {
          border: 1px solid #e4393c;
          color: #e4393c;
          .fs36;
          padding: 10/@dev-Width * 1rem 20/@dev-Width * 1rem;
          .border-radius(5px);
          line-height: 1;
        }
      }
    }
  }
  .presale-button {
    margin-top: 104/@dev-Width * 1rem;
    .payMoney-buttom {
      margin: 20/@dev-Width *1rem auto 0;
      width: 90%;
      height: 119/@dev-Width *1rem;
    }
  }
}
.el-checkbox__inner {
  input {
    display: block;
    opacity: 0;
    width: 60/@dev-Width *1rem;
    height: 50/@dev-Width *1rem;
    position: absolute;
    z-index: 2;
  }
}
</style>
