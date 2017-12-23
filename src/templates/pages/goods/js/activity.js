
import Vue from 'vue'
/**
 * 活动相关js
 */
Vue.mixin({
	methods: {
		// 拍卖相关
		/**
		 * 缴纳保证金报名
		 */
		marginDeposit() {
			//缴纳保证金报名
			let product = this.goodsData;
			let aucId = product.activityId;
			let proId = this.goodsId;
			let invId = product.invId || 0;
			let busId = this.$route.params.busId || sessionStorage.getItem("busId");
			if (this.dialogData.id != null) {
				invId = this.dialogData.id;
			}
			if (this.$route.params.activityId != null) {
				aucId = this.$route.params.activityId; //活动id
			}
			this.$router.push("/auction/bond/" + busId + "/" + proId + "/" + aucId + "/" + invId + "/0");
		},
		/**
		 * 拍卖出价减
		 */
		auctionJian() {
			let _auctionData = this.goodsData.auctionResult;
			let _chujiaMoney = this.chujiaMoney;
			let _num = _chujiaMoney - _auctionData.aucAddPrice;
			if (!this.commonFn.isInt(_num) || _num <= 0 || _num < _auctionData.nowPrice) {
				return;
			}
			this.chujiaMoney = _num.toFixed(2) * 1;
		},
		/**
		 * 拍卖出价加
		 */
		auctionAdd() {
			let _auctionData = this.goodsData.auctionResult;
			let _chujiaMoney = this.chujiaMoney;
			let _num = _chujiaMoney + _auctionData.aucAddPrice;
			console.log(_num, "_num")
			if (!this.commonFn.isInt(_num) || _num <= 0) {
				return;
			}
			this.chujiaMoney = _num.toFixed(2) * 1;
		},
		/**
		 * 拍卖出价
		 */
		addOffer() {
			let _this = this;
			let _goodsData = this.goodsData;
			let _auctionData = this.goodsData.auctionResult;
			let _shop_tips = this.$parent.$refs.bubble.show_tips;
			let _chujiaMoney = this.chujiaMoney;
			if (_goodsData.activityStatus == 0) {
				_shop_tips("拍卖还未开始不能出价");
				return;
			} else if (_goodsData.activityStatus == -1) {
				_shop_tips("拍卖已结束，不能出价");
				return;
			}
			var test = /^[0-9]{1,6}(\.\d{1,2})?$/;
			//判断是否是数字
			if (!test.test(_chujiaMoney) || _chujiaMoney * 1 == 1) {
				_shop_tips("请输入大于0的6小位数");
				return;
			} else if (_chujiaMoney * 1 < _auctionData.nowPrice) {
				_shop_tips("不能低于当前价");
				return;
			}
			let _data = {
				busId: this.$route.params.busId || sessionStorage.getItem("busId"), //商家id
				url: location.href, //当前页面的地址
				browerType: this.$store.state.browerType, //浏览器类型
				proId: this.$route.params.goodsId,//商品id
				aucId: this.$route.params.activityId,//拍卖id
				aucPrice: _chujiaMoney,//出价
				proName: _goodsData.productName,//商品名称
				proSpecificaIds: this.dialogData.xsid.toString(),//商品规格id
				proImgUrl: _goodsData.imageList[0].imageUrl
			};
			console.log(_data);
			_this.ajaxRequest({
				url: h5App.activeAPI.add_offer_post,
				data: _data,
				loading: true,
				success: function (data) {
					let msg = {
						type: "success",
						msg: "出价成功"
					};
					_this.$parent.$refs.bubble.show_tips(msg);
					window.setTimeout(function () {
						location.reload();
					}, 1000);
				}
			});
		}, marginNotice() {
			let aucId = this.$route.params.activityId;
			let busId = this.$route.params.busId || sessionStorage.getItem("busId"); //商家id
			this.$router.push("/auction/notice/" + busId + "/" + aucId + "/1");
		},
		// 预售
		/**
		 * 交定金
		 */
		preasaleYuding() {
			//缴纳保证金报名
			let product = this.goodsData;
			let preId = product.activityId;
			let proId = this.goodsId;
			let invId = product.invId || 0;
			let busId = this.$route.params.busId || sessionStorage.getItem("busId");
			if (this.dialogData.id != null) {
				invId = this.dialogData.id;
			}
			if (this.$route.params.activityId != null) {
				preId = this.$route.params.activityId; //活动id
			}
			let num = this.spec_num;
			this.$router.push("/presale/deposit/" + busId + "/" + proId + "/" + preId + "/" + invId + "/" + num);
		}, jijiangPresale() {
			this.$parent.$refs.bubble.show_tips("预售还没开始，请耐心等待");
		},
		/**
		 * 立即购买 
		 * @param {type} type   批发类型 1，手批 2，混批 3预售交纳尾款  0 普通商品
		 * @param {orderType} orderType 商品类型，1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品 (ps:活动商品可以普通购买  )
		 */
		lijiBuy(type, orderType) {
			// let price =
			let _this = this;
			let goodsData = this.goodsData;
			console.log(_this.dialogData);
			let _data = {
				productId: _this.goodsId, //商品id，必传
				busId: _this.$route.params.busId, //商家id，必传
				productNum: _this.spec_num, //productNum	商品数量，必传
				price: _this.dialogData.inv_price, //商品价格，必传
				type: _this.type //查看商品类型，1.团购商品 3.秒杀商品 4.拍卖商品 5 粉币商品 6预售商品 7批发商品
			};
			if (_this.dialogData.xsid != null) {
				_data.productSpecificas = _this.dialogData.xsid.toString();
			}
			if (_this.dialogData.id != null) {
				_data.invId = _this.dialogData.id;
			}
			if (_this.type != null && _this.$route.params.activityId != null) {
				_data.activityId = _this.$route.params.activityId; //活动id
			}
			if (_this.$route.params.joinActivityId != null) {
				_data.joinActivityId = _this.$route.params.joinActivityId;
			}
			if(_this.saleMemberId != null){
				_data.saleMemberId = _this.saleMemberId;
			}
			if(_this.dialogData.commissionMoney != null){
				_data.commission = _this.dialogData.commissionMoney;
			}
			if (type == 1 || type == 2) {
				//获取批发规格
				//批发购买
				let pfDatas = _this.newDialog;
				let arr = [];
				pfDatas.forEach((item, i) => {
					let pfObj = {
						productNum: item.productNum,
						specificaValueIds: item.xsid.toString()
					};
					arr.push(pfObj);
					// _this.$set(arr,arr.length,pfObj);
				});
				// arr = JSON.parse(arr);
				_data.pifaSpecificaDTOList = JSON.stringify(arr);
			} else if (type == 3) {
				//交纳尾款，计算尾款的单价（页面展示的是总价）
				let presale = goodsData.presaleResult;
				if (presale != null) {
					if (presale.isShowWeiMoneyButton != null && presale.isShowWeiMoneyButton == 1) {
						_data.productNum = presale.orderNum;
						_data.price = this.commonFn.floatDiv(presale.weiMoney, presale.orderNum);
					}
				}
			}
			if (_this.type == 1) {
				//团购
				if (orderType == 1) {
					_data.price = _this.dialogData.groupPrice;
				}
			}
			//普通购买
			if (orderType == 0) {
				_data.type = 0;
				_data.activityId = 0;
			}

			console.log("_data", _data);
			_this.ajaxRequest({
				url: h5App.activeAPI.liji_buy_post,
				data: _data,
				success: function (data) {
					_this.commonFn.allowScroll();
					sessionStorage.setItem("payUrl", location.href);
					//跳转到提交订单的页面
					_this.$router.push(
						"/order/settlement/" + _this.$route.params.busId + "/2"
					);
				}
			});
		}
	}
});



































