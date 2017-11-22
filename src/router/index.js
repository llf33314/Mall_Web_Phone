import Vue from 'vue'
import Router from 'vue-router'


/***懒加载**************************************************************************/
const Nav = resolve => require(['pages/nav/nav.vue'], resolve);
//nav => 导航
// const Index = resolve => require(['pages/home/index'], resolve);
// //nav => 首页
const Stores = resolve => require(['pages/home/stores'], resolve);
//Search => 选择门店
const Search = resolve => require(['pages/home/search'], resolve);
//Search => 搜索页
const Classify = resolve => require(['pages/home/classify'], resolve);
//Classify => 首页分类
const Auction_Bond = resolve => require(['pages/auction/bond'], resolve);
//Auction_bond => 拍卖保证金
const Auction_Agreement = resolve => require(['pages/auction/agreement'], resolve);
//Auction_agreement => 用户竞拍服务协议
const Auction_Succeed = resolve => require(['pages/auction/succeed'], resolve);
//Auction_succeed => 用户竞拍服务协议
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
/***************      超级销售员相关页面     ******************/
const Sale_index = resolve => require(['pages/sale/index.vue'], resolve);
//Sale_index =>超级营销员
const Sale_apply = resolve => require(['pages/sale/apply.vue'], resolve);
//Sale_index =>超级营销员
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


const shoppingCart = resolve => require(['pages/shoppingCart/index'], resolve);
//my_order_detail => 物流信息


const myAddress = resolve => require(['pages/my/myAddress'], resolve);
//myAddress => 地址列表
const address = resolve => require(['pages/my/address'], resolve);
//address => 编辑地址

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Index
    // },
    {
      path: '/nav',
      name: 'nav',
      component: Nav,
      meta: {
        title: '导航,上线后删除'
      },
    }, {
      path: '/stores',
      name: 'Stores',
      component: Stores,
      meta: {
        title: '选择门店'
      },
    }, {
      path: '/search/:type/:keywords',
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
    }, , {
      path: '/auction/bond',
      name: 'bond',
      component: Auction_Bond,
      meta: {
        title: '保证金'
      }
    }, {
      path: '/auction/agreement',
      name: 'agreement',
      component: Auction_Agreement,
      meta: {
        title: '协议'
      }
    }, {
      path: '/auction/succeed',
      name: 'succeed',
      component: Auction_Succeed,
      meta: {
        title: '报名成功'
      }
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
    },{
      path: '/comment/share/:busId/:id',
      name: 'share',
      component: Comment_Share,
      meta: {
        title: '评论分享成功'
      }
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
      path: '/seller/:busId',
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
      path: '/order/settlement/:busId/:from',
      name: 'subtmit_order_list',
      component: subtmit_order_list,
      meta: {
        title: '提交订单'
      }
    },  {
      path: '/order/settlement/:busId/:from/:ids',
      name: 'subtmit_order_list',
      component: subtmit_order_list,
      meta: {
        title: '提交订单'
      }
    },{
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
    },{
      path: '/my/comment/:busId',
      name: 'my_comment',
      component: my_comment,
      meta: {
        title: '我的评论'
      }
    },{
      path: '/daifu/:busId/:orderId',
      name: 'help_Pay',
      component: help_Pay,
      meta: {
        title: '找人代付'
      }
    },{
      path: '/address/:busId',
      name: 'myAddress',
      component: myAddress,
      meta: {
        title: '地址列表'
      }
    },{
      path: '/address/edit/:busId/:id',
      name: 'address',
      component: address,
      meta: {
        title: '编辑地址页面'
      }
    }
    

  ]
})
