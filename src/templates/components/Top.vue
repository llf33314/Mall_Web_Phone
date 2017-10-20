<template>
   <section class="top-box" v-if="isShow">
        <i class="iconfont icon-zhiding" v-if=" scroll >= 300"
            @click="top()"></i>
        <em class="icon-kefu"
            @click="qqUrl()"></em>
    </section>
</template>
<script>

export default {
    data: function () {
        return {
            isShow:false,//用vuex 获取
            scroll:'',
            QQ:''
        }
    },
    mounted() {
        let _this = this
        $(window).bind('scroll', function () {
            //if ($(window).scrollTop() > 0 && $(window).scrollTop() >= ($(document).height() - $(window).height()) - 1000) {
               _this.scroll = $(window).scrollTop();
            //}
        });
        this.qqAjax()
    },
    methods: {
        top(){
            $(document.documentElement).animate({ 
                scrollTop: 0 
                },200); 
            $(document.body).animate({ 
                scrollTop: 0 
                },200); 
        },
        qqUrl(){
            window.location.href ='http://wpa.qq.com/msgrd?v=3&amp;uin='+this.QQ+'&amp;site=qq&amp;menu=yes'
        },
        /**
         * 客服QQ
         */
        qqAjax(){
            let _this = this ;
            console.log(this,'11111');
            console.log(this.$parent.$route,'2222');
            _this.commonFn.ajax({
                'url': h5App.activeAPI.phonePage_getCustomer_post,
                'data':{
                    shopId : _this.$route.params.shopId //todo 参数没有
                },
                'success':function(data){
                    console.log(data)
                }
            })
        },
        // showTop(){
        //     let vm = this;
        //     vm.isShow = true;
        // }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/mixins.less';
@import '../../assets/css/base.less';
.top-box{
    position: fixed;
    z-index: 10;
    font-size: 0;
    line-height: 1;
    width: 123/@dev-Width *1rem;
    color: #b2b2b2;
    text-align: center;
    bottom: 240/@dev-Width *1rem;
    right: 40/@dev-Width *1rem;
    i{
        display: block;
        font-size: 116/@dev-Width *1rem ;
        margin-bottom: 28/@dev-Width *1rem;
    }
    .icon-kefu{
        display: block;
        .ik-icon('../../assets/img/icon/kefu.png', 110/@dev-Width *1rem , 110/@dev-Width *1rem ,100%,100%)
    }
}

</style>
