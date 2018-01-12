
import Vue from 'vue'
/**
 * 提交订单
 */
Vue.mixin({
	methods: {
		/**
		 * 提交订单
		 */
		submitOrder() {
			let _this = this;
			let busId = this.$route.params.busId || sessionStorage.getItem("busId");
			let _commonFn = _this.commonFn;//公共js调用
			_this.$parent.isLogin(busId);
			if (!_this.validateSubmitOrderParams()) {
				return;
			}
			let _order = _this.getSubmitOrderParams();
			if (_order == null || _order.length == 0) {
				return;
			}
			let _data = {
				params: _order,
				busId: busId,
				url: window.location.href,
				browerType: _this.$store.state.browerType
			}
			console.log("提交订单参数：", _data);
			// return;

			_this.ajaxRequest({
				url: h5App.activeAPI.submit_order_post,
				data: _data,
				loading: true,//开启loading
				time: 60 * 1000,
				success: function (data) {
					//各种跳转
					let reData = data.data;
					let url = reData.url;
					let orderId = reData.orderId;
					if (_commonFn.isNotNull(url)) {
						_this.$store.commit("is_show_loading", false);
						location.href = url;
						return;
					}
					url = "/order/list/" + busId + "/0";
					if (reData.orderPayWay == 7) {
						//跳转到找人代付页面
						url = "/daifu/" + busId + "/" + orderId;
					} else if (reData.orderPayWay == 4) {
						//跳转到积分商城的页面
					}
					_this.$store.commit("is_show_loading", false);
					_this.$router.push(url);
				}
			});
		},
		/**
		 * 验证提交订单的参数
		 */
		validateSubmitOrderParams() {
			let _this = this;
			let _commonFn = _this.commonFn;//公共js调用
			let orderData = _this.orderData;//初始化数据
			let orderList = _this.orderList;//商家集合
			let _showTip = _this.$parent.$refs.bubble.show_tips;//冒泡提醒
			let _isNull = _commonFn.isNull;//不为空定义
			if (_isNull(_this.memberPhone) || !_commonFn.validPhone(_this.memberPhone)) {
				_showTip("请先绑定手机号码");//请填写需要充值的手机号码
				_this.isShowMemberPhone = true;
				return;
			}
			if (orderData.proTypeId == 4 && (_isNull(orderData.flowPhone) || !_commonFn.validPhone(_this.memberPhone))) {
				_showTip("请填写需要充值的手机号码");//请填写需要充值的手机号码
				_this.showFlowPhone();
				return;
			}
			let flag = true;
			for (let i = 0; i < orderList.length; i++) {
				let bus = orderList[i];
				let selectDelivery = bus.selectDelivery;

				if (orderData.proTypeId == 0) {
					if ((_isNull(_this.selectPayWay) || _isNull(_this.selectPayWay.id)) && _this.toShop != 1) {
						_showTip(Language.select_pay_way_msg);//收货地址提醒
						flag = false;
						break;
					}
					if (_isNull(selectDelivery)) {
						_showTip(Language.select_delivery_msg);//配送方式提醒
						flag = false;
						break;
					}
					//选中配送方式的id  1, 快递配送  2,上门自提  3到店购买
					if (selectDelivery.id == 1) {
						if (_isNull(_this.memberAddresss) || _this.memberAddresss.id == 0) {
							_showTip(Language.select_receipt_msg);//收货地址提醒
							flag = false;
						}
					} else if (selectDelivery.id == 2) {
						if (!_this.blurName(bus.appointmentUserName) || !_this.blurPhone(bus.appointmentUserPhone)) {
							flag = false;
							break;
						}
						if (_isNull(bus.selectTakeTime)) {
							_showTip(Language.tihuo_time_msg);//提货时间提醒
							flag = false;
							break;
						}

					}
				}

			}
			return flag;
		},
		/**
		 * 拼提交订单参数
		 */
		getSubmitOrderParams() {
			let _this = this;
			let _commonFn = _this.commonFn;
			let orderData = _this.orderData;
			let orderList = _this.orderList;//商家集合
			let addressId = 0;
			if(_this.memberAddresss != null){
				addressId = _this.memberAddresss.id || 0;
			}
			//总数据
			let _data = {
				totalMoney: orderData.totalMoney,//商品总额（优惠前的价格）
				totalPayMoney: orderData.totalPayMoney,//合计（商品支付总价）
				selectPayWayId: _this.selectPayWay.id,//选中的支付方式id
				selectMemberAddressId: addressId || 0,//选中会员地址id
				orderType: orderData.type || 0, // 订单类型 1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品
				flowPhone: orderData.flowPhone || "", //流量充值需要传的手机号码
				shopCartIds: _this.$route.params.shopCartIds || "",//购物车id，多个用逗号隔开
			};
			if (orderData.proTypeId > 0) {//虚拟物品不用选择收货地址
				_data.selectMemberAddressId = 0;
			}
			let wxShopIds = [];
			let busIds = [];

			let busResultList = [];//商家集合

			//循环商家
			orderList.forEach((bus, index) => {
				if (busIds.indexOf(bus.busId) == -1) {
					busIds[busIds.length] = bus.busId;
				}
				let orderObj = {
					productTotalMoney: bus.productTotalMoney || 0,//商品总价
					productFreightMoney: bus.productFreightMoneyOld || 0,//商品运费
					totalNum: bus.totalNum || 0,//商品总数
					totalMoney: bus.totalMoney || 0,//订单总价（包含运费）
					jifenNum: bus.jifenNum || 0,//能抵扣的积分数量
					jifenMoney: bus.jifenMoney || 0,//积分数量抵扣的积分金额
					fenbiNum: bus.fenbiNum || 0,//能抵扣的粉币数量
					fenbiMoney: bus.fenbiMoney || 0,//粉币数量抵扣的粉币金额
					selectDeliveryWayId: bus.selectDelivery.id || 0,//选中配送方式的id  1, 快递配送  2,上门自提  3到店购买
					isSelectJifen: bus.isSelectJifen ? 1 : 0,//是否选中积分  1选中
					isSelectFenbi: bus.isSelectFenbi ? 1 : 0,//是否选中粉币  1选中
					isSelectDiscount: bus.isSelectDiscount ? 1 : 0,//是否选中会员卡折扣 1选中
					isSelectUnion: bus.isSelectUnion ? 1 : 0//是否选中联盟 1选中
				};
				if (bus.fenbiDisabled == 1) {
					orderObj.fenbiNum = 0;
					orderObj.fenbiMoney = 0;
				}
				if (bus.jifenDisabled == 1) {
					orderObj.jifenNum = 0;
					orderObj.jifenMoney = 0;
				}
				let isSelectCoupons = 0; //是否选中了优惠券  1选中

				if (bus.isSelectUnion) {
					orderObj.unionCardId = bus.unionCardId || 0;//联盟卡id
					orderObj.unionDiscount = bus.unionDiscount || 0;//联盟卡折扣
				}
				if (orderData.proTypeId == 0) {
					if (orderObj.selectDeliveryWayId == 2) {//上门自提
						let takeTime = bus.selectTakeTime;
						orderObj.takeAddress = bus.takeAddress;//上门自提地址
						orderObj.appointmentUserName = bus.appointmentUserName;//提货人姓名
						orderObj.appointmentUserPhone = bus.appointmentUserPhone;//提货人手机号码
						orderObj.appointmentId = bus.takeId;//提货id
						orderObj.appointmentDate = takeTime.times || "";//提货日期
						orderObj.appointmentStartTime = takeTime.startTime || "";//提货开始时间
						orderObj.appointmentEndTime = takeTime.endTime || "";//提货结束时间
					}
				}

				let shopResultList = [];
				//循环店铺
				bus.shopResultList.forEach((shop, index2) => {
					if (_commonFn.isNotNull(shop.selectCoupon)) {
						isSelectCoupons = 1;//是否选中了优惠券  1选中
					}
					let shopObj = {
						shopId: shop.shopId || 0,//店铺id
						wxShopId: shop.wxShopId || 0,//门店id
						totalNum: shop.totalNum || 0,//商品总数
						totalMoney: shop.totalMoney || 0,//商品总价（优惠前的价格，没包含运费）
						totalFreightMoney: shop.totalFreightMoney || 0,//运费
						buyerMessage: bus.buyerMessage || ""//买家留言
					}
					if (wxShopIds.indexOf(shop.wxShopId) == -1) {
						wxShopIds[wxShopIds.length] = shop.wxShopId;
					}
					if (shop.selectCoupon != null) {
						shopObj.selectCouponsId = shop.selectCoupon.id || 0;//选中优惠券的id
						shopObj.selectCouponsNum = shop.useCouponNum || 1;
					}

					let productResultList = [];
					//循环商品
					shop.productResultList.forEach((product, index) => {
						let productObj = {
							productId: product.productId,//商品id
							shopId: product.shopId,//店铺id
							productImageUrl: product.productImageUrl,//商品图片
							productSpecificaValueId: product.productSpecificaValueId || 0,//规格值id
							productSpecificaValue: product.productSpecificaValue || "",//商品规格值
							productPrice: product.productPrice,//商品价格(优惠前的价格)
							productOldPrice: product.productPrice,//商品原价
							totalPrice: product.totalPrice,//商品总价（商品价格*数量）
							productNum: product.productNum,//商品数量
							saleMemberId: product.saleMemberId || 0,//销售员id
							commission: product.commission || 0,//销售佣金
							activityType: orderData.type || 0,//活动类型，1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品
							activityId: orderData.activityId || 0,//活动id(如果是活动商品，必传)
							proTypeId: orderData.proTypeId || 0
						};
						if (product.pfSpecResultList != null) {
							productObj.pfSpecResultList = product.pfSpecResultList;
						}
						if (product.orderDetailId != null && product.orderDetailId > 0) {
							productObj.orderDetailId = product.orderDetailId;
						}
						if (orderData.joinActivityId != null) {
							productObj.groupJoinId = orderData.joinActivityId;
						}
						_this.$set(productResultList, productResultList.length, productObj);
					});

					shopObj.productResultList = productResultList;
					_this.$set(shopResultList, shopResultList.length, shopObj);

				});
				orderObj.isSelectCoupons = isSelectCoupons;

				orderObj.shopResultList = shopResultList;
				_this.$set(busResultList, busResultList.length, orderObj);
			});
			_data.busResultList = busResultList;//商家集合
			_data.wxShopIds = wxShopIds.toString();
			_data.busIds = busIds.toString();
			if (_this.from == 2) {
				_data.orderId = _this.$route.params.ids;
			}
			return _data;
		}
	}
});



































