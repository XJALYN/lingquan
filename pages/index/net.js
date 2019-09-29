module.exports = {

  newsList(){
    this.data.newsParams.page_no = 1
    this.setData({
      'newsParams.noMore':false
    })
    wx.$showLoading()
    wx.$methods.newList(this.data.newsParams).then(res=>{
      wx.hideLoading()
      wx.stopPullDownRefresh()
      res.data.map(item=>{
        item.show_images = item.images.slice(0,3)
      })
      this.setData({
        newsList:res.data
      })
      if (res.data.length < this.data.newsParams.page_size){
        this.setData({
          'newsParams.noMore':true
        })
      }else{
        this.data.newsParams.page_no ++
      }
    })
  },

  moreNewsList(){
    wx.$methods.newList(this.data.newsParams).then(res => {
      let list = res.data
      res.data.map(item => {
        item.show_images = item.images.slice(0, 3)
      })
      if (list.length < this.data.newsParams.page_size) {
        this.setData({
          'newsParams.noMore': true
        })
      } else {
        this.data.newsParams.page_no++
      }
      this.data.newsList = this.data.newsList.concat(list)
      this.setData({
        newsList: this.data.newsList
      })
    })
  },

  advertisingBanners(){
    let t = {
    }
    wx.$methods.advertisingBanners(t).then(res=>{
      this.setData({
        bannerList:res.data
      })
    })
  },
  reportsLocation(t){
    console.log(t)
    wx.$methods.reportsLocation(t).then(res=>{
      this.newsList()
    }).catch(err=>{
      console.log("出粗了",err)
    })
  }

}