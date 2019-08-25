module.exports = {
  refundRecordList() {
    this.setData({
      noMore: false
    })
    this.data.pageNum = 1
    let t = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    wx.showLoading({
      duration:5000
    })
    wx.$methods.refundRecordList(t).then(res => {
      wx.hideLoading()
      if(res.body.length < this.data.pageSize){
        this.setData({
          noMore:true
        })
      }
      this.setData({
        list: res.body
      })
      this.data.pageNum ++
    })
  },
  // 获取更多用户退款记录
  moreRefundRecordList() {
   
    let t = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    wx.$methods.refundRecordList(t).then(res => {
      if (res.body.length < this.data.pageSize) {
        this.setData({
          noMore: true
        })
      }
      this.data.list = this.data.list.concat(res.body)
      this.setData({
        list: this.data.list
      })
      this.data.pageNum++
    })
  }
}