<template>
<div id='app' class="shop-wrapper order-wrapper">
    <header-nav :headers= "homeNav" :status="'cart'" style="z-index:3"></header-nav>
    <section class="shop-main-no fs40 my-bond" v-if="isShow">
        <content-no :statu='bondStatu'></content-no>
    </section>
    <section class="shop-main order-main shoopCart-main" v-else>
        <div class="order-box">
            <div class="order-item" v-for=" (cart,i) in shopCartList"
                :key = "i">
                <div class="order-item-title fs40">
                    <i  class="iconfont icon-dui"
                        :class="{'js-font': cart.show}"
                        @click="select_Cart(i)"></i>
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
                            <i class="iconfont icon-dui" :class="{'js-font':shop.show}"
                            @click="select_Shop(j,i)"></i>
                            <i class="iconfont icon-dianpu"></i>
                            <span class="fs36">{{shop.shopName}}</span>
                            <i class="iconfont icon-you" ></i>
                        </p>
                        <p class="fs42 shopGray" @click="edit(i,j)">
                            <span v-if="!shop.edit">编辑</span>
                            <span v-else>完成</span>
                        </p>
                    </div>
                    <div class="order-item-box">
                        <delete-slide class="order-item-content"
                            v-for="(goods,index) in shop.productResultList"
                            :key="index"
                            @delete="delete_dialog(index,goods)"
                            :scope="index">
                            <div class="shoopCart-content">
                                <div class="order-item-img">
                                  <default-img :background="imgUrl+goods.productImageUrl"
                                                :isHeadPortrait="0">
                                  </default-img>
                                   <i class="iconfont icon-dui" :class="{'js-font':goods.show}"
                                    @click="select_Goods(index,j,i)"></i>
                                </div>
                                <div class="order-item-txt">
                                    <p class="fs42">{{goods.productName}}</p>
                                    <div v-if="!goods.edit">
                                        <p class="fs36 shopGray">
                                            <span v-if="goods.productSpecifica>0">{{goods.productSpecifica}}/</span>
                                            <span>{{goods.productNum}}份</span>
                                        </p>
                                        <p class="fs42 shop-font" v-if="goods.productHyPrice>0">¥{{goods.productHyPrice|moneySplit1}}<span class="fs32">.{{goods.productHyPrice|moneySplit2}}</span></p>
                                        <p class="fs42 shop-font" v-else>¥{{goods.productPrice | moneySplit1}}<span class="fs32">.{{goods.productPrice | moneySplit2}}</span></p>
                                    </div>
                                    <div class="goods-choice-box2" v-else>
                                        <em class="em-choice">-</em>
                                        <input class="em-choice"
                                         v-model="goods.productNum">
                                        </input>
                                        <em class="em-choice">+</em>
                                    </div>
                                </div>
                            </div>
                        </delete-slide>
                    </div>
                </div>
            </div>
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
                <div class="shopping-buttom fs50 shop-yellow">
                    继续选购
                </div>
                <div class="shopping-buttom fs50 shop-bg">
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
    }
  },
  components:{
	  defaultImg,headerNav,contentNo,deleteSlide
  },
  watch: {
    '$route'(){
        this.shopCartList = {};
        this.cartAjax(this.$route.params.type);
    },
    'shopCartList'(a,b){
        let _this = this;
        let pifaTotal = 0;
        _this.pifaAmount = 0;
        _this.shopCartList.forEach((item,i)=>{
            debugger
            if(item.show){
                _this.isPifaAmount = true;
            }else{
                _this.isPifaAmount = false;
            }
            item.shopResultList.forEach((test,j)=>{
                if(test.show){
                    item.show = true;
                }else{
                    item.show = false;
                }
                test.productResultList.forEach((e,n)=>{
                    if(e.show){
                        pifaTotal += e.productNum * e.productHyPrice
                        _this.productNum += e.productNum;
                    }else{
                        test.show = false;
                    }
                })
            })
        });
         _this.pifaTotal = pifaTotal;
    }
  },
  methods:{
    /**
     * 购物车请求
     * @param type 批发购买条件
     */
    cartAjax(type){
        let _this = this;
        let _data = {
            url: _this.$store.state.loginDTO_URL,
            browerType:_this.$store.state.browerType,
            busId:_this.$route.params.busId,
            shopId: _this.$route.params.shopId
        }
        if(type == 1){
            _data.type = type;
        }

        _this.commonFn.ajax({
            'url': h5App.activeAPI.phoneShopCart_getShopCartx_post,
            'data':_data,
            'success':(data)=>{
                if(data.code == 1){
                    let msg ={
                        type:'error',
                        msg:data.msg
                    }
                    _this.$parent.$refs.bubble.show_tips(msg);
                    return
                }
                _this.imgUrl = data.imgUrl;
                _this.path = data.path;
                _this.webPath = data.webPath;

                console.log(data,'购物车数据');
                _this.hpMoney=data.data.hpMoney;
                _this.hpNum=data.data.hpNum;
                _this.spHand=data.data.spHand;
                _this.shopCartList=data.data.shopCartList;//购物车集合

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
    delete_dialog(index,goods){
        let _id = goods.id;
        this.deleteAjax(_id);
    },
    /**
     * 删除购物车请求
     * @param id 删除购物车id
     */
    deleteAjax(id){
        let _this = this;
        let _data = {};
        _data.ids = id;
        if(_this.type == 1){
            _data.pifaSpecificaList = {
                id:'', //批发购物车id integer
                productId:'', //商品id integer
                productNum:'', //商品数量 integer
                specificaValueIds:'' //规格值id Array[string]
            }

        }
        console.log(_data,'_data删除数据');
        _this.commonFn.ajax({
            'url': h5App.activeAPI.phoneShopCart_removeShopCart_post,
            'data':_data,
            'success':(data)=>{
                if(data.code == 1){
                     let msg={
                        type :'error',
                        msg :  data.msg
                    }
                    _this.$parent.$refs.bubble.show_tips(msg);
                    return
                }

                let msg={
                    type :'success',
                    msg :  '删除成功'
                };
                _this.$parent.$refs.bubble.show_tips(msg);
            }
        })
    },
    /**
     * 选择商店
     * @param i  Cart选中的索引
     * @param index Goods索引
     * @param j Shop索引
     */
    select_Cart(i){
      let _this = this;
      _this.shopCartList.push([]);
      _this.shopCartList.pop();
      let obj = this.shopCartList[i]
      if(obj.show){
        this.isPifaAmount = false;
        obj.show = false;
        obj.shopResultList.forEach((test,j)=>{
            test.show = false;
            test.productResultList.forEach((e,n)=>{
              e.show = false;
            })
          })
      }else {
        obj.show = true;
        obj.shopResultList.forEach((test,j)=>{
            test.show = true;
            test.productResultList.forEach((e,n)=>{
              e.show = true;
            })
        })
      }
    },
    select_Shop(j,i){
        let _this = this;
        this.shopCartList.push([]);
        this.shopCartList.pop();
        let obj = this.shopCartList[i].shopResultList[j];
        if(obj.show){
            this.isPifaAmount = false;
            this.shopCartList[i].show = false;
            obj.show = false;
            obj.productResultList.forEach((e,n)=>{
                e.show = false;
            })
        }else {
          obj.show = true;
          obj.productResultList.forEach((e,n)=>{
            e.show = true;
          })
        }
    },
    select_Goods(index,j,i){
        let _this = this;
        this.shopCartList.push([]);
        this.shopCartList.pop();
        let obj = this.shopCartList[i].shopResultList[j].productResultList[index];
        if(obj.show){
            this.isPifaAmount = false;
            this.shopCartList[i].show = false;
            this.shopCartList[i].shopResultList[j].show = false;
            obj.show = false;
        }else {
            obj.show = true;
        }
    },
    select_PifaAmount(){
        console.log(111);
        this.shopCartList.push([]);
        this.shopCartList.pop();
        this.isPifaAmount = true;
        this.shopCartList.forEach((item,i)=>{
            item.show = true;
            item.shopResultList.forEach((test,j)=>{
                test.show = true;
                test.productResultList.forEach((e,n)=>{
                    e.show = true;
                })
            })
        });
    },
    /** 
     * 编辑按钮
     * @param j 当前索引
     */
    edit(i,j){
        console.log(i,j)
        let obj = this.shopCartList[i].shopResultList[j];
        this.$set(obj,'edit',!obj);
    }
  },
  mounted () {
    let type = this.$route.params.type;
    type==0?this.commonFn.setTitle( '购物车'):this.commonFn.setTitle( '批发商购物车');

    this.cartAjax(type);
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
          margin-bottom: 20/@dev-Width *1rem;
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
          padding: 24/@dev-Width *1rem 30/@dev-Width *1rem  24/@dev-Width *1rem 40/@dev-Width *1rem;
          .order-item-img{
              width: 265  /@dev-Width *1rem;
              height: 265 /@dev-Width *1rem;
              background-size: cover;
          }
          .order-item-txt{
              width: 73%;
              p{
                  margin-bottom: 20 /@dev-Width *1rem
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
        overflow: hidden;
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
</style>
