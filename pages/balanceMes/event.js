const pattern = require("../../utils/pattern.js")
module.exports = {
  //点击结算页面发票去发票页面
  clickGoBalance() {
    console.log("点击来了吗")
    wx.navigateTo({
      url: '/pages/electronicInvoice/electronicInvoice'
    })
  },

  onChangeAddress(e){
    wx.navigateTo({
      url: '/pages/addressChoiceList/addressChoiceList',
    })
  },

  //完善地址
  perfect() {
    if (wx.getStorageSync("address")) {
      wx.navigateTo({
        url: '/pages/addressChoiceList/addressChoiceList',
      })
    }else{
      wx:wx.showModal({
      content: '是否获取微信地址？',
      showCancel: true,
      cancelText: '否',
      cancelColor: '#333333',
      confirmText: '是',
      confirmColor: '#F61B6D',
      success:res=> {
          if(res.confirm){
            wx.chooseAddress({
              success:(res)=> {
                
                this.data.orderSettleParam.province = this.data.addAdressParams.province
                console.log("成功未", res, res.countyName)
                this.data.addAdressParams.area = res.countyName
                this.data.addAdressParams.province = res.provinceName
                this.data.addAdressParams.city = res.cityName
                this.data.addAdressParams.contact = res.userName
                this.data.addAdressParams.phone = res.telNumber
                this.data.addAdressParams.postcode = res.postalCode
                this.data.addAdressParams.detail = res.detailInfo
                this.setData({
                  addAdressParams: this.data.addAdressParams
                })
                console.log("参数", this.data.addAdressParams)

                this.addAdress();

                // this.addressData.contact = res.userName
              },
              fail:err=>{
                wx.navigateTo({
                  url: '/pages/addressChoiceList/addressChoiceList',
                })
              }
            })
          }else{
            wx.navigateTo({
              url: '/pages/addressChoiceList/addressChoiceList',
            })
          }
      },
      fail: function(res) {

      },
      complete: function(res) {
        console.log("完成",res)
      },
    })
    }
    
  },
  //获取买家留言
  onInputbuyerNote(e){
    this.data.orderSubmitParam.buyerNote = e.detail.value
  },
 
  //提交订单
  submitOrder(){
    console.log("提交内容", this.data.orderSubmitParam.addressId)
    if (!this.data.orderSubmitParam.addressId){
      wx.showModal({
        content: '您还没有选择地址哟~',
      })
    }else{
      this.orderSubmit()
    }

    // 如果是充值类型请先验证手机格式
    // if (!pattern.testPhone(this.data.rechargePhone)){
    //   wx.$showToast("手机格式不正确")
    // }

    
  },

  onclickChooseMes(){ //点击选择优惠卷弹框
    if (this.data.countData > 0) {
      this.setData({
        chooseMesType: false
      })
    } else {
      wx.showToast({
        title: '无优惠券',
        icon: 'none',
        duration: 500
      })
    }
  },
  sureBtn(){ //点击选择优惠卷弹框的完成
    if (this.data.orderSubmitParam.memberCouponRelationId4Express){

    }
    this.setData({
      chooseMesType: true
    })
  },
  onclickExemption() { //点击选择包邮卷弹框
    console.log(1111, this.data.mailData)//优惠券数量大于零
    console.log(1222, this.data.freightData)//邮费大于0
    if (this.data.freightData > 0) {
      if (this.data.mailData > 0){
        this.setData({
          exemptionType: false
        })
      }else{
        wx.showToast({
          title: '无优惠券',
          icon: 'none',
          duration: 500
        })
      }
      
    } else {
      wx.showToast({
        title: '免运费',
        icon: 'none',
        duration: 500
      })
    }
  },
  // 设置
  onSelectBalance(){
    if (this.data.memberRemainder >0){
      // 出现弹窗
      this.setData({
        showSelecteBalanceAlert: true
      })
    }else{
      wx.$showToast("无可用余额")
      
    }
  },
  onHideBalanceAlert(){
    this.setData({
      showSelecteBalanceAlert: false
    })
  },
  // 设置是否选择余额
  onChangeSelectedBalance(e){
    this.setData({
      selectedBalance: !this.data.selectedBalance
    })
    this.calcTotalPrince()
  },
  exemptionBtn() {//点击选择包邮卷完成
    this.setData({
      exemptionType: true
    })
  },
  exemptionChange(e){ //选择包邮卷
    this.data.orderSubmitParam.memberCouponRelationId4Express = this.data.settlementData.couponInfoForExpressDto.couponInfoDtoList[e.detail.value].memberCouponRelationId
    this.setData({
      'selectedCoupon.expressIndex': e.detail.value
    })
    this.data.selectedCoupon.express = this.data.orderSettleData.freight
    // 不使用包邮券情况
    if (!this.data.orderSubmitParam.memberCouponRelationId4Express){
      this.data.selectedCoupon.express = 0
      this.setData({
        chooseMail: "不使用包邮券",
      })
    }else{
      this.setData({
        chooseMail: "-￥"+ this.data.orderSettleData.freight,
      })
    }
    this.calcTotalPrince()
  },
  radioChange(e){ //选择优惠卷
  
    this.setData({
      'selectedCoupon.deductionIndex':e.detail.value
    })
    let itemData=this.data.settlementData.couponInfoForFullDeductionDto.couponInfoDtoList[e.detail.value]
    if (itemData.couponAmount){
      this.data.selectedCoupon.deduction = itemData.couponAmount 
    }else{
      this.data.selectedCoupon.deduction = 0
    }
    
    // 优惠券id
    this.data.orderSubmitParam.memberCouponRelationId4Deduction = itemData.memberCouponRelationId
    let itemDataMoney
    if (itemData.couponAmount){
      itemDataMoney = "-￥" + itemData.couponAmount
        this.setData({
          chooseMoney: itemDataMoney,
        })  
    }else{
      this.setData({
        chooseMoney: "不使用优惠券"
      }) 
    }
    this.calcTotalPrince()
   
    
   
  },
  // 计算总金额
  calcTotalPrince(){
     
    // 小计金额 
    let totalPrice = parseFloat(this.data.orderSettleData.totalPrice)
    totalPrice += parseFloat(this.data.freightData)
    // 选择了优惠券
    if (this.data.selectedCoupon.deduction){
      totalPrice -= parseFloat(this.data.selectedCoupon.deduction)
    }

    totalPrice -= parseFloat(this.data.helpDeduction)

    // 选择了运费
    if (this.data.selectedCoupon.express){
      totalPrice -= parseFloat(this.data.selectedCoupon.express)
    }

    // 判断是否使用余额
    let chooseBalance = this.data.memberRemainder + "元余额可用"
    if (this.data.selectedBalance) {
      if (this.data.memberRemainder > totalPrice){
        chooseBalance = "-￥" + parseFloat(totalPrice).toFixed(2)
        this.data.payRemainder = totalPrice
        totalPrice = 0.00
      }else{
        totalPrice -= this.data.memberRemainder
        this.data.payRemainder = this.data.memberRemainder
        chooseBalance = "-￥" + parseFloat(this.data.memberRemainder).toFixed(2)
      }
    }else{
      this.data.payRemainder = 0
    }
    this.setData({
      chooseBalance
    })

    totalPrice = "￥" + totalPrice.toFixed(2)
    this.setData({
      totalPrice: totalPrice
    })
  },

  // 输入了充值手机号码
  onInputPhone(e){
    this.data.rechargePhone = e.detail.value.replace(/\s+/g, "")
    this.setData({
      showPhoneClear: this.data.rechargePhone.length > 0
    })
    const toFormatPhone = (value) => {
      var result = ""
      for (var i = 0; i < value.length; i++) {
        console.log(i)
        result += value.charAt(i)
        if ((i == 2 || i == 6) && value.length>i+1) {
          result += " "
        }
      }
      return result
    }
    wx.$shake(()=>{
      this.setData({
        formatRechargePhone: toFormatPhone(this.data.rechargePhone),
      })
    })
  },

  // 清理手机号码
  onClearPhone(e){
    this.data.rechargePhone = ""
    this.setData({
      formatRechargePhone: "",
      showPhoneClear:false
    })
  }
  
}