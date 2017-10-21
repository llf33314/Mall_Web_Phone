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
    // phoneProduct_post: h5App.env.activeAPI + '/phoneProduct/79B4DE7C/productAll',
    //商品详情
    /*商品搜索接口*/
    phoneProduct_productAll_post:  '/phoneProduct/79B4DE7C/productAll',
    /*查询历史搜索和推荐搜索接口*/
    phonePage_searchLabel_post: '/phonePage/79B4DE7C/searchLabel',
    /*清空历史搜索接口*/
    phonePage_clearSearchGroup_post: 'phonePage/79B4DE7C/clearSearchGroup',
    /*商品分类接口*/
    phoneProduct_classAll_post: '/phoneProduct/79B4DE7C/classAll',
    /*获取商家的客服*/
    phonePage_getCustomer_post: '/phonePage/79B4DE7C/getCustomer',
    /*商家id获取底部菜单*/
    phonePage_footerMenu_post: '/phonePage/79B4DE7C/footerMenu'
  };

  window.h5App = h5App;
}());
