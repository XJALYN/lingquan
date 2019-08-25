module.exports = {
  orderList(){
    
    let orderState = this.data.filters[this.data.filterIndex].value
    this.data.pageNum = 1
    this.setData({
      noMore:false
    })
    let t = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum,
      orderState: orderState,
      channelId:"2"
    }
    wx.$showLoading()
    wx.$methods.orderList(t).then(res=>{
      wx.$hideLoading()
      let list = res.body
      if(list.length<this.data.pageSize){
         this.setData({
           noMore:true
         })
      }
      this.setData({
        list: res.body
      })
      this.data.pageNum++
    })
  },
  getMoreOrderList() {
    let orderState = this.data.filters[this.data.filterIndex].value
    let t = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum,
      orderState: orderState,
      channelId: "2"
    }
  
    wx.$methods.orderList(t).then(res => {
      let list = res.body
      if(list.length < this.data.pageSize){
        this.setData({
          noMore:true
        })
      }
      list = this.data.list.concat(list)
      this.data.pageNum++
      this.setData({
        list
      })
    })
  },
  orderSign(orderCode){
    let t = {
       orderCode: orderCode
    }
    wx.$methods.goodStuffOrderorderSign(t).then(res=>{
      wx.showToast({
        title: '收货成功',
      })
      this.orderList()
    })
  },
  orderSubmit(orderCode){
    let t = {
      orderCode: orderCode
    }
    wx.$methods.orderSubmit(t).then(res => {
      
      wx.requestPayment({
        timeStamp: res.body.timeStamp,
        nonceStr: res.body.nonceStr,
        package: res.body.packageValue,
        signType: res.body.signType,
        paySign: res.body.paySign,
        success:res=>{
          wx.showToast({
            title: '支付成功',
          })
          this.orderList()
        },
        fail:err=>{
          wx.$showToast("支付已取消")
        }
      })
      
    })
  }
}