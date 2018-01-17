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
import EXIF from "exif-js";
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
    console.log(EXIF, "EXIF");
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
      let file_type = e.target.name;
      this.xuanzhuan(file[0], file_type);
    },
    upload(file, file_type) {
      this.$store.commit("is_show_loading", true);
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
    },
    //旋转图片
    xuanzhuan(f, file_type) {
      let _this = this;
      //图片方向角
      let Orientation = null;
      let oReader = new FileReader();
      //获取照片方向角属性，用户旋转控制
      EXIF.getData(f, function() {
        EXIF.getAllTags(this);
        Orientation = EXIF.getTag(this, "Orientation");
      });
      oReader.onload = function(e) {
        var image = new Image();
        let fd = new FormData();
        image.src = e.target.result;
        image.onload = function() {
          var expectWidth = this.naturalWidth;
          var expectHeight = this.naturalHeight;

          if (
            this.naturalWidth > this.naturalHeight &&
            this.naturalWidth > 800
          ) {
            expectWidth = 800;
            expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
          } else if (
            this.naturalHeight > this.naturalWidth &&
            this.naturalHeight > 1200
          ) {
            expectHeight = 1200;
            expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
          }
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = expectWidth;
          canvas.height = expectHeight;
          ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
          var base64 = null;
          if (_this.checkAndroid()) {
            // 修复android
            /*var encoder = new JPEGEncoder();
               base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);*/
            base64 = e.target.result;
          } else {
            //修复ios
            //如果方向角不为1，都需要进行旋转
            if (Orientation != "" && Orientation != 1) {
              switch (Orientation) {
                case 6: //需要顺时针（向左）90度旋转
                  _this.rotateImg(this, "left", canvas);
                  break;
                case 8: //需要逆时针（向右）90度旋转
                  _this.rotateImg(this, "right", canvas);
                  break;
                case 3: //需要180度旋转
                  _this.rotateImg(this, "right", canvas); //转两次
                  _this.rotateImg(this, "right", canvas);
                  break;
              }
            }
            base64 = canvas.toDataURL("image/jpeg", 0.8);
          }
          _this["img_" + file_type] = base64;
          fd.append("file", f);
          _this.upload(fd, file_type);
        };
      };
      oReader.readAsDataURL(f);
    },
    //对图片旋转处理
    rotateImg: function(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      var min_step = 0;
      var max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      var height = img.height;
      var width = img.width;
      var step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      var degree = step * 90 * Math.PI / 180;
      var ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    checkAndroid() {
      let s = this.commonFn.isSystem();
      if (s == "ios") {
        return false;
      }
      return true;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
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
