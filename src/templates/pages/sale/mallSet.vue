<template>
    <div class="shop-wrapper sale-wrapper">
        <div class="seller-top ">
            <div class="seller-nav fs48">
                <i class="iconfont icon-jiantou-copy1" @click="back"></i>商城设置
            </div>
            <div class="seller-nav2 ">
                <header-nav :headers="headerArr" :selectId="type" :type.sync="type" :isCanSelect="mallSet.id != null" @isCanSelect="disabledSelect"></header-nav>
            </div>
       </div>
       <div class="seller-content bg-white" v-if="type == 1">
           <div class="set-item border">
               <div class="set-div1">商城名称</div>
               <div class="fs0 set-div2">
                    <input placeholder="请输入商城名称" v-model="mallSet.mallName"
                    @blur="validate(1)"/>
               </div>
           </div>
           <div class="set-item border">
               <div class="set-div1">联系电话</div>
               <div class="fs0 set-div2">
                    <input placeholder="请输入联系电话" v-model="mallSet.contactNumber"
                    @blur="validate(2)"/>
               </div>
           </div>
           <div class="set-item border">
               <div class="set-div1">QQ</div>
               <div class="fs0 set-div2">
                    <input placeholder="请输入QQ号码" v-model="mallSet.qq"
                    @blur="validate(3)"/>
               </div>
           </div>
           <div class="set-item2 border">
               <div class="set-div1">商城头像</div>
               <div class="fs0 set-div2">
                   <div class="update-div" v-if="mallSet.mallHeadPath == null">
                       <img-upload @returnUrl="returnUrl" :styles="2" :index="1"></img-upload>
                   </div>
                   <div class="update-div hideUpload" v-else 
                   :style="{backgroundImage: 'url(' + (imgUrl+mallSet.mallHeadPath) + ')'}">
                       <img-upload @returnUrl="returnUrl" :styles="2" :index="1" style="opacity:0" ></img-upload>
                    </div>
               </div>
           </div>
           <div class="set-item2 border">
               <div class="set-div1">banner</div>
               <div class="fs0 set-div2">
                   <div class="update-div2" v-if="mallSet.bannerPath == null">
                       <img-upload @returnUrl="returnUrl" :styles="2"  :index="2"></img-upload>
                   </div>
                   <div class="update-div2 hideUpload" v-else 
                   :style="{backgroundImage: 'url(' + (imgUrl+mallSet.bannerPath)  + ')'}">
                       <img-upload @returnUrl="returnUrl" :styles="2" :index="2" style="opacity:0"></img-upload>
                    </div>
               </div>
           </div>
           <div class="set-item2">
               <div class="set-div1">商城简介</div>
               <div class="fs0 set-div3">
                    <textarea placeholder="请输入商城简介"  v-model="mallSet.mallIntroducation"
                    @blur="validate(6)"></textarea>
               </div>
           </div>
        </div>
        
        <div class="seller-content "  v-if="type == 2 && mallSet != null">
            <div class="seller-content2">
                <div class="zx-div">
                    <div class="fs40">开启自选</div>
                    <input class="switch small-switch shop-switch fs46" type="checkbox" value="1" v-model="mallSet.isOpenOptional" 
                        @change="selectOption"/>
                </div>
                <div class="zx-div2">开启自选后，您的商城里只显示您选择的商品</div>
            </div>
            <div class="seller-content2" >
                <div class="add-div">
                    <div class="fs40">添加商品</div>
                    <div class="fs40" @click="findProduct">
                        选择商品<i class="iconfont icon-jiantou-copy "></i>
                    </div>
                </div>
                <div class="add-div pro-div-item " v-if="sellerProList != null"
                v-for="(pro,index) in sellerProList" :key="index">
                    <div class="pro-div">
                        <div class="img-div">
                            <default-img :background="imgUrl+pro.image_url" :isHeadPortrait="0"></default-img>
                        </div>
                        <div class="fs0 right-div">
                            <p class="fs40">{{pro.pro_name}}</p>
                            <p class="fs34">价格：￥{{pro.pro_price | moneySplit1}}.<em class="fs30">{{pro.pro_price | moneySplit2 }}</em></p>
                        </div>
                    </div>
                    <div class="pro-div-right " @click="deletePro(index,pro,false)">
                        <i class="icon-guanbi iconfont del-div "></i>
                    </div>
                </div>
            </div>
        </div>
       <div class="bottom-div">
         <div class="div-button" @click="save">确认</div>
       </div>
    </div>
