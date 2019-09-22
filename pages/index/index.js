// pages/index/index.js
const event = require("./event.js")
const net = require("./net.js")
Page({
  ...event,
  ...net,
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [{ src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566732525910&di=2bad8eb429652fec32019f2dcc9f3924&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Ffile%2F2013%2F2013-9%2F201399110938537731.png"}],
    currentCountry:"上海",
    jobParams:{
      "category_id":1,
      "page_no": 1,
      "page_size": 20,
      "noMore":false
    },
    newList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.newList()
    this.advertisingBanners()
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