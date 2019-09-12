// components/jobCell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     data:{
       type:Object,
       value:{}
     }
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
    // 跳转招聘详情页面
    onPushToJobDetail(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/jobDetail/jobDetail?id=' + id,
      })
    }
  }
})
