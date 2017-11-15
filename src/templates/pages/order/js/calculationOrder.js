
import Vue from 'vue'
// import commonFn from "lib/common.js"
Vue.mixin({
	methods: {
		/**
		 * 计算订单
		 * type 1 联盟折扣 2 会员折扣 3 粉币抵扣 4 积分抵扣  5 优惠券优惠
		 */
		caculationOrder(type) {
			console.log("this",this.commonFn.validateDouble("aaa"));
			let _this = this;
			console.log(type)
			let data = _this.orderData;
			let totalYouhuiMoneys = 0;//保存优惠的金额
			//循环商家
			data.busResultList.forEach((bus, item) => {
				console.log("bus.isSelectDiscount", bus.isSelectDiscount)
				if (bus.isSelectUnion) {//选中联盟折扣
					bus = _this.caculationUnion(bus);
				}
				if (bus.isSelectDiscount) {//选中会员折扣
					bus = _this.caculationMemberDiscount(bus);
					if(_this.commonFn.validateDouble(bus.memberYouhuiMoney)){
						totalYouhuiMoneys += bus.memberYouhuiMoney;
					}
				}
				if (bus.isCanUseFenbiDiscount) {//选中粉币抵扣

				}
				if (bus.isCanUseJifenDiscount) {//选中了积分抵扣

				}
			});
			data.totalYouHuiMoney = totalYouhuiMoneys;
		},
		/**
		 * 计算联盟折扣
		 * @param {bus} bus 
		 */
		caculationUnion(bus) {

		},
		/**
		 * 计算会员折扣
		 * @param {bus} bus 
		 */
		caculationMemberDiscount(bus) {
			console.log(bus)
			let memberDiscount = bus.memberDiscount;//会员折扣
			console.log(memberDiscount, "memberDiscount")
			if (memberDiscount == null || memberDiscount == "" || memberDiscount < 0 || memberDiscount >= 1) {
				return bus;
			}
			let busCanUseDiscountProductPrice = 0;//定义能使用会员折扣的商品总价
			//循环店铺
			bus.shopResultList.forEach((shop, index) => {
				//循环商品
				shop.productResultList.forEach((product, index) => {
					if (product.isCanUseDiscount == 1) {
						//能使用会员折扣的商品
						busCanUseDiscountProductPrice += product.totalPrice;
					}
				});
			});
			//店铺下所有商品优惠后的金额
			let discountYouhuiHouPrice = busCanUseDiscountProductPrice * memberDiscount;
			console.log(discountYouhuiHouPrice)

			//保存商家下折扣卡优惠的金额
			let busDiscountYouhui = busCanUseDiscountProductPrice - discountYouhuiHouPrice;

			bus.memberYouhuiMoney = busDiscountYouhui;
			console.log(busDiscountYouhui,"折扣卡优惠的金额")
			return bus;
		}
	}
});



































