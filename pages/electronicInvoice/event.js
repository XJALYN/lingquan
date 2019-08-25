var pattern=require("../../utils/pattern.js")
module.exports = {
  //点击发票管理页面选择发票抬头类型事件
  radioChange: function (e) {
    this.data.invoiceParam.invoiceTitleType = e.detail.value;
    if (e.detail.value=="1"){
      this.setData({
        "invoiceParam.email": "",//邮箱
        "invoiceParam.invoiceTaxpayerCode": "",//税号
        "invoiceParam.invoiceTitle": "",//发票抬头
        "invoiceParam.invoiceTitleType":1,//发票抬头类型
        "invoiceParam.invoiceType": "1",//发票类型
        invoiceTaxpayerCode:"",
        invoiceTitle:"",
        tfnType: true,
      })
    } else if (e.detail.value == "2"){
      this.setData({
        tfnType:false,
        "invoiceParam.email": "",//邮箱
        "invoiceParam.invoiceTaxpayerCode": "",//税号
        "invoiceParam.invoiceTitle": "",//发票抬头
        "invoiceParam.invoiceTitleType":2,//发票抬头类型
        "invoiceParam.invoiceType": "1",//发票类型
        invoiceTaxpayerCode: "",
        invoiceTitle: "",
      })
    }
    
    console.log('radio发生change事件，携带value值为：', e.detail.value)

  },
  //获取发票抬头
  hasInvoiceTitle(e){
    this.data.invoiceParam.invoiceTitle = e.detail.value
  
  },
  //获取邮箱
  hasEmail(e){
    this.data.invoiceParam.email = e.detail.value
  },
  //获取税号
  hasInvoiceTaxpayerCode(e){
    this.data.invoiceParam.invoiceTaxpayerCode = e.detail.value

  },

  //点击添加发票成功事件
  clickAddele(){
    wx.$showLoading()
    console.log("确定", this.data.invoiceParam)
    if (this.data.invoiceParam.invoiceTitle == '') {
      wx.$showToast("请输入发票抬头")
      return
    }

    if (this.data.invoiceParam.invoiceTitleType==2){
      if (!pattern.testTaxAvailable(this.data.invoiceParam.invoiceTaxpayerCode)){
        wx.$showToast("纳税人识别号格式不正确")
        return
      }
    }

    if (!pattern.testEmail(this.data.invoiceParam.email)){
       wx.$showToast("邮箱格式不对")
       return
    }
    // 缓存到本地
    wx.setStorageSync("invoice", JSON.stringify(this.data.invoiceParam))

    wx.$showLoading()
    setTimeout(res => {
      wx.navigateBack({
      })
    }, 1000)
  }



}