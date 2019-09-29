// pages/merchant/merchant.js
const event = require("./event.js")
const net = require("./net.js")
Page({
  ...event,
  ...net,
  /**
   * 页面的初始数据
   */
  data: {
    certified_remark: "",
    certified_status: "1",
    is_can_change_certify: false,
    is_certified: true,
    is_certified_mobile: false,
    license_no: "",
    license_type: "",
    logo_url: "",
    main_industry_category: "",
    mobile: "",
    name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.certifyInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})