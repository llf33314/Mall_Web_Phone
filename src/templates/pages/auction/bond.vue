<template>
   <div id='app' class="shop-wrapper payMoney-wapper">
        <section class="payMoney-main" v-if="auctionObj != null">
            <div class="">
                 <div class="payMoney-item border" v-if="productObj != null">
                    <div class="payMoney-title fs40">
                        拍品名称
                    </div>
                    <div class="payMoney-txt fs40">
                        {{productObj.proName}}
                    </div>
                </div>
                <div class="payMoney-item border" v-if="selectPayWay != null"
                    @click="showDialog">
                    <div class="payMoney-title fs40">
                        支付方式
                    </div>
                    <div class="payMoney-txt fs40">
                        {{selectPayWay.wayName}}
                    </div>
                </div>
                <div class="payMoney-item border">
                    <div class="payMoney-title fs40">
                        应付金额
                    </div>
                    <div class="payMoney-txt fs40">
                        ￥{{auctionObj.aucMargin}}
                    </div>
                </div>
            </div>
            <div class="payMoney-item fs40 ">
                <label class="el-checkbox__inner">
                    <input type="checkbox" v-model="isAgree">
                    <span></span> 已阅读
                </label>
                <a class="shopBlue" @click="xieyi">《用户竞拍服务协议》</a>
            </div>
            <div class="payMoney-buttom fs52">
                <div class="shop-max-button shop-bg" style="color: #fff;">
                    交保证金
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
export default {
  name: "myAddress",

  data() {
    return {
      isShow: false,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      proId: this.$route.params.proId,
      aucId: this.$route.params.aucId,
      invId: this.$route.params.invId,
      agree: this.$route.params.agree,
      isAgree: false, //是否同意
      auctionObj: null, //拍卖对象
      productObj: null, //商品对象
      selectPayWay: null, //选择支付方式对象
      payWayList: null, //支付方式集合
      isShowPayWay: false, //是否显示支付方式
      title: "选择支付方式"
    };
  },
  components: {
    payWayDialog
  },
  mounted() {
    if (this.agree == 1) {
      this.isAgree = true;
    }
    this.commonFn.setTitle("交保证金报名");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    // this.loadData();
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
        auctionId: this.aucId
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.get_margin_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          console.log(myData, "myData");
          _this.auctionObj = myData;
          _this.productObj = myData.product;
          _this.payWayList = myData.payWayList;
          if (_this.selectPayWay == null) {
            _this.selectPayWay = _this.payWayList[0];
          }
        }
      });
    },
    xieyi() {
      let busId = this.busId;
      let aucId = this.aucId;
      let proId = this.proId;
      let invId = this.invId || 0;
      this.$router.push(
        "/auction/agreement/" + busId + "/" + proId + "/" + aucId + "/" + invId
      );
    },
    showDialog() {
      this.isShowPayWay = true;
    },
    selectDialogChange(data) {
      this.selectPayWay = data[1];
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
.payMoney-wapper {
  background: #fff;
  width: 100%;
  height: 100%;
  .payMoney-main {
    width: 100%;
    padding: 30/@dev-Width *1rem;
    .payMoney-item {
      width: 100%;
      height: 124/@dev-Width *1rem;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(justify);
      line-height: 1;
    }
    .payMoney-buttom {
      margin: 20/@dev-Width *1rem auto 0;
      width: 90%;
      height: 158/@dev-Width *1rem;
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
