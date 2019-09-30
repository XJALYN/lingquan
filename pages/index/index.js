// pages/index/index.js
const event = require("./event.js")
const net = require("./net.js")
const menu = require("./menu/index.js")
const cell = require("./cell/index.js")
Page({
  ...event,
  ...net,
  ...menu,
  ...cell,
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [{ src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566732525910&di=2bad8eb429652fec32019f2dcc9f3924&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Ffile%2F2013%2F2013-9%2F201399110938537731.png"}],
    currentCountry:"全国",
    newsParams:{
      "longitude":"",
      "latitude":"",
      "category_id":0,
      "page_no": 1,
      "page_size": 20,
      "noMore":false
    },
    newsList:[],
    menuList: [{ title: "推荐", value: 0 }, { title: "招聘", category_id: 1 }, { title: "活动", category_id: 2 }, { title: "拼车", category_id: 3 }, { title: "婚庆", category_id: 4 }, { title: "晒图", category_id: 5 }],
    menuIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.advertisingBanners()
    this.getLocation()
    if(options.inviteId){
      wx.setStorageSync("inviteId", options.inviteId)
    }
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
    this.advertisingBanners()
    this.newsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.newsParams.noMore){
      return
    }
    this.moreNewsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
   return {
     imageUrl:"http://linquan.oss-cn-shanghai.aliyuncs.com/linquan/share_icon.png",
     title:"领圈,发现身边有趣的故事!",
     path:"pages/index/index"
   }
  }
})