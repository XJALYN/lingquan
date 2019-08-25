// pages/shoppingCart/shoppingCart.js
const net = require("./net.js")
const event = require("./event.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
    dataMD5:"",
    loaded:false,

    currentProductNumData:0,
    goBalaneType:true,
    allMoneyType:false,
    subChannelNo:"",
    allMoney: "0.00",//共计
    shopCarCountDeleteParam: {}, //删除购物车
    shopCarListData:[],
    completeType:true,//完成ico显示状态
    manageType:false,//管理ico显示状态
    shopalltrueType: true,//全选选中显示状态
    shopallType: false,//全选未选中状态
    allType: false,//全选不选中显示状态
    deleteType:true,//删除btn显示状态
    balanType:false,//去结算btn显示状态
    shopNum:1,
    shopCarListParam: { //获取购物车列表入参
      "pageSize": 10000,
      "pageNum": 1,
      "channelId": 2
      },
      numParam: { //获取购物车加减入参
      "pass":true,
      "channelId": 2,
      "type": 2,
      "productCode": "",
      "prodCount": null,
    }
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
    // 刷新购物车数量
    wx.$updateShoppingCartNum()
    this.shopCarList();
    
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
    this.shopCarList()
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