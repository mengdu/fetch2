
function isArr (val) {
  return Object.prototype.toString.call(val) === '[object Array]'
}

/**
* 把参数对象序列化成树对象
*
**/
function ObjTree (obj) {
  var arr = []
  for (var key in obj) {
    if (typeof obj[key] === 'object') {
      arr.push({label: key, child: ObjTree(obj[key])})
    } else {
      arr.push({label: key, val: obj[key]})
    }
  }
  return arr
}
/**
* 从对象树种遍历所有路径，及叶子
*
**/
function ObjTreePaths (tree) {
  var arr = []
  // 路径遍历
  function path (tree, label) {
    label = label || ''
    for (var i in tree) {
      if (tree[i].child) {
        if (label) {
          path(tree[i].child, label + '[' + tree[i].label + ']')
        } else {
          path(tree[i].child, tree[i].label)
        }
      } else {
        // 把叶子值连接到路径后面
        if (label) {
          arr.push(label + '[' + tree[i].label + ']=' + tree[i].val)
        } else {
          arr.push(tree[i].label + '=' + tree[i].val)
        }
      }
    }
  }
  path(tree)
  return arr
}

function URLParams (obj, encode) {
  if (typeof obj === 'object' && !isArr(obj)) {
    var paths = ObjTreePaths(ObjTree(obj))
    var qs = paths.join('&')
    return encode ? encodeURI(qs) : qs
  }
  return ''
}

export default {
  url: (url, obj, encode) => {
    var params = URLParams(obj, encode)
    if (url.indexOf('?') > -1) {
      var uri = url.split('?')
      return params ? (url.replace(/&$/, '') + (uri[1] ? '&' : '') + params) : url
    } else {
      return params ? url + '?' + params : url
    }
  },
  stringify: (obj, encode) => {
    return URLParams(obj, encode)
  }
}
