<template>
   <div class="img-upload">
        <i class="iconfont icon-xiangji"></i>
        <p class="fs36">
                上传凭证(最多3张)
        </p>
        <input type="file" @change="readFile($event)" multiple="false"   accept="image/*" />
    </div>
</template>
<script>

import axios from 'axios';
export default {
    props:['maxNums'],
    data: function () {
        return {
            imgData:[],
            maxNum:3//最多上传图片的数量
        }
    },
    mounted() {
        this.maxNum = this.maxNums
    },
    methods:{
        readFile(e){ 
            let _this = this;
            if(_this.imgData.length > 3){
                _this.$parent.$parent.$refs.bubble.show_tips("图片最多上传"+this.maxNum+"张"); //调用气泡显示
                return;
            }
            //  let _data = {
            //     busId: _this.$store.state.busId, //商家id
            //     url: location.href, //当前页面的地址
            //     browerType: _this.$store.state.browerType, //浏览器类型
            //     file: file
            // };
             let file = e.target.files[0];        
            let formData = new FormData(); //创建form对象
          formData.append('file',file);//通过append向form对象添加数据
          formData.append('busId',_this.$store.state.busId);//添加form表单中其他数据
          formData.append('url',location.href);//添加form表单中其他数据
          formData.append('browerType',_this.$store.state.browerType);//添加form表单中其他数据
          console.log(formData); //FormData私有类对象，访问不到，可以通过get判断值是否传进去

         let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
     // 添加请求头
    axios.post(window.h5App.api+h5App.activeAPI.upload_image_post, formData, config)
        .then(response => {
          if (response.data.code === 1) {
            _this.ImgUrl = response.data.data
          }
          console.log(_this.ImgUrl)
        })






            //  _this.commonFn.ajax({
            //     url: h5App.activeAPI.upload_image_post,
            //     data: {
            //         formData:formData
            //     },
            //     headers: {'Content-Type': 'multipart/form-data'},
            //     success: function(data) {
            //         if (data.code == 1001) {
            //             location.href = data.url;
            //         }
            //         if (data.code != 1) {
            //             _this.$parent.$parent.$refs.bubble.show_tips(data.msg); //调用气泡显示
            //             return;
            //         }
            //     console.log(data)
            //         _this.$emit('imgURL',_this.imgData);
            //     }
            // });
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/mixins.less';
@import '../../assets/css/base.less';
.img-upload{
    //display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover; 
    background-position: center;
    color: #999;
    border: 2px dashed #999;
    .border-radius(5px);
    text-align: center;
    .ik-box;
    .ik-box-align(center);
    .ik-box-pack(center);
    .ik-box-orient(vertical);
    i{
        font-size: 88/@dev-Width *1rem;
    }
    p{
        width: 75%;
    }
    input{
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        top: 0;
        left: 0;
        opacity: 0;
    }
}
</style>
