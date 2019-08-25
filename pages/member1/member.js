// pages/member/member.js
const net = require("./net.js")
const event = require("./event.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
    vipIndex:0,
    listIndex:0,
    vipLevel:-1,
    list:[],
    currentMemberCardId:-1,
    bindPhone:false,
    code:"", // 微信绑定手机需要的code
    targetIndex:null,
    showLimitCardSuccess:false // 是否显示限量卡会员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMemberCardsWithRights()
    // 获取索引位置
    wx.login({
      success: res => {
        this.data.code = res.code
        // this.setData({
        //   code: res.code
        // })
        console.log(res)
      }
    })
  
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
    let type = wx.getStorageSync("member:type")
    if(type == "current"){ // 跳转到当前用户等级
      this.data.targetIndex = null
      this.setData({
        listIndex: this.data.vipIndex
      })
    }else if(type=="upgrade"){ // 跳转到上一级用户等级
      this.data.targetIndex = 1
      this.setData({
        listIndex: 1
      })
    } else if (type == "year") { // 跳转到上一级用户等级
      this.data.targetIndex = 2
      this.setData({
        listIndex: 2
      })
    } else if (type == "limit") { // 跳转到上一级用户等级
      this.data.targetIndex = 3
      this.setData({
        listIndex: 3
      })
    }else{
      this.data.targetIndex = null
      this.setData({
        listIndex: this.data.vipIndex
      })
    }
    if (this.data.vipLevel < 4 && this.data.vipLevel != -1){
      this.getLuckyBugRecevingRecord()
    }
    wx.setStorageSync("member:type", null)

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
    this.getMemberCardsWithRights()
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