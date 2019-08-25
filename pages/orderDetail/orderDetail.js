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
    orderDetailType:true,
    goodStuffOrderorderSignData:[],//确认订单数据
    goodStuffOrderorderSignParam:{ //确认订单入参
      "orderCode": ""
    },
    checkoutOrderDetailData:[],//订单详情数据
    checkoutOrderDetailParam:{  //订单详情入参
      checkoutOrderCode:"",
    },
    orderCancelParam:{ //取消订单入参
      "orderCode": "" 
    },
    orderSubmitParam: { //立即支付
      "orderCode": ""
    },
    fromPage:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("待付款内容", options)
    this.data.checkoutOrderDetailParam.checkoutOrderCode = options.checkoutOrderCode
    this.data.fromPage = options.fromPage
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
    this.checkoutOrderDetail() //获取订单详情
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.checkoutOrderDetail()
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

  }
})