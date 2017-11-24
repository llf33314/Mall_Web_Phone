<template>
<div class="shop-wrapper  auction-wrapper">
    <div class="agreement-main">
        <section class="agreement-content">
            <p class="agreement-h1 fs40">用户竞拍服务协议</p>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.0.0 - 服务条款的确认和接纳
                    </p>
                    <div class="agreement-txt fs36">
                        网上拍卖平台的各项电子服务的所有权和运作权归深圳市金槌拍卖行有
                        限公司。网上拍卖平台用户完全同意网上拍卖平台所有服务条款并完成注册
                        程序，才能成为网上拍卖平台的正式会员。
                    </div>
                </div>
            </div>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.1.1 - 服务内容 
                    </p>
                    <div class="agreement-txt fs36">
                        会员服务的具体内容由网上拍卖平台根据实际情况提供，网上拍卖平台
                        对其所提供之服务拥有最终解释权。 
                    </div>
                </div>
            </div>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.1.2 -网上拍卖平台向其会员提供相关网络服务，与相关网络服务有关的设
                        备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需
                        的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的
                        手机费）均由会员自行负担。 
                    </p>
                </div>
            </div>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.2.0 -服务条款的修改 
                    </p>
                    <div class="agreement-txt fs36">
                        网上拍卖平台有权在必要时修改服务条款，修改后将更改服务条款底部
                        的更新日期，并通过其他适当方式向会员提示修改内容。会员如不同意修改，
                        可以主动选择取消会员资格；如果会员继续使用网上拍卖平台服务，将被视
                        为接受修改后的服务条款。  
                    </div>
                </div>
            </div>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.3.0 -用户隐私及帐号、密码和安全性
                    </p>
                    <div class="agreement-txt fs36">
                        您注册会员成功后，将得到一个帐号和密码。您应妥善保管该帐号及密
                    码，并对以该帐号进行的所有活动及事件负法律责任。因黑客行为或会员保
                    管疏忽致使帐号、密码被他人非法使用的，网上拍卖平台不承担任何责任。
                    如您发现任何非法使用会员帐号或安全漏洞的情况，请立即与网上拍卖平台
                    联系。 
                    </div>
                </div>
            </div>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.4.0 - 会员权责
                    </p>
                    <div class="agreement-txt fs36">
                        会员有权按照网上拍卖平台规定的程序和要求使用网上拍卖平台向会员
                    提供的各项网络服务，如果会员对该服务有异议，可以与网上拍卖平台联系
                    以便得到及时解决。 
                    </div>
                </div>
            </div>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.4.1 - 会员在申请使用网上拍卖平台网络服务时，必须向网上拍卖平台提供
                        准确的个人资料，如个人资料有任何变动，必须及时更新。 
                    </p>
                </div>
            </div>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.4.2 - -会员须同意接受网上拍卖平台通过电子邮件或其他方式向会员发送
                        最新拍卖信息或其他相关商业信息。
                    </p>
                </div>
            </div>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.4.3 - 会员在网上拍卖平台上发布信息或者利用网上拍卖平台的服务时必须
                        符合国家的法律法规以及国际法的有关规定。 
                    </p>
                </div>
            </div>
            <div class="agreement-text">
                <div class="agreement-itme">
                    <p class="agreement-title fs36">
                        1.4.4 - 会员单独为其发布在网上拍卖平台上信息承担责任。会员若在网上拍
                        卖平台上散布和传播违法信息，网络会员服务的系统记录有可能作为会员违
                        法之证据。  
                    </p>
                </div>
            </div>
        </section>
        <section class="shop-footer">
            <div class="shop-logo"></div>
        </section>
        <section class="auction-footer shop-footer-fixed">
            <div class="auction-buttom fs50 shop-bg" @click="returnAuction">
                    我已阅读并同意
            </div> 
        </section>
    </div>
</div>
</template>

<script>
export default {
  name: "agreement",

  data() {
    return {};
  },
  components: {},
  mounted() {
    this.commonFn.setTitle("用户竞拍服务协议");
    this.$store.commit("show_footer", false); //隐藏底部导航栏
  },
  beforeDestroy() {
    //离开后的操作
    this.$store.commit("show_footer", true); //显示底部导航栏
  },
  methods: {
    returnAuction() {
      let param = this.$route.params;
      let busId = param.busId || sessionStorage.getItem("busId"); //商家id
      let proId = param.proId; //商品id
      let aucId = param.aucId; //拍卖id
      let invId = param.invId;
      this.$router.push(
        "/auction/bond/" +
          busId +
          "/" +
          proId +
          "/" +
          aucId +
          "/" +
          invId +
          "/1"
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixins.less";
@import "../../../assets/css/base.less";
.auction-wrapper {
  width: 100%;
  position: relative;
}
.agreement-main {
  width: 100%;
  position: relative;
  padding-bottom: 160/@dev-Width *1rem;
  .agreement-content {
    width: 100%;
    padding: 30/@dev-Width *1rem 45/@dev-Width *1rem 50/@dev-Width *1rem;
    .agreement-h1 {
      width: 100%;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20/@dev-Width *1rem;
    }
    .agreement-text {
      width: 100%;
      .agreement-title {
        text-align: justify;
      }
      .agreement-txt {
        text-indent: 2em;
        text-align: justify;
      }
    }
  }
  .auction-footer {
    width: 100%;
    .auction-buttom {
      width: 100%;
      height: 158/@dev-Width *1rem;
      .ik-box;
      .ik-box-align(center);
      .ik-box-pack(center);
      color: #fff;
    }
  }
}
</style>
