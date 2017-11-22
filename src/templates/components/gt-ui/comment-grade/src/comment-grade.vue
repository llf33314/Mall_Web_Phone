<template>
  <div class="comment">
    <span class="pf">
      <span>
        <i class="iconfont icon-pingxing"></i>
        <i class="iconfont icon-pingxing"></i>
        <i class="iconfont icon-pingxing"></i>
        <i class="iconfont icon-pingxing"></i>
        <i class="iconfont icon-pingxing"></i>
      </span>
      <span class="fd">
        <i class="iconfont icon-pingxing" v-for="(item,index) in currentValue" :style="{'width':index==currentValue.length-1?item+'em':''}"></i>
      </span>
    </span>
  </div>
</template>
<script>
  export default {
    name: 'commentGrade',
    props: {
      value: [String, Number],
    },
    data() {
      return {
        currentValue: [],
      }
    },
    watch: {
      value(val){
        if(val>5)val = 5;
        for (let i=0;i<val;i++){
          this.currentValue.push(val-i>1?1:val-i);
        }
      }
    },
    mounted() {
    },
  };
</script>
<style lang="less">
  .comment{
    display: inline-block;
    .pf{
      font-size: 0px;
      display: inline-block;
      overflow: hidden;
      vertical-align: middle;
      position: relative;
    }
    .pf .iconfont{
      font-size: 13px;
      color: #cccccc;
    }
    .pf .fd{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
      white-space:nowrap;
      overflow: hidden;
    }
    .pf .fd .iconfont{
      color: #ffaa0c;
    }
    .pf .fd .iconfont{
      overflow: hidden;
      display: inline-block;
      vertical-align: top;
    }
  }
</style>
