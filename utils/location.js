// var QQMapWX = require('../plugs/qqmap-wx-jssdk/qqmap-wx-jssdk.js');
// var qqmapsdk = new QQMapWX({
//   key: 'OLRBZ-ZTBHJ-24TF4-KTVYL-BSGMS-CQFZC'
// });
let key = '5fbf30eb292886114016454cd028c7eb'

module.exports = {
    /**
     * 将坐标转换为地理描述信息
     * 
     * @param {Object} options 参数和返回值包含在一起
     */
  // reverseGeocoder(options){
  //   qqmapsdk.reverseGeocoder(options)
  // },
  addressToGeoCode(t){
    t.output = 'JSON'
    t.key = key
    return new Promise((resolve,reject) =>{
      wx.request({
        url: 'http://restapi.amap.com/v3/geocode/geo',
        data: t,
        success:res=>{
          if(res.statusCode==200){
            let geocodes = res.data.geocodes
            if (geocodes && geocodes.length > 0){
              let list = geocodes[0].location.split(',')
              let t = {
                "latitude": list[1],
                "longitude": list[0],
              }
              resolve(t)
            }else{
              resolve(res)
            }
          }else{
            reject(res)
          }
          },
        fail: err => {
          console.log(err)
          reject(err)
        }
      })
    })
   
  },
  geoCodeToAddress(t){
    t.output = 'JSON'
    t.key = key
    t.radius = 1000 
    t.extensions="all"
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://restapi.amap.com/v3/geocode/regeo',
        data: t,
        success: res => {
          if (res.statusCode == 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: err=>{
          console.log(err)
          reject(err)
        }
      })
    })
  }

}