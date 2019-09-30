module.exports = {
  onPreviewImages(e) {
    let { list, index } = e.currentTarget.dataset
    list = list.map(item=>{
      return item.image_url
    })
    console.log(list, list[index].image_url)
    wx.previewImage({
      current: list[index].image_url, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  onclickComdetail(e){ //点击到商品详情页面
    wx.$router.push("../../pages/commodityDetail/commodityDetail", { "prodCode": e.currentTarget.dataset.prodcode })
    console.log("e.currentTarget.dataset.prodcode", e)
  },
  // 点击或首页
  onPushToHome(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  onCallPhone(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  onBindToLike(e){
    let t = {
      news_id:e.currentTarget.dataset.id
    }
    wx.$methods.likeNews(t).then(res=>{
        this.setData({
          'newsData.is_liked':true,
          'newsData.liked_count': ++this.data.newsData.liked_count
        })
    })
  },
  onBindToUnLike(e){
    let t = {
      news_id: e.currentTarget.dataset.id
    }
    wx.$methods.unLikesNews(t).then(res => {
      this.setData({
        'newsData.is_liked': false,
        'newsData.liked_count': --this.data.newsData.liked_count
      })
    })
  },
  // 绑定手机成功
  onBindPhoneSuccess(e){
    this.setData({
      showAuthorPhone:false
    })
    this.usersProfile()
  },
  // 关闭绑定手机
  onCloseBindPhone(e){
    this.setData({
      showAuthorPhone: false
    })
  }

}