</template>
<script>
import defaultImg from "components/defaultImg";
import headerNav from "./setchlid/headerNav";
import imgUpload from "components/imgUpload";
import filte from "@/lib/filters";
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      findIds: this.$route.params.findIds || null,
      mallSet: {
        id: null,
        mallName: null, //商城名称
        contactNumber: null, //联系电话
        qq: null, //QQ
        mallHeadPath: "", //商城头像
        bannerPath: "", //banner地址
        mallIntroducation: null //简介
      }, //商城设置对象
      sellerProList: null, //自选商品集合
      type: this.$route.params.type || 1, //类型  1 基本信息  2 自选商品
      headerArr: [{ id: 1, name: "基本信息" }, { id: 2, name: "自选商品" }],
      imgUrl: null,
      selectProIdList: [] //选中的商品id集合
    };
  },
  components: {
    defaultImg,
    headerNav,
    imgUpload
  },
  watch: {
    type() {
      let findIds = this.findIds;
      if (findIds == null) {
        findIds = "-";
      }
      this.$router.push(
        "/seller/mallset/" + this.busId + "/" + this.type + "/" + findIds
      );
      this.$route.params.type = this.type;
    }
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle("商城设置");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.loadDatas(); //初始化数据
    if (this.findIds == "-") {
      this.findIds = null;
    }
    if (this.findIds != null) {
      this.selectProIdList = this.findIds.split(",");
      this.getSelectProduct();
    }
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  //相关操作事件
  methods: {
    loadDatas() {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        type: this.type
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_to_mall_set_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          // console.log(myData, "myData");
          if (myData.mallSet != null) {
            _this.mallSet = myData.mallSet;
          }
          if (myData.sellerProList != null && myData.sellerProList.length > 0) {
            // _this.sellerProList = myData.sellerProList;
            if (
              _this.sellerProList == null ||
              _this.sellerProList.length == 0
            ) {
              _this.sellerProList = myData.sellerProList;
            } else {
              _this.sellerProList = _this.sellerProList.concat(
                myData.sellerProList
              );
            }
          }
        }
      });
    },
    getSelectProduct() {
      //初始化数据
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        findIds: this.findIds
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_selected_product_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          if (myData == null) {
            return;
          }
          if (_this.sellerProList == null || _this.sellerProList.length == 0) {
            _this.sellerProList = myData;
          } else {
            _this.sellerProList = _this.sellerProList.concat(myData);
          }
        }
      });
    },
    //删除选中的商品
    deletePro(index, obj, flag) {
      let _this = this;
      let _isNotNull = this.commonFn.isNotNull;
      if (_isNotNull(obj.sellerProductId) && !flag) {
        let msg = {
          btnNum: 2, //按钮显示个数
          btnOne: "确定", //按钮文字
          btnTow: "取消", //按钮文字
          dialogTitle: "提示",
          dialogMsg: "是否删除该商品，删除商品后得重新添加商品",
          callback: {
            btnOne: function() {
              _this.deletePro(index, obj, true);
            } //点击按执行方法
          }
        };
        this.$parent.$refs.dialog.showDialog(msg); //调用方法
        return;
      }
      this.$delete(this.sellerProList, index);
      let list = this.selectProIdList;
      for (let i = 0; i < list.length; i++) {
        if (list[i] == obj.id) {
          this.$delete(this.selectProIdList, i);
          break;
        }
      }
      if (obj.sellerProductId == null) {
        this.deleteLoadUrls();
        return;
      }
      this.delete(obj.sellerProductId);
    },
    /**
     * 验证数据
     * type 类型    1验证名称 2验证电话 3验证QQ 4验证商城头像 5 验证banner 6验证商城简介
     */
    validate(type) {
      let _shop_tips = this.$parent.$refs.bubble.show_tips;
      let _isNull = this.commonFn.isNull;
      let _validPhone = this.commonFn.validPhone;
      let obj = this.mallSet;
      if (type == 0 || type == 1) {
        let val = obj.mallName;
        if (_isNull(val)) {
          _shop_tips("请填写商城名称");
          return false;
        } else if (val.length > 50) {
          _shop_tips("商城名称字数不能超过50字");
          return false;
        }
      }
      if (type == 0 || type == 2) {
        let val = obj.contactNumber;
        if (_isNull(val) || !_validPhone(val)) {
          _shop_tips("请填写正确的联系电话");
          return false;
        }
      }
      if (type == 0 || type == 3) {
        let val = obj.qq;
        if (_isNull(val) || val.length > 25) {
          _shop_tips("请填写正确的QQ号码");
          return false;
        }
      }
      if ((type == 0 || type == 4) && _isNull(obj.mallHeadPath)) {
        _shop_tips("请上传商城头像");
        return false;
      }
      if ((type == 0 || type == 5) && _isNull(obj.bannerPath)) {
        _shop_tips("请上传banner地址");
        return false;
      }
      if ((type == 0 || type == 6) && obj.mallIntroducation != null) {
        if (obj.mallIntroducation.length > 200) {
          _shop_tips("商城简介字数不能超过200个字");
          return false;
        }
      }
      return true;
    },
    returnUrl(data) {
      if (data[1] == 1) {
        this.mallSet.mallHeadPath = data[0][0];
      } else {
        this.mallSet.bannerPath = data[0][0];
      }
    },
    delete(id) {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        id: id
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_delete_mall_post,
        data: _data,
        loading: true,
        success: function(data) {
          _this.commonFn.loading(_this, false);
          _this.deleteLoadUrls();
        }
      });
    },
    /**
     * 保存数据
     */
    save(isReturn) {
      let mallSet = this.mallSet;
      if (this.type == 1 && !this.validate(0)) {
        return;
      }
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        type: this.type
      };
      let set = {
        mallSet: mallSet
      };
      if (this.type == 2 && mallSet.isOpenOptional == 0) {
          _this.$router.push(
            "/seller/mallindex/" +
              _this.busId +
              "/" +
              _this.mallSet.saleMemberId
          );
        return;
      }
      if (this.type == 2 && mallSet.isOpenOptional == 1) {
        if (this.sellerProList == null || this.sellerProList.length == 0) {
          _this.$parent.$refs.bubble.show_tips("请选择商品");
          return;
        }
        let sellerProList = [];
        this.sellerProList.forEach((item, index) => {
          let data = {
            productId: item.id,
            shopId: item.shop_id,
            mallsetId: mallSet.id
          };
          if (item.sellerProductId != null) {
            data.id = item.sellerProductId;
          }
          _this.$set(sellerProList, index, data);
        });
        set.sellerProList = sellerProList;
      }
      console.log(set.sellerProList, "sss");
      if (set != null) {
        _data.mallSet = JSON.stringify(set);
      }
      console.log(_data, "_data");
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_add_mall_set_post,
        data: _data,
        loading: true,
        success: function(data) {
          _this.commonFn.loading(_this, false);
          if (_this.type == 1) {
            _this.type = 2;
            return;
          }
          _this.$router.push(
            "/seller/mallindex/" +
              _this.busId +
              "/" +
              _this.mallSet.saleMemberId
          );
        }
      });
    },
    deleteLoadUrls() {
      let ids = "-";
      if (this.selectProIdList != null && this.selectProIdList.length > 0) {
        ids = this.selectProIdList.toString();
      }
      this.$router.push("/seller/mallset/" + this.busId + "/2/" + ids);
    },
    //禁止切换头部
    disabledSelect(e) {
      if (e == 2) {
        let msg = {
          btnNum: 1, //按钮显示个数
          btnOne: "我知道了", //按钮文字
          dialogTitle: "提示",
          dialogMsg: "请先完善基本信息"
        };
        this.$parent.$refs.dialog.showDialog(msg); //调用方法
      }
    },
    /**
     * 是否开启自选时间
     */
    selectOption() {
      let _this = this;
      let mallSet = this.mallSet;
      let isCheck = this.mallSet.isOpenOptional;
      let isOpenOptional = 0;
      if (isCheck) {
        isOpenOptional = 1;
      }
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        status: isOpenOptional,
        id: mallSet.id
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_open_optional_post,
        data: _data,
        loading: true,
        success: function(data) {
          _this.commonFn.loading(_this, false);
        }
      });
    },
    //返回之前点击的页面
    back() {
      let url = sessionStorage.getItem("returnUrl");
      if (url == null) {
        this.$router.push("/seller/index/" + this.busId);
      } else {
        location.href = url;
      }
    },
    findProduct() {
      let findIds = this.selectProIdList;
      if (findIds == null || findIds.length == 0) {
        findIds = "-";
      }
      this.$router.push(
        "/seller/findproduct/" + this.busId + "/" + findIds.toString()
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
@import "./css/sellercommon.less";

.sale-wrapper {
  width: 100%;
  position: relative;
  .seller-nav {
    background: #fff !important;
    .border;
  }
  .header-itme p {
    .fs46;
  }
  .seller-content {
    width: 100%;
    padding: 300/@dev-Width *1rem 0 243/@dev-Width *1rem 0;

    .set-item,
    .set-item2 {
      padding-left: 30/@dev-Width *1rem;
      width: 100%;
      height: 120/@dev-Width *1rem;
      .ik-box;
      .ik-box-pack(left);
      .ik-box-align(center);
      .set-div1 {
        width: 20%;
        .fs40;
      }
      .set-div2,
      .set-div3 {
        width: 80%;
        .update-div,
        .update-div2 {
          border: 0.04rem dashed #f2f2f2;
          width: 179/@dev-Width *1rem;
          height: 179/@dev-Width *1rem;
          line-height: 179/@dev-Width *1rem;
          color: #cacaca;
          .shop-textc;
          .fs40;
        }
        .update-div2 {
          width: 60%;
        }
      }
      .set-div3 {
        height: 100%;
        textarea {
          width: 80%;
        }
      }
      input,
      textarea {
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
        word-wrap: break-word;
        .fs40;
      }
    }
    .set-item2 {
      height: 200/@dev-Width *1rem;
      padding: 10/@dev-Width *1rem 0;
      padding-left: 30/@dev-Width *1rem;
    }
  }
  .seller-content2:not(:first-child) {
    margin-top: 30/@dev-Width *1rem;
  }
  .seller-content2 {
    background: #fff;
    width: 100%;
    padding-left: 30/@dev-Width *1rem;

    .zx-div {
      .shop-box-center;
      padding-right: 30/@dev-Width *1rem;
      height: 157/@dev-Width *1rem;
      input {
        display: block;
      }
      .shop-switch:checked {
        border-color: #2f99ff !important;
        background-color: #2f99ff !important;
      }
    }
    .zx-div2 {
      height: 100/@dev-Width *1rem;
      line-height: 100/@dev-Width *1rem;
      color: #999999;
      .fs40;
    }
    .add-div {
      height: 119/@dev-Width *1rem;
      .shop-box-center;
      .border;
      div:last-child {
        color: #999999;
      }
      i {
        margin: 0 30/@dev-Width *1rem 0 32/@dev-Width *1rem;
      }
    }
    .pro-div-item {
      height: 248/@dev-Width *1rem;
      //   padding: 10/@dev-Width *1rem 0;
      .pro-div {
        width: 90%;
        .ik-box;
        .ik-box-pack(left);
        .ik-box-align(center);
        .img-div {
          height: 228/@dev-Width *1rem;
          width: 228/@dev-Width *1rem;
          margin-right: 30/@dev-Width *1rem;
        }
        .right-div {
          p:first-child {
            margin: 20/@dev-Width *1rem 0 50/@dev-Width *1rem 0;
          }
        }
      }
      .pro-div-right {
        width: 10%;
        .fs0;
        height: 228/@dev-Width *1rem;
        line-height: 228/@dev-Width *1rem;
      }
    }
  }
  .bottom-div {
    // background-color: #fff;
    width: 100%;
    height: 245/@dev-Width *1rem;
    padding: 0 60/@dev-Width *1rem 100/@dev-Width *1rem 60/@dev-Width *1rem;
    .shop-footer-fixed;
    .div-button {
      width: 100%;
      height: 143/@dev-Width *1rem;
      line-height: 143/@dev-Width *1rem;
      color: #fff;
      background-color: #2f99ff;
      // margin: 0 60/@dev-Width *1rem 100/@dev-Width *1rem 60/@dev-Width *1rem;
      font-size: 58/@dev-Width *1rem;
      .border-radius(5px);
      .shop-textc;
    }
  }
}
.bg-white {
  background-color: #fff;
}
.hideUpload {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>