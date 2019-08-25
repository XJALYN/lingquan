// pages/balanceMes/balanceMes.js
const event = require('./event.js')
const net = require('./net.js')
Page({
  ...event,
  ...net,
  /**
   * 页面的初始数据
   */
  data: {
    taxName:"",//税票默认
    totalPrice:0,
    memberCouponRelationChecked:false,//不使用包邮选中状态
    freightData:0, //运费数
    chooseMoney:"",//优惠卷列表显示
    countData:null, //优惠卷数量
    chooseMail: "",//包邮卷列表显示
    mailData: null, //包邮卷数量
    addAdressParams:{ //添加地址入参
      "area": "",
      "province": "",
      "city": "",
      "contact": "",
      "phone": "",
      "postcode": "",
      "detail": ""
    },
    chooseMesType:true, //选择优惠卷弹框显示隐藏状态
    exemptionType: true,//选择包邮卷弹框显示隐藏状态
    items: [
      { name: 'USA'},
      { name: 'CHN',checked: 'true' },
    ],
 
    settlementParam:{ //获取优惠卷入参
      "productItemTotalPriceList":[]
    }, //获取优惠卷和包邮卷入参
    settlementData: [],//获取优惠卷和包邮卷数据
    orderCode:"",
    hasAdressTypes:true,//有默认地址
    noAdressTypes:false,//无默认地址
    orderSettleParam: { //结算接口入参
      "pass":true,
      "idList": [
        {
          "num": 1,
          "productCode": "",
          "checkoutCarId":"",
          "shareMemberId":""
        }
      ],
      "key": "",
      "province": "",
      "columnCode":"",
      "subChannelNo":"",
    },
    orderSubmitParam: {
      "pass":true,
      "addressId": "",  //地址id
      "buyerNote": "",
      "columnCode": "1",
      "email": "",
      "invoiceTaxpayerCode": "",
      "invoiceTitle": "",
      "invoiceTitleType": "1",
      "invoiceType": "1",
      "orderCode": "",
      "payType": "0",
      "settleKey": "",
      "subChannelNo": "",
      "payRemainder":"", // 余额抵扣金额
      "memberCouponRelationId4Express":null, //包邮卷
      "memberCouponRelationId4Deduction": null //优惠卷
    },
    selectedCoupon:{
      expressIndex:0,
      deductionIndex:-1,
      express:0, // 邮费
      deduction:0 // 优惠券
    },
    chooseBalance:"", // 选择余额文字显示
    memberRemainder:0,   // 余额
    showSelecteBalanceAlert:false, // 显示选择弹窗
    selectedBalance:false, // 是否选择使用余额
    payRemainder:0,  // 用户支付使用的余额
    payGoing:false, // 支付中
    rechargePhone:"", //充值手机号码
    formatRechargePhone:"", // 格式化手机号码
    showPhoneClear:false,
    orderType:"",  // 订单类型 区别是免费拿好物的商品
    helpDeduction:"" // 助力优惠金额
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("监听页面加载", options)
    this.data.orderSettleParam.subChannelNo = options.subChannelNo
    // 订单来自免费拿好物
    if (options.fromPage == "pages/goodsActivity/goodsActivity"){
      this.data.orderSettleParam.idList[0].productCode = options.prodCode
      this.data.orderSettleParam.idList[0].num = options.prodNum
      this.data.orderSettleParam.oldCheckoutCode = options.oldCheckoutCode
      this.data.orderSettleParam.orderType = 3
      this.data.orderSubmitParam.orderType = 3
      this.setData({
        orderType:3
      })
      
    } else if (options.fromPage == "shopCart") {
      this.data.orderSettleParam.subChannelNo = options.subChannelNo,
        this.data.orderSettleParam.idList = JSON.parse(options.idList)
    } else {
      this.data.orderSettleParam.idList[0].productCode = options.prodCode
      this.data.orderSettleParam.idList[0].shareMemberId = options.shareMemberId
      this.data.orderSettleParam.idList[0].num = options.prodNum
      this.data.orderSettleParam.columnCode = options.columnCode
    }


    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 如果从支付窗口回来则不需要刷新页面
    if (this.data.payGoing){
      return
    }
    

    // 获取
    let invoice = wx.getStorageSync("invoice")
    if (invoice){
      wx.setStorageSync("invoice","")
      invoice = JSON.parse(invoice)
      this.data.orderSubmitParam.email = invoice.email,
        this.data.orderSubmitParam.invoiceTaxpayerCode = invoice.invoiceTaxpayerCode,
        this.data.orderSubmitParam.invoiceTitle = invoice.invoiceTitle,
        this.data.orderSubmitParam.invoiceTitleType = invoice.invoiceTitleType,
        this.data.orderSubmitParam.invoiceType = invoice.invoiceType,
        console.log("参数未invoice：", invoice)
      this.setData({
        taxName: invoice.invoiceTitle
      })
    }
    if (wx.getStorageSync("fromInvoice")!==true){
      this.getaddressDefault();//获取默认地址
    }else{
      wx.setStorageSync("fromInvoice", null)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     wx.setStorageSync("address", null);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

    onInputRegion(e) {
      console.log("啦啦啦")
    // let list = e.detail.value
    // this.setData({
    //   'params.province': list[0],
    //   'params.city': list[1],
    //   'params.area': list[2]
    // })
    // this.setData({
    //   check: this.check()
    // })
  },

  


})