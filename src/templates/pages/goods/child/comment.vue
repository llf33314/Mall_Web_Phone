<template>
  <div class="comment-main">
      <div class="comment-nav border">
          <div class="em-nav fs36">全部</div>
          <div class="em-nav fs36">好评(999+)</div>
          <div class="em-nav fs36">中评(1)</div>
          <div class="em-nav fs36">差评(0)</div>
      </div>
      <div class="comment-no border">
          <p class="fs40 shopGray">暂无差评</p>
      </div>
      <div class="comment-content">
          <div class="comment-item border">
              <div class="comment-user clearfix">
                  <div class="comment-user-img">
                      <default-img :background="background"
                                    :isHeadPortrait="1">
                        </default-img>
                  </div>
                  <div class="comment-user-fr">
                      <p class="comment-user-name fs40">权律二</p>
                      <p class="comment-user-time fs32 shopGray">2017-06-01  15:52:38</p>
                  </div>
              </div>
              <div class="comment-txt fs40">
                  没想到矿泉水也可以这么好喝~
              </div>
              <div class="comment-photo scrollbar clearfix">
                  <div class="comment-img">
                    <default-img :background="background"
                                    :isHeadPortrait="0">
                    </default-img>
                  </div>
              </div>
              <div class="comment-choice">
                  <span class="fs36 shopGray">口味：微甜</span>
                  <span class="fs36 shopGray">规格：500ml</span>
              </div>
              <div class="comment-reply fs32">
                  [商家回复]:亲感谢您选择【权律二的店铺】------请亲们把遇到的问
                  题，或者建议告知我们------请相信【权律二得点偶】我们会为亲解
                  决好的，如有亲的参与和意见我们会越来越好的！祝亲：永远美丽~
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import defaultImg from 'components/defaultImg'
export default {
  components: {
      defaultImg
  },
  data () {
    return {
      background:''
    }
  },
  methods: {


  }
}
</script>

<style lang="less">
 
@import '../../../../assets/css/mixins.less';
@import '../../../../assets/css/base.less';
.comment-main{
    width: 100%;
    position: relative;
    .comment-nav{
        height: 116/@dev-Width *1rem;
        .ik-box;
        .ik-box-pack(justify);
        .ik-box-align(center);
        padding:0 44/@dev-Width *1rem; 
    }
    .comment-no{
        width: 100%;
        text-align: center;
        background: #fff;
        padding-top:  109/@dev-Width *1rem;
        padding-bottom:  46/@dev-Width *1rem;
    }
    .comment-content{
        width: 100%;
        background: #fff;
        .comment-item{
            width: 100%;
            padding: 40/@dev-Width *1rem 27/@dev-Width *1rem;
        }
        .comment-user-img{
            width: 128/@dev-Width *1rem;
            height: 128/@dev-Width *1rem;
            background-size: cover;
            background-position: center;
            .border-radius(100%);
            float: left;
        }
        .comment-user-fr{
            width: 85%;
            float: right;
            padding: 15/@dev-Width*1rem 0;
        }
        .comment-user-name{
            width: 100%;
        }
        .comment-txt{
            width: 100%;
            padding: 20/@dev-Width*1rem 0;
        }
        .comment-photo{
            max-width:200%; 
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            font-size: 0;
            padding-bottom: 20/@dev-Width*1rem;
            height: 330/@dev-Width*1rem;
            .ik-box;
            position: relative;
            .comment-img{
                width: 300/@dev-Width*1rem;
                height: 300/@dev-Width*1rem;
                .border-radius(8px);
                background-size: cover;
                background-position: center;
                margin-right: 30/@dev-Width*1rem;
            }
        }
        .comment-choice{
            width: 100%;
            font-size: 0;
            span{
                margin-right: 58/@dev-Width*1rem;
            }
        }
        .comment-reply{
            width: 100%;
            margin-top: 48/@dev-Width*1rem;
            background: #f2f2f2;
            padding: 30/@dev-Width*1rem;
            text-align: justify;
            .border-radius(2px);
            position: relative;
            &::after{
                content: ' ';
                position: absolute;
                top: -20/@dev-Width*1rem;
                left: 28/@dev-Width*1rem;
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #f2f2f2;
            }
        }
    }
}
::-webkit-scrollbar {width: 0;height: 0;opacity:0;} 
.scrollbar{
    scrollbar-face-color:#fff;
    scrollbar-arrow-color:#fff;
    scrollbar-highlight-color:#fff;
    scrollbar-3dlight-color:#fff;
    scrollbar-shadow-color:#fff;
    scrollbar-darkshadow-color:#fff;
    scrollbar-track-color:#fff;
    scrollbar-base-color:#fff;
}
</style>
