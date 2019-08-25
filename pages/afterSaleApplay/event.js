module.exports = {
  onTypeChange(e){
    this.setData({
      typeIndex:e.detail.value
    })
    this.calcRefundMoney()
    console.log(this.data.typeIndex)
  },

  // 减少数量
  onSubNum(e){
    let index = e.currentTarget.dataset.index
    let num = e.currentTarget.dataset.num - 1

    let buyQuantity = this.data.data.refundRecordItems[index].buyQuantity
    let refundedAlreadyQuantity = this.data.data.refundRecordItems[index].refundedAlreadyQuantity
    let allowRefundQuantity = buyQuantity - refundedAlreadyQuantity

    if (num < 0) {
      this.setData({
        [`data.refundRecordItems[${index}].refundQuantity`]: 0
      })
      return
      this.calcRefundMoney()
    }
    this.setData({
      [`data.refundRecordItems[${index}].refundQuantity`]: num 
    })
    this.calcRefundMoney()
   
    
  },
  

  // 增加数量
  onAddNum(e){
    let index = e.currentTarget.dataset.index
    let num = e.currentTarget.dataset.num + 1
    let buyQuantity = this.data.data.refundRecordItems[index].buyQuantity
    let refundedAlreadyQuantity = this.data.data.refundRecordItems[index].refundedAlreadyQuantity
    let allowRefundQuantity = buyQuantity - refundedAlreadyQuantity
    if (allowRefundQuantity == 0) {
      return
    }

    if (allowRefundQuantity < num) {
      wx.$showToast("退货数量不能大于" + allowRefundQuantity)
      this.setData({
        [`data.refundRecordItems[${index}].refundQuantity`]: buyQuantity
      })
      return
    }
    this.setData({
      [`data.refundRecordItems[${index}].refundQuantity`]: num
    })
    this.calcRefundMoney()
  },

  // 输入退款金额时
  onInputRefundNum(e) {
    let index = e.currentTarget.dataset.index
    let num = parseInt(e.detail.value)
    let buyQuantity = this.data.data.refundRecordItems[index].buyQuantity
    let refundedAlreadyQuantity = this.data.data.refundRecordItems[index].refundedAlreadyQuantity
    let allowRefundQuantity = buyQuantity - refundedAlreadyQuantity
    if (allowRefundQuantity == 0) {
      return
    }

    if (allowRefundQuantity < num){
      wx.$showToast("退货数量不能大于" + allowRefundQuantity)
      this.setData({
        [`data.refundRecordItems[${index}].refundQuantity`]: buyQuantity
      })
    }else{
      this.setData({
        [`data.refundRecordItems[${index}].refundQuantity`]: num
      })
      if (isNaN(num)) {
        this.data.data.refundRecordItems[index].refundQuantity = 0
      }
    }
   
    this.calcRefundMoney()
  },

  // 退款金额失去焦点时的
  onInputRefundMoneyBlur(e){
    console.log("失去焦点")

    let index = e.currentTarget.dataset.index
    let num = parseInt(e.detail.value)
    let buyQuantity = this.data.data.refundRecordItems[index].buyQuantity
    let refundedAlreadyQuantity = this.data.data.refundRecordItems[index].refundedAlreadyQuantity
    let allowRefundQuantity = buyQuantity - refundedAlreadyQuantity
   
    if (e.detail.value == '') {
      this.setData({
        [`data.refundRecordItems[${index}].refundQuantity`]: allowRefundQuantity
      })
      this.calcRefundMoney()
    }
    
  },

  // 退款金额
  onInputRefundMoney(e){
    let money = parseFloat(e.detail.value)
    let index = e.currentTarget.dataset.index
    if (money > this.data.data.amountOrder){
      wx.$showToast("退款金额不能大于" + this.data.data.amountOrder)
      this.setData({
        'data.requestRefundMoney': this.data.data.amountOrder
      })
      return
    }
    this.setData({
      'data.requestRefundMoney':money
    })
    console.log(money)
  },

  // 备注
  onInputRemark(e){
    let remark = e.detail.value
    this.data.data.buyerRefundRemark = remark 
  },

  // 计算实际退款金额
  calcRefundMoney(){
    if (this.data.typeIndex==0){
      this.setData({
        'data.requestRefundMoney': this.data.data.amountOrder
      })
    }
    if(this.data.typeIndex ==1){
      let requestRefundMoney = 0
      let buyCount = 0
      let refundCount = 0 
      for (let item of this.data.data.refundRecordItems) {
        buyCount += item.buyQuantity
        refundCount += item.refundQuantity
        requestRefundMoney += parseFloat(item.refundableAmount) * item.refundQuantity
        
      }
      // 如果退款数量和实际购买数量相等 请使用实际支付金额
      // if (refundCount == buyCount) {
      //   requestRefundMoney = this.data.data.amountOrder
      // }
      console.log(buyCount, refundCount, "打印数据", requestRefundMoney)
      this.setData({
        'data.requestRefundMoney': requestRefundMoney.toFixed(2)
      })
     
    }
  },
  // 提交申请
  onSubmit(e){
    
    this.data.data.refundType = parseInt(this.data.typeIndex) + 1
    if (this.data.data.requestRefundMoney <= 0) {
      wx.$showToast("退款金额不能为空")
      return
    }
  
    wx.showModal({
      title: '确定申请退款?',
      content: '',
      confirmColor:"#F61B6D",
      success:res=>{
        if(res.confirm){
          this.saveRefundRecord()
        }
      }
    })
  }
}