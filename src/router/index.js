import Vue from 'vue'
import Router from 'vue-router'


/***懒加载**************************************************************************/
const Nav = resolve => require(['pages/nav/nav.vue'], resolve);
//nav => 导航
const Index = resolve => require(['pages/home/index/index'], resolve);
// //nav => 首页
const Stores = resolve => require(['pages/home/stores'], resolve);
//Search => 选择门店
const fenbi_store_list = resolve => require(['pages/home/fenbi_store_list'], resolve);
//粉币店铺列表
const Search = resolve => require(['pages/home/search'], resolve);
//Search => 搜索页
const Classify = resolve => require(['pages/home/classify'], resolve);
//Classify => 首页分类
const Comment = resolve => require(['pages/comment/comment'], resolve);
//Comment => 评论
const my_comment = resolve => require(['pages/comment/myComment'], resolve);
//my_comment => 我的评论
const Comment_Share = resolve => require(['pages/comment/share'], resolve);
//Comment_share => 评论分享
const Comment_success = resolve => require(['pages/comment/succeess'], resolve);
//Comment_success => 评论成功
const Goods = resolve => require(['pages/goods/index'], resolve);
//Goods => 商品详情
const Goods_Comment = resolve => require(['pages/goods/child/comment'], resolve);
//Goods_comment => 商品详情-评论
const Goods_Details = resolve => require(['pages/goods/index'], resolve);
//Goods_details => 商品详情-评论
const Goods_Spec = resolve => require(['pages/goods/child/spec'], resolve);
//Goods_details => 商品详情-评论
/***************      批发相关页面     ******************/
const Wholesale_Apply = resolve => require(['pages/wholesale/apply'], resolve);
//Wholesale_Apply =>批发申请页

const my_center = resolve => require(['pages/my/myApp'], resolve);
//my_center =>我的
/***************      订单相关页面     ******************/
const subtmit_order_list = resolve => require(['pages/order/settlement'], resolve);
//subtmit_order_list =>提交订单页面
const my_order_list = resolve => require(['pages/order/index'], resolve);
//my_order_list =>订单列表
const my_order_detail = resolve => require(['pages/order/order'], resolve);
//my_order_detail => 订单详情
const help_Pay = resolve => require(['pages/order/helpPay'], resolve);
//help_Pay => 找人代付


/***************      退款相关页面     ******************/
const return_classify = resolve => require(['pages/refund/index'], resolve);
//return_classify => 申请退款类型
const return_list = resolve => require(['pages/refund/list'], resolve);
//return_list => 退款列表
const apply_return = resolve => require(['pages/refund/apply'], resolve);
//apply_return =>申请退款
const detail_return = resolve => require(['pages/refund/succeed'], resolve);
//detail_return => 退款完成(完成)
const consult_return = resolve => require(['pages/refund/consult'], resolve);
//my_order_detail => 协商(完成)
const logistics_return = resolve => require(['pages/refund/logistics'], resolve);
//my_order_detail => 物流信息


/***************      拍卖相关页面     ******************/
const Auction_Bond = resolve => require(['pages/auction/bond'], resolve);
//Auction_bond => 拍卖保证金
const Auction_Agreement = resolve => require(['pages/auction/agreement'], resolve);
//Auction_agreement => 用户竞拍服务协议
const auction_success = resolve => require(['pages/auction/succeed'], resolve);
//auction_success 保证金缴纳成功
const margin_notice = resolve => require(['pages/auction/marginNotice'], resolve);
//margin_notice 保证金须知 
const auction_bidding = resolve => require(['pages/auction/myBidding'], resolve);
//auction_bidding 我的竞拍

const shoppingCart = resolve => require(['pages/shoppingCart/index'], resolve);
//shoppingCart => 购物车页面


/***************      预售相关页面     ******************/
const presaleDeposit = resolve => require(['pages/presale/deposit'], resolve);
//presaleDeposit => 缴纳预售定金
const myPresaleDeposit = resolve => require(['pages/presale/myDeposit'], resolve);
//myPresaleDeposit => 我的定金


/***************      团购相关页面     ******************/
const groupbuydetail = resolve => require(['pages/groupbuy/groupbuydetail'], resolve);
//groupbuydetail 团购详情页面 

/***************      积分商城相关页面     ******************/
const integral_index = resolve => require(['pages/integral/index'], resolve);
//integral_index 积分商城首页 
const integral_product = resolve => require(['pages/integral/product'], resolve);
//integral_product 积分商品页面 
const integral_detail = resolve => require(['pages/integral/detail'], resolve);
//integral_detail 积分明细页面
const integral_record = resolve => require(['pages/integral/record'], resolve);
//integral_detail 兑换记录页面


