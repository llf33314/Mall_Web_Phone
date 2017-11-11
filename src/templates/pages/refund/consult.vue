<template>
    <div id='app' class="shop-wrapper consult-wrapper">
        <div class="consult-main">
            <!--buy买家
                system系统
                sell卖家-->
            <div class="consult-item buy">
                <div class="consult-time fs32">
                    2017-02-27 15:22
                </div>
                <div class="consult-content">
                    <div class="consult-title fs56">
                        卖家发起了退货并退款申请
                    </div>
                    <div>
                        <div class="consult-txt">
                            <p class="fs46">退货地址：广东省惠州市惠城区东平桥东街道赛格大厦 10楼1004室,13288888888</p>
                            <p class="fs46" 退款说明：请将配件全数寄回并保证</p>
                            <p class="fs46">商家电话：13288888888</p>
                        </div>
                        <div class="consult-txt2">
                            <p class="fs46">退款金额:7,199.00元</p>
                            <p class="fs46">• 退回微信 <span>7,199.00元</span></p>
                        </div>
                        <div class="consult-footer">
                            <div class="consult-botton fs46">修改退款申请</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 <script>
import defaultImg from "components/defaultImg";
import filte from "../../../lib/filters";
export default {
  components: {
    defaultImg
  },
  data() {
    return {
      busId: this.$route.params.busId, //商家di
      returnId: this.$route.params.returnId, //退款id
      returnData: {} //初始化数据
    };
  },
  mounted() {
    this.loadDatas(); //初始化协商详情数据
    this.commonFn.setTitle("协商详情");
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
        browerType: _this.$store.state.browerType, //浏览器类型
        returnId: _this.returnId //退款id
      };
      _this.commonFn.ajax({
        url: h5App.activeAPI.return_log_post,
        data: _data,
        success: function(data) {
          if (data.code == 1001) {
            location.href = data.url;
          }
          if (data.code != 1) {
            _this.$parent.$refs.bubble.show_tips(data.msg); //调用气泡显示
            return;
          }
          _this.returnData = data.data; //返回数据
          console.log(_this.returnData);
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
/**------vars------*/

.consult-wrapper {
  width: 100%;
  padding: 0.26666667rem 0.39333333rem;
  position: relative;
}
.consult-wrapper .consult-main {
  width: 100%;
}
.consult-wrapper .consult-item {
  width: 100%;
  margin-bottom: 0.26666667rem;
  position: relative;
}
.consult-wrapper .consult-item .consult-time {
  margin: 0 auto;
  background: #ededed;
  width: 30%;
  text-align: center;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  color: #bdbdbd;
  margin-bottom: 0.26666667rem;
}
.consult-wrapper .consult-item .consult-content {
  font-size: 0;
  width: 100%;
  padding: 0 0.26rem;
  position: relative;
}
.consult-wrapper .consult-item .consult-content > div:last-child {
  border-bottom: 0;
}
.consult-wrapper .consult-item .consult-content .consult-title {
  padding: 0.25333333rem 0;
}
.consult-wrapper .consult-item .consult-content .consult-txt {
  padding: 0.18666667rem 0;
}
.consult-wrapper .consult-item .consult-content .consult-txt p {
  line-height: 1.6em;
}
.consult-wrapper .consult-item .consult-content .consult-txt2 {
  margin: 0.13333333rem 0;
  border: 2px dotted #fff;
  padding: 0 0.13333333rem;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.consult-wrapper .consult-item .consult-content .consult-txt2 p {
  line-height: 3em;
  border-bottom: 1px dashed #fff;
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: box;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  box-pack: justify;
}
.consult-wrapper .consult-item .consult-content .consult-txt2 p span {
  display: block;
}
.consult-wrapper .consult-item .consult-content .consult-txt2 > p:last-child {
  border-bottom: 0;
}
.consult-wrapper .consult-item .consult-content::before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  width: 0;
  height: 0;
}
.consult-wrapper .consult-item::after {
  content: "";
  position: absolute;
  display: block;
  top: 0.08666667rem;
  width: 0.17333333rem;
  height: 0.17333333rem;
  background: #dbdbdb;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
}
.consult-wrapper .consult-item::before {
  color: #dbdbdb;
  position: absolute;
  display: block;
  top: 0;
  left: 0.26666667rem;
  font-size: 0.24rem;
}
.consult-wrapper .consult-item .consult-footer {
  width: 100%;
  text-align: right;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.26666667rem 0;
}
.consult-wrapper .consult-item .consult-footer .consult-botton {
  display: inline-block;
  padding: 5px;
  border: 1px solid #fff;
  color: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.consult-wrapper .buy .consult-content {
  color: #666666;
  background: #ededed;
}
.consult-wrapper .buy .consult-content::before {
  right: -9px;
  border-top: 10px solid #ededed;
  border-right: 10px solid transparent;
}
.consult-wrapper .buy .consult-title {
  border-bottom: 1px solid #dbdbdb;
}
.consult-wrapper .buy::after {
  display: none;
}
.consult-wrapper .sell .consult-content,
.consult-wrapper .system .consult-content {
  color: #fff;
}
.consult-wrapper .sell .consult-content .consult-title,
.consult-wrapper .system .consult-content .consult-title {
  border-bottom: 1px solid #fff;
}
.consult-wrapper .sell .consult-content::before,
.consult-wrapper .system .consult-content::before {
  left: -9px;
  border-left: 10px solid transparent;
}
.consult-wrapper .sell .consult-content {
  background: #f18246;
}
.consult-wrapper .sell .consult-content::before {
  border-top: 10px solid #f18246;
}
.consult-wrapper .sell::before {
  content: "卖家";
}
.consult-wrapper .system .consult-content {
  background: #52a3cc;
}
.consult-wrapper .system .consult-content::before {
  border-top: 10px solid #52a3cc;
}
.consult-wrapper .system::before {
  content: "系统消息";
}
</style>
