<template>
    <div class="shop-wrapper sale-wrapper">
        <div class="seller-top ">
          <div class="seller-nav fs48">
              <i class="iconfont icon-jiantou-copy1" @click="back"></i>自选商品
          </div>
          <div class="search-div">
            <div class="v-div">
                <i class="icon-sousuo iconfont" @click="search"></i>
                <input  placeholder="搜索商品" v-model="content"/>
            </div>
          </div>
       </div>
       <div class="content-div">
         <!-- 父级分类 -->
         <div class="left-div" v-if="classList != null">
           <div class="cla-item " v-for="(cla , index) in classList" :key="index"
           @click="selectGroup(cla,1)"
           :class="{'nav' : selectGroupId == cla.group_id}">{{cla.group_name}}</div>
         </div>
         <!-- 子级分类 -->
         <div class="right-div2" v-if="childClaList != null && childClaList.length > 0">
           <div class="child-item" v-for="(cla,index) in childClaList" :key="index"
             @click="selectGroup(cla,0)">
              <default-img :background="imgUrl+cla.image_url" :isHeadPortrait="0" :size="'0.5'" class="cla-img-div"></default-img>
              <p>{{cla.group_name}}</p>
           </div>
         </div>
         <!-- 商品列表 -->
         <div class="right-div" v-if="productList != null" id="aaa"
          v-infinite-scroll="loadDatas"
          infinite-scroll-distance="200">
           <div class="pro-item" v-for="(pro,index) in productList" :key="index">
             <div class="pro-div" @click="toProductDetail(pro)">
               <div class="img-divs">
                 <default-img :background="pro.image_url" :isHeadPortrait="0" :size="'0.8'" class="img-div"></default-img>
               </div>
               <div class="con-div fs0">
                 <p class="fs40">{{pro.pro_name}}</p>
                 <p class="fs32 shop-font">价格：￥{{pro.price | moneySplit1}}.<em class="fs28">{{pro.price | moneySplit2}}</em></p>
                 <p class="fs32 shop-font" v-if="pro.hyPrice != null">会员：￥{{pro.hyPrice | moneySplit1}}.<em class="fs28">{{pro.hyPrice | moneySplit2}}</em></p>
               </div>
             </div>
             <div class="icon-div" @click="isCheck(pro,index)">
               <i class="iconfont fs46" :class="[pro.isCheck ? 'icon-yes' : 'icon-yuangy']"></i>
             </div>
           </div>
            <more :is-more="isMore"></more>
         </div>
       </div>
        
       <section class="shop-footer-fixed">
         <div class="div-button" @click="save">确认选择</div>
       </section>
    </div>