/***************      超级销售员相关页面     ******************/
const Sale_index = resolve => require(['pages/sale/index.vue'], resolve);
//Sale_index =>超级营销员
const Sale_apply = resolve => require(['pages/sale/apply.vue'], resolve);
//Sale_index =>超级营销员
const saleRank = resolve => require(['pages/sale/rank.vue'], resolve);
//saleRank =>销售员排行榜
const myClient = resolve => require(['pages/sale/client.vue'], resolve);
//myClient =>我的客户
const myClientOrder = resolve => require(['pages/sale/clientOrder.vue'], resolve);
//myClientOrder =>客户订单
const totalIncome = resolve => require(['pages/sale/totalIncome.vue'], resolve);
//totalIncome =>累计佣金
const twoCode = resolve => require(['pages/sale/twoCode.vue'], resolve);
//twoCode =>我的二维码
const promotion = resolve => require(['pages/sale/promotion.vue'], resolve);
//promotion => 推广海报
const saleRule = resolve => require(['pages/sale/saleRule.vue'], resolve);
//saleRule => 销售规则
const myWithdraw = resolve => require(['pages/sale/myWithdraw.vue'], resolve);
//myWithdraw => 我的提现
const commissionDetail = resolve => require(['pages/sale/commissionDetail.vue'], resolve);
//commissionDetail => 佣金明细
const mallSet = resolve => require(['pages/sale/mallSet.vue'], resolve);
//mallSet => 商城设置
const findProduct = resolve => require(['pages/sale/findProduct.vue'], resolve);
//findProduct => 自选商品
const mallIndex = resolve => require(['pages/sale/mallIndex.vue'], resolve);
//mallIndex => 超级销售员首页
const sellerShare = resolve => require(['pages/sale/productShare.vue'], resolve);
//sellerShare => 超级销售员分享


const myAddress = resolve => require(['pages/my/myAddress'], resolve);
//myAddress => 地址列表
const address = resolve => require(['pages/my/address'], resolve);
//address => 编辑地址



const myCollect = resolve => require(['pages/my/myCollect'], resolve);
//groupbuydetail 我的收藏 


