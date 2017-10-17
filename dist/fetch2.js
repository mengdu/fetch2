!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Fetch2=e()}(this,function(){"use strict";function t(t){var e="";for(var n in t)e&&(e+="&"),e+=n+"="+t[n];return e}function e(){}var n="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=(function(){function t(t){this.value=t}function e(e){function n(r,i){try{var u=e[r](i),f=u.value;f instanceof t?Promise.resolve(f.value).then(function(t){n("next",t)},function(t){n("throw",t)}):o(u.done?"return":"normal",u.value)}catch(t){o("throw",t)}}function o(t,e){switch(t){case"return":r.resolve({value:e,done:!0});break;case"throw":r.reject(e);break;default:r.resolve({value:e,done:!1})}(r=r.next)?n(r.key,r.arg):i=null}var r,i;this._invoke=function(t,e){return new Promise(function(o,u){var f={key:t,arg:e,resolve:o,reject:u,next:null};i?i=i.next=f:(r=i=f,n(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),"object"===("undefined"==typeof self?"undefined":o(self))&&self.self===self&&self),i="object"===(void 0===n?"undefined":o(n))&&n.global===n&&n,u=r||i,f=u.fetch||null,c=u.FormData;return e.prototype.request={interceptors:[],use:function(t){return"function"!=typeof t?(console.warn("the interceptors must be a function"),!1):(this.interceptors.push(t),!0)}},e.prototype.response={interceptors:[],use:function(t){return"function"!=typeof t?(console.warn("the interceptors must be a function"),!1):(this.interceptors.push(t),!0)}},e.prototype.fetch=function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=this;"GET"!==(n=n?n.toUpperCase():"GET")&&"HEAD"!==n||delete r.body;var u="object"===o(r.body)&&!(r.body instanceof c);(u||"string"==typeof r.body)&&(r.headers||(r.headers={}),r.headers["Content-Type"]="application/x-www-form-urlencoded"),u&&(r.body=t(r.body)),r.method=n;var s=r;return new Promise(function(t,n){function o(){function o(e){function n(){if(r>=o.length)return t(e),!0;var i=o[r];r++,i&&"function"==typeof i&&i(e,n)}var o=i.response.interceptors;if(0===o.length)return t(e),!0;var r=0;n()}f(e,s).then(function(t){switch(r.type){case"text":t.text().then(function(e){t.data=e,o(t)});break;case"blob":t.blob().then(function(e){t.data=e,o(t)});break;case"arrayBuffer":t.arrayBuffer().then(function(e){t.data=e,o(t)});break;default:t.json().then(function(e){t.data=e,o(t)}).catch(function(t){return n(t)})}}).catch(function(t){n(t)})}function u(){if(a>=c.length)return o(),!0;var t=c[a];a++,t&&"function"==typeof t&&t(s,u)}var c=i.request.interceptors;if(0===c.length)return o(),!0;var a=0;u()})},e.prototype.init=function(t,e){f=t,c=e},e.prototype.Fetch2=e,e.prototype.get=function(t,e){return this.fetch(t,"GET",e)},e.prototype.post=function(t,e){return this.fetch(t,"POST",e)},e.prototype.put=function(t,e){return this.fetch(t,"PUT",e)},e.prototype.delete=function(t,e){return this.fetch(t,"DELETE",e)},e.prototype.head=function(t,e){return this.fetch(t,"HEAD",e)},e.prototype.patch=function(t,e){return this.fetch(t,"PATCH",e)},new e});
//# sourceMappingURL=fetch2.js.map
