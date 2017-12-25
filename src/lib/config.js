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


  //打包时切换
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
    get_home_page_id_post: '/phonePage/L6tgXlBFeK/getHomePageId',
    /*获取店铺id*/
    get_shop_id_post: '/phonePage/L6tgXlBFeK/getShopId',
    /*获取我的页面数据*/
    my_center_post: '/phoneMember/L6tgXlBFeK/toUser',
    /*我的收藏 */
    my_collect_post: '/phoneMember/L6tgXlBFeK/collectList',
    /*删除收藏 */
    delete_collect_post: '/phoneMember/L6tgXlBFeK/deleteCollect',
    /*是否需要登陆 */
    is_login_post: '/phoneMember/L6tgXlBFeK/isLogin',
    /*获取会员中心的地址 */ 
    get_member_post: '/phoneMember/L6tgXlBFeK/memberCenter',
    /*获取店铺风格接口 */
    getShopStyle_post: '/phonePage/L6tgXlBFeK/getShopStyle',
    /***********************   以下接口都是 商品分类页面相关接口 ***********************/
    //商品详情
    /*商品搜索接口*/
    phoneProduct_productAll_post: '/phoneProduct/L6tgXlBFeK/productAll',
    /*查询历史搜索和推荐搜索接口*/
    phonePage_searchLabel_post: '/phonePage/L6tgXlBFeK/searchLabel',
    /*清空历史搜索接口*/
    phonePage_clearSearchGroup_post: '/phonePage/L6tgXlBFeK/clearSearchGroup',
    /*商品分类接口*/
    phoneProduct_classAll_post: '/phoneProduct/L6tgXlBFeK/classAll',
    /*获取商家的客服*/
    phonePage_getCustomer_post: '/phonePage/L6tgXlBFeK/getCustomer',
    /*商家id获取底部菜单*/
    phonePage_footerMenu_post: '/phonePage/L6tgXlBFeK/footerMenu',
    /*上传图片的接口 */
    upload_image_post: '/phonePage/L6tgXlBFeK/uploadImage',
    /*店铺列表相关接口 */
    phonePage_shopList_post: '/phoneStore/L6tgXlBFeK/shopList',
    /*店铺列表相关接口 */
    queryFenbiShopByBusId_post: '/phoneStore/L6tgXlBFeK/queryFenbiShopByBusId',
    /*粉币商城店铺列表 */ 
    /***********************   以下接口都是 商品详情页面相关接口 ***********************/
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
    seller_index_post: '/phoneSellers/L6tgXlBFeK/sellerIndex',
    //销售员排行榜接口
    seller_rank_post: '/phoneSellers/L6tgXlBFeK/saleRank',
    //我的客户接口
    seller_client_post: '/phoneSellers/L6tgXlBFeK/clientList',
    //客户订单
    seller_client_order_post: '/phoneSellers/L6tgXlBFeK/clientOrder',
    //累计佣金
    seller_total_income_post: '/phoneSellers/L6tgXlBFeK/totalIncome',
    //我的二维码
    seller_two_code_post: '/phoneSellers/L6tgXlBFeK/myTwoCode',
    //推广海报
    seller_promotion_post: '/phoneSellers/L6tgXlBFeK/promotion',
    //销售规则
    seller_sale_rule_post: '/phoneSellers/L6tgXlBFeK/saleRules',
    //我的提现
    seller_my_withdraw_post: '/phoneSellers/L6tgXlBFeK/myWithdrawal',
    //提现申请
    seller_add_withdraw_post: '/phoneSellers/L6tgXlBFeK/addWithdrawal',
    //佣金明细
    seller_commion_detail_post: '/phoneSellers/L6tgXlBFeK/withdrawalDetail',
    //查询商城设置页面信息
    seller_to_mall_set_post: '/phoneSellers/L6tgXlBFeK/mallSetInfo',
    //查询自选商品信息
    seller_find_product_post: '/phoneSellers/L6tgXlBFeK/findProduct',
    //查询自选商品列表
    seller_selected_product_post: '/phoneSellers/L6tgXlBFeK/selectedProducts',
    //删除已添加商品
    seller_delete_mall_post: '/phoneSellers/L6tgXlBFeK/deleteMallPro',
    //8.	保存商城设置
    seller_add_mall_set_post: '/phoneSellers/L6tgXlBFeK/addMallSet',
    //是否开启自选事件
    seller_open_optional_post: '/phoneSellers/L6tgXlBFeK/openOptional',
    //6.	获取自选商品列表
    seller_find_product_post: '/phoneSellers/L6tgXlBFeK/findProduct',
    //获取销售员说航程首页信息
    seller_mall_index_post: '/phoneSellers/L6tgXlBFeK/mallIndex',
    //获取销售员说航程首页信息
    seller_share_product_post: '/phoneSellers/L6tgXlBFeK/shareSeller',
    /**********************以下接口是团购相关接口*****************************/
    goupbuy_detail_post: '/phoneGroupBuy/L6tgXlBFeK/groupBuyDetail',
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
    my_deposit_post: "/phonePresale/L6tgXlBFeK/myDepositList",
    //我的定金接口
    /**********************以下接口是积分相关接口*****************************/
    integral_product_list_post: "/phoneIntegral/L6tgXlBFeK/integralProductList",
    // 22.	获取积分商城商品列表
    integral_image_post: "/phoneIntegral/L6tgXlBFeK/integralImage",
    //23.	获取积分数量、轮播图片
    integral_detail_post: "/phoneIntegral/L6tgXlBFeK/integralDetail",
    //24.	获取积分明细列表
    integral_record_list_post: "/phoneIntegral/L6tgXlBFeK/recordList",
    //25.	获取兑换记录列表
    integral_product_post: "/phoneIntegral/L6tgXlBFeK/integralProduct",
    //26.	获取积分商品信息
    record_integral_post: "/phoneIntegral/L6tgXlBFeK/recordIntegral"
    //27.	兑换积分
  };

  window.h5App = h5App;
}());
