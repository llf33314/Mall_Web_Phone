<template>
  <div id='app' class="shop-wrapper integral-wrapper" >
    <section class="section-content">
       <div class="bg-back icon-yuanq iconfont icon-jiantou-copy1" @click="back"></div>
      <div class="integral-banner" v-if="imageList != null && imageList.length > 0">
        <banner :banner="imageList" :imgUrl="imgUrl"></banner>
      </div>
      <div class="integral-title" v-if="product != null">
        <div class="title-1">{{product.proName }}</div>
        <div class="title-2" v-if="integral != null">
          <p>{{integral.money}} 积分</p>
          <p><span>{{recordNum}}</span>人兑换</p>
        </div>
      </div>
      <div class="guige-div">
        <div class="guige-title">
          <p>规格</p>
          <p class="iconfont icon-jiantou" @click="isShowSpec ? isShowSpec = false: isShowSpec = true"></p>
        </div>
        <div class="guige-item" v-if="specificaList != null"
         v-for="(specifica,index) in specificaList" :key="index">
          <div class="name-div fs40">
            <span>{{specifica.specName}}</span>
          </div>
          <div class="right-div" v-if="specifica.specValues != null">
            <span v-for="(value,index2) in specifica.specValues" :key="index2" :class="{'nav':value.select}"
             @click="selectSpecificaValue(value.specValueId,index,index2)">{{value.specValue}}</span>
          </div>
        </div>
        
        <div class="guige-item2" v-show="isShowSpec">
          <div class="name-div fs40">
            <span>数量</span>
          </div>
          <div class="right-div">
            <em class="em-choice" @click="jian">-</em>
            <input type="text" class="em-choice" v-model="buyNum" @blur="blurNum"/>
            <em  class="em-choice" @click="jia">+</em>
          </div>
        </div>
      </div>
      <div class="integral-remark">
        <div class="title">兑换说明</div>
        <div>1、点击【立即兑换】，即可兑换成功；</div>
        <div>2、在【兑换记录】可查询已兑换的物品；</div>
        <div v-if="integral != null">3、兑换时间{{integral.startTime}}至{{integral.endTime}}.</div>
      </div>
      <div class="integral-detail-image" v-if="productDetail != null">
        <div class="title">商品详情</div>
        <div class="integral-detail" v-html="productDetail"></div>
      </div>
    </section>
    <section class="shop-footer-fixed">
      <div class="bottom-bottom" @click="submitData" :class="{'disbled':isDisabledButton}">{{disabledMsg == '' ? "立即兑换" : disabledMsg}}</div>
    </section>
    <section v-show="isShowFlowPhone">
       <dialog-modular :dialogTitle = "'流量充值'">
        <div class="dialog-input-main">
            <div class="dialog-input-box">
                <div class="dialog-input">
                    <input class="fs50" placeholder="请输入手机号码" v-model="flowPhone"/>
                </div>
                <!-- <div class="dialog-input dialog-code">
                    <input class=" fs50" placeholder="请输入验证码"/>
                    <span class="fs50 shopGreen">获取验证码</span>
                </div> -->
            </div>
           <div class="dialog-bottom">
               <span class="fs50 dialog-button" @click="isShowFlowPhone = false">取消 </span>
               <span class="fs50 dialog-button" @click="confirmPhone">确定</span>
            </div>
        </div>
    </dialog-modular>
    </section>
  </div>
</template>

