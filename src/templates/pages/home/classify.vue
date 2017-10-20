<template>
<div class="shop-wrapper classify-wrapper">
    <div class="search-main">
        <header class="search-header1" @click="search">
            <div class="header-search clearfix">
                <input class="fs40 input1" placeholder="搜索商品" >
                <i class="iconfont icon-sousuo shop"></i>
                <!-- <div class="classify-button">
                    <i class="iconfont icon-xiaoxi">
                        <em></em>
                    </i>
                    <span class="fs26">活动</span>
                </div> -->
            </div>
        </header>
        <section class="classify-content clearfix">
            <ul class="classify-nav">
                <li class="fs42 " 
                    v-for="(item,index) in classNav"
                    :class="[selectedClass==index?'selected':'']" 
                    v-text="item.group_name"
                    @click="selected(index,item.group_id,item.is_child)">
                </li>
            </ul>
            <div class="classify-main">
                <div class="Slide">
                    <div class="classify-title ">
                        品牌分类
                    </div>
                    <!--其他分类-->
                    <div class="classify-goods clearfix">
                        <div class="goods-item" v-for="item in classGoods">
                            <div class="goods-img">
                                <default-img :background="imgUrl+item.image_url"
                                    :isHeadPortrait="0">
                                </default-img>
                            </div>
                            <p class="fs36" v-text="item.group_name"></p>
                        </div>
                    </div>
                    <!--全部商品-->
                    <div class="whole-goods clearfix">
                        <div class="whole-item">
                            <div class="whole-img">
                                <default-img :background="background"
                                    :isHeadPortrait="0">
                                </default-img>
                            </div>
                            <p class="fs36 text-overflow">苹果手机苹果手机苹果手机苹果手机苹果手机</p>
                            <span class="shop-font fs46">¥123</span>
                        </div>
                        <div class="whole-item">
                            <div class="whole-img">
                                <default-img :background="background"
                                    :isHeadPortrait="0">
                                </default-img>
                            </div>
                            <p class="fs36 text-overflow">苹果手机苹果手机苹果手机苹果手机苹果手机</p>
                            <span class="shop-font fs46">¥123</span>
                        </div>
                        <div class="whole-item">
                            <div class="whole-img">
                                <default-img :background="background"
                                    :isHeadPortrait="0">
                                </default-img>
                            </div>
                            <p class="fs36 text-overflow">苹果手机苹果手机苹果手机苹果手机苹果手机</p>
                            <span class="shop-font fs46">¥123</span>
                        </div>
                    </div>
                    
                </div>
                <more :is-more="isMore"></more>
            </div>
        </section>
        <footer-nav :navshow="isNavshow"></footer-nav> 
    </div>
</div>
</template>

<script>

