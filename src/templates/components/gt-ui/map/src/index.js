var CONFIRM_TEXT = '确定';
var CANCEL_TEXT = '取消';

var defaults = {
  title: '提示',
  message: '',
  type: '',
  showInput: false,
  showClose: true,
  modalFade: false,
  lockScroll: false,
  closeOnClickModal: true,
  inputValue: null,
  inputPlaceholder: '',
  inputPattern: null,
  inputValidator: null,
  inputErrorMessage: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
  confirmButtonClass: '',
  cancelButtonClass: '',
  lat:0,
  lng:0,
  http: 'http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=GQKBZ-BKZW6-ZCVSQ-MD5GX-MYNBQ-LSBPK&referer=myapp',
};

import Vue from 'vue';
import map from './map.vue';

var merge = function(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i];
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};

var MapConstructor = Vue.extend(map);

var currentMsg,   // 传递参数的copy对象
    instance;    //  map 组件实例化
var msgQueue = []; //传递的参数

var initInstance = function() {
  instance = new MapConstructor({
    el: document.createElement('div')
  });
  instance.callback = defaultCallback;
};

const defaultCallback = action => {
  if (currentMsg) {
    var callback = currentMsg.callback;
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action);
      } else{
        callback(action);
      }
    }
    if (currentMsg.resolve) {
      currentMsg.resolve(action);
    }
  }
};

var showNextMsg = function() {
  if (!instance) {
    initInstance();
  }
  if(instance.location)instance.location='';
  if (!instance.value) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
      var options = currentMsg.options;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if(instance.lat && instance.lng){
        instance.http += '&coord='+instance.lat+','+instance.lng
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
    }
  }else{
    instance.value = false;
  }
  this.$el.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.value = true;
  });
};

var MapBox = function(options, callback) {
  var self = this;
  if (typeof options === 'string') {
    options = {
      title: options
    };
    if (arguments[1]) {
      options.message = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  if (typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) { // eslint-disable-line
      msgQueue.push({
        options: merge({}, defaults, MapBox.defaults || {}, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      });
      showNextMsg.call(self);
    });
  } else {
    msgQueue.push({
      options: merge({}, defaults, MapBox.defaults || {}, options),
      callback: callback
    });
    showNextMsg.call(self);
  }

};

MapBox.setDefaults = function(defaults) {
  MapBox.defaults = defaults;
};

MapBox.show = function(message, title, options) {
  if (typeof message === 'object') {
    options = message;
    message = '';
  }else if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return MapBox.call(this,merge({
    title: title,
    message: message,
    $type: 'map',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options));
};

!Vue.prototype.$isServer && window.addEventListener('message', function(event) {
  // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
  if(!instance)return;
  var loc = event.data;
  if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
    instance.handleAction(loc)
  }
}, false);

export default MapBox;