/******************************    错误页面   ***********************************/ 
const error_404 = resolve => require(['pages/error/404'], resolve);
//404 页面
const error_url = resolve => require(['pages/error/url'], resolve);
//链接失效 页面
const authorization = resolve => require(['pages/common/authorization'], resolve);
//商家授权 




Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/index/:pageId',
      name: 'index',
      component: Index
    },
    {
      path: '/nav',
      name: 'nav',
      component: Nav,
      meta: {
        title: '导航,上线后删除'
      },
    }, {
      path: '/stores/:busId',
      name: 'Stores',
      component: Stores,
      meta: {
        title: '选择门店'
      },
    },  {
      path: '/stores/fenbi/:busId',
      name: 'fenbi_store_list',
      component: fenbi_store_list,
      meta: {
        title: '选择门店（粉币商城）'
      },
    },{
      path: '/search/:busId/:type/:keywords',
      name: 'search',
      component: Search,
      meta: {
        title: '搜索'
      }
    }, {
      path: '/search/:busId/:type/:keywords/:desc',
      name: 'search',
      component: Search,
      meta: {
        title: '搜索'
      }
    }, {
      path: '/classify/:shopId/:busId/:type/:keywords',
      name: 'classify',
      component: Classify,
      meta: {
        title: '分类'
      },
    }, {
      path: '/classify/:shopId/:busId/:type/:keywords/:desc',
      name: 'classify',
      component: Classify,
      meta: {
        title: '分类'
      },
    }, {
      path: '/goods/details/:shopId/:busId/:type/:goodsId/:activityId',
      name: 'goods',
      component: Goods,
      meta: {
        title: '商品详情'
      },
      children: [{
        path: '/goods/spec/:shopId/:busId/:type/:goodsId/:activityId',
        component: Goods_Spec
      },
      {
        path: '/goods/comment/:shopId/:busId/:type/:goodsId/:activityId',
        component: Goods_Comment
      }
      ]
    }, {
      path: '/goods/details/:shopId/:busId/:type/:goodsId/:activityId/:saleMemberId/:toshop',
      name: 'goods',
      component: Goods,
      meta: {
        title: '商品详情'
      },
    }, {
      path: '/comment/:busId/:orderDetailId',
      name: 'comment',
      component: Comment,
      meta: {
        title: '评论'
      }
    }, {
      path: '/comment/success/:busId/:id',
      name: 'Comment_success',
      component: Comment_success,
      meta: {
        title: '评论成功'
      }
    }, {
      path: '/comment/share/:busId/:id',
      name: 'share',
      component: Comment_Share,
      meta: {
        title: '评论分享成功'
      }
    }, {
      path: '/wholesale/apply/:busId',
      name: 'Wholesale_Apply',
      component: Wholesale_Apply,
      meta: {
        title: '批发申请页'
      }
    }, {
      path: '/my/center/:busId',
      name: 'my_center',
      component: my_center,
      meta: {
        title: '我的'
      }
    }, {
      path: '/order/settlement/:busId/:from',
      name: 'subtmit_order_list',
      component: subtmit_order_list,
      meta: {
        title: '提交订单'
      }
    }, {
      path: '/order/settlement/:busId/:from/:ids',
      name: 'subtmit_order_list',
      component: subtmit_order_list,
      meta: {
        title: '提交订单'
      }
    }, {
      path: '/order/list/:busId/:type',
      name: 'my_order_list',
      component: my_order_list,
      meta: {
        title: '我的订单'
      }
    }, {
      path: '/order/detail/:busId/:orderId',
      name: 'my_order_detail',
      component: my_order_detail,
      meta: {
        title: '订单详情'
      }
    }, {
      path: '/return/list/:busId',
      name: 'return_list',
      component: return_list,
      meta: {
        title: '退款/售后列表'
      }
    }, {
      path: '/return/succeed/:busId/:returnId',
      name: 'detail_return',
      component: detail_return,
      meta: {
        title: '退款详情'
      }
    }, {
      path: '/return/classify/:busId/:orderDetailId',
      name: 'return_classify',
      component: return_classify,
      meta: {
        title: '退款类型'
      }
    }, {
      path: '/return/apply/:busId/:orderDetailId/:returnType/:returnId',
      name: 'apply_return',
      component: apply_return,
      meta: {
        title: '申请退款'
      }
    }, {
      path: '/return/logistics/:busId/:returnId',
      name: 'logistics_return',
      component: logistics_return,
      meta: {
        title: '物流信息（上传未完成)'
      }
    }, {
      path: '/return/consult/:busId/:returnId',
      name: 'consult_return',
      component: consult_return,
      meta: {
        title: '协商详情'
      }
    }, {
      path: '/cart/:shopId/:busId/:type',
      name: 'shoppingCart',
      component: shoppingCart,
      meta: {
        title: '购物车'
      }
    }, {
      path: '/my/comment/:busId',
      name: 'my_comment',
      component: my_comment,
      meta: {
        title: '我的评论'
      }
    }, {
      path: '/daifu/:busId/:orderId',
      name: 'help_Pay',
      component: help_Pay,
      meta: {
        title: '找人代付'
      }
    }, {
      path: '/address/:busId',
      name: 'myAddress',
      component: myAddress,
      meta: {
        title: '地址列表'
      }
    }, {
      path: '/address/:busId/:integralId',
      name: 'myAddress',
      component: myAddress,
      meta: {
        title: '地址列表(积分商城)'
      }
    }, {
      path: '/address/edit/:busId/:id',
      name: 'address',
      component: address,
      meta: {
        title: '编辑地址页面'
      }
    }, {
      path: '/address/edit/:busId/:id/:integralId',
      name: 'address',
      component: address,
      meta: {
        title: '编辑地址页面(积分商城)'
      }
    }, {
      path: '/groupbuy/detail/:busId/:id/:joinId/:memberId',
      name: 'groupbuydetail',
      component: groupbuydetail,
      meta: {
        title: '团购详情'
      }
    }, {
      path: '/auction/bond/:busId/:proId/:aucId/:invId/:agree',
      name: 'bond',
      component: Auction_Bond,
      meta: {
        title: '保证金'
      }
    }, {
      path: '/auction/agreement/:busId/:proId/:aucId/:invId',
      name: 'agreement',
      component: Auction_Agreement,
      meta: {
        title: '协议'
      }
    },
    {
      path: '/auction/success/:busId',
      name: 'auction_success',
      component: auction_success,
      meta: {
        title: '保证金缴纳成功'
      }
    }, {
      path: '/auction/notice/:busId/:aucId/:type',
      name: 'margin_notice',
      component: margin_notice,
      meta: {
        title: '保证金须知'
      }
    }, {
      path: '/auction/myBidding/:busId/:type',
      name: 'auction_bidding',
      component: auction_bidding,
      meta: {
        title: '我的竞拍'
      }
    }, {
      path: '/presale/deposit/:busId/:proId/:presaleId/:invId/:num',
      name: 'presaleDeposit',
      component: presaleDeposit,
      meta: {
        title: '预售交定金'
      }
    }, {
      path: '/presale/myDeposit/:busId/:type',
      name: 'myPresaleDeposit',
      component: myPresaleDeposit,
      meta: {
        title: '我的定金'
      }
    }, {
      path: '/my/collect/:busId',
      name: 'myCollect',
      component: myCollect,
      meta: {
        title: '我的收藏'
      }
    }, {
      path: '/integral/index/:busId',
      name: 'integral_index',
      component: integral_index,
      meta: {
        title: '积分商城首页'
      }
    }, {
      path: '/integral/product/:busId/:productId/:shopId',
      name: 'integral_product',
      component: integral_product,
      meta: {
        title: '积分商品'
      }
    }, {
      path: '/integral/detail/:busId',
      name: 'integral_detail',
      component: integral_detail,
      meta: {
        title: '积分明细'
      }
    }, {
      path: '/integral/record/:busId',
      name: 'integral_record',
      component: integral_record,
      meta: {
        title: '兑换记录'
      }
    }, {
      path: '/seller/index/:busId',
      name: 'Sale_index',
      component: Sale_index,
      meta: {
        title: '超级营销员首页'
      }
    }, {
      path: '/seller/apply/:busId',
      name: 'Sale_apply',
      component: Sale_apply,
      meta: {
        title: '超级营销员申请'
      }
    }, {
      path: '/seller/rank/:busId',
      name: 'saleRank',
      component: saleRank,
      meta: {
        title: '销售员排行榜'
      }
    }, {
      path: '/seller/client/:busId',
      name: 'myClient',
      component: myClient,
      meta: {
        title: '我的客户'
      }
    }, {
      path: '/seller/clientOrder/:busId',
      name: 'myClientOrder',
      component: myClientOrder,
      meta: {
        title: '客户订单'
      }
    }, {
      path: '/seller/totalIncome/:busId/:type',
      name: 'totalIncome',
      component: totalIncome,
      meta: {
        title: '累计佣金'
      }
    }, {
      path: '/seller/twoCode/:busId',
      name: 'twoCode',
      component: twoCode,
      meta: {
        title: '我的二维码'
      }
    }, {
      path: '/seller/promotion/:busId',
      name: 'promotion',
      component: promotion,
      meta: {
        title: '推广海报'
      }
    }, {
      path: '/seller/saleRule/:busId',
      name: 'saleRule',
      component: saleRule,
      meta: {
        title: '销售规则'
      }
    }, {
      path: '/seller/withdraw/:busId',
      name: 'myWithdraw',
      component: myWithdraw,
      meta: {
        title: '我的提现'
      }
    }, {
      path: '/seller/commission/detail/:busId',
      name: 'commissionDetail',
      component: commissionDetail,
      meta: {
        title: '佣金明细'
      }
    }, {
      path: '/seller/mallset/:busId/:type/:findIds',
      name: 'mallSet',
      component: mallSet,
      meta: {
        title: '商城设置'
      }
    }, {
      path: '/seller/findproduct/:busId/:ids',
      name: 'findProduct',
      component: findProduct,
      meta: {
        title: '自选商品'
      }
    }, {
      path: '/seller/mallindex/:busId/:saleMemberId',
      name: 'mallIndex',
      component: mallIndex,
      meta: {
        title: '超级销售员商城首页'
      }
    }, {
      path: '/seller/share/:busId/:proId/:saleMemberId',
      name: 'sellerShare',
      component: sellerShare,
      meta: {
        title: '超级销售员商城首页'
      }
    }, {
      path: '/seller/share/:busId/:proId/:saleMemberId',
      name: 'sellerShare',
      component: sellerShare,
      meta: {
        title: '超级销售员商城首页'
      }
    }, {
      path: '/error/404/:busId',
      name: 'error_404',
      component: error_404,
      meta: {
        title: '404页面'
      }
    }, {
      path: '/error/url/:busId',
      name: 'error_url',
      component: error_url,
      meta: {
        title: '链接错误页面'
      }
    }, {
      path: '/grant/:busId',
      name: 'authorization',
      component: authorization,
      meta: {
        title: '商家授权页面'
      }
    }
    


  ]
})
