// packageA/pages/myPublishList/myPublishList.js
const event = require("./event.js")
const net = require("./net.js")
const cell = require("./cell/index.js")
Page({
  ...event,
  ...net,
  ...cell,
  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    showMenuAlert:false,
    categories:[],
    params:{
      page_no:1,
      page_size:20
    },
    noMore:false
    
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
    this.myPublishedList()
    this.newsCategories()
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
    this.myPublishedList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})