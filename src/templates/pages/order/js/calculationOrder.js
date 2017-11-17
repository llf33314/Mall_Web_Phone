
import Vue from 'vue'
/**
 * 订单计算
 */
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
			_this.orderList.forEach((bus, i) => {
				if (_commonFm.isNull(bus.totalNewPrice)) {
					bus.totalNewPrice = bus.totalMoney;
				}
				bus.totalMoney = 0;
				let busYouhuiMoneys = 0;
				bus.shopResultList.forEach((shop, index) => {
					//循环商品
					shop.productResultList.forEach((product, index) => {
						product.totalNewPrice = product.totalPrice;
					});
				});
				bus.jifenMoneyOld = bus.jifenMoneyOld || bus.jifenMoney;
				bus.fenbiMoneyOld = bus.fenbiMoneyOld || bus.fenbiMoney;
				//联盟卡计算
				bus = _this.caculationUnion(bus);
				if (_commonFm.validateDouble(bus.unionYouhuiMoney)) {
					busYouhuiMoneys = _commonFm.floatAdd(busYouhuiMoneys, bus.unionYouhuiMoney);
				}
				//会员折扣计算
				bus = _this.caculationMemberDiscount(bus);
				if (_commonFm.validateDouble(bus.memberYouhuiMoney)) {
					busYouhuiMoneys = _commonFm.floatAdd(busYouhuiMoneys, bus.memberYouhuiMoney);
				}
				//优惠券计算
				bus = _this.caculationYhqDiscount(bus);
				if (_commonFm.validateDouble(bus.couponYouhuiMoney)) {
					busYouhuiMoneys = _commonFm.floatAdd(busYouhuiMoneys, bus.couponYouhuiMoney);
				}
				//粉币计算
				bus = _this.caculationFenbiDiscount(bus);
				if (_commonFm.validateDouble(bus.fenbiYouhuiMoney)) {
					// busYouhuiMoneys += bus.fenbiYouhuiMoney;
					busYouhuiMoneys = _commonFm.floatAdd(busYouhuiMoneys, bus.fenbiYouhuiMoney);
				}
				//积分计算
				bus = _this.caculationJifenDiscount(bus);
				if (_commonFm.validateDouble(bus.jifenYouhuiMoney)) {
					// busYouhuiMoneys += bus.jifenYouhuiMoney;
					busYouhuiMoneys = _commonFm.floatAdd(busYouhuiMoneys, bus.jifenYouhuiMoney);
				}
				// bus.productTotalMoney + 
				bus.totalMoney = _commonFm.floatSub(bus.totalNewPrice, busYouhuiMoneys);//商家小计（包含运费，优惠后的）
				_this.$set(_this.orderList, i, bus);
				totalYouHuiMoneys = _commonFm.floatAdd(totalYouHuiMoneys, busYouhuiMoneys);
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
			// console.log("bus.isSelectUnion", bus.isSelectUnion, unionDiscount)
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
			// console.log(busDiscountYouhui, "联盟卡优惠的金额")
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
			// console.log("bus.isSelectDiscount", bus.isSelectDiscount)
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
			// console.log("折扣卡优惠的金额", totalYouhuiMoney);
			return bus;
		},
		/**
		 * 计算粉币抵扣
		 */
		caculationFenbiDiscount(bus) {
			let _this = this;
			let _commonFm = _this.commonFn;

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
			//重新获取粉币能抵扣的金额和数量
			_this.getJifenFenbiRule(busCanUseFenbiProductNum, busCanUseFenbiProductPrice, 2, bus, bus.isSelectFenbi);
			// console.log(busCanUseFenbiProductPrice, "----", busCanUseFenbiProductNum)
			if (busCanUseFenbiProductPrice == 0 || busCanUseFenbiProductNum == 0 || !bus.isSelectFenbi) {//能使用粉币的商品总价和商品总数 = 0
				bus.fenbiYouhuiMoney = 0;
				bus.isSelectFenbi = false;//关闭粉币选择
				return bus;
			}

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
					let isEndCanUseFenbi = useFenbiTotalNum == busCanUseFenbiProductNum && useFenbiTotalPrice == busCanUseFenbiProductPrice;
					if (product.isCanUseFenbi == 1 && !isEndCanUseFenbi) {
						let productTotalPrice = product.totalNewPrice;//商品优惠前的总价
						let productYouHuiHouTotalPrice = 0;//商品优惠后的总价
						let fenbiYouhuiPrice = 0;//粉币优惠的金额
						if (useFenbiTotalNum + 1 == busCanUseFenbiProductNum) {//最后一个能使用粉币的商品
							fenbiYouhuiPrice = _commonFm.floatSub(bus.fenbiMoney, useFenbiTotalPrice);//单个商品使用粉币优惠的金额 =  粉币优惠的总额 - 已使用粉币的优惠金额
						} else {
							//单个商品使用粉币优惠的金额 = （（商品的总价 / 能使用粉币的商品总价） * 粉币总共能优惠的金额）
							fenbiYouhuiPrice = _commonFm.floatMul(_commonFm.floatDiv(product.totalNewPrice, busCanUseFenbiProductPrice, 10), bus.fenbiMoney);
						}
						productYouHuiHouTotalPrice = _commonFm.floatSub(productTotalPrice, fenbiYouhuiPrice);
						// console.log("使用粉币后的商品金额,", productYouHuiHouTotalPrice)
						product.totalNewPrice = productYouHuiHouTotalPrice;

						useFenbiTotalPrice = _commonFm.floatAdd(useFenbiTotalPrice, fenbiYouhuiPrice);
						useFenbiTotalNum++;

					}
				});
			});
			// console.log("粉币优惠的金额", useFenbiTotalPrice);
			bus.fenbiYouhuiMoney = useFenbiTotalPrice;

			return bus;
		},
		/**
		 *  计算积分抵扣
		 */
		caculationJifenDiscount(bus) {
			let _this = this;
			let _commonFm = _this.commonFn;

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
			_this.getJifenFenbiRule(busCanUseJifenProductNum, busCanUseJifenProductPrice, 1, bus, bus.isSelectJifen);
			// console.log("能使用积分的商品总额", busCanUseJifenProductPrice);
			if (busCanUseJifenProductNum == 0 || busCanUseJifenProductPrice == 0 || !bus.isSelectJifen) {
				bus.jifenYouhuiMoney = 0;
				bus.isSelectJifen = false;//关闭积分选择
				return bus;
			}
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
							jifenYouhuiPrice = _commonFm.floatMul(_commonFm.floatDiv(product.totalNewPrice, busCanUseJifenProductPrice, 10), bus.jifenMoney);
						}
						productYouHuiHouTotalPrice = _commonFm.floatSub(productTotalPrice, jifenYouhuiPrice);
						// console.log("积分优惠的价格：", productYouHuiHouTotalPrice);
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
			let _this = this;
			let _commonFm = _this.commonFn;
			//循环店铺
			for (let i = 0; i < bus.shopResultList.length; i++) {
				let shop = bus.shopResultList[i];
				let coupons = shop.selectCoupon;//选中的优惠券对象
				if (coupons == null || coupons == "") {//没有选中优惠券直接跳出循环
					shop.selectCoupon = null;
					bus.couponYouhuiMoney = 0;
					continue;
				}
				let canUseCouponProductPrice = 0;//能使用优惠券的商品金额
				let canUseCouponProductNum = 0;//能使用优惠券的商品数量
				shop.productResultList.forEach((product, index) => {//循环商品集合
					if (product.isCanUseYhq == 1 && product.totalNewPrice > 0) {
						canUseCouponProductPrice = _commonFm.floatAdd(canUseCouponProductPrice, product.totalNewPrice);
						canUseCouponProductNum++;
					}
				});
				if (canUseCouponProductPrice == 0 || canUseCouponProductNum == 0) {//能使用优惠券的商品总价和商品总数 = 0  则跳出当前循环
					_this.$parent.$refs.bubble.show_tips("您不能使用优惠券的商品");
					shop.selectCoupon = null;
					bus.couponYouhuiMoney = 0;
					continue;
				}
				let cardFrom = coupons.couponsFrom;//优惠券来源（ 1 微信优惠券  2多粉优惠券 ）
				let cardType = coupons.cardType;//卡券类型 0折扣券 1减免券
				let addUse = coupons.addUser;//是否允许叠加 0不允许 1已允许 (多粉优惠券也可以)
				let couponNum = coupons.couponNum//叠加的数量
				let shopYouhuiHouTotalPrice = 0;//保存 店铺下 商品优惠后的总额
				if (cardType == 0 && bus.isSelectDiscount == 1) {
					_this.$parent.$refs.bubble.show_tips("会员折扣和折扣券不能同时使用");
					shop.selectCoupon = null;
					bus.couponYouhuiMoney = 0;
					continue;
				}
				// console.log("coupons", coupons)
				//计算店铺下使用商品优惠券的 优惠总额
				if (cardType == 0 && bus.isSelectDiscount != 1) {
					//计算店铺下 折扣券 优惠的总额
					let youhuiHouPrice = _commonFm.floatMul(canUseCouponProductPrice, coupons.discount);//折扣券优惠后的 商品金额
					shopYouhuiHouTotalPrice = _commonFm.floatSub(canUseCouponProductPrice, youhuiHouPrice);//店铺下商品使用优惠券 的优惠总额 = 能使用折扣券的商品总额 - 折扣优惠后的商品金额
				} else if (cardType == 1) {
					//计算店铺下 减免券 优惠的总额
					shopYouhuiHouTotalPrice = coupons.reduceCost;//店铺下商品使用优惠券 的优惠总额  = 减免券优惠的总额
					//判断是否多粉优惠券 且可以叠加
					if (cardFrom == 2 && addUse == 1 && couponNum > 1) {
						if (coupons.cashLeastCost > 0) {//使用优惠券的条件
							couponNum = _commonFm.floatDiv(canUseCouponProductPrice, coupons.cashLeastCost); // 优惠券的叠加数量 =  店铺下 能使用优惠券的商品总额 /  使用优惠券的条件
							couponNum = parseInt(couponNum);
						} else {
							//优惠的金额  乘以 叠加数量 （优惠的总额） 大于 能使用优惠券的商品数量
							if (coupons.reduceCost * couponNum > canUseCouponProductPrice) {
								let aa = _commonFm.floatDiv(canUseCouponProductPrice, coupons.reduceCost); //优惠券叠加的数量 =  店铺下能使用优惠券的商品总额 / 减免券优惠的金额
								couponNum = parseInt(couponNum);
							}
						}
						shopYouhuiHouTotalPrice = _commonFm.floatMul(coupons.reduceCost, couponNum);
					}
					if (coupons.cashLeastCost > canUseCouponProductPrice) {//满减条件  大于能 使用优惠券的商品金额
						continue;
					}
					if (shopYouhuiHouTotalPrice > canUseCouponProductPrice) {//优惠的总额  大于 能使用优惠券的商品金额，则 优惠券的金额 = 能使用优惠券的商品金额
						shopYouhuiHouTotalPrice = canUseCouponProductPrice;
					}
				}
				if (shopYouhuiHouTotalPrice == 0) {//优惠的金额 = 0 没必要计算
					shop.selectCoupon = null;
					bus.couponYouhuiMoney = 0;
					continue;
				}

				let useCouponTotalPrice = 0;//已使用优惠券的商品金额
				let useCouponTotalNum = 0;//已使用优惠券的商品数量
				let shopProductNewTotal = 0;//保存订单优惠后的商品总额
				let totalYouhuiMoney = 0;//保存使用优惠券优惠的金额
				for (let j = 0; j < shop.productResultList.length; j++) {
					let product = shop.productResultList[j];
					let isEndCanUseYhq = useCouponTotalNum == canUseCouponProductNum && useCouponTotalPrice == shopYouhuiHouTotalPrice;
					if (product.isCanUseYhq == 1 && !isEndCanUseYhq) {
						let productTotalPrice = product.totalNewPrice;//商品优惠前的总价
						let productYouHuiHouTotalPrice = productTotalPrice;//商品优惠后的总价
						let couponYouhuiPrice = 0;//优惠券优惠的金额
						//能使用优惠券的商品
						if (cardType == 0 && bus.isSelectDiscount != 1) {
							/* 折扣券的计算 */
							//计算单个商品优惠的价格（ 折扣券）
							productYouHuiHouTotalPrice = _commonFm.floatMul(productTotalPrice, coupons.discount);// 折扣券优惠后的 商品金额
							couponYouhuiPrice = _commonFm.floatSub(productTotalPrice, productYouHuiHouTotalPrice);//优惠的金额
						} else if (cardType == 1) {
							/* 减免券的计算 */
							//单个商品的总价/ 店铺下能使用优惠券的商品总价  * 能够优惠的价格 （减免券）
							couponYouhuiPrice = _commonFm.floatMul(_commonFm.floatDiv(productTotalPrice, canUseCouponProductPrice, 10), shopYouhuiHouTotalPrice);
							productYouHuiHouTotalPrice = _commonFm.floatSub(productTotalPrice, couponYouhuiPrice);
						}
						if (productYouHuiHouTotalPrice < 0) {//商品优惠后的商品总额 小于 0
							productYouHuiHouTotalPrice = 0;//优惠后的价格  = 0
							couponYouhuiPrice = productTotalPrice;//商品优惠的金额  = 优惠前的总额
						}
						if (useCouponTotalNum + 1 == canUseCouponProductNum) {//最后一个商品
							couponYouhuiPrice = _commonFm.floatSub(shopYouhuiHouTotalPrice, useCouponTotalPrice);//商品优惠的金额 =  店铺下商品使用优惠券 的优惠总额
						}
						if (couponYouhuiPrice + useCouponTotalPrice > shopYouhuiHouTotalPrice) {//商品优惠的金额 + 已经优惠的商品总价 > 店铺下优惠的总额
							couponYouhuiPrice = _commonFm.floatSub(shopYouhuiHouTotalPrice, useCouponTotalPrice);//商品优惠的金额 = 店铺下优惠的总额 - 已经优惠的总价
							productYouHuiHouTotalPrice = _commonFm.floatSub(productTotalPrice, couponYouhuiPrice);//商品优惠后的总价 = 商品优惠前的总价 - 商品优惠的金额
						}
						useCouponTotalPrice += couponYouhuiPrice;
						useCouponTotalNum++;
						product.totalNewPrice = productYouHuiHouTotalPrice;

						totalYouhuiMoney = _commonFm.floatAdd(totalYouhuiMoney, couponYouhuiPrice);
					}
				}
				// console.log("优惠券总共能优惠", totalYouhuiMoney, "优惠后价格：", shopProductNewTotal);
				bus.couponYouhuiMoney = totalYouhuiMoney;
			}
			return bus;
		},
		/**
		 * 重组积分粉币
		 * @param {能使用抵扣的商品数量} canUseDiscountNum 
		 * @param {能使用抵扣的商品金额} canUseDiscountMoney 
		 * @param {类型 1 积分 2 粉币} type 
		 */
		getJifenFenbiRule(canUseDiscountNum, canUseDiscountMoney, type, bus, isSelect) {
			let _this = this;
			let _commonFm = _this.commonFn;
			if (bus.jifenFenbiRule == null || bus.jifenFenbiRule == "") {
				return bus;
			}
			let jifenFenbiRule = bus.jifenFenbiRule;
			if (type == 1) {
				if (jifenFenbiRule.jifenStartMoney > 0 && jifenFenbiRule.jifenStartMoney < canUseDiscountMoney && canUseDiscountMoney > 0) {
					//积分
					if (canUseDiscountMoney < bus.jifenMoneyOld && bus.jifenMoneyOld > 0) {//起兑的商品金额小于
						bus.jifenNum = _commonFm.floatMul(jifenFenbiRule.jifenRatio, canUseDiscountMoney);
						bus.jifenMoney = canUseDiscountMoney;
					}
					bus.jifenDisabled = 0;//启用积分抵扣选择
				} else {
					bus.jifenDisabled = 1;//禁用积分抵扣选择
					bus.isSelectJifen = false;//关闭积分选择
					// bus.jifenNum = 0;
					// bus.jifenMoney = 0;
					if (isSelect) {
						//选中抵扣才能提醒
						_this.$parent.$refs.bubble.show_tips("能使用积分抵扣的商品金额为" + canUseDiscountMoney + "，没达到起兑金额");
					}
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
					bus.fenbiDisabled = 0;//启用粉币抵扣选择
				} else {
					bus.fenbiDisabled = 1;//禁用粉币抵扣选择
					bus.isSelectFenbi = false;//关闭粉币选择
					// bus.fenbiNum = 0;
					// bus.fenbiMoney = 0;
					if (isSelect) {
						//选中抵扣才能提醒
						_this.$parent.$refs.bubble.show_tips("能使用粉币抵扣的商品金额为" + canUseDiscountMoney + "，没达到起兑金额");
					}
				}
			}
			return bus;
		}
	}
});



































