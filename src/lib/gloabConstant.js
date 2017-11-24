(function () {

	const language = {
		//页面标题
		title_my_msg: "我的",
		title_my_address_msg: "我的地址",
		title_return_order_msg: "退货/售后",
		title_pifa_apply_msg: '批发商申请',
		title_return_apply_msg: '申请退款',

		order_title_data_msg: [
			{ id: 0, name: "我的订单" },
			{ id: 1, name: "待付款订单" },
			{ id: 2, name: "待发货订单" },
			{ id: 3, name: "待收货订单" },
			{ id: 4, name: "已完成订单" },
			{ id: 5, name: "待评价订单" },
			{ id: 6, name: "退款订单" },
			{ id: 7, name: "团购订单" },
			{ id: 8, name: "秒杀订单" }
		],
		//公用提示
		unknown_user_msg: "未知用户",
		confirm_msg: '确定',
		close_msg: '关闭',
		submit_success_msg: '提交成功',
		good_msg: '好的',
		get_validate_code_msg: '获取验证码',
		submit_apply_wait_msg: '您已提交申请，请耐心等待',

		telephone_msg: "请输入正确的手机号",
		//订单相关页面
		submit_order_title: '提交订单',
		select_pay_way_msg: '请选择支付方式',
		select_delivery_msg: '请选择配送方式',
		select_receipt_msg: '请选择收货地址',
		tihuo_name_msg: '请填写提货人姓名',
		tihuo_name_length_msg: '"提货人姓名长度不能超过15个字"',
		tihuo_phone_msg: '请填写正确的提货人手机号码',
		tihuo_time_msg: '请选择提货时间',
		select_coupon_msg: '能使用优惠券的商品总额为0，暂没达到条件',
		coupon_discount_msg: '会员折扣和折扣券不能同时使用',
		jifen_start_money_msg: '能使用积分抵扣的商品金额为{0}，没达到起兑金额',
		fenbi_start_money_msg: '能使用粉币抵扣的商品金额为{0}，没达到起兑金额',
		flow_phone_msg: '请填写正确的充值手机号码',
		delete_order_tip_msg: '如您主动删除此订单，您以后将无法看到此订单，请务必谨慎操作？',
		delete_order_title_tip_msg: '删除订单提示',
		return_order_tip_msg: '如您主动关闭正在处理的退款后，您将无法 再次发起退款申请，请务必谨慎操作。',
		close_return_title_msg: '撤销退款提示',

		order_type_price_name: {
			1: "团购价",
			3: "秒杀价",
			4: "拍卖价",
			5: "粉币",
			6: "预售价",
			7: "批发价"
		},
		order_nav_msg: [
			{ id: 0, name: "全部" },
			{ id: 1, name: "待付款" },
			{ id: 2, name: "待发货" },
			{ id: 3, name: "待收货" },
			{ id: 4, name: "已完成" }
		],

		//批发商相关页面提醒
		pifa_name_msg: '请输入您本人真实姓名',
		pifa_name_length_msg: "姓名长度不能超过25个字",
		pifa_company_name_msg: "请输入公司名称",
		pifa_company_name_length_msg: "公司名称不能超过50个字",
		pifa_telePhone_msg: "请输入正确的手机号",
		pifa_validate_code_msg: "请输入验证码",
		pifa_remark_length_msg: "备注的长度不能超过100个字",
		pifa_tishi_msg: "批发商提示",
		//销售员相关页面提醒
		seller_tishi_msg: "超级销售员提示",



		comment_content_null_msg: "请填写评论内容",
		comment_content_length_msg: "评论内容字数不能超过240个字",

		address_name_null_msg: "请填写收件人姓名",
		address_name_length_msg: "收件人姓名的字数不能超过25个字",
		province_null_msg: "请选择省",
		city_null_msg: "请选择市",
		area_null_msg: "请选择区",
		province_areas_null_msg: "请选择省市区",
		address_null_msg: "请填写详情地址",
		address_length_msg: "联系地址的字数不能超过25个字",
		address_code_length_msg: "门牌号码的字数不超过15个字",
		edit_address_msg: "编辑地址",
		add_address_msg: "新增地址",
		address_null_error_msg: "暂无可用地址",

	};



	window.Language = language;
}());


































