// pages/userCenter/userCenter.js
const net = require("./net.js")
const event = require("./event.js")
const data = require("./data.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
   userInfo:{},
   needAuthorUserInfo:true,
    baseList: data.baseList,
    marketingList: data.marketingList,
    publicList:data.publicList,
    showAuthorPhone:false // 显示手机授权弹窗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.usersProfile()
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