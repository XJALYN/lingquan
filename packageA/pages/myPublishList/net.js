module.exports = {

  // 我的发布
  myPublishedList(){
    wx.$showLoading()
    this.data.params.page_no = 1
    wx.$methods.myPublishedList(this.data.params).then(res=>{
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log(res)
      this.setData({
        newsList: res.data
      })
      
      if(res.data.length < this.data.params.page_size){
       this.setData({
         noMore:true
       })
      }else{
        this.data.params.page_size++
      }
    })
  },
  moreMyPublishedList(){
    wx.$methods.myPublishedList(this.data.params).then(res => {
      let list = res.data
      if(list.length < this.data.params.page_size){
        this.setData({
          noMore:true
        })
      }else{
        this.data.params.page_size++
      }
      
      this.data.newsList = this.data.newsList.concat(list)
      this.setData({
        newsList: this.data.newsList
      })
    })
  },
  
  // 获取分类
  newsCategories() {
    wx.$methods.newsCategories().then(res => {
      console.log(res)
      this.setData({
        categories: res.data
      })
    })
  },
  newsDelete(index,t){
    wx.$showLoading()
    wx.$methods.newsDelete(t).then(res=>{
      wx.hideLoading()
      this.data.newsList.splice(index,1)
      this.setData({
        newsList:this.data.newsList
      })
    })
  }
}