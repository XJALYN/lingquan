const pattern = require("../../utils/pattern.js")
module.exports = {
  onSelectedLogistics(e){
    this.setData({
      index:e.detail.value
    })
  },
  // 输入物流单号
  onInputLogisticsNum(e){
    this.data.deliveryOrderCode = e.detail.value
  },
  // 输入金额
  onInputMoney(e){
    this.data.logisticsPrices = e.detail.value
  },
  onSubmit(e){
    if(this.data.index==-1){
     wx.$showToast("请选择物流公司")
     return
    }
    if (this.data.deliveryOrderCode == "") {
      wx.$showToast("请输入物流单号")
      return
    }
    console.log(pattern.testExpress)
    if (!pattern.testExpress(this.data.deliveryOrderCode)){
      wx.$showToast("请输入物流单号格式不正确")
      return
    }
   
    if (this.data.logisticsPrices == ''){
      wx.$showToast("请输入物流费用")
      return 
    }
    if (!pattern.testMoney(this.data.logisticsPrices)){
      wx.$showToast("请输入物流费用格式不正确")
      return 
    }
    let t = {
      expressCompanyCode: this.data.list[this.data.index].logisticsCode,
      deliveryOrderCode: this.data.deliveryOrderCode,
      deliveryCost: this.data.logisticsPrices,
      refundRecordCode: this.data.refundRecordCode,
      expressCompanyName: this.data.list[this.data.index].logisticsName
    }
    this.saveLogisticsInfo(t)
  }
}