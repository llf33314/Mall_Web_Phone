<template>
<div class="shop-wrapper order-wrapper">
    <header-nav :headers= "homeNav" :status="'cart'" style="z-index:3" :selectColor="'style-main-font'" :selectbg="'style-main-bg'" ></header-nav>
    <section class="shop-main order-main shoopCart-main" v-if="shopCartList != null ||  sxShopCartList != null">
        <div class="order-box" v-if="shopCartList != null ">
            <div class="order-item" v-for=" (cart,i) in shopCartList"
                :key = "i">
                <div class="order-item-title fs40" @click.self="jupm_cart(cart)">
                    <i  class="iconfont icon-dui"
                        :class="{'style-main-bg': cart.show}"
                        @click="select_Goods(cart)"></i>
                    <div class="order-title-img" @click="jupm_cart(cart)">
                      <default-img :background="cart.userImageUrl"
                                  :isHeadPortrait="1" :size="'.3rem'">
                      </default-img>
                    </div>
                    <span @click.self="jupm_cart(cart)">{{cart.userName}}</span>
                </div>
                <div class="shopping-box" :class="{'pf-box':type == 1}"
                    v-for="(shop,j) in cart.shopResultList"
                    :key="j">
                    <div class="order-shop border">
                        <p class="order-shop-name"  @click.self="jupm_shop(shop,cart.busId)"> 
                            <i class="iconfont icon-dui" :class="{'style-main-bg':shop.show}"
                            @click="select_Goods(shop)"></i>
                            <i class="iconfont icon-dianpu" @click.self="jupm_shop(shop,cart.busId)"></i>
                            <span class="fs40"  @click.self="jupm_shop(shop,cart.busId)">{{shop.shopName}}</span>
                            <i class="iconfont icon-you" ></i>
                        </p>
                        <p class="fs42 shopGray" @click="edit(i,j,shop)">
                            <span class="buttom" v-if="!shop.edit">编辑</span>
                            <span class="buttom" v-else >完成</span>
                        </p>
                    </div>
                    <div class="order-item-box">
                        <div class="order-item" :class="{'border': type == 1}"
                            v-for="(goods,index) in shop.productResultList"
                            :key="index">
                            <delete-slide class="order-item-content" 
                                @delete="delete_dialog(1,goods)"
                                :deletebg="'style-main-bg'"
                                :scope="index">
                                <div class="shoopCart-content" :class="{'border': type == 1}">
                                    <div class="order-item-img" >
                                        <a @click="jupm_goods(goods)">
                                        <default-img :background="imgUrl+goods.productImageUrl"
                                                    :isHeadPortrait="0"
                                                    :size="'0.8rem'">
                                        </default-img>
                                        </a>
                                        <i class="iconfont icon-dui" :class="{'style-main-bg':goods.show}"
                                            @click="select_Goods(goods)"></i>
                                    </div>
                                    <div class="order-item-txt">
                                        <p class="fs42" :class="{'text-overflow': type == 1}"
                                            @click="jupm_goods(goods)">{{goods.productName}}</p>
                                        <!----------------购物车 未编辑时↓------------------>
                                        <p v-if="!shop.edit && goods.pfType == 1" 
                                        class="fs42 " :class="[ goods.productHyPrice >0 ?'shopGray':'style-main-font']"><span class="fs32">¥</span>{{goods.productPrice | moneySplit1}}<span class="fs32">.{{goods.productPrice | moneySplit2}}</span></p>
                                        <div v-if="!shop.edit && goods.pfType == 0">
                                            <p class="fs36 shopGray">
                                                <span v-if="goods.productSpecifica>0">{{goods.productSpecifica}}/</span>
                                                <span>{{goods.productNum}}份</span>
                                            </p>
                                            <p class="fs42 " :class="[ goods.productHyPrice >0 ?'shopGray':'style-main-font']"><span class="fs32">¥</span>{{goods.productPrice | moneySplit1}}<span class="fs32">.{{goods.productPrice | moneySplit2}}</span></p>
                                            <p class="fs42 style-main-font" v-if="goods.productHyPrice>0"><span class="fs32">会员价:¥</span>{{goods.productHyPrice|moneySplit1}}<span class="fs32">.{{goods.productHyPrice|moneySplit2}}</span></p>
                                        </div>
                                        <!----------------购物车 编辑时↓------------------>
                                        <div class="goods-choice-box2" v-else-if="shop.edit && goods.pfType == 0">
                                            <em class="em-choice" 
                                                @click="addNumber('-',goods)">-</em>
                                            <input class="em-choice"
                                                v-model="goods.productNum" 
                                                @blur="addNumber('',goods)">
                                            </input>
                                            <em class="em-choice" 
                                                @click="addNumber('+',goods)">+</em>
                                        </div>
                                        <!----------------批发购物车 手批↓------------------>
                                        <div v-if=" goods.pfType == 1 && shop.edit">
                                        <p class="fs42 pf1-buttom-box">
                                            <span  class="style-main-font pf1-buttom pf1-buttom-b"
                                            @click="addpf1('-',goods)">减一手</span>
                                            <span class="style-main-bg pf1-buttom"
                                            @click="addpf1('+',goods)">加一手</span>
                                        </p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </delete-slide>
                            <!----------------批发购物车 手批↓-规格------------------>
                            <p class="shopGray fs40 border pf1-spec" v-if=" goods.pfType == 1">
                                规格 : <span v-for=" (pifa,index) in goods.pifaSpecificaList":key="index">
                                    {{pifa.specificaValues+' X'+pifa.productNum}} ¥{{pifa.specificaPrice | currency}}
                                    <i v-if=" index <  goods.pifaSpecificaList.length-1">、</i>
                                </span> 
                            </p>
                            <!----------------批发购物车 混批↓-规格------------------>
                            <div class="shopGray fs40 pf2-spec " v-if=" goods.pfType == 2">
                                <div class="pf2-list border" 
                                    v-for=" (pifa,index) in goods.pifaSpecificaList"
                                    :key="index">
                                    <i class="iconfont icon-dui" :class="{'style-main-bg':pifa.show}"
                                    @click="select_Goods(pifa)"></i>
                                    <p class="pf2-list-spec">
                                        <span class="fs42" style="color:#000">规格 :{{pifa.specificaValues+' X'+pifa.productNum}} </span>
                                        <span class="style-main-font fs36" >¥<i class="fs50">{{pifa.specificaPrice | moneySplit1}}</i>.{{pifa.specificaPrice | moneySplit2}}</span>
                                    </p>
                                    <div class="goods-choice-box2" v-if=" goods.pfType == 2 && shop.edit">
                                        <em class="em-choice" 
                                            @click="addpf2('-',pifa,goods)">-</em>
                                        <input class="em-choice"
                                            v-model="pifa.productNum" 
                                            @blur="addpf2('',pifa,goods)">
                                        </input>
                                        <em class="em-choice" 
                                            @click="addpf2('+',pifa,goods)">+</em>
                                    </div>
                                    <div style="width: 2.28rem;" v-else></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----店铺小计---->
                    <p class="fs36 pf-min-pifaTotal" v-if="type == 1">
                        {{shop.num}}件，小计:<span class="style-main-font">￥<span class="fs42">{{shop.money | moneySplit1 }}</span>.{{shop.money | moneySplit2 }}</span>
                    </p>
                </div>
                <!----商家小计---->
                <p class="fs36 cart-min-pifaTotal" v-if="type == 1">
                       {{cart.num}}件，小计:<span class="style-main-font">￥<span class="fs42">{{cart.money|currency | moneySplit1 }}</span>.{{cart.money |currency| moneySplit2 }}</span>
                </p>
            </div>
        </div>
        <div class="sxorder-box" v-if=" sxShopCartList != null ">
            <p class="sxorder-box-title fs42" >
                以下商品无法购买
            </p>
            <div class="order-item" 
                v-for=" (cart,i) in sxShopCartList" 
                :key="i">
                <div class="order-item-title fs40" @click="jupm_cart(cart)">
                    <div class="order-title-img">
                      <default-img :background="cart.userImageUrl"
                                  :isHeadPortrait="1"
                                  :size="'0.3rem'">
                      </default-img>
                    </div>
                    <span>{{cart.userName}}</span>
                </div>
                <div class="shopping-box"
                    v-for="(shop,j) in cart.shopResultList"
                    :key="j">
                    <div class="order-shop border" @click="jupm_shop(shop,cart.busId)">
                        <p class="order-shop-name">
                            <i class="iconfont icon-dianpu"></i>
                            <span class="fs40">{{shop.shopName}}</span>
                            <i class="iconfont icon-you" ></i>
                        </p>
                    </div>
                    <div class="order-item-box">
                        <div class="order-item-content" :class="{'sx-content':type == 1}"
                            v-for="(goods,index) in shop.productResultList"
                            :key="index">
                            <div class="shoopCart-content" >
                                <div class="order-item-img">
                                  <default-img :background="imgUrl+goods.productImageUrl"
                                                :isHeadPortrait="0"
                                                :size="'0.8rem'">
                                  </default-img>
                                </div>
                                <div class="order-item-txt" >
                                    <p class="fs42" :class="{'text-overflow': type == 1}">{{goods.productName}}</p>
                                    <div v-if="!shop.edit && type != 1">
                                        <p class="fs36 shopGray">
                                            <span v-if="goods.productSpecifica>0">{{goods.productSpecifica}}/</span>
                                            <span>{{goods.productNum}}份</span>
                                        </p>
                                        <p class="fs42 " :class="[ goods.productHyPrice >0 ?'shopGray':'style-main-font']"><span class="fs32">¥</span>{{goods.productPrice | moneySplit1}}<span class="fs32">.{{goods.productPrice | moneySplit2}}</span></p>
                                        <p class="fs42 style-main-font" v-if="goods.productHyPrice>0"><span class="fs32">会员价:¥</span>{{goods.productHyPrice|moneySplit1}}<span class="fs32">.{{goods.productHyPrice|moneySplit2}}</span></p>
                                    </div>
                                    <div v-if="type == 1" class="pf-box">
                                        <p class="fs40 style-main-font">{{goods.errorMsg}}</p>
                                        <p class="fs36 style-main-font shop-textr pf1-buttom-box">￥<span class="fs50">{{goods.productPrice|moneySplit1}}</span>.{{goods.productPrice|moneySplit2}}
                                            <span class="fs50">X{{goods.productNum}}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p class="shopGray fs40 border sxpf1-spec" v-if="type == 1"> 规格 :
                                <span v-for=" (pifa,index) in goods.pifaSpecificaList":key="index">
                                    {{pifa.specificaValues+' X'+pifa.productNum}}
                                    <i v-if=" index <  goods.pifaSpecificaList.length-1">、</i>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fs42 sxorder-button style-main-border" 
                @click="delete_dialog(2)">清空失效商品
            </div>
        </div>
        <div class="shopping-footer clearfix" style="z-index:2" :class="{'shopping-footer-bottom-clear' : !$store.state.isShowFooter}">
            <div class="pifa-warning-box" v-if="pifawarning && type == 1">
                <div class="pifa-warning">
                    <p class="fs40" v-if="spHand-pifa1num > 0">
                        手批商品还差 {{spHand-pifa1num}} 手
                        <span v-if="spHand-pifa1num > 0 && (hpNum-pifa2num > 0 || hpMoney-pifa2money >0)">
                            ; 
                        </span>
                    </p>
                    <p class="fs40" v-if="hpNum-pifa2num > 0 || hpMoney-pifa2money >0">
                        混批商品还差
                        <span v-if="hpNum-pifa2num >0"> {{hpNum-pifa2num +'件'}} </span>
                        <span v-if="hpNum-pifa2num >0 && hpMoney-pifa2money >0">,或</span> 
                        <span v-if="hpMoney-pifa2money >0">{{(hpMoney-pifa2money | currency)+'元'}}</span>
                    </p>
                    <p class="fs40">,可混批</p>
                </div>
            </div>
            <div class="shopping-footer-l fs40" >
                <i class="iconfont icon-dui"
                :class="{'style-main-bg':isPifaAmount}"
                @click="select_PifaAmount()"
                ></i>
                合计：<span class="style-main-font">￥{{pifaTotal | currency}}</span>
            </div>
            <div class="shopping-footer-r">
                <div class="shopping-buttom fs50 style-middle-bg" @click="choose()">
                    继续选购
                </div>
                <div class="shopping-buttom fs50 style-main-bg" @click="settlementAjax(1)">
                    去结算({{pifaAmount}})
                </div>
            </div>
        </div>
    </section>
    <section class="shop-main-no fs40 my-bond" v-if="shopCartList == null && sxShopCartList == null">
        <content-no :statu='bondStatu'></content-no>
    </section>
