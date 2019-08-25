// pages/orderList/orderList.js
const event = require('./event.js')
const net = require('./net.js')
Page({
 ...event,
 ...net,
  /**
   * 页面的初始数据
   */
  data: {
    filters: [
      { name: '全部', value: "" },
      { name: "待付款", value: 20 },
      { name: "待发货", value: 30 },
      { name: '待收货', value: 60 },
      { name: "已完成", value: 70 }
    ],
    filterIndex: 0,
    pageSize:10,
    pageNum:1,
    noMore:false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.filterIndex
    if(index != undefined && index != null){
      this.setData({
        filterIndex: index
      })
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
    this.orderList()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(!this.data.noMore){
      this.getMoreOrderList()
    }
  },

  // 登录完成
  onFinishLogin(){
    this.orderList()
  }
})