
import axios from 'axios';
import Vue from 'vue'

var Rxports = {

	/**
     * 设置根字体
     * 750设计稿  设计稿尺寸 / 100
     * 1242设计稿 设计稿尺寸 / 150
     */
	setFontSize() {

		//var max_w = $(window).width(),page1 = 320, meta = $("meta[name=viewport]");
		//meta.attr("content", "width="+page1+",initial-scale=" + max_w / page1 + ", minimum-scale=" + max_w / page1 + ", maximum-scale=" + max_w / page1 + ", user-scalable=no");
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		var devWidth = height > width ? width : height;
		if (devWidth > 1242) devWidth = 1242; //取短后是否会大于1242
		document.documentElement.style.fontSize = Math.floor(devWidth / (1242 / 150)) + 'px';
		//$('html').css('font-size', Math.floor(devWidth / 31));
	},
	//进入焦点事件不显示横竖屏
	input_focus() {
		$('#app').css('display', 'block');
		$('.landscape').css('display', 'none');
		$('.main .footer-nav').addClass('hide');
	},
	//判断ios和安卓系统
	isSystem(e) {
		let u = navigator.userAgent;
		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		if (isAndroid) {
			return 'android';
		}
		return 'ios';
	},
	//判断微信浏览器类型
	checkPlatform() {
		if (/MicroMessenger/i.test(navigator.userAgent)) {
			//这是微信平台下浏览器
			return 'Messenger'
		}
		if (/android/i.test(navigator.userAgent)) {
			//这是Android平台下浏览器
			return 'Android'
		}
		if (/iphone os/i.test(navigator.userAgent)) {
			//这是iOS平台下浏览器
			return 'iOS'
		}
		if (/Linux/i.test(navigator.userAgent)) {
			//这是Linux平台下浏览器
			return 'Linux'
		}
		if (/Linux/i.test(navigator.platform)) {
			//这是Linux操作系统平台
			return 'Linux'
		}
	},
	/**
     * 修改页面标题
     * @param title 标题
     */
	setTitle(title) {
		var u = navigator.userAgent
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		if (isAndroid) {
			document.title = title
		} else if (isiOS) {
			var $body = $('body')
			document.title = title;
			var $iframe = $('<iframe style="display:none"></iframe>')
			$iframe.on('load', function () {
				window.setTimeout(function () {
					$iframe.off('load').remove()
				}, 0)
			}).appendTo($body)
		}
	},
	/**
     * 价格分割
     * @param money 标题
     */
	moneySplit(money) {
		let arr = [];
		let str = money + "";

		if (str.indexOf(".") == -1) {
			arr = [money, '00'];
		} else {
			arr = str.split('.');
		}
		arr[0] = parseFloat(arr[0]).toLocaleString()
		return arr
	},
	/** 
	* 含有表情符号字符串 处理 
	* @param text 接受字符串
	* @param imgUrl 图片域名
	*/
	emoji(text, imgUrl) {
		let _this = this;
		let oText = text.split('/images/');
		let newText = '';
		oText.forEach(function (itme, index) {
			if (index < oText.length - 1) {
				itme = itme + imgUrl + 'images/';
			}
			newText += itme;
		});
		return newText;
	},

	/*-------------正则验证-----------------*/
	/**
	 * 检验手机号码
	 * @param {Number} num
	 * @returns {Boolean}
	 */
	validPhone: function (num) {
		let phoneReg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|17[0123456789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
		return phoneReg.test(num);
	},
	//验证手机号码和固话
	validAllPhone: function (num) {
		let phoneReg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|17[0123456789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
		let isfixed = /^([0-9]{3,4})?[0-9]{7,8}$/;
		return phoneReg.test(num) || isfixed.test(num);
	},
	//验证固话
	validAllPhone: function (num) {
		let isfixed = /^([0-9]{3,4})?[0-9]{7,8}$/;
		return isfixed.test(num);
	},
	/**
	 * 验证物流号
	 */
	validateWuliuNo: function (wuliuNo) {
		if (!/[a-z-A-Z-0-9]{1,30}$/.test(wuliuNo)) {
			return false;
		}
		return true;
	},
	/**
	 * 禁止页面滚动
	 */
	disableScroll: function () {
		$(window).bind("touchmove", function (e) {
			e.preventDefault();
		});
	},
	/**
	 * 允许页面滚动
	 */
	allowScroll: function () {
		$(window).unbind("touchmove");
	},
	//验证是否是小数
	validateDouble(data) {
		if (data == null || data == "" || typeof (data) == "undefined") {
			return false;
		}
		return true;
	},//加    
	floatAdd(arg1, arg2) {
		// var r1, r2, m;
		// try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
		// try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
		// m = Math.pow(10, Math.max(r1, r2));
		// return (arg1 * m + arg2 * m) / m;
		return arg1 + arg2;
	},
	//减    
	floatSub(arg1, arg2) {
		// var r1, r2, m, n;
		// try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
		// try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
		// m = Math.pow(10, Math.max(r1, r2));
		// //动态控制精度长度    
		// n = (r1 >= r2) ? r1 : r2;
		// let num = ((arg1 * m - arg2 * m) / m).toFixed(n);
		// return parseFloat(num);
		return arg1 - arg2;
	},
	//乘    
	floatMul(arg1, arg2) {
		// var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		// try { m += s1.split(".")[1].length } catch (e) { }
		// try { m += s2.split(".")[1].length } catch (e) { }
		// return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
		return arg1 * arg2;
	},
	//除   
	floatDiv(arg1, arg2) {
		// var t1 = 0, t2 = 0, r1, r2;
		// try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
		// try { t2 = arg2.toString().split(".")[1].length } catch (e) { }

		// r1 = Number(arg1.toString().replace(".", ""));

		// r2 = Number(arg2.toString().replace(".", ""));
		// return (r1 / r2) * Math.pow(10, t2 - t1);
		return arg1 / arg2;
	},
	floatNumber(num, len) {
		len = len || 2;
		var bb = num + "";
		len = len + 1;
		if (bb.indexOf('.') > 0) {
			var dian2 = bb.indexOf('.') + len;
			num = bb.substring(0, dian2) * 1;
		}
		return num;
	},
	/**
	 * 判断对象是否为空
	 */
	isNull(data) {
		if (data == null || data == "" || typeof (data) == "undefined") {
			return true;
		}
		return false;
	},
	/**
	* 判断对象是否不为空
	*/
	isNotNull(data) {
		if (data == null || data == "" || typeof (data) == "undefined") {
			return false;
		}
		return true;
	},
	/**
	 * 判断是否是数字
	 */
	isInt(data) {
		try {
			data = parseInt(data);
		} catch (e) {
			return false;
		}
		return true;
	}
};

Vue.prototype.commonFn = Rxports;

//export default Rxports;


































