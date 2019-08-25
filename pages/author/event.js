module.exports = {
  bindgetuserinfo(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.showLoading({
        title: '授权中...',
        duration: 5000
      })
      wx.login({
        success: e => {
          wx.getUserInfo({
            success: res => {
              let t = {
                code: e.code,
                ivStr: res.iv,
                channel: 2,
                encryptedData: res.encryptedData
              }
              wx.$methods.authorLogin(t).then(res => {
                console.log(res)
                
                wx.hideLoading()
                wx.$db.userType = res.body.userType
                wx.$db.token = res.body.accessToken
                wx.$db.unionId = res.body.unionId
                console.log("修改用户信息", res)
                wx.setStorageSync("home:newUserWelfare", true)
                wx.navigateBack({
                })
              })
            }
          })
        }
      })
    } else {
      let model = wx.getSystemInfoSync().model
      if (model == "MI 8") {
        this.setData({
          openSetting: true
        })
      }
    }
  }
}