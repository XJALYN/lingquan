module.exports = {
 
  onChangeMenu(e){
    this.setData({
      menuIndex:e.currentTarget.dataset.index
    })
    if(this.data.menuIndex == 0){
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