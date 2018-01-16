<template>
    <div class="spec-dialog-div">
        <!-- <div class="fade" id="fade" v-if="isShow && dialogProduct != null" style="display:block;" @click="closeDialog"></div> -->
        <div class="goods-dialog" 
          v-if="isShow && dialogProduct != null">
          <div class="goods-dialog-main">
              <div class="goods-dialog-title  border">
                  <span class="text-overflow fs42">{{dialogProduct.productName}}</span>
                  <i class="iconfont icon-guanbi fs40" @click="closeDialog"></i>
              </div>
              <div class="goods-dialog-detl border clearfix">
                  <div class="goods-dialog-img" >
                      <default-img :background="imgUrlHttp+dialogProduct.imageObj.imageUrl"
                          :isHeadPortrait="1">
                      </default-img>
                  </div>
                  <div class="goods-dialog-txt">
                      <p class="fs42 style-main-font">
                          <span class="fs32">¥</span>{{dialogProduct.proPrice | moneySplit1}}<span class="fs32">.{{dialogProduct.proPrice | moneySplit2}}</span>
                          <span class="fs36 " v-if="dialogProduct.hyPrice"> 会员价 :{{dialogProduct.hyPrice}}</span>
                          <span class="fs36 " v-if="dialogProduct.isShowCommission == 1 && dialogProduct.commissionMoney > 0 && dialogProduct.commissionMoney > 0"> 佣金 :{{dialogProduct.commissionMoney}}</span>
                      </p>
                      <p class="fs36 shopGray" >库存：{{dialogProduct.invStock || dialogProduct.proStockTotal}}</p>
                      <p class="fs36 shopGray" v-if="dialogProduct.proCode">商品编号：{{dialogProduct.proCode}}</p>
                      <p class="fs36 shopGray" v-if="dialogProduct.maxBuyNum">限购数量：{{dialogProduct.maxBuyNum}}</p>
                  </div>
              </div>
              <!---选择规格---->
              <div class="goods-dialog-choice">
                      <div class="goods-choice-list clearfix" v-for="(item,sIndex) in specificaList" :key="sIndex">
                      <div class="goods-choice-title fs36">{{item.specName}}
                      </div>
                      <div class="goods-choice-box js-specValue">
                          <div >
                              <em class="fs40 em-choice " v-for="(spec,cIndex) in item.specValues" :key="cIndex"
                                   @click="selectSpec(cIndex,sIndex)"
                                  :class="{'shop-bg' : spec.selected }">
                                  {{spec.specValue}}
                              </em>
                          </div>
                      </div>
                  </div>
                  <div class="goods-choice-list clearfix">
                      <div class="goods-choice-title fs36">数量
                      </div>
                      <div class="goods-choice-box2">
                          <em class="em-choice"  @click="diffNum">-</em>
                          <input class="em-choice" v-model="buyNum" @blur="blurNum()"></input>
                          <em class="em-choice"  @click="addNum">+</em>
                      </div>
                  </div>
              </div>
              <div class="goods-dialog-footer">
                  <!--普通购买-->
                  <div class="goods-dialog-button fs52 shop-yellow" @click="addShopCart()" v-if="dialogProduct.proTypeId == 0">
                      加入购物车
                  </div>
                  <div class="goods-dialog-button fs52  shop-bg" @click="product_Buy()">
                      立即购买
                  </div> 
              </div>
          </div>
      </div>
        <div class="attr-lay" >
            <!-- <div class="lay-header">
            <div class="img-box">
                <img :src="imgUrlHttp+dialogProduct.imageObj.imageUrl" id="image_srcs">
            </div>
            <div class="header-box">
                <div class="info">
                <p class="sum">￥<span id="sum-num">{{dialogProduct.proPrice}}</span></p>
                <p class="inv-num">库存<span id="inventory">{{dialogProduct.invStock || dialogProduct.proStockTotal}}</span>件</p>
                </div>
                <div class="gw_num">
                <em class="jian" @click="diffNum">-</em>
                <input type="text" value="1" v-model="buyNum" class="num" @blur="blurNum">
                <em class="add" @click="addNum">+</em>
                </div>
            </div>
            <span class="delete iconfont icon-guanbi" @click="closeDialog"></span>
            </div>
            <div class="lay-content" v-if="specificaList != null">
            <div class='content-box' v-for="(item,sIndex) in specificaList" :key="sIndex">
                <h2 class='title fs36'>{{item.specName}}</h2>
                <ul class='inv-list' v-if="item.specValues != null">
                <li class='inv-item fs40' v-for="(cItem,cIndex) in item.specValues" :key="cIndex"
                :class="{'inv-item-active' : cItem.selected}"
                @click="selectSpec(cIndex,sIndex)"
                >{{cItem.specValue}}</li>
                </ul>
            </div>

            </div>
            <div class="lay-bottom spec_button">
                <div  @click="addShopCart()" class="add-shop shop-btn fs52" v-if="dialogProduct.proTypeId == 0">加入购物车</div>
                <div class="now-shop shop-btn fs52" @click="product_Buy()">立即购买</div>
            </div> -->
        </div>
    </div>
