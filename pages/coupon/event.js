module.exports = {
  onSwitchFilter(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      filterIndex:index
    })
    this.getMyCouponList()
  },
  onPushToHome(e){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
}