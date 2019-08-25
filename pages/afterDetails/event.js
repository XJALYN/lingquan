module.exports = {
  onPushToOrderDetail(){
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?checkoutOrderCode=' + this.data.getRefundRecordData.checkoutOrderCode,
    })
  }
}