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
    menuIndex:0,
    menuList:["发现","网红爆款","种草"],
    discoveryListParam: { //发现列表入参
      "columnCode": "FX",
      "isbPageDto": {
        "pageNum": 1,
        "pageSize":10
      },
      "type": 1
    },
    discoveryListData: [], //发现列表值

    clickLikeParam:{ //点赞入参
      articleId:null,
    },

    clickLikeData:[],//点赞值  

    noMore:false,
    getColumnItemListParam:{ //抖音列表入参
      columnCode: "DYBP",
      pageSize:10,
      pageNum:1,
    },
    getRecommendListParam:{ //种草列表入参
      columnCode: "ZC",
      pageSize: 10,
      pageNum: 1,
    },
    zcParam:{ //种草点击入参
      articleId: null,
      type: 0,
      pageSize: 10,
      pageNum: 1,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    console.log(options)
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
    // 获取从首页进来的菜单索引位置
    let menuIndex = wx.getStorageSync("find:menuIndex")
    console.log(menuIndex)
    if (menuIndex !== null && menuIndex !== '') {
      this.setData({
        menuIndex: menuIndex
      })
      wx.setStorageSync("find:menuIndex", null)
    }

    if (this.data.menuIndex == 0) {
      this.discoveryList();
      return
    }
    if (this.data.menuIndex == 1) {
      this.getColumnItemList();//抖音列表
      return
    }
    if (this.data.menuIndex == 2) {
      this.getRecommendList() //种草列表
      return
    }
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
    if (this.data.menuIndex == 0) {
      this.discoveryMoreList()
      return
    }
    if (this.data.menuIndex == 1) {
        this.getColumnItemMoreList()
      return
    }
    if (this.data.menuIndex == 2) {
      this.getMoreRecommendList()
      return
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     if(this.data.noMore){
       return
     }

    if (this.data.menuIndex==0){
      this.discoveryMoreList()
       return
    }
    if (this.data.menuIndex == 1) {
       this.getColumnItemMoreList()
      return
    }
    if (this.data.menuIndex ==2) {
    return
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})