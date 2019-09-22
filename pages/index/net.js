module.exports = {
  newList(){
    let t = {
      "category_id": 0,
      "page_no": 1,
      "page_size": 30
    }
    this.data.jobParams.page_no = 1
    wx.$methods.newList(this.data.jobParams).then(res=>{
      this.setData({
        newList:res.data
      })
      if (res.data.length < this.data.jobParams.page_size){
        this.setData({
          noMore:true
        })
      }else{
        this.data.jobParams.page_no ++
      }
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
  }
}