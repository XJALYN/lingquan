
const author = require("./author.js")
const SignHeader = require("./signHeader.js")
const config = require("../config/config.js")
let Raven = require("../common/raven/raven.js")


// 隐藏授权弹窗
const hideAuthorModal = function () {
  let pages = getCurrentPages()
  if (pages.length > 0) {
    console.log("弹出授权弹窗")
    pages[0].onNeedAuthor && pages[0].onNeedAuthor()
    pages[0].setData({
      needAuthor: false
    })
  }
}

// 1.检查网络状态
const checkNetStatus= function(res){
  if (res.statusCode == 200) {
    return true
  } else {
    return false
  }
}

// 2.处理登录异常
//  1009 没有授权渠道
//  3005 没有找到该用户
//  1005 token 失效
//  1006 token 失效
const handleLoginError=function(res){
  if (res.code == 205 && (res.exception.errorCode == 1006 || res.exception.errorCode == 1005 || res.exception.errorCode == 3005 || res.exception.errorCode == 1009 || res.exception.errorCode == 1000)) {
  console.log("-------ddddddd");
    return true
  } else {
    return false
  }
}

// 请求数据
const request = function(method, url, params = {}){
  return new Promise((resolve, reject) => {
    var token = wx.$db.token
    if(token == "" || token == null){
      wx.hideLoading()
      author.login()
      return
    }
    var data = params
    if (data == null) {
      data = {}
    }
    data.subChannelNo = config.subChannelNo
    let header = SignHeader(params, token)
    header.accessToken = token
    wx.request({
      url: config.baseUrl+url,
      header: header,
      method: method,
      data: data,
      dataType: "json",
      success: (data) => {
        if (checkNetStatus(data)) {
          let res = data.data
          if (!handleLoginError(res)) {
            if (res.code == 201) {
              // 隐藏弹窗
              // hideAuthorModal()
              resolve(res)
            } else {
              let msg = res.exception.message
              if (res.exception.message.indexOf("@@@") > -1){
                msg = res.exception.message.split('@@@')[1]
              }
              if(params.pass){
                reject && reject(data)
              }else{
                wx.$showToast(msg)
                reject && reject(data)
              }
            }
          }else{
            console.log("发起登录")
           
            wx.$db.token = ''
            author.login()
            wx.hideLoading()
            //reject && reject(data)
          }
        }else{
          console.log("--------",data)
          if (data.statusCode==500){
            Raven.captureBreadcrumb({
              category: 'ajax',
              data: {
                method: 'post',
                url: config.baseUrl + url,
                status_code: 500
              }
            })
          }
          wx.$showToast("~系统正在维护中,请稍后~")
        }
      },
      fail: function (err) {
        console.log("dddd",err)
        
        wx.$showToast("请检查手机网络")
      }
    })
  })
}

// 4.拼接路径
const generateMatchApi = function(api, querys) {
  // 第一步查找路径中的参数名
  var matchs = api.match(/\{[^\}]+\}/g);
  if (matchs == null) {
    return api
  }
  var params = matchs.map(res => {
    return res.replace(/\{/g, '').replace(/\}/g, '')
  })

  var result = api
  // 替换掉路径中参数名
  for (var i in matchs) {
    var key = params[i]
    if (querys == null) {
      console.log("querys为空")
      return api
    }
    var value = querys[key]
    if (value == null) {
      console.log("api:" + api + "参数:" + key + "缺失")
    }
    result = result.replace(new RegExp(matchs[i], "g"), value)
  }
  return result
}


module.exports = {


  // 检查网路状态
  // get 请求
  get(api,params,querys){
    var path = generateMatchApi(api,querys)
    return request("GET",path,params)
  },


  // post 请求
  post(api, params, querys){
    var path = generateMatchApi(api, querys)
    return request("POST", path, params)
  },
  // PUT 请求
  put(api, params, querys){
    var path = generateMatchApi(api, querys)
    return request("PUT", path, params)
  },

  // 删除操作
  delete(api, params, querys){
    var path = generateMatchApi(api, querys)
    return request("DELETE", path, params)
  },

  // 上传文件
  upload(url,filePath,params={}){
    var token = wx.$db.token
    let header = SignHeader({}, token)
    header['Content-type'] = 'multipart/form-data'

    if(filePath==null||filePath==''){
       wx.showToast({
         title: 'filePath is Null',
         icon:"none",
         duration:1500
       })
       return
    }
    if(url==null||url==''){
      wx.showToast({
        title: 'url is Null or empty',
        icon: "none",
        duration: 1500
      })
      return
    }

    return new Promise(function (resolve, reject){
      wx.uploadFile({
        url: url, 
        filePath: filePath,
        name: 'file',
        header: header,
        formData: params,
        success: function (data) {
          console.log(data)
          if (checkNetStatus(data)) {
            let res = JSON.parse(data.data) 
            if (!handleLoginError(res)) {
              if (res.code == 0) {
                console.log("----")
               
                resolve(res)
              } else {
                wx.$showToast(res.exception.message)
                reject(data)
              }
            }else{
              reject(data)
            }
          }else{
            reject(data)
          }
       
        },fail:function(err){
           reject(err)
        }
      })
    })
  }
}