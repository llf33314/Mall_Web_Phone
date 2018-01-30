<template>
   <div class="shop-wrapper mybond-wapper">
      <div class="collect-nav">
        <i class="icon-shangyiji iconfont fs40" @click="back"></i>
        <p class="fs44" v-if="!isDelete && collectArr != null" @click="isDelete = true">编辑</p>
        <p class="fs44" v-if="isDelete && collectArr != null" @click="isDelete = false">完成</p>
      </div>
      <div class="mybond-main" v-if="collectArr != null">
          <div class="mybond-item" v-for="(collect , index) in collectArr" :key="index">
             <div class="gou-div1 " v-if="isDelete" @click="check(index)">
               <i :class="[collect.isCheckDelete ? 'icon-yigouxuan iconfont' : 'icon-yuangy']"></i>
             </div>
             <div class="gou-div2">
              <delete-slide class="order-item-content" 
                                @delete="delete_dialog(1,collect)"
                                :scope="index" :titles="'收藏'">
                <!-- <goods-info :obj="collect" :imgpath="imgUrl"></goods-info> -->
                <div class="goodsinfo-box border"  :class="{'div-left':isDelete}">
                  <div class="goodsinfo-img" @click="proDetail(collect)">
                      <default-img :background="imgUrl+ collect.productImageUrl"
                                  :isHeadPortrait="0"
                                  :size="'0.8rem'">
                      </default-img>
                  </div>
                  <div class="goodsinfo-text">
                    <p class="goodsinfo-name" @click="proDetail(collect)">{{collect.productName}} </p>
                    <p class="fs42 shop-font pro-price" v-if="collect.productPrice != null">
                      <span>￥{{collect.productPrice | moneySplit1 }}.{{collect.productPrice | moneySplit2 }}</span>
                      <span>会员价：{{collect.productMemberPrice | moneySplit1}}.<span class="fs39">{{collect.productMemberPrice | moneySplit2}}</span></span>
                    </p>
                  </div>
                  </div>
                </delete-slide>
              </div>
          </div>
      </div>
      <section class="collect-bottom" v-if="isDelete">
        <div class="fs44" @click="allCheck">
          <i class="fs40 shop-font " :class="[isAllCheckDelete ? 'icon-yigouxuan iconfont' : 'icon-yuangy']"></i>
          全选
        </div>
        <div class="shop-bg fs50" @click="allDelete">删除</div>
      </section>
      <content-no :statu="statu" v-if="isShowNo"></content-no>
      <more :is-more="3" v-if="isShowMore"></more>
    </div>
</template>