<script>
import banner from "../goods/child/banner";
import dialogModular from "components/dialogModular"; //流量弹出框
export default {
  name: "succeed",
  data() {
    return {
      background: null,
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      productId: this.$route.params.productId,
      shopId: this.$route.params.shopId,
      imgUrl: "", //图片域名
      mydata: null, //返回对象
      product: null, //商品对象
      productDetail: null, //商品详情
      specificaList: null, //规格集合
      integral: null, //积分商品信息
      isMember: 0, //是否是会员 1是
      guige: null, //默认规格
      guigePriceList: null, //规格价集合
      imageList: [{ imageUrl : ""}], //商品图片集合
      recordNum: 0,
      buyNum: 1,
      guigePriceObj: null,
      selectGuigePrice: "",
      isDisabledButton: false, //是否禁用按钮
      disabledMsg: "", //禁用提示
      stockNum: 0, //库存数量
      flowPhone: "", //充值流量
      isShowFlowPhone: false, //是否显示流量弹出框
      isShowSpec: true//是否显示规格
    };
  },
  components: {
    banner,
    dialogModular
  },
  mounted() {
    this.commonFn.setTitle("积分商品详情");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.loadDatas(); //初始化图片数据
    this.detailsAjax();
    //清空session
    // sessionStorage.removeItem("addressBeforeUrl");
    // sessionStorage.removeItem("integralData");
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
        browerType: _this.$store.state.browerType, //浏览器类型
        productId: _this.productId, //商品id
        ucLogin: 1 //不需要登陆
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.integral_product_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.mydata = myData;
          _this.product = myData.product;
          _this.specificaList = myData.specificaList;
          _this.integral = myData.integral;
          _this.isMember = myData.isMember;
          _this.guige = myData.guige;
          _this.guigePriceList = myData.guigePriceList;
          _this.imageList = myData.imageList;
          _this.recordNum = myData.recordNum;
          _this.stockNum = myData.proStockTotal;
          if (_this.specificaList != null) {
            _this.specificaList.forEach((spec, index) => {
              let valueList = spec.specValues;
              if (valueList != null && valueList.length > 0) {
                for (let j = 0; j < valueList.length; j++) {
                  let value = valueList[j];
                  if (j == 0) {
                    value.select = true;
                    break;
                  }
                }
              }
            });
            _this.guigePriceObj = {};
            _this.guigePriceList.forEach((guige, index) => {
              _this.guigePriceObj[guige.xsid] = guige;
            });
            _this.getGuige();
            _this.isDisabledButtons();
          }
          console.log(myData, "myData");
        }
      });
    },
    /**
     * 商品详情请求
     */
    detailsAjax() {
      let _this = this;
      _this.ajaxRequest({
        url: h5App.activeAPI.phoneProduct_getProductDetail_post,
        data: {
          productId: _this.productId
        },
        success: function(data) {
          _this.productDetail = data.data;
        }
      });
    },
    /** 选择规格事件 */
    selectSpecificaValue(valueId, pIndex, cIndex) {
      let _this = this;
      let specificaList = this.specificaList[pIndex];
      if (specificaList == null) {
        return;
      }
      let valueList = specificaList.specValues;
      valueList.forEach((value, index) => {
        value.select = false;
        _this.$set(valueList, index, value);
      });
      valueList[cIndex].select = true;
      _this.$set(valueList, cIndex, valueList[cIndex]);
      _this.getGuige();
    },
    //获取选中规格的对象
    getGuige() {
      let _this = this;
      let specificaList = this.specificaList;
      let selectValueIds = [];
      if (specificaList != null) {
        for (let i = 0; i < specificaList.length; i++) {
          let specifica = specificaList[i];
          let id = 0;
          for (let j = 0; j < specifica.specValues.length; j++) {
            let values = specifica.specValues[j];
            if (values.select) {
              id = values.specValueId;
              break;
            }
          }
          if (id > 0) {
            selectValueIds.push(id);
          }
        }
      }
      if (selectValueIds != null && selectValueIds.length > 0) {
        this.selectGuigePrice = this.guigePriceObj[selectValueIds.toString()];
        _this.stockNum = this.selectGuigePrice.inv_num * 1;
      }
      if (this.buyNum >= this.stockNum) {
        this.buyNum = this.stockNum;
      }
    },
    //减法时间
    jian() {
      let num = this.buyNum;
      if (num == 1) {
        return;
      }
      this.buyNum--;
    },
    //加法
    jia() {
      let num = this.buyNum;
      if (num >= this.stockNum) {
        this.buyNum = this.stockNum;
        return;
      }
      this.buyNum++;
    },
    blurNum() {
      let re = /^[0-9]+$/;
      let _buyNum = this.buyNum;
      if (!re.test(_buyNum)) {
        this.$store.commit("error_msg", "请输入大于0的整数");
        this.buyNum = 1;
        return;
      }
      if (_buyNum >= this.stockNum) {
        this.buyNum = this.stockNum * 1;
        return;
      }
    },
    confirmPhone() {
      let flowPhone = this.flowPhone;
      let _commonfn = this.commonFn;
      let _isNull = _commonfn.isNull;
      if (_isNull(flowPhone) || !_commonfn.validPhone(flowPhone)) {
        this.$store.commit("error_msg", this.$t('flow_phone_msg'));
        return;
      }
      this.submitData();
    },
    //使用禁用按钮
    isDisabledButtons() {
      let mydata = this.mydata;
      let integral = this.integral;
      let isNull = this.commonFn.isNull;
      let member = this.member;
      if (integral.isDelete == 1 || integral.isUse == 0) {
        this.isDisabledButton = true;
        this.disabledMsg = "积分商品已失效或被删除";
        return false;
      }
      if (mydata.isMember != 1) {
        this.isDisabledButton = true;
        this.disabledMsg = "您还不是会员，不能兑换商品";
        return false;
      }
      if (mydata.isNoStart == 1) {
        this.isDisabledButton = true;
        this.disabledMsg = "兑换时间还未开始，请耐心等待";
        return false;
      }
      if (mydata.isEnd == 1) {
        this.isDisabledButton = true;
        this.disabledMsg = "兑换时间已结束，请重新选择商品进行兑换";
        return false;
      }
      if (isNull(mydata.memberId)) {
        this.isDisabledButton = true;
        this.disabledMsg = "还未登陆";
        return false;
      }
      if (
        mydata.memberIntegral <= 0 &&
        mydata.memberIntegral < integral.money
      ) {
        this.isDisabledButton = true;
        this.disabledMsg = "您的积分不足，不能兑换该商品";
        return false;
      }
      if (this.stockNum == 0 || this.stockNum < this.buyNum) {
        this.isDisabledButton = true;
        this.disabledMsg = "库存不够，请重新选择";
        return false;
      }
      this.isDisabledButton = false;
      this.disabledMsg = "";
      return true;
    },
    //提交数据
    submitData() {
      let _this = this;
      let _commonfn = this.commonFn;
      let _isNull = _commonfn.isNull;
      let _showTip = _this.$parent.$refs.bubble.show_tips; //冒泡提醒
      if (!_this.isDisabledButtons()) {
        if (this.disabledMsg != "") {
          _showTip(this.disabledMsg);
        }
        return false;
      }
      let integralId = this.integral.id;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        productId: this.productId, //商品id
        integralId: integralId, //积分商品id
        productNum: this.buyNum //购买id
      };
      if (this.selectGuigePrice != null) {
        _data.productSpecificas = this.selectGuigePrice.xsid;
      }
      let proTypeId = this.product.proTypeId;
      if (proTypeId == 4 && this.flowPhone != "") {
        _data.flowPhone = this.flowPhone;
      }
      if (proTypeId == 4 && (_isNull(_data.flowPhone) || !_commonfn.validPhone(_data.flowPhone))) {
        //弹出充值流量弹出框
        this.isShowFlowPhone = true;
        return false;
      }
      console.log("_data", _data);
      // return;
      _this.ajaxRequest({
        url: h5App.activeAPI.record_integral_post,
        loading: true,
        data: _data,
        success: function(data) {
          _this.$store.commit("is_show_loading", false); //关闭loading
          if (proTypeId == 0) {
            //进入地址列表页面
            sessionStorage.setItem("addressBeforeUrl", location.href);
            delete _data.url;
            delete _data.browerType;
            delete _data.busId;
            sessionStorage.setItem("integralData", JSON.stringify(_data));
            _this.$router.push("/address/" + _this.busId + "/" + integralId);
          } else {
            _this.showDialog(proTypeId, data.data.url);
          }
        }
      });
    },
    showDialog(proTypeId, url) {
      let memberId = this.mydata.memberId;
      console.log(proTypeId, "protypeId3");
      let _this = this;
      let msg = {
        btnNum: 2, //按钮显示个数
        btnTow: "关闭", //按钮文字
        btnOne: proTypeId == 3 ? "查看详情" : "确定", //按钮文字
        dialogTitle: "兑换成功",
        dialogMsg: "恭喜获取" + this.product.proName,
        callback: {
          btnOne: function() {
            if (proTypeId == 3) {
              location.href = url;
            } else {
              _this.$router.push("/integral/record/" + _this.busId);
            }
          } //点击按执行方法
        }
      };
      _this.$parent.$refs.dialog.showDialog(msg); //调用方法
    },
    back() {
      this.$router.push("/integral/index/" + this.busId);
    }
  }
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
@import  (reference) "~assets/css/common.less";
.section-content {
  margin-bottom: 240/@dev-Width *1rem;
  .integral-banner {
    width: 100%;
    background: #fff;
  }
  .icon-yuanq {
    display: block;
    width: 70/@dev-Width *1rem;
    height: 70/@dev-Width *1rem;
    line-height: 70/@dev-Width *1rem;
    border: 0px solid #c9c9c9;
    color: #fff;
    background: #ababab;
    .border-radius(100%);
    .shop-textc;
    position: absolute;
    top: 27/@dev-Width *1rem;
    left: 27/@dev-Width *1rem;
    z-index: 2;
  }
  .integral-title {
    width: 100%;
    height: 198/@dev-Width *1rem;
    padding: 0 30/@dev-Width *1rem;
    background: #fff;
    line-height: 1;
    .title-1 {
      .fs50;
      .text-overflow;
      width: 100%;
      padding: 40/@dev-Width *1rem 0;
    }
    .title-2 {
      .shop-box-justify;
      p:first-child {
        .shop-font;
      }
      p {
        .fs40;
        color: #a9a9a9;
        span {
          color: #000;
        }
      }
    }
  }
  .guige-div {
    background: #fff;
    .guige-title {
      padding: 60/@dev-Width *1rem 30/@dev-Width *1rem;
      .border;
      .shop-box-center;
      p {
        .fs42;
      }
      p:first-child {
        font-weight: bolder;
      }
      .icon-jiantou {
        color: #c7c7cc;
      }
    }
    .guige-item,
    .guige-item2 {
      width: 100%;
      padding: 30/@dev-Width *1rem;
      line-height: 1;
      .clearfix;
      div {
        float: left;
        font-size: 0;
        span,
        em.em-choice {
          .fs40;
          display: inline-block;
          padding: 26/@dev-Width *1rem 34/@dev-Width *1rem;
          margin: 0 *1rem 20/@dev-Width *1rem 0 20/@dev-Width *1rem;
        }
        span.nav {
          .shop-bg;
          .border-radius(3px);
        }
      }
      .name-div {
        color: #87858f;
        width: 20%;
        height: auto;
      }
      .right-div {
        width: 80%;
        em {
          width: 99/@dev-Width *1rem;
          color: #87858f;
          margin: 0 !important;
        }
        input {
          width: 120/@dev-Width *1rem;
          border: 0;
          margin: 0 3/@dev-Width *1rem !important;
          vertical-align: top;
          padding: 0;
        }
        em,
        input {
          height: 90/@dev-Width *1rem;
          text-align: center;
          display: inline-block;
          background: #f3f2f8;
          .border-radius(0);
        }
      }
    }
    .guige-item2 {
      padding-bottom: 40/@dev-Width *1rem;
      .right-div {
        float: right;
        margin-right: 40/@dev-Width *1rem;

        width: 31%;
      }
    }
  }
  .integral-remark {
    padding: 30/@dev-Width *1rem;
    margin: 20/@dev-Width *1rem 0;
    background: #fff;
    div {
      .fs40;
      color: #a9a9a9;
    }
    .title {
      font-weight: bolder;
      color: #000;
      margin-bottom: 30/@dev-Width *1rem;
    }
  }
  .integral-detail-image {
    background: #fff;
    .title {
      font-weight: bolder;
      color: #000;
      margin: 0 0 30/@dev-Width *1rem 30/@dev-Width *1rem;
      .fs40;
      height: 110/@dev-Width *1rem;
      line-height: 110/@dev-Width *1rem;
    }
    .integral-detail {
      overflow-x: auto;
      width: 100% !important;
      .fs40;
    }
    .integral-detail img {
      width: 100% !important;
      height: auto;
    }
  }
}

