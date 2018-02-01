<template>
    <transition name="sidebar">
        <div class="sidebar-goods">
            <div class="Slide">
                <div class="classify-title ">
                    {{name}}分类
                </div>
                <!--其他分类-->
                <div class="classify-goods clearfix">
                    <div class="goods-item" v-for="(item,index) in goodsData"
                    :key="index" 
                    @click="goods_jump(item.group_name)">
                        <div class="goods-img">
                            <default-img :background="imgurl+item.image_url"
                                :isHeadPortrait="0" 
                                :size="'0.8'">
                            </default-img>
                        </div>
                        <p class="fs36" v-text="item.group_name"></p>
                    </div>
                </div>
                <!--全部商品-->
                
            </div>
            <more :is-more="isMore"></more>
        </div>   
    </transition>  
</template>
<script>
import more from 'components/more.vue';//加载更多
export default {
    components: {
        more
    },
    props:['imgurl','goodsData','name'],
    data() {
        return {
            path:'',
            imgUrl :'',
            webPath :'',
            isMore: 1,//控制没有更多的显示
            background:'',
        }
    },
    mounted(){

    },
    methods: {
        goods_jump(e){
            let type = this.$store.state.type || this.$route.params.type || 0;//活动类型
            let shopId = this.$store.state.shopId || 'shopId';//店铺id
            let busId = this.$store.state.busId || 'busId';//店铺id

            this.$store.commit('mutationData',{keywords:e});
            this.$router.push('/classify/'+shopId+'/'+busId+'/'+type+'/'+e);

            this.$emit('isContentNav',e)
        },

    }
}
</script>
<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';

.sidebar-goods{
    right: 0;
    height: 100%;
    .calc-w(1242-295,1242,100%);
    float: right;
    padding: 30/@dev-Width *1rem 32/@dev-Width *1rem 0;
    position: relative;
    overflow: hidden;
    background: #f0f2f5;
    .Slide{
        width: 100%;
        height: 97%;
        overflow-y: auto;
        overflow-x: hidden;
        margin-bottom: 1.2rem;
        -webkit-overflow-scrolling: touch;
    }
    .classify-title{
        width: 100%;
        font-size: 42/@dev-Width *1rem;
        font-weight: bold;
        padding: 25/@dev-Width *1rem 0;
    }
    .classify-goods,.whole-goods{
        width: 93%;
        background: #fff;
        padding: 25/@dev-Width *1rem;
        position: relative;
        &::before{
            content: '';
            display: block;
            width: 100%;
            position: absolute;
            bottom: 25/@dev-Width *1rem;
            left: 0;
            height: 3px;
            background: #fff;
        }
        .goods-item,.whole-item{
            font-size: 0;
            float: left;
            width: 33.333%;
            padding: 20/@dev-Width *1rem;
            border-bottom: 1px solid #f3f5f7;
            border-right: 1px solid #f3f5f7;
            p{
                text-align: center;
                padding: 10/@dev-Width *1rem 0;
            }
        }
        .goods-img,.whole-img{
            margin: 0 auto;
            //width: 210/@dev-Width *1rem;
            height: 210/@dev-Width *1rem;
            display: block;
            background-size: cover;
            background-position: center; 
            margin-bottom: 10/@dev-Width *1rem;
        }
    }
    .classify-goods>div:nth-child(3n){
            border-right:0;
    }
    .whole-goods{
        .whole-item{
            width: 50%;
            p{
                text-align: left;
            }
        }
        .whole-img{
            width: 330/@dev-Width *1rem;
            height: 330/@dev-Width *1rem;
            overflow: hidden;
        }
        &>div:nth-child(2n){
            border-right:0;
        }
    }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.sidebar-enter-active {
  transition: all .3s ease;
}
.sidebar-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.sidebar-enter, .sidebar-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
