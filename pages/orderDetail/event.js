module.exports = {
  onclickOrderCancel(){ //点击取消订单
    wx: wx.showModal({
      content: '您确定取消吗？',
      showCancel: true,
      cancelText: '否',
      cancelColor: '#333333',
      confirmText: '是',
      confirmColor: '#F61B6D',
      success: res => {
        if (res.confirm) {
          this.orderCancel();
        }
      }
    })

   
  },
  omclickSure(){ //确认订单
    wx.showModal({
      content: '您确定收到货了吗？',
      showCancel: true,
      cancelText: '否',
      cancelColor: '#333333',
      confirmText: '是',
      confirmColor: '#F61B6D',
      success: res => {
        if (res.confirm) {
          this.goodStuffOrderorderSign();
        }
      }
    })
    
  },
  onPushToAfterSaleApplay(){ //申请售后
    wx.$router.push("/pages/afterSaleApplay/afterSaleApplay", { checkoutOrderCode: this.data.checkoutOrderDetailParam.checkoutOrderCode})
  },
  gologisticsTracking(){ //去物流
  console.log("去物流")
    wx.$router.push("/pages/logisticsTracking/logisticsTracking", { checkoutOrderCode: this.data.checkoutOrderDetailParam.checkoutOrderCode })
    
  },
  onGoCommdetail(e){//点击商品去商品详情
  console.log(e)
    wx.$router.push("/pages/commodityDetail/commodityDetail", { prodCode: this.data.checkoutOrderDetailData.productItemList[e.currentTarget.dataset.index].prodCode })
  }
    

}