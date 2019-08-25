// inPages/recommend/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    zclist: { type: Array, value: [] },
    clickzcData: { type: Array, value: []}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onclickZc(e) { //点击种草
      console.log("种草", e)
      this.triggerEvent('Zc', e.currentTarget.dataset)
    },
    goWeixin(e){
      console.log("点击",e)
      
      wx.$router.push("../../pages/weixin/weixin", { "href": encodeURI(e.currentTarget.dataset.href) })
    },
    onclickNo(e) { //已经种草了
      console.log(e)
      wx.showToast({
        title: '已经种草了哦！',
        icon: 'none',
        duration: 500
      })
    }
  }
})
