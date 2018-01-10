<template>
  <div>
    <div v-if="listAll.length>0 || list.productList || data">
      <div class="groupingModule"
           v-scroll="loadMore"
           infinite-scroll-distance="loading"
           infinite-scroll-top="scrollFixedTop">
        <!-- 左侧菜单 -->
        <div class="grouping-leftNav" v-if="data.nav==0">
          <table>
            <tr>
              <td class="grouping-leftNav-l">
                <div class="grouping-leftNav-l-box">
                  <div v-for="(pic,index) in picJson.imgID" :key="index" :class="{'index':index==select}" @click="tapChange(index)"><a>{{pic.groupName}}</a></div>
                </div>
              </td>
              <td class="grouping-leftNav-r">
                <template v-for="dataObj in listAll" v-if="dataObj != null">
                  <div class="grouping-list-title">{{dataObj.title}}</div>
                  <template v-for="dataPage in dataObj.data">
                    <div class="grouping-leftNav-commodity row" v-for="row in dataPage">
                      <div class="grouping-leftNav-commodity-pic center row" @click="jumpProductDetail(row)"><img v-lazy="row.image_url"></div>
                      <div class="grouping-leftNav-commodity-des">
                        <p class="grouping-leftNav-r-title text-overflow-ellipsis" @click="jumpProductDetail(row)">{{row.pro_name}}</p>
                        <span class="grouping-leftNav-r-price">￥{{row.price}}</span>
                        <a class="grouping-leftNav-r-buy" href="javascript:void(0)" @click="showSpecTips(row)"><span></span></a>
                      </div>
                    </div>
                  </template>
                </template>
              </td>
            </tr>
          </table>
        </div>

        <!-- 顶部菜单 -->
        <div class="grouping-topNav" v-if="data.nav==1&&picJson.imgID.length>0">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td v-for="(pic,index) in picJson.imgID" :class="{'index':index==select}" @click="tapChange(index)"><a>{{pic.groupName}}</a></td>
            </tr>
          </table>
        </div>

        <div v-if="list.productList&&data.nav==1">

          <!--大图-->
          <div v-if="data.page==0" class="goods-card goods-card02">
            <ul class="sc-goods-list clearfix">
              <li v-for="(pic,index) in list.productList.subList">
                <a :href="pic.url" class="link clearfix" :class="{'simpleness':data.css==1}">
                  <div class="photo-block">
                    <div class="photo-block img_class bg-con h292" style="display: block;" v-lazy:background-image="pic.image_url" @click="jumpProductDetail(pic)"></div>
                  </div>

                  <div v-if="data.css == 0">
                    <div class="clearfix  info-price" v-if="data.name || data.intro || data.price">
                      <p class="goods-title" @click="jumpProductDetail(pic)"><span class="goods-label" v-if="data.label && pic.pro_label">{{pic.pro_label}}</span><span>{{pic.title}}</span></p>
                      <p class="goods-sub-title c-black" v-show="data.intro">{{pic.desc}}</p>

                      <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label>{{pic.price}}</label></p>
                      <div class="h55" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                        <div class="list-scale w1180">
                          <p class="goods-price fz35">
                            <label v-show="data.price && pic.price" class="w240" style="display: inline-block;">￥<label>{{pic.price}}</label></label> <span class="original w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                            <label v-show="data.price_other && pic.hyPrice" class="w280" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label> <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                          </p>
                        </div>
                      </div>

                    </div>
                    <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn" @click="showSpecTips(pic)"></div>
                  </div>

                  <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1 && !data.intro">
                    <p class="sim......pleness-title" v-show="data.name">{{pic.title}}</p>
                    <p class="goods-price fz12" v-show="data.price">￥<label>{{pic.price}}</label></p>
                  </div>

                  <div class="simpleness-big clearfix" v-if="data.css == 1 && data.intro">
                    <div class="clearfix simpleness-big-box" v-show="data.name || data.price">
                      <p class="simpleness-big-title" v-show="data.name">{{pic.title}}</p>
                      <p class="simpleness-big-price" v-show="data.price">￥<label>{{pic.price}}</label></p>
                    </div>
                    <p class="goods-sub-title c-black" v-show="data.intro">{{pic.desc}}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <!--小图-->
          <div v-if="data.page==1" class="goods-card goods-card03">
            <ul class="sc-goods-list clearfix">
              <li v-for="pic in list.productList.subList">
                <a :href="pic.url" class="link clearfix" :class="{1:'simpleness',3:'rush'}[data.css]">
                  <!-- <div class="photo-block" style="height:100px;background:url({{pic.image_url}}) 50% 50% no-repeat;background-size:contain;">
                  </div> -->
                  <div class="photo-block img_class h100" style="background: 50% 50% no-repeat;background-size:contain;background-repeat: no-repeat;background-position: center center;" v-lazy:background-image="pic.image_url"
                     @click="jumpProductDetail(pic)">
                  </div>
                  <div v-if="data.css == 0 || data.css == 2">
                    <div class="clearfix  info-price" v-if="data.name || data.price">
                      <p class="goods-title" @click="jumpProductDetail(pic)"><span class="goods-label" v-if="data.label && pic.pro_label">{{pic.pro_label}}</span><span>{{pic.title}}</span></p>

                      <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label>{{pic.price}}</label></p>
                      <div class="h55" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                        <div class="w540" style="position: relative;transform: scale(0.23148148148148148);transform-origin: left top;">
                          <p class="goods-price fz35">
                            <label class="w240" v-show="data.price && pic.price" style="display: inline-block;">￥<label>{{pic.price}}</label></label>
                            <label class="w280" v-show="data.price_other && pic.hyPrice" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label>
                          </p>
                          <p class="original">
                            <span class="w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                            <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn" @click="showSpecTips(pic)"></div>
                  </div>
                  <div class="simpleness-price" v-if="data.css == 1">
                    <p class="goods-price fz12" v-show="data.price">￥<label>{{pic.price}}</label></p>
                  </div>
                  <div class="sales" v-if="data.css == 3">
                    <div class="goods-price">￥<label>{{pic.price}}</label></div>
                    <div class="goods-buy">我要抢购</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <!--一大两小-->
          <div v-if="data.page==2" class="goods-card goods-card01">
            <ul class="sc-goods-list clearfix">
              <li v-for="pic in list.productList.subList">
                <a :href="pic.url" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                  <!-- <div class="photo-block" style="height:100px;background:url({{pic.image_url}}) 50% 50% no-repeat;background-size:contain;" >
                  </div> -->
                  <div class="photo-block img_class bg-con" v-lazy:background-image="pic.image_url" @click="jumpProductDetail(pic)"></div>
                  <div v-if="data.css == 0">
                    <div class="clearfix  info-price" v-if="data.name || data.price">
                      <p class="goods-title" @click="jumpProductDetail(pic)"><span class="goods-label" v-if="data.label && pic.pro_label">{{pic.pro_label}}</span><span>{{pic.title}}</span></p>

                      <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label>{{pic.price}}</label></p>

                      <div class="h55" v-if="complete(_page)" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                        <div class="list-scale">
                          <p class="goods-price fz35">
                            <label class="w240" v-show="data.price && pic.price" style="display: inline-block;">￥<label>{{pic.price}}</label></label> <span class="original w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                            <label class="w280" v-show="data.price_other && pic.hyPrice" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label> <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                          </p>
                        </div>
                      </div>

                      <div class="h55" v-if="!complete(_page)" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                        <div class="w540" tyle="position: relative;transform: scale(0.23148148148148148);transform-origin: left top;">
                          <p class="goods-price fz35">
                            <label class="w240" v-show="data.price && pic.price" style="display: inline-block;">￥<label>{{pic.price}}</label></label>
                            <label class="w280" v-show="data.price_other && pic.hyPrice" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label>
                          </p>
                          <p class="original">
                            <span class="w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                            <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                          </p>
                        </div>
                      </div>

                    </div>
                    <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn" @click="showSpecTips(pic)"></div>
                  </div>
                  <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1">
                    <p class="simpleness-title" v-show="data.name">{{pic.title}}</p>
                    <p class="goods-price fz12" v-show="data.price">￥<label>{{pic.price}}</label></p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <!--详细列表-->
          <div v-if="data.page==3" class="goods-card goods-card04">
            <ul class="sc-goods-list clearfix">
              <li v-for="pic in list.productList.subList" :class="{1:'simpleness'}[data.css]">
                <a :href="pic.url" class="link clearfix">
                  <div class="photo-block" @click="jumpProductDetail(pic)">
                    <img class="img_class" v-lazy="pic.image_url">
                  </div>
                  <div class="clearfix  info-price">
                    <p class="goods-title" @click="jumpProductDetail(pic)"><span class="goods-label" v-if="data.label && pic.pro_label">{{pic.pro_label}}</span><span>{{pic.title}}</span></p>

                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label>{{pic.price}}</label></p>
                    <div class="h55" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div class="w540" style="position: relative;transform: scale(0.23148148148148148);transform-origin: left top;">
                        <p class="goods-price fz35">
                          <label class="w240" v-show="data.price && pic.price" style="display: inline-block;">￥<label >{{pic.price}}</label></label>
                          <label class="w280" v-show="data.price_other && pic.hyPrice" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label>
                        </p>
                        <p class="original">
                          <span  class="w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                          <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn" @click="showSpecTips(pic)"></div>
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Grouping",
  data() {
    return {
      select: 0,
      curPage: 1, //当前页数
      loading: false,
      list: {},
      listAll: [], //所以数据
      navTop: [],
      reqDataList: [],
      scrollFixedTop: 0,
      pageData: null
    };
  },
  props: {
    data: {
      type: [Object, Array]
    },
    _page: {
      type: Number
    },
    picJson: {
      type: [Object, Array]
    }
  },
  watch: {
    select(_new, _old) {
      var self = this;
      if (self.data.nav == 0) {
      } else {
        let newData = self.reqDataList[_new] || {};
        self.reqDataList[_old] = {
          curPage: self.curPage,
          list: self.list,
          loading: self.loading
        };
        self.curPage = newData.curPage || 1;
        self.list = newData.list || {};
        self.loading = newData.loading;

        if (typeof self.list.productList == "undefined") {
          loadData.call(this);
        }
        self.$nextTick(function() {
          self.updataBottom();
        });
      }
    }
  },
  components: {},
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  //在挂载开始之前被调用
  beforeMount() {
    var self = this;
    this.pageData = self.$parent.pageData;
    if (self.data.nav == 0) {
      loadAllData.call(self);
    } else {
      loadData.call(self);
    }
  },
  //已成功挂载，相当ready()
  mounted() {},
  //相关操作事件
  methods: {
    complete(param) {
      if (parseInt(param / 3) == param / 3) return true;
    },
    tapChange(index) {
      var self = this;
      self.select = index;
      if (self.data.nav == 0) {
        window.scrollTo(0, self.navTop[index] + 1);
      }
    },
    loadMore() {
      loadData.call(this);
    },
    showSpecTips(data) {
      console.log(data, "data");
      this.$emit("getProductSpec", [data.id]);
    },
    //跳转到商品详情页面
    jumpProductDetail(data) {
      console.log(data, "data");
      this.$router.push("/goods/details/"+data.shop_id+"/"+data.user_id+"/0/"+data.id+"/0");
    }
  }
};

