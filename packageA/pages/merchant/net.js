module.exports = {
  certifyInfo(){
    wx.showLoading()
    wx.$methods.certifyInfo().then(res=>{
      wx.hideLoading()
      this.setData({
        ...res.data
      })
      console.log(res)
    })
  }
}