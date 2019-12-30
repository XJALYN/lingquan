module.exports = {
   //获取发现详情接口
  newsDetail() {
    let t = {
      id:+this.data.id
    }
    wx.$showLoading()
    wx.$methods.newsDetail(t).then(res => {
      wx.hideLoading()
      res.data.publish_time = wx.$toFormatTimeText(res.data.publish_time)
      this.setData({
        newsData: res.data,
      })
    })
  },

  // 最新评论
  newsCommentsList(){
    this.data.page_no = 1
    this.setData({
      noMore:false
    })
    let t = {
      "news_id": +this.data.id,
      "page_size":this.data.page_size,
      "page_no":this.data.page_no
    }
    
    wx.$methods.newsCommentsList(t).then(res=>{
      res.data.map(item=>{
        item.comment_time = wx.$toFormatTimeText(item.comment_time)
      })
      if(res.data.length < this.data.page_size){
        this.setData({
          noMore:true
        })
      }else{
        this.data.page_no++
      }
      this.setData({
        commentList:res.data
      })
      console.log(res)
    })
  },
  // 获取更多评论
  moreNewsCommentsList() {
    let t = {
      "news_id": +this.data.id,
      "page_size": this.data.page_size,
      "page_no": this.data.page_no
    }
    wx.$methods.newsCommentsList(t).then(res => {
      res.data.map(item => {
        item.comment_time = wx.$toFormatTimeText(item.comment_time)
      })
      let list = res.data
      if(list.length < this.data.page_size){
        this.setData({
          noMore:true
        })
      }else{
        this.data.page_no++
      }
      this.data.commentList = this.data.commentList.concat(list) 
      this.setData({
        commentList: this.data.commentList
      })
      console.log(res)
    })
  },


  newsCommentsReply(){

  },

  // 发表新的评论
  newsComments(){
    let t = {
      "news_id": +this.data.id,
      "content": this.data.comment
    }
    wx.$showLoading()
    wx.$methods.newsComments(t).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '发表成功',
      })
      this.newsCommentsList()
    })
  },
  // 获取用户信息
  usersProfile(){
    wx.$methods.usersProfile().then(res=>{
      this.data.is_certified_mobile = res.data.is_certified_mobile
      console.log(res)
    })
  }
  
}