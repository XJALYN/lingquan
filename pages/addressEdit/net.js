module.exports = {
  addressModify(){
    this.setData({
      loading:true
    })
    wx.$methods.addressModify(this.data.params).then(res=>{
      this.setData({
        loading: false
      })
      wx.showToast({
        title: '修改地址成功',
      })
      setTimeout(res=>{
        wx.navigateBack({})
      },1000)
    })
  }
}