module.exports = {
  
  getMyCountListByToken(){
    this.setData({
      noMore:false
    })
    this.data.pageNum = 1
    let t = {
      pageSize:this.data.pageSize,
      pageNum:this.data.pageNum
    }
    wx.$showLoading()
    wx.$methods.getMyCountListByToken(t).then(res=>{
      wx.hideLoading()
      if(res.body.length < this.data.pageSize){
        this.setData({
          noMore:true
        })
      }
      this.setData({
        list:res.body
      })
    })
    this.data.pageNum ++
  },
  getMoreMyCountListByToken() {
 
    let t = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }

    wx.$methods.getMyCountListByToken(t).then(res => {
      if (res.body.length < this.data.pageSize) {
        this.setData({
          noMore: true
        })
      }
      this.data.list = this.data.list.concat(res.body)

      this.setData({
        list: this.data.list
      })
    })
    this.data.pageNum++
  },

}