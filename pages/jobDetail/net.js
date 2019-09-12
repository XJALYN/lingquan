module.exports = {
   //获取发现详情接口
  newsDetail() {
    let t = {
      id:+this.data.id
    }
    wx.$methods.newsDetail(t).then(res => {
      console.log("发现详情接口", res.body)
      this.setData({
        newsData: res.data,
      })
    })
  }
}