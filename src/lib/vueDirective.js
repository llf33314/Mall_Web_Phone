/*
 * vuejs 	指令
 * time 	2017年12月22日
 */

import Vue from 'vue';
import Swiper from './swiper.js';

Vue.directive('SwiperDraggable', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,name,self) {
    var element = $(el);
    if(element.find('.swiper-slide').length<=1)return;
    var swiper = new Swiper(element.find('.swiper-container'), {
      pagination: element.find(".swiper-pagination"),
      paginationClickable: true,
      spaceBetween: 30,
      autoplay: 4500,
      autoplayDisableOnInteraction: false,
      lazyLoading: true,
      lazyLoadingInPrevNextAmount:2
    });
  }
});

Vue.directive('scroll', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,name,self) {
  }
});

Vue.directive('CountDown', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,name,self) {
    var datatime = self.data.attrs.datatime;

    if(datatime<=0)return;
    var _this = $(el);
    var dom_date = _this.find(".day");
    var dom_hours = _this.find(".hours");
    var dom_minutes = _this.find(".minutes");
    var dom_seconds = _this.find(".seconds");

    setTimeout(function(){
      renovateTime(datatime);
    },1000);

    function renovateTime(param){
      setTimeout(function(){
        if(param == 1)return;
        renovateTime(param-1);
      },1000);
      var Mydate = new Date();
      Mydate.setTime(param*1000);
      var date = Mydate.getDate() - 1;
      var hours = Mydate.getHours() - 8;
      var minutes = Mydate.getMinutes();
      var seconds = Mydate.getSeconds();
      if(date<10)date = "0"+date;
      if(hours<10)hours = "0"+hours;
      if(minutes<10)minutes = "0"+minutes;
      if(seconds<10)seconds = "0"+seconds;
      dom_date.text(date);dom_hours.text(hours);dom_minutes.text(minutes);dom_seconds.text(seconds);
    }
  }
})
