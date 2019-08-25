module.exports = {
  // 筛选订单类型
  onChangeFilter(e){
    console.log(e)
   let index = e.currentTarget.dataset.index
   let type = this.data.filters[index].value
   this.setData({
     filterIndex:index
    })
    this.orderList()
  },
  // 确认签收
  onConfireSign(e){
    wx.showModal({
      title: '您确定收到货了吗？',
      content: '',
      confirmColor:"#F61B6D",
      success:res=>{
        if(res.confirm){
          let checkordercode = e.currentTarget.dataset.checkordercode
          this.orderSign(checkordercode)
        }
      }
    })
    
  },
  // 跳转好物列表
  onPushGoodsList(e){
    console.log(wx.$router.push)
    wx.switchTab({
      url: '/pages/goodsList/goodsList',
    })
  },
  // 去支付
  onPay(e) {
    let checkordercode = e.currentTarget.dataset.checkordercode
    this.orderSubmit(checkordercode)
  },
  // 结算订单详情
  onPushToOrderDetail(e){
    let checkoutordercode = e.currentTarget.dataset.checkoutordercode
    console.log("checkordercode", e)
    wx.$router.push("/pages/orderDetail/orderDetail", { checkoutOrderCode: checkoutordercode})
  }
}