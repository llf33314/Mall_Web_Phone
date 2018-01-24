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
                <div class="goods-shop-name" :class="{'text-overflow':!data.categoryName}">
                    <span class="fs46" :class="{'text-overflow':data.categoryName}">{{data.shopName}}</span>
                    <em class="em-flag" v-if="data.categoryName">旗舰店</em>
                </div>
                <div class="fs40 shopGray text-overflow">
                    {{data.shopAddress}}
                </div>
            </div>
        </div>
        <div class="goods-shop-rigtn" v-if="isErrors">
            <div class="style-main-border goods-shop-buttom fs42" 
                v-if="!data.isCollect"
                @click="collectProductAjax()">收藏商品
            </div>
            <div class="style-main-border goods-shop-buttom fs42"
                @click="collectProductAjax()"
                v-else>已收藏
            </div>
            <div class="style-main-border goods-shop-buttom fs42" 
            @click="toShop()">进店逛逛
            </div>
        </div>
    </div>
</section>
</template>

<script>
import defaultImg from 'components/defaultImg';
export default {
    props:['row','imgUrl','isErrors'],
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
                            _this.$store.commit("error_msg", '收藏成功');
                        }else{
                            _this.$store.commit("error_msg", '取消成功');
                        }
                    }
                } 
            })
        },
        /**
        进店逛逛
         */
        toShop(){
            let busId = this.$route.params.busId;
            let shopId = this.$route.params.shopId;
            this.$parent.$parent.getPageId(busId,shopId,true);
        }
    },
    mounted () {
        
    }

}
</script>

<style>

</style>
