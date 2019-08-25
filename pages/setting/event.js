module.exports = {
  onPushToAddress(){
    wx.navigateTo({
      url: '/pages/addressList/addressList',
    })
  },
  onPushToAbountKmh(){
    wx.navigateTo({
      url: "/pages/aboutKmh/aboutKmh",
    })
  }

  
}