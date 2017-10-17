var fetch = require('node-fetch')
var FormData = require('form-data')
var fetch2 = require('../dist/fetch2')

fetch2.init(fetch, FormData)

fetch2.post('http://www.e.com/api/index.php?query=test', {
  body: {
    name: 'xxx',
    pass: '123456'
  }
}).then(res => {
  console.log(res.data)
}).catch(err => {
  console.log('请求错误', err)
})

async function test () {
  console.log('请求')
  var result = await fetch2.post('http://www.e.com/api/index.php?query=test', {
    body: {
      name: 'xxx',
      pass: '123456'
    }
  })

  console.log(result.data)
}

test()
