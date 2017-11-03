<template>
    <div class="goods-img-display" id="banner">
        <swipe  :auto="swipeOptions.auto"
                :speed="swipeOptions.speed"
                :defaultIndex="swipeOptions.defaultIndex"
                :continuous="swipeOptions.continuous"
                :showIndicators="swipeOptions.showIndicators"
                :prevent="swipeOptions.prevent"
                :stopPropagation="swipeOptions.stopPropagation"
             @change="handleChange">
            <!-- 这部分放你要渲染的那些内容 --> 
            <swipe-item  v-for="(item,index) in banner"  :key="item[index]">
                <div class="goods-img">
                    <img :src="imgUrl+item.imageUrl">
                </div>
            </swipe-item> 
       </swipe>
        <p class="goods-origin-box">
            <i class="goods-origin " 
            v-for="(img,index) in banner"
            :class="[index == imgSelecte?'img-selecte':'']"></i>
        </p> 
    </div>
</template>
<script>

import { Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/style.css'
export default {
    components: {
        Swipe,SwipeItem
    },
    props: ['banner','imgUrl'],
    data() {  
        return {  
            imgSelecte:0,
            swipeOptions: {
                speed: 300,//	动画持时（毫秒）
                auto: 4000,//	自动播放的时间间隔（毫秒）
                defaultIndex:0,//初始显示的轮播图的索引
                continuous:true,//是否可以循环播放
                showIndicators: false,//	指标的可见度
                prevent:false,//如果preventDefault执行touchstart。适用于某些较低版本的Android浏览器（4.2等）
                stopPropagation:false,//如果stopPropagation执行touchstart。
            },
        }  
    },  
    methods: {
        handleChange(index) {
            this.imgSelecte = index;
        },
    },
    watch: {
        
    },
    computed: { 
    },  
    mounted () {  
        $('#banner').css({
            'height': $('body').width()
        });
        // this.banner.forEach(function(item,i) {
            
        // });
    }  
  
}
</script>
<style lang="less" scoped>
@import url("//unpkg.com/mint-ui/lib/style.css");
@import '../../../../assets/css/mixins.less';
@import '../../../../assets/css/base.less';
.goods-img-display{
        position: relative;
        width: 100%;
        // height: 1130/@dev-Width *1rem;
         margin-bottom: 0;
        .goods-img{
            width: 100%;
            height: 100%;
            .ik-box;
            .ik-box-pack(center);
            .ik-box-align(center);
            img{
                margin: 0 auto;
                display: block;
                max-width: 100%;
                max-height: 100%;
            }
        }
        .goods-origin-box{
            width: 100%;
            text-align: center;
            font-size: 0;
            position: absolute;
            bottom: 5%;
            z-index: 1;
            i{
                display: inline-block;
                width: 8px;
                height: 8px;
                background: #cccccc;
                .border-radius(100%);
                margin: 0 3px;
            }
            .img-selecte{
                background: #e4393c;
                width: 14px;
                .border-radius(20px);
            }
        }
    }
</style>


