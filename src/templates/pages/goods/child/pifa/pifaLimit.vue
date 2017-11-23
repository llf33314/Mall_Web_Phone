<template>
  <section class="goods-selected">
    <div class="goods-selected-main" >
        <div class="fs40" v-if="Data.pfType == 1">
            <!--手批-->
            我要批发 :
            <span v-if="Data.pfSetObj.isSpHand == 1 && Data.pfSetObj.spHand != ''">{{Data.pfSetObj.spHand}}</span>
            <span v-else>1</span>手起批
        </div>
        <div class="fs40" v-if="Data.pfType == 2">
            <!--混批-->
            我要批发 : 
            <span v-if="Data.pfSetObj.isHpNum == 1 && Data.pfSetObj.hpNum != ''">{{Data.pfSetObj.hpNum}}件</span>
            <span v-if="Data.pfSetObj.isHpNum == 1 && Data.pfSetObj.isHpMoney == 1">或</span>
            <span v-if="Data.pfSetObj.isHpMoney == 1 && Data.pfSetObj.hpMoney != ''">{{Data.pfSetObj.hpMoney}}元</span>
            <span v-if="Data.pfSetObj.isHpNum ==0 && Data.pfSetObj.isHpMoney == 0">1件</span>
            起混批
        </div> 
        <i class="iconfont icon-jiantou-copy shopGray"></i>
    </div>
</section>
</template>

<script>
export default {
    props:['row'],
    watch: {
      'row'(){
          this.Data = this.row;
      }  
    },
    data () {
        return {
            type: 0,
            Data:{}
        }
    },
    methods:{

    },
    mounted () {
        this.type = this.$route.params.type;
    }

}
</script>

<style>

</style>
