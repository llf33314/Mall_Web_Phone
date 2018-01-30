<template>
  <div class="comment-main">
      <div class="comment-nav border" v-if="isShow == 1">
        <div class="em-nav fs36" 
            @click="commentAjax('','评论',countMap.all)">全部({{countMap.all}})</div>
        <div class="em-nav fs36" 
            @click="commentAjax(1,'好评',countMap.hao)">好评({{countMap.hao}})</div>
        <div class="em-nav fs36" 
            @click="commentAjax(0,'中评',countMap.zhong)" >中评({{countMap.zhong}})</div>
        <div class="em-nav fs36"
            @click="commentAjax(-1,'差评',countMap.cha)" >差评({{countMap.cha}})</div>
      </div>
      <div class="comment-no" v-if="isShow == 0">
          <p class="fs40 shopGray">暂无{{textNo}}</p>
      </div>
      <div class="comment-content" v-if="isShow == 1">
          <div class="comment-item border" v-for="item in commentList">
              <div class="comment-user clearfix">
                  <div class="comment-user-img">
                      <default-img :background="item.headimgurl"
                                    :isHeadPortrait="1" 
                                    :size="'0.6rem'">
                        </default-img>
                  </div>
                  <div class="comment-user-fr">
                      <p class="comment-user-name fs40">{{item.nickname}}</p>
                      <p class="comment-user-time fs32 shopGray">{{item.createTime}}</p>
                  </div>
              </div>
              <div class="comment-txt fs40">
                  {{item.content}}
              </div>
              <div class="comment-photo scrollbar clearfix" v-if="item.is_upload_image == 1">
                  <div class="comment-img" v-for="img in item.imageList">
                    <default-img :background="imgUrl+img.imageUrl"
                                    :isHeadPortrait="0">
                    </default-img>
                  </div>
              </div>
              <div class="comment-choice" v-if="item.product_specificas">
                    <span class="fs36 shopGray" v-for="specList in item.specList ">
                      {{specList.name}}: {{specList.value}} 
                    </span>
              </div>
              <div class="comment-reply fs32" v-if="item.is_rep == 1" v-html="'[商家回复]:'+item.replyContent">
              </div>
          </div>
      </div>
  </div>
</template>

<script>


export default {
  components: {
  },
  data () {
    return {
        countMap:{
            hao: 0,
            zhong: 0,
            cha: 0
        },
        commentList:'',
        isShow : -1,
        textNo: '',
        imgUrl:'',
        path:''
    }
  },
  methods: {
    /**
     * 查询商品评价接口（商品详情页面）
     */
    commentAjax(feel,name,count){
        let _this = this;
        _this.textNo = name||'评论';

        if(count===0) return;
        
        _this.ajaxRequest({
        'url': h5App.activeAPI.phoneProduct_getProductComment_post,
        'data':{
            busId:_this.$route.params.busId,
            productId :  _this.$route.params.goodsId,
            feel: feel || ''
        },
        'success':function(data){
            
            if(!data.data.commentList){
                _this.isShow = 0;
                return
            }
            _this.isShow = 1;
            _this.imgUrl = data.imgUrl;
            _this.path = data.path;
            
            //表情图片处理
            data.data.commentList.forEach((item,i)=>{
                if(item.replyContent){
                    data.data.commentList[i].replyContent = _this.commonFn.emoji(item.replyContent,_this.path);
                }
            });
            
            if(name){
                //切换改变值
                _this.commentList = data.data.commentList;
                return;
            }
            //初始值全部
            _this.commentList = data.data.commentList;
            let countMap = data.data.countMap;
            _this.countMap = {
                hao: countMap.hao || 0,
                zhong: countMap.zhong || 0,
                cha: countMap.cha || 0,
            };
            _this.countMap.all= (_this.countMap.hao+_this.countMap.zhong+_this.countMap.cha) || 0,
            console.log(_this.countMap,'2countMap')
        } 
      })
    }
  },
  mounted () {
      this.commentAjax();
  }
}
</script>

<style lang="less">
 
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
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
        // background: #fff;
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
            .border-radius(100%);
            overflow: hidden; 
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
                border: 1px solid #eee;
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
            img{
                width: 42/@dev-Width*1rem;
                height: 42/@dev-Width*1rem;
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
