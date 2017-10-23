import Vue from 'vue'
import Router from 'vue-router'


/***懒加载**************************************************************************/
const Nav = resolve => require(['pages/nav/nav.vue'], resolve);
//nav => 导航
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
const Comment_Share = resolve => require(['pages/comment/share'], resolve);
//Comment_share => 评论分享
const Goods = resolve => require(['pages/goods/index'], resolve);
//Goods => 商品详情
const Goods_Comment = resolve => require(['pages/goods/child/comment'], resolve);
//Goods_comment => 商品详情-评论
const Goods_Details = resolve => require(['pages/goods/child/details'], resolve);
//Goods_details => 商品详情-评论
const Goods_Spec = resolve => require(['pages/goods/child/spec'], resolve);
//Goods_details => 商品详情-评论
const Goods_Classify = resolve => require(['pages/goods/classify'], resolve);
//Goods_classify => 商品分类
const my_center = resolve => require(['pages/my/myApp'], resolve);
//Goods_classify =>我的
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
    },{
      path: '/Stores',
      name: 'Stores',
      component: Stores,
      meta: {
        title: '选择门店'
      },
    },{
      path: '/search/:shopId/:busId/:type/:keyword',
      name: 'search',
      component: Search,
      meta: {
        title: '搜索'
      }
    },{
      path: '/classify/:shopId/:busId',
      name: 'classify',
      component: Classify,
      meta: {
        title: '分类'
      }
    },{
      path: '/auction/bond',
      name: 'bond',
      component: Auction_Bond,
      meta: {
        title: '保证金'
      }
    },{
      path: '/auction/agreement',
      name: 'agreement',
      component: Auction_Agreement,
      meta: {
        title: '协议'
      }
    },{
      path: '/auction/succeed',
      name: 'succeed',
      component: Auction_Succeed,
      meta: {
        title: '报名成功'
      }
    },{
      path: '/comment',
      name: 'comment',
      component: Comment,
      meta: {
        title: '评论'
      }
    },{
      path: '/comment/share',
      name: 'share',
      component: Comment_Share,
      meta: {
        title: '分享成功'
      }
    },{
      path: '/goods',
      name: 'goods',
      component: Goods,
      meta: {
        title: '商品详情'
      },
      children:[
        { path: '/goods/details', 
          component: Goods_Details
        },{ 
          path: '/goods/spec', 
          component: Goods_Spec},
        { 
          path: '/goods/comment', 
          component: Goods_Comment
        }
      ]
    },{
      path: '/goods/classify/:shopId/:busId/:type/:keyword',
      name: 'goods/classify',
      component: Goods_Classify,
      meta: {
        title: '商品详情'
      },
    },{
      path: '/my/center/:busId',
      name: 'my/center',
      component: my_center,
      meta: {
        title: '我的'
      },
    },
  ]
})
