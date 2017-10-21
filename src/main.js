require('assets/css/_reset.css');
require('assets/css/common.less');
require('assets/font/iconfont.css');

//注册在vue公用方法
require('@/lib/common.js');
//接口文件
require('@/lib/config');
//vuex
import Vue from 'vue'
import App from './App'
import router from './router'

import storeConfig from './vuex/store'

//Vue.config.productionTip = false

import jq from './lib/jquery-2.2.2.min';

//消除移动端300ms延迟
import FastClick from 'fastclick'
FastClick.attach(document.body);

new Vue({
  el: '#app',
  router,
  store:storeConfig,
  template: '<App/>',
  components: { App }
})
