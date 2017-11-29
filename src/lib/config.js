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
    /***********************   以下接口都是 公用接口 ***********************/
    /*获取首页id*/
    get_home_page_id_post: 'phonePage/L6tgXlBFeK/getHomePageId',
    /*获取店铺id*/
    get_shop_id_post: 'phonePage/L6tgXlBFeK/getShopId',
    /***********************   以下接口都是 商品分类页面相关接口 ***********************/
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
    /*加入购物车接口*/
    liji_buy_post: '/phoneOrder/L6tgXlBFeK/buyNow',
    /***********************   以下接口都是 购物车页面相关接口 ***********************/
    /*查询购物车接口 */
    phoneShopCart_getShopCartx_post: '/phoneShopCart/L6tgXlBFeK/getShopCart',
    /*删除购物车接口 */
    phoneShopCart_removeShopCart_post: '/phoneShopCart/L6tgXlBFeK/removeShopCart',
    /*去结算接口 */
    phoneShopCart_shopCartOrder_post: '/phoneShopCart/L6tgXlBFeK/shopCartOrder',
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
    /********************** 以下接口是退款相关的接口 */
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
    return_log_post: '/phoneOrder/L6tgXlBFeK/returnLogList',
    /*提交订单的接口 */
    submit_order_post: '/phoneOrder/L6tgXlBFeK/submitOrder',
    /*查询找人代付页面的的接口 */
    get_daifu_post: '/phoneOrder/L6tgXlBFeK/getDaiFu',
    /*好友代付 */
    freind_daifu_post: '/phoneOrder/L6tgXlBFeK/freindDaifu',
    /*********************以下接口是地址页面的接口**********/
    /* 查询地址列表的接口 */
    address_list_post: '/phoneAddress/L6tgXlBFeK/addressList',
    /*根据地址id查询地址信息 */
    address_id_post: '/phoneAddress/L6tgXlBFeK/selectAddressById',
    /*查询省市区的接口 */
    address_city_post: '/phoneAddress/L6tgXlBFeK/getCityList',
    /*保存地址的接口*/
    save_address_post: '/phoneAddress/L6tgXlBFeK/saveAddress',
    /*设置默认地址的接口 */
    default_address_post: '/phoneAddress/L6tgXlBFeK/defaultAddress',

    /*********************以下接口是进入评论页面的接口**********/
    /*查询评价列表的接口 */
    comment_list_post: '/phoneComment/L6tgXlBFeK/commentList',
    /*进入评论页面的接口 */
    to_comment_product_post: '/phoneComment/L6tgXlBFeK/toCommentProduct',
    /*添加评论的接口 */
    save_comment_post: '/phoneComment/L6tgXlBFeK/saveComment',
    /*评论成功后的接口 */
    comment_success_post: '/phoneComment/L6tgXlBFeK/commentSuccess',
    /**********************以下接口是提交订单页面相关接口 */
    /*获取提交订单的数据 */
    to_order_post: '/phoneOrder/L6tgXlBFeK/toOrder',
    /*查询上门自提地址的接口 */
    get_take_their_post: '/phoneOrder/L6tgXlBFeK/getTakeTheir',
    /*查询上门自提时间的接口 */
    get_take_their_time_post: '/phoneOrder/L6tgXlBFeK/getTakeTheirTime',

    /**********************以下接口是批发商相关接口*****************************/
    //获取批发商信息
    get_pf_apply_remark_post: '/phoneWholesaler/L6tgXlBFeK/getPfApplyRemark',
    //获取短信验证码
    pifa_send_msg_post: '/phoneWholesaler/L6tgXlBFeK/sendMsg',
    //添加批发商接口
    add_pifa_post: '/phoneWholesaler/L6tgXlBFeK/addWholesaler',

    /**********************以下接口是超级销售员相关接口*****************************/
    is_apply_seller_post: '/phoneSellers/L6tgXlBFeK/isApplySeller',
    //获取销售员获取短信验证码
    seller_send_msg_post: '/phoneSellers/L6tgXlBFeK/getValCode',
    //获取销售员获取短信验证码
    add_seller_post: '/phoneSellers/L6tgXlBFeK/addSellers',
    // 获取超级销售员首页
    sellect_index_post: '/phoneSellers/L6tgXlBFeK/sellerIndex',
    /**********************以下接口是团购相关接口*****************************/
    goupbuy_detail_post: '',
    /**********************以下接口是拍卖相关接口*****************************/
    get_margin_post: "/phoneAuction/L6tgXlBFeK/toAddMargin",
    //获取缴纳保证金页面信息
    add_margin_post: "/phoneAuction/L6tgXlBFeK/addMargin",
    //缴纳保证金
    add_offer_post: "/phoneAuction/L6tgXlBFeK/addOffer",
    //拍卖出价
    get_bid_post: "/phoneAuction/L6tgXlBFeK/shopdetails",
    //抢拍记录
    my_bidding_post: "/phoneAuction/L6tgXlBFeK/myBiddingList",
    //我的竞拍
    my_margin_post: "/phoneAuction/L6tgXlBFeK/myMarginList",
    //我的保证金
    my_huo_post: "/phoneAuction/L6tgXlBFeK/myHuoPaiList",
    //我的货品
    /**********************以下接口是预售相关接口*****************************/
    get_presale_deposit: "/phonePresale/L6tgXlBFeK/toAddDeposit",
    //进入预售缴纳定金页面的接口
    add_deposit_post: "/phonePresale/L6tgXlBFeK/addDeposit",
    //缴纳定金的接口
    my_deposit_post: "/phonePresale/L6tgXlBFeK/myDepositList"
    //我的定金接口

  };

  window.h5App = h5App;
}());
