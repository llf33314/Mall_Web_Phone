
import Vue from 'vue'
Vue.mixin({
	methods: {
		/**
		 * 计算订单
		 * type 1 联盟折扣 2 会员折扣 3 粉币抵扣 4 积分抵扣  5 优惠券优惠
		 */
		caculationOrder(type) {
			let _this = this;
			let _commonFm = _this.commonFn;
			let data = _this.orderData;
			let totalYouHuiMoneys = 0;//保存优惠的金额
			//循环商家
			_this.orderList.forEach((bus, item) => {
				bus.shopResultList.forEach((shop, index) => {
					//循环商品
					shop.productResultList.forEach((product, index) => {
						product.totalNewPrice = product.totalPrice;
					});
				});
				//联盟卡计算
				bus = _this.caculationUnion(bus);
				if (_commonFm.validateDouble(bus.unionYouhuiMoney)) {
					totalYouHuiMoneys = _commonFm.floatAdd(totalYouHuiMoneys, bus.unionYouhuiMoney);
				}
				//会员折扣计算
				bus = _this.caculationMemberDiscount(bus);
				if (_commonFm.validateDouble(bus.memberYouhuiMoney)) {
					// totalYouHuiMoneys += bus.memberYouhuiMoney;
					totalYouHuiMoneys = _commonFm.floatAdd(totalYouHuiMoneys, bus.memberYouhuiMoney);
				}
				//优惠券计算
				
				//粉币计算
				bus = _this.caculationFenbiDiscount(bus);
				if (_commonFm.validateDouble(bus.fenbiYouhuiMoney)) {
					// totalYouHuiMoneys += bus.fenbiYouhuiMoney;
					totalYouHuiMoneys = _commonFm.floatAdd(totalYouHuiMoneys, bus.fenbiYouhuiMoney);
				}
				//积分计算
				bus = _this.caculationJifenDiscount(bus);
				if (_commonFm.validateDouble(bus.jifenYouhuiMoney)) {
					// totalYouHuiMoneys += bus.jifenYouhuiMoney;
					totalYouHuiMoneys = _commonFm.floatAdd(totalYouHuiMoneys, bus.jifenYouhuiMoney);
				}
			});
			//计算订单支付的金额 订单优惠券的价格 - 订单优惠后的价格   data.totalMoney - totalYouHuiMoneys）
			data.totalPayMoney = _commonFm.floatSub(data.totalMoney, totalYouHuiMoneys);
			data.totalYouHuiMoney = totalYouHuiMoneys;
		},
		/**
		 * 计算联盟折扣
		 * @param {bus} bus 
		 */
		caculationUnion(bus) {
			let _this = this;
			let _commonFm = _this.commonFn;
			// console.log("bus.isSelectUnion", bus.isSelectUnion,bus.unionDiscount)
			if (!bus.isSelectUnion || bus.unionStatus != 1) {
				bus.unionYouhuiMoney = 0;//商家联盟优惠金额设为 0 
				bus.isSelectUnion = false;//关闭联盟选择
				return bus;
			}
			let unionDiscount = bus.unionDiscount;//会员折扣
			if (unionDiscount == null || unionDiscount == "" || unionDiscount < 0 || unionDiscount >= 1) {
				bus.unionYouhuiMoney = 0;//商家联盟优惠金额设为 0 
				bus.isSelectUnion = false;//关闭联盟选择
				return bus;
			}
			console.log("bus.isSelectUnion", bus.isSelectUnion, unionDiscount)
			let busCanUseUnionProductPrice = 0;//定义能使用会员折扣的商品总价
			//循环店铺
			bus.shopResultList.forEach((shop, index) => {
				//循环商品
				shop.productResultList.forEach((product, index) => {
					if (product.isCanUseDiscount == 1) {
						//能使用会员折扣的商品
						// busCanUseUnionProductPrice += product.totalNewPrice;
						busCanUseUnionProductPrice = _commonFm.floatAdd(busCanUseUnionProductPrice, product.totalNewPrice);
					}
				});
			});
			if (busCanUseUnionProductPrice == 0) {
				bus.unionYouhuiMoney = 0;//商家联盟优惠金额设为 0 
				bus.isSelectUnion = false;//关闭联盟选择
				return bus;
			}
			//店铺下所有商品优惠后的金额 busCanUseUnionProductPrice * unionDiscount
			let discountYouhuiHouPrice = _commonFm.floatMul(busCanUseUnionProductPrice, unionDiscount);
			// console.log(discountYouhuiHouPrice)

			//保存商家下折扣卡优惠的金额 busCanUseUnionProductPrice - discountYouhuiHouPrice
			let busDiscountYouhui = _commonFm.floatSub(busCanUseUnionProductPrice, discountYouhuiHouPrice);
			let totalYouhuiMoney = 0;
			bus.shopResultList.forEach((shop, index) => {
				//循环商品
				shop.productResultList.forEach((product, index) => {
					if (product.isCanUseDiscount == 1) {
						let productNewTotal = product.totalPrice;//商品优惠前的价格
						let discountHouPrice = _commonFm.floatMul(productNewTotal, unionDiscount);//计算商品联盟折扣后的金额
						let productYouhuiPrice = _commonFm.floatSub(productNewTotal, discountHouPrice);//计算联盟折扣 优惠的金额  （商品优惠前的总价 -  优惠后的金额）
						product.totalNewPrice = discountHouPrice;
						totalYouhuiMoney = _commonFm.floatAdd(totalYouhuiMoney, productYouhuiPrice);
					}

				});
			});
			bus.unionYouhuiMoney = busDiscountYouhui;
			console.log(busDiscountYouhui, "联盟卡优惠的金额")
			return bus;
		},
		/**
		 * 计算会员折扣
		 */
		caculationMemberDiscount(bus) {
			let _this = this;
			let _commonFm = _this.commonFn;
			if (!bus.isSelectDiscount) {
				bus.memberYouhuiMoney = 0;
				return bus;
			}
			let memberDiscount = bus.memberDiscount;//会员折扣
			// console.log(memberDiscount, "memberDiscount")
			if (memberDiscount == null || memberDiscount == "" || memberDiscount < 0 || memberDiscount >= 1) {
				return bus;
			}
			console.log("bus.isSelectDiscount", bus.isSelectDiscount)
			let busCanUseDiscountProductPrice = 0;//定义能使用会员折扣的商品总价
			//循环店铺  统计能使用会员折扣的金额
			bus.shopResultList.forEach((shop, index) => {
				//循环商品
				shop.productResultList.forEach((product, index) => {
					if (product.isCanUseDiscount == 1) {
						//能使用会员折扣的商品 busCanUseDiscountProductPrice + product.totalNewPrice
						busCanUseDiscountProductPrice = _commonFm.floatAdd(busCanUseDiscountProductPrice, product.totalNewPrice);
					}
				});
			});
			if (busCanUseDiscountProductPrice == 0) {
				bus.memberYouhuiMoney = 0;//商家会员优惠金额设为 0 
				bus.isSelectDiscount = false;//关闭会员折扣选择
				return bus;
			}
			//店铺下所有商品优惠后的金额 busCanUseDiscountProductPrice*memberDiscount 
			let discountYouhuiHouPrice = _commonFm.floatMul(busCanUseDiscountProductPrice, memberDiscount);
			//保存商家下折扣卡优惠的金额 busCanUseDiscountProductPrice - discountYouhuiHouPrice
			let busDiscountYouhui = _commonFm.floatSub(busCanUseDiscountProductPrice, discountYouhuiHouPrice);
			let totalYouhuiMoney = 0;
			bus.shopResultList.forEach((shop, index) => {
				//循环商品
				shop.productResultList.forEach((product, index) => {
					if (product.isCanUseDiscount == 1) {
						let productNewTotal = product.totalPrice;//商品优惠前的价格
						let discountHouPrice = _commonFm.floatMul(productNewTotal, memberDiscount);//计算商品会员折扣后的金额
						let productYouhuiPrice = _commonFm.floatSub(productNewTotal, discountHouPrice);//计算会员折扣 优惠的金额  （商品优惠前的总价 -  优惠后的金额）
						product.totalNewPrice = discountHouPrice;
						totalYouhuiMoney = _commonFm.floatAdd(totalYouhuiMoney, productYouhuiPrice);
					}

				});
			});
			bus.memberYouhuiMoney = totalYouhuiMoney;
			console.log("折扣卡优惠的金额", totalYouhuiMoney);
			return bus;
		},
		/**
		 * 计算粉币抵扣
		 */
		caculationFenbiDiscount(bus) {
			let _this = this;
			let _commonFm = _this.commonFn;
			if (!bus.isSelectFenbi) {
				bus.fenbiYouhuiMoney = 0;
				return bus;
			}
			let busCanUseFenbiProductPrice = 0;//保存能使用粉币的商品总额
			let busCanUseFenbiProductNum = 0;//保存能使用粉币的商品数量
			//循环店铺
			bus.shopResultList.forEach((shop, index) => {
				//循环商品
				shop.productResultList.forEach((product, index) => {
					if (product.isCanUseFenbi == 1) {
						//能使用会员折扣的商品 busCanUseFenbiProductPrice + product.totalNewPrice
						busCanUseFenbiProductPrice = _commonFm.floatAdd(busCanUseFenbiProductPrice, product.totalNewPrice);
						busCanUseFenbiProductNum++;
					}
				});
			});
			// console.log(busCanUseFenbiProductPrice, "----", busCanUseFenbiProductNum)
			if (busCanUseFenbiProductPrice == 0 || busCanUseFenbiProductNum == 0) {//能使用粉币的商品总价和商品总数 = 0
				bus.fenbiYouhuiMoney = 0;
				bus.isSelectFenbi = false;//关闭粉币选择
				return bus;
			}
			//重新获取粉币能抵扣的金额和数量
			_this.getJifenFenbiRule(busCanUseFenbiProductNum, busCanUseFenbiProductPrice, 2, bus);
			if (bus.fenbiNum == 0 || bus.fenbiMoney == 0) {
				bus.fenbiYouhuiMoney = 0;
				bus.isSelectFenbi = false;//关闭粉币选择
				return bus;
			}
			let jifenFenbiRule = bus.jifenFenbiRule;//积分规则
			let useFenbiTotalPrice = 0;//已使用粉币的优惠金额
			let useFenbiTotalNum = 0;//已使用粉币的商品数量
			//循环店铺
			bus.shopResultList.forEach((shop, index) => {
				//循环商品
				shop.productResultList.forEach((product, index) => {
					if (product.isCanUseFenbi == 1) {
						let productTotalPrice = product.totalNewPrice;//商品优惠前的总价
						let productYouHuiHouTotalPrice;//商品优惠后的总价
						let fenbiYouhuiPrice = 0;//粉币优惠的金额
						if (useFenbiTotalNum + 1 == busCanUseFenbiProductNum) {//最后一个能使用粉币的商品
							fenbiYouhuiPrice = _commonFm.floatSub(bus.fenbiMoney, useFenbiTotalPrice);//单个商品使用粉币优惠的金额 =  粉币优惠的总额 - 已使用粉币的优惠金额
						} else {
							//单个商品使用粉币优惠的金额 = （（商品的总价 / 能使用粉币的商品总价） * 粉币总共能优惠的金额）
							fenbiYouhuiPrice = _commonFm.floatMul(CommonUtil.div(product.totalNewPrice, busCanUseFenbiProductPrice, 10), bus.fenbiMoney);
						}
						productYouHuiHouTotalPrice = _commonFm.floatSub(productTotalPrice, fenbiYouhuiPrice);
						product.totalNewPrice = productYouHuiHouTotalPrice;

						useFenbiTotalPrice = _commonFm.floatAdd(useFenbiTotalPrice, fenbiYouhuiPrice);
						useFenbiTotalNum++;

					}
				});
			});
			console.log("粉币优惠的金额", useFenbiTotalPrice);
			bus.fenbiYouhuiMoney = useFenbiTotalPrice;

			return bus;
		},
		/**
		 *  计算积分抵扣
		 */
		caculationJifenDiscount(bus) {
			let _this = this;
			let _commonFm = _this.commonFn;
			if (!bus.isSelectJifen) {
				bus.jifenYouhuiMoney = 0;
				return bus;
			}
			let busCanUseJifenProductPrice = 0;//保存能使用粉币的商品总额
			let busCanUseJifenProductNum = 0;//保存能使用粉币的商品数量
			//循环店铺
			bus.shopResultList.forEach((shop, index) => {
				//循环商品
				shop.productResultList.forEach((product, index) => {
					if (product.isCanUseJifen == 1) {
						//能使用积分抵扣的商品 busCanUseJifenProductPrice + product.totalNewPrice
						//统计能使用积分抵扣的商品总额
						busCanUseJifenProductPrice = _commonFm.floatAdd(busCanUseJifenProductPrice, product.totalNewPrice);
						//统计能使用积分抵扣的商品数量
						busCanUseJifenProductNum++;
					}
				});
			});
			if (busCanUseJifenProductNum == 0 || busCanUseJifenProductPrice == 0) {
				bus.jifenYouhuiMoney = 0;
				bus.isSelectJifen = false;//关闭积分选择
				return bus;
			}
			_this.getJifenFenbiRule(busCanUseJifenProductNum, busCanUseJifenProductPrice, 1, bus);
			if (bus.jifenNum == 0 || bus.jifenMoney == 0) {
				bus.jifenYouhuiMoney = 0;
				bus.isSelectJifen = false;//关闭积分选择
				return bus;
			}
			let jifenFenbiRule = bus.jifenFenbiRule;//积分规则
			let useJifenTotalPrice = 0;//已使用积分的优惠金额
			let useJifenTotalNum = 0;//已使用积分的商品数量
			let youhuiPrice = 0;
			//循环店铺
			bus.shopResultList.forEach((shop, index) => {
				//循环商品
				shop.productResultList.forEach((product, index) => {
					if (product.isCanUseJifen == 1) {
						let productTotalPrice = product.totalNewPrice;//商品优惠前的总价
						let productYouHuiHouTotalPrice;//商品优惠后的总价
						let jifenYouhuiPrice = 0;//积分优惠的金额
						if (useJifenTotalNum + 1 == busCanUseJifenProductNum) {
							/*    最后一个能使用积分的商品   */

							//单个商品使用积分优惠的金额 =  积分优惠的总额 - 已使用积分的优惠金额
							jifenYouhuiPrice = _commonFm.floatSub(bus.jifenMoney, useJifenTotalPrice);
						} else {
							//单个商品使用积分优惠的金额 = （（商品的总价 / 能使用积分的商品总价） * 积分总共能优惠的金额）
							jifenYouhuiPrice = _commonFm.floatMul(CommonUtil.div(product.getProductNewTotalPrice(), busCanUseJifenProductPrice, 10), bus.jifenMoney);
						}
						productYouHuiHouTotalPrice = _commonFm.floatSub(productTotalPrice, jifenYouhuiPrice);
						console.log("粉币优惠的价格：", productYouHuiHouTotalPrice);
						product.totalNewPrice = productYouHuiHouTotalPrice;

						useJifenTotalPrice = _commonFm.floatAdd(useJifenTotalPrice, jifenYouhuiPrice);//累积积分优惠的价格
						useJifenTotalNum++;
					}
				});
			});
			bus.jifenYouhuiMoney = useJifenTotalPrice;
			return bus;
		},
		//计算优惠券抵扣
		caculationYhqDiscount(bus) {
			return bus;
		},
		/**
		 * 重组积分粉币
		 * @param {能使用抵扣的商品数量} canUseDiscountNum 
		 * @param {能使用抵扣的商品金额} canUseDiscountMoney 
		 * @param {类型 1 积分 2 粉币} type 
		 */
		getJifenFenbiRule(canUseDiscountNum, canUseDiscountMoney, type, bus) {
			let _this = this;
			let _commonFm = _this.commonFn;
			if (bus.jifenFenbiRule == null || bus.jifenFenbiRule == "") {
				return bus;
			}
			let jifenFenbiRule = bus.jifenFenbiRule;
			if (type == 1) {
				//积分
				if (canUseDiscountMoney < bus.jifenMoney && bus.jifenMoney > 0) {//起兑的商品金额小于
					bus.jifenNum = _commonFm.floatMul(jifenFenbiRule.jifenRatio, canUseDiscountMoney);
					bus.jifenMoney = canUseDiscountMoney;
				}
			} else if (type == 2) {
				//粉币
				if (jifenFenbiRule.fenbiStartMoney > 0 && jifenFenbiRule.fenbiStartMoney < canUseDiscountMoney && canUseDiscountMoney > 0) {
					//显示积分抵扣的按钮
					let fenbiNum = bus.fenbiNum;
					let fenbiMoney = bus.fenbiMoney;
					if (fenbiMoney > 0) {
						if (canUseDiscountMoney < jifenFenbiRule.fenbiStartMoney) {
							canUseDiscountMoney = jifenFenbiRule.fenbiStartMoney;
						}
						//canUseDiscountMoney / jifenFenbiRule.fenbiStartMoney
						let fenbiMoney = _commonFm.floatDiv(canUseDiscountMoney, jifenFenbiRule.fenbiStartMoney);
						fenbiMoney = parseInt(fenbiMoney);
						bus.fenbiNum = _commonFm.floatMul(jifenFenbiRule.fenbiRatio, fenbiMoney);
						//fenbiMoney * jifenFenbiRule.fenbiStartMoney
						bus.fenbiMoney = _commonFm.floatMul(fenbiMoney, jifenFenbiRule.fenbiStartMoney);
					}
				}
			}
			return bus;
		}
	}
});



































