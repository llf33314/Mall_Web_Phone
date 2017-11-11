<template>
  <footer class="shop-footer-fixed" v-if="isFooter">
    <div class="footer-nav fs36">
        <div class="footer-itme" 
            :class="[ isShow == item.title ?'shopFont':'' ]"
            v-for="item in footerData"
            v-if="item.statu"
            @click="jump(item.title)"
            >
                <i class="iconfont"
                    :class="item.icon"></i>
                <p v-text="item.name"></p>
        </div>
    </div>
  </footer>
</template>
<script>

export default {
    data(){
        return {
            footerData: [
                {
                    name:'首页',
                    icon: 'icon-shouye',
                    statu:'home',
                    title:'home'
                },
                {
                    name:'分类',
                    icon: 'icon-fenlei3',
                    statu:'group',
                    title:'classify'
                },
                {
                    name:'购物车',
                    router:'',
                    icon: 'icon-yinhang',
                    statu:'cart',
                    title:'cart'
                },
                {
                    name:'我的',
                    icon: 'icon-ren1',
                    statu:'my',
                    title:'my'
                }
            ],
            isShow:'',
            isFooter:false
        }
    },
    mounted() {
        this.footerMenuAjax();
        let _nav = window.location.hash.split('/')[1];
        console.log(_nav);
        this.isShow = _nav;
    },
    watch: {
       'router'(){
            let _nav = window.location.hash.split('/')[1];
            this.isShow = _nav;
       } 
    },
    methods: {
        /** 
         * 获取底部菜单
         */
        footerMenuAjax(){
            let _this = this;
            _this.commonFn.ajax({
                'url': h5App.activeAPI.phonePage_footerMenu_post,
                'data':{
                    busId : _this.$store.state.busId
                },
                'success':function(data){
                    let footerMenu = data.data;
                    for(var menu in footerMenu){
                        _this.footerData.forEach((itme,index)=>{
                            if(menu == _this.footerData[index].statu){
                                _this.footerData[index].statu = footerMenu[menu];
                            }
                        })
                    }
                    _this.isFooter = true;
                }
            })
        },
        /**
         * 跳转路由
         */
        jump(name){
            this.isShow = name;
            let busId = this.$route.params.busId;
            let shopId = this.$route.params.shopId;
            console.log(name,shopId,busId);
            if( name == 'home'){
                //this.$router.push('/home/'+shopId+'/'+busId);
            }else if( name == 'classify'){
                this.$router.push('/classify/'+shopId+'/'+busId+'/'+'0/k=k');
            }else if( name == 'cart'){
                this.$router.push('/cart/'+busId+'/0');
            }else if( name=='my'){
                this.$router.push('/my/center/'+busId);
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/mixins.less';
@import '../../assets/css/base.less';

.shop-footer-fixed{
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 2;
    .footer-nav,.header-nav{
        .ik-box;
        .footer-itme,.header-itme{
            position: relative;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(center);
            .ik-box-flex(1);
            .ik-box-orient(vertical);
        }
        a{
            display: block;
            text-align: center
        }
    }
}

</style>
