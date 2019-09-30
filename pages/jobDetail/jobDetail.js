// pages/find/find.js
const net = require("./net.js")
const event = require("./event.js")
const footer = require("./footer/index.js")
const commentList = require("./commentList/index.js")
Page({
  ...net,
  ...event,
  ...footer,
  ...commentList,
  /**
   * 页面的初始数据
   */
  data: {
   newsData:null,
   commentList:[],
   showCommentBtn:false,
   comment:"",
   page_size:20,
   page_no:1,
   noMore:false,
   is_certified_mobile:false, // 是否授权手机
    showAuthorPhone:false, // 显示授权手机弹窗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.usersProfile()
   

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
    this.newsDetail()
    this.newsCommentsList()
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
   if(this.data.noMore){
     return
   }
    this.moreNewsCommentsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log(111, this.data.shareArticleData)
    return {
      title: this.data.newsData.content,
      imageUrl:"",
      path: `pages/jobDetail/jobDetail?id=${this.data.id}`
    }
  }
})