<script>
import more from "components/more"; //更多
import goodsInfo from "../auction/child/goodsinfo"; //商品信息
import deleteSlide from "../shoppingCart/component/deleteSlide"; //滑动删除插件
import filters from "@/lib/filters"; //过滤器
export default {
  components: {
    goodsInfo,
    more,
    deleteSlide
  },
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      collectArr: null,
      imgUrl: "",
      statu: 2, //无信息插件状态
      isShowNo: false, //是否显示没有内容的插件
      isShowMore: false, //是否显示 没有更多的 插件
      isDelete: false,
      isAllCheckDelete: false
    };
  },
  mounted() {
    this.commonFn.setTitle("我的收藏");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    this.load();
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  watch: {
    $route() {
      this.load();
    }
  },
  methods: {
    //全选
    allCheck() {
      let isAllCheckDelete = this.isAllCheckDelete ? false : true;
      console.log(isAllCheckDelete, "isAllCheckDelete", this.isAllCheckDelete);
      let _this = this;
      this.collectArr.forEach((item, index) => {
        item.isCheckDelete = isAllCheckDelete;
        _this.$set(_this.collectArr, index, item);
      });

      this.isAllCheckDelete = isAllCheckDelete;
    },
    //底部删除按钮，
    allDelete() {
      let _this = this;
      let ids = [];
      _this.collectArr.forEach((item, index) => {
        if (item.isCheckDelete) {
          ids.push(item.id);
        }
      });
      if (ids == null || ids.length == 0) {
        this.isShowDialog("请选择要删除的收藏", ids, 1);
        return;
      }
      this.isShowDialog("是否删除该收藏？", ids, 2);
    },
    //显示提示框
    isShowDialog(title, ids, btnNum) {
      let _this = this;
      let msg = {
        //弹出框组件调用
        btnNum: btnNum,
        dialogMsg: title,
        btnOne: "是",
        btnTow: "否",
        dialogTitle: "提示",
        callback: {
          btnOne: function() {
            _this.deleteCollect(ids);
          },
          btnTow: function() {}
        }
      };
      _this.$parent.$refs.dialog.showDialog(msg); //弹出框
    },
    //单个选中
    check(i) {
      let collectArr = this.collectArr;
      let collect = collectArr[i];
      collect.isCheckDelete = collect.isCheckDelete || false ? false : true;
      console.log(collect.isCheckDelete);
      this.$set(collectArr, i, collect);

      let allCheck = true;
      for (let j = 0; j < collectArr.length; j++) {
        let item = collectArr[j];
        if (!item.isCheckDelete) {
          allCheck = false;
          break;
        }
      }
      this.isAllCheckDelete = allCheck;
    },
    /** 
     * 页头导航接值
     */
    handleChange(value) {
      this.type = value;
      let busId = this.busId;
      this.collectArr = null;
    },
    //获取我的竞拍
    load() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.my_collect_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null || myData.length == 0) {
            _this.isShowNo = true;
            return;
          }
          console.log(myData, "myData");
          _this.collectArr = myData;
          _this.imgUrl = data.imgUrl;
          _this.isShowMore = true;
        }
      });
    },
    //删除收藏
    deleteCollect(ids) {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        ids: ids.toString()
      };
      console.log(_data, "_data");
      _this.ajaxRequest({
        url: h5App.activeAPI.delete_collect_post,
        data: _data,
        success: function(data) {
          location.reload();
        }
      });
    },
    //跳转到商品详情
    proDetail(obj) {
      let busId = this.busId;
      let shopId = obj.shop_id || obj.shopId;
      let proId = obj.pro_id || obj.proId;
      let aucId = obj.auc_id || obj.aucId;
      this.$router.push(
        "/goods/details/" + shopId + "/" + busId + "/4/" + proId + "/" + aucId
      );
    },
    /**
     * 删除弹出窗
     * @param index  当前要删除的对象
     * @param c  1删除 2清空
     */
    delete_dialog(c, collect) {
      console.log(c, "---", collect);
      this.deleteCollect(collect.id);
    },
    //往回退
    back() {
      this.$router.push("/my/center/" + this.busId);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
.collect-nav {
  height: 100/@dev-Width *1rem;
  background-color: #f6f6f6;
  .shop-box-center;
  .border;
  p {
    height: 100%;
    line-height: 100/@dev-Width *1rem;
  }
  i:first-child {
    display: block;
    padding: 0 50/@dev-Width *1rem;
  }
  p:last-child {
    padding: 0 80/@dev-Width *1rem;
  }
}
.mybond-main {
  width: 100%;
  position: relative;
  .mybond-item {
    width: 100%;
    background: #fff;
    position: relative;
    z-index: 1;
    font-size: 0;
    line-height: 1;
    height: 357/@dev-Width * 1rem;

    .gou-div1 {
      width: 10%;
      height: 357/@dev-Width * 1rem;
      .ik-box;
      .ik-box-pack(center);
      .ik-box-align(center);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      background: #fff;
      i {
        display: block;
      }
    }
    .gou-div2 {
      width: 100%;
      padding-left: 10%;
      height: 100%;
      .order-item-content {
        height: 100%;
      }
    }
    .goodsinfo-box {
      width: 100%;
      position: relative;
      padding-left: 30/@dev-Width * 1rem;
      padding: 38/@dev-Width * 1rem 0 30/@dev-Width * 1rem;
      // padding: 30/@dev-Width * 1rem 48/@dev-Width * 1rem;
      .clearfix;
      .goodsinfo-img {
        float: left;
        width: 290/@dev-Width * 1rem;
        height: 290/@dev-Width * 1rem;
        overflow: hidden;
      }
      .goodsinfo-text {
        float: right;
        width: 68%;
        .pro-price {
          span:first-child {
            margin-right: 10/@dev-Width * 1rem;
          }
        }
      }
      .goodsinfo-name {
        width: 100%;
        // height: 116/@dev-Width * 1rem;
        .fs42;
        margin: 55/@dev-Width * 1rem 0;
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
  .mybond-item-title {
    padding: 9/@dev-Width *1rem 48/@dev-Width *1rem;
    .shop-box-center;
    span {
      display: block;
      padding: 18/@dev-Width *1rem 0;
    }
    span.mybond-item-bottom {
      padding: 18/@dev-Width *1rem 38/@dev-Width *1rem;
      .border-radius(5px);
    }
  }
  .mybond-item-time {
    text-align: right;
    .fs42;
    padding: 25/@dev-Width *1rem 50/@dev-Width *1rem 45/@dev-Width *1rem 0;
  }
}
.collect-bottom {
  .shop-footer-fixed;
  .shop-box-center;
  background-color: #f6f6f6;
  width: 100%;
  height: 140/@dev-Width *1rem;
  div {
    height: 100%;
    line-height: 140/@dev-Width *1rem;
    i {
      margin: 0 30/@dev-Width *1rem 0 70/@dev-Width *1rem;
      display: block;
    }
  }
  div:first-child {
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
  }
  div:last-child {
    padding: 0 80/@dev-Width *1rem;
  }
}
.icon-yuangy {
  display: block;
  width: 70/@dev-Width *1rem;
  height: 70/@dev-Width *1rem;
  border: 1px solid #c9c9c9;
  .border-radius(100%);
}
.icon-yigouxuan {
  font-size: 70/@dev-Width *1rem;
  .shop-font;
}
</style>
