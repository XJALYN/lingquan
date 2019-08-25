module.exports = {

  // 申请售后
  onPushToAfterDetail(e){
    let refundrecordcode = e.currentTarget.dataset.refundrecordcode
    wx.$router.push("/pages/afterDetails/afterDetails", { refundRecordCode: refundrecordcode })
  },

  // 申请售后
  onPushToAfterSaleApply(e){
    let checkoutordercode = e.currentTarget.dataset.checkoutordercode
    wx.$router.push("/pages/afterSaleApplay/afterSaleApplay", { checkoutOrderCode: checkoutordercode })
  },
  
  // 填写退货单
  onPushToReturnedSalesNote(e){
    let refundrecordcode = e.currentTarget.dataset.refundrecordcode
    wx.$router.push("/pages/refundNode/refundNode", { refundRecordCode: refundrecordcode })
  }
}