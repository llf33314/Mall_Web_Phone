<template>
<section class="goods-auction">
    <div class="goods-auction-title border ">
        <span class="fs42">拼团玩法</span>
        <span class="fs42">玩法详情
            <i class="icon-jiantou-copy iconfont" style="color:#c7c7cc;vertical-align: middle;" ></i>
        </span>
    </div>
    <div class="goods-group">
        <div class="goods-group-step">
            <em class="fs40">1</em>
            <span class="fs36">付款<br/>开团/参团</span>
            <i class="icon-ziyuan iconfont"></i>
        </div>
        <div class="goods-group-step">
            <em class="fs40">2</em>
            <span class="fs36">邀请好友<br/>支付参团</span>
            <i class="icon-ziyuan iconfont"></i>
        </div>
        <div class="goods-group-step">
            <em class="fs40">3</em>
            <span class="fs36">到达人数<br/>拼团成功</span>
        </div>
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
            data:'',
        }
    },
    methods:{
       
    },
    mounted () {
        console.log(this.row,'row')
    }

}
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
@import  (reference) "~assets/css/common.less";
.goods-group{
    width: 100%;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    padding-right: 30/@dev-Width *1rem;
    .goods-group-step{
        width: 386/@dev-Width *1rem;
        height: 154/@dev-Width *1rem;
        position: relative;
        em{
            .shop-inblock;
            .fs40;
            width: 75/@dev-Width *1rem;
            heigth: 75/@dev-Width *1rem;
            line-height: 75/@dev-Width *1rem;
            background: #e4393c;
            color:#fff;
            margin:5px;
            .border-radius(100%);
            text-align: center;
            vertical-align: top;
        }
        span{
            .shop-inblock;
        }
        i{
            position: absolute;
            right: 35/@dev-Width *1rem;
            color: #e4393c;
            top: 35/@dev-Width *1rem;
            .fs40;
        }
    }
}
</style>