</template>
<script>
import headerNav from "./setchlid/headerNav";
import imgUpload from "components/imgUpload";
import more from "components/more";
//import filte from "@/lib/filters";
export default {
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"),
      ids: this.$route.params.ids || null, //
      productList: null, //自选商品集合
      classList: null, //分类集合
      imgUrl: null, //图片域名
      selectGroupId: 0, //选中的分类id  默认选中全部
      childClaList: [], //子分类集合
      curPage: 1, //当前页数
      pageCount: 1, //总页数
      isMore: 2, //是否更多
      saleMemberId: 0, //销售员id
      selectList: [], //选中的集合
      content: null, //搜索内容
    };
  },
  components: {
    headerNav,
    imgUpload,
    more
  },
  watch: {
    productList() {
      if (
        this.curPage == 1 &&
        this.productList != null &&
        this.productList.length > 0
      ) {
        // let _this = this;
        // this.$nextTick(function() {
        //   _this.scroll();
        // });
      }
    }
  },
  //已成功挂载，相当ready()
  mounted() {
    this.commonFn.setTitle("自选商品");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
    if (this.ids == "-") {
      this.ids = null;
    }
    if (this.ids != null) {
      this.selectList = this.ids.split(",");
    }
    this.loadDatas(); //初始化数据
    this.classAllAjax(0);
    let _this = this;
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  //相关操作事件
  methods: {
    //切换分类
    selectGroup(obj, type) {
      let groupId = obj.group_id;
      if (groupId == this.selectGroupId) {
        return;
      }
      if (type == 1) {
        this.selectGroupId = groupId;
        this.productList = null;
        this.curPage = 1;
      }
      this.selectGroupId = groupId;
      if (obj.is_child == 1) {
        this.classAllAjax(groupId);
      } else {
        this.childClaList = null;
        this.loadDatas();
      }
    },
    //圆圈选中
    isCheck(pro, index) {
      pro.isCheck = pro.isCheck ? false : true;
      this.$set(this.productList, index, pro);
      let proId = pro.id;
      if (pro.isCheck) {
        this.$set(this.selectList, this.selectList.length, proId);
      } else {
        for (let i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i] != proId) {
            continue;
          }
          this.$delete(this.selectList, i);
          break;
        }
      }
    },
    //调用滚动事件
    // scroll() {
    //   let _this = this;
    //   let parentHeight = $(".right-div").height();
    //   $(".right-div").unbind("scroll");
    //   $(".right-div").bind("scroll", function() {
    //     let _proObj = $(this).find(".pro-item");
    //     let proHeight = _proObj.length * _proObj.height();
    //     let _scrollTop = $(".right-div").scrollTop();

    //     var isScroll =
    //       _scrollTop > 0 && _scrollTop + parentHeight >= proHeight - 200;
    //     if (isScroll) {
    //       this.isMore = -1;
    //       _this.loadMore();
    //     }
    //   });

    //   // console.log("----");
    //   // $(".right-div").scroll(function() {
    //   //   console.log("----");
    //   //   $(".right-div").css("border", "1px solid");
    //   // });
    // },
    //加载更多
    // loadMore() {
    //   let pageCount = this.pageCount; //总页数
    //   if (this.curPage >= pageCount) {
    //     this.isMore = 3; //没有更多
    //     return;
    //   }
    //   if (this.isMore == 2) {
    //     return;
    //   }
    //   this.curPage++; //请求页数
    //   this.isMore = 2;
    //   this.loadDatas(this.selectGroup);
    // },
    loadDatas() {
      //初始化数据
      let _this = this;
      if (this.isMore == 3 || this.isMore == 1) {
        return;
      }
      this.isMore = 1;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType, //浏览器类型
        curPage: this.curPage,
        proName: this.content
      };
      if (this.selectGroupId > 0) {
        _data.groupId = this.selectGroupId;
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.seller_find_product_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          _this.imgUrl = data.imgUrl;
          let page = myData.page;
          _this.saleMemberId = myData.saleMemberId;
          _this.curPage = page.curPage;
          _this.pageCount = page.pageCount;
          let productList = page.subList;
          if (productList == null || productList.length == 0) {
            _this.isMore = 3;
            return;
          }
          let selectList = _this.selectList;
          if (selectList != null && selectList.length > 0) {
            productList.forEach((element, index) => {
              for (let j = 0; j < selectList.length; j++) {
                let select = selectList[j];
                if (select == element.id) {
                  element.isCheck = true;
                  break;
                }
              }
            });
          }

          if (_this.curPage === 1) {
            //第一页数据
            _this.productList = productList;
          } else {
            _this.productList = _this.productList.concat(productList) || []; //拼接多页数据
          }
          _this.isMore = 1;
          if (_this.curPage >= _this.pageCount) {
            _this.isMore = 3; //没有更多
            return;
          }
          _this.isMore = 2;
          _this.curPage++; //当前页数
        }
      });
    },
    /**
     * 商品分类接口 
     */
    classAllAjax(groupId) {
      let _this = this;
      this.ajaxRequest({
        url: h5App.activeAPI.phoneProduct_classAll_post,
        data: {
          shopId: 0,
          busId: this.busId,
          groupId: groupId || 0
        },
        success: function(data) {
          _this.isMore = 1;
          if (groupId > 0) {
            _this.childClaList = data.data;
            return;
          }
          if (_this.classList != null) {
            _this.classList = data.data;
          } else {
            _this.classList = data.data;
            let all = {
              group_id: 0,
              group_name: "全部",
              is_child: 0,
              shop_id: ""
            };
            _this.classList.unshift(all); //添加对象到数组第一个
          }
        }
      });
    },
    save() {
      let selectList = this.selectList;

      if (selectList == null || selectList.length == 0) {
        this.$store.commit("error_msg", "请选择商品");
        return;
      }
      this.$router.push(
        "/seller/mallset/" + this.busId + "/2/" + selectList.toString()
      );
    },
    search() {
      let content = this.content;
      this.curPage = 1;
      this.selectGroupId = 0;
      this.loadDatas();
    },
    toProductDetail(obj) {
      let saleMemberId = this.saleMemberId;
      this.$router.push(
        "/goods/details/" +
          obj.shop_id +
          "/" +
          obj.user_id +
          "/0/" +
          obj.id +
          "/0/" +
          saleMemberId +
          "/0"
      );
    },
    //返回之前点击的页面
    back() {
      let ids = this.ids;
      if (ids == null) {
        ids = "-";
      }
      this.$router.push("/seller/mallset/" + this.busId + "/2/" + ids);
    }
  }
};
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
@import  (reference) "~assets/css/common.less";
@import  "~assets/css/sellercommon.less";

