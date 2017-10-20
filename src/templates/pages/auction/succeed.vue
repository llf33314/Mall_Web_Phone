<template>
  <div id='app' class="shop-wrapper auction-wrapper">
        <section class="bond-main">
            <div class="bond-dui iconfont icon-dui1">
            </div>
            <div class="bond-txt">
                <p class="fs66">报名成功</p>
                <p class="fs46 shopGray">恭喜，报名成功</p>
            </div>
            <div class="bond-button">
                <p class="shop-max-button fs52">继续逛逛</p>
                <p class="shop-max-button fs52">返回首页</p>
            </div>
        </section>
    </div>
</template>

<script>
import divTextarea from 'components/divTextarea'
export default {
    name: 'address',	
    data () {
        return {
            text:'街道门牌信息',
            newText:''
        }
    },
    mounted() {
       //todo 组件 divTextarea数据传出
    },
    components:{
        divTextarea
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
@import '../../../assets/less/auction.less';
</style>
