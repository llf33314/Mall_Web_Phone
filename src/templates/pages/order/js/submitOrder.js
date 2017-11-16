
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
			let _data = getSubmitOrderParams();
			if (_data == null || _data.length == 0) {
				return;
			}
		},
		/**
		 * 拼提交订单参数
		 */
		getSubmitOrderParams() {
			let _this = this;
			let orderData = _this.orderData;
			let _data = {
				totalMoney: orderData.totalMoney,//商品总额（优惠前的价格）
				totalPayMoney: orderData.totalPayMoney,//合计（商品支付总价）
				selectPayWayId: _this.selectPayWay.id,//选中的支付方式id
				selectMemberAddressId: _this.memberAddresss.id,//选中会员地址id
				orderType: orderData.type, // 订单类型 1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品
				flowPhone: orderData.flowPhone, //流量充值需要传的手机号码
				shopCartIds: _this.$route.params.shopCartIds,//购物车id，多个用逗号隔开
			};

			_data.busResultList = [];//商家集合

			console.log("提交订单参数：", _data)
			return _data;
		}
	}
});



































