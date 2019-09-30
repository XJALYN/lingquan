module.exports = {
  newCreate(){
   wx.$showLoading()
    wx.$methods.newCreate(this.data.params).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '提交成功,等待审核',
      })
      setTimeout(res=>{
        wx.navigateBack({
        })
      },1000)
    })
  },
  certifyInfo(){
    wx.$methods.certifyInfo().then(res=>{
      
      this.setData({
        certify:res.data
      })
      console.log(res)
    })
  },
  newsCategories(){
    wx.$methods.newsCategories().then(res=>{
      console.log(res)
      this.setData({
        categories:res.data
      })
    })
  },
  currentLocation(){
    wx.$methods.currentLocation().then(res=>{
      let address = {
        "latitude": res.data.latitude,
        "longitude": res.data.longitude,
        "address": res.data.province + res.data.city + res.data.district,
        "address_detail": res.data.address
      }
      this.setData({
         'params.address':address
      })
      console.log(res)
    })
  }
}