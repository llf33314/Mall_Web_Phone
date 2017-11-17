
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
			let _data = this.getSubmitOrderParams();
			if (_data == null || _data.length == 0) {
				return;
			}
		},
		/**
		 * 拼提交订单参数
		 */
		getSubmitOrderParams() {
			let _this = this;
			let _commonFn = _this.commonFn;
			let orderData = _this.orderData;
			let orderList = _this.orderList;//商家集合
			let _data = {
				totalMoney: orderData.totalMoney,//商品总额（优惠前的价格）
				totalPayMoney: orderData.totalPayMoney,//合计（商品支付总价）
				selectPayWayId: _this.selectPayWay.id,//选中的支付方式id
				selectMemberAddressId: _this.memberAddresss.id || 0,//选中会员地址id
				orderType: orderData.type || 0, // 订单类型 1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品
				flowPhone: orderData.flowPhone || "", //流量充值需要传的手机号码
				shopCartIds: _this.$route.params.shopCartIds || "",//购物车id，多个用逗号隔开
			};

			let busResultList = [];

			orderList.forEach((bus, index) => {
				console.log(bus, "bus")
				let orderObj = {
					productTotalMoney: bus.productTotalMoney || 0,//商品总价
					productFreightMoney: bus.productFreightMoney || 0,//商品运费
					totalNum: bus.totalNum || 0,//商品总数
					totalMoney: bus.totalMoney || 0,//订单总价（包含运费）
					jifenNum: bus.jifenNum || 0,//能抵扣的积分数量
					jifenMoney: bus.jifenMoney || 0,//积分数量抵扣的积分金额
					fenbiNum: bus.fenbiNum || 0,//能抵扣的粉币数量
					fenbiMoney: bus.fenbiMoney || 0,//粉币数量抵扣的粉币金额
					unionCardId: bus.unionCardId || 0,//联盟卡id
					selectDeliveryWayId: bus.selectDelivery.id || 0,//选中配送方式的id  1, 快递配送  2,上门自提  3到店购买
					isSelectJifen: bus.isSelectJifen ? 1 : 0,//是否选中积分  1选中
					isSelectFenbi: bus.isSelectFenbi ? 1 : 0,//是否选中粉币  1选中
					isSelectDiscount: bus.isSelectDiscount ? 1 : 0,//是否选中会员卡折扣 1选中
					isSelectCoupons: bus.isSelectCoupons ? 1 : 0,//是否选中了优惠券  1选中
					isSelectUnion: bus.isSelectUnion ? 1 : 0//是否选中联盟 1选中
				};
				if (orderObj.selectDeliveryWayId == 2) {//上门自提
					let takeTime = bus.selectTakeTime;
					// if(_commonFn.isNull(takeTime)){

					// }

					orderObj.takeId = bus.takeId;
					orderObj.takeAddress = bus.takeAddress;
					orderObj.appointmentUserName = bus.appointmentUserName;
					orderObj.appointmentUserPhone = bus.appointmentUserPhone;
					orderObj.appointmentId = bus.appointmentId;
					orderObj.appointmentDate = bus.appointmentDate || "";
					orderObj.appointmentStartTime = bus.appointmentStartTime || "";
					orderObj.appointmentEndTime = bus.appointmentEndTime || "";

				}
				_this.$set(busResultList, index, orderObj);
			});
			_data.busResultList = busResultList;//商家集合

			console.log("提交订单参数：", _data)

			return _data;
		}
	}
});



































