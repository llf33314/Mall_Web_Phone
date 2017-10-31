
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
	ajax(opt){
	
		var opts = opt || {};
		
		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		
		axios({
			method: opts.type || 'post',
			url: opts.url,
			params: opts.data || {},
			headers: opts.headers || {
				'Content-Type':'application/x-www-form-urlencoded',
				// 'Access-Control-Allow-Origin': '*'
			},
			// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  			// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
			baseURL:'/api',
			timeout: opts.time || 10*1000,
			responseType: opts.dataType || 'json'
		}).then(function(res){

			if(res.status == 200 ){

				if(opts.success){
					
					opts.success(res.data,res);
				}
				
			}else{
				
				if (data.error) {
					opts.error(error);
				}else{
					console.log('error');
				}
				
			}
				
		}).catch(function (error){
			console.log(error);
			if (opts.error) {
				opts.error(error);
			}else{
				console.log('catch');
			}
		});
			
	},
	/**
     * 设置根字体
     * 750设计稿  设计稿尺寸 / 100
     * 1242设计稿 设计稿尺寸 / 150
     */
    setFontSize(){
		
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
		if (!name)return null;
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
	input_focus(){
		$('#app').css('display', 'block');
		$('.landscape').css('display', 'none');
		$('.main .footer-nav').addClass('hide');
	},
	//失去焦点
	input_blur(){
		$('.main .footer-nav').removeClass('hide');
	},
	//判断ios和安卓系统
	isSystem(e){
		let u = navigator.userAgent;
		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		if (isAndroid) {
		}
	},
	//判断微信浏览器类型
	checkPlatform(){
		if(/android/i.test(navigator.userAgent)){
			//这是Android平台下浏览器
			return 'Android'
		}
		if(/(iPhoneiPadiPodiOS)/i.test(navigator.userAgent)){
			//这是iOS平台下浏览器
			return 'iOS'
		}
		if(/Linux/i.test(navigator.userAgent)){
			//这是Linux平台下浏览器
			return 'Linux'
		}
		if(/Linux/i.test(navigator.platform)){
			//这是Linux操作系统平台
			return 'Linux'
		}
		if(/MicroMessenger/i.test(navigator.userAgent)){
			//这是微信平台下浏览器
			return 'Messenger'
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
	moneySplit(money){
		let arr = [];
		let str = money+"";
		
		if(str.indexOf(".")==-1){
			arr = [money,'00'];
		}else{
			arr = str.split('.');
		}
		arr[0] = parseFloat(arr[0] ).toLocaleString()
		return arr
	},
	 /** 
     * 含有表情符号字符串 处理 
     * @param text 接受字符串
     * @param imgUrl 图片域名
     */
    emoji(text,imgUrl){
        let _this = this;
        let oText = text.split('/images/');
        let newText='';
        oText.forEach(function(itme,index) {
            if(index < oText.length-1){
                itme = itme+ imgUrl+'images/';
            }
            newText += itme;
        });
        return newText;
    }
    
};

Vue.prototype.commonFn = Rxports;

//export default Rxports;


