</div>
</template>

<script>

import headerNav from 'components/headerNav'
import deleteSlide from './component/deleteSlide'
// import filter from '../../../lib/filters'// 过滤器
import dialogModular from 'components/dialogModular'// 过滤器

export default {
  name: 'shippingCart',
  data(){
    return{
        isShow: true,
        homeNav:[
            { id: 0, name: "购物车" },
            { id: 1, name: "批发商购物车" }
        ],
        isNavshow: 'cart',
        bondStatu: 3,
        hpMoney:'', //混批最低金额
        hpNum:'',//混批最低数量
        spHand:'',//手批最低数量
        shopCartList: 1,//购物车集合
        sxShopCartList:  1,//失败购物车集合
        imgUrl: '',
        path: '',
        webPath: '',
        type:'',//0正常购买，1批发购买,
        pifaTotal:'0.00',
        pifaAmount: 0,
        isPifaAmount: true,
        selectCart:'',//选中的商家
        selectShop:'',//选中的店铺
        selectGoods:[],//选中的商品
        selectClass:[],//选中的商品
        settlement:[],//结算数据
        settlementarr:[],
        pifawarning:false,//批发条件判断  true 是为满足 显示批发提醒 false满足 不显示批发提醒
        pifa1num : 0,//当前手批 手数
        pifa2num : 0,//当前混批 个数
        pifa2money: 0,//当前混批 金额
        flag:false// 批发结算条件判断开启
    }
  },
  components:{
	  headerNav,deleteSlide,dialogModular
  },
  watch: {
    '$route'(){
        let type = this.$route.params.type;
        type==0?this.commonFn.setTitle( '购物车'):this.commonFn.setTitle( '批发商购物车');
        this.type = type;
        this.cartAjax();
    },
    'shopCartList'(a,b){
        let _this = this;
        let ispifaAmount = true;//判断合计点亮

        let pifaTotal = 0;
        _this.pifaAmount = 0;
        if( _this.shopCartList != null &&  _this.shopCartList.length > 0){
            //监听选中购物车数据
            _this.shopCartList.forEach((item,i)=>{
                let isBusSelect = true;//判断商家点亮

                item.shopResultList.forEach((test,j)=> {
                    let isShopSelect = true;//判断商家店铺点亮

                    test.productResultList.forEach((m, n) => {
                        //批发
                        if(_this.$route.params.type == 1){
                            let isGoodsSelect = true;//批发--商品点亮
                            m.pifaSpecificaList.forEach((a,b)=>{
                                if(a.show){//商品点亮
                                    if(ispifaAmount){
                                        _this.isPifaAmount = true;
                                    }
                                    if( isBusSelect){
                                        item.show = true;
                                    }
                                    if (isShopSelect) {
                                        //店铺下的商品全部选择时，店铺都选择;
                                        test.show = true;
                                    }
                                    if (isGoodsSelect) {
                                        //店铺下的商品全部选择时，店铺都选择;
                                        m.show = true;
                                    }
                                }else{//商品不亮
                                    isBusSelect = false;
                                    isShopSelect = false;
                                    ispifaAmount = false;
                                    isGoodsSelect = false;
                                    item.show = false;
                                    test.show = false;
                                    m.show = false;
                                    a.show=false;
                                    _this.isPifaAmount = false;
                                }
                            })
                        }
                        //正常购物
                        if(_this.$route.params.type != 1){
                            if(m.show){//商品点亮
                                if(ispifaAmount){
                                    _this.isPifaAmount = true;
                                }
                                if( isBusSelect){
                                    item.show = true;
                                }
                                if (isShopSelect) {
                                    //店铺下的商品全部选择时，店铺都选择;
                                    test.show = true;
                                }
                            }else{//商品不亮
                                isBusSelect = false;
                                isShopSelect = false;
                                ispifaAmount = false
                                item.show = false;
                                test.show = false;
                                m.show = false;
                                _this.isPifaAmount = false;
                            }
                        }
            
                    })
                })

                //总价计算
                //批发商家小计--清空
                item.num = 0;
                item.money = 0; 
                item.shopResultList.forEach((test,j)=>{
                    //批发店铺小计--清空
                    test.num = 0;
                    test.money = 0;
                    test.productResultList.forEach((e,n)=>{
                        if(e.show){
                            //批发
                            if(_this.$route.params.type == 1){
                                e.pifaSpecificaList.forEach((a,b)=>{
                                    if(a.show){
                                        //商家小计 数量 金额
                                        item.num += a.productNum;
                                        item.money += a.productNum * a.specificaPrice;
                                        //店铺小计 数量 金额
                                        test.num += a.productNum;
                                        test.money += a.productNum * a.specificaPrice;
                                        pifaTotal += a.productNum * a.specificaPrice
                                    }
                                    _this.pifaAmount += a.productNum;
                                })
                                
                            }else{
                            //正常购买
                                if(e.productHyPrice>0){ //会员价
                                    pifaTotal += e.productNum * e.productHyPrice
                                }else{ //商品价
                                    pifaTotal += e.productNum * e.productPrice
                                }
                                _this.pifaAmount += e.productNum;
                            }
                        }
                    })
                })
                //批发条件审核
            });
        }
        _this.pifaTotal = pifaTotal;

        if(_this.flag){
            _this.pifa_if();
        }
        
    }
  },
  methods:{
    /**
     * 购物车请求
     */
    cartAjax(){
        let _this = this;
        _this.hpMoney='';
        _this.hpNum='';
        _this.spHand='';
        _this.shopCartList= null;//购物车集合
        _this.sxShopCartList = null//失败购物车集合
        let _data = {
            url: _this.$store.state.loginDTO_URL,
            browerType:_this.$store.state.browerType,
            busId:_this.$route.params.busId,
            shopId: _this.$route.params.shopId,
            ucLogin: 1,//不需要登陆
        }
        if(_this.$route.params.type == 1){
            //批发购买条件 1
            _data.type = 1;
        }

        _this.ajaxRequest({
            'status': false,
            'url': h5App.activeAPI.phoneShopCart_getShopCartx_post,
            'data':_data,
            'success':(data)=>{
                if(data.code == 1){
                    let msg={
                        type :'error',
                        msg :  data.msg
                    }
                    _this.$store.commit("error_msg", msg);
                    _this.shopCartList =  null;//购物车集合
                    return
                }
                _this.imgUrl = data.imgUrl;
                _this.path = data.path;
                _this.webPath = data.webPath;

                console.log(data,'购物车数据');
                if(data.data == null){
                    return;
                }
                _this.hpMoney=data.data.hpMoney;
                _this.hpNum=data.data.hpNum;
                _this.spHand=data.data.spHand;
                _this.shopCartList=data.data.shopCartList || null;//购物车集合
                _this.sxShopCartList = data.data.sxShopCartList || null//失败购物车集合

                let pifaTotal = 0;
                if( _this.shopCartList != null &&  _this.shopCartList.length > 0){
                    //全选后的总价
                    _this.shopCartList.forEach((item,i)=>{
                        item.show = true;
                        //批发时 添加 小计 数量和金额
                        if(_this.$route.params.type == 1){
                            item.num = 0;
                            item.money = 0;
                        }
                        item.shopResultList.forEach((test,j)=>{
                            test.show = true;
                            test.edit = false;
                            if(_this.$route.params.type == 1){
                                test.num = 0;
                                test.money = 0;
                            }
                            test.productResultList.forEach((e,n)=>{
                                e.show = true;
                                if(_this.$route.params.type == 1){
                                    e.pifaSpecificaList.forEach((a,b)=>{
                                        a.show = true;
                                    })
                                }
                                pifaTotal += e.productNum*e.productHyPrice;
                                _this.pifaAmount += e.productNum;
                            })
                        })
                    });
                }
                _this.pifaTotal = pifaTotal;
            }
        })
      },
    /**
     * 删除弹出窗
     * @param index  当前要删除的对象
     * @param c  1删除 2清空
     */
    delete_dialog(c,goods){
        if(c===1){
            let data = this.settlementData(goods,2);
            if(this.$route.params.type == 1 ){
                this.deleteAjax(data.pifatSpecificaDTOList,goods.id);
            }else{
                this.deleteAjax(data);
            }
        }else if(c===2){
            let _this = this;
            let  msg = {//弹出框组件调用
                'btnNum': '2',
                'dialogMsg': '确定清空失效商品？',
                'btnOne': '确定',
                'btnTow': '取消',
                'dialogTitle':'提示',
                'callback': {
                    'btnOne': function () {
                        //关闭
                        let pifaSpecificaList = [];
                        let ids = [];
                        _this.sxShopCartList.forEach((item,i)=>{
                            item.shopResultList.forEach((test,j) => {
                                test.productResultList.forEach((e,n)=>{
                                    if(_this.type ==1 ){
                                        //批发
                                        e.pifaSpecificaList.forEach((a,b)=>{
                                            console.log(a,e);
                                            if($.inArray(a.id, ids) == -1){
                                                //新增当前修改
                                                ids.push(a.id);
                                            }
                                            let data = {
                                                id: a.id, // 购物车id
                                                productId: e.productId, //商品id
                                                productNum: a.productNum, //商品数量
                                                specificaValueIds: a.specificaValueIds, //规格值id
                                            }
                                            pifaSpecificaList.push(data);
                                        })
                                    }else{
                                        //正常清空
                                        ids.push(e.id)
                                    }
                                })
                            });
                        })

                        if(_this.type == 1 ){
                            _this.deleteAjax(pifaSpecificaList,ids);
                        }else{
                            _this.deleteAjax('',ids);
                        }
                    },
                    'btnTow': function () {

                    }
                }
            }
          
            _this.$parent.$refs.dialog.showDialog(msg);//弹出框
        }
        //this.deleteAjax(_id);
    },
    /**
     * 删除购物车请求
     * @param data 删除购物车id
     */
    deleteAjax(data,ids){
        let _this = this;

        let _data={}
         //批发删除 需要ids，pifaSpecificaList
        if(_this.type == 1 ){
            _data.ids = ids.toString();
            _data.pifaSpecificaList = JSON.stringify(data);
           
        }else{
            //正常删除 只需要ids
            if(data == ''){
                //清空
                _data.ids = ids.toString()
            }else{
                //删除
                _data.ids = data.id.toString()
            }
        }
        console.log(_data,'_data删除数据');
        _this.ajaxRequest({
            'url': h5App.activeAPI.phoneShopCart_removeShopCart_post,
            'data':_data,
            'success':(data)=>{
                let msg={
                    type :'success',
                    msg :  '删除成功'
                };
                _this.$store.commit("error_msg", msg);
                _this.settlement = [];
                _this.settlementarr = [];
                _this.cartAjax()
            }
        })
    },
    /**
     * 选中效果
    */
    select_Goods(e){
        let _this = this;
        let _show = !e.show;
        console.log(e,'选中效果')
        if(typeof e.shopResultList !== 'undefined'){
        //当前点击是在 商家 第一层数据
            e.show = _show;
            e.shopResultList.forEach((item,i)=>{
              item.show = _show;
              item.productResultList.forEach((test,j)=>{
                test.show = _show;
                if(_this.type == 1 ){
                    test.pifaSpecificaList.forEach((a,b)=>{
                        a.show = _show
                    })
                }
              })
            })
        }else if(typeof e.productResultList !== 'undefined'){
        //当前点击是在 店铺 第二层数据
            e.show = _show;
            e.productResultList.forEach((test,j)=>{
                test.show = _show;
                if(_this.type == 1 ){
                    test.pifaSpecificaList.forEach((a,b)=>{
                        a.show = _show
                    })
                }
            })
        }else if(typeof e.pifaSpecificaList !== 'undefined'){
        //当前点击是在 商品 第三层数据
            e.show = _show;
            e.pifaSpecificaList.forEach((m,n)=>{
                m.show = _show;
            })
        }else{
        //当前点击是在 规格 第四层数据
            e.show = _show;
            console.log('规格',e)
        }
      this.shopCartList.push([]);
      this.shopCartList.pop();
    },
    /** 
     * 合计选择
     */
    select_PifaAmount(){
        this.shopCartList.push([]);
        this.shopCartList.pop();
        let _show =  !this.isPifaAmount
        this.isPifaAmount = _show;
        this.shopCartList.forEach((item,i)=>{
            item.show = _show;
            item.shopResultList.forEach((test,j)=>{
                test.show = _show;
                test.productResultList.forEach((e,n)=>{
                    e.show = _show;
                })
            })
        });
    },
    /** 
     * 编辑按钮
     * @param i 商家 索引
     * @param j 店铺 索引
     * @param e 当前 商家
     */
    edit(i,j,e){

        e.edit = !e.edit;
        let obj = this.shopCartList[i].shopResultList;
        this.$set(obj,j,e);
        if(!e.edit){
            this.settlementAjax(2);
        }
        
    },
    /** 
     * 继续选购--跳转分类页
    */
    choose(){
        let busId =  this.$route.params.busId || this.$store.state.busId;
        let shopId = this.$route.params.shopId || this.$store.state.shopId;
        this.$router.push('/classify/'+shopId+'/'+busId+'/'+'0/k=k');
    },
    /** 
     *编辑数据处理  -- 集合 settlement settlementarr
    */
    settlementHandle(e){
        let _this = this;

        _this.shopCartList.push([]);
        _this.shopCartList.pop();

        let obj = _this.settlementData(e,1);

        if($.inArray(e.id, _this.settlementarr) == -1){
            //新增当前修改
            _this.settlementarr.push(e.id);
            _this.settlement.push(obj)
        }else{
            //替换已有修改
            _this.settlement.forEach((item,i)=>{
                if(item.id == e.id){
                    this.$set(_this.settlement,i,obj)
                }
            })
        }
        //console.log(_this.settlement,'_this.settlement集合数据');
    },
    /** 
     * 正常结算----添加数量
     * @param c 加减判断
     * @param e 当前数据
    */
    addNumber(c,e){
        let _this = this;
        console.log(e,'e修改数据')
        let re = /^[0-9]+$/ ;
            
        if(!re.test( e.productNum)){
            _this.$store.commit("error_msg", '请输入大于0的整数');
            e.productNum = 1 ;
        
        }else if( e.stockNum == 0){
            //库存为0 
            e.productNum = 0 ;
            _this.$store.commit("error_msg", '商品已售罄');
        }else if( c === '-' || c === ''){
            //减小时 或者 手动输入
            e.productNum--;

            if(e.productNum <= 0){
                _this.$store.commit("error_msg", '数量不能小于1');
                e.productNum = 1 ;
            }
        }else{//增减时

            //限购数量不为零时，购买数量不能超出限购数量
            if(e.maxBuyNum && ( e.productNum >= e.maxBuyNum)){
                _this.$store.commit("error_msg", '超出限购数量');
                
            }else  if(e.productNum >= e.stockNum){
                //库存不为0，超出规格库存
                _this.$store.commit("error_msg", '超出现有库存量');
                e.productNum = e.stockNum;
            }else if(c === '+'){
                e.productNum ++;
            }
        }

        //编辑数据处理  -- 集合 settlement settlementarr
        this.settlementHandle(e);
    },
    /** 
     * 手批----添加数量
     * @param c 加减判断
     * @param e 当前数据
    */
    addpf1(c,e){
        let _this = this;
        let num = 0;//一手商品的数量；
        num = e.pifaSpecificaList.length;
        console.log(c,e,'手批e修改数据',num,'一手商品的数量')
        if( e.stockNum == 0){
            //库存为0 
            e.productNum = 0 ;
            _this.$store.commit("error_msg", '商品已售罄');
        }else if( c === '-' ){
            //减小时 或者 手动输入
            e.productNum -= num;
            e.pifaSpecificaList.forEach((item,i)=>{
                item.productNum --;
            })
            if(e.productNum <= 0){
                _this.$store.commit("error_msg", '数量不能小于1');
                e.productNum = num ;
                 e.pifaSpecificaList.forEach((item,i)=>{
                    item.productNum = 1;
                })
            }
        }else{//增减时

            //限购数量不为零时，购买数量不能超出限购数量
            if(e.maxBuyNum && ( e.productNum >= e.maxBuyNum)){
                _this.$store.commit("error_msg", '超出限购数量');
                
            }else  if(e.productNum >= e.stockNum){
                //库存不为0，超出规格库存
                _this.$store.commit("error_msg", '超出现有库存量');
                e.productNum = e.stockNum;
            }else if(c === '+'){
                e.productNum += num;
                e.pifaSpecificaList.forEach((item,i)=>{
                    item.productNum ++;
                })
            }
        }
       //编辑数据处理  -- 集合 settlement settlementarr
        this.settlementHandle(e);
    },
    /** 
     * 混批 ---- 添加数量
     * @param c 加减判断
     * @param e 当前数据
     * @param goods 店铺信息
    */
    addpf2(c,e,goods){
        let _this = this;
        //console.log(e,'混批修改数据');
        if( e.stockNum == 0){
            //库存为0 
            e.productNum = 0 ;
            _this.$store.commit("error_msg", '商品已售罄');
        }else if( c === '-' ){
            //减小时 或者 手动输入
            e.productNum --;
            if(e.productNum <= 0){
                _this.$store.commit("error_msg", '数量不能小于1');
                e.productNum = num ;    
            }
        }else{//增减时

            //限购数量不为零时，购买数量不能超出限购数量
            if(goods.maxBuyNum && ( e.productNum >= goods.maxBuyNum)){
                _this.$store.commit("error_msg", '超出限购数量');
                
            }else  if(e.productNum >= e.stockNum){
                //库存不为0，超出规格库存
                _this.$store.commit("error_msg", '超出现有库存量');
                e.productNum = e.stockNum;
            }else if(c === '+'){
                e.productNum ++;
            }
        }
        //goods.productNum
        let Num = 0;
        goods.pifaSpecificaList.forEach((item,i)=>{
            Num += item.productNum;
        })
        goods.productNum = Num;
       //编辑数据处理  -- 集合 settlement settlementarr
        this.settlementHandle(goods);
    },
    /**
     * 结算请求
     * @param c    判断去结算1 还是 编辑商品数量提交2
     */
    settlementAjax(c){
        let _this = this;
        let _data ={
            str:[]
        }; 
        let shopCartIds=[]; 

        if(c === 1){
            //去结算1
            _this.flag = true;
            _this.pifa_if();
            _this.shopCartList.forEach((item,i)=>{
                item.shopResultList.forEach((test,j)=>{
                    test.productResultList.forEach((e,n)=>{
                        if(e.show){
                            if(_this.type == 1 && _this.pifawarning)return;
                            let obj = this.settlementData(e,1);
                            _data.str.push(obj);
                            shopCartIds.push(obj.id);
                        }
                    })
                })
            })

        }else{
            _data.str = _this.settlement
        }
        
        //无数据修改 不发送请求
        if(_data.str.length <=0) return; 

        //有数据修改，str换json，shopCartIds转字符串；
        _data.str = JSON.stringify(_data.str);
        console.log(_data,'请求数据')

        _this.ajaxRequest({
            'url': h5App.activeAPI.phoneShopCart_shopCartOrder_post,
            'data': _data,
            'success':(data)=>{
                if(c === 1){
                    //结算 成功跳转 订单页面 /order/settlement/:busId/1/:shopCartIds（购物车id）
                    shopCartIds = shopCartIds.toString();
                    let busId = this.$route.params.busId || this.$store.state.busId;
                    sessionStorage.setItem("payUrl",location.href);
                    _this.$router.push('/order/settlement/'+busId+'/1/'+shopCartIds);
                }else{
                     //编辑 请求成功后 清空之前编辑商品集合
                    _this.settlement = [];
                    _this.cartAjax();
                }
            }
        })
    
    },
    /** 
     * 结算删除请求--数据处理
     * @param e 当前修改商品 返回 传参需要格式
     * @param c 结算 1 删除2
     */
    settlementData(e,c){
        let _this = this;
        let obj = {
            id:  e.id,
        };
        //正常 
        if(c == 1){
            //-- 结算
            obj.productNum = e.productNum
        }
        //批发 -- 结算
        if( _this.type == 1 ){
            let arr=[];
            e.pifaSpecificaList.forEach((item,i)=>{
                let  _data= {
                    productId: item.id,
                    productNum: item.productNum,
                    specificaValueIds: item.specificaValueIds
                }
                if(c == 2){
                    //-- 删除 
                    _data.id = e.id;
                }
                arr.push(_data);
            })
            //批发规格集合
            obj.pifatSpecificaDTOList =  arr
        }
        return obj
    },
    /** 
     * 商品跳转
    */
    jupm_goods(e){
        let shopId = e.shopId ||this.$route.params.shopId || sessionStorage.getItem("shopId");
        let busId = e.busId ||this.$route.params.busId || sessionStorage.getItem("busId");
        let type = 0;
        let goodsId = e.productId;
        if(this.type == 1 ){
            type = 7;
        }
        this.$router.push('/goods/details/'+shopId+'/'+busId+'/'+type+'/'+goodsId+'/'+'0');
    },
    /** 
     * 商家跳转
    */
    jupm_cart(e){
        this.$router.push("/stores/"+e.busId);
    },
    /** 
     * 店铺跳转
    */
    jupm_shop(e,busId){
        this.$parent.getPageId(busId,e.shopId,true);
    },
    /** 
     * 结算条件判断
     */
    pifa_if(){
        let _this = this;
        _this.pifa2num = 0;
        _this.pifa2money =0;
        _this.pifa1num = 0;
        if(_this.flag){
            _this.shopCartList.forEach((item,i)=>{
                item.shopResultList.forEach((test,j)=>{
                    test.productResultList.forEach((e,n)=>{
                        if(e.show){
                            if(_this.type == 1 ){
                                if(e.pfType == 1){
                                    //手批
                                    _this.pifa1num += (e.productNum /e.pifaSpecificaList.length);
                                    //console.log(pifa1num,'手批个数')
                                }
                                if(e.pfType == 2){
                                    //混批
                                    e.pifaSpecificaList.forEach((a,b)=>{
                                        _this.pifa2num += a.productNum ;
                                        _this.pifa2money += (a.productNum * a.specificaPrice)
                                    })
                                    //console.log(pifa2num,'混批个数',pifa2money,'混批金额')
                                }
                                //没有满足 批发条件 提示 不发送请求  spHand / hpNum / hpMoney  为0时无条件 
                                let _if = (_this.pifa1num < this.spHand && this.spHand)||(_this.pifa2num < this.hpNum && this.hpNum) || (_this.pifa2money < this.hpMoney && this.hpMoney);
                                
                                if(_if){
                                    _this.pifawarning = true;
                                }else{
                                    _this.pifawarning = false;
                                    _this.flag = false;
                                }
                            }
                        }
                    })
                })
            })
        }
    }
  },
  mounted () {
    let type = this.$route.params.type;
    type==0?this.commonFn.setTitle( '购物车'):this.commonFn.setTitle( '批发商购物车');
    this.type = type;
    this.cartAjax();
  }
}
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';
@import  (reference) "~assets/css/common.less";
.order-main{
    padding-top: 148/@dev-Width *1rem;
    padding-bottom: 360/@dev-Width *1rem;;
  }
  .order-main,.deltails-main{
      position: relative;

      .order-box{
          width: 100%;
      }
      .order-item{
          width: 100%;
          background: #fff;
      }
      .order-item-title{
          padding: 0 40/@dev-Width *1rem;
          background: #fafafa;
          height: 135 /@dev-Width *1rem;
          .ik-box;
          .ik-box-align(center);
          .order-title-img{
              width: 80 /@dev-Width *1rem;
              height: 80 /@dev-Width *1rem;
              .border-radius(100%);
              border: 1px solid #efefef;
              background-size: cover;
              overflow: hidden;
          }
          span{
              margin-left: 20 /@dev-Width *1rem;
              font-weight: bold;
          }
      }
      .order-shop{
          width: 100%;
          height: 116 /@dev-Width *1rem;
          padding-left: 40 /@dev-Width *1rem;
          padding-right: 30/@dev-Width *1rem;
          .ik-box;
          .ik-box-align(center);
          .ik-box-pack(justify);
          font-size: 0;
      }
      .order-shop-name{
          span{
                  margin: 30/@dev-Width *1rem;
          }
      }
      .order-item-content,.order-number-time{
            .ik-box;
            .ik-box-pack(justify);
            width: 100%;
            padding: 0  0  0 40/@dev-Width *1rem;
            line-height: 1;
          .order-item-img{
              width: 265  /@dev-Width *1rem;
              height: 265 /@dev-Width *1rem;
              background-size: cover;
          }
          .order-item-txt{
              width: 73%;
              position: relative;
              &>p{
                  margin-bottom: 20 /@dev-Width *1rem
              }
              &>div{
                  line-height: 1;
                  p{
                      padding-bottom:2px;
                  }
              }
          }
      }
      .order-item-total,.order-item-button,.order-number-time{
          width: 100%;
          padding: 38/@dev-Width *1rem 30/@dev-Width *1rem  38/@dev-Width *1rem 40/@dev-Width *1rem;
          text-align: right;
          .order-button{
              color: #fff;
              width: 254/@dev-Width *1rem;
              height: 88 /@dev-Width *1rem;
              line-height: 88/@dev-Width *1rem;
              display: inline-block;
              .border-radius(5px);
              text-align: center;
              margin-left: 20/@dev-Width *1rem;
          }
      }
  }
