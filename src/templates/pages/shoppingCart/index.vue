<template>
<div id='app' class="shop-wrapper order-wrapper">
    <header-nav :headers= "homeNav" :status="'cart'" style="z-index:3"></header-nav>
    <section class="shop-main-no fs40 my-bond" v-if="isShow">
        <content-no :statu='bondStatu'></content-no>
    </section>
    <section class="shop-main order-main shoopCart-main" v-else>
        <div class="order-box" v-if="shopCartList != '' ">
            <div class="order-item" v-for=" (cart,i) in shopCartList"
                :key = "i">
                <div class="order-item-title fs40">
                    <i  class="iconfont icon-dui"
                        :class="{'js-font': cart.show}"
                        @click="select_Goods(cart)"></i>
                    <div class="order-title-img">
                      <default-img :background="cart.userImageUrl"
                                  :isHeadPortrait="1">
                      </default-img>
                    </div>
                    <span>{{cart.userName}}</span>
                </div>
                <div class="shopping-box" :class="{'pf-box':type == 1}"
                    v-for="(shop,j) in cart.shopResultList"
                    :key="j">
                    <div class="order-shop border">
                        <p class="order-shop-name">
                            <i class="iconfont icon-dui" :class="{'js-font':shop.show}"
                            @click="select_Goods(shop)"></i>
                            <i class="iconfont icon-dianpu"></i>
                            <span class="fs36">{{shop.shopName}}</span>
                            <i class="iconfont icon-you" ></i>
                        </p>
                        <p class="fs42 shopGray" @click="edit(i,j,shop)" v-if=" type != 1">
                            <span class="buttom" v-if="!shop.edit">编辑</span>
                            <span class="buttom" v-else >完成</span>
                        </p>
                    </div>
                    <div class="order-item-box">
                        <div class="order-item" :class="{'border': type == 1}"
                            v-for="(goods,index) in shop.productResultList"
                            :key="index">
                            <delete-slide class="order-item-content" 
                                @delete="delete_dialog(1,index,goods)"
                                :scope="index">
                                <div class="shoopCart-content" :class="{'border': type == 1}">
                                    <div class="order-item-img">
                                    <default-img :background="imgUrl+goods.productImageUrl"
                                                    :isHeadPortrait="0">
                                    </default-img>
                                    <i class="iconfont icon-dui" :class="{'js-font':goods.show}"
                                        @click="select_Goods(goods)"></i>
                                    </div>
                                    <div class="order-item-txt">
                                        <p class="fs42" :class="{'text-overflow': type == 1}">{{goods.productName}}</p>
                                        <!----------------购物车 未编辑时↓------------------>
                                        <div v-if="!shop.edit && goods.pfType == 0">
                                            <p class="fs36 shopGray">
                                                <span v-if="goods.productSpecifica>0">{{goods.productSpecifica}}/</span>
                                                <span>{{goods.productNum}}份</span>
                                            </p>
                                            <p class="fs42 " :class="[ goods.productHyPrice >0 ?'shopGray':'shop-font']"><span class="fs32">¥</span>{{goods.productPrice | moneySplit1}}<span class="fs32">.{{goods.productPrice | moneySplit2}}</span></p>
                                            <p class="fs42 shop-font" v-if="goods.productHyPrice>0"><span class="fs32">会员价:¥</span>{{goods.productHyPrice|moneySplit1}}<span class="fs32">.{{goods.productHyPrice|moneySplit2}}</span></p>
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
                                        <div v-if=" goods.pfType == 1">
                                        <p class="fs42 pf1-buttom-box">
                                            <span  class="shop-font pf1-buttom pf1-buttom-b"  >减一手</span>
                                            <span class="shop-bg pf1-buttom">加一手</span>
                                        </p>
                                        </div>
                                        <!----------------批发购物车 混批↓------------------>
                                        <div v-if="goods.pfType == 2">
                                            <p class="fs36 shopGray">
                                                <span v-if="goods.productSpecifica>0">{{goods.productSpecifica}}/</span>
                                                <span>{{goods.productNum}}份</span>
                                            </p>
                                            <p class="fs42 " :class="[ goods.productHyPrice >0 ?'shopGray':'shop-font']"><span class="fs32">¥</span>{{goods.productPrice | moneySplit1}}<span class="fs32">.{{goods.productPrice | moneySplit2}}</span></p>
                                            <p class="fs42 shop-font" v-if="goods.productHyPrice>0"><span class="fs32">会员价:¥</span>{{goods.productHyPrice|moneySplit1}}<span class="fs32">.{{goods.productHyPrice|moneySplit2}}</span></p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </delete-slide>
                            <!----------------批发购物车 手批↓-规格------------------>
                            <p class="shopGray fs40 border pf1-spec" v-if=" goods.pfType == 1">
                                规格 : <span v-for=" (pifa,index) in goods.pifaSpecificaList":key="index">
                                    {{pifa.specificaValues+' X'+pifa.productNum}}
                                    <i v-if=" index <  goods.pifaSpecificaList.length-1">、</i>
                                </span> 
                            </p>
                            <!----------------批发购物车 混批↓-规格------------------>
                            <div class="shopGray fs40 pf2-spec "v-if=" goods.pfType == 2">
                                <div class="pf2-list clearfix" 
                                    v-for=" (pifa,index) in goods.pifaSpecificaList"
                                    :key="index">
                                    <i class="iconfont icon-dui" :class="{'js-font':goods.show}"
                                    @click="select_Goods(goods)"></i>
                                    <p class="pf2-list-spec fs42">
                                        <span style="color:#000">规格 : {{goods.productName}} {{pifa.specificaValues+' X'+pifa.productNum}} </span>
                                        <span class="shop-font">{{goods.productPrice}}</span>
                                    </p>
                                    <div class="goods-choice-box2">
                                        <em class="em-choice" 
                                            @click="addNumber('-',pifa)">-</em>
                                        <input class="em-choice"
                                            v-model="pifa.productNum" 
                                            @blur="addNumber('',pifa)">
                                        </input>
                                        <em class="em-choice" 
                                            @click="addNumber('+',pifa)">+</em>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="fs36 pf-min-pifaTotal" v-if="type == 1">
                        3件，小计:<span class="shop-font">￥<span class="fs42">6,666</span>.00</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="sxorder-box" v-if="sxShopCartList !='' ">
            <p class="sxorder-box-title fs42">
                以下商品无法购买
            </p>
            <div class="order-item" 
                v-for=" (cart,i) in sxShopCartList" 
                :key="i">
                <div class="order-item-title fs40">
                    <div class="order-title-img">
                      <default-img :background="cart.userImageUrl"
                                  :isHeadPortrait="1">
                      </default-img>
                    </div>
                    <span>{{cart.userName}}</span>
                </div>
                <div class="shopping-box"
                    v-for="(shop,j) in cart.shopResultList"
                    :key="j">
                    <div class="order-shop border">
                        <p class="order-shop-name">
                            <i class="iconfont icon-dianpu"></i>
                            <span class="fs36">{{shop.shopName}}</span>
                            <i class="iconfont icon-you" ></i>
                        </p>
                    </div>
                    <div class="order-item-box">
                        <div class="order-item-content"
                            v-for="(goods,index) in shop.productResultList"
                            :key="index">
                            <div class="shoopCart-content">
                                <div class="order-item-img">
                                  <default-img :background="imgUrl+goods.productImageUrl"
                                                :isHeadPortrait="0">
                                  </default-img>
                                </div>
                                <div class="order-item-txt">
                                    <p class="fs42" :class="{'text-overflow': type == 1}">{{goods.productName}}</p>
                                    <div v-if="!shop.edit">
                                        <p class="fs36 shopGray">
                                            <span v-if="goods.productSpecifica>0">{{goods.productSpecifica}}/</span>
                                            <span>{{goods.productNum}}份</span>
                                        </p>
                                        <p class="fs42 " :class="[ goods.productHyPrice >0 ?'shopGray':'shop-font']"><span class="fs32">¥</span>{{goods.productPrice | moneySplit1}}<span class="fs32">.{{goods.productPrice | moneySplit2}}</span></p>
                                        <p class="fs42 shop-font" v-if="goods.productHyPrice>0"><span class="fs32">会员价:¥</span>{{goods.productHyPrice|moneySplit1}}<span class="fs32">.{{goods.productHyPrice|moneySplit2}}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fs42 sxorder-button" 
            @click="delete_dialog(2)">清空失效商品</div>
        </div>
        <div class="shopping-footer clearfix" style="z-index:2">
            <div class="shopping-footer-l fs40">
                <i class="iconfont icon-dui"
                :class="{'js-font':isPifaAmount}"
                @click="select_PifaAmount()"
                ></i>
                合计：<span class="shop-font">￥{{pifaTotal | currency}}</span>
            </div>
            <div class="shopping-footer-r">
                <div class="shopping-buttom fs50 shop-yellow" @click="choose()">
                    继续选购
                </div>
                <div class="shopping-buttom fs50 shop-bg" @click="settlementAjax(1)">
                    去结算({{pifaAmount}})
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>

