// pages/newUserWelfare/newUserWelfare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   vipList:[
     { 
       icon: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/new_user_welfare_icon_1.png",
       src:"https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/new_user_welfare_src_1.png?1",
       title:"开通季卡",
       payPrice:"59元",
       price:"99元"
     },
     { 
       icon: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/new_user_welfare_icon_2.png",
       src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/new_user_welfare_src_2.png?1",
       title: "开通年卡",
       payPrice: "199元",
       price: "299元"
     },
     { 
       icon: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/new_user_welfare_icon_3.png", 
       src: "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/new_user_welfare_src_3.png?1",
       payPrice: "299元",
       title: "开通限量卡",
       price: "499元"
     }
     ],
     vipIndex:1
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

  onChangeSwiper(e){
    console.log(e)
    if (e.detail.source=="touch"){
     this.setData({
       vipIndex: parseInt(e.detail.current)
     })
    }
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPushToMember(){
    wx.switchTab({
      url: '/pages/member/member',
    })
  },
  onSlideLeft(e){
    this.data.vipIndex--
    this.setData({
      vipIndex: this.data.vipIndex
    })
  },
  onSlideRight(e){
    this.data.vipIndex++
    this.setData({
      vipIndex: this.data.vipIndex
    })
  }
})