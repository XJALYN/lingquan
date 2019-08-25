module.exports = {
   //获取发现详情接口
  articleDetail() {
    wx.$methods.article(this.data.articleParam).then(res => {
      console.log("发现详情接口", res.body)
      this.setData({
        articleData: res.body,
      })
      this.data.shareArticleParam.articleId = res.body.articleId
      this.shareArticle()

    })
  },
  //获取分享好友内容接口
  shareArticle() {
    wx.$methods.shareArticle(this.data.shareArticleParam).then(res => {
      console.log("分享接口", res.body)
      this.setData({
        shareArticleData: res.body,
      })

    })
  },
}