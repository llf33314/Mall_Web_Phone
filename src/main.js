require('assets/css/_reset.css');
require('assets/css/common.less');
require('assets/font/iconfont.css');

//注册在vue公用方法
require('@/lib/common.js');
//接口文件
require('@/lib/config');
//语言引用
require('@/lib/gloabConstant');

require("mint-ui/lib/style.css");
//vuex
import Vue from 'vue'
import App from './App'
import router from './router'

import storeConfig from './vuex/store'

//Vue.config.productionTip = false

import jq from './lib/jquery-2.2.2.min';

import vueFilter from './lib/vueDirective.js';

import 'babel-polyfill';


import MintUi from 'mint-ui'
Vue.use(MintUi);


//消除移动端300ms延迟
import FastClick from 'fastclick'
FastClick.attach(document.body);


var vm = new Vue({
  el: '#app',
  router,
  store: storeConfig,
  template: '<App/>',
  components: { App }
})


/**
 * 弹出框调用
 * 使用方法
 * @param msg 显示参数
* let msg ={
      btnNum: 2 ,//按钮显示个数
      btnOne: '',//按钮文字
      btnTow: '',//按钮文字
      dialogTitle:'提示',
      dialogMsg: '我是消息内容？',
      callback: {
          btnOne: '',//点击按执行方法
          btnTow: ''//点击按执行方法
      }
    }
    _this.$parent.$refs.dialog.showDialog(msg);//调用方法
 */

/**
 * 气泡调用
 * 使用方法
 * @param xxx 显示内容,'内容' 
 * ----需要icon 
 * let msg={
 *    type:'', //success 成功 √ ，error 失败 ×  warning警告 ！
      hint_msg:''
 * }
 * ----不需要icon   直接传入 显示的 文本
    _this.$store.commit("error_msg", xxx); //调用方法
 */