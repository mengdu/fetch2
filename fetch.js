var fetch2 = require('./dist/fetch2')
var fetch = require('node-fetch')
var FormData = require('form-data')

fetch2.init(fetch, FormData)

module.exports = fetch2