.shop-footer-fixed {
  width: 100%;
  padding: 47/@dev-Width *1rem 50/@dev-Width *1rem;
  background: rgba(204, 204, 204, 0.68);
  .bottom-bottom {
    .shopRose-bg;
    .fs52;
    color: #fff;
    text-align: center;
    width: 100%;
    height: 146/@dev-Width *1rem;
    line-height: 146/@dev-Width *1rem;
  }
  .disbled {
    background: #666 !important;
  }
}
//流量充值弹出框
.dialog-input-main {
  .dialog-input-box {
    width: 100%;
    font-size: 0;
    padding: 0 80/ @dev-Width *1rem;
    height: 215/ @dev-Width *1rem;
    .border;
    .dialog-input {
      width: 100%;
      padding: 25/ @dev-Width *1rem;
      margin-bottom: 20/ @dev-Width *1rem;
      border: 1px solid #e1e1e3;
      .border-radius(3px);
      input {
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
    .dialog-code {
      input {
        width: 68%;
      }
      span {
        padding: 25/ @dev-Width *1rem 0;
      }
    }
  }
  .dialog-bottom {
    width: 100%;
    font-size: 0;
    display: -webkit-box;
    .dialog-button {
      text-align: center;
      .ik-box;
      .ik-box-flex(1);
      .ik-box-pack(center);
      color: #25ae5f;
      padding: 45/@dev-Width *1rem 0;
    }
    & > span:nth-child(1) {
      color: #000;
    }
    & > span:nth-child(2) {
      border-left: 1px solid #e2e2e2;
    }
  }
}
</style>
