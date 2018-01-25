<template>
<div class="classify-main">
    <header class="classify-header">
        <div class="header-search" @click="search">
            <input class="fs40" placeholder="搜索商品" 
             v-model="keyWord">
            <i class="iconfont icon-sousuo shop"></i>
        </div>
        <div class="header-nav fs40">
            <div @click="showNav()">
                分类
                <i class="iconfont icon-fenlei2" style="font-size:14px; "></i>
                <!-- sidebar_a, #sidebar_b -->
            </div>
            <div :class="[sort =='new'?'shop-font':'']" 
                @click="switchProduc('new')">
                最新
            </div>
            <div :class="[sort =='sale'?'shop-font':'']" 
                @click="switchProduc('sale')"> 
                销量
            </div>
            <div class="price"
                @click="switchProduc('price')">
                <span :class="[sort =='price'?'shop-font':'']">价格</span>
                <span style="color: #ccc;">
                  <i class="iconfont icon-paixu2" 
                  :class="{'shop-font':desc_num == 0}"></i>  
                  <i class="iconfont icon-paixu" 
                  :class="{'shop-font':desc_num == 1}"></i> 
                </span>
            </div>
            <div>
                <i class="icon-fenglei" 
                 @click="listToggle"
                 v-if="isList">
                </i>
                <i class="icon-fenglei2" 
                    @click="listToggle('isList')"
                    v-else>
                </i> 
            </div>
        </div>
    </header>
    <section class="classify-content-nav" v-if="isNav" :class="{'padding-bottom-clear' : !$store.state.isShowFooter}">
        <ul class="classify-nav" :class="{'navshow':isNav}">
            <li class="fs42 " 
                v-for="(item,index) in classNav"
                :class="[selectedClass == index?'selected':'']" 
                v-text="item.group_name"
                @click="selected(index,item.group_id,item.is_child,item.group_name)"
                :key="index">
            </li>
        </ul>
        <sidebar-b :imgurl="imgUrl" 
                    :goodsData="classGoods"
                    :name="group_name" 
                    v-if="isGoods"
                    @isContentNav="ContentNav">
        </sidebar-b>
    </section>
    <section class="clearfix" 
            :class="[isList?'classify-content1':'classify-content2']" 
            v-if="subList !=='' ">
        <div class="classify-item" v-for="(goods,index) in subList"
            @click="goods_jump(goods)"
            :key="index">
            <div class="classify-img" >
                <default-img :background="goods.image_url"
                            :isHeadPortrait="0">
                </default-img>
            </div>
            <div class="classify-txt">
                <p  class="fs42 " 
                    :class="[isList?'text-overflow':'',goods.pro_name.length>30?'text-more-overflow':'']">
                    <em class="em-tag" v-if="goods.pro_label">{{goods.pro_label}}</em>{{goods.pro_name}}
                </p>
                <div class="classify-money">
                    <p class="fs32 shop-font">
                        <span v-if=" type == 1">团购:￥</span>
                        <span v-else-if=" type == 4 ">当前价:￥</span>
                        <span v-else-if=" type == 6 ">预售:￥</span>
                        <span v-else-if=" type == 7 ">批发:￥</span>
                        <span v-else>￥</span>
                        <span class="fs42">{{goods.price[0]}}</span>.{{goods.price[1]}}
                        <span v-if="type == 5">粉币</span>
                    </p>
                    <p class="fs32 shopGray">销量 :{{goods.sale_total}}</p>
                </div>
                <count-down :times="goods.times"
                ></count-down>
            </div>
        </div>
    </section>
    <goods-no v-if="subList==''"></goods-no>
    <more :is-more="isMore"></more>
</div>
</template>
<script>

import defaultImg from 'components/defaultImg'//默认图片
import more from 'components/more.vue';//加载更多
import goodsNo from 'components/goodsNo.vue';//加载更多
import sidebarB from './classify_child/sidebarB';//侧导航
import countDown from './classify_child/countDown';//倒计时

