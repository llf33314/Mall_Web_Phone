import picker from './picker-custom/index.js';
import comment from './comment-grade/index.js';
import map from './map/src/index';
import material from './source-material/index.js'
const components = [
  picker,
  comment,
];

const install = function(Vue, opts = {}) {

  components.map(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$map = map.show;
  Vue.prototype.$material = material.show;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const version = '1.0.0';
export {
  picker,
  comment,
  map,
  material
}
export default {
  version,
  install,
}

// module.exports = {
//   version: '1.0.0',
//   install,
//   picker,
//   comment,
//   map,
//   material
// };
//
// module.exports.default = module.exports;
