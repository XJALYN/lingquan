module.exports = {
  // 获取分享金列表
  getRemainderRecordListByToken(){
   let t = {
    pageSize: 20,
    pageNum: 1,
    startDate: this.data.startDate,
    endDate: this.data.endDate
   }
    wx.$showLoading()
   wx.$methods.getRemainderRecordListByToken(t).then(res => {
    wx.hideLoading()
    if(res.body.length < this.data.pageSize){
      this.setData({
        noMore:true
      })
    }
    this.setData({
      list:res.body
    })
    this.data.pageNum ++
   })
  },
  // 获取更多分享金
  getMoreRemainderRecordListByToken(){
    wx.$methods.getRemainderRecordListByToken(t).then(res => {
      console.log(res)
      if (res.body.length < this.data.pageSize) {
        this.setData({
          noMore: true
        })
      }
      this.data.list = this.data.list.concat(res.body)
      this.setData({
        list:this.data.list
      })
    })
  }
}