module.exports = {
  myPublishedList(){
    wx.$showLoading()
    wx.$methods.myPublishedList().then(res=>{
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log(res)
      this.setData({
        newsList: res.data
      })
    })
  }
}