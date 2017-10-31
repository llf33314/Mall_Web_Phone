<template>
<div class="goods-wrapper">
    <div class="goods-main">
        <banner :banner="goodsData.imageList" :imgUrl="imgUrl"></banner>
        <section class="goods-info">
            <div class="goods-top " :class="[ type == 4 ?'border':'']">
                <div class="goods-info-name">
                    <em class="em-tag" v-if="goodsData.productLabel">{{goodsData.productLabel}}</em>
                    <span class="fs42">{{goodsData.productName}}</span>
                </div>
            
                <div class="fs40  goods-info-other">
                    <div class="shop-font" v-if="type != 5">
                        <span v-if=" type== 3">秒杀价</span>
                        <span v-else-if="type== 1">团购价:</span>
                        <span v-else-if="type== 4">当前价:</span>
                        <span v-else-if="type== 6">预售价:</span>
                        <span class="fs50" v-else-if="type== 5">{{goodsData.productPrice[0]}}积分</span>
                        <span v-else >价格:</span>
                        ￥<span class="fs50">{{goodsData.productPrice[0]}}</span>.{{goodsData.productPrice[1]}}
                        <span v-if="type== 7">批发价：￥{{goodsData.pfPrice}}</span>
                        <span class="shopGray" v-if="goodsData.auctionResult >= 0 ">抢拍{{goodsData.auctionResult.auctionNumber}}次</span>
                    </div>
                    <span class="fs50 shop-font" v-else>{{goodsData.productPrice[0]}} 积分</span>
                    <count-down :times="goodsData.activityTimes"
                    ></count-down>
                </div>
                <div class="fs40  goods-info-other" v-if=" type == 4 || type == 7">
                    <div v-if="type == 7 " class="shopGray">
                        原价<del>￥{{goodsData.productCostPrice}}</del>
                        <span class="shop-font" > 会员价：￥{{goodsData.hyPrice}}</span>
                    </div>
                    <div class="shop-font" v-if="goodsData.auctionResult != '' &&  type == 4">
                        <span >保证金：</span>
                        ￥<span class="fs50" >{{goodsData.auctionResult.depositMoney[0]}}</span>.{{goodsData.auctionResult.depositMoney[1]}}
                        <span class="shopGray">不成拍卖后退还</span>
                    </div>
                    <div class="fs36 shopGray" v-if=" type != 7">{{goodsData.auctionResult.marginNumber}}人已报名</div>
                </div>
                <p class="goods-info-other fs40 shopGray" v-if="type != 4">
                    <span v-if="type != 0 && type != 7 ">
                        <del>￥{{goodsData.productCostPrice}}</del>
                    </span>
                    <span v-if="type == 0 || type == 7 ">
                        运费: ￥{{goodsData.freightMoney}}
                    </span>
                    <span v-if="type == 0 || type == 7 ">
                        库存:{{goodsData.productStockTotal}}
                    </span>
                    <span v-if="type == 7 ">
                        关注量:{{goodsData.attentionNum}}
                    </span>
                    <span>
                        销量:{{goodsData.productSaleTotal}}
                    </span>
                </p>
            </div>
            <div class="goods-bottom shopGray" v-if=" type ==4 ">
                <p class="fs40 ">
                    <span>起拍价：￥{{goodsData.auctionResult.aucStartPrice}}</span>
                    <span v-if="goodsData.auctionResult.aucLowestPrice>=0">保留价：￥{{goodsData.auctionResult.aucLowestPrice}}</span>
                    <span v-if="goodsData.auctionResult.aucLowestPrice>=0">保证金：￥{{goodsData.auctionResult.depositMoney[0]+'.'+goodsData.auctionResult.depositMoney[1]}}</span>
                </p>
                <p class="fs40 ">
                    <span v-if="goodsData.auctionResult.aucType == 2 ">加价幅度：￥{{goodsData.auctionResult.aucAddPrice}}</span>
                    <span v-if="goodsData.auctionResult.aucType == 1 ">降价幅度：每{{goodsData.auctionResult.aucLowerPriceTime}}分钟降价
                        ￥{{goodsData.auctionResult.aucLowerPrice}}
                    </span>
                </p>
                <p class="fs40 ">
                    <span >拍卖方式：{{goodsData.auctionResult.aucTypeVal}}</span>
                </p>
                <p class="fs40 ">
                    <span >服务支持：支持7天无理由退货</span>
                </p>
            </div>
        </section>
        <section class="goods-selected"
                v-if="goodsData.isShowCardRecevie == 1"
                @click="isCardRecevie = true">
            <div class="goods-selected-main" >
                <div class="fs40">
                    查看所含优惠卷
                </div>
                <i class="iconfont icon-jiantou-copy shopGray"></i>
            </div>
        </section>
        <section class="goods-selected"
                v-if="goodsData.isSpecifica == 1"
                @click="isShow=true">
            <div class="goods-selected-main" >
                <div class="fs40">
                    已选  {{dialogData.values}} {{spec_num}}份 
                </div> 
                <i class="iconfont icon-jiantou-copy shopGray"></i>
            </div>
        </section>
        <section class="goods-address" v-if="goodsData.memberAddress">
            <div class="goods-address-main border">
                <div class="fs40 goods-address-txt text-overflow">
                    <i class="iconfont icon-dingwei shopFont"></i>
                    送至：{{goodsData.memberAddress}}
                </div>
                <i class="iconfont icon-jiantou-copy shopGray"></i>
            </div>
            <div class="shopGray fs40 goods-address-postage">
                运费 :{{goodsData.freightMoney}}
            </div>
        </section>
        <section class="goods-prove">
            <span class="fs40" >
                <i class="iconfont icon-chenggong shopGreen" v-if="goodsData.stoType"></i>
                {{goodsData.stoType}}
            </span>
            <span class="fs40" v-if="goodsData.isSecuritytrade == true">
                <i class="iconfont icon-chenggong shopGreen"></i>
                担保交易
            </span>
            <span class="fs40">
                <i class="iconfont icon-chenggong shopGreen"></i>
                线下门店
            </span>
        </section>
        <section class="goods-shop">
            <div class="goods-shop-main clearfix">
                <div class="goods-shop-info">
                    <div class="goods-shop-img">
                        <default-img :background="imgUrl+goodsData.shopImageUrl"
                            :isHeadPortrait="0">
                        </default-img>
                    </div>
                    <div class="goods-shop-txt">
                        <div class="goods-shop-name">
                            <span class="fs46 text-overflow">{{goodsData.shopName}}</span>
                            <em class="em-flag" v-if="goodsData.categoryName">旗舰店</em>
                        </div>
                        <div class="fs40 shopGray text-overflow">
                            {{goodsData.shopAddress}}
                        </div>
                    </div>
                </div>
                <div class="goods-shop-rigtn">
                    <div class="shopborder goods-shop-buttom fs42" 
                        v-if="!goodsData.isCollect"
                        @click="collectProductAjax()">收藏商品
                    </div>
                    <div class="shopborder goods-shop-buttom fs42"
                        @click="collectProductAjax()"
                        v-else>已收藏
                    </div>
                    <div class="shopborder goods-shop-buttom fs42" 
                    @click="shop()">进店逛逛td
                        <!-- (跳首页) -->
                    </div>
                </div>
            </div>
        </section>
        <section class="goods-content">
            <div class="goods-content-nav shop-header">
                <div class="header-nav">
                    <div class="header-itme"
                        :class="{'shop-font':nav.name == nav_choice}"
                        v-for="(nav,index) in min_nav"
                        :key="nav[index]"
                        @click="nav_change(nav.name)">
                        <p class="fs42">{{nav.title}}</p>
                        <em :class="{'shop-bg':nav.name == nav_choice}"></em>
                    </div>
                </div>
            </div>
            <div class="goods-details"
                v-show="isDetails">
                <div v-html="detailsData"></div>
            </div>
            <router-view v-show="!isDetails"></router-view>
            <technical-support v-if="$store.state.isAdvert == 1"></technical-support>
        </section>
        <section class="goods-footer" style="background:0">
            <div class="goods-footer-no fs40" v-if="isSoldOut">
                商品已经下架啦~
            </div>
            <div class="goods-footer-botton ui-col-2 fs50 shop-bg" v-if="type == 4 || type == 6 ">
                交保证金报名
            </div>
            <div class="goods-footer-content" v-if=" goodsData.isShowAddShopButton == 1">
                <div class="goods-footer-botton ui-col-1 fs32">
                    <i class="iconfont icon-xiaoxi shop-font"></i>
                    客服
                </div >
                <div class="goods-footer-botton ui-col-1 fs32 border-left">
                    <i class="iconfont icon-yinhang"></i>
                    购物车
                    <em class="goods-footer-num shop-bg" v-if="goodsData.shopCartNum">{{goodsData.shopCartNum }}
                    </em>
                </div>
                <div class="goods-footer-botton ui-col-2 fs50 shop-yellow"
                    :class="{'shopFff':isSoldOut}"
                    @click="dialogShow">
                    加入购物车
                </div>
                <div class="goods-footer-botton ui-col-2 fs50 shop-bg"
                    :class="{'shopFff':isSoldOut}"
                    @click="dialogShow">
                    立即购买
                </div>
            </div>
        </section>
    </div>
    <div class="goods-dialog" 
        v-if="isShow"
        @click.self="isShow =false">
        <div class="goods-dialog-main">
            <div class="goods-dialog-title  border">
                <span class="text-overflow fs42">{{goodsData.productName}}</span>
                <i class="iconfont icon-guanbi fs40"
                @click.self="isShow =false"></i>
            </div>
            <div v-if="type != 7">
                <div class="goods-dialog-detl border clearfix">
                    <div class="goods-dialog-img">
                        <default-img :background="imgUrl+dialogData.specifica_img_url"
                            :isHeadPortrait="1">
                        </default-img>
                    </div>
                    <div class="goods-dialog-txt">
                        <p class="fs42 shop-font">
                            <span class="fs32">¥</span>{{dialogData.inv_price[0]}}<span class="fs32">.{{dialogData.inv_price[1]}}</span>

                            <span class="fs36 " v-if="dialogData.hyPrice"> 会员价 :{{dialogData.hyPrice}}</span>
                        </p>
                        <p class="fs36 shopGray" >库存：{{dialogData.inv_num}}</p>
                        <p class="fs36 shopGray" v-if="dialogData.inv_code">商品编号：{{dialogData.inv_code}}</p>
                        <p class="fs36 shopGray" v-if="goodsData.maxBuyNum">限购数量：{{goodsData.maxBuyNum}}</p>
                    </div>
                </div>
                <div class="goods-dialog-choice">
                     <div class="goods-choice-list clearfix" v-for="(item,key) in specificaList">
                        <div class="goods-choice-title fs36">{{item.specName}}
                        </div>
                        <div class="goods-choice-box js-specValue">
                            <div v-for="(spec,index) in dialogData.specifica_ids" v-if="index == key">
                                <em class="fs40 em-choice " v-for=" specValue in item.specValues"
                                    @click="choice_product($event)" 
                                    :class="{'shop-bg':dialogData.specifica_ids[index]== specValue.id }"
                                    :value="specValue.id">
                                    {{specValue.specValue}}
                                </em>
                            </div>
                        </div>
                    </div>
                    <div class="goods-choice-list clearfix">
                        <div class="goods-choice-title fs36">数量
                        </div>
                        <div class="goods-choice-box2">
                            <em class="em-choice" @click="addSpec_number('-')">-</em>
                            <input class="em-input" v-model="spec_num"></input>
                            <em class="em-choice" @click="addSpec_number('+')">+</em>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="goods-dialog-detl border clearfix">
                    <div class="goods-dialog-img">
                        <default-img :background="imgUrl+dialogData.specifica_img_url"
                            :isHeadPortrait="0">
                        </default-img>
                    </div>
                    <div class="goods-dialog-txt">
                        <p class="fs42 shop-font"><span class="fs32">¥</span>{{dialogData.inv_price[0]}}.<span class="fs32">{{dialogData.inv_price[1]}}</span></p>
                        <p class="fs36 shop-font">批发价:￥6,999.00</p>
                        <p class="fs36 shop-font">库存{{dialogData.inv_num}}件</p>
                        <p class="fs36 shopGray" v-if="dialogData.hpMoney">本商品{{dialogData.hpMoney}}手起批</p>
                    </div>
                </div>
                <div class="goods-dialog-choice">
                    <div class="goods-choice-list2 border">
                        <div class="fs40">按一手货下单</div>
                        <div class="goods-choice-button">
                            <span class="fs36">减一手</span>
                            <span class="fs36 shop-bg">加一手</span>
                        </div>
                    </div>
                    <div style="padding-bottom:20px" class="border">
                        <div class="goods-choice-list clearfix" v-for="(item,i) in specificaList"  v-if=" i == 0 && specificaList.length > 1">
                            <div class="goods-choice-title fs36">{{item.specName}}
                            </div>
                            <div class="goods-choice-box js-specValue">
                                <div v-for="(spec,index) in dialogData.specifica_ids" v-if="index == i">
                                    <em class="fs40 em-choice " v-for=" specValue in item.specValues"
                                        @click="choice_product($event)" 
                                        :class="{'shop-bg':dialogData.specifica_ids[index] == specValue.id }"
                                        :value="specValue.id">
                                        {{specValue.specValue}}
                                    </em>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="goods-choice-option2 border" >
                        <ul class="goods-choice-ul">
                            <li class="goods-choice-li" v-for="(item,i) in specificaList" v-if="i == 1 || specificaList.length == 1">
                                <p class="fs36">{{item.specName}}</p>
                                <div class="goods-option" >
                                    <p class="fs36"  v-for="(spec,index) in item.specValues">{{spec.specValue}}</p>
                                </div>
                            </li>
                            <li class="goods-choice-li" v-for="(item,i) in specificaList" v-if="i == 2 || specificaList.length == 1">
                                <p class="fs36">{{item.specName}}</p>
                                <div class="goods-option" >
                                    <p class="fs36"  v-for="(spec,index) in item.specValues">{{spec.specValue}}</p>
                                </div>
                            </li>
                            <li class="goods-choice-li">
                                <p class="fs36">数量</p>
                                    <div class="goods-option-number">
                                    <p class="fs42">
                                        <em class="em-choice">-</em>
                                        <em class="em-choice">1</em>
                                        <em class="em-choice">+</em>
                                    </p>
                                </div>
                                <div class="goods-option-number">
                                    <p class="fs42">
                                        <em class="em-choice">-</em>
                                        <em class="em-choice">1</em>
                                        <em class="em-choice">+</em>
                                    </p>
                                </div>
                                <div class="goods-option-number">
                                    <p class="fs42">
                                        <em class="em-choice">-</em>
                                        <em class="em-choice">1</em>
                                        <em class="em-choice">+</em>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="goods-choice-Total fs36 shop-textr">
                        满2手，达到批发条件，<span class="fs46 shop-font">￥43,106</span>
                        <span class="shop-font">.00 </span>共2件
                    </div>
                </div>
            </div>
            <div class="goods-dialog-footer">
                <div class="goods-dialog-button fs52 shop-yellow">
                    加入购物车
                </div>
                <div class="goods-dialog-button fs52  shop-bg">
                    <span v-if="type == 4">立刻批发</span>
                    <span v-else>立刻购买</span>
                </div> 
            </div>
        </div>
    </div>
    <div class="goods-dialog" 
        v-if="isCardRecevie"
        @click.self="isCardRecevie =false">
         <div class="goods-dialog-main">
             <div class="goods-dialog-title  border">
                <span class="text-overflow fs40">卡券包</span>
                <i class="iconfont icon-guanbi fs40"
                @click.self="isCardRecevie =false"></i>
            </div>
            <div>
                <div class="goods-dialog-choice shop-box-justify" 
                    style="padding: 0.2rem;"
                    v-for="item in goodsData.cardRecevieArr"
                    :key="item.cardId">
                    <div class="fs42">{{item.cardName}}</div>
                    <div class="fs42">{{item.num}}</div>
                </div>
            </div>
         </div>
    </div>
