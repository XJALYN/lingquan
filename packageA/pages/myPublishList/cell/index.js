module.exports = {
  // 跳转招聘详情页面
  onPushToJobDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/jobDetail/jobDetail?id=' + id,
    })
  },
  onDeleteNews(e){
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let t = {
      id:parseInt(id)
    }
    wx.showModal({
      title: '确定要删除此内容吗?',
      content: '',
      success:res=>{
        if(res.confirm){
          this.newsDelete(index,t)
        }
      }
    })
  }
}