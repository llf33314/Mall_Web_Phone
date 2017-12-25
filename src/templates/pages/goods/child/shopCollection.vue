<template>
<section class="goods-shop">
    <div class="goods-shop-main clearfix">
        <div class="goods-shop-info">
            <div class="goods-shop-img">
                <default-img :background="imgUrl+data.shopImageUrl"
                    :isHeadPortrait="0">
                </default-img>
            </div>
            <div class="goods-shop-txt">
                <div class="goods-shop-name">
                    <span class="fs46 text-overflow">{{data.shopName}}</span>
                    <em class="em-flag" v-if="data.categoryName">旗舰店</em>
                </div>
                <div class="fs40 shopGray text-overflow">
                    {{data.shopAddress}}
                </div>
            </div>
        </div>
        <div class="goods-shop-rigtn">
            <div class="style-main-border goods-shop-buttom fs42" 
                v-if="!data.isCollect"
                @click="collectProductAjax()">收藏商品
            </div>
            <div class="style-main-border goods-shop-buttom fs42"
                @click="collectProductAjax()"
                v-else>已收藏
            </div>
            <div class="style-main-border goods-shop-buttom fs42" 
            @click="shop()">进店逛逛td
                <!-- (跳首页) -->
            </div>
        </div>
    </div>
</section>
</template>

<script>
import defaultImg from 'components/defaultImg';
export default {
    props:['row','imgUrl'],
    components: {
        defaultImg
    },
    watch: {
        'row'(a,b){
          this.data = a;
        }
    },
    data () {
        return {
            data:''
        }
    },
    methods:{
        collectProductAjax(){
            let _this = this;
            _this.ajaxRequest({
                'url': h5App.activeAPI.phoneProduct_collectProduct_post,
                'data':{
                    busId: _this.$store.state.busId,
                    url: _this.$store.state.loginDTO_URL,
                    browerType: _this.$store.state.browerType,
                    productId :  _this.$route.params.goodsId,
                },
                'success':function(data){
                    if(data.code == 0){
                        _this.data.isCollect = !_this.data.isCollect;
                        if(_this.data.isCollect){
                            _this.$parent.$refs.bubble.show_tips('收藏成功');
                        }else{
                            _this.$parent.$refs.bubble.show_tips('取消成功');
                        }
                    }
                } 
            })
        },
        /**
        进店逛逛
         */
        shop(){
            
        }
    },
    mounted () {
        
    }

}
</script>

<style>

</style>
