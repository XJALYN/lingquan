module.exports = {
  // 初始化申请退款
  initRefundRecord(){
    let t = {
      checkoutOrderCode:this.data.checkoutOrderCode
    }
    wx.$methods.initRefundRecord(t).then(res=>{
      res.body.refundRecordItems = res.body.refundRecordItems.map(item=>{
        //item.refundQuantity = item.buyQuantity - item.refundedAlreadyQuantity
        return item
      })
      this.setData({
        data: res.body
      })
      console.log("申请退货数据",res.body)
      this.calcRefundMoney()
    })
  },

  // 保存申请退款记录
  saveRefundRecord(){
   
    let t = this.data.data
    console.log(t)
    wx.$methods.saveRefundRecord(t).then(res=>{
      wx.showToast({
        title: '申请售后成功',
        duration:2000
      })
      setTimeout(()=>{
        wx.navigateBack({
        })
      },1500)
    }) 
  }
}