<template>
  <footer class="shop-footer-fixed" v-if="$store.state.showfooter && $store.state.isShowFooter">
    <div class="footer-nav fs36">
        <div class="footer-itme" 
            :class="[ item.isSelect ?'shopFont':'' ]"
            v-for="item in footerData"
            v-if="item.statu"
            @click="jump(item.title)"
            >
                <i class="iconfont"
                    :class="item.icon"></i>
                <p v-text="item.name"></p>
        </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: ["busId"],
  data() {
    return {
      footerData: [
        {
          name: "首页",
          icon: "icon-shouye",
          statu: "home",
          title: "index",
          isSelect: false,
          selectArr: ["home","index", "seller/mallindex"]
        },
        {
          name: "分类",
          icon: "icon-fenlei3",
          statu: "group",
          title: "classify",
          isSelect: false,
          selectArr: ["classify"]
        },
        {
          name: "购物车",
          router: "",
          icon: "icon-yinhang",
          statu: "cart",
          title: "cart",
          isSelect: false,
          selectArr: ["cart"]
        },
        {
          name: "我的",
          icon: "icon-ren1",
          statu: "my",
          title: "my",
          isSelect: false,
          selectArr: ["my", "order/list"]
        }
      ],
      isShow: ""
    };
  },
  mounted() {
    // let _nav = window.location.hash.split("/")[1];
    // console.log(_nav);
    // this.isShow = _nav;
    this.isSelect();
  },
  watch: {
    $route(a, b) {
      this.isSelect();
    },
    busId(a, b) {
      if (a != b) {
        this.footerMenuAjax(a);
      }
    }
  },
  methods: {
    //点亮底部菜单
    isSelect() {
      let url = window.location.hash.split("/");
      if (url != null && url.length > 0) {
        let url1 = url[1]; //需要匹配的链接
        let url2 = url[1] + "/" + url[2]; //需要匹配的链接
        //循环底部菜单
        for (let i = 0; i < this.footerData.length; i++) {
          let obj = this.footerData[i];
          let selectArr = obj.selectArr;
          let isSelect = false;
          obj.isSelect = false;
          if (!isSelect) {
            //点亮的链接
            for (let j = 0; j < selectArr.length; j++) {
              if (url1 == selectArr[j] || url2 == selectArr[j]) {
                obj.isSelect = true;
                isSelect = true;
                break;
              }
            }
          }
          this.$set(this.footerData, i, obj);
        }
      }
    },
    //清空点亮
    clearSelect() {
      for (let i = 0; i < this.footerData.length; i++) {
        let obj = this.footerData[i];
        obj.isSelect = false;
        this.$set(this.footerData, i, obj);
      }
    },
    /** 
         * 获取底部菜单
         */
    footerMenuAjax(_busId) {
      let _this = this;
      _busId = _busId || _this.$store.state.busId || null;
      if (_busId == null || _busId == "") {
        return;
      }
      _this.ajaxRequest({
        status: false,
        url: h5App.activeAPI.phonePage_footerMenu_post,
        data: {
          busId: _busId
        },
        success: function(data) {
          let footerMenu = data.data;
          if (footerMenu == null || footerMenu.length == 0) {
             _this.$store.commit("is_show_footer", false);
            return;
          }
          for (var menu in footerMenu) {
            _this.footerData.forEach((itme, index) => {
              if (menu == _this.footerData[index].statu) {
                _this.footerData[index].statu = footerMenu[menu];
              }
            });
          }
          _this.$store.commit("is_show_footer", true);
        }
      });
    },
    /**
         * 跳转路由
         */
    jump(name) {
      this.isShow = name;
      let busId = this.$route.params.busId || this.$store.state.busId;
      let shopId = this.$route.params.shopId || this.$store.state.shopId;
      // console.log(name, shopId, busId);
      if (name == "index") {
        // this.$router.push('/index/'+shopId+'/'+busId);
        this.$parent.getPageId(busId, shopId, true);
      } else if (name == "classify") {
        this.$router.push("/classify/" + shopId + "/" + busId + "/" + "0/k=k");
      } else if (name == "cart") {
        this.$router.push("/cart/" + shopId + "/" + busId + "/0");
      } else if (name == "my") {
        this.$router.push("/my/center/" + busId);
      }
      this.clearSelect();
      this.isSelect();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";

.shop-footer-fixed {
  position: fixed;
  width: 100%;
  z-index: 2;
  .footer-nav,
  .header-nav {
    .ik-box;
    .footer-itme,
    .header-itme {
      position: relative;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(center);
      .ik-box-flex(1);
      .ik-box-orient(vertical);
    }
    a {
      display: block;
      text-align: center;
    }
  }
}
</style>
