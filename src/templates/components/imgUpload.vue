<template>
   <div class="img-upload">
        <i class="iconfont icon-xiangji"></i>
        <p class="fs36">
                上传凭证(最多{{maxNum}}张)
        </p>
        <input type="file" @change="readFile($event)" @click="imageValidate" multiple="true"  accept="image/*" />
    </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["maxNums", "imgURL"],
  data: function() {
    return {
      imgData: [],
      maxNum: 3 //最多上传图片的数量
    };
  },
  mounted() {
    if (this.maxNums > 0) {
      this.maxNum = this.maxNums;
    }
    this.imgData = this.imgURL;
  },
  methods: {
    imageValidate() {
      console.log(this.imgData.length + "--" + this.maxNum);
      if (this.imgData.length >= this.maxNum) {
        this.$parent.$parent.$refs.bubble.show_tips(
          "图片最多上传" + this.maxNum + "张"
        ); //调用气泡显示
        return false;
      }
    },
    readFile(e) {
      let _this = this;
      if (_this.imgData.length >= _this.maxNum) {
        _this.$parent.$parent.$refs.bubble.show_tips(
          "图片最多上传" + this.maxNum + "张"
        ); //调用气泡显示
        return;
      }
      let file = e.target.files;
      //创建form对象
      let formData = new FormData();
      formData.append("busId", _this.$store.state.busId); //添加form表单中其他数据
      if (file != null && file.length > 0) {
        for (let i = 0; i < file.length; i++) {
          formData.append("file", file[i]); //通过append向form对象添加数据
        }
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let url = window.h5App.api + h5App.activeAPI.upload_image_post;
      // 添加请求头
      axios.post(url, formData, config).then(response => {
        let data = response.data;
        if (data.code == 1001) {
          location.href = data.url;
        }
        if (data.code != 1) {
          _this.$parent.$refs.bubble.show_tips(data.msg); //调用气泡显示
          return;
        }
        if (data.code == 1) {
          let _imageUrl = data.data;

          _this.imgData = _imageUrl.split(",");

          _this.$emit("returnUrl", _this.imgData);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
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
  input {
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
