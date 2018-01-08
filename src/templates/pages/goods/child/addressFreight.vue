<template>
<section class="goods-address">
    <div class="goods-address-main border" v-if="data.memberAddress != null">
        <div class="fs40 goods-address-txt text-overflow">
            <i class="iconfont icon-dingwei style-main-font"></i>
            送至：{{data.memberAddress}}
        </div>
        <!-- <i class="iconfont icon-jiantou-copy shopGray"></i> -->
    </div>
    <div class="shopGray fs40 goods-address-postage">
        运费 : <span v-text="data.freightMoney == null || data.freightMoney == 0 ? '免运费': data.freightMoney"></span>
    </div>
</section>
</template>

<script>
export default {
    props:['row'],
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

    },
    mounted () {
        
    }

}
</script>

<style>

</style>
