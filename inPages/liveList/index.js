// inPages/liveList/index.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 进入播放页面
    onPushToLivePlayer(e){
      let item = e.currentTarget.dataset.item
      wx.$router.push("/pages/livePlayer/livePlayer", item)
    }
  }
})
