<template>
  <transition name="slide-fade">
    <iframe :src="URL"></iframe>
    <!-- <div class="amapmap-box ">
     <div id="map-container"> </div>
    </div> -->
      <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
          <li v-for="(item,i) in list" :key="i">{{ item }}</li>
        </ul>
      </mt-loadmore> -->
  </transition>
</template>
<script>
import AMap from 'AMap';
import AMapUI from 'AMapUI';

import { Search,Loadmore } from 'mint-ui';
export default  {
  props: ['lat', 'lng'],
  data(){
  return {
     URL:''
    }
  },
  mounted () {
    /*eslint-disable no-undef*/
    this.init();
      var iframe = document.getElementById('test').contentWindow;
      document.getElementById('test').onload = function(){
        iframe.postMessage('hello','https://m.amap.com/picker/');
      };
      window.addEventListener("message", function(e){
        alert('您选择了:' + e.data.name + ',' + e.data.location)
      }, false);
  },
  methods: {
    /** 
     * 搜索
     */
    searchOption(){

    },
    /**  
     * 接收
    */
    onSearchResult(){

    },
    /** 
     * 初始
     */
    init(){
      let keywords = '';//表示搜索的关键词，支持3个关键词，用英文逗号分隔;（超过3个时取前三个值） 缺省时，默认值：写字楼，小区，学校
      let zoom = '';    //地图区域的缩放级别，取值范围是3-18，默认值是15
      let center = '';//格式为（经纬，纬度）;
      let radius ='';//表示搜索的范围半径，单位为：米。取值范围（1,50000），为空则默认为1000。
      let total = '';//检索结果条数，默认为20，取值范围1-50。
      let key = '3b73726ac868e5fcf8e26513ce6860d1';
      this.URL  = 'https://m.amap.com/picker/?keywords=parameter1&amp;zoom=parameter2&amp;center=parameter3&amp;radius=parameter4&amp;total=parameter5&key=3b73726ac868e5fcf8e26513ce6860d1'
      
    }
  }
}

</script>

<style lang="less" scoped>
.amapmap-box{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    border: 1px solid red;
    .search{
      width: 100%;
      border: 1px solid red
    }
    .el-vue-search-box-container{
      width: 100%;
    }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>