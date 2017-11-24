<template>
<div class="shop-wrapper group-wapper">
  <section class="group-main">
      <div class="group-top " :style="{backgroundImage: 'url(' + tuangoubg + ')'}">
          <div class="group-img">
              <default-img :background="a"
                          :isHeadPortrait="0">
              </default-img>
          </div>
          <div class="group-title fs40">
            <p>商品名称</p>
            <div class="group-price fs36 shop-font">团购价：<span class="fs40">￥30</span>.00</div>
          </div>
      </div>
      <div class="group-time fs40 border">
          剩余 <em> 0 </em> 天
          <em >23</em>时
          <em>59</em>分
          <em >59</em>秒
      </div>
      <div class="group-middle" >
        <div class="group-kaituan border shop-textc fs44 font-weight">
          还差<em class="shop-font">2</em>人就要开团啦
        </div>
        <div class="group-items border shop-box-center" >
          <div class="left ">
            <span class="img">
              <default-img :background="a"
                          :isHeadPortrait="0">
              </default-img>
            </span>
            <span class="fs40">悟空</span>
            <span class="fs40 shop-bg group-bgs">团长</span>
          </div>
          <div class="right">
            <span class="fs36">2017-07-12 03:40:56 开团</span>
          </div>
        </div>
        <div class="group-items border shop-box-center" >
          <div class="left ">
            <span class="img">
              <default-img :background="a"
                          :isHeadPortrait="0">
              </default-img>
            </span>
            <span class="fs40">悟空</span>
          </div>
          <div class="right">
            <span class="fs36">2017-07-12 03:40:56 参团</span>
          </div>
        </div>
        <div class="group-join-div">
          <div class="group-button-yellow fs50" @click="isShowShare=true">呼唤朋友来参团</div>
        </div>
      </div>
  </section>
  <section class="group-section">
      <div class="title-div fs40 font-weight">其他团购</div>
      <div class="group-goods-box clearfix">
        <div class="group-goods">
          <div class="group-goods-img">
            <default-img :background="a"
                        :isHeadPortrait="0">
            </default-img>
          </div>
          <div class="group-goods-text">
            <p class="fs42">商品名称商品名称</p>
            <p class="shop-font fs32">3人团：￥<span class="fs40">68</span>.00</p>
            <div class="group-goods-time">
              <span class="fs36">距离结束</span>
              <span class="fs36">0天 23时 59分 59秒</span>
            </div>
        </div>
      </div>
    </div>
  </section>
  <section class="shop-footer-fixed">
      <div class="goods-footer-botton ui-col-2 fs50 shop-yellow"
          style="color:#fff" @click="moreGroupbuy">
          更多拼团
      </div>
      <div class="goods-footer-botton ui-col-2 fs50 shop-bg"
          style="color:#fff">
          我也要参团
      </div>
  </section>
  <!-- 分享 -->
  <section class="grounpShare-main" v-show="isShowShare">
    <div class="grounpShare-bg" :style="{backgroundImage: 'url(' + grounpShare + ')'}">
        <img :src="grounpShare">
    </div>
    <div class="grounpShare-botton-box">
      <div class="grounpShare-botton shop-font" @click="isShowShare=false">
          我知道了
      </div>
    </div>
</section>
</div>
</template>

