module.exports = {
  onPushToSearch(e){
    let type = e.currentTarget.dataset.type
    wx.$router.push("/pages/search/search",{type})
  },
  onPushToGoodsList(e){
    wx.navigateTo({
      url: '/pages/shopCenter/shopCenter',
    })
  },
  onclickSupport(e) { //点击发现里得点赞
    this.data.clickLikeParam.articleId = e.detail.articleid;
    this.clickLike(e.detail.index)
  },
  onclickZc(e) { //点击种草列表种草
    this.data.zcParam.articleId = e.detail.articleid
    this.clickZc(e.detail.index)
  },
  // 添加购物车
  onShopCarAdd(e){
    console.log(e)
    let prodcode = e.detail.prodcode
    this.shopCarAdd(prodcode)
  },
  // 点击一分钟了解鲲美会
  onTapOneMinute(e){
   let index = e.detail.index
    this.setData({
      menuIndex: index,
      hideOneMinute:true
    })
    wx.setStorageSync("home:hideOneMinute", true)
  },
  refreshData(){
    let value = this.data.menuList[this.data.menuIndex].value
    this.setData({
      noMore:false
    })
    if (value == 0) {
      this.getHomePage()
      return
    }
    if (value == 1) {
      wx.stopPullDownRefresh()
      return
    }
    // 直播列表
    if (value == 2) {
      
      return
    }

    // 发现好物列表
    if (value == 3) {
      this.discoveryList();
    }

    // 抖音爆款
    if (value == 4) {
      this.getDouYiList()

    }
    //种草列表
    if (value == 5) {
      this.getRecommendList()
    }

    // 自营好物
    if (value == 6) {
      this.getHWZYList()
      return
    }
    if (value == 7) {
      this.nearDateGoodsList()
    }
  },
  // 隐藏小程序
  onHideGuideAddProgram(e){
    this.setData({
      showGuideAddProgram:false
    })
  }
}