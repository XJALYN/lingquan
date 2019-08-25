module.exports = {
  //获取订单详情
  checkoutOrderDetail() {
    wx.$showLoading()
    wx.$methods.checkoutOrderDetail(this.data.checkoutOrderDetailParam).then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log("获取订单详情", res.body)
      this.setData({
        checkoutOrderDetailData: res.body,
        orderDetailType:false
      })
      this.data.orderCancelParam.orderCode = res.body.checkoutOrderCode //取消订单
      this.data.orderSubmitParam.orderCode = res.body.checkoutOrderCode //支付
      this.data.goodStuffOrderorderSignParam.orderCode = res.body.checkoutOrderCode //确认订单
      
    })
  },
  orderCancel(){ //取消订单接口
    wx.$methods.orderCancel(this.data.orderCancelParam).then(res => {
      console.log("取消订单数据", res.body)
      this.setData({
        orderCancelData: res.body,
      })
      // 如果来自小程序直接返回到之前的小程序
      this.checkoutOrderDetail()
      
    })
  },
  //立即支付
  orderSubmit() {
    wx.$methods.orderSubmit(this.data.orderSubmitParam).then(res => {
      console.log("提交订单", res.body)
      this.setData({
        orderSubmitData: res.body,
      })

      wx.requestPayment({
        timeStamp: res.body.timeStamp,
        nonceStr: res.body.nonceStr,
        package: res.body.packageValue,
        signType: 'MD5',
        paySign: res.body.paySign,
        success:(res)=>{
          // wx.redirectTo({
          //   url: '/pages/orderList/orderList',
          // })
          this.checkoutOrderDetail()
        },
        fail(res) {
          
        }
      })

    })
  },
  goodStuffOrderorderSign() { //确认订单接口
    wx.$methods.goodStuffOrderorderSign(this.data.goodStuffOrderorderSignParam).then(res => {
      console.log("确认订单数据", res.body)
      this.setData({
        goodStuffOrderorderSignData: res.body,
      })
      // wx.navigateBack({})
      this.checkoutOrderDetail()
    })
  },

}