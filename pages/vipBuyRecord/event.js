module.exports = {
  getMemberCardBuyOrders(){
    this.data.pageNum = 1
    let t = {
      pageSize:this.data.pageSize,
      pageNum:this.data.pageNum
    }
    this.setData({
      noMore:false
    })
    wx.$showLoading()
    wx.$methods.getMemberCardBuyOrders(t).then(res=>{
      wx.hideLoading()
      this.setData({
        list:res.body
      })
      if(res.body.length < this.data.pageSize){
        this.setData({
          noMore:true
        })
      }
    })
  }
}