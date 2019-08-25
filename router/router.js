
function push(url, data){
  wx.navigateTo({
    url: url + '?' + jsonToUrlEncode(data)
  })
}
function jsonToUrlEncode(object){
  let results = []
  for(let i in object){
     results.push(`${i}=${object[i]}`)
  }
  return results.join('&')
  
}

function reLaunch(url,data){
  wx.reLaunch({
    url: url + '?' + jsonToUrlEncode(data)
  })
}
 


module.exports = {
   push,
   reLaunch
}