
var Fetch = window.fetch
const interceptors = {
  use (type, fn) {
    this[type].push(fn)
  }, 
  request: [],
  response: []
}

function Fetch2 () {}

Fetch2.init = fetch => {
  Fetch = fetch
}
Fetch2.request = {}
Fetch2.response = {}
Fetch2.response.use = fn => interceptors.use('response', fn)
Fetch2.request.use = fn => interceptors.use('request', fn)


function ajax (uri, type, options) {
  var opts = Object.assign({}, {type}, options)
  return new Promise((resolve, reject) => {
    Fetch(uri, opts).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
  
}


export default Fetch2

