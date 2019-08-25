// packageA/pages/rateGoods/rateGoods.js
const net = require("./net.js")
const event = require("./event.js")
const cell = require("./cell/index.js")
const service = require("./service/index.js")
Page({
 ...net,
 ...event,
 ...cell,
 ...service,
  /**
   * 页面的初始数据
   */
  data: {
   goodsList:[{rate:1,images:[]}],
   service:{
     conformity:1,
     attitude:1,
     logistics:2,
     delivery:3
   }
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