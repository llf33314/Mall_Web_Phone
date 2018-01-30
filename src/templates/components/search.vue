<template>
  <header class="searchbox-main border">
      <div class="header">
          <i class="iconfont icon-sousuo"></i>
          <div class="fs40 input" v-text="text"></div>
      </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
        text: '请输入商品关键词'
    }
  },
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate(){

  	
  },  
  //在挂载开始之前被调用
  beforeMount(){
  	
  
  }, 
  //已成功挂载，相当ready()
  mounted(){
	
  },
  //相关操作事件
  methods: {
	
	
	
      
  }
}
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
.searchbox-main{
    width: 100%;
    font-size: 0;
    background: #fff;
}
.header{
    width: 100%;
    padding: 25/@dev-Width *1rem;
    position: relative;
    color: #87858f;
    .input{
        width: 100%;
        border: 0;
        padding: 20/@dev-Width *1rem;
        padding-right: 0;
        .border-radius(10px);
        background: #f1f1f4;
        padding-left: 80/@dev-Width *1rem;
    }
    .icon-sousuo {
        position: absolute;
        left: 4%;
        top: 35%;
        font-size: 40/@dev-Width *1rem;
    }
}

</style>
