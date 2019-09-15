module.exports = {
  // 跳转到工具页面
  onPushToTools(e){
    wx.$showToast("敬请期待!")
  },

  onPushToSetting(e){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
   
  },
  onPushToVipBuyRecord(){
    wx.navigateTo({
      url: '/pages/vipBuyRecord/vipBuyRecord',
    })
  },
  onPushToMember(){
    wx.switchTab({
      url: '/pages/member/member',
    })
  },
  // 进入订单列表页面
  onPushToOrderList(e) {
    let index = e.currentTarget.dataset.index
    wx.$router.push('/pages/orderList/orderList', { filterIndex: index})
  },
  // 跳转到我的分享金
  onPushToShareMoney(e){
    wx.$router.push('/pages/shareMoneyList/shareMoneyList')
  },
  onPushToMyCoupon(){
    wx.$router.push('/pages/coupon/coupon')
  },

  // 我的积分页面
  onPushToMyIntegral(){
    wx.$router.push("/pages/myIntegral/myIntegral")
  },

  // 我的余额
  onPushToMyBalance(){
    wx.$router.push("/pages/myBalance/myBalance")
  },

  onPushToPath(e){
     wx.$router.push(e.currentTarget.dataset.path)
  },

  onAuthorSuccess(){
    this.usersProfile()
  }
}