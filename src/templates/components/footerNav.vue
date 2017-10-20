<template>
  <footer class="shop-footer-fixed">
    <div class="footer-nav fs36">
      <div class="footer-itme" :class="{ shopFont: isHome }">
        <a :href="footer_href">
          <i class="iconfont icon-shouye"></i>
          <p>首页</p>
        </a>
      </div>
      <div class="footer-itme" :class="{ shopFont: isPage }">
        <a :href="footer_href">
          <i class="iconfont icon-fenlei3"></i>
          <p>分类</p>
        </a>
      </div>
      <div class="footer-itme" :class="{ shopFont: isShop }">
        <a :href="footer_href">
          <i class="iconfont icon-yinhang"></i>
          <p>购物</p>
        </a>
      </div>
      <div class="footer-itme" :class="{ shopFont : isMy }">
        <a :href="footer_href">
          <i class="iconfont icon-ren1"></i>
          <p>我的</p>
        </a>
      </div>
    </div>
  </footer>
</template>
<script>

export default {
    props:['navshow'],
        data: function () {
            return {
                active: 'shop-font',
                isHome: false,
                isPage: false,
                isShop: false,
                isMy: false,
                footer_href: 'footer_href'
        }
    },
    mounted() {
        var _this = this;
        console.log(_this.navshow);
        switch(_this.navshow){
            case 'home':
                _this.isHome=true;
            break;
            case 'classify':
                _this.isPage=true;
            break;
            case 'shop':
                _this.isShop=true;
                break;
            case 'my':
                _this.isMy  =true;
            break;
        }
    },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/mixins.less';
@import '../../assets/css/base.less';

.shop-footer-fixed{
    position: fixed;
    width: 100%;
    background: #fff;
    .footer-nav,.header-nav{
        .ik-box;
        .footer-itme,.header-itme{
            position: relative;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(center);
            .ik-box-flex(1);
            .ik-box-orient(vertical);
        }
        a{
            display: block;
            text-align: center
        }
    }
}

</style>
