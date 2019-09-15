const random = require("../utils/util.js").random
const MD5 = require("../utils/md5.js")
const app_key = "tbam89dtwt7j5w1co0j6wmyp8kaqi1gk"
const app_secret = "4dwrq155wls0y87xolpessy1lv5agbmx9b6sbqgyext8b84np0evp789682e5q77"

/**
 * desc  序列化编码
 * 规则: 1.key按照降序排列   
 *      2.拼接key和value key1value1key2value2
 *      3.全部转换为小写
 */ 
const serializeParams = (t = {}) => {
  if (typeof t == "string") {
    return t
  }
  if(typeof t != 'object'){
   return t
  }

  const keys = Object.keys(t)
  
  const sortKeys = keys.sort(($1, $2) => { 
    return $1.localeCompare($2)
    })
  let result = ''
  sortKeys.map(key => {
    let value = t[key]
    if (value instanceof Array) {
      value = value.join(',')
    }
    if (typeof value == 'undefined') {
  
    } else if(isEmptyObject(value)) {
      value = ""
    } else if (Array.isArray(value)) {
        var tmp = ''
        value.forEach(function (v, key, arr) {
          tmp += serializeParams(v)
          if (key < value.length - 1) {
            tmp += ','
          }
        })
        value = tmp
      }else{
       value = serializeParams(value)
      }
    

    
    result += `${key}${value}`
   
  })
  return result.toLocaleLowerCase()
}

function isEmptyObject(obj) {
  if (JSON.stringify(obj) === '{}') {
    return true // 如果为空,返回false
  }
  return false // 如果不为空，则会执行到这一步，返回true
}

/**
 * 生成签名 
 */
const generateSign = (params, timestamp, nonce) => {
  const paramsSerializeString = serializeParams(params)
  console.log(paramsSerializeString)
  return MD5(app_key + app_secret + timestamp + nonce + paramsSerializeString)
}

/**
 * desc 创建签名头
 * */ 
const createHeader = (params, token = '') => {
  const timestamp = parseInt((new Date()).valueOf() / 1000)
  const nonce = random(32)
  const sign = generateSign(params, timestamp, nonce)
  const header = {
    client_type: "1",
    signature: sign,
    timestamp: timestamp,//10位
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
    app_id: app_key,
    nonce: nonce
  }
  return header
}

module.exports = createHeader