<template>
<section class="goods-auction" >
    <div class="goods-auction-title border " >
        <span class="fs42">竞拍玩法</span>
        <span class="fs42">玩法详情
            <i class="icon-jiantou-copy iconfont" style="color:#c7c7cc;vertical-align: middle;" ></i>
        </span>
    </div>
    <div class="goods-auction-rule">
        <span ><em>1</em>出价竞拍</span>
        <span ><em>2</em>获拍转单</span>
        <span ><em>3</em>支付订单</span>
        <span ><em>4</em>竞拍成功</span>
    </div> 
</section>
</template>

<script>

export default {
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
