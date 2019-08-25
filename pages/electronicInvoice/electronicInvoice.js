// pages/electronicInvoice/electronicInvoice.js
const event = require('./event.js')
// const net = require('./net.js')
Page({
  ...event,

  /**
   * 页面的初始数据
   */
  data: {
    tfnType:true,
    eleType: [
      { name: '1', value: '电子发票', checked: 'true' },
    ],
    peopleType: [
      { name: '1', value: '个人', checked: 'true' },
      { name: '2', value: '企业单位' },
    ],

    
    invoiceParam:{ //确定发票需要得参数
      email: "",//邮箱
      invoiceTaxpayerCode: "",//税号
      invoiceTitle: "",//发票抬头
      invoiceTitleType: "",//发票抬头类型
      invoiceType: "1",//发票类型
    }
   
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync("fromInvoice", true)
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