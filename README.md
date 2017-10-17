## fetch2

A fetch optimization Library.

> 插件已经可以正常使用，文档正在完善中...

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

```bat
npm install -S node-fetch
npm install -S form-data

```

```js
var fetch = require('node-fetch')
var FormData = require('form-data')
var fetch2 = require('../dist/fetch2')

fetch2.init(fetch, FormData)

fetch2.get('http://localhost/api').then(res => {
  console.log(res)
})

```

## polyfill

In the low version of the browser, need the fetch, promise to compatible polyfill

**e.g.**

```html
<!-- for ie9+ -->
<script src="https://cdn.bootcss.com/fetch/2.0.3/fetch.min.js"></script>
<script src="https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.auto.min.js"></script>
<script type="text/javascript" src="../dist/fetch2.js"></script>
```

## Other

[node-fetch](https://github.com/bitinn/node-fetch)
