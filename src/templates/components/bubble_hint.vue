<template>
    <div class="bubble" v-show="show" >
      <p>
        <i class="iconfont icon-dui1" v-if=" msg.type == 'success'"></i>
        <i class="iconfont icon-guanbi" v-if=" msg.type == 'error'"></i>
        <i v-if=" msg.type == 'warning'">!</i>
        {{msg.msg}}
      </p>
    </div>
 
</template>
<script>
  module.exports = {
    data: function () {
      return {
        show: false,
        msg: {
          type:'',
          msg:''
        },
      }
    },
    methods: {
      show_tips: function (msg) {
        var _this = this;
        if(msg.type){
           _this.msg= msg;
        }else{
          _this.msg.type= '';
          _this.msg.msg= msg;
        }
        _this.show = true;
        $('.bubble').fadeIn(200);
        setTimeout(function () {
          $('.bubble').fadeOut(200,function(){
            _this.hint_msg = '';
            _this.show = false;
          });
        }, 1500);
      }
    }
  }
//使用
//  this.$root.$refs.bubble.show_tips('最多只能选择3个');//bubble_hint*/
</script>
<style>
  /*气泡提示---------------------------------------------------------------------------------------------*/
  
  .bubble {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  
  .bubble p {
    margin: 70% auto;
    padding: .15rem .2rem;
    color: white;
    white-space: nowrap;
    font-size: 0.28rem;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    display: inline-block;
    border-radius: 5px
    
  }
  .bubble p i{
    font-size: 28px;
    display: block;
    margin: 0 auto;
  }
  /*气泡提示完---------------------------------------------------------------------------------------------*/
</style>