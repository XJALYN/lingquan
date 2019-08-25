// pages/giftCardRecharge/giftCardRecharge.js
const net = require("./net.js")
const event = require("./event.js")

Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
    isCardNoEmpty:"",   // 卡号为空
    isCardPassEmpty:"", // 卡密为空
    isCardHasBind:"",   // 卡已经绑定
    isCardPassError:"", // 卡密码错误
    isCardNoError:"",   // 卡号错误
    cardNo:"",          // 卡号
    cardPass:"",         // 卡密
    pageSize:20,
    pageNum:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGiftCardRecord()
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
  onReachBottom: function () {
    if (this.data.noMore) {
      return
    }
    this.getMoreGiftCardRecord()
  },
})