import Vue from 'vue';
import axios from 'axios';
import conf from '@/assets/js/conf';

var oproto = Object.prototype;
var serialize = oproto.toString;
var Rxports = {


  /**
   * 封装axios，减少学习成本，参数基本跟jq ajax一致
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
  ajax:function (opt){
    var opts = opt || {};
    if (!opts.url) {
      throw new Error('请填写接r口地址');
      return false;
    }
    axios({
      method: opts.type || 'post',
      url: opts.url,
      params: opts.data || {},
      headers: opts.headers || {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
      // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
      baseURL: conf.http,
      timeout: opts.time || 10*1000,
      responseType: opts.dataType || 'json'
    }).then(function(res){
      if(res.status == 200){
        if(opts.success){
          opts.success(res.data,res);
        }
      }else{
        if (opts.error) {
          opts.error(error);
        }else{
          throw new Error(res.statusText);
        }
      }
    }).catch(function (error){
      if (opts.error) {
        opts.error(error);
      }
    });

  },
  /*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
  isArrayLike:function(obj) {
    if (!obj)
      return false
    var n = obj.length
    if (n === (n >>> 0)) { //检测length属性是否为非负整数
      var type = serialize.call(obj).slice(8, -1)
      if (/(?:regexp|string|function|window|global)$/i.test(type))
        return false
      if (type === "Array")
        return true
      try {
        if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
          return /^\s?function/.test(obj.item || obj.callee)
        }
        return true
      } catch (e) { //IE的NodeList直接抛错
        return !obj.window //IE6-8 window
      }
    }
    return false
  },

  /*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
  each: function (obj, fn) {
    var That = this;
    if (obj) { //排除null, undefined
      var i = 0
      if (That.isArrayLike(obj)) {
        for (var n = obj.length; i < n; i++) {
          if (fn(i, obj[i]) === false)
            break
        }
      } else {
        for (i in obj) {
          if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
            break
          }
        }
      }
    }
  },
  /**
   * 获取url传过来的参数
   * @param name 	获取的参数
   * @param Url 		自定义获取参数的链接
   * @param return
   */
  getUrlQuery:function (name,Url){

    //URL GET 获取值
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\source-material|&|$)", "i"),
        url = Url || location.href;
    if (reg.test(url))
      return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";

  },

  /**
   * 获取定位信息
   */
  getLocation:function () {
    var str="";
    return new Promise(function (resolve, reject) {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
          resolve(position.coords)
        },function (error) {
          switch(error.code)
          {
            case error.PERMISSION_DENIED:
              str="用户拒绝对获取地理位置的请求。";
              break;
            case error.POSITION_UNAVAILABLE:
              str="位置信息是不可用的。";
              break;
            case error.TIMEOUT:
              str="请求用户地理位置超时。";
              break;
            case error.UNKNOWN_ERROR:
              str="未知错误。";
              break;
          }
          reject(str)
        });
      }else {
        reject("该浏览器不支持获取地理位置。")
      }
    })
  },

  /**
   * 修改页面标题
   * @param title 标题
   */
  setTitle(title) {
    document.title = title;
    var mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
      var iframe           = document.createElement('iframe')
      iframe.style.display = 'none'
      var iframeCallback   = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 0)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
  },

  /**
   * 获取缓存信息
   * @param name 名称
   */
  getCache(name){
    if(conf.cache){
      return sessionStorage.getItem(name);
    }else{
      return conf[name];
    }
  },

  /**
   * 修改缓存信息
   * @param name 名称
   * @param val  值
   */
  setCache(name,val){
    if(conf.cache){
      sessionStorage.setItem(name,val);
    }else{
      conf[name] = val;
    }
  },

  /**
   * 删除缓存信息
   * @param name
   */
  removeCache(name){
    if(conf.cache){
      sessionStorage.removeItem(name);
    }else{
      delete conf[name];
    }
  }

};


export default Rxports;


