import defaultImg from 'components/defaultImg'
import headerNav from 'components/headerNav'
import contentNo from 'components/contentNo'
import deleteSlide from './component/deleteSlide'
import filter from '../../../lib/filters'// 过滤器

export default {
  name: 'shippingCart',
  data(){
    return{
        isPhoto: false,
        homeNav:[
            { id: 0, name: "购物车" },
            { id: 1, name: "批发商购物车" }
        ],
        isNavshow: 'cart',
        isShow: false,
        bondStatu: 3,
        hpMoney:'', //混批最低金额
        hpNum:'',//混批最低数量
        spHand:'',//手批最低数量
        shopCartList:'',//购物车集合
        sxShopCartList:'',//失败购物车集合
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
    }
  },
  components:{
	  defaultImg,headerNav,contentNo,deleteSlide
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
        let pifaTotal = 0;
        _this.pifaAmount = 0;
        let ispifaAmount = true;//判断合计点亮
        //监听选中购物车数据
        _this.shopCartList.forEach((item,i)=>{
            let isBusSelect = true;//判断商家点亮

            item.shopResultList.forEach((test,j)=> {
                let isShopSelect = true;//判断商家店铺点亮

              test.productResultList.forEach((m, n) => {
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
                    _this.isPifaAmount = false;
                }
        
              })
            })
          

            //总价计算
            item.shopResultList.forEach((test,j)=>{
                test.productResultList.forEach((e,n)=>{
                    if(e.show){
                        if(e.productHyPrice>0){ //会员价
                            pifaTotal += e.productNum * e.productHyPrice
                        }else{ //商品价
                            pifaTotal += e.productNum * e.productPrice
                        }
                        _this.pifaAmount += e.productNum;
                    }
                })
            })
            
        })
         _this.pifaTotal = pifaTotal;
    }
  },
  methods:{
    /**
     * 购物车请求
     */
    cartAjax(){
        let _this = this;
        let _data = {
            url: _this.$store.state.loginDTO_URL,
            browerType:_this.$store.state.browerType,
            busId:_this.$route.params.busId,
            shopId: _this.$route.params.shopId
        }
        if(_this.$route.params.type == 1){
            //批发购买条件 1
            _data.type = 1;
        }

        _this.ajaxRequest({
            'status': 1,
            'url': h5App.activeAPI.phoneShopCart_getShopCartx_post,
            'data':_data,
            'success':(data)=>{
                if(data.code == 1){
                    let msg={
                        type :'error',
                        msg :  data.msg +'------差无数据显示'
                    }
                    _this.$parent.$refs.bubble.show_tips(msg);
                }
                _this.imgUrl = data.imgUrl;
                _this.path = data.path;
                _this.webPath = data.webPath;

                console.log(data,'购物车数据');
                _this.hpMoney=data.data.hpMoney;
                _this.hpNum=data.data.hpNum;
                _this.spHand=data.data.spHand;
                _this.shopCartList=data.data.shopCartList;//购物车集合
                _this.sxShopCartList = data.data.sxShopCartList //失败购物车集合

                let pifaTotal = 0;
                //全选后的总价
                _this.shopCartList.forEach((item,i)=>{
                    item.show = true;
                    item.shopResultList.forEach((test,j)=>{
                        test.show = true;
                        test.edit = false;
                        test.productResultList.forEach((e,n)=>{
                            e.show = true;
                            pifaTotal += e.productNum*e.productHyPrice;
                            _this.pifaAmount += e.productNum;
                        })
                    })
                });

                _this.pifaTotal = pifaTotal;
            }
        })
      },
    /**
     * 删除弹出窗
     * @param index  当前要删除的对象
     */
    delete_dialog(c,index,goods){
        if(c===1){
            let _id = goods.id;
            this.deleteAjax(_id);
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
                        let ids =[] 
                        _this.sxShopCartList.forEach((item,i)=>{
                            item.shopResultList.forEach((test,j) => {
                                test.productResultList.forEach((e,n)=>{
                                    ids.push(e.id)
                                })
                            });
                        })
                        _this.deleteAjax(ids);
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
     * @param id 删除购物车id
     */
    deleteAjax(id){
        let _this = this;
        let _data = {};
        _data.ids = id.toString();
        if(_this.type == 1){
            _data.pifaSpecificaList = {
                id:'', //批发购物车id integer
                productId:'', //商品id integer
                productNum:'', //商品数量 integer
                specificaValueIds:'' //规格值id Array[string]
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
                _this.$parent.$refs.bubble.show_tips(msg);
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

        if(typeof e.shopResultList !== 'undefined'){
          //当前点击是在 商家 第一层数据
            e.show = _show;
            e.shopResultList.forEach((item,i)=>{
              item.show = _show;
              item.productResultList.forEach((test,j)=>{
                test.show = _show;
              })
            })
        }else if(typeof e.productResultList !== 'undefined'){
          //当前点击是在 店铺 第二层数据
            e.show = _show;
            e.productResultList.forEach((test,j)=>{
              test.show = _show;
            })
        }else {
          //当前点击是在 商品 第三层数据
          e.show = _show;
        }
      this.shopCartList.push([]);
      this.shopCartList.pop();
    },
    /** 
     * 合计选择
     */
    select_PifaAmount(){
        console.log(111);
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
     * 添加数量
     * @param c 加减判断
     * @param e 当前数据
    */
    addNumber(c,e){
        let _this = this;
        console.log(e,'e修改数据')
        let re = /^[0-9]+$/ ;
            
        if(!re.test( e.productNum)){
            _this.$parent.$refs.bubble.show_tips('请输入大于0的整数');
            e.productNum = 1 ;
        
        }else if( e.stockNum == 0){
            //库存为0 
            e.productNum = 0 ;
            _this.$parent.$refs.bubble.show_tips('商品已售罄');
        }else if( c === '-' || c === ''){
            //减小时 或者 手动输入
            e.productNum--;

            if(e.productNum <= 0){
                _this.$parent.$refs.bubble.show_tips('数量不能小于1');
                e.productNum = 1 ;
            }
        }else{//增减时

            //限购数量不为零时，购买数量不能超出限购数量
            if(e.maxBuyNum && ( e.productNum >= e.maxBuyNum)){
                _this.$parent.$refs.bubble.show_tips('超出限购数量');
                
            }else  if(e.productNum >= e.stockNum){
                //库存不为0，超出规格库存
                _this.$parent.$refs.bubble.show_tips('超出现有库存量');
                e.productNum = e.stockNum;
            }else if(c === '+'){
                e.productNum ++;
            }
        }
        _this.shopCartList.push([]);
        _this.shopCartList.pop();

        //编辑数据处理  -- 集合 settlement settlementarr
        let obj = _this.settlementData(e);

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
            _this.shopCartList.forEach((item,i)=>{
                item.shopResultList.forEach((test,j)=>{
                    test.productResultList.forEach((e,n)=>{
                        if(e.show){
                            let obj = this.settlementData(e);
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
        
        _this.ajaxRequest({
            'url': h5App.activeAPI.phoneShopCart_shopCartOrder_post,
            'data': _data,
            'success':(data)=>{
                if(c === 1){
                    //结算 成功跳转 订单页面 /order/settlement/:busId/1/:shopCartIds（购物车id）
                    shopCartIds = shopCartIds.toString();
                    let busId = this.$route.params.busId || this.$store.state.busId;
                    console.log('/order/settlement/'+busId+'/1/'+shopCartIds)
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
     * 结算请求--数据处理
     * @param e 当前修改商品 返回 传参需要格式
     */
    settlementData(e){
        let _this = this;
        //正常
        let obj= {
            id:  e.id,
            productNum: e.productNum
        };
        //批发

        if( _this.type == 1 ){
            let arr=[];
            e.pifaSpecificaList.forEach((item,i)=>{
                let  _data= {
                    productId: item.id,
                    productNum: item.productNum,
                    specificaValueIds: item.specificaValueIds
                }
                arr.push(_data);
            })
            //批发规格集合
            obj.pifatSpecificaDTOList =  arr
        }
        return obj
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
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
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
            padding: 0 *1rem 30/@dev-Width *1rem  0 40/@dev-Width *1rem;
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
    .js-font{
        background: #e4393c!important;
    }
    .order-box{
        width: 100%;
        //overflow: hidden;
    }
    .sxorder-box{
        width: 100%;
        .sxorder-box-title{
            background: #fff;
            margin-bottom: 45/@dev-Width *1rem;
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
    .shopping-footer{
        width: 100%;
        background: #fff;
        position: fixed;
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
        padding: 25/ @dev-Width *1rem;
        .pf2-list {
            font-size: 0;
            line-height: 1;
            &>i,&>div,&>p{
                float: left;
                border: 1px solid;
            }
        }
        .pf2-list-spec{
            width:55%
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
</style>
