<template>
    <div class="goods-img-display" id="banner">
        <swipe  :auto="swipeOptions.auto"
                :speed="swipeOptions.speed"
                :defaultIndex="swipeOptions.defaultIndex"
                :continuous="swipeOptions.continuous"
                :showIndicators="swipeOptions.showIndicators"
                :prevent="swipeOptions.prevent"
                :stopPropagation="swipeOptions.stopPropagation"
             @change="handleChange">
            <!-- 这部分放你要渲染的那些内容 --> 
            <swipe-item  v-for="(item,index) in banner"  :key="item[index]">
                <div class="goods-img" >
                    <a :href="item.returnUrl"  v-if="item.returnUrl != ''">
                      <img :src="imgUrl+item.imageUrl" :class="[imgCla == 'cla-img'?'cla-img':'img']" v-if="item.imageUrl != ''">
                    </a>
                    <img :src="imgUrl+item.imageUrl" :class="[imgCla == 'cla-img'?'cla-img':'img']" v-else-if="item.imageUrl != ''">
                    <div v-else >
                      <i class="iconfont icon-tupianjiazaizhong-"></i>
                    </div>
                </div>
            </swipe-item> 
       </swipe>
        <p class="goods-origin-box" v-if="banner.length > 1">
            <i class="goods-origin " 
            v-for="(img,index) in banner"
            :class="[index == imgSelecte ?style:'']"
            :key="index"></i>
        </p> 
    </div>
</template>
<script>
import { Swipe, SwipeItem } from "mint-ui";
import "mint-ui/lib/style.css";
export default {
  components: {
    Swipe,
    SwipeItem
  },
  props: ["banner", "imgUrl", "height", "imgCla","colorStyle"],
  data() {
    return {
      imgSelecte: 0,
      swipeOptions: {
        speed: 300, //	动画持时（毫秒）
        auto: 4000, //	自动播放的时间间隔（毫秒）
        defaultIndex: 0, //初始显示的轮播图的索引
        continuous: true, //是否可以循环播放
        showIndicators: false, //	指标的可见度
        prevent: false, //如果preventDefault执行touchstart。适用于某些较低版本的Android浏览器（4.2等）
        stopPropagation: false //如果stopPropagation执行touchstart。
      },
      style : "img-selecte"
    };
  },
  methods: {
    handleChange(index) {
      this.imgSelecte = index;
    }
  },
  watch: {},
  computed: {},
  mounted() {
    let _height = "";
    this.height == null
      ? (_height = $("body").width())
      : (_height = this.height);
    $("#banner").css({
      height: _height
    });
    this.style = this.colorStyle || "img-selecte";
  }
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/mixins.less";
@import "../../../../assets/css/base.less";
.goods-img-display {
  position: relative;
  width: 100%;
  // height: 1130/@dev-Width *1rem;
  margin-bottom: 0;
  .goods-img {
    width: 100%;
    height: 100%;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    position: relative;
    img {
      margin: 0 auto;
      display: block;
      max-width: 100%;
    }
    .img{
         max-height: 100%;
    }
    .cla-img {
      //新加的
      transform: translateY(50% 50%) !important;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%) !important;
      transform: translate(-50%, -50%) !important;
    }
    .icon-tupianjiazaizhong-{
      font-size: 300 /@dev-Width *1rem;
      color: #d6d6d6;
    }
  }
  .goods-origin-box {
    width: 100%;
    text-align: center;
    font-size: 0;
    position: absolute;
    bottom: 5%;
    z-index: 1;
    i {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #cccccc;
      .border-radius(100%);
      margin: 0 3px;
    }
    .img-selecte {
      background: #e4393c;
      width: 14px;
      .border-radius(20px);
    }
    .style-main-bg{
       width: 14px;
      .border-radius(20px);
    }
  }
}
</style>


