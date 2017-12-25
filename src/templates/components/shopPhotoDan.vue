<template>
   <div class="book-photo-wrapper" @click="photo_no()">
      <div class="book-photo-box">
        <div class="img-div" v-if="photoSrc =='' || photoSrc == null">
            <i class="iconfont icon-tupianjiazaizhong-"></i>
        </div>
        <img :src="photoSrc" @error="photoError" v-else>
      </div>
    </div>
</template>
<script>
export default {
  props: ["photo", "isPhoto"],
  data() {
    return {
      photoSrc: ""
    };
  },
  mounted() {
    // this.$nextTick(function() {
    //   this.photo_off(this.photo);
    //   this.allowScroll();
    // });
    this.photo_off(this.photo);
    // this.photoSrc = this.photo;
    //   console.log(this.photoSrc,"this.photoSrc")
  },
  watch: {
    photo() {
      //监听filter参数变化发送请求
      this.photoSrc = this.photo;
      //   console.log(this.photoSrc,"this.photoSrc")
      this.photo_off(this.photo);
    }
  },
  methods: {
    photo_off(url) {
      //截图查看
      let _this = this;
      _this.photoSrc = url;
      let img = new Image();
      let imgWidth, imgHeight;
      img.src = url;
      img.onload = function() {
        imgWidth = this.width;
        imgHeight = this.height;
        if (imgWidth >= imgHeight) {
          $(".book-photo-box img").css({
            width: "100%",
            "max-height": "auto"
          });
        }
        _this.photoSrc = img.src;
      };
      // _this.disableScroll();
    },
    photo_no() {
      //   this.allowScroll();
      this.$emit("update:isPhoto", false);
    },
    photoError(e) {
      this.photoSrc = "";
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixins.less";
@import "../../assets/css/base.less";
.book-photo-wrapper {
  background: rgba(0, 0, 0, 0.9);
  padding: 40 / @dev-Width *1rem 0 (186+96) / @dev-Width *1rem;
  text-align: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .book-photo-box {
    width: 100%;
    height: 100%;
    margin-bottom: 40 / @dev-Width *1rem;
    position: relative;
    .ik-box;
    .ik-box-align(center);
  }
  img {
    margin: 0 auto;
    display: block;
    width: auto;
    max-height: 100%;
  }
  .img-div {
    width: 100%;
    height: 50vh;
    background-color: #fff;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
  }
  .icon-tupianjiazaizhong- {
    font-size: 140 / @dev-Width *1rem;
    color: #d6d6d6;
    display: block;
    height: 200/@dev-Width *1rem;
  }
}
</style>