module.exports = {
  certifyEnterprise(){
    this.setData({
      loading:true
    })
    wx.$methods.certifyEnterprise(this.data.params).then(res=>{
      this.setData({
        loading: false
      })
      wx.showToast({
        title: '资质已提交审核',
      })
      setTimeout(res=>{
        wx.navigateBack({})
      },1000)
    })
  },
  // 获取行业分类信息
  industriesCategories(){
    wx.$methods.industriesCategories().then(res=>{
      this.setData({
        categories:res.data
      })
      console.log(this.data.categories)
      this.certifyInfo()
    })
  }
}