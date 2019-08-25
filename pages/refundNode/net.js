module.exports= {
  // 获取物流公司
  getVshopList(){
    wx.$methods.getVshopList().then(res=>{
      this.setData({
        list:res.body
      })
    })
  },
  saveLogisticsInfo(t){
    wx.$showLoading()
    wx.$methods.saveLogisticsInfo(t).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
      })
      setTimeout(()=>{
        wx.navigateBack({
        })
      },2000)
    })
  }
}