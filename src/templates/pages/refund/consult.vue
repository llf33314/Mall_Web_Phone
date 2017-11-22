<template>
    <div id='app' class="shop-wrapper consult-wrapper" >
        <div class="consult-main" v-if="returnArr != null && returnArr.length > 0">
            <!--buy买家
                system系统
                sell卖家-->
            <div class="consult-item buy" v-for="refund in returnArr" 
              :class="[{'buy':refund.operator==0},{'sell':refund.operator==1},{'system':refund.operator==2}]">
                <div class="consult-time fs32">
                   {{refund.createTime | formatNotM}}
                </div>
                <div class="consult-content">
                    <div class="consult-title fs56">
                        {{refund.statusContent }}
                    </div>
                  <div v-if="refund.getData == 0 && refund.remark != null">
                        <div class="consult-txt">
                            <p class="fs46" v-html="refund.remark"></p>
                        </div>
                    </div>

                    <div v-if="refund.getData > 0 && refund.remark != null">
                        <div class="consult-txt">{{refund.remark}}
                            <p class="fs46" v-for="(obj,index) in refund.remark">{{index}}：{{obj}}</p>
                        </div>
                    </div>
                    <!-- 显示按钮 -->
                    <div class="consult-footer" v-if="refund.isShowReturnWuLiuButton == 1">
                        <div class="consult-botton fs46">退款申请</div>
                    </div>
                </div>
            </div>
        </div>
        <content-no :statu="status" :errorMsg="errorMsg" v-if="(returnArr == null || returnArr.length == 0 && status != -1)"></content-no>
    </div>
</template>
 <script>
import defaultImg from "components/defaultImg";
import contentNo from "components/contentNo";
import filte from "../../../lib/filters";
export default {
  components: {
    defaultImg,
    contentNo
  },
  data() {
    return {
      busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家di
      returnId: this.$route.params.returnId, //退款id
      returnArr: [], //初始化数据
      status: -1,
      errorMsg: "暂无协商详情"
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
      _this.ajaxRequest({
        url: h5App.activeAPI.return_log_post,
        data: _data,
        status: false,
        success: function(data) {
          if (data.data == null || data.data.length == 0) {
            _this.status = 1;
            return;
          }
          _this.returnArr = data.data; //返回数据
          console.log(_this.returnArr, "_this.returnArr");
          _this.returnArr.forEach((item, index) => {
            console.log(item.remark, "remark");
            if (item.retHandlingWay == 2) {
              //我要退款退货
              item.refundType = "退货并退款";
            } else {
              //我要退款
              item.refundType = "仅退款";
            }
          });
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
