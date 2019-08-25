// components/memberUpgrade/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
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
    onPushToMember(e){
      wx.switchTab({
        url: '/pages/member/member',
      })
      // 缓存会员等级
      wx.setStorage({
        key: 'member:type',
        data: 'upgrade',
      })
    },
    onHidden(e){
      this.setData({
        show:false
      })
    }
  }
})
