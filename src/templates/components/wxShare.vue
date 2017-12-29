<template>
    <div></div>  
</template>
<script>
//微信分享
import wx from "weixin-js-sdk";

export default {
  props: {
    //微信分享参数
    wxData: {
      default: null
    },
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
      shareObj: null,//分享内容
      wxObj: null//微信分享必要的参数
    };
  },
  watch: {
    wxData(a, b) {
      // console.log(a, "wxData");
      if (a != null) {
        this.wxObj = a;
        this.load();
      }
    },
    shareData(a, b) {
      if (a != null) {
        // console.log(a,"shareData")
        this.shareObj = a;
        this.load();
      }
    }
  },
  beforeDestroy() {},
  mounted() {
    // console.log(this.shareData, "this.shareData");
  },
  methods: {
    load() {
      let _wxObj = this.wxObj;
      let _shareObj = this.shareObj;
      if (_shareObj == null || _wxObj == null) {
        return;
      }
      // alert(_shareObj.url);
      // console.log(_wxObj, "_wxObj", _shareObj, "_shareObj");

      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: _wxObj.appid, // 必填，公众号的唯一标识
        timestamp: _wxObj.timestamp, // 必填，生成签名的时间戳
        nonceStr: _wxObj.nonce_str, // 必填，生成签名的随机串
        signature: _wxObj.signature, // 必填，签名，见附录1
        jsApiList: _shareObj.jsApiList || [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(() => {
        if (_shareObj.isOpenAllMenu) {
          //显示所有功能按钮接口
          wx.showAllNonBaseMenuItem();
        }
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
          link: _shareObj.url || "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: _shareObj.imgUrl || "", // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    }
  }
};
</script>
