<template>
<section class="goods-prove">
    <span class="fs40" >
        <i class="iconfont icon-chenggong shopGreen" v-if="data.stoType"></i>
        {{data.stoType}}
    </span>
    <span class="fs40" v-if="data.isSecuritytrade">
        <i class="iconfont icon-chenggong shopGreen"></i>
        担保交易
    </span>
    <span class="fs40">
        <i class="iconfont icon-chenggong shopGreen"></i>
        线下门店
    </span>
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
