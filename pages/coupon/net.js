module.exports = {
  // 获取优惠券数量
  countMyCouponList(){
    wx.$methods.countMyCouponList().then(res=>{
      this.setData({
        couponCounts:res.body
      })
    })
  },
  // 获取我的券列表
  getMyCouponList(){
    this.data.pageNum = 1
    let t = {
      type: this.data.filterIndex
    }
    this.setData({
      noMore:false
    })
    wx.$showLoading()
    wx.$methods.getMyCouponList(t).then(res=>{
      wx.hideLoading()
      this.setData({
        list:res.body
      })
    })
  },
  // 获取更多优惠券
  getMoreMyCouponList(){
    let t = {
      type: this.data.filterIndex,
      pageSize:this.data.pageSize,
      pageNum:this.data.pageNum
    }
    wx.$methods.getMyCouponList(t).then(res => {
      wx.hideLoading()
      let list = res.body
      if(list.length < this.data.pageSize){
        this.setData({
          noMore:true
        })
      }
      this.data.list = this.data.list.concat(list)
      this.setData({
        list: this.data.list
      })
    })
  }
}