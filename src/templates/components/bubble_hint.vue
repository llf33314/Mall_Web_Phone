<template>
    <div class="bubble" v-show="show">
      <p>{{hint_msg}}</p>
    </div>
 
</template>
<script>
  module.exports = {
    data: function () {
      return {
        show: false,
        hint_msg: '',
        msg_queue: []
      }
    },
    methods: {
      show_tips: function (msg) {
        var self = this;
        self.hint_msg = msg;
        self.show = true;
        $('.bubble').fadeIn(200);
        setTimeout(function () {
          $('.bubble').fadeOut(200,function(){
            self.hint_msg = '';
             self.show = false;
          });
        }, 1000);
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
    background: rgba(0, 0, 0, .8);
    display: inline-block;
    border-radius: 5px
  }
  
  /*气泡提示完---------------------------------------------------------------------------------------------*/
</style>