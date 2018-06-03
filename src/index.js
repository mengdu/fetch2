import URLParams from './url-params'
import interceptor from 'js-interceptor'

var _self = (typeof self === 'object' && self.self === self) && self
var _global = (typeof global === 'object' && global.global === global) && global
var root = _self || _global

var Fetch = root.fetch || null
var FormData = root.FormData


function Fetch2 () {}

Fetch2.prototype.request = {
  interceptors: [],
  use (fn) {
    if (typeof fn !== 'function') {
      console.warn('the interceptors must be a function')
      return false
    }
    this.interceptors.push(fn)
    return true
  }
}

Fetch2.prototype.response = {
  interceptors: [],
  use (fn) {
    if (typeof fn !== 'function') {
      console.warn('the interceptors must be a function')
      return false
    }
    this.interceptors.push(fn)
    return true
  }
}

/**
* 3xx-5xx responses are NOT network errors, and should be handled in then()
**/
Fetch2.prototype.fetch = function (uri, method, options = {}) {
  var that = this
  method = method ? method.toUpperCase() : 'GET'
  // Request with GET/HEAD method cannot have body.
  if (method === 'GET' || method === 'HEAD') {
    delete options.body
  }
  var isTransion = (typeof options.body === 'object') && !(options.body instanceof FormData)
  // 对于formData数据，并不需要指定Content-Type
  if (isTransion || typeof options.body === 'string') {
    if (!options.headers) options.headers = {}
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  if (isTransion) {
    options.body = URLParams.stringify(options.body)
  }
  // var opts = Object.assign({}, {method}, options)
  options.method = method
  var opts = options
  return new Promise((resolve, reject) => {

    function response (ctx) {
      let responseHandler = interceptor(that.response.interceptors)
      responseHandler(ctx, function (res) {
        resolve(res)
      })
    }

    interceptor(that.request.interceptors)(opts, function (ctx) {
      var url = URLParams.url(uri, opts.params, true)
      Fetch(url, opts).then(res => {
        switch (options.type) {
          case 'text':
            res.text().then(text => {
              res.data = text
              response(res)
            })
            break
          case 'blob':
            res.blob().then(blob => {
              res.data = blob
              response(res)
            })
            break
          case 'arrayBuffer':
            res.arrayBuffer().then(buffer => {
              res.data = buffer
              response(res)
            })
            break
          default:
            res.json().then(json => {
              res.data = json
              response(res)
            }).catch(err => reject(err))
        }
      }).catch(err => {
        reject(err)
      })
    })
  })

}

Fetch2.prototype.URLParams = URLParams

// for node-fetch
Fetch2.prototype.init = function (fetch, formData) {
  Fetch = fetch
  FormData = formData
}

Fetch2.prototype.Fetch2 = Fetch2

Fetch2.prototype.get = function (uri, options) {
  return this.fetch(uri, 'GET', options)
}

Fetch2.prototype.post = function (uri, options) {
  return this.fetch(uri, 'POST', options)
}

Fetch2.prototype.put = function (uri, options) {
  return this.fetch(uri, 'PUT', options)
}

Fetch2.prototype.delete = function (uri, options) {
  return this.fetch(uri, 'DELETE', options)
}

Fetch2.prototype.head = function (uri, options) {
  return this.fetch(uri, 'HEAD', options)
}

Fetch2.prototype.patch = function (uri, options) {
  return this.fetch(uri, 'PATCH', options)
}

var fetch2 = new Fetch2()

export default fetch2
