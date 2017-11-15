/*!
 * fetch2.js v1
 * (c) 2014-2017 lanyue
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Fetch2 = factory());
}(this, (function () { 'use strict';

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

/**
* 判断一些原生对象
**/
function isOriginObject(obj) {
  return obj.constructor === Date || obj instanceof HTMLElement || typeof obj === 'function' || obj.constructor === Blob || obj.constructor === File;
}

function isArr(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

/**
* 把参数对象序列化成树对象
*
**/
function ObjTree(obj) {
  var arr = [];
  for (var key in obj) {
    // 过滤一些原生对象类型
    if (isOriginObject(obj[key])) {
      continue;
    }
    if (_typeof(obj[key]) === 'object') {
      arr.push({ label: key, child: ObjTree(obj[key]) });
    } else {
      arr.push({ label: key, val: obj[key] });
    }
  }
  return arr;
}
/**
* 从对象树种遍历所有路径，及叶子
*
**/
function ObjTreePaths(tree) {
  var arr = [];
  // 路径遍历
  function path(tree, label) {
    label = label || '';
    for (var i in tree) {
      if (tree[i].child) {
        if (label) {
          path(tree[i].child, label + '[' + tree[i].label + ']');
        } else {
          path(tree[i].child, tree[i].label);
        }
      } else {
        // 把叶子值连接到路径后面
        if (label) {
          arr.push(label + '[' + tree[i].label + ']=' + tree[i].val);
        } else {
          arr.push(tree[i].label + '=' + tree[i].val);
        }
      }
    }
  }
  path(tree);
  return arr;
}

function URLParams(obj, encode) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !isOriginObject(obj) && !isArr(obj)) {
    var paths = ObjTreePaths(ObjTree(obj));
    var qs = paths.join('&');
    return encode ? encodeURI(qs) : qs;
  }
  return '';
}

var URLParams$1 = {
  url: function url(_url, obj, encode) {
    var params = URLParams(obj, encode);
    if (_url.indexOf('?') > -1) {
      var uri = _url.split('?');
      return params ? _url.replace(/&$/, '') + (uri[1] ? '&' : '') + params : _url;
    } else {
      return params ? _url + '?' + params : _url;
    }
  },
  stringify: function stringify(obj, encode) {
    return URLParams(obj, encode);
  }
};

var _self = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.self === self && self;
var _global = (typeof global$1 === 'undefined' ? 'undefined' : _typeof(global$1)) === 'object' && global$1.global === global$1 && global$1;
var root = _self || _global;

var Fetch = root.fetch || null;
var FormData = root.FormData;

function Fetch2() {}

Fetch2.prototype.request = {
  interceptors: [],
  use: function use(fn) {
    if (typeof fn !== 'function') {
      console.warn('the interceptors must be a function');
      return false;
    }
    this.interceptors.push(fn);
    return true;
  }
};

Fetch2.prototype.response = {
  interceptors: [],
  use: function use(fn) {
    if (typeof fn !== 'function') {
      console.warn('the interceptors must be a function');
      return false;
    }
    this.interceptors.push(fn);
    return true;
  }
};

/**
* 3xx-5xx responses are NOT network errors, and should be handled in then()
**/
Fetch2.prototype.fetch = function (uri, method) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var that = this;
  method = method ? method.toUpperCase() : 'GET';
  // Request with GET/HEAD method cannot have body.
  if (method === 'GET' || method === 'HEAD') {
    delete options.body;
  }
  var isTransion = _typeof(options.body) === 'object' && !(options.body instanceof FormData);
  // 对于formData数据，并不需要指定Content-Type
  if (isTransion || typeof options.body === 'string') {
    if (!options.headers) options.headers = {};
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  if (isTransion) {
    options.body = URLParams$1.stringify(options.body);
  }
  // var opts = Object.assign({}, {method}, options)
  options.method = method;
  var opts = options;
  return new Promise(function (resolve, reject) {
    function request() {
      // 响应过滤器
      function response(res) {
        var interceptors = that.response.interceptors;
        if (interceptors.length === 0) {
          resolve(res);
          return true;
        }
        var v = 0;
        function run() {
          if (v >= interceptors.length) {
            resolve(res);
            return true;
          }
          var interceptor = interceptors[v];
          v++;
          if (interceptor && typeof interceptor === 'function') {
            interceptor(res, run);
          }
        }
        run();
      }
      var url = URLParams$1.url(uri, opts.params);
      Fetch(url, opts).then(function (res) {
        switch (options.type) {
          case 'text':
            res.text().then(function (text) {
              res.data = text;
              response(res);
            });
            break;
          case 'blob':
            res.blob().then(function (blob) {
              res.data = blob;
              response(res);
            });
            break;
          case 'arrayBuffer':
            res.arrayBuffer().then(function (buffer) {
              res.data = buffer;
              response(res);
            });
            break;
          default:
            res.json().then(function (json) {
              res.data = json;
              response(res);
            }).catch(function (err) {
              return reject(err);
            });
        }
      }).catch(function (err) {
        reject(err);
      });
    }
    var interceptors = that.request.interceptors;
    if (interceptors.length === 0) {
      request();
      return true;
    }
    var v = 0;
    function run() {
      if (v >= interceptors.length) {
        request();
        return true;
      }
      var interceptor = interceptors[v];
      v++;
      if (interceptor && typeof interceptor === 'function') {
        interceptor(opts, run);
      }
    }
    run();
  });
};

Fetch2.prototype.URLParams = URLParams$1;

// for node-fetch
Fetch2.prototype.init = function (fetch, formData) {
  Fetch = fetch;
  FormData = formData;
};

Fetch2.prototype.Fetch2 = Fetch2;

Fetch2.prototype.get = function (uri, options) {
  return this.fetch(uri, 'GET', options);
};

Fetch2.prototype.post = function (uri, options) {
  return this.fetch(uri, 'POST', options);
};

Fetch2.prototype.put = function (uri, options) {
  return this.fetch(uri, 'PUT', options);
};

Fetch2.prototype.delete = function (uri, options) {
  return this.fetch(uri, 'DELETE', options);
};

Fetch2.prototype.head = function (uri, options) {
  return this.fetch(uri, 'HEAD', options);
};

Fetch2.prototype.patch = function (uri, options) {
  return this.fetch(uri, 'PATCH', options);
};

var fetch2 = new Fetch2();

return fetch2;

})));
//# sourceMappingURL=fetch2.js.map
