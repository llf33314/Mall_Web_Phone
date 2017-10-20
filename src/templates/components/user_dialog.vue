<template>
<transition name="dialog">
  <div class="dialog-main" 
       v-show="isShow" 
       v-on:click.self="dialogClose(2)">
    <div class="dialog-content">
      <div class="content-box">
        <h2 class="title show"
            v-if="dialogTitle"
            v-html="dialogTitle"></h2>
        <div class="inquiry"
             v-html="dialogMsg">
        </div>
      </div>
      <div class="btn-box" 
           v-if="btnNum == 2">
        <div class="dialog-btn" 
             v-on:click.stop="dialogConfirm">
             <span class="show"  v-text="btnOne"></span>
        </div>
        <i></i>
        <div class="dialog-btn" 
             v-on:click.stop="dialogClose(1)">
             <span class="show"  v-text="btnTow"></span>
        </div>
      </div>
      <div class="btn-box" 
           v-if="btnNum == 1">
        <div class="dialog-btn-one"
             v-on:click.stop="dialogConfirm">
             <span class="show"  v-text="btnOne"></span>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
  module.exports = {
    data: function () {
      return {
        isShow: false,
        btnNum : 2,
        btnOne: '',
        btnTow: '',
        dialogTitle:'',
        dialogMsg: '我是消息内容？',
        callback: {
          btnOne: '',
          btnTow: ''
        }
      }
    },
    methods: {
      //关闭弹窗
      dialogClose: function (num) {
        this.allowScroll();
        this.isShow = false;
        if(num === 1 && Number(this.btnNum) === 2){
          return this.callback.btnTow && !this.callback.btnTow();
        }
      },
      //确定
      dialogConfirm: function () {
        this.isShow = false;
        this.allowScroll();
        if(this.callback !== undefined &&　this.callback　!== ''){
          return this.callback.btnOne && !this.callback.btnOne();
        }
      },
      /**
       * 允许页面滚动
       */
      allowScroll: function () {
        $(window).unbind("touchmove");
      },
      showDialog: function (msg) {
        let vm = this;
        vm.btnNum = msg.btnNum || 2;
        vm.dialogTitle = msg.dialogTitle;
        vm.dialogMsg = msg.dialogMsg;
        vm.btnOne = msg.btnOne || '确定';
        vm.btnTow = msg.btnTow || '取消';
        vm.callback = msg.callback;
        vm.isShow = true;
      }
    }
  }
</script>
<style scoped>
  .dialog-main {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    -webkit-box-align: center;
    -webkit-box-pack: center;
    display: -webkit-box;
    -webkit-box-sizing: border-box;
  }
  .dialog-content {
      width: 80%;
      position: relative;
      background-color: #fff;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      color: #282828;
      text-align: center;
    
    }
  
  .dialog-main .content-box {
    padding: .6rem .6rem 0 .6rem;
  }
  .dialog-main .title {
    font-size: .36rem;
    padding-bottom: .35rem;
    line-height: inherit;
  }
  .dialog-main .inquiry {
    font-size: .28rem;
    color:rgba(0, 0, 0, 0.8);
    margin-bottom: .5rem;
  }
  .dialog-main .btn-box {
    display: -webkit-box;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    font-size: .3rem;
  }

.dialog-main .dialog-content .btn-box {
  width: 100%;
  height: .9rem;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: -webkit-box;
  -webkit-box-sizing: border-box;
  background-color: #3366cc;
  color: #fff;
  position: relative;
  bottom: -1px;
  font-size: .36rem;
  font-weight: bold;
  border-bottom: 1px solid #3366cc;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius:  10px;
  -moz-border-radius-bottomleft: 10px;
  -moz-border-radius-bottomright: 10px;
  -webkit-border-bottom-left-radius: 10px;
  -webkit-border-bottom-right-radius: 10px;
}

.dialog-main .dialog-btn {
  width:50%;
  height:100%;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: -webkit-box;
  -webkit-box-sizing: border-box;
}
.dialog-main .dialog-btn-one{
  width:100%;
  height:100%;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: -webkit-box;
  -webkit-box-sizing: border-box;
}
.dialog-main .btn-box  i{
  position: absolute;
  top:.15rem;
  height:.6rem;
  width:1px;
  display: block;
  background-color: #fff;
}

  //动画
.dialog-enter-active, 
.dialog-leave-active {
  transition: opacity .5s;
}

.dialog-enter, 
.dialog-leave-active {
  opacity: 0;
}

</style>