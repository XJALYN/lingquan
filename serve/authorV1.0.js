

var api = require("./api.js")
var SignHeader = require("./signHeader.js")
const config = require("../config/config.js")



// 显示授权弹窗
const showAuthorModal=function(){
  // 直接获取登录失效 需要弹窗
  let pages = getCurrentPages()
  if (pages.length > 0) {
    console.log("弹出授权弹窗")
    pages[0].onNeedAuthor && pages[0].onNeedAuthor()
    pages[0].setData({
      needAuthor: true
    })
  }
}

module.exports = {
  getUserInfo(){
   return new Promise((resolve,reject)=>{
     wx.getUserInfo({
       success: resolve, reject,
       fail:reject
     })
   })  
  },

  login(){
    var that = this;
    return new Promise((resolve,reject)=>{
      wx.login({
        success: e => {
          that.getUserInfo().then(res=>{
            var userInfo = res.userInfo
            if (userInfo != null) {
              let sourceUrl = ''
              let pages = getCurrentPages()
              if (pages.length > 0) {
                console.log(pages[0])
                let query = []
                for (let k in pages[0].options) {
                  query.push(`${k}=${pages[0].options[k]}`)
                }
                sourceUrl = pages[0].route + "?" + query.join("&")
              }
              var params = {
                'channel':2,
                'sourceUrl': sourceUrl,
                'code': e.code,//e.code
                'ivStr': res.iv,
                'encryptedData': res.encryptedData,
                'subChannelNo': config.subChannelNo
              }
              console.log(params)
              // 调用登录接口
              that.requestLogin(params).then(res=>{
                resolve(res)
                if (res.code == "201") {
                  wx.$db.token = res.body.accessToken
                  //  登录成功需要通知当前页面
                  let pages = getCurrentPages()
                  if (pages.length > 0 && pages[0].onFinishLogin) {
                    pages[0].onFinishLogin()
                    console.log(pages)
                  } else if (pages.length > 0){
                    wx.$router.reLaunch("/"+pages[0].route, pages[0].options)
                  }
                }
                
              }).catch(err=>{
                reject && reject(err)
              })
            }
          }).catch(err=>{
            // 直接获取登录失效 需要弹窗
            showAuthorModal()
            reject && reject(err)
          })
        }
      })
    })
  
  },

  // 请求登录
  requestLogin(params){
    return new Promise((resolve,reject)=>{
      var url = config.baseUrl + api.login
      let header = SignHeader(params)

      // 请求用户登录数据
      wx.request({
        url: url,
        data: params,
        method: 'POST',
        dataType: 'JSON',
        header: header,
        success: (res) => {
          console.log(res)
          if (res.statusCode != 200) {
            wx.$showToast(res.errMsg)
            return
          }
          var result = JSON.parse(res.data)
          if (result.code == 201) {
            resolve(result)
          } else {
            wx.$showToast(result.exception.message)
          }
        }, fail: (res) => {
          console.log(res)
          reject && reject(res)
        }
      })
    })
  },

 

  
}