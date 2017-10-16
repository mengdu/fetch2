/*!
 * fetch2.js v1
 * (c) 2014-2017 lanyue
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Fetch2 = factory());
}(this, (function () { 'use strict';

var interceptors = {
  use: function use(type, fn) {
    this[type].push(fn);
  },

  request: [],
  response: []
};

function Fetch2() {}

Fetch2.init = function (fetch) {
  
};
Fetch2.request = {};
Fetch2.response = {};
Fetch2.response.use = function (fn) {
  return interceptors.use('response', fn);
};
Fetch2.request.use = function (fn) {
  return interceptors.use('request', fn);
};
Fetch2.method = function (type) {};

return Fetch2;

})));
//# sourceMappingURL=fetch2.js.map
