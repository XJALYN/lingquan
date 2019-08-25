module.exports = {
  // 获取
  getLuckyBugRecevingRecord(){
    wx.$methods.getLuckyBugRecevingRecord().then(res=>{
      this.setData({
        hasRecord: res.body.hasRecord
      })
      if (res.body.hasRecord){
        this.setData({
          addressInfo:res.body
        })
        
      }
      console.log("this.data.addressInfo",this.data.addressInfo)
      console.log(res)
    })
  },
  insertLuckyBugReceivingRecord(){
    this.setData({
      loading:true
    })
    wx.$showLoading()
    wx.$methods.insertLuckyBugReceivingRecord(this.data.params).then(res=>{
      wx.hideLoading()
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