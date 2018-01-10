<template>
    <div>
        <div class="fade" id="fade" v-if="isShow && dialogProduct != null" style="display:block;" @click="closeDialog"></div>
        <div class="attr-lay" v-if="isShow && dialogProduct != null">
            <div class="lay-header">
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
                <h2 class='title'>{{item.specName}}</h2>
                <ul class='inv-list' v-if="item.specValues != null">
                <li class='inv-item' v-for="(cItem,cIndex) in item.specValues" :key="cIndex"
                :class="{'inv-item-active' : cItem.selected}"
                @click="selectSpec(cIndex,sIndex)"
                >{{cItem.specValue}}</li>
                </ul>
            </div>

            </div>
            <div class="lay-bottom">
                <a href="javascript:void(0)"  @click="addShopCart()" class="add-shop shop-btn" v-if="dialogProduct.proTypeId == 0">加入购物车</a>
                <a href="javascript:void(0)" class="now-shop shop-btn" @click="product_Buy()">立即购买</a>
            </div>
        </div>
    </div>
</template>

<script>
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
      if (num >= totalStockNum) {
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