</div>
</template>
<script>

import defaultImg from 'components/defaultImg';
import countDown from '../home/classify_child/countDown';//倒计时
import banner from './child/banner';//倒计时
import technicalSupport from 'components/technicalSupport' //技术支持


export default {
  components: {
    defaultImg,countDown,technicalSupport,banner
  },
  data () {
    return {
        isShow:true,
        isSoldOut:false,//判断下架
        SoldOut:'',//错误信息
        isCardRecevie: false,//判断不是批发
        background: '',
        goodsId:'',
        goodsData:{
            auctionResult:{
                depositMoney:''
            },
            productPrice:[
                '',''
            ]
        },
        path:'',
        imgUrl:'',
        webPath:'',
        imgSelecte:0,
        type:'',
        dialogData:{},
        isProductCode:false,//商品编号,
        guigePrice:'',//规格集合分类
        specificaList:'',//规格集合，
        spec_num:1,//数量默认
        min_nav:[
            {
                title:'商品详情',
                name:'details'
            },
            {
                title:'规格参数',
                name:'spec'
            },
            {
                title:'商品评价',
                name:'comment'
            }
        ],
        nav_choice: '',
        detailsData:'',
        isDetails:false,
    }
  },
  watch: {
      'nav_choice'(a,b){
        a == 'details'?this.isDetails = true:this.isDetails =false;
      }
  },
  methods: {
    dialogShow(){
        if(this.isSoldOut) return;
        this.isShow = true;
    },
    /** 
     * 查询商品接口
    */
    phoneProductAjax(){
        let _this = this ;
        let activityId = _this.$route.params.activityId
        activityId == 'undefined' ? activityId=0 : activityId;
        this.commonFn.ajax({
            'url': h5App.activeAPI.phoneProduct_getProduct_post,
            'data':{
                url: _this.$store.state.loginDTO_URL,
                browerType: _this.$store.state.browerType,
                shopId : _this.$store.state.shopId,
                busId : _this.$store.state.busId,
                productId :  _this.$route.params.goodsId,
                type: _this.$route.params.type,
                activityId: activityId,
            },
            'success':function(data){
                console.log(data);
                 if(data.code == -1){
                    _this.$parent.$refs.bubble.show_tips(data.msg);//bubble_hint*/
                    return
                }
                
                if(data.code == 1006 || data.code == 1007 || data.code == 1011){
                    _this.isSoldOut = true;
                    _this.SoldOut = data.msg;
                }

                _this.goodsData = data.data;
                _this.path = data.path;
                _this.imgUrl = data.imgUrl;
                _this.webPath = data.webPath;

                _this.goodsData.productPrice = _this.commonFn.moneySplit(data.data.productPrice)//价钱显示效果

                if(_this.type == 4){//拍卖，分割价钱
                    let depositMoney = data.data.auctionResult.depositMoney
                     _this.goodsData.auctionResult.depositMoney = _this.commonFn.moneySplit(depositMoney);
                }
                _this.detailsAjax();
                //弹出规格初始数据--有规格匹配
                if(data.data.isSpecifica){
                     _this.productDetailAjax({
                        productId: _this.$route.params.goodsId,
                        invId: data.data.invId,
                        type: _this.$route.params.type,
                        activityId: activityId,
                        isShowCommission: data.data.isShowCommission
                    });
                    return
                }
                //弹出规格初始数据--无规格匹配
                _this.dialogData.inv_price = _this.commonFn.moneySplit(data.data.productPrice);//价钱
                _this.dialogData.inv_code = data.data.productCode;//默认编号
                _this.dialogData.inv_num = data.data.productStockTotal;//默认库存
                let imageLists = _this.goodsData.imageList;//默认图片
                    imageLists.forEach((item,index)=>{
                        if(item.isMainImages == 1){
                            _this.dialogData.specifica_img_url = item.imageUrl;
                        }  
                })
            }
        })
    },
    /** 
     * 查询商品规格接口(规格弹出框调用)
     */
    productDetailAjax(data){
        let _this = this;
        let _data = data;
        let activityId = _this.$route.params.activityId;
        this.commonFn.ajax({
            'url': h5App.activeAPI.phoneProduct_getSpecifica_post,
            'data':_data,
            'success':function(data){
                console.log(data,'data批發')
                _this.specificaList = data.data.specificaList;
                _this.guigePrice = data.data.guigePrice;
                
                _this.guigePrice.forEach((item,i)=>{//弹出规格初始值
                    item.specifica_ids = item.specifica_ids.split(',');
                    if(item.id == _data.invId){
                        item.inv_price = _this.commonFn.moneySplit(item.inv_price);//分割价钱
                        _this.dialogData = item;
                        if(!item.specifica_img_url){
                            //判断是规格集合里面是否有匹配图片没有使用img主图
                            let imageLists = _this.goodsData.imageList;
                                imageLists.forEach((item,index)=>{
                                    if(item.isMainImages == 1){
                                        _this.dialogData.specifica_img_url = item.imageUrl;
                                    }  
                            });
                        }
                    }
                })
            }
        })

    },
    /**
     * 选择规格 
     * @param id 选择INV_id
     */
    choice_product(e){
        let _this = this ;
        let specs= [],invid;
        if(e){//获取选中值 存成数组
            $(e.target).siblings().removeClass('shop-bg');
            $(e.target).addClass('shop-bg');
        }
        for(var i = 0 ;i<$('.js-specValue .shop-bg').length;i++){
            specs.push($('.js-specValue .shop-bg').eq(i).attr('value'));
        }
        //获取选中值的规格集合
         _this.guigePrice.forEach((item,i) => {
             //判断两个数组完全相等 转字符串比较
             if(specs.toString() === item.specifica_ids.toString()){

                item.inv_price = _this.commonFn.moneySplit(item.inv_price);
                if(!item.specifica_img_url){
                    item.specifica_img_url = _this.dialogData.specifica_img_url;
                }
                _this.dialogData = item;
            }
        })
        //切换时规格时 如果规格 购买数量大于库存数量 则等于库存数量
        if(_this.spec_num >= _this.dialogData.inv_num){
            _this.spec_num = _this.dialogData.inv_num;
        }
    },
    /** 
     * 收藏店铺
     */
    collectProductAjax(){
        let _this = this;
        _this.commonFn.ajax({
            'url': h5App.activeAPI.phoneProduct_collectProduct_post,
            'data':{
                busId: _this.$store.state.busId,
                url: _this.$store.state.loginDTO_URL,
                browerType: _this.$store.state.browerType,
                productId :  _this.$route.params.goodsId,
            },
            'success':function(data){
                if(data.code==1){
                    _this.goodsData.isCollect = !_this.goodsData.isCollect;
                    if(_this.goodsData.isCollect){
                        _this.$parent.$refs.bubble.show_tips('收藏成功');
                    }else{
                        _this.$parent.$refs.bubble.show_tips('取消成功');
                    }
                }
            } 
        })
    },
    /** 
     * 规格数量加减
     */
    addSpec_number(e){
        let _this =this;
        if( e === '-'){//减小时，
            if(_this.spec_num<=1){
                 _this.$parent.$refs.bubble.show_tips('数量不能小于1');
                return
            }
            _this.spec_num --;
        }else{//增减时
            // 限购数量不为零时，购买数量不能超出限购数量
            if(_this.goodsData.maxBuyNum && (_this.spec_num >= _this.goodsData.maxBuyNum)){
                _this.$parent.$refs.bubble.show_tips('超出限购数量');
                return
            }
            //超出规格库存
            if(_this.spec_num >= _this.dialogData.inv_num){
                 _this.$parent.$refs.bubble.show_tips('超出现有库存量');
                 return
            }
            _this.spec_num ++;
        }
    },
    /** 
     * 切换副导航
     * @param name 子路由名字
    */
    nav_change(name){
        this.nav_choice = name;
        let hash = window.location.hash.split('#')[1];
        let _name =  hash.split('/')[2];
        let _hash= hash.split(_name)[0]+name+hash.split(_name)[1];
        this.$router.push(_hash);
    },
    /**
     * 商品详情请求
     */
    detailsAjax(){
      let _this = this;
      _this.commonFn.ajax({
        'url': h5App.activeAPI.phoneProduct_getProductDetail_post,
        'data':{
            productId :  _this.$route.params.goodsId,
        },
        'success':function(data){
            _this.detailsData = data.data;
        } 
      })
    }
  },
  beforeCreate() {
      this.$store.commit('show_footer',false);
    },  
  mounted () {
        this.commonFn.setTitle( '商品详情');
        this.goodsId = this.$route.params.goodsId;

        this.phoneProductAjax();
        this.type = this.$route.params.type;

        let _name =  window.location.hash.split('/')[2];
        this.nav_choice = _name;

        if(_name == 'details'){
            this.isDetails = true;
        }else{
            this.isDetails = false;
        }
        
  }
}
</script>

