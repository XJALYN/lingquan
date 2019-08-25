module.exports = {
  addressAdd(){
    this.setData({
      loading:true
    })
    wx.$methods.addressAdd(this.data.params).then(res=>{
      this.setData({
        loading: false
      })
      wx.showToast({
        title: '添加地址成功',
      })
      setTimeout(res=>{
        wx.navigateBack({})
      },1000)
    })
  }
}