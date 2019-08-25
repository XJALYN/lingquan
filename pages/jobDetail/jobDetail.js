// pages/find/find.js
const net = require("./net.js")
const event = require("./event.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
    shareArticleData:[],
    articleParam:{ //发现详情
      articleId:""
    },
    shareArticleParam:{ //发现详情分享
      "articleId":null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.articleParam.articleId = options.articleId
    console.log("详情多少", options)

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
    this.articleDetail() //发现接口
    // this.shareArticle()
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
    console.log(111, this.data.shareArticleData)
    return {
      title: this.data.shareArticleData.articleName,
      imageUrl: this.data.shareArticleData.articleImgUrl,
      path: `/pages/findDetail/findDetail?articleId=${this.data.shareArticleData.articleId}`
    }
  }
})