export default {
    components: {
        defaultImg,
        more,
        goodsNo,
        sidebarB,
        countDown
    },
    data () {
        return {
            productList:{},
            path:'',
            webPath:'',
            imgUrl:'',
            subList:[],//商品
            type: 0,//0/1.团购 3.秒杀 4.拍卖 5 粉币 6预售 7批发
            isList: true,//超出部分显示隐藏
            sort :'new',//默认最新商品，最新，销量，价格
            desc_num : -1,//排序显示
            isMore: 1,//控制没有更多的显示
            curPage:1,//分页
            keyWord:'',//关键词
            classNav:{},//分类菜单
            isNav:false,//分类菜单显示
            selectedClass:-1,
            classGoods:{},//分类子集
            footershow: 'classify',
            isGoods: false,//分类子集商品显示
            saleMemberId:0,//销售员id
            groupId:null,
        }
    },
    watch: {
          // 如果路由有变化，会再次执行该方法
          "$route":'setTitle'
    },
    methods: {
        //加载更多
        loadMore: function () {
            console.log('加载更多');
            this.curPage++; //请求页数

            let pageCount = this.productList.pageCount;//总页数

            if(this.curPage > pageCount){
                this.isMore = 3;
                return
            }
            if (this.isMore == 2) {
                return;
            }
            this.isMore = 2;
            this.productAjax({
                sort: this.sort,
                curPage: this.curPage,
                type : this.$route.params.type,
                groupId: this.groupId
            });
        },
        /**
         * 切换列表样式
        **/
        listToggle(e){
            if( e === 'isList' ) return this.isList = true;
            this.isList = false;
        },
        /**
         * 跳转页面
         */
        search(){
            let type = this.$route.params.type ;
            console.log(type,'typetype')
            let shopId = this.$route.params.shopId || this.$store.state.shopId;
            let busId = this.$route.params.busId || this.$store.state.shopId;
            let keyWord = this.keyWord || this.$store.state.keywords ||this.$route.params.keywords
            let url = '/search/'+busId+'/'+type+'/'+keyWord;
            let desc = this.$route.params.desc;
            if(this.commonFn.isNotNull(desc)){
                url += "/"+desc;
            }
            this.$router.push(url)
        },
        /** 
         * 显示侧导航
         */
        showNav(){
            if(!this.isNav){
                this.isNav = true;
                $('.wrapper').css({
                    'overflow':'hidden'
                })
                return
            }
            this.isNav = false;
            $('.wrapper').removeAttr("style");
        },
        /**
         * 商品搜索接口
         */
        productAjax(data){
            let _this = this;
            let _data = {
                // 'loginDTO':  JSON.stringify(_this.$store.state.loginDTO),
                'url':    _this.$store.state.loginDTO_URL,
                'browerType':    _this.$store.state.browerType,
                'ucLogin': 1,//不需要登陆
                'shopId':	 _this.$store.state.shopId ,
                'busId'	:    _this.$store.state.busId,
                'groupId':	data.groupId || '',
                'sort' : data.sort || 'new',    //new最新 || price销量 || sale价格
                'isDesc':	data.isDesc || '',//排序 1、升序 -1 降序	可不传
                'searchContent':	data.searchContent||'',//搜索内容	可不传
                'type':    data.type|| 0,  //	类型，1.团购 3.秒杀 4.拍卖 5 粉币 6预售 7批发	可不传
                'curPage': data.curPage ||''//	当前页	可不传
            }
            if(this.commonFn.isNotNull( this.saleMemberId) &&  this.saleMemberId > 0){
                _data.saleMemberId =  this.saleMemberId;
                this.$parent.setSaleMemberId(this.saleMemberId);
            }
            this.ajaxRequest({
                'status':false,
                'url': h5App.activeAPI.phoneProduct_productAll_post,
                'data':_data,
                'success':function(data){
                    if(data.code == 1){//接口失败显示
                        _this.subList = [];
                        return
                    }
                    _this.isMore = 1;
                    _this.productList = data.data.productList;

                    let newSubList = data.data.productList.subList;//商品数组
                    newSubList.forEach((item,index)=>{
                        item.price = _this.commonFn.moneySplit(item.price)//价钱显示效果
                    })

                    if (_this.curPage === 1) {//第一页数据
                        _this.subList = newSubList;
                    } else {
                        _this.subList = _this.subList.concat(newSubList) || [];//拼接多页数据
                    }

                    _this.path = data.path;
                    _this.imgUrl = data.imgUrl;
                    _this.webPath = data.webPath;
                }
            })
        },
        /**
         * 切换最新，销量，价格
         * @param sort 列表类型
         * @param desc 排序 1、升序 -1 降序
         */
        switchProduc(sort){
            let _this = this,desc;
            _this.isNav = false;
            if(sort === 'price'){//排序判断
                desc = this.desc_num;
                this.desc_num > 0 ? this.desc_num = 0 : this.desc_num = 1 ;
            }else{
                this.desc_num = -1 ;
            }
            this.sort = sort;
            this.productAjax({
                sort : sort,
                isDesc : _this.desc_num,
                curPage: 1,
                type :  _this.$route.params.type,
                groupId: _this.groupId
            });
            this.curPage = 1
        },
        /**
         * 页面初始
         */
        setTitle(){
            //1.团购 3.秒杀 4.拍卖 5 粉币 6预售 7批发
            let _this = this;
            this.type = _this.$route.params.type
            let  title = {1:'团购',3:'秒杀',4:'拍卖',5:'粉币',6:'预售',7:'批发'}
            _this.commonFn.setTitle(title[this.type] || '分类详情');
            let _keyword = this.$route.params.keywords || this.$store.state.keywords ;
            _keyword === 'k=k' ?_this.keyWord = '':_this.keyWord = _keyword || '';

            _this.curPage = 1;

            this.productAjax({
                sort: 'new',
                curPage: _this.curPage,
                type : _this.$route.params.type,
                searchContent: _this.keyWord
            });
        },
        /**
         * 商品分类接口 分类和侧导航和子集接口
         */
        classAllAjax(groupId){
            let _this = this ;
            this.ajaxRequest({
                'url': h5App.activeAPI.phoneProduct_classAll_post,
                'data':{
                    shopId : _this.$store.state.shopId,
                    busId : _this.$store.state.busId,
                    groupId : groupId || ''
                },
                'success':function(data){
                    _this.isMore = 1;
                    if(groupId){
                        _this.classGoods = data.data;
                    }else{
                        _this.classNav = data.data;
                        let all = {
                            group_id:'',
                            group_name:'全部',
                            is_child:0,
                            shop_id:''
                        }
                        _this.classNav.unshift(all);//添加对象到数组第一个
                    }
                    _this.path = data.path;
                    _this.imgUrl = data.imgUrl;
                    _this.webPath = data.webPath;
                }
            })
        },
        /** 
         * 选择类型
         * @param child 判断子集条件
         * @param Id    group_id分类ID
         * @param name  group_name分类名字
        */
        selected(index,Id,child,name){
            let _this = this;
            _this.selectedClass = index;
            _this.isGoods = false;
            _this.group_name = name;
            if(child){//有子集调用子集分类接口
                _this.isGoods = true;
                _this.classAllAjax(Id);
            }else{//没有子集传类型，调用搜索商品接口
                _this.classGoods ='';
                _this.isNav = false;
                $('.wrapper').removeAttr("style");
                if(Id==''){//是0的 就是全部分类
                    _this.$router.push('/classify/'+this.$route.params.shopId+'/'+this.$route.params.busId+'/'+this.$route.params.type+'/'+'k=k');
                }
                _this.groupId = Id;
                _this.productAjax({
                    groupId: Id
                });
            }
        },
        goods_jump(e){
            console.log(e,'跳转数据')
            if(e.activityId == null || e.activityId == '' || typeof(e.activityId) == "undefined"){
                e.activityId = 0;
            }

            let shopId =  e.shop_id ||this.$store.state.shopId ||this.$store.state.shopId || this.$route.params.shopId;
            let busId =  this.$store.state.busId || this.$route.params.busId;
            let type = this.$store.state.type || this.$route.params.type;
            this.$store.commit('mutationData',{
                shopId: shopId,
                busId: busId,
                type : type,
            });
            let url = '/goods/details/'+shopId+'/'+busId+'/'+type+'/'+e.id+'/'+e.activityId;
            if(this.commonFn.isNotNull(this.saleMemberId) && this.saleMemberId > 0){
                url += "/"+this.saleMemberId+"/0";
            }
            this.$router.push(url);
        },
        /** 
         *关闭分类
        */
        ContentNav(e){
            this.showNav();
        }
    },
    mounted () {
        let _this = this;
        // _this.type = _this.$route.params.type;
        let _keyword = this.$store.state.keywords || this.$route.params.keywords;
        _keyword === 'k=k'?_this.keyWord = '':_this.keyWord = _keyword || '';
        _this.curPage = 1;
        let desc = this.$route.params.desc;
        desc = desc == '-' ? null : desc;
        if(this.commonFn.isNotNull(desc)){
            let arr = desc.split("-");
            if( arr[0] != null &&  arr[0] != 0){
                this.saleMemberId = arr[0];
                this.$parent.setSaleMemberId(this.saleMemberId);
            }
        }
        _this.setTitle();

        _this.classAllAjax();

        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > 0 && $(window).scrollTop() >= ($(document).height() - $(window).height()) - 1000) {
            _this.loadMore()
            }
        });
    }
}
</script>

