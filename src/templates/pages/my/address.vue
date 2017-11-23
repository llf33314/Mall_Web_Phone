<template>
  <div class="shop-wrapper" style="height: 100%;">
        <section class="shop-main fs40 address-main">
            <div class="indexborder clearfix">
                 <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        收件人
                    </div>
                    <div class="shop-fl right">
                        <input placeholder="姓名" class="right-txt" v-model="addressObj.memName"
                        @blur="validateData(1)">
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        联系电话
                    </div>
                    <div class="shop-fl right">
                        <input placeholder="手机号码" class="right-txt" v-model="addressObj.memPhone"
                        @blur="validateData(2)">
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        选择省
                    </div>
                    <div class="shop-fl right">
                        <select class="right-txt province" v-model="addressObj.memProvince" 
                          @change="getAreas(0, 1,true,provinceArr)"
                          v-if="provinceArr != null && provinceArr.length > 0">
                            <option v-for="province in provinceArr" :value="province.id">{{province.city_name}}</option>
                        </select>
                        <select class="right-txt" v-else>
                           <option>{{addressObj.provincename || '请选择省'}}</option>
                         </select>
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        选择市
                    </div>
                    <div class="shop-fl right">
                        <select class="right-txt city" v-model="addressObj.memCity" 
                         @click="getAreas(addressObj.memProvince, 2,false,cityArr)"
                         @change="getAreas(addressObj.memProvince, 2,true,cityArr)"
                         v-if="cityArr != null && cityArr.length > 0">
                          <option  v-for="city in cityArr" :value="city.id">{{city.city_name}}</option>
                        </select>
                         <select class="right-txt" v-else>
                           <option>{{addressObj.cityname || '请选择市'}}</option>
                         </select>
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        选择区
                    </div>
                    <div class="shop-fl right">
                        <select class="right-txt area" v-model="addressObj.memArea"
                         @click="getAreas(addressObj.memCity, 3,false,areaArr)"
                         v-if="areaArr != null && areaArr.length > 0">
                           <option v-for="area in areaArr" :value="area.id">{{area.city_name}}</option>
                        </select>
                        <select class="right-txt" v-else>
                           <option>{{addressObj.areaname || '请选择区'}}</option>
                         </select>
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        详细地址
                    </div>
                    <div class="shop-fl right">
                      <textarea class="right-txt" v-model="addressObj.memAddress"
                        placeholder="详细地址街道等"
                         @blur="validateData(4)" />
                      <span class="address-botton-location shop-font icon-dizhi iconfont " @click="shopMapsAddress(1)">
                      </span>
                    </div>
                </div>
                 <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        门牌号
                    </div>
                    <div class="shop-fl right">
                        <input placeholder="门牌号" class="right-txt" v-model="addressObj.memHouseMember"
                        @blur="validateData(5)">
                    </div>
                </div>
            </div>
        </section>
        <section class="address-button fs52">
            <div class="shop-max-button shop-bg" @click="submitAddress">
               保存 
            </div>
        </section> 
        <section class="shop-footer-ab">
            <div class="shop-logo"></div>
        </section>
        <map-address v-if="isShowMap" :type="mapTypes" :lat="addressObj.memLatitude" :lng="addressObj.memLongitude"
        :memAddress="addressDetail"
        :isShow.sync="isShowMap"
        @confirmMap="confirmMaps"
        ></map-address>
  </div>
</template>

