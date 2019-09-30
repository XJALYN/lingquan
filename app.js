//app.js
let router = require('./router/router.js')
let methods = require('./serve/methods.js')
let db = require('./utils/db.js')
let showToast = require('./utils/showToast.js')
let author = require('./serve/author.js')
let updateManage = require("./utils/updateManager.js")
let Raven = require("./common/raven/raven.js")
let config = require("./config/config.js")
let md5 = require("./utils/md5.js")
let shake = require("./utils/util.js").shake
let toFormatTimeText = require("./utils/util.js").toFormatTimeText


wx.$router = router
wx.$methods = methods
wx.$showToast = showToast
wx.$md5 = md5
wx.$shake = shake
wx.$toFormatTimeText = toFormatTimeText

//
wx.$showLoading = function (title ='加载中…'){
  wx.showLoading({
    title: title,
    duration:5000,
    mask:true
  })
}
wx.$hideLoading = wx.hideLoading
wx.$db = db

wx.$updateShoppingCartNum = function(){
  wx.$methods.shopCarCountByUserId({}).then(res => {
    console.log("查询购物车数据", res.body.prodCount)
    if (res.body.prodCount > 0) {
      if (res.body.prodCount > 99){
        wx.setTabBarBadge({
          index: 3,
          text: "99"
        })
      }else{
        wx.setTabBarBadge({
          index: 3,
          text: "" + res.body.prodCount
        })
      }
    }else{
      wx.hideTabBarRedDot({
        index: 3,
      })
    }
  })
}
wx.$showNetError = (msg)=>{
  let result = msg
  if (msg.indexOf("@@@") > -1) {
    result = msg.split('@@@')[1]
  }
  wx.showToast({
    title: msg,
    icon: "none"
  })
}

App({
  onLaunch: function (options) {
    if(options.scene == 1089){
      wx.setStorageSync("showGuideAddProgram", false)
    }else{
      wx.setStorageSync("showGuideAddProgram", true)
    }
    // 小程序自动更新
    updateManage.checkUpdate()
    let ravenOptions = {
      release: config.version,
      environment: config.environment,
      allowDuplicates: true, // 允许相同错误重复上报
      sampleRate: 0.5 // 采样率
    }
  
    Raven.config(config.sentryUrl, ravenOptions).install()
  },
  onShow(){
    wx.$db.isAuthorizing = false
  },
  globalData: {
    userInfo:''
  },
  onError(err){
    // Raven.captureException(err, {
    //   level: 'error'
    // })
  }
});
