<template>
<section class="goods-address">
    <div class="goods-address-main border">
        <div class="fs40 goods-address-txt text-overflow">
            <i class="iconfont icon-dingwei shopFont"></i>
            送至：{{data.memberAddress}}
        </div>
        <i class="iconfont icon-jiantou-copy shopGray"></i>
    </div>
    <div class="shopGray fs40 goods-address-postage">
        运费 :{{data.freightMoney}}
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
