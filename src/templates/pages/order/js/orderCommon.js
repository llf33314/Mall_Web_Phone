
import Vue from 'vue'
Vue.mixin({
	methods: {
		showConfirmDialogs(orderId) {
			//显示收货地址的弹出框
			let _this = this;
			var msg = {
				//弹出框组件调用
				btnNum: "2",
				dialogMsg: "您确定已经到货？",
				btnOne: "确定",
				btnTow: "关闭",
				dialogTitle: "确认收货提示",
				callback: {
					btnOne: function () {
						_this.confirmReceipts(orderId);
					}
				}
			};
			_this.$parent.$refs.dialog.showDialog(msg); //弹出框
		}, confirmReceipts(orderId) {
			//确认收货请求接口
			let _this = this;
			_this.ajaxRequest({
				url: h5App.activeAPI.confirm_receipt_post,
				data: {
					busId: _this.busId, //商家id
					url: location.href, //获取当前页面地址
					browerType: _this.$store.state.browerType,
					orderId: orderId
				},
				success: function (data) {
					//请求成功重新请求新数据
					if (_this.orderList != null) {
						//订单列表页面刷新数据
						_this.orderList = null;
						_this.getOrderList({ curPage: 1 });
					} else if (_this.order != null && _this.orderDetailList != null) {
						//订单详情页面刷新数据
						_this.loadOrderDetail();
					}
				}
			});
		},
		//删除订单相关
		showDeleteOrderDialog(orderId) {
			let _this = this;
			//弹出询问框
			_this.$parent.$refs.dialog.showDialog({
				//弹出框组件调用
				btnNum: "2",
				dialogMsg: _this.$t('delete_order_tip_msg'),//如您主动删除此订单，您以后将无法看到此订单，请务必谨慎操作？
				btnOne: _this.$t('confirm_msg'),//确定
				btnTow: _this.$t('close_msg'),//关闭
				dialogTitle: _this.$t('delete_order_title_tip_msg'),//删除订单提示
				callback: {
					btnOne: function () {
						_this.deloteOrders(orderId);
					}
				}
			});
		}, deloteOrders(orderId) {
			//删除订单接口
			let _this = this;
			let _data = {
				browerType: _this.$store.state.browerType,
				busId: _this.busId,
				url: location.href,
				orderId: this.orderId
			};
			_this.ajaxRequest({
				url: h5App.activeAPI.delete_order_post,
				data: _data,
				success: function (data) {
					history.go(-1);
				}
			});
		},
		//撤销退款相关
		showCloseReturnDialog(returnId) {
			var _this = this;
			//_this.disableScroll();
			var msg = {
				//弹出框组件调用
				btnNum: "2",
				dialogMsg: _this.$t('return_order_tip_msg'),//如您主动关闭正在处理的退款后，您将无法 再次发起退款申请，请务必谨慎操作。
				btnOne: _this.$t('confirm_msg'),//确定
				btnTow: _this.$t('close_msg'),//关闭
				dialogTitle: _this.$t('close_return_title_msg'),//撤销退款提示
				callback: {
					btnOne: function () {
						_this.closeReturn(returnId);
					}
				}
			};
			_this.$parent.$refs.dialog.showDialog(msg); //弹出框
		}, closeReturn(returnId) {
			//撤销退款接口
			let _this = this;
			let _data = {
				browerType: _this.$store.state.browerType,
				busId: _this.busId,
				url: location.href,
				returnId: returnId
			};
			_this.ajaxRequest({
				url: h5App.activeAPI.close_return_post,
				data: _data,
				success: function (data) {
					//请求成功重新请求新数据
					if (_this.orderList != null) {
						//订单列表页面刷新数据
						_this.orderList = null;
						_this.getOrderList({ curPage: 1 });
					} else if (_this.order != null && _this.orderDetailList != null) {
						//订单详情页面刷新数据
						_this.loadOrderDetail();
					}
				}
			});
		}
	}
});



































