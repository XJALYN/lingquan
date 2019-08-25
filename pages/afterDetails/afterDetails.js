// pages/afterDetails/afterDetails.js
const net = require("./net.js")
const event = require("./event.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
    getRefundRecordParam:{
      "refundRecordCode": "" //售后详情入参
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.getRefundRecordParam.refundRecordCode = options.refundRecordCode
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
    this.getRefundRecord(); //获取售后详情
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
    this.getRefundRecord(); 
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