/*
 * vuejs 	指令
 * time 	2017年12月22日
 */

import Vue from 'vue';
import Swiper from './swiper.js';

var throttle = function (fn, delay) {
  var now,lastExec,timer,context,args;

  var execute = function () {
    fn.apply(context,args);
    lastExec = now;
  };

  return function () {
    context = this;
    args = arguments;

    var scrollTop = getScrollTop();
    scrolls.forEach(e => {
      if(e.navHeight>0) {
        if (scrollTop < e.top) {
          e.navDom.removeClass('fixedBottom fixedTop');
        }else if (scrollTop > e.top && scrollTop < e.bottom + getVisibleHeight() - e.navHeight) {
          e.navDom.removeClass('fixedBottom').addClass('fixedTop')
        }else{
          e.navDom.removeClass('fixedTop').addClass('fixedBottom')
        }

        if(scrollTop>e.navTop[e.vm.select+1]&&e.vm.select<e.navTop.length-1){
          e.vm.select += 1;
        }else if(scrollTop<e.navTop[e.vm.select]&&e.vm.select>0){
          e.vm.select -= 1;
        }
      }
    });

    now = Date.now();

    if(timer){
      clearTimeout(timer);
      timer = null;
    }

    if(lastExec){
      var diff = delay - (now - lastExec);

      if(diff>0){
        timer = setTimeout(execute,diff)
      }else{
        execute();
      }

    }else{
      execute();
    }

  }
};

var getScrollTop = function() {
  return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
};
var getElementBottom = function (element) {
  return element.getBoundingClientRect().bottom + window.pageYOffset - document.documentElement.clientTop;
};
var getElementTop = function (element) {
  return element.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
};
var getVisibleHeight = function(element) {
  if(element){
    return element.clientHeight;
  }else{
    return document.documentElement.clientHeight;
  }
};

var scrolls = [];

window.addEventListener('scroll',throttle(function () {
  var scrollTop = getScrollTop();
  scrolls.forEach(e => {
    if(scrollTop > e.bottom && !e.vm[e.distanceExpr]){
      e.binding.value();
    }
  })
},200));

Vue.directive('scroll', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,binding,vnode) {
    var distanceExpr = el.getAttribute('infinite-scroll-distance'),
        scrollTop = el.getAttribute('infinite-scroll-top'),
        directive = {},
        vm =  vnode.context;

    if(vm.data.nav == 0){
      let navTop = [];
      $(el).find('.grouping-list-title').each(function () {
        navTop.push($(this).offset().top)
      });
      vm.navTop = navTop;
      directive = {
        el,
        binding,
        distanceExpr,
        scrollTop,
        vm,
        navTop,
        navDom: $(el).find('.grouping-leftNav-l-box'),
        navHeight: getVisibleHeight($(el).find('.grouping-leftNav-l-box')[0]),
        bottom: getElementBottom(el) - getVisibleHeight(),
        top: getElementTop(el)
      };
    }else{
      directive = {
        el,
        binding,
        distanceExpr,
        vm,
        bottom: getElementBottom(el) - getVisibleHeight(),
        top: getElementTop(el)
      };
    }

    vm.updataBottom = function () {
      scrolls.forEach(e => {
        e.bottom = getElementBottom(e.el) - getVisibleHeight();
        e.top = getElementTop(e.el)
      })
    };

    vm.$watch(distanceExpr, function (value) {
      if(value)return;
      vm.updataBottom();
    });

    vm.updataBottom();
    scrolls.push(directive);
  }
});

Vue.directive('Roll',{
  inserted: function (el,binding,vnode) {
    var span = $(el).find('span'),
        width = span.width();
    if(span.width() > window.screen.availWidth-20){
      span.after("<span>"+span.text()+"</span>");
      setInterval(function () {
        el.scrollLeft += 1;
        if(el.scrollLeft >= width){
          el.scrollLeft = 0;
        }
      },30)
    }
  }
});

Vue.directive('SwiperDraggable', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,binding,vnode) {
    var element = $(el);
    if(element.find('.swiper-slide').length<=1)return;
    var swiper = new Swiper(element.find('.swiper-container'), {
      pagination: element.find(".swiper-pagination"),
      paginationClickable: true,
      spaceBetween: 30,
      autoplay: 4500,
      autoplayDisableOnInteraction: false,
      lazyLoading: true,
      lazyLoadingInPrevNextAmount: 2
    });
  }
});

Vue.directive('CountDown', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,name,vnode) {
    var datatime = vnode.data.attrs.datatime;

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
