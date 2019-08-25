module.exports = {
  // 获取默认地址
  getaddressDefault() {
    if (wx.getStorageSync("address")) {  //有地址
      try {
        let address = wx.getStorageSync("address")
        address = JSON.parse(address)
        console.log(address)
         this.setData({
          noAdressTypes: true,
          hasAdressTypes: false,
          addressData: address
        })
        console.log("默认地址饭餐：", address)
        this.data.orderSubmitParam.addressId = address.addressId, //获取提交订单得地址id
        this.data.orderSettleParam.province = address.province //地址更新立即购买接口更新
        this.orderSettle()
        
      } catch (e) {
        console.log(e)
      }
    }else{  
      console.log("无默认地址") 
        this.data.orderSettleParam.province ="" //无默认地址时
        
      wx.$methods.addressDefault().then(res=>{
        if(res.body){
          console.log("无默认地址1111", res.body) 
          this.setData({
            noAdressTypes: true,
            hasAdressTypes: false,
            addressData: res.body
          }) 
          this.data.orderSubmitParam.addressId =res.body.addressId
          this.data.orderSettleParam.province = res.body.province
        }else{
          this.setData({
            noAdressTypes: false,
            hasAdressTypes: true
          })
          this.data.orderSubmitParam.addressId=""
          
        }
        
        this.orderSettle() 
      }).catch(err=>{
        this.setData({
          noAdressTypes: false,
          hasAdressTypes: true
        })
      })
        
    }
  }, 

  //获取立即购买
  orderSettle() {
    this.data.settlementParam.productItemTotalPriceList = []
    wx.$methods.orderSettle(this.data.orderSettleParam).then(res => {
        console.log("立即购买数据", res.body)
        for (let i = 0; i < res.body.prodList.length; i++) {
          this.data.settlementParam.productItemTotalPriceList.push(res.body.prodList[i].prodSumPrice)
        }
      console.log("查询的入参为：", res.body.totalPrice)
        this.settlement() //获取优惠卷和包邮卷列表数据方法
        this.setData({
          helpDeduction: res.body.helpDeduction,
          orderSettleData: res.body,
          freightData: res.body.freight,    // 邮费
          memberRemainder: res.body.memberRemainder, // 用户可用余额
          chooseBalance: res.body.memberRemainder > 0 ? res.body.memberRemainder + '元余额可用' :"无可用余额",
          'selectedCoupon.express': res.body.freight,
          selectedBalance:false
        })
        this.data.orderSubmitParam.settleKey = res.body.redisKey //获取提交订单得redisKey
        this.data.orderSubmitParam.subChannelNo = res.body.subChannelNo  //获取提交订单得subChannelNo
      this.calcTotalPrince()

    }).catch(res=>{
      if (res.data.exception.errorCode == 10053){
        wx.$showToast("商品已售罄")
        setTimeout(() => {
          wx.navigateBack({
          })
        }, 1000)
        return
      }
      if (res.data.exception.errorCode == 10052) {
        wx.$showToast("商品已下架")
        setTimeout(() => {
          wx.navigateBack({
          })
        }, 1000)
        return
      }

      let msg = res.data.exception.message
      if (res.data.exception.message.indexOf("@@@") > -1) {
        msg = res.data.exception.message.split('@@@')[1]
      }
      wx.$showToast(msg)
    })
  },
  //提交订单接口
  orderSubmit() {
    wx.showLoading({
      mask:true,
      duration:5000,
      title:"加载中..."
    })
    this.data.orderSubmitParam.orderCode = this.data.orderCode
    this.data.orderSubmitParam.payRemainder = this.data.payRemainder // 余额抵扣金额
    console.log("提交入参", this.data.orderSubmitParam)
    console.log("wx.setStorageSync('orderCode')", wx.setStorageSync('orderCode'))
    wx.$methods.orderSubmit(this.data.orderSubmitParam).then(res => {
      
      wx.hideLoading()
      console.log("code为多少", res.code, res)
      if(res.code==="201"){
        console.log("商品存在")
        console.log("提交订单", res.body)
        this.setData({
          orderSubmitData: res.body,
        })
        this.data.orderCode = res.body.orderCode
        let checkoutOrderCode = res.body.orderCode
        if (res.body.moneyZero == 0) {
          wx.redirectTo({
            url: '/pages/orderDetail/orderDetail?checkoutOrderCode=' + checkoutOrderCode,
          })
        } else {
          this.data.payGoing = true
          wx.requestPayment({
            timeStamp: res.body.timeStamp,
            nonceStr: res.body.nonceStr,
            package: res.body.packageValue,
            signType: 'MD5',
            paySign: res.body.paySign,
            
            success:(res)=> {
              wx.redirectTo({
                url: '/pages/orderDetail/orderDetail?checkoutOrderCode=' + checkoutOrderCode,
              })
               
            },
            fail(res) {
              wx.redirectTo({
                url: '/pages/orderDetail/orderDetail?checkoutOrderCode=' + checkoutOrderCode,
              })
            }
          })
        }
      }else{
          wx.showToast({
            title: '商品不存在',
            icon: 'none',
            duration: 500
          })
          setTimeout(res => {
            wx.navigateBack({})
          }, 1000)
      }
     

      

    }).catch(res=>{
      if (res.data.exception.errorCode == 9002) {
        wx.$showToast("商品已售罄")
        setTimeout(() => {
          wx.navigateBack({
          })
        }, 1000)
        return
      }
      if (res.data.exception.errorCode == 9012) {
        wx.$showToast("商品已下架")
        setTimeout(() => {
          wx.navigateBack({
          })
        }, 1000)
        return
      }
      if (res.data.exception.errorCode == 9003) {
        wx.$showToast("商品库存不足")
        setTimeout(() => {
          wx.navigateBack({
          })
        }, 1000)
        return
      }
      

      let msg = res.data.exception.message
      if (res.data.exception.message.indexOf("@@@") > -1) {
        msg = res.data.exception.message.split('@@@')[1]
      }
      wx.$showToast(msg)
      
    })
  },
  //包邮和优惠卷获取
  settlement(){

    this.setData({
      'selectedCoupon.expressIndex':0,
      'selectedCoupon.deductionIndex':-1,
      'selectedCoupon.express':0, // 邮费
      'selectedCoupon.deduction':0
    })
    this.data.orderSubmitParam.memberCouponRelationId4Deduction = null
    wx.$methods.settlement(this.data.settlementParam).then(res => {
      console.log("包邮和优惠卷获取", res.body)
      if (res.body.couponInfoForFullDeductionDto.count>0){
        this.setData({
          settlementData: res.body,
          chooseMoney: "您有" + res.body.couponInfoForFullDeductionDto.count + "张券",
          chooseMail: res.body.couponInfoForExpressDto.generalInfo,
          mailData: res.body.couponInfoForExpressDto.count,
        })
        this.data.countData = res.body.couponInfoForFullDeductionDto.count
      }else{
        this.setData({
          settlementData: res.body,
          chooseMoney: "无优惠券",
          chooseMail: res.body.couponInfoForExpressDto.generalInfo,
          mailData: res.body.couponInfoForExpressDto.count,
        })
        this.data.countData = res.body.couponInfoForFullDeductionDto.count
      }
      

      if (this.data.freightData > 0) { //判断包邮卷显示
        if (this.data.mailData>0){
          let freight = "-¥" + (this.data.freightData)
          let totalPrices = this.data.totalPrice - (this.data.freightData)
          if (this.data.orderType==3){
            this.setData({
              chooseMail: "不使用优惠券",
            })
            this.data.selectedCoupon.express = 0
          }else{
            this.setData({
              chooseMail: freight,
              "selectedCoupon.express": this.data.freightData,
            })
          }
          
          this.data.orderSubmitParam.memberCouponRelationId4Express = this.data.settlementData.couponInfoForExpressDto.couponInfoDtoList[0].memberCouponRelationId
        }else{
          this.setData({
            'selectedCoupon.express': 0,
          })
        }
      } else {
        this.setData({
          chooseMail: "免运费"
        })
      };
      this.calcTotalPrince()
     
     
    })
  },
   
  // 添加地址
  addAdress(){
    console.log("添加地址入参：", this.data.addAdressParams)
    wx.$methods.addressAdd(this.data.addAdressParams).then(res => {
      this.data.orderSubmitParam.addressId = res.body
       this.data.addAdressParams.addressId = res.body
      wx.setStorageSync("address", JSON.stringify(this.data.addAdressParams))
      this.getaddressDefault()
      
    })
  }
  



}