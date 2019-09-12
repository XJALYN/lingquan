module.exports = {
  newList(){
    let t = {
      "category_id": 0,
      "page_no": 1,
      "page_size": 30
    }
    wx.$methods.newList(t).then(res=>{
      this.setData({
        newList:res.data
      })
    })
  },
  advertisingBanners(){
    let t = {
      "category_id": 0,
    }
    wx.$methods.advertisingBanners(t).then(res=>{
      this.setData({
        bannerList:res.data
      })
    })
  }
}