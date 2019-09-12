// pages/userCenter/userCenter.js
const net = require("./net.js")
const event = require("./event.js")
Page({
  ...net,
  ...event,
  /**
   * 页面的初始数据
   */
  data: {
   userInfo:{},
   list:[
     { name: "商家入住", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineInvoice.png", openType:""},
     { name: "积分兑换", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineTrial.png", openType: "" },
    
     { name: "升级会员", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineAi.png", openType: ""},
     { name: "领券中心", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineTicketcenter.png", openType: "" },
     { name: "邀请返利", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/my_balance_4.png", openType: ""},
     { name: "客户服务", src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/mineService.png", openType: "contact" },
   ],
    goodsList: [], // 商家自营
    noMore: false,
    shopListParams: {
      columnCode: 'CNXH',
      pageSize: 20,
      pageNum: 1
    },
    orderStatusNums:{
      completeNum:0, // 
      noDeliverGoodsNum:0, //未发数量
      noPaymentNum:0, // 未支付的数量
      noReceivingGoodsNum:0, // 未接受的商品数量
      refundNum:0
    },
    userType:1, // 如果用户类型不是2 就让起授权
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userType: wx.$db.userType
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
    this.getUserInfo()
    this.getGuessYouLikeList()
    this.orderStatusNum()
    // 刷新购物车数量
    wx.$updateShoppingCartNum()
    this.setData({
      userType:wx.$db.userType
    })
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})