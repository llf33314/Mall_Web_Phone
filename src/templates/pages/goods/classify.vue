<template>
<div class="classify-main">
    <header class="classify-header">
        <div class="header-search" @click="search">
            <input class="fs40" placeholder="搜索商品" 
             v-model="keyWord">
            <i class="iconfont icon-sousuo shop"></i>
        </div>
        <div class="header-nav fs40">
            <div  
                @click="switchProduc()">
                分类
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
            :class="[sort =='price'?'shop-font':'']" 
                @click="switchProduc('price')">
                价格
                <!-- <i class="price-up "
                    :class="[ desc_num == 0 ?'upborder':'']">
                </i>
                <i class="price-down"
                    :class="[ desc_num == 1 ?'downborder':'']">
                </i> -->
                
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
    <section class="clearfix" 
            :class="[isList?'classify-content1':'classify-content2']" 
            v-if="subList !=='' ">
        <div class="classify-item" v-for="goods in subList">
            <div class="classify-img" >
                <default-img :background="goods.image_url"
                            :isHeadPortrait="0">
                </default-img>
            </div>
            <div class="classify-txt">
                <p  class="fs42 " 
                    :class="[isList?'text-overflow':'',goods.pro_name.length>30?'text-more-overflow':'']">
                    <em class="em-tag" v-if="goods.pro_label">{{goods.pro_label}}</em>
                    {{goods.pro_name}}
                </p>
                <div class="classify-money">
                    <p class="fs32 shop-font">
                        <span v-if=" type == 1">团购:￥</span>
                        <span v-else-if=" type == 4 ">当前价:￥</span>
                        <span v-else-if=" type == 6 ">预售:￥</span>
                        <span v-else>￥</span>
                        <span class="fs42">{{goods.price[0]}}</span>.{{goods.price[1]}}
                        <span v-if="type == 5">积分</span>
                    </p>
                    <p class="fs32 shopGray">销量 :{{goods.sale_total}}</p>
                </div>
                <div class="fs36 classify-time shopGray" v-if="type == 3 || type == 4 || type == 6 || type == 1">
                    距结束<span>5天</span>
                    <em>99</em> :
                    <em>99</em> :
                    <em>99</em>
                </div>
            </div>
        </div>
    </section>
    <goods-no v-if="subList==''"></goods-no>
    <more :is-more="isMore"></more>
</div>
</template>
 <script>

import defaultImg from 'components/defaultImg'
import more from 'components/more.vue';//加载更多
import goodsNo from 'components/goodsNo.vue';//加载更多
export default {
    components: {
        defaultImg,more,goodsNo
    },
    data () {
        return {
            type: 0,//0/1.团购 3.秒杀 4.拍卖 5 粉币 6预售 7批发
            isList: true,
            productList:{},
            path:'',
            webPath:'',
            imgUrl:'',
            sort :'new',
            desc_num : -1,
            isMore: 1,//控制没有更多的显示
            curPage:1,
            subList:[],
            keyWord:''
        }
    },
    watch: {
          // 如果路由有变化，会再次执行该方法
          "$route"(a,b){
              console.log(a,b)
              this.setTitle();
          }
    },
    methods: {
        //加载更多
        loadMore: function () {
            console.log('加载更多');
            this.curPage++; //请求
            if(this.curPage > this.productList.pageCount){
                this.isMore = 3;
                return
            }
            this.isMore = 2;
            this.productAjax({
                sort: this.sort,
                curPage: this.curPage,
                type : this.$route.params.type
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
            let type = this.$route.params.type;
            let shopId = this.$route.params.shopId;
            let busId = this.$route.params.busId;
            let keyWord = this.keyWord || this.$route.params.keyword
            console.log(this.keyWord);
            this.$router.push('/search/'+shopId+'/'+busId+'/'+type+'/'+keyWord)
        },
        /**
         * 商品搜索接口
         */
        productAjax(data){
            let _this = this;
            let _data = {
                'shopId':	 this.$route.params.shopId ,
                'busId'	:    this.$route.params.busId ,
                'groupId':	data.groupId || '',
                'sort' : data.sort || 'new',    //new最新 || price销量 || sale价格
                'isDesc':	data.isDesc || '',//排序 1、升序 -1 降序	可不传
                'searchContent':	data.searchContent||'',//搜索内容	可不传
                'type':    data.type|| '',  //	类型，1.团购 3.秒杀 4.拍卖 5 粉币 6预售 7批发	可不传
                'curPage': data.curPage||''//	当前页	可不传
            }
            this.commonFn.ajax({
                'url': h5App.activeAPI.phoneProduct_productAll_post,
                'data':_data,
                'success':function(data){
                    if(data.code == '-1'){
                        _this.subList = [];
                        return
                    }
                    _this.isMore = 1;
                    _this.productList = data.data.productList;

                    let newSubList = data.data.productList.subList;
                    newSubList.forEach((item,index)=>
                        item.price = _this.commonFn.moneySplit(item.price)
                    )

                    if (_this.curPage === 1) {
                        _this.subList = newSubList;
                    } else {
                        _this.subList = _this.subList.concat(newSubList) || [];
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
            if(sort === 'price'){
                console.log('price',this.desc_num);
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
                type : this.$route.params.type
            });
            this.curPage = 1
        },
        /**
         * 页面初始
         */
        setTitle(){
            //1.团购 3.秒杀 4.拍卖 5 粉币 6预售 7批发
            let _this = this;
            let  title = {1:'团购',3:'秒杀',4:'拍卖',5:'粉币',6:'预售',7:'批发'}
            _this.commonFn.setTitle(title[this.type] || '分类详情');

            console.log(_this.keyWord,'关键词');
            this.productAjax({
                sort: 'new',
                curPage: 1,
                type : _this.$route.params.type,
                searchContent: encodeURI(_this.keyWord)
            });
        }
    },
    mounted () {
        this.type = this.$route.params.type;

        let _keyword = this.$route.params.keyword;
        _keyword === 'keyword=k'?this.keyWord = '':this.keyWord = _keyword || '';

        this.setTitle();

        let _this =this;
        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > 0 && $(window).scrollTop() >= ($(document).height() - $(window).height()) - 1000) {
            _this.loadMore();
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
        .price{
            position: relative;
            i{
                right: 65/@dev-Width *1rem;
                position: absolute;
                width:0; 
                height:0; 
            }
        }
        /*箭头向上*/
        .price-up {
            top: 28/@dev-Width *1rem;
            border-left:6px solid transparent;
            border-right:6px solid transparent;
            border-bottom:6px solid #ccc;
        }
            
        /*箭头向下*/
        .price-down {
            bottom: 28/@dev-Width *1rem;
            border-left:6px solid transparent;
            border-right:6px solid transparent;
            border-top: 6px solid #ccc;
        }
        .upborder{
            border-bottom:6px solid #e4393c
        }
        .downborder{
            border-top:6px solid #e4393c
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
    .classify-content1{
        width: 100%;
        position: relative;
        background: #fff;
        .classify-item{
            width: 50%;
            float: left;
            padding: 20/@dev-Width *1rem;
            .classify-img{
                width: 520/@dev-Width *1rem;
                height: 520/@dev-Width *1rem;
                background-size: cover;
                background-position: center;
                margin-bottom: 20/@dev-Width *1rem;
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
            .classify-time{
                margin-top: 10/@dev-Width *1rem;
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
    .classify-content2{
        width: 100%;
        position: relative;
        background: #fff;
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
}
</style>