</template>

<script>
import filter from "../../lib/filters"; // 过滤器
import defaultImg from "components/defaultImg";
export default {
  name: "Admin",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    specData: {
      type: Array,
      default: null
    }
  },
  components: {
    defaultImg
  },
  data() {
    return {
      dialogProduct: null,
      imgUrlHttp: null, //图片域名
      specificaList: null, //规格集合
      selectedSpecData: null, //选中的规格对象
      buyNum: 1 //购买数量
    };
  },
  watch: {
    isShow(a, b) {
      console.log(a, "a");
      if (a) {
        this.dialogSpec(this.specData);
      }
    },
    selectedSpecData(a, b) {
      if (a != null) {
        this.dialogProduct.proPrice = a.inv_price;
        this.dialogProduct.invStock = a.inv_num;
        console.log(this.dialogProduct, "this.dialogProduct");
        this.isInvNum();
      }
    }
  },
  mounted() {
    console.log(this.specData, "specData");
    if (this.specData != null) {
      this.dialogSpec(this.specData);
    }
  },
  methods: {
    //关闭弹出框
    closeDialog() {
      this.dialogProduct = null;
      this.specificaList = null;
      this.selectedSpecData = null;
      this.$emit("update:isShow", false);
    },
    //查询规格信息
    dialogSpec(data) {
      console.log("specObj", data);
      var self = this;
      self.dialogProduct = null;
      self.specificaList = null;
      self.selectValueIds = null;
      this.ajaxRequest({
        url: h5App.activeAPI.getSpecificaAndImage_post,
        data: {
          productId: data[0]
        },
        // type: "get",
        success: function(res) {
          let mydata = res.data;
          //   self.isShow = true;
          self.dialogProduct = mydata;
          self.imgUrlHttp = res.imgUrl;
          let selectValueIds = [];
          if (mydata.specificaList != null) {
            mydata.specificaList.forEach((item, index) => {
              for (let cIndex = 0; cIndex < item.specValues.length; cIndex++) {
                let vItem = item.specValues[cIndex];
                if (cIndex == 0) {
                  vItem.selected = true;
                  self.$set(item.specValues, cIndex, vItem);
                  selectValueIds.push(vItem.specValueId);
                  break;
                }
              }
            });

            for (let i = 0; i < mydata.guigePrice.length; i++) {
              let priceObj = mydata.guigePrice[i];
              if (priceObj.xsid == selectValueIds.toString()) {
                self.selectedSpecData = priceObj;
                break;
              }
            }
            // console.log(self.selectedSpecData, "selectValueIds");
            self.specificaList = mydata.specificaList;
          }
        }
      });
    },
    //选择规格
    selectSpec(cIndex, sIndex) {
      let _this = this;
      let valueList = this.specificaList[sIndex].specValues;
      valueList.forEach((item, index) => {
        item.selected = false;
        if (index == cIndex) {
          item.selected = true;
        }
        _this.$set(valueList, index, item);
      });
      this.specificaList[sIndex].specValues = valueList;

      let selectValueIds = [];
      this.specificaList.forEach((item, index) => {
        for (let cIndex = 0; cIndex < item.specValues.length; cIndex++) {
          let vItem = item.specValues[cIndex];
          if (vItem.selected) {
            selectValueIds.push(vItem.specValueId);
            break;
          }
        }
      });
      let guigePriceList = this.dialogProduct.guigePrice;
      for (let i = 0; i < guigePriceList.length; i++) {
        let priceObj = guigePriceList[i];
        if (priceObj.xsid == selectValueIds.toString()) {
          _this.selectedSpecData = priceObj;
          break;
        }
      }
    },
    //加法
    addNum(isAdd) {
      if (!this.isInvNum()) {
        return;
      }
      this.buyNum++;
    },
    //减法
    diffNum() {
      let num = this.buyNum;
      if (num == 1) {
        return;
      }
      this.buyNum--;
    },
    //判断库存是否足够
    isInvNum() {
      let num = this.buyNum * 1;
      let _proObj = this.dialogProduct;
      let totalStockNum = _proObj.invStock || _proObj.proStockTotal;
      let maxNum = _proObj.maxNum || 0;
      if (num > totalStockNum) {
        this.buyNum = totalStockNum;
        return false;
      }
      if (num >= maxNum && maxNum > 0) {
        this.$store.commit("error_msg", "商品限购" + _proObj.maxNum + "件");
        return false;
      }
      return true;
    },
    blurNum() {
      let re = /^[0-9]+$/;
      let _buyNum = this.buyNum;
      if (!re.test(_buyNum)) {
        this.buyNum = 1;
        this.$store.commit("error_msg", "请输入大于0的整数");
        return;
      }
      if (this.isInvNum()) {
        this.buyNum = this.stockNum * 1;
        return;
      }
    },
    //立即购买
    product_Buy() {
      if (!this.isInvNum()) {
        return;
      }
      // let price =
      let _this = this;
      let dialogProduct = this.dialogProduct;
      let _data = {
        productId: dialogProduct.id, //商品id，必传
        busId: dialogProduct.busId, //商家id，必传
        productNum: _this.buyNum, //productNum	商品数量，必传
        price: dialogProduct.proPrice, //商品价格，必传
        type: 0, //查看商品类型，1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品
        activityId: 0
      };
      if (_this.selectedSpecData != null) {
        _data.invId = _this.selectedSpecData.id;
        _data.productSpecificas = _this.selectedSpecData.xsid;
      }
      console.log("_data", _data);
      //   return;

      _this.ajaxRequest({
        url: h5App.activeAPI.liji_buy_post,
        data: _data,
        success: function(data) {
          sessionStorage.setItem("payUrl", location.href);
          //跳转到提交订单的页面
          _this.$router.push("/order/settlement/" + dialogProduct.busId + "/2");
        }
      });
    },
    //加入购物车
    addShopCart() {
      if (!this.isInvNum()) {
        return;
      }
      let _this = this;
      let dialogProduct = this.dialogProduct;
      let ajaxdata = {
        //请求数据
        busId: dialogProduct.busId,
        url: location.href,
        browerType: _this.$store.state.browerType,
        ucLogin: 1, //不需要登陆
        productId: dialogProduct.id,
        productNum: _this.buyNum,
        price: dialogProduct.proPrice
      };
      if (_this.selectedSpecData != null) {
        ajaxdata.productSpecificas = _this.selectedSpecData.xsid;
        ajaxdata.invId = _this.selectedSpecData.id;
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.phoneShopCart_addShopCart_post,
        data: ajaxdata,
        success: function(data) {
          let msg = {
            type: "success",
            msg: "加入购物车成功"
          };
          _this.$store.commit("error_msg", msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
.goods-dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  .goods-dialog-main {
    width: 100%;
    position: absolute;
    background: #fff;
    bottom: 0;
    animation: dialogShow 0.2s;
    -moz-animation: dialogShow 0.2s; /* Firefox */
    -webkit-animation: dialogShow 0.2s;
  }
  .goods-dialog-title {
    font-size: 0;
    width: 100%;
    padding-left: 30/@dev-Width *1rem;
    .ik-box;
    .ik-box-pack(justify);
    .ik-box-align(center);
    div {
      padding: 30/@dev-Width *1rem 0;
      width: 90%;
    }
    i {
      padding: 30/@dev-Width *1rem;
      display: block;
    }
  }
  .goods-dialog-detl {
    padding: 15/@dev-Width *1rem 0;
    padding-left: 30/@dev-Width *1rem;
    width: 100%;
    .goods-dialog-img {
      //border: 1px solid #eee;
      width: 265/@dev-Width *1rem;
      height: 265/@dev-Width *1rem;
      float: left;
      background-size: 100%;
      margin-right: 30/@dev-Width *1rem;
      overflow: hidden;
    }
    .goods-dialog-txt {
      float: left;
      width: 70%;
      padding: 10/@dev-Width *1rem 0;
      p {
        margin-bottom: 10/@dev-Width *1rem;
      }
      .fs42 {
        margin-bottom: 30/@dev-Width *1rem;
      }
    }
  }
  .goods-dialog-choice {
    padding-left: 30/@dev-Width *1rem;
    width: 100%;
    font-size: 0;
    padding-bottom: 20/@dev-Width *1rem;
    .goods-choice-list2 {
      width: 100%;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(justify);
      height: 168 / @dev-Width *1rem;
      span {
        display: inline-block;
        padding: 20/@dev-Width *1rem;
        background: #f3f2f8;
        .border-radius(3px);
        margin-right: 35/@dev-Width *1rem;
      }
    }
    .goods-choice-option1 {
      width: 100%;
      padding-right: 35/@dev-Width *1rem;
      padding-bottom: 35/@dev-Width *1rem;
      .goods-choice-li {
        width: 100%;
        .ik-box;
        .ik-box-align(center);
        .ik-box-pack(justify);
        margin-bottom: 5px;
        div:first-of-type {
          .ik-box-pack(start);
        }
        div {
          min-width: 17.5%;
          .ik-box;
          .ik-box-align(center);
          .ik-box-pack(center);
        }
        .goods-option-number {
          .ik-box-pack(end);
          width: 30%;
        }
        .spec_div {
          max-width: 25%;
        }
      }
    }
    .goods-choice-option2 {
      width: 100%;
      padding-right: 35/@dev-Width *1rem;
      padding-bottom: 35/@dev-Width *1rem;
      .goods-choice-ul {
        width: 100%;
        .ik-box;
        padding-right: 35/@dev-Width *1rem;
        li {
          text-align: center;
        }
        & > li:first-child {
          text-align: left;
        }
        & > li:last-child {
          text-align: right;
        }
      }
      .goods-choice-li {
        .ik-box-flex(1);
      }
    }
    .goods-choice-option2 {
      .goods-choice-li {
        p {
          width: 100%;
          height: 120/@dev-Width *1rem;
          .ik-box;
          .ik-box-align(center);
          .ik-box-pack(center);
        }
      }
      .goods-choice-ul {
        & > li:first-child {
          p {
            .ik-box-pack(start);
          }
        }
        & > li:last-child {
          p {
            .ik-box-pack(end);
          }
        }
      }
      .goods-option-number {
        font-size: 0;
        p {
          font-size: 0;
        }
        em {
          margin-right: 2px;
          font-size: 42/ @dev-Width *1rem;
        }
        & > p > em:first-child,
        & > p > em:last-child {
          font-weight: bold;
          color: #87858f;
        }
      }
    }
    .goods-choice-list {
      width: 100%;
      margin-top: 48 / @dev-Width *1rem;
      .goods-choice-title {
        float: left;
        color: #87858f;
        width: 90/@dev-Width *1rem;
        margin-right: 20/@dev-Width *1rem;
        height: 92 / @dev-Width *1rem;
        .ik-box;
        .ik-box-align(center);
        line-height: 15px;
      }
      .goods-choice-box {
        float: left;
        width: 88%;
        em {
          position: relative;
          margin-bottom: 10/ @dev-Width *1rem;
        }
        i {
          text-align: center;
          display: block;
          position: absolute;
          top: -18/ @dev-Width *1rem;
          right: -18/ @dev-Width *1rem;
          .border-radius(100%);
          width: 50 / @dev-Width *1rem;
          height: 50 / @dev-Width *1rem;
          line-height: 46 / @dev-Width *1rem;
          border: 1px solid #fff;
          background: #ff3b30;
          color: #fff;
        }
      }
    }
  }
  .goods-dialog-footer {
    width: 100%;
    .ik-box;
    .goods-dialog-button {
      .ik-box-flex(1);
      text-align: center;
      color: #fff;
      padding: 40/@dev-Width *1rem 0;
    }
  }
  .goods-choice-box2 {
    em,
    input {
      padding: 0;
      line-height: 90/ @dev-Width *1rem;
      color: #87858f;
      width: 98/ @dev-Width *1rem;
      height: 90/ @dev-Width *1rem;
      text-align: center;
      margin-right: 2px;
      .border-radius(0);
      font-weight: bold;
      font-size: 68/ @dev-Width *1rem;
      vertical-align: top;
    }
    & > em:first-of-type {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    input {
      font-size: 40/ @dev-Width *1rem;
      font-weight: normal;
      color: #333;
      width: 128/ @dev-Width *1rem;
      border: 0;
      margin-right: 2px;
    }
    & > em:last-of-type {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
}
</style>