var loadAllData = function() {
  var self = this;
  let _pageData = this.pageData;
  var req = function(page, obj, key) {
    self.ajaxRequest({
      url: h5App.activeAPI.phoneProduct_productAll_post,
      data: {
        url: location.href,
        busId: _pageData.busId, //商家id
        shopId: _pageData.shopId, //店铺id
        groupId: obj.groupId, //分组id
        curPage: page, //当前页
        browerType: self.$store.state.browerType, //浏览器,
        ucLogin: 1 //1不需要登陆
      },
      success: function(res) {
        if (self.listAll[key] != null){
          self.listAll[key] = { title: obj.groupName, data: [] };
        }
        self.listAll[key].data[page] = res.data.productList.subList;
        self.listAll.splice(1, 0);
      }
    });
  };

  self.picJson.imgID.forEach(function(e, key) {
    self.ajaxRequest({
      url: h5App.activeAPI.phoneProduct_productAll_post,
      data: {
        url: location.href,
        busId: _pageData.busId, //商家id
        shopId: _pageData.shopId, //店铺id
        groupId: e.groupId, //分组id
        curPage: 1, //当前页
        browerType: self.$store.state.browerType ,//浏览器
        ucLogin: 1 //1不需要登陆
      },
      success: function(res) {
        if (res.data.productList.pageCount > 1) {
          for (let i = 1; i < res.data.productList.pageCount; i++) {
            req(i, e, key);
          }
        } else {
          self.listAll[key] = {
            title: e.groupName,
            data: [res.data.productList.subList]
          };
          self.listAll.splice(1, 0);
        }
      }
    });
  });
};

var loadData = function() {
  var self = this;
  let _pageData = this.pageData;
  self.loading = true;
  if (self.list.productList && self.curPage > self.list.productList.pageCount)
    return false;
  self.ajaxRequest({
    url: h5App.activeAPI.phoneProduct_productAll_post,
    data: {
      url: location.href,
      busId: _pageData.busId, //商家id
      shopId: _pageData.shopId, //店铺id
      groupId: self.picJson.imgID[self.select].groupId, //分组id
      curPage: self.curPage, //当前页
      browerType: self.$store.state.browerType, //浏览器,
      ucLogin: 1 //1不需要登陆
    },
    success: function(res) {
      self.curPage += 1;

      if (self.list.productList) {
        let subList = self.list.productList.subList.concat(
          res.data.productList.subList
        );
        self.list.productList.subList = subList;
      } else {
        self.list = res.data;
      }

      self.$nextTick(function() {
        self.loading = false;
      });
      // self.list.splice(1,0);
    }
  });
};
</script>
