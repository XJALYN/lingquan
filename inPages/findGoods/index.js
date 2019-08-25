// inPages/findGoods/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{type:Array,value:[]},
    clickLikeData: { type: Array, value: [] }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // likeNum:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onclickComdetail(e) { //点击商品列表到详情页面
      console.log("点击商品列表到详情页面", e)
      wx.$router.push("../../pages/commodityDetail/commodityDetail", { "prodCode": e.currentTarget.dataset.prodcode })
    },

    onclickSupport(e){ //发现点赞
      console.log("点赞", e)
      this.triggerEvent('Support', e.currentTarget.dataset)
    },

    onclickNoSupport(e){
      wx.showToast({
        title: '您已经点过赞了!',
        icon:"none",
        duration:1000
      })
    },
    onclickDetail(e){ //点击到详情页事件
      console.log("点击到详情页事件", e.currentTarget.dataset.articleid)
      let articleid = e.currentTarget.dataset.articleid
      wx.$router.push("/pages/findDetail/findDetail", { "articleId": articleid })
    },
    onPreviewImages(e) {
      let { list, index } = e.currentTarget.dataset
      console.log(index)
      wx.previewImage({
        current: list[index], // 当前显示图片的http链接
        urls: list // 需要预览的图片http链接列表
      })
    },
  }
})
