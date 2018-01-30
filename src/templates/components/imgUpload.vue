<template>
  <div class="upload-main-div">
    <div class="img-upload" v-if="styleType == 1">
        <i class="iconfont icon-xiangji"></i>
        <p class="fs36">
                上传凭证(最多{{maxNum}}张)
        </p>
        <input type="file" @change="readFile($event)" @click="imageValidate"  accept="image/*" /><!-- multiple="true"-->
    </div>
    <div class="update-div iconfont icon-jiaimg" v-if="styleType == 2">
      <input type="file" @change="readFile($event)" @click="imageValidate" accept="image/*" />
    </div>
  </div>
</template>
<script>
//import EXIF from "exif-js";
import axios from "axios";
export default {
  props: ["maxNums", "imgURL", "styles", "index"],
  data: function() {
    return {
      imgData: [],
      maxNum: 3, //最多上传图片的数量
      styleType: 1
    };
  },
  mounted() {
    if (this.maxNums > 0) {
      this.maxNum = this.maxNums;
    }
    this.imgData = this.imgURL;
    if (this.styles != null) {
      this.styleType = this.styles;
    }
  },
  methods: {
    imageValidate() {
      if (this.imgData != null) {
        if (this.imgData.length >= this.maxNum) {
          this.$store.commit("error_msg", "图片最多上传" + this.maxNum + "张"); //调用气泡显示
          return false;
        }
      }
    },
    readFile(e) {
      let file = (e.srcElement || e.target).files;
      let _this = this;

      if (this.imgData != null) {
        if (_this.imgData.length + file.length > _this.maxNum) {
          _this.$store.commit("error_msg", "图片最多上传" + this.maxNum + "张"); //调用气泡显示
          return;
        }
      }
      this.$store.commit("is_show_loading", true);
      console.log(file, "file");
      //创建form对象
      let formData = new FormData();
      formData.append("busId", _this.$store.state.busId); //添加form表单中其他数据
      //多个图片上传;
      if (file != null && file.length > 0) {
        for (let i = 0; i < file.length; i++) {
          formData.append("file", file[i]); //通过append向form对象添加数据
        }
      }
      formData.append("file", file); //通过append向form对象添加数据
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let url = window.h5App.api + h5App.activeAPI.upload_image_post;
      // 添加请求头
      axios.post(url, formData, config).then(response => {
        this.$store.commit("is_show_loading", false);
        let data = response.data;
        if (data.code == 1001) {
          location.href = data.url;
          return;
        }
        if (data.code != 0) {
          _this.$store.commit("error_msg", data.msg); //调用气泡显示
          return;
        }
        let _imageUrl = data.data;

        _this.imgData = _imageUrl.split(",");
        let returndata = [_this.imgData];
        if (_this.index != null) {
          returndata[returndata.length] = _this.index;
        }
        _this.$emit("returnUrl", returndata);
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
.upload-main-div {
  width: 100%;
  height: 100%;

  .img-upload {
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
    i {
      font-size: 88/@dev-Width *1rem;
    }
    p {
      width: 75%;
    }
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .update-div {
    position: relative;
  }
}
</style>