<style lang="less">
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
.classify-main{
    width: 100%;
    .classify-header{
        width: 100%;
        font-size: 0;
        background: #fff;
        position: absolute;
        z-index: 3;
        max-width: 8.28rem;
        .price{
            span{
                position: relative;
                margin: 0 0.5px;
                i{
                    position: absolute;
                    left: 0;
                    font-size: 22/@dev-Width *1rem;
                }
                .icon-paixu{
                    bottom: 0;
                }
                .icon-paixu2{
                   top: 1px;
                }
            }
        }
    }
    .header-search{
        width: 100%;
        padding: 25/@dev-Width *1rem;
        position: relative;
        i{
            position: absolute;
            top:38%;
            left: (25+(95/3))/@dev-Width *1rem;
            color: #87858f;
        }
        input{
            width: 100%;
            border: 0;
            background: #f1f1f4;
            padding: 20/@dev-Width *1rem 95/@dev-Width *1rem;
            padding-right: 0;
            .border-radius(10px);
        }
    }
    .header-nav{
        width: 100%;
        .ik-box;
        line-height: 1;
        &>div{
            .ik-box-flex(1);
            text-align: center;
            padding: 25/@dev-Width *1rem 0;
            text-align: center;
        }
        &>div:last-child{
            padding: 25/@dev-Width *1rem 0;
            i{
                background-position: 50%;
            }
        }
    }
    .classify-content1,.classify-conten2{
        -webkit-overflow-scrolling: touch;
    }
    .classify-content1{
        width: 100%;
        position: relative;
        background: #fff;
        padding-top:230/@dev-Width *1rem;
        .classify-item{
            width: 50%;
            float: left;
            padding: 20/@dev-Width *1rem;
            .classify-img{
                width: 570/@dev-Width *1rem;
                height: 570/@dev-Width *1rem;
                background-size: cover;
                background-position: center;
                margin-bottom: 20/@dev-Width *1rem;
                margin: 0 auto;
            }
            .classify-txt{
                width: 100%;
                 &>p{
                    min-height: 1.5em;
                }
                .classify-money{
                    margin-top: 20/@dev-Width *1rem;
                    width: 100%;
                    .ik-box;
                    .ik-box-align(center);
                    .ik-box-pack(justify);
                    font-size: 0;
                    p{
                        vertical-align: bottom;
                    }
                }
            }
        }
    }
    .classify-content2{
        width: 100%;
        position: relative;
        background: #fff;
        padding-top:230/@dev-Width *1rem;
        .classify-item{
            width: 100%;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(justify);
            padding: 10/@dev-Width *1rem 30/@dev-Width *1rem ;
            .classify-img{
                width: 330/@dev-Width *1rem;
                height: 330/@dev-Width *1rem;
                background-size: cover;
                background-position: center;
            }
            .classify-txt{
                width: 66%;
                &>p{
                    min-height: 1em;
                    max-height: 115/@dev-Width *1rem;
                    margin-bottom: 10/@dev-Width *1rem;
                }
                .classify-money{
                    margin-bottom: 25/@dev-Width *1rem;
                }
            }
            .classify-time{
                margin-top: 10/@dev-Width *1rem;
                .ik-box;
                .ik-box-pack(justify);
                span{
                    color: #333333;
                    margin: 3px;
                }
                em{
                    font-size: 32/@dev-Width *1rem;
                    display: inline-block;
                    background: #ffcc00;
                    color: #333333;
                    padding: 1px 2px;
                    .border-radius(3px);
                }
            }
        }
    }
    .classify-content-nav{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        position: absolute;
        padding-top:230/@dev-Width *1rem;
        z-index: 2; 
        padding-bottom: 1rem;
        .classify-nav{
            height: 100%;
            .calc-w(295,1242,100%);
            float: left;
            overflow-y: auto; 
            overflow-x: hidden; 
            position: relative;
            left: 0;
            background: #fff;
            -webkit-overflow-scrolling: touch;
            li{
                width: 100%;
                height: 150/@dev-Width *1rem;
                .ik-box;
                .ik-box-align(center);
                .ik-box-pack(center);
                border-bottom: 1px solid #e5e5e5;
                background: #fff;
            }
            .selected{
                background: #f0f2f5;
                border-right: 0; 
                color: #e73622;
                position: relative;
            }
        }
    }
    
    .padding-bottom-clear {
        padding-bottom: 0!important;
    }
}

// .nav-enter-active, .nav-leave-active {
//   transition: opacity 2s
// }
// .nav-enter, .nav-leave-to /* .fade-leave-active in below version 2.1.8 */ {
//   opacity: 0
// }
.navshow{
    -webkit-animation: .5s ease wrap_kf forwards;
}
@-webkit-keyframes wrap_kf {
    0% {
        height: 0;
    }
    100% {
        height: 100%;
    }
}
</style>
