<template>
  <section>
    <transition name="msgbox-bounce">
      <div class="mint-msgbox" v-show="value" :style="{width:width+'px',height:height+'px'}">
        <iframe :src="materialUrl"  :width="width" :height="height" class="material"></iframe>
      </div>
    </transition>
  </section>
</template>
<script>
  import Popup from '../../util/popup';
  export default {
    mixins: [ Popup ],
    data() {
      return {
        materialUrl:'',
    }
    },
    props: {
      imageboxUrl:{
        type: String
      },
      modal: {
        default: true
      },
      selecType:{
        default: false
      },
      width: {
        default:820
      },
      height: {
        default:500
      },
      url: {
        type: String,
        default: ''
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      }
    },
    methods: {
      doClose() {
        this.value = false;
        this._closing = true;
        this.onClose && this.onClose();
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;
        if(window.image){
          window.image='';
          delete window.image;
        }
        if(window.go_back){
          window.go_back='';
          delete window.go_back;
        }
        if (!this.transition) {
          this.doAfterClose();
        }
      },
      handleAction(action) {
        var callback = this.callback;
        this.value = false;
        callback(action);
      },
    },
  }

</script>
<style lang="less">
  .mint-msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 85%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
  }
  .msgbox-bounce-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
  .msgbox-bounce-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }
</style>
