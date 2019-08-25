// pages/livePlayer/livePlayer.js
const net = require("./net.js")
const event = require("./event.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
    anchorName:"",
    anchorPortrait:"",
    audienceSize:"",
    liveAddress:"",
    liveState:"",
    roomBg:"",
    roomName:"",
    roomNumber:"",
    socketOpen:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      anchorName: options.anchorName,
      anchorPortrait: options.anchorPortrait,
      audienceSize: options.audienceSize,
      liveAddress: options.liveAddress,
      liveState: options.liveState,
      roomBg: options.roomBg,
      roomName: options.roomName,
      roomNumber: options.roomNumber
    })
    this.connetWebsocket()
    this.addListerMessage()
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

  }
})