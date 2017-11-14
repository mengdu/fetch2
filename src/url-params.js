
function isOriginObject (obj) {
  return obj.constructor === Date ||
  obj instanceof HTMLElement ||
  typeof obj === 'function' ||
  obj.constructor === Blob ||
  obj.constructor === File
}
/**
* 把参数对象序列化成树对象
*
**/
function ObjTree (obj) {
  var arr = []
  for (var key in obj) {
    // 过滤一些原生对象类型
    if (isOriginObject(obj[key])) {
      continue
    }
    if (typeof obj[key] === 'object') {
      arr.push({label: key, child: ObjTree(obj[key])})
    } else {
      arr.push({label: key, val: obj[key]})
    }
  }
  return arr
}
/**
* 从对象树种遍历所有路径，及叶子构造成url参数
*
**/
function URLParams (tree, encode) {
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
  // 连接所有路径
  var qs = arr.join('&')
  return encode ? encodeURI(qs) : qs
}


module.exports = {
  url: (url, obj) => {
    var params = URLParams(ObjTree(obj))
    // return url.
  },
  stringify: obj => URLParams(ObjTree(obj))
}
