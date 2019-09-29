module.exports = {
  // 跳转招聘详情页面
  onPushToJobDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/jobDetail/jobDetail?id=' + id,
    })
  }
}