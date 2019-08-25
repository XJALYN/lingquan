const config = require("../../config/config.js")
module.exports = {
  onSwiperChange(e){
    console.log(e)
    if (e.detail.source=="touch"){
      this.setData({
        listIndex: e.detail.current
      })
    }
  },

  // 跳转到免费拿好物小程序
  onLaunchMiniProgram(){
    console.log("onLaunchMiniProgram")
    if (wx.$db.userType != 2) {
      wx.navigateTo({
        url: '/pages/author/author',
      })
      return
    }
    wx.navigateToMiniProgram({
      appId:"wx6106b6dfe9370a7c",
      path:"pages/goodsList/goodsList",
      envVersion: config.envVersion,
      extraData:{
        unionId:wx.$db.unionId
      },
      success:res=>{
       console.log(res)
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  onTapBindPhoneBtn(e){
   // 阻拦绑定手机事件无 实际效果
  },
  // 绑定手机号码
  onBindPhone(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    let { encryptedData, errMsg, iv } = e.detail
    if (errMsg == 'getPhoneNumber:ok') {
      let t = {
        code: this.data.code,
        encryptedData,
        channel: 2,
        ivStr: iv
      }
      this.bindPhone(t,index)
    }
  },
  // 升级季度卡
  onUpgradeQuarterCard(e){
    let { id, shouldPayMoney,  hasJiKaCoupon } = this.data.list[1]
    this.payForMemberCard(id, shouldPayMoney, hasJiKaCoupon)
  },

  // 升级年卡
  onUpgradeYearCard(e){
    let { id, shouldPayMoney, hasJiKaCoupon } = this.data.list[2]
    this.payForMemberCard(id, shouldPayMoney, hasJiKaCoupon)
  },

  // 领取限量卡
  onUpgradeLimitCard(e){
    wx.$showToast("暂无活动,敬请期待!")
  },
  
  // 隐藏限量卡升级弹窗
  onHideLimitCard(e){
    this.setData({
      showLimitCardSuccess:false
    })
  },
  // 进入领福袋页面
  onPushToLuckyBag(){
    wx.navigateTo({
      url: '/pages/luckyBag/luckyBag',
    })
  }
}