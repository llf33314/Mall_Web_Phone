<template>
<div id='app' class="shop-wrapper group-wapper">
    <section class="group-main">
      <div class="group_top shop-textc border" >
          <div class="group_img">
              <default-img :background="a"
                          :isHeadPortrait="0">
              </default-img>
          </div>
          <div class="group_title fs40">
            商品名称
          </div>
          <div class="group_price fs36">团购价：￥30.00</div>
          <div class="group_time shop-bg fs40">
            剩余<em>0</em>天<em class="hour">23</em>时<em class="minute">59</em>分<em class="minute">59</em>秒
          </div>
      </div>
       <div class="group_middle" >
          <div class="group_kaituan border shop-textc fs44 font-weight">
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
            <div class="group-button-yellow fs50">呼唤朋友来参团</div>
         </div>
       </div>
    </section>
    <section class="group_section">
        <div class="title_div fs40 font-weight">其他团购</div>
    </section>
</div>
</template>

<script>
import defaultImg from "components/defaultImg";
export default {
  name: "apply",
  data() {
    return {};
  },
  components: {
    defaultImg
  },
  mounted() {
    // this.loadDatas(); //初始化协商详情数据
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
      _this.ajaxRequest({
        url: h5App.activeAPI.get_pf_apply_remark_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData != null) {
            _this.pfApplayRemark = myData.pfApplayRemark;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
.group-wapper {
  width: 100%;
  height: 100%;
  position: relative;
  .group-main {
    background: #fff;
    .group_top {
      width: 70vw;
      height: auto;
      margin: 0px auto;
      overflow: hidden;
      .group_img {
        width: 100%;
        height: 70vw;
      }
      .group_title {
        margin: 40 /@dev-Width * 1rem 0;
      }
      .group_price {
        margin-bottom: 92 /@dev-Width * 1rem;
      }
      .group_time {
        height: 151 /@dev-Width * 1rem;
        line-height: 151 /@dev-Width * 1rem;
        em {
          background: #cb080b;
          height: 65 /@dev-Width * 1rem;
          padding: 0 10 /@dev-Width * 1rem;
          margin: 0 15/@dev-Width * 1rem;
        }
        em.hour {
          margin-left: 45/@dev-Width * 1rem;
        }
        em.minute {
          margin-left: 10/@dev-Width * 1rem;
        }
      }
    }
    .group_middle {
      width: 100%;
      .group_kaituan {
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
            padding: 10/@dev-Width * 1rem;
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
          padding: 40/@dev-Width * 1rem 0;
          margin: 0px auto;
        }
      }
    }
  }
  .group_section {
    .title_div {
      text-align: center;
      padding: 63/@dev-Width * 1rem 0;
    }
  }
}
.font-weight {
  font-weight: bolder;
}
</style>
