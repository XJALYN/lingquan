// pages/search/search.js
const event = require("./event.js")
const net = require("./net.js")
Page({
  ...event,
  ...net,
  /**
   * 页面的初始数据
   */
  data: {
    cacheKeyWords:[],
    goodsList:[], // 商品列表
    showGoodsList:true, // 显示商品列表
    resultList:[], // 关键词列表
    searchText:'', // 搜索关键词
    filterIndex: 0,
    brandCode: "", // 品牌编码
    categoryCode: "", // 商品分类类表
    pageSize:20,
    pageNum:1,
    noMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 从本地读取缓存的值
    // let cacheKeyWords = wx.getStorageSync("cacheKeyWords")
    // console.log("cacheKeyWords",cacheKeyWords)
    // if (cacheKeyWords != '' && cacheKeyWords != null){
    //   console.log("cacheKeyWords",cacheKeyWords)
    //     cacheKeyWords = JSON.parse(cacheKeyWords)
    //     console.log(cacheKeyWords)
    //    this.setData({
    //      cacheKeyWords
    //    })
    // }

    if(options.type==0){
      this.setData({
        showGoodsList:false
      })
    }else if (options.type==1){
      this.data.brandCode = options.brandCode
    }else if(options.type==2){
      this.data.categoryCode = options.categoryCode
    }
    this.productSearchList()
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
    this.getSearchRecordListClient()
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
    if(!this.data.noMore){
      this.productSearchMoreList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})