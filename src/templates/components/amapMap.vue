<template>
  <transition name="slide-fade">
    <div class="amapmap-box">
      <el-amap-search-box class="search-box fs44" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
        <el-amap vid="amapDemo" :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
      </el-amap>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
          <li v-for="(item,i) in list" :key="i">{{ item }}</li>
        </ul>
      </mt-loadmore>
    </div>
  </transition>
</template>
<script>
import VueAMap from 'vue-amap';    
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import { Search,Loadmore } from 'mint-ui';
export default {
    props: ['lat', 'lng'],
    data() {
       return {
         value:'',
          zoom: 12,
          center: [121.59996, 31.197646],
          amapManager:'',
          events: {
            init(map) {
              // AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
              //   const marker = new SimpleMarker({
              //     iconLabel: 'A',
              //     iconStyle: 'red',
              //     map: map,
              //     position: map.getCenter()
              //   });
              // });
            }
          }
        };
    },
    components: {
      Search,
      Loadmore
    },
    created () {
      let _this = this;
      this.center=[_this.lat,_this.lng]
      //this.loadPromise()
        // lazyAMapApiLoaderInstance.load().then(() => {
        // // your code ...
        //     this.map = new AMap.Map('amapContainer', {
        //         center: new AMap.LngLat(_this.lat, _this.lng)
        //     });
        // });
        
    },
    watch: {
        searchKey () {
          if (this.searchKey === '') {
              this.placeSearch.clear()
          }
        }
    },
    methods: {
        // 加载更多数据
        loadTop() {
          this.$refs.loadmore.onTopLoaded();
        },
        // 搜索
        handleSearch () {
        
        },
        // 实例化地图
        initMap () {

        },
        loadPromise(){
            let newloadPromise = VueAMap.lazyAMapApiLoaderInstance.load();
        }
    },
    
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