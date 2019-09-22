// pages/userCenter/userCenter.js
const net = require("./net.js")
const event = require("./event.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
   userInfo:{},
   needAuthorUserInfo:true,
   shopTools:[
     { name: "商家信息", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineInvoice.png", path: ""},
     { name: "信息发布", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineInvoice.png", path: "/packageA/pages/myPublishList/myPublishList"},
   ],
   list:[
     { name: "积分兑换", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineTrial.png", openType: "" },
     { name: "升级会员", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineAi.png", openType: ""},
     { name: "领券中心", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineTicketcenter.png", openType: "" },
     { name: "邀请返利", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/my_balance_4.png", openType: ""},
     { name: "客户服务", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineService.png", openType: "contact" },
   ],
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