<script>
import defaultImg from "components/defaultImg";
import tuangoubg from "assets/img/tungoubg.jpg";
import grounpSharebg from "assets/img/grounpShare.png";
export default {
  data() {
    return {
      tuangoubg: tuangoubg,
      grounpShare: grounpSharebg,
      isShowShare: false//是否显示分享
    };
  },
  components: {
    defaultImg
  },
  mounted() {
    // this.loadDatas(); //初始化数据
    this.commonFn.setTitle(Language.title_pifa_apply_msg);
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    loadDatas() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      -this.ajaxRequest({
        url: h5App.activeAPI.title_pifa_apply_msg,
        data: -data,
        success: function(data) {
          let myData = data.data;
          if (myData != null) {
            _this.pfApplayRemark = myData.pfApplayRemark;
          }
        }
      });
    },
    moreGroupbuy(){
      //更多来拼团
      
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
@import "../../../assets/css/common.less";
.group-wapper {
  width: 100%;
  position: relative;
  padding-bottom: 150 /@dev-Width * 1rem;
  .group-main {
    background: #fff;
    .group-top {
      width: 100%;
      background-size: 100% 100%;
      padding-top: 56/@dev-Width * 1rem;
      .group-img {
        width: 70vw;
        height: 70vw;
        margin: 0 auto;
        overflow: hidden;
      }
      .group-title {
        margin: 0 auto;
        padding: 36/@dev-Width * 1rem 0 60/@dev-Width * 1rem;
        width: 70vw;
        background: #fff;
        text-align: center;
        color: #242424;
        line-height: 1;
      }
      .group-price {
        margin-top: 38 /@dev-Width * 1rem;
      }
    }
    .group-time {
      text-align: center;
      height: 200 /@dev-Width * 1rem;
      padding: 62 /@dev-Width * 1rem 0;
      color: #fff;
      background: url("../../../assets/img/tuangou_bg2.jpg")no-repeat;
      background-size: 100% 100%;
      em {
        background: #cb080b;
        display: inline-block;
        width: 62/@dev-Width * 1rem;
        height: 62/@dev-Width * 1rem;
        text-align: center;
        line-height: 66/@dev-Width * 1rem;
        .border-radius(5px);
      }
    }
    .group-middle {
      width: 100%;
      .group-kaituan {
        padding: 40/@dev-Width * 1rem 0;
      }
      .group-items {
        height: 155/@dev-Width * 1rem;
        line-height: 1;
        .left,
        .right {
          font-size: 0;
          span {
            display: inline-block;
            vertical-align: middle;
            margin: 0 10/@dev-Width * 1rem;
          }
          .img {
            width: 108/@dev-Width * 1rem;
            height: 108/@dev-Width * 1rem;
            .border-radius(100%);
            overflow: hidden;
          }
          .group-bgs {
            .border-radius(50px);
            padding: 15/@dev-Width * 1rem 25/@dev-Width * 1rem;
          }
        }
        .left {
          padding-left: 30/@dev-Width * 1rem;
        }
        .right {
          padding-right: 30/@dev-Width * 1rem;
        }
      }
      .group-join-div {
        width: 100%;
        padding: 30/@dev-Width * 1rem 0;
        .group-button-yellow {
          width: 55%;
          .border-radius(50px);
          background-color: #ff8522;
          text-align: center;
          color: #fff;
          // padding: 40/@dev-Width * 1rem 0;
          height: 150/@dev-Width * 1rem;
          line-height: 150/@dev-Width * 1rem;
          margin: 0px auto;
        }
      }
    }
  }
  .group-section {
    .title-div {
      text-align: center;
      padding: 72/@dev-Width * 1rem 0 66/@dev-Width * 1rem;
    }
    .group-goods-box {
      width: 100%;
      padding: 0 7/@dev-Width * 1rem;
      & > div:nth-of-type(2n) {
        margin-right: 0;
      }
    }
    .group-goods {
      float: left;
      width: 49.5%;
      margin-right: 10/@dev-Width * 1rem;
      margin-bottom: 15/@dev-Width * 1rem;
      background: #fff;
      .group-goods-img {
        margin: 2px auto 0;
        width: 540/@dev-Width * 1rem;
        height: 540/@dev-Width * 1rem;
        overflow: hidden;
      }
      .group-goods-text {
        width: 100%;
        padding: 20/@dev-Width * 1rem;
        padding-bottom: 15/@dev-Width * 1rem;
        line-height: 1;
        p:first-child {
          margin-bottom: 60/@dev-Width * 1rem;
        }
      }
      .group-goods-time {
        font-size: 0;
        border: 1px solid #e4393c;
        height: 70/@dev-Width * 1rem;
        .shop-box-justify;
        overflow: hidden;
        margin-top: 15/@dev-Width * 1rem;
        .border-radius(3px);
        span {
          display: block;
          line-height: 70/@dev-Width * 1rem;
          height: 70/@dev-Width * 1rem;
          text-align: center;
        }
        & > span:first-child {
          width: 32%;
          height: 70/@dev-Width * 1rem;
          color: #fff;
          background: #e4393c;
          text-align: center;
        }
        & > span:last-child {
          width: 68%;
          color: #e4393c;
        }
      }
    }
  }
}
.font-weight {
  font-weight: bolder;
}
.shop-footer-fixed {
  width: 100%;
  .shop-box-justify;
  .goods-footer-botton {
    width: 50%;
    height: 135/@dev-Width * 1rem;
    text-align: center;
    line-height: 135/@dev-Width * 1rem;
  }
}
.grounpShare-main {
  width: 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  .grounpShare-bg {
    background-size: 100% 100%;
    img {
      width: 100%;
      height: auto;
      opacity: 0;
    }
  }
  .grounpShare-botton-box {
    width: 100%;
    position: absolute;
    bottom: 293 /@dev-Width * 1rem;
  }
  .grounpShare-botton {
    margin: 0 auto;
    width: 415/@dev-Width * 1rem;
    border: 10/@dev-Width * 1rem solid #f9ddab;
    padding: 50/@dev-Width * 1rem;
    line-height: 1;
    .border-radius(50px);
    background: #fff7e9;
    font-size: 68 /@dev-Width * 1rem;
  }
}
</style>
