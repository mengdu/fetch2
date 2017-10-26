## fetch2

一个更加简洁的fetch库。

+ 支持 GET，POST，PUT，DELETE，HEAD，PATCH。
+ 支持文件上传。
+ 支持请求/响应拦截器。
+ 支持async/await，promise。


## use


```bat
npm install -S nb-fetch

```

```js
var fetch2 = require('nb-fetch')
```

> 因为 `fetch2` 包名被占用了，所以取名为 `nb-fetch` ，`node-browser-fetch` 简写。

如果你是node端使用，还需另外安装 `node-fetch`，`form-data` 两个依赖。

``` js
var fetch = require('node-fetch')
var FormData = require('form-data')
var fetch2 = require('../dist/fetch2')

// 初始化指定fetch，与FormData
fetch2.init(fetch, FormData)

// do...

```

或者

```js
const fetch = require('nb-fetch/fetch')
```


## api

+ Fetch2.prototype.init(fetch, FormData) 初始化，node环境必须。

+ Fetch2.prototype.get(url, options) GET 请求，返回Promise对象。
+ Fetch2.prototype.post(url, options) POST 请求，返回Promise对象。
+ Fetch2.prototype.put(url, options) PUT 请求，返回Promise对象。
+ Fetch2.prototype.delete(url, options) DELETE 请求，返回Promise对象。
+ Fetch2.prototype.head(url, options) HEAD 请求，返回Promise对象。
+ Fetch2.prototype.patch(url, options) PATCH 请求，返回Promise对象。

+ Fetch2.prototype.request 请求拦截器。
+ Fetch2.prototype.response 响应拦截器。
+ Fetch2.prototype.fetch(uri, method, options) fetch。
+ Fetch2.prototype.Fetch2 返回Fetch2对象，可用于创建全新的fetch2对象。


## 例子


```js
// GET
fetch2.get(url).then(res => {
  console.log(res.data)
})

// POST
fetch2.post(url, {
  body: {
    name: 'admin',
    pass: '123456'
  }
}).then(res => {
  console.log(res.data)
})
```

## node

node环境不存在 `fetch`，`FormData` 对象，所以需要安装 `node-fetch`，`form-data` 两个依赖。


```bat
npm install -S node-fetch
npm install -S form-data

```

```js
var fetch = require('node-fetch')
var FormData = require('form-data')
var fetch2 = require('../dist/fetch2')
// 初始化指定fetch，与FormData
fetch2.init(fetch, FormData)

fetch2.get('http://localhost/api').then(res => {
  console.log(res)
})

```

## async/await

fetch2 http请求的内部封装返回的都是Promise，所以支持async/await模式。

```js
var res = await fetch2.get(url)

```

## 拦截器

**请求拦截**

```js
fetch2.request.use(fn)
```

```js
fetch2.request.use((req, next) => {
  // do

  next()
})

```

**响应拦截**

```js
fetch2.response.use(fn)
```

```js
fetch2.response.use((req, next) => {
  // do

  next()
})

```

fetch2默认导出的是一个已经new过的Fetch2对象，所以，如果需要重新创建全新的fetch2可以这样

```js
var fetch21 = new Fetch2()

```

注：每个fetch2对象的拦截器都是互不干扰的

## polyfill

如果你使用的是现代浏览器，只要引入脚本即可无需做兼容

```html
<script type="text/javascript" src="../dist/fetch2.js"></script>
```

在低版本浏览器，需要 `fetch`，`promise` 垫片。

**例如：** ie9+浏览器兼容

```html
<!-- for ie9+ -->
<script src="https://cdn.bootcss.com/fetch/2.0.3/fetch.min.js"></script>
<script src="https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.auto.min.js"></script>
<script type="text/javascript" src="../dist/fetch2.js"></script>
```

在 `window` 挂载的对象为 `fetch2`

## Other

[node-fetch](https://github.com/bitinn/node-fetch)
[form-data](https://github.com/form-data/form-data)
