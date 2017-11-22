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
  cancelButtonClass: ''
};

import Vue from 'vue';
import source from './source-material.vue';
import merge from '../../util/merge';

var sourceConstructor = Vue.extend(source);

var currentMsg,   // 传递参数的copy对象
    instance;    //  map 组件实例化
var msgQueue = []; //传递的参数

var initInstance = function() {
  instance = new sourceConstructor({
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
      if(action=='cancel'){
        currentMsg.reject('cancel');
      }else{
        currentMsg.resolve(action);
      }

    }
  }
};

var showNextMsg = function() {
  if (!instance) {
    initInstance();
  }
  if (!instance.value || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
      var options = currentMsg.options;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if(instance.selecType)instance.materialUrl = instance.imageboxUrl + "?selectType=" + instance.selecType + "&retUrl=" + window.location.href;
      else instance.materialUrl = instance.imageboxUrl + "?retUrl=" + window.location.href;
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.value = true;
      });
    }
  }
}

var Material = function(options, callback) {
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
    return new Promise(function(resolve, reject) {
      msgQueue.push({
        options: merge({}, defaults, Material.defaults || {}, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      });

      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: merge({}, defaults, Material.defaults || {}, options),
      callback: callback
    });

    showNextMsg();
  }
};

Material.setDefaults = function(defaults) {
  source.defaults = defaults;
};

Material.show = function(message, title, options) {
  if (typeof message === 'object') {
    options = message;
    message = '';
  }else if (typeof title === 'object') {
    options = title;
    title = '';
  }
  if(!options.imageboxUrl)return;
  return Material(merge({
    $type: 'material',
  }, options));
};
Material.close = function() {
  if (!instance) return;
  instance.value = false;
  msgQueue = [];
  currentMsg = null;
};

!Vue.prototype.$isServer && window.addEventListener("message", function (e) {
  if(!e.data)return;
  if(!instance)return;
  if(instance&&!instance.value)return;
  if(!window.image)window.image = function(e,i){
    instance.selecType?instance.handleAction(JSON.parse(e)):instance.handleAction([{'imagesid':e,'url':i}])
  };
  if(!window.go_back)window.go_back = function(){instance.handleAction('cancel')};
  eval(e.data)
});

export default Material;
