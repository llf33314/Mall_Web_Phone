<template>
  <transition name="slide-fade">
    <div class="amapmap-box ">
        <iframe :src="URL" id="myiframe"></iframe>
    </div>
  </transition>
</template>
<script>


export default  {
  props: ['memAddress'],
  data(){
  return {
      URL:'',//高德地址
      location:'',//获取经纬度
    }
  },
  watch: {
    'memAddress'(a,b){
      console.log(a,b,'memAddress')
    }
  },
  mounted () {
    let _this = this;
    /*eslint-disable no-undef*/
    this.addressGET(this.memAddress,1);
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
     * @param center 经纬度
     */
    init(center){
      let _this = this;
      let keywords = '写字楼,小区,学校';//表示搜索的关键词，支持3个关键词，用英文逗号分隔;（超过3个时取前三个值） 缺省时，默认值：写字楼，小区，学校
      let zoom = 15;    //地图区域的缩放级别，取值范围是3-18，默认值是15
      let radius ='1000';//表示搜索的范围半径，单位为：米。取值范围（1,50000），为空则默认为1000。
      let total = '20';//检索结果条数，默认为20，取值范围1-50。
      let key = '3b73726ac868e5fcf8e26513ce6860d1';
      this.URL  = 'https://m.amap.com/picker/?keywords='+keywords+'&zoom='+zoom+'&center='+center+'&radius='+radius+'&total='+total+'&key='+key;
      
      //console.log(this.URL,'this.URL')
      $('#myiframe').height($('body').height());
      _this.$nextTick(()=>{
           let iframe = document.getElementById('myiframe').contentWindow;
            $("#myiframe").on("load", function(event){//判断 iframe是否加载完成  这一步很重要
                // /console.log("iframe加载完毕");
            });
            document.getElementById('myiframe').onload = function(){
              iframe.postMessage ('hello','https://m.amap.com/picker/');
            };
            window.parent.addEventListener("message", function(e){
              _this.reAddressGET(e.data,_this.memAddress)
            }, false);
      })
    },
    /** 
     * 地理查询地址
     * @param type 1 初始查询 2后期修改
     * @param data 初始化地址
     */
    addressGET(data,type){
      let _this = this;
      let address = data.province + data.city + data.area;
      $.ajax({
        type: "get",
        url: 'https://restapi.amap.com/v3/geocode/geo?key=bf4628347e7c20e886552030722b8f81&address='+address+'&city='+data.city,
        success: function(data){
          //初始化
          if(type == 1){
             if(data.status == 1){
              //查询经纬度成功
              _this.init(data.geocodes[0].location);
              }else{
                  //查询经纬度失败
                  _this.init('');
              }
          }
         
        },
        error:function(){
          //查询经纬度失败
          _this.init('');
        }
      });
    },
    /** 
     * 反地理查询地址 --  查询选中城市地区是否去初始值一样
     * @param address  选中地址
     * @param memAddress  初始值地址
     */
    reAddressGET(address,memAddress){
      //console.log(address,'address',memAddress)
      let _this = this;
       $.ajax({
        type: "get",
        url: 'https://restapi.amap.com/v3/geocode/regeo?key=bf4628347e7c20e886552030722b8f81&location='+address.location+'&poitype=&radius=&extensions=all&batch=false&roadlevel=0',
        success: function(data){
           //查询经纬度
           let newAddress = data.regeocode.addressComponent;
           if(newAddress.province == memAddress.province && newAddress.city == memAddress.city && newAddress.district == memAddress.area){
             //初始值
              address.code=0
              _this.$emit('change',address);
              _this.$emit("update:isShowMap", false);
           }else{
              //新地址
              let newData={
                code:1,
                province:newAddress.province,
                city:newAddress.city,
                area:newAddress.district,
                address:address.address,
                location:address.location,
                name:address.address
              }
              _this.$emit('change',newData);
             _this.$emit("update:isShowMap", false);
           }
        },
        error:function(){
          //查询经纬度失败
          _this.init('');
        }
      });
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
    iframe{
      border: none;
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