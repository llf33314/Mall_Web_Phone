<template>
  <div class="wrapper">
    <!-- <div v-html="style"></div> 主题切换渲染style-->
    <router-view ref="main"/>
    <bubble_hint ref="bubble"></bubble_hint>
    <shop-dialog ref="dialog"></shop-dialog>
    <top ref="top"></top>
    <!-- <loading :is-loading-show="isLoadingShow"></loading> -->
  </div>
</template>

<script>
import bubble_hint from 'components/bubble_hint.vue';//气泡
import loading from 'components/loading.vue';//loading
import shopDialog from 'components/shopDialog.vue';//弹窗
import Top from 'components/Top';//置顶

export default {
    components: {
      'bubble_hint': bubble_hint,
      'loading': loading,
      'shop-dialog': shopDialog,
      'top': Top
    },
    data () {
      return {
        isLoadingShow: false,
        style:''
      }
    },
    created() {

    },
    mounted(){
      // this.style = "<style>.aaa{color:red}</style>"
      this.commonFn.setFontSize();
      //console.log(this,'aaaa')
    },
    methods: {}
}
</script>

<style lang="less">
.wrapper{
  height: 100%;
}
</style>
