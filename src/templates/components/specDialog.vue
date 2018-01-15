<template>
    <div class="spec-dialog-div">
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
<style lang="less" scoped>
.spec-dialog-div {
  .fade {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 99998;
    -moz-opacity: 0.4;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  .attr-lay {
    z-index: 99999;
    position: fixed;
    bottom: 0;
    width: 8.28rem;
    padding-bottom: 0.142313rem;
    background-color: #fff;
  }

  .attr-lay .delete {
    display: inline-block;
    width: 0.25875rem;
    height: 0.25875rem;
    position: absolute;
    right: 0.09315rem;
    top: 0.09315rem;
  }

  .lay-header {
    background-color: #fff;
    height: 1.52145rem;
    position: relative;
    border-bottom: 0.025875rem solid #cbc9c9;
  }

  .lay-header .img-box {
    width: 1.9665rem;
    height: 1.9665rem;
    border: 0.025875rem solid #edeef1;
    border-radius: 0.077625rem;
    background-color: #fff;
    position: absolute;
    left: 0.25875rem;
    top: -0.58995rem;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    display: box;
    box-orient: horizontal;
    box-pack: center;
    box-align: center;
  }

  .img-box img {
    max-width: 100%;
    max-height: 100%;
  }

  .lay-header .header-box {
    position: relative;
    left: 2.561625rem;
    top: 0.621rem;
    width: 5.252625rem;
    font-size: 0.284625rem;
    color: #828282;
  }

  .lay-header .sum {
    color: #f20000;
    font-size: 0.3105rem;
    line-height: 1.6;
  }

  .lay-header .inv-num {
    font-size: 0.232875rem;
  }

  .lay-content {
    padding: 0 0.181125rem;
    background-color: #fff;
    font-size: 0.284625rem;
    color: #828282;
  }

  .lay-content .content-box .title {
    line-height: 1.8;
  }

  .lay-content .inv-list {
    overflow: hidden;
  }

  .lay-content .inv-list .inv-item {
    float: left;
    width: 1.423125rem;
    height: 0.5175rem;
    line-height: 0.5175rem;
    border: 0.025875rem solid #cbcccc;
    margin-right: 0.25875rem;
    margin-bottom: 0.142313rem;
    text-align: center;
    border-radius: 0.077625rem;
  }

  .lay-content .inv-list .inv-item-active {
    border-color: #f23030;
    color: #f23030;
  }

  .lay-bottom {
    text-align: center;
    background-color: #fff;
    padding-top: 0.284625rem;
  }

  em {
    font-style: normal;
  }

  .gw_num {
    border: 0.025875rem solid #828282;
    height: 0.543375rem;
    line-height: 0.543375rem;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0.142313rem;
  }

  .gw_num em {
    display: block;
    height: 100%;
    width: 0.608062rem;
    float: left;
    color: #7a7979;
    text-align: center;
    cursor: pointer;
    font-size: 0.3312rem;
    background-color: #cbc9c9;
  }

  .gw_num .num {
    display: block;
    float: left;
    text-align: center;
    width: 0.67275rem;
    height: 100%;
    font-style: normal;
    font-size: 0.245812rem;
    border: 0;
  }

  .gw_num em.add {
    float: right;
    border-right: 0;
  }

  .shop-btn {
    display: inline-block;
    width: 3.027375rem;
    height: 0.750375rem;
    line-height: 0.750375rem;
    text-align: center;
    font-size: 0.284625rem;
    color: #fff;
    border-radius: 0.077625rem;
    -webkit-border-radius: 0.077625rem;
  }

  .add-shop {
    background-color: #ff8522;
  }

  .now-shop {
    background-color: #f23030;
  }
}
</style>

