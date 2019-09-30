module.exports = {
  onInputFocus(){
    this.setData({
      showCommentBtn:true
    })
  },
  onInputBlur(){
    this.setData({
      showCommentBtn: false
    })
  },
  onInputComments(e){
   this.setData({
     comment:e.detail.value
   })
  },
  onPublishComment(e){
    console.log(e)
    if (!this.data.is_certified_mobile){
      this.setData({
        showAuthorPhone:true
      })
      return
    }
    if(this.data.comment.length){
      this.newsComments()
    }
  }
}