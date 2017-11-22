<template>
    <div class="mycomment-wrapper">
        <div class="mycomment-item">
            <div class="item-top">
                <p class="item-spec-time shopGray">
                    <span class="fs36">规格：128g,玫瑰金</span>
                    <span class="fs36">2017-11-3  11：06</span>
                </p>
                <div class="item-comment fs44">
                    很好用，差评
                </div>
                <div class="item-comment-photo clearfix">
                    <div class="comment-img">
                        <default-img :background="a"
                                    :isHeadPortrait="0">
                        </default-img>
                    </div>
                </div>
            </div>
            <div class="item-center clearfix">
                <div class="comment-img">
                    <default-img :background="a"
                                :isHeadPortrait="0">
                    </default-img>
                </div>
                <div class="item-center-text">
                    <p class="text-overflow fs42">Apple iPhone 7 Plus (A1661) 128GB 玫瑰Apple iPhone 7 Plus (A1661) 128GB 玫瑰</p>
                    <p class="fs40">￥7,199.00</p>
                    <p class="fs40 shop-font">差评</p>
                </div>
            </div>
            <div class="item-bottom">
                <div class="comment-reply fs36"  v-html="'[商家回复] : '+' 亲感谢您选择【权律二的店铺】------请亲们把遇到的问题，或者建议告知我们------请相信【权律二得点偶】我们会为亲解决好的，如有亲的参与和意见我们会越来越好的！祝亲：永远美丽~'">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import defaultImg from "components/defaultImg";
export default {
  name: "mycomment",

  data() {
    return {
        
    };
  },
  components: {
    defaultImg
  },
  mounted() {
   
  },
  beforeDestroy() {
   
  },
  methods: {
    //初始化样式
    loadDatas() {
      let _this = this;
      let _data = {
        busId: _this.busId, //商家id
        url: location.href, //当前页面的地址
        browerType: _this.$store.state.browerType //浏览器类型
      };
      _this.ajaxRequest({
        url: h5App.activeAPI.is_apply_seller_post,
        data: _data,
        success: function(data) {
          let myData = data.data;
          if (myData == null) {
            return;
          }
          console.log(myData, "myData");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
.mycomment-wrapper{
    width: 100%;
    .mycomment-item{
        line-height: 1;
        width: 100%;
        background: #fff;
        padding: 30 /@dev-Width * 1rem ; 
        margin-bottom: 30 /@dev-Width * 1rem ;
        font-size: 0;
        .item-top{
            width: 100%;
            padding: 0 20 /@dev-Width * 1rem ; 
        }
        .item-center{
            width: 100%;
            background: #f5f5f5;
            padding: 15 /@dev-Width * 1rem ; 
        }
        .item-bottom{
            width: 100%;
            position: relative;
        }
        .item-spec-time{
            .ik-box;
            .ik-box-pack(justify);
            .ik-box-align(center);
            span{
                display: block;
            }
        }
        .item-comment{
            color:#000;
            padding: 40 /@dev-Width * 1rem 0; 
        }
        .item-comment-photo{
            width: 100%;
            &>div:last-of-type{
                margin-right: 0;
            }
            margin-bottom: 40 /@dev-Width * 1rem;
        }
        .comment-img{
            float: left;
            width: 232 /@dev-Width * 1rem; 
            height: 232 /@dev-Width * 1rem;
            border: 1px solid #ededed;
            margin-right: 30 /@dev-Width * 1rem;
            overflow: hidden;
        }
        .item-center-text{
            width: 74%;
            float:right;
            padding-top: 15/@dev-Width * 1rem;
            &>p{
                width: 100%;
                margin-bottom: 45 /@dev-Width * 1rem;
            }
            &>p:last-child{
                margin-bottom: 0
            }
        }
        .comment-reply{
            width: 100%;
            margin-top: 48/@dev-Width*1rem;
            background: #f2f2f2;
            padding: 30/@dev-Width*1rem;
            text-align: justify;
            .border-radius(2px);
            position: relative;
            line-height: 1.5em;
            &::after{
                content: ' ';
                position: absolute;
                top: -20/@dev-Width*1rem;
                left: 28/@dev-Width*1rem;
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #f2f2f2;
            }
            img{
                width: 42/@dev-Width*1rem;
                height: 42/@dev-Width*1rem;
            }
        }
    }
}
</style>
