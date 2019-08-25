// pages/shareMoneyList/shareMoneyList.js
const net = require("./net.js")
const event = require("./event.js")
const {formatDate} = require("../../utils/util.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
   startDate:"",
   endDate:"",
   pageSize:20,
   pageNum:1,
   noMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前的日期
    let date = new Date()
    let dateString = formatDate(date.getFullYear(),date.getMonth()+1,date.getDate())
    this.setData({
      startDate:dateString,
      endDate:dateString
    })
    this.getRemainderRecordListByToken()
   
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
   if(this.data.noMore){
     return
   }
    this.getMoreRemainderRecordListByToken()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})