<template>
    <div class="bubble" v-show="show" >
      <div class="success_p"  v-if="msg.type == 'success'"><p><i class="iconfont icon-dui1" ></i>{{msg.msg}}</p></div>
      <div v-else class="bubble_div">
        <i class="iconfont icon-guanbi" v-if=" msg.type == 'error'"></i>
        <i v-if=" msg.type == 'warning'">!</i>
        {{msg.msg}}
      </div>
    </div>
 
</template>
<script>
module.exports = {
  data: function() {
    return {
      show: false,
      msg: {
        type: "",
        msg: ""
      }
    };
  },

  computed: {
    listenshowpage1() {
      return this.$store.state.errorMsg;
    }
  },
  watch: {
    listenshowpage1(a, b) {
      if (a != null && a != b) {
        this.show_tips(a);
      }
    }
  },
  methods: {
    show_tips: function(msg) {
      var _this = this;
      if (msg.type) {
        _this.msg = msg;
      } else {
        _this.msg.type = "";
        _this.msg.msg = msg;
      }
      _this.show = true;
      $(".bubble").fadeIn(200);
      setTimeout(function() {
        $(".bubble").fadeOut(200, function() {
          _this.hint_msg = "";
          _this.show = false;
        });
      }, 1500);
    }
  }
};
//使用
//  this.$root.$refs.bubble.show_tips('最多只能选择3个');//bubble_hint*/
</script>
<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
/*气泡提示---------------------------------------------------------------------------------------------*/

.bubble {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  text-align: center;
  .bubble_div {
    display: inline-block;
  }
  .bubble_div,
  .success_p {
    margin: 70% auto;
    padding: 0.15rem 0.2rem;
    color: white;
    white-space: nowrap;
    font-size: 0.28rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);

    border-radius: 5px;
    i {
      font-size: 28px;
      display: block;
      margin: 0 auto;
    }
  }
}

.success_p {
  width: 2.58rem;
  height: 2.58rem;
}
.success_p {
  .ik-box;
  .ik-box-pack(center);
  .ik-box-align(center);
  .icon-dui1 {
    font-size: 1.15rem !important;
    margin-bottom: 15/@dev-Width *1rem !important;
  }
}
/*气泡提示完---------------------------------------------------------------------------------------------*/
</style>