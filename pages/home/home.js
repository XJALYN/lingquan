// pages/home/home.js
const net = require("./net.js")
const event = require("./event.js") 
const menu = require("./menu/index.js") // 菜单相关事件
Page({
  ...net,
  ...event,
  ...menu,
  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{ title: "推荐", value: 0 }, { title: "一分钟了解鲲美会", value: 1 }, { title: "发现", value: 3 }, { title: "网红爆款", value: 4 }, { title: "种草", value: 5 }, { title: "自营好物", value: 6 }, { title: "特卖", value: 7}],
    menuIndex:0,
    scrollIntoView:"kc-0",
    scrollTop:0,
    homePage:null,
    goodsList:[], // 商家自营
    noMore:false,
    liveRoomList:[],

    shopListParams: { // 商家自营请求参数
      columnCode: 'HWZY',
      pageSize:24,
      pageNum:1
    },
    neardDateGoodsListParams: { // 临期清仓
      columnCode: 'LQQC',
      pageSize: 20,
      pageNum: 1
    },
    neardDateGoodsList:[], // 临期清仓列表
    discoveryListParam: { //发现列表入参
      "channelNo": "KM0001",
      "columnCode": "FX",
      "isbPageDto": {
        "pageNum": 1,
        "pageSize": 10
      },
      "type": 1
    },
    discoveryListData: [], //发现列表值

    clickLikeParam: { //点赞入参
      articleId: null,
    },

    clickLikeData: [],//点赞值  

    noMore: false,
    getColumnItemListParam: { //抖音列表入参
      columnCode: "DYBP",
      pageSize: 10,
      pageNum: 1,
    },
    getRecommendListParam: { //种草列表入参
      columnCode: "ZC",
      pageSize: 10,
      pageNum: 1,
    },
    zcListData:[], // 种草数据列表
    zcParam: { //种草点击入参
      articleId: null,
      type: 0
    },
    hideOneMinute:false, // 隐藏一分钟了解鲲美会按钮
    showGuideAddProgram:true, //
    showNewUserWelfare:false, // 显示用户福利
    showQixiAlert:false,  // 显示七夕弹窗
    hwzyData:null // 好物自营数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getHomePage()
    let hideOneMinute = wx.getStorageSync("home:hideOneMinute")
    if (hideOneMinute == true){
      this.setData({
        hideOneMinute: true
      })
    }else{
      this.setData({
        hideOneMinute: false
      })
    }

    let showGuideAddProgram = wx.getStorageSync("showGuideAddProgram")
    if (showGuideAddProgram === false) {
      this.setData({
        showGuideAddProgram: false
      })
    }else{
      this.setData({
        showGuideAddProgram: true
      })
    }
    

    // // 浪漫七夕活动
    // if (wx.$db.token) {
    //   this.setData({
    //     "showQixiAlert": true
    //   })
    //   return
    // }

    // 迎新四重礼逻辑处理 首次点击授权和24小时候后出现
    if(wx.getStorageSync("home:newUserWelfare")==true){
       this.setData({
         "showNewUserWelfare":true
       })
      wx.setStorageSync("home:newUserWelfare", null)
      let date = (new Date()).valueOf()
      wx.setStorageSync("home:newUserWelfareTime", date)
    }else{
      let beginTime = wx.getStorageSync("home:newUserWelfareTime")
      if (beginTime){
        let end = (new Date()).valueOf()
        let duration = parseInt(end) - parseInt(beginTime)
        console.log(duration)
        if (duration / 1000 > 24 * 3600){
          this.setData({
            "showNewUserWelfare": true
          })
          wx.setStorageSync("home:newUserWelfareTime", null)
        }
      }
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
     this.refreshData()
    // 刷新购物车数量
    wx.$updateShoppingCartNum()

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
    this.refreshData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   if(this.data.noMore){
     return
   }
    let value = this.data.menuList[this.data.menuIndex].value
    // 获取发现
    if (value == 3) {
      this.discoveryMoreList()
      return
    }
    //抖音列表
    if (value == 4) {
      this.getDouYiMoreList();
      return

    }
   

    //自营好物
    if (value == 7) {
      this.moreNearDateGoodsList()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})