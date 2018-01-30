import technicalSupport from './technical-support/index.js';
import defaultImg from './defaultImg/index.js';
import contentNo from './contentNo/index.js';
import wxShare from './wxShare/index.js';
//import headerNav from './headerNav/index.js';
const components = [
  technicalSupport,
  defaultImg,
  contentNo,
  wxShare,
  //headerNav
];

const install = function(Vue, opts = {}) {

  components.map(component => {
    Vue.component(component.name, component);
  });

  // Vue.prototype.$map = map.show;
  // Vue.prototype.$material = material.show;

};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const version = '1.0.0';
// export {
//   picker,
//   comment,
//   map,
//   material
// }
export default {
  version,
  install 
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