<style lang="less">
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
.goods-wrapper{
    width: 100%;
    position: relative;
    section{
        margin-bottom: 30/@dev-Width *1rem;
        background: #fff;
        font-size: 0;
    }
    .goods-main{
        padding-bottom: 168/@dev-Width *1rem;
    }
    
    .goods-info{
        width: 100%;
        padding: 30/@dev-Width *1rem 46/@dev-Width *1rem;
        .goods-info-money{
            margin: 15/@dev-Width *1rem 0;
            .shopGray{
                margin-left: 20/@dev-Width *1rem;
            }
        }
        .goods-bottom{
            width: 100%;
            padding-top: 5px;
        }
        .goods-info-other{
            .ik-box;
            .ik-box-pack(justify);
            margin-top: 5px;
            &>span{
                display: block;
            }
            .goods-info-time{
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
    .goods-selected{
        width: 100%;
        padding: 30/@dev-Width *1rem 22/@dev-Width *1rem 30/@dev-Width *1rem 46/@dev-Width *1rem;
        .goods-selected-main{
            width: 100%;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(justify);
            i{
                color: #c7c7cc;
            }
        }
    }
    .goods-address{
        width: 100%;
        padding-left: 46/@dev-Width *1rem;
        .goods-address-main{
            width: 100%;
            padding: 30/@dev-Width *1rem 0;
            .goods-address-txt{
                width: 94%;
                float: left;
            }
            .shopGray{
                color: #c7c7cc;
            }
        }
        .goods-address-postage{
            padding: 30/@dev-Width *1rem 0;
        }
    }
    .goods-prove{
        padding: 48/@dev-Width *1rem 30/@dev-Width *1rem;
        line-height: 1;
        span{
            margin-right: 30/@dev-Width *1rem;
        }
        i{
            font-size: 48/@dev-Width *1rem;
            font-weight: bold;
            margin-right: 3px;
            vertical-align: -0.02rem;
        }
    }
    .goods-shop{
        padding: 28/@dev-Width *1rem 30/@dev-Width *1rem ;
        .goods-shop-main{
            width: 100%;
            .goods-shop-info{
                float: left;
                width: 60%;
            }
            .goods-shop-rigtn{
                float: right;
                width: 40%;
                height: 158/@dev-Width *1rem;
                .ik-box;
                .ik-box-align(center);
                .ik-box-pack(justify);
                .goods-shop-buttom{
                    display: block;
                    .border-radius(3px);
                    padding: 5px 3px;
                }
            }
            .goods-shop-img{
                vertical-align: 0.4rem;
                display: inline-block;
                width: 88/@dev-Width *1rem;
                height: 88/@dev-Width *1rem;
                background-size: cover;
                .border-radius(100%);
                overflow: hidden;
                
            }
            .goods-shop-txt{
                display: inline-block;
                width: 82%;
                margin-left: 25 /@dev-Width *1rem;
                .goods-shop-name{
                    margin-bottom: 30 /@dev-Width *1rem;
                }
                span{
                    max-width: 74%;
                    display: inline-block;
                    vertical-align: -2px;
                }
                .goods-shop-km{
                    width: 33%;
                }
                .goods-shop-tel{
                    width: 64%;
                }
            }
        }
    }
    .goods-content{
        width: 100%;
        // padding-bottom: 1.05333333rem;
        position: relative;
        background: 0;
        .goods-content-nav{
            position: relative;
        }
        .goods-content-photo{
            width: 100%;
            img{
                width: 100%;
                height: auto;
                display: block;
            }
        }
    }
    .goods-footer{
        margin: 0;
        width: 100%;
        position: fixed;
        bottom: 0;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
        z-index: 1;
        .goods-footer-no{
            text-align: center;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            line-height: l;
            padding: 38/@dev-Width *1rem 0;
        }
        .goods-footer-content{
            .ik-box;
            background: #fff;
            &>div:nth-last-child(2),&>div:nth-last-child(1){
            color: #fff;
            }
        }
        .goods-footer-botton{
            position: relative;
            height: 158/@dev-Width *1rem;
            text-align: center;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(center);
            .ik-box-orient(vertical);
            i{
                margin-bottom: 10/@dev-Width *1rem;
                display: block;
                font-size: 68/@dev-Width *1rem;
            }
            em{
                font-size: 12px;
                text-align: center;
                position: absolute;
                top: 5%;
                right: 20%;
                min-width: 18px;
                // min-height: 18px;
                line-height: 18px;
                color: #fff;
                display: block;
                .border-radius(100%);
            }
        }
        .border-left{
            border-left: 1px solid #f1f1f1; 
        }
    }
    .ui-col-2{
        .ik-box-flex(3)
    }
    .ui-col-1{
        .ik-box-flex(2)
    }
    .goods-dialog{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        .goods-dialog-main{
            width: 100%;
            position: absolute;
            background: #fff;
            bottom: 0;
            animation: dialogShow 0.2s;
            -moz-animation: dialogShow 0.2s;	/* Firefox */
            -webkit-animation: dialogShow 0.2s;
        }
        .goods-dialog-title{
            font-size: 0;
            width: 100%;
            padding-left:  30/@dev-Width *1rem;
            &>span{
                padding: 30/@dev-Width *1rem 0;
                width: 90%;
                display: inline-block;
            }
            &>i{
                padding: 30/@dev-Width *1rem;
                display: inline-block;
                vertical-align: top;
            }
        }
        .goods-dialog-detl{
            padding:  15/@dev-Width *1rem 0;
            padding-left:  30/@dev-Width *1rem;
            width: 100%;
            .goods-dialog-img{
                border: 1px solid #eee;
                width: 265/@dev-Width *1rem;
                height: 265/@dev-Width *1rem;
                float: left;
                background-size: 100%;
                margin-right: 30/@dev-Width *1rem;
                overflow: hidden;
            }
            .goods-dialog-txt{
                float: left;
                width: 70%;
                padding: 10/@dev-Width *1rem 0;
                p{
                    margin-bottom: 10/@dev-Width *1rem;
                }
                .fs42{
                    margin-bottom: 30/@dev-Width *1rem;
                }
            }
        }
        .goods-dialog-choice{
            padding-left:  30/@dev-Width *1rem;
            width: 100%;
            font-size: 0;
            padding-bottom: 20/@dev-Width *1rem;
            .goods-choice-list2{
                width: 100%;
                .ik-box;
                .ik-box-align(center);
                .ik-box-pack(justify);
                height: 168 / @dev-Width *1rem;
                span{
                    display: inline-block;
                    padding: 20/@dev-Width *1rem;
                    background: #f3f2f8;
                    .border-radius(3px);
                    margin-right: 35/@dev-Width *1rem;
                }
            }
            .goods-choice-option1,.goods-choice-option2{
                width: 100%;
                padding-right: 35/@dev-Width *1rem;
                padding-bottom: 35/@dev-Width *1rem;
                .goods-choice-ul{
                    width: 100%;
                    .ik-box;
                    padding-right:35/@dev-Width *1rem; 
                    li{
                        text-align: center;
                    }
                    &>li:first-child{
                        text-align: left;
                    }
                    &>li:last-child{
                        text-align: right;
                    }
                }
                .goods-choice-li{
                    .ik-box-flex(1);
                }
            }
            .goods-choice-option2{
                .goods-choice-li{
                    p{
                        width: 100%;
                        height: 120/@dev-Width *1rem;
                        .ik-box;
                        .ik-box-align(center);
                        .ik-box-pack(center);
                    }
                }
                .goods-choice-ul{
                    &>li:first-child{
                        p{
                            .ik-box-pack(start);
                        }
                    }
                    &>li:last-child{
                        p{
                             .ik-box-pack(end);
                        }
                    }
                }
                .goods-option-number{
                    font-size: 0;
                    p{
                        font-size: 0;
                    }
                    em{
                        margin-right: 2px;
                        font-size: 42/ @dev-Width *1rem;
                    }
                    &>P>em:first-child,&>P>em:last-child{
                        font-weight: bold;
                        color: #87858f;
                    }
                }
            }
            .goods-choice-list{
                width: 100%;
                .goods-choice-title{
                    margin-top: 48 / @dev-Width *1rem;
                    float: left;
                    color: #87858f;
                    width: 90/@dev-Width *1rem;
                    margin-right: 20/@dev-Width *1rem;
                    height: 92 / @dev-Width *1rem;
                    .ik-box;
                    .ik-box-align(center);
                    line-height: 15px;
                }
                .goods-choice-box{
                    float: left;
                    width: 88%;
                    em{
                        margin-top: 48 / @dev-Width *1rem;
                        position: relative;
                    }
                    i{
                        text-align: center;
                        display: block;
                        position: absolute;
                        top: -18/ @dev-Width *1rem;
                        right: -18/ @dev-Width *1rem;
                        .border-radius(100%);
                        width: 50 / @dev-Width *1rem;
                        height: 50 / @dev-Width *1rem;
                        line-height: 46 / @dev-Width *1rem;
                        border: 1px solid #fff;
                        background:#ff3b30;
                        color: #fff;
                    }
                }
                .goods-choice-box2{
                    em{
                        padding: 0;
                        line-height: 90/ @dev-Width *1rem;
                        color: #87858f;
                        margin-top: 48 / @dev-Width *1rem;
                        width: 98/ @dev-Width *1rem;
                        height: 90/ @dev-Width *1rem;
                        text-align: center;
                        margin-right: 2px;
                        .border-radius(0);
                        font-weight: bold;
                        font-size: 68/ @dev-Width *1rem;
                        vertical-align: top;
                    }
                    &>em:nth-child(1){
                        border-top-left-radius: 3px;
                        border-bottom-left-radius: 3px;
                    }
                    &>em:nth-child(2){
                        font-size: 40/ @dev-Width *1rem;
                        font-weight:normal;
                        color: #333;
                        width: 120/ @dev-Width *1rem;
                    }
                    &>em:nth-child(3){
                        border-top-right-radius: 3px;
                        border-bottom-right-radius: 3px;
                    }
                }
            }
            .goods-choice-Total{
                width: 100%;
                padding: 40/@dev-Width *1rem  40/@dev-Width *1rem 0;
            }
        }
        .goods-dialog-footer{
            width: 100%;
            .ik-box;
            .goods-dialog-button{
                .ik-box-flex(1);
                text-align: center;
                color: #fff;
                padding: 40/@dev-Width *1rem 0;
            }
        }
    }

}
.goods-details{
    width: 100%;
    background: #fff;
    img{
        width: 100%;
        height: auto;
    }
}
.goods-info-txt{
    width: 100%;
    padding: 30/@dev-Width *1rem 0;
    color: #87858f;
}
.shop-header{
    position: fixed;
    width: 100%;
    background: #fff;
    .header-nav{
        .ik-box;
        .header-itme{
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
@keyframes dialogShow{
    from {bottom: -100%;}
    to {bottom: 0%;}
}
@-moz-keyframes dialogShow{ /* Firefox */
    from {bottom: -100%;}
    to {bottom: 0%;}
}
@-webkit-keyframes dialogShow{/* Safari 和 Chrome */
    from {bottom: -100%;}
    to {bottom: 0%;}
}
</style>
