<template>
   <section class="goods-selected" >
    <div class="goods-selected-main" >
        <div class="fs40" v-text="'已选 '+data+' '+spec_num+'份 '">
        </div> 
        <i class="iconfont icon-jiantou-copy shopGray"></i>
    </div>
</section>
</template>

<script>
export default {
    props:['row','num'],
    watch: {
        'row'(a,b){
          this.data = a;
        },
        'num'(a,b){
            this.spec_num = a;
        }
    },
    data () {
        return {
            data:'',
            spec_num:''
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