.shoopCart-main{
    width: 100%;
    .order-box{
        background: #fff;
        margin-bottom: 30/@dev-Width *1rem;
    }
    .order-item-content{
        width: 100%;
    }
    .shoopCart-content{
        width: 100%;
        .ik-box;
        .ik-box-pack(justify);
        padding: 48/@dev-Width *1rem 0;
    }
    .icon-dui{
        background:#bfbfbf;
        color: #fff;
        margin-right: 20/@dev-Width *1rem;
        padding: 3px;
        z-index: 1;
    }
    .order-box{
        width: 100%;
        //overflow: hidden;
    }
    .sxorder-box{
        width: 100%;
        .sxorder-box-title{
            background: #fff;
            margin-bottom: 30/@dev-Width *1rem;
            padding: 38/@dev-Width *1rem;
            line-height: 1;
            text-align: center;
        }
        .sxorder-button{
            border:1px solid #e4393c;
            color: #e4393c;
            margin: 75/@dev-Width *1rem  auto;
            width: 30%;
            text-align: center;
            padding:  25/@dev-Width *1rem  35/@dev-Width *1rem;
            .border-radius(3px); 
        }
    }
    .order-item-img{
        position: relative;
        i{
            position: absolute;
            top:0;
            left: 0;
        }
    }
    .shopping-footer-bottom-clear{
        bottom:0 !important;
    }
    .shopping-footer{
        width: 100%;
        background: #fff;
        position: fixed;
        max-width: 8.28rem;
        height: 164/@dev-Width *1rem;
        bottom: 1.05333333rem;
        border-top: 1px solid #e2e2e2;
        .shopping-footer-l{
            width: 45%;
            float: left;
            height: 100%;
            .ik-box;
            .ik-box-align(center);
            padding-left: 38/@dev-Width *1rem;
        }
        .shopping-footer-r{
            width: 55%;
            float: left;
            height: 100%;
            .ik-box;
            .shopping-buttom{
                .ik-box;
                .ik-box-flex(1);
                height: 100%;
                text-align: center;
                color: #fff;
                .ik-box-pack(center);
                .ik-box-align(center);
            }
        }
    }
}
.goods-choice-box2{
    font-size: 0;
    em,input{
        padding: 0;
        line-height: 90/ @dev-Width *1rem;
        color: #87858f;
        width: 98/ @dev-Width *1rem;
        height: 90/ @dev-Width *1rem;
        text-align: center;
        margin-right: 2px;
        .border-radius(0);
        font-weight: bold;
        font-size: 68/ @dev-Width *1rem;
        vertical-align: top;
    }
    &>em:first-of-type{
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    input{
        font-size: 40/ @dev-Width *1rem;
        font-weight:normal;
        color: #333;
        width: 128/ @dev-Width *1rem;
        border: 0;
        margin-right: 2px;
    }
    &>em:last-of-type{
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
}
.buttom{
    border: 25/ @dev-Width *1rem solid #fff;
    border-right: 0;
}
.pf-box{
    .pf1-spec{
        padding: 25/ @dev-Width *1rem;
    }
    .pf2-spec{
        padding: 0 25/ @dev-Width *1rem;
        .pf2-list {
            font-size: 0;
            line-height: 1;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(justify);
            padding: 40/ @dev-Width *1rem 0;
        }
        .pf2-list-spec{
            width:58%;
            margin-right: 10/ @dev-Width *1rem;
            span{
                display: block;
            }
            span:first-child{
                margin-bottom: 20/ @dev-Width *1rem;
            }
        }
    }
    .pf1-buttom-box{
        position: absolute;
        bottom: 0;
        right: 0;
        .pf1-buttom{
            width: 185/ @dev-Width *1rem;
            height: 90/ @dev-Width *1rem;
            display: inline-block;
            text-align: center;
            line-height: 90/ @dev-Width *1rem;
            .border-radius(3px)
        }
        .pf1-buttom-b{
            border:1px solid #e4393c;
            margin-right: 25/ @dev-Width *1rem;
        }
    }
    .pf-min-pifaTotal{
        text-align: right;
        padding: 25/ @dev-Width *1rem 38/ @dev-Width *1rem;; 
    }
}
.sx-content{
    position: relative;
    display: block !important;
    .sxpf1-spec{
        padding: 25/ @dev-Width *1rem;
       text-align: justify;
    }
}
.cart-min-pifaTotal{
    text-align: right;
    padding: 25/ @dev-Width *1rem 38/ @dev-Width *1rem;
}
.pifa-warning-box{
    width: 100%;
    height:0;
    position: relative;
    .pifa-warning{
        width: 100%;
        padding: 30/ @dev-Width *1rem;
        font-size: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #fdded2;
        p{
            display: inline-block;
        }
    }
}

</style>
