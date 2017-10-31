(function () {
  'use strict';

  // /**
  //  * @namespace app
  //  */

  // const env = {
  //   develop: { // 开发环境

  //     /**
  //      * debug模式
  //      * @type {Boolean}
  //      * @memberof app.env
  //      */
  //     debug: true,

  //     check_login: false,
  //     /**
  //      * 浏览器无痕模式
  //      * @type {Boolean}
  //      * @memberof app.env
  //      */
  //     is_private_mode: false,

  //     /**
  //      * API地址
  //      * @type {String}
  //      * @memberof app.env
  //      */
  //     // activeAPI: 'http://192.168.2.116:8080'
  //   },
  //   test: { // 测试环境
  //     debug: true,
  //     check_login: false,
  //     is_private_mode: false,
  //     activeAPI: window.location.origin
  //   },
  //   production: { // 生产环境
  //     debug: true,
  //     check_login: false,
  //     is_private_mode: false,
  //     activeAPI: window.location.origin
  //   }
  // };

  /**
   * 父类
   * @namespace Configs
   */
  const h5App = {};


  /**
   * 环境配置
   * @type {env.develop|{debug, API, WXCore, LoginUrl}}
   */
  // h5App.env = env.develop;

  h5App.activeAPI = {
    // phoneProduct_post: h5App.env.activeAPI + '/phoneProduct/L6tgXlBFeK/productAll',
    //商品详情
    /*商品搜索接口*/
    phoneProduct_productAll_post: '/phoneProduct/L6tgXlBFeK/productAll',
    /*查询历史搜索和推荐搜索接口*/
    phonePage_searchLabel_post: '/phonePage/L6tgXlBFeK/searchLabel',
    /*清空历史搜索接口*/
    phonePage_clearSearchGroup_post: 'phonePage/L6tgXlBFeK/clearSearchGroup',
    /*商品分类接口*/
    phoneProduct_classAll_post: '/phoneProduct/L6tgXlBFeK/classAll',
    /*获取商家的客服*/
    phonePage_getCustomer_post: '/phonePage/L6tgXlBFeK/getCustomer',
    /*商家id获取底部菜单*/
    phonePage_footerMenu_post: '/phonePage/L6tgXlBFeK/footerMenu',
    /*店铺列表相关接口 */
    phonePage_shopList_post: '/phonePage/L6tgXlBFeK/shopList',
    /*查询商品接口*/
    phoneProduct_getProduct_post: '/phoneProduct/L6tgXlBFeK/getProduct',
    /*查询商品规格接口(规格弹出框调用)*/
    phoneProduct_getSpecifica_post: '/phoneProduct/L6tgXlBFeK/getSpecifica',
    /*商品收藏接口*/
    phoneProduct_collectProduct_post: '/phoneProduct/L6tgXlBFeK/collectProduct',
    /*查询商品详情接口 */
    phoneProduct_getProductDetail_post: '/phoneProduct/L6tgXlBFeK/getProductDetail',
    /*查询商品评价接口（商品详情页面）*/
    phoneProduct_getProductComment_post: '/phoneProduct/L6tgXlBFeK/getProductComment',
    /*查询商品规格参数接口*/
    phoneProduct_getProductParams_post: '/phoneProduct/L6tgXlBFeK/getProductParams',
    /*获取我的页面数据*/
    my_center_post: '/phoneMember/L6tgXlBFeK/toUser'
  };

  window.h5App = h5App;
}());
