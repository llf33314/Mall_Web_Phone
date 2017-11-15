
import axios from 'axios';
import Vue from 'vue'

var oproto = Object.prototype;
var serialize = oproto.toString;
var Rxports = {
	/**
	  * @param {String} type			请求的类型，默认post
	  * @param {String} url				请求地址
	  * @param {String} time			超时时间
	  * @param {Object} data			请求参数
	  * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	  * @param {Object} headers			自定义请求headers
	  * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
	  * @param {Function} error		发送请求前
	  * @param return 
	*/
	ajax(opt) {

		var opts = opt || {};

		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		//配置请求头
		axios({
			"method": opts.type || 'post',
			"url": window.h5App.api + opts.url,
			"params": opts.data || {},
			"headers": {
				"Content-type": "application/json;charset=UTF-8"
			},
			// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
			// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
			//"baseURL": window.h5App.api,//打包时注释
			"timeout": opts.time || 10 * 1000,
			"responseType": opts.dataType || 'json'
		}).then(function (res) {

			if (res.status == 200) {

				if (opts.success) {

					opts.success(res.data, res);
				}

			} else {

				if (data.error) {
					opts.error(error);
				} else {
					console.log('error');
				}

			}

		}).catch(function (error) {
			console.log(error);
			if (opts.error) {
				opts.error(error);
			} else {
				console.log('catch');
			}
		});

	},
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
		if (devWidth > 750) devWidth = 750; //取短后是否会大于750
		document.documentElement.style.fontSize = Math.floor(devWidth / (750 / 100)) + 'px';
		//$('html').css('font-size', Math.floor(devWidth / 31));
	},
	/**
	 * 获取URL参数
	 * @param name 参数名
	 * @rteurn {String}
	 */
	getQueryString: function (name) {
		if (!name) return null;
		return window.location.href.split('?' + name + '=')[1];
		/*var reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)(&|$)'), array = location.search.match(reg);
		return array ? decodeURIComponent(array[2]) : null;*/
	},
	//JSON字符串转json对象
	strToJson: function (str) {
		var json = eval('(' + str + ')');
		return json;
	},
	//进入焦点事件不显示横竖屏
	input_focus() {
		$('#app').css('display', 'block');
		$('.landscape').css('display', 'none');
		$('.main .footer-nav').addClass('hide');
	},
	//失去焦点
	input_blur() {
		$('.main .footer-nav').removeClass('hide');
	},
	//判断ios和安卓系统
	isSystem(e) {
		let u = navigator.userAgent;
		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		if (isAndroid) {
		}
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
			document.title = title
			var $iframe = $('<iframe src="/favicon.ico"></iframe>')
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
	 * 检验电话
	 * @param {Number} num
	 * @returns {Boolean}
	 */
	validPhone: function (num) {
		let phoneReg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|17[0123456789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
		return phoneReg.test(num);
	},
	/**
	 * url
	 */
	validURL: function (url) {
		let regex = /^(https?:\/\/)?[\u4e00-\u9fa50-9a-zA-Z][-\u4e00-\u9fa50-9a-zA-Z]{0,62}(\.[-\u4e00-\u9fa50-9a-zA-Z]{1,63})*(\.[-\u4e00-\u9fa50-9a-zA-Z]{0,62}[\u4e00-\u9fa50-9a-zA-Z])(:[0-9]{0,5})?(\/[\w\.-]*)*(#[^#\s]*)?$/i;
		if (url.length < 1 || url.length > 256) {
			return false;
		}
		return regex.test(url);
	},
	/**
	 * 校验邮箱
	 * @param {String} email
	 * @returns {Boolean}
	 */
	validEmail: function (email) {
		let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		//let emailReg = /^\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return emailReg.test(email);
	},
	/**
	 * 校验价格
	 * @param {String} money
	 * @returns {Boolean}
	 */
	validMoney: function (money) {
		//不超过6位整数且保留2位小数
		let moneyReg = /^\d{0,6}(.[0-9]{2})?$/;
		return moneyReg.test(money);
	},
	/**
	 * 校验身份证
	 * @param {String} IDcard
	 * @returns {Boolean}
	 */

	validIDnumber: function (IDcard) {
		var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
		var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
		var varArray = new Array();
		var intValue;
		var lngProduct = 0;
		var intCheckDigit;
		var intStrLen = IDcard.length;
		var idNumber = IDcard;
		// initialize
		if ((intStrLen != 15) && (intStrLen != 18)) {
			return false;
		}
		// check and set value
		for (let i = 0; i < intStrLen; i++) {
			varArray[i] = idNumber.charAt(i);
			if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
				return false;
			} else if (i < 17) {
				varArray[i] = varArray[i] * factorArr[i];
			}
		}
		if (intStrLen == 18) {
			// check date
			var date8 = idNumber.substring(6, 14);
			if (Rxports.isDate8(date8) == false) {
				return false;
			}
			// calculate the sum of the products
			for (let i = 0; i < 17; i++) {
				lngProduct = lngProduct + varArray[i];
			}
			// calculate the check digit
			intCheckDigit = parityBit[lngProduct % 11];
			// check last digit
			if (varArray[17] != intCheckDigit) {
				return false;
			}
		} else { // length is 15
			// check date
			var date6 = idNumber.substring(6, 12);
			if (Rxports.isDate6(date6) == false) {
				return false;
			}
		}
		return true;
		// let IDcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		// return IDcardReg.test(IDcard);
	},
	//15位身份证
	isDate6: function (sDate) {
		if (!/^[0-9]{6}$/.test(sDate)) {
			return false;
		}
		var year, month, day;
		year = sDate.substring(0, 4);
		month = sDate.substring(4, 6);
		if (year < 1700 || year > 2500)
			return false
		if (month < 1 || month > 12)
			return false
		return true
	},
	//18位身份证
	isDate8: function (sDate) {
		if (!/^[0-9]{8}$/.test(sDate)) {
			return false;
		}
		var year, month, day;
		year = sDate.substring(0, 4);
		month = sDate.substring(4, 6);
		day = sDate.substring(6, 8);
		var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		if (year < 1700 || year > 2500)
			return false
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
			iaMonthDays[1] = 29;
		if (month < 1 || month > 12)
			return false
		if (day < 1 || day > iaMonthDays[month - 1])
			return false
		return true
	}, validateWuliuNo: function (wuliuNo) {
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
		var r1, r2, m;
		try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
		try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
		m = Math.pow(10, Math.max(r1, r2));
		return (arg1 * m + arg2 * m) / m;
	},
	//减    
	floatSub(arg1, arg2) {
		var r1, r2, m, n;
		try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
		try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
		m = Math.pow(10, Math.max(r1, r2));
		//动态控制精度长度    
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n);
	},
	//乘    
	floatMul(arg1, arg2) {
		var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		try { m += s1.split(".")[1].length } catch (e) { }
		try { m += s2.split(".")[1].length } catch (e) { }
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	},
	//除   
	floatDiv(arg1, arg2) {
		var t1 = 0, t2 = 0, r1, r2;
		try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
		try { t2 = arg2.toString().split(".")[1].length } catch (e) { }

		r1 = Number(arg1.toString().replace(".", ""));

		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * Math.pow(10, t2 - t1);
	}
};

Vue.prototype.commonFn = Rxports;

//export default Rxports;


