.sale-wrapper {
  width: 100%;
  position: relative;
  .seller-nav {
    background: #fff !important;
    .border;
  }
  .search-div {
    background: #fff;
    height: 137/@dev-Width *1rem;
    padding: 20/@dev-Width *1rem 38/@dev-Width *1rem;
    .v-div {
      width: 100%;
      height: 100%;
      border: 1px solid #d1d1d1;
      .border-radius(10px);
      position: relative;
      padding-left: 86/@dev-Width *1rem;
      i {
        width: 5%;
        margin-right: 10/@dev-Width *1rem;
        position: absolute;
        left: 18/@dev-Width *1rem;
        top: 29%;
      }
      input {
        width: 97%;
      }
      i,
      input {
        display: block;
      }
    }
  }
  .content-div {
    width: 100%;
    height: 77vh;
    position: relative;
    padding-top: 255/@dev-Width *1rem;
    .left-div,
    .right-div,
    .right-div2 {
      // overflow: hidden;
      overflow: scroll;
      position: absolute;
      height: 100%;
      -webkit-overflow-scrolling: touch;
    }
    .left-div {
      width: 24%;
      left: 0;
      .cla-item {
        width: 100%;
        height: 150/@dev-Width *1rem;
        line-height: 150/@dev-Width *1rem;
        .text-overflow;
        .fs44;
        .shop-textc;
        .border;
        border: 1px solid #e5e5e5;
        background-color: #fff;
      }
      .cla-item::selection {
        .nav;
      }
      .cla-item:nth-child(2n) {
        border-width: 0 1px 0 1px;
      }
      .nav {
        .shop-font;
        border: 0;
        background: none;
      }
    }
    .right-div,
    .right-div2 {
      width: 76%;
      padding: 30/@dev-Width *1rem 0 0 31/@dev-Width *1rem;
      right: 0;
      .pro-item {
        .border;
        padding-left: 30/@dev-Width *1rem;
        background-color: #fff;
        .shop-box-center;
        .fs0;
        .pro-div {
          width: 87%;
          .ik-box;
          .ik-box-pack(left);
          .img-divs{
            margin-right: 20/@dev-Width *1rem;
          }
          .img-div {
            width: 218/@dev-Width *1rem;
            height: 218/@dev-Width *1rem;
            margin: 10/@dev-Width *1rem 0;
          }
          .con-div {
            width: 65%;
            p {
              width: 100%;
              .text-overflow;
            }
            p:nth-child(1) {
              height: 90/@dev-Width *1rem;
              line-height: 90/@dev-Width *1rem;
            }
            p:nth-child(2) {
              height: 90/@dev-Width *1rem;
              line-height: 90/@dev-Width *1rem;
            }
            .shop-font em {
              display: inline !important;
            }
          }
        }
        .icon-div {
          width: 13%;
          .shop-textc;
          .icon-yuangy {
            display: inline-block;
            width: 46/@dev-Width *1rem;
            height: 46/@dev-Width *1rem;
            border: 1px solid #c9c9c9;
            .border-radius(100%);
          }
          .icon-yes {
            color: #2f99ff;
          }
          .icon-yigouxuan {
            font-size: 46/@dev-Width *1rem;
          }
        }
      }
    }
    .right-div {
      z-index: 1;
    }
    .right-div2 {
      z-index: 2;
      background-color: #fff;
      .child-item {
        float: left;
        width: calc(100% / 3);
        margin-bottom: 20/@dev-Width *1rem;
        .shop-textc;
        .cla-img-div {
          width: 165/@dev-Width *1rem;
          height: 165/@dev-Width *1rem;
          margin: 0 auto;
          background-color: #eee;
        }
        p {
          .fs40;
        }
      }
    }
  }
  .shop-footer-fixed {
    width: 100%;
    background-color: #fff;
    z-index: 3;
    .div-button {
      width: 90%;
      height: 143/@dev-Width *1rem;
      line-height: 143/@dev-Width *1rem;
      color: #fff;
      background-color: #2f99ff;
      margin: 30/@dev-Width *1rem 60/@dev-Width *1rem;
      font-size: 58/@dev-Width *1rem;
      .border-radius(5px);
      .shop-textc;
    }
  }
}
input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  word-wrap: break-word;
  .fs40;
}
.more-main {
  padding-bottom: 0;
}
</style>