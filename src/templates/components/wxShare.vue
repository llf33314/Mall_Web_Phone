<template>
</template>
<script>
//微信分享
import wx from "weixin-js-sdk";

export default {
  props: {
    //分享内容，以及是否开启分享
    shareData: {
      default: {
        jsApiList: [],
        isOpenAllMenu: null
      }
    }
  },
  data: function() {
    return {
      wxObj: null ,//微信参数
      shareObj : null,//分享参数
    };
  },
  watch: {
    shareData(a, b) {
      if (a != null) {
        this.shareObj = a;
        // this.wxShare();
      }
    }
  },
  beforeDestroy() {},
  beforeMount() {
    this.reloadUrl();
  },
  mounted() {
    this.getShareConfigData();
  },
  methods: {
    reloadUrl(){
      if(this.$store.state.firstUrl != location.href && this.$store.state.browerType == 1){
        location.reload();
      }
    },   
    //获取微信分享数据
    getShareConfigData() {
      let _this = this;
      // //只有微信浏览器才有分享
      if(this.$store.state.browerType != 1){
        return;
      }
      _this.ajaxRequest({
        url: h5App.activeAPI.wx_share_get,
        data: {
          url: location.href
        },
        type: "get",
        success: function(data) {
          _this.wxObj = data.data;
          console.log(_this.wxObj,"_this.wxObj")
          _this.wxShare();
        }
      });
    },
    wxShare() {
      let _shareObj = this.shareData;
      let _wxObj = this.wxObj;
      if(_shareObj == null || _wxObj == null){
        return null;
      }
      console.log("---------", _shareObj,"------",_wxObj);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: _wxObj.appid || null, // 必填，公众号的唯一标识
        timestamp: _wxObj.timestamp || null, // 必填，生成签名的时间戳
        nonceStr: _wxObj.nonce_str || null, // 必填，生成签名的随机串
        signature: _wxObj.signature || null, // 必填，签名，见附录1
        jsApiList: _shareObj.jsApiList || [
          "onMenuShareTimeline",
          "onMenuShareAppMessage"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(() => {
        // if (_shareObj.isOpenAllMenu) {
        //   //显示所有功能按钮接口
        //   wx.showAllNonBaseMenuItem();
        // }
        //分享给朋友
        wx.onMenuShareAppMessage({
          title: _shareObj.title || "", // 分享标题
          desc: _shareObj.desc || "", // 分享描述
          link: _shareObj.url || "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: _shareObj.imgUrl || "", // 分享图标
          //   type: _shareObj.desc || "", // 分享类型,music、video或link，不填默认为link
          //   dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });

        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: _shareObj.title || "", // 分享标题
          link: _shareObj.url || location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: _shareObj.imgUrl || "", // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });
      wx.error(function(res) {
        // alert("error");
        // location.reload();
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    }
  }
};
</script>
