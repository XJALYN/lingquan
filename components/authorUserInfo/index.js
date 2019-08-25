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
          title: '授权中...',
          duration: 5000
        })
        wx.login({
          success:e =>{
            wx.getUserInfo({
              success:res=>{
                let t = {
                  code:e.code,
                  ivStr: res.iv,
                  channel:2,
                  encryptedData:res.encryptedData
                }
                wx.$methods.authorLogin(t).then(res=>{
                   wx.hideLoading()
                   wx.$db.userType = res.body.userType
                   wx.$db.token = res.body.accessToken
                   wx.$db.unionId = res.body.unionId
                   console.log("修改用户信息", res)
                   this.triggerEvent('success')
                   wx.setStorageSync("home:newUserWelfare", true)
                })
              }
            })
          }
        })
      }else{
        let model = wx.getSystemInfoSync().model
        if(model == "MI 8"){
          this.setData({
            openSetting: true
          })
        }
      }
    }
  }
})
