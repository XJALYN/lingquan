// components/authorAlert/index.js
let author = require('../../serve/author.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type:Boolean,
      value:false
    },
    type:{
      type:String,
      value:0  // 0 代表用户授权 1.代表绑定用户手机
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   code:'',
   openSetting:false
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    bindgetuserinfo(e){
      if (e.detail.errMsg == "getUserInfo:ok"){
        wx.showLoading({
          title: '登录中...',
          duration: 5000
        })
        console.log(e)
        author.login().then(res => {
          wx.hideLoading()
          this.setData({
            show: false
          })
          wx.setStorageSync("home:newUserWelfare", true)
        })
        this.triggerEvent('hide')
      }else{
        let model = wx.getSystemInfoSync().model
        if(model == "MI 8"){
          this.setData({
            openSetting: true
          })
        }
      }
    },
    bindgetphonenumber(e){
      let { encryptedData, errMsg, iv } = e.detail
      if (errMsg == 'getPhoneNumber:ok') {
        let t = {
          code: this.data.code,
          encryptedData,
          channel: 3,
          ivStr: iv
        }
        wx.$methods.bindPhone(t).then(res=>{
          this.setData({
            show: false
          })
        })
      }
    }
  }
})
