// components/banner/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bannerIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // banner页面切换
    onSwiperChange(e) {
      console.log(e)
      this.setData({
        bannerIndex: e.detail.current
      })
    },
  }
})
