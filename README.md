## fetch2

A fetch optimization Library

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

> coding...
