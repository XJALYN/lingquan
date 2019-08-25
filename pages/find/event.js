module.exports = {
 
  onChangeMenu(e){
    this.setData({
      menuIndex:e.currentTarget.dataset.index
    })
    if(this.data.menuIndex == 0){
      this.discoveryList();
    }
    if (this.data.menuIndex == 1) {
      this.getColumnItemList();//抖音列表
    }
    if (this.data.menuIndex == 2) {
      this.getRecommendList() //种草列表
    }
    this.setData({
      noMore:false
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  // 计入购物车
  onShopCarAdd(e) {
    console.log(e)
    let prodcode = e.detail.prodcode
    this.shopCarAdd(prodcode)
  },
  onclickSupport(e){ //点击发现里得点赞
    console.log("值读书", e.detail.articleid, e.detail.index)
    this.data.clickLikeParam.articleId = e.detail.articleid;
    this.clickLike(e.detail.index) 
  },
   onclickZc(e) { //点击种草列表种草
     console.log("种草列表种草", e.detail.articleid, e.detail.index)
     this.data.zcParam.articleId = e.detail.articleid
     this.clickZc(e.detail.index)
    // this.data.clickLikeParam.articleId = e.detail.articleid;
    // this.clickLike(e.detail.index)
  }
}