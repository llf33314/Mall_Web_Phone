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
  //     // activeAPI: '/api'
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


  h5App.api = "/api";
  // h5App.api ="";

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
    /*上传图片的接口 */
    upload_image_post: '/phonePage/L6tgXlBFeK/uploadImage',
    /*店铺列表相关接口 */
    /***********************   以下接口都是 商品详情页面相关接口 ***********************/
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
    /*加入购物车接口*/
    phoneShopCart_addShopCart_post: '/phoneShopCart/L6tgXlBFeK/addShopCart',
    /***********************   以下接口都是 购物车页面相关接口 ***********************/
    /*查询购物车接口 */
    phoneShopCart_getShopCartx_post: '/phoneShopCart/L6tgXlBFeK/getShopCart',
    /*删除购物车接口 */
    phoneShopCart_removeShopCart_post: '/phoneShopCart/L6tgXlBFeK/removeShopCart',

    /*获取我的页面数据*/
    my_center_post: '/phoneMember/L6tgXlBFeK/toUser',
    /*获取商城首页数据 */
    mall_index_post: '/phonePage/L6tgXlBFeK/getHomePageId',
    /***********************   以下接口都是 订单相关的接口 ***********************/
    /*获取我的订单数据 */
    order_list_post: '/phoneOrder/L6tgXlBFeK/orderList',
    /*确认收货接口 */
    confirm_receipt_post: '/phoneOrder/L6tgXlBFeK/confirmReceipt',
    /*撤销退款接口 */
    close_return_post: '/phoneOrder/L6tgXlBFeK/closeReturnOrder',
    /*获取订单详情数据 */
    order_detail_post: '/phoneOrder/L6tgXlBFeK/orderDetail',
    /*删除订单的接口 */
    delete_order_post: '/phoneOrder/L6tgXlBFeK/deleteOrder',
    /*获取退款类型的接口 */
    return_style_post: '/phoneOrder/L6tgXlBFeK/getReturnStyle',
    /*获取退款信息的接口 */
    return_post: '/phoneOrder/L6tgXlBFeK/getReturn',
    /*保存退款的接口 */
    return_save_post: '/phoneOrder/L6tgXlBFeK/saveReturnContent',
    /*保存退款物流的接口 */
    return_logistics_save_post: '/phoneOrder/L6tgXlBFeK/saveReturnLogistics',
    /*查询物流公司的接口 */
    return_logistics_post: '/phoneOrder/L6tgXlBFeK/getReturnLogistics',
    /*查询物流公司的接口 */
    return_logistics_detail_post: '/phoneOrder/L6tgXlBFeK/getReturnLogisticsDetail',
    /*查看退款详情的接口 */
    return_finish_detail_post: '/phoneOrder/L6tgXlBFeK/returnDetail',
    /*查看协商详情的接口 */
    return_log_post: '/phoneOrder/L6tgXlBFeK/returnLogList'

  };

  window.h5App = h5App;
}());