<script>
import mapAddress from "components/mapAddress";
export default {
  name: "address",
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
      id: this.$route.params.id || 0,
      addressObj: {
        memArea: 0,
        memCity: 0
      },
      isShowMap: false, //是否显示地图
      mapTypes: 1, //请求类型 1 请求地图   2 定位
      provinceArr: [
        {
          id: 0,
          city_name: "请选择省"
        }
      ],
      cityArr: [
        {
          id: 0,
          city_name: "请选择市"
        }
      ],
      areaArr: [
        {
          id: 0,
          city_name: "请选择区"
        }
      ],
      addressDetail: ""
    };
  },
  mounted() {
    this.loadDatas(); //初始化数据
    if (this.id > 0) {
      this.commonFn.setTitle("编辑地址");
    } else {
      this.commonFn.setTitle("新增地址");
    }
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  components: {
    mapAddress
  },
  methods: {
    loadDatas() {
      if (this.id == 0) {
        this.getAreas(0, 1, false, this.provinceArr);
        return;
      }
      //初始化地址
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        addressId: this.id
      };

      _this.ajaxRequest({
        url: h5App.activeAPI.address_id_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.addressObj = myData;
          console.log(myData, "myData");
          _this.getAreas(0, 1, false, this.provinceArr);
          _this.getAreas(myData.memProvince, 2, false, this.cityArr);
          _this.getAreas(myData.memCity, 3, false, this.memArea);
        }
      });
    },
    /**
     * 获取地址
     * id 城市父类id
     * type  1请求省份  2 请求城市  3 请求区
     * isChange true 改变下拉框
     * arr 当前下拉框数据
     */
    getAreas(id, type, isChange, arr) {
      let _this = this;
      let addressObj = this.addressObj;
      let _isNull = this.commonFn.isNull;
      let _provinceArr = this.provinceArr;
      let _cityArr = this.cityArr;
      let _areaArr = this.areaArr;
      let _shopTips = _this.$parent.$refs.bubble.show_tips;
      let _data = {
        cityId: id || 0
      };
      //如果不是改变下拉框，且 该下拉框存在数据则返回
      if (arr != null && arr.length > 1 && !isChange) {
        return;
      }
      if ((type == 2 || type == 3) && _isNull(addressObj.memProvince)) {
        _shopTips(Language.province_null_msg);
        return;
      } else if (type == 3 && _isNull(addressObj.memCity)) {
        _shopTips(Language.city_null_msg);
        return;
      }
      if (isChange) {
        addressObj.memLatitude = 0;
        addressObj.memLongitude = 0;
        addressObj.memAddress = null;
        //已选择
        if (type == 1 && _this.cityArr.length <= 1) {
          _this.getAreas(addressObj.memProvince, 2, false, _cityArr);
          return;
        } else if (type == 2 && _this.areaArr.length <= 1) {
          _this.getAreas(addressObj.memCity, 3, false, _areaArr);
          return;
        }
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.address_city_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (_isNull(myData)) {
            return;
          }
          let defaultObj = {
            id: 0
          };
          if (type == 1) {
            defaultObj.city_name = "请选择省";
            myData = [defaultObj].concat(myData);
            //给省份赋值
            _this.provinceArr = myData;
            if (_isNull(addressObj.memProvince)) {
              addressObj.memProvince = 0;
            }
            //更新城市集合(只有在改变下拉框才清空)
            if (isChange) {
              addressObj.memCity = 0; //清空默认选中的城市
              addressObj.memArea = 0;
              _this.cityArr = null;
              _this.getAreas(addressObj.memProvince, 2, false, null);
            }
          } else if (type == 2) {
            defaultObj.city_name = "请选择市";
            myData = [defaultObj].concat(myData);
            _this.cityArr = myData;
            if (_isNull(addressObj.memCity)) {
              addressObj.memCity = 0;
            }
            //更新区域集合(只有在改变下拉框才清空)
            if (isChange) {
              addressObj.memArea = 0;
              _this.areaArr = null;
              _this.getAreas(addressObj.memCity, 3, false, null);
            }
          } else if (type == 3) {
            defaultObj.city_name = "请选择区";
            myData = [defaultObj].concat(myData);
            //给区域赋值
            _this.areaArr = myData;
            if (_isNull(addressObj.memArea)) {
              addressObj.memArea = 0;
            }
          }
          console.log(_this.addressObj, "addressObj");
        }
      });
    },
    shopMapsAddress(mapTypes) {
      if (!this.validateData(3)) {
        return false;
      }
      this.mapTypes = mapTypes;
      let province = $(".province option:selected").text();
      let city = $(".city option:selected").text();
      let area = $(".area option:selected").text();
      let address = this.addressObj;
      this.addressDetail = province + city + area + address.memAddress;
      this.isShowMap = true;
    },
    confirmMaps(data) {
      //确认地图
      let type = data[0];
      let returnData = data[1];
      let addressObj = this.addressObj;
      if (type == 1) {
        addressObj.memLatitude = returnData.latlng.lat;
        addressObj.memLongitude = returnData.latlng.lng;
        addressObj.memAddress = returnData.poiname;
      } else if (type == 2) {
        addressObj.memLatitude = returnData.location.lat;
        addressObj.memLongitude = returnData.location.lng;
      }
      this.submitAddress();
    },
    validateData(type) {
      let _this = this;
      let _commonFn = this.commonFn;
      let _isNull = _commonFn.isNull;
      let _shopTips = _this.$parent.$refs.bubble.show_tips;
      let addressObj = this.addressObj;
      if (type == 1) {
        //验证收件人
        let obj = addressObj.memName;
        if (_isNull(obj)) {
          _shopTips(Language.address_name_null_msg);
          return false;
        } else if (obj.length > 25) {
          _shopTips(Language.address_name_length_msg);
          return false;
        }
      } else if (type == 2) {
        let obj = addressObj.memPhone;
        //验证手机号码
        if (_isNull(obj) || !_commonFn.validPhone(obj)) {
          _shopTips(Language.telephone_msg);
          return false;
        }
      } else if (type == 3) {
        //验证省市区
        if (
          _isNull(addressObj.memProvince) ||
          _isNull(addressObj.memCity) ||
          _isNull(addressObj.memArea)
        ) {
          _shopTips(Language.areas_null_msg);
          return false;
        }
      } else if (type == 4) {
        //验证详细地址
        if (_isNull(addressObj.memAddress)) {
          _shopTips(Language.address_null_msg);
          return false;
        }
      } else if (type == 5) {
        //验证门牌号码
        if (addressObj.memHouseMember.length > 15) {
          _shopTips(Language.address_code_length_msg);
          return false;
        }
      }
      return true;
    },
    submitAddress() {
      let vali = this.validateData;
      let address = this.addressObj;
      let _this = this;
      let _isNotNull = this.commonFn.isNotNull;
      if (!vali(1) || !vali(2) || !vali(3) || !vali(4) || !vali(5)) {
        return false;
      }
      if (address.memLongitude == 0 || address.memLatitude == 0) {
        this.shopMapsAddress(2);
        return false;
      }

      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        addressId: this.id,
        memName: address.memName,
        memPhone: address.memPhone,
        memAddress: address.memAddress,
        memLongitude: address.memLongitude,
        memLatitude: address.memLatitude,
        memProvince: address.memProvince,
        memCity: address.memCity,
        memArea: address.memArea,
        memDefault: address.memDefault || 2,
        memHouseMember: address.memHouseMember || ""
      };
      if (_isNotNull(this.id)) {
        _data.id = this.id;
      }
      console.log("_data", _data);
      // return;

      _this.ajaxRequest({
        url: h5App.activeAPI.save_address_post,
        data: _data,
        success: function(data) {
          history.go(-1);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";

.address-main {
  background: #fff;
  padding-left: 28 / @dev-Width * 1rem;
  .left {
    width: 20%;
  }
  .right {
    width: 80%;
    height: 100%;
    input {
      width: 100%;
      height: 98%;
      border: 0;
      color: #666;
    }
    select {
      width: 100%;
      height: 98%;
      border: 0;
      color: #666;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background: url("../../../assets/img/icon/left.png") no-repeat scroll 96%
        center transparent;
      padding-right: 14px;
      background-size: 8%;
    }
    select::-ms-expand {
      display: none;
    }
    .table {
      color: #666;
      width: 98%;
      max-height: 200%;
      border: 0;
      outline: 0;
      word-wrap: break-word;
      overflow-x: hidden;
      overflow-y: auto;
    }
    textarea {
      border: 0;
      width: 85%;
      height: 150/@dev-Width *1rem;
      display: inline-block;
      vertical-align: top;
    }
    .address-botton-location {
      display: inline-block;
      width: 10%;
      height: 150/@dev-Width *1rem;
      line-height: 150/@dev-Width *1rem;
      text-align: center;
      // border-left: 1px solid #e8e8ed;
      vertical-align: top;
      font-size: 52/@dev-Width *1rem;
    }
  }
}
.address-button {
  height: 140/ @dev-Width * 1rem;
  margin: 20% auto 0;
  width: 90%;
}
.address-list {
  width: 100%;
  .left {
    line-height: 3.5em;
  }
  .right {
    .right-txt {
      padding: 40/ @dev-Width * 1rem 0 35/ @dev-Width * 1rem 0;
    }
  }
}
</style>