import footerNav from 'components/footerNav'
import defaultImg from 'components/defaultImg'
import more from 'components/more.vue';//加载更多
export default {
  data() {
    return {
        path:'',
        imgUrl :'',
        webPath :'',
        isMore: 1,//控制没有更多的显示
        isNavshow: 'classify',
        background:'',
        classNav:{},
        classGoods:{},
        selectedClass:''
    }
  },
  components:{
	  footerNav,defaultImg,more
  },
  mounted(){
      this.classAllAjax();
  },
  //相关操作事件
  methods: {
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
     * 商品分类接口
     */
    classAllAjax(groupId){
        let _this = this ;
        console.log(groupId)
        this.commonFn.ajax({
            'url': h5App.activeAPI.phoneProduct_classAll_post,
            'data':{
                shopId : _this.$route.params.shopId,
                busId : _this.$route.params.busId,
                groupId : groupId || ''
            },
            'success':function(data){
                _this.isMore = 1;
                if(groupId){
                    console.log(data,'classGoods');
                    _this.classGoods = data.data;
                }else{
                    console.log(data,'classNav');
                    _this.classNav = data.data;
                    let all = {
                        group_id:'',
                        group_name:'全部',
                        is_child:0,
                        shop_id:''
                    }
                     _this.classNav.unshift(all);
                }
                // _this.productList = data.data.productList;

                // let newSubList = data.data.productList.subList;
                // newSubList.forEach((item,index)=>
                //     item.price = _this.commonFn.moneySplit(item.price)
                // )

                // if (_this.curPage === 1) {
                //     _this.subList = newSubList;
                // } else {
                //     _this.subList = _this.subList.concat(newSubList) || [];
                // }

                _this.path = data.path;
                _this.imgUrl = data.imgUrl;
                _this.webPath = data.webPath;
            }
        })
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
                _this.isMore = 1;
                _this.classGoods = data.data;

                // let newSubList = data.data;
                // newSubList.forEach((item,index)=>
                //     item.price = _this.commonFn.moneySplit(item.price)
                // )
                // if (_this.curPage === 1) {
                //     _this.subList = newSubList;
                // } else {
                //     _this.subList = _this.subList.concat(newSubList) || [];
                // }
            }
        })
    },
    /** 
     * 选择类型
     * @param child 判断子集条件
    */
    selected(index,groupId,child){
        let _this = this;
        console.log(index,groupId,child);
        _this.selectedClass = index;
        if(child){
            _this.classAllAjax(groupId);
        }else{
            _this.classGoods =''
        }
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';

.search-main{
    width: 100%;
    position: relative;
    .search-header{
        width: 100%;
        font-size: 0;
        background: #fff;
    }
    .search-header1{
        width: 100%;
        background: #fff;
        font-size: 0;
        position: absolute;
        top:0;
        left: 0;
    }
    .header-search{
        width: 100%;
        padding: 25/@dev-Width *1rem ;
        padding-right: 0;
        position: relative;
        .input1{
            float: left;
            padding-left: 80/@dev-Width *1rem;
            background: #ebebeb;
            color: #333333;
        }
        .icon-sousuo {
            position: absolute;
            left: 4%;
            top: 35%;
            color: #888;
            font-size: 40/@dev-Width *1rem;
        }
        .classify-button{
            color: #fff;
            width: 12%;
            float: left;
            text-align: center;
            font-size: 0;
            line-height:1;
            i{
                display: block;
                font-size: 68/@dev-Width *1rem;
                position: relative;
            }
            em{
                width: 8px;
                height: 8px;
                background: #fff;
                .border-radius(100%);
                position: absolute;
                top: -5%;
                right: 22%;
            }
        }
        input{
            width: 98%;
            border: 0;
            background: #f1f1f4;
            padding: 20/@dev-Width *1rem;
            padding-right: 0;
            .border-radius(10px);
        }
        &>span{
                width: 12%;
                display: inline-block;
                text-align: center;
                padding: 20/@dev-Width *1rem 0;
            }
    }
    .search-content{
        width: 100%;
        .search-history{
            width: 100%;
            .search-title{
                width: 100%;
                .ik-box;
                .ik-box-pack(justify);
                i{
                    padding: 40/@dev-Width *1rem;
                    display: block;
                }
            }
            .search-txt{
                width: 100%;
                padding: 0 40/@dev-Width *1rem ;
                font-size: 0;
            }
        }
    }
}
.classify-wrapper{
    position: relative;
    height: 100%;
    .search-main{
        height: 100%;
    }
    .classify-content{
        width: 100%;
        height: 100%;
        padding-top: 138/@dev-Width *1rem;
        position: relative; 
        .classify-nav{
            height: 85%;
            .calc-w(295,1242,100%);
            float: left;
            margin-bottom: 1rem;
            overflow-y: auto; 
            overflow-x: hidden; 
            position: absolute;
            top: 1rem;
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
        .classify-main{
            right: 0;
            height: 93%;
            .calc-w(1242-295,1242,100%);
            float: right;
            padding: 30/@dev-Width *1rem 32/@dev-Width *1rem 0;
            position: relative;
            overflow: hidden;
            .Slide{
                width: 100%;
                position: absolute;
                height: 97%;
                overflow-y: auto;
                overflow-x: hidden;
                margin-bottom: 1.2rem;
                -webkit-overflow-scrolling: touch;
            }
            .classify-title{
                width: 100%;
                font-size: 42/@dev-Width *1rem;
                font-weight: bold;
                padding: 25/@dev-Width *1rem 0;
            }
            .classify-goods,.whole-goods{
                width: 93%;
                background: #fff;
                padding: 25/@dev-Width *1rem;
                position: relative;
                &::before{
                    content: '';
                    display: block;
                    width: 100%;
                    position: absolute;
                    bottom: 25/@dev-Width *1rem;
                    left: 0;
                    height: 3px;
                    background: #fff;
                }
                .goods-item,.whole-item{
                    font-size: 0;
                    float: left;
                    width: 33.333%;
                    padding: 20/@dev-Width *1rem;
                    border-bottom: 1px solid #f3f5f7;
                    border-right: 1px solid #f3f5f7;
                    p{
                        text-align: center;
                        padding: 10/@dev-Width *1rem 0;
                    }
                }
                .goods-img,.whole-img{
                    margin: 0 auto;
                    width: 210/@dev-Width *1rem;
                    height: 210/@dev-Width *1rem;
                    display: block;
                    background-size: cover;
                    background-position: center; 
                    margin-bottom: 10/@dev-Width *1rem;
                }
            }
            .classify-goods>div:nth-child(3n){
                    border-right:0;
            }
            .whole-goods{
                .whole-item{
                    width: 50%;
                    p{
                        text-align: left;
                    }
                }
                .whole-img{
                    width: 330/@dev-Width *1rem;
                    height: 330/@dev-Width *1rem;
                    overflow: hidden;
                }
                &>div:nth-child(2n){
                    border-right:0;
                }
            }
        }
    }
}
</style>
