// pages/shopCenter/shopCenter.js
const event = require("./event.js")
const net = require("./net.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
   leftIndex:0,
   brandList:[],
   mainList:[], // 主惨淡
   categoryList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchBrandList()
    this.searchMainCategoryList()
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

  }
})