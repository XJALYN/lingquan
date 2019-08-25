// components/navigationBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:""
    },
    showBack:{
      type: Boolean,
      value:false
    },
    showHome:{
      type:Boolean,
      value:false
    },
    backgroundColor:{
      type:String,
      value:"white"
    },
    color:{
      type:String,
      value:"black"
    },
    showLocation:{
     type:Boolean,
     value:false
    },
    country:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready(){
    console.log(getCurrentPages())
    this.setData({
      showBack: getCurrentPages().length > 1
    })
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapBack(){
      wx.navigateBack({
      })
    },
    onTapHome(){
      wx.switchTab({
        url: '/pages/index/index',
      })
    },

    // 选择地址
    onChangeAddress(e){
      this.triggerEvent("changeaddress",e.detail)
    }
  }
})
