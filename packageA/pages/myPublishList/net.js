module.exports = {

  // 我的发布
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
  },
  
  // 获取分类
  newsCategories() {
    wx.$methods.newsCategories().then(res => {
      console.log(res)
      this.setData({
        categories: res.data
      })
    })
  }
}