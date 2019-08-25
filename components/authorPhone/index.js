// components/authorPhone/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    needPhone:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   code:''
  },
  ready() {
    wx.login({
      success: res => {
        this.setData({
          code: res.code,
          ivStr: res.iv,
          encryptedData: res.encryptedData,
        })
        console.log(res)
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onHide(){
     this.setData({
       needPhone:false
     })
    },
    onGetUserPhone(e){
      let { encryptedData, errMsg, iv } = e.detail
      if (errMsg == 'getPhoneNumber:ok') {
        let t = {
          code: this.data.code,
          encryptedData,
          channel: 3,
          ivStr: iv
        }
        this.bindPhone(t)
      }
    },
    // 获取绑定用户手机号码
    bindPhone(t) {
      wx.$methods.bindPhone(t).then(res => {
        this.setData({
          needPhone: false
        })
        wx.showToast({
          title: '绑定手机成功',
        })
        let pages = getCurrentPages()
        setTimeout(()=>{
          if (pages.length > 0) {
            pages[0].onLoad(pages[0].options)
            //wx.$router.reLaunch("/" + pages[0].route, pages[0].options)
          }
        },1000)
         
      }).catch(err=>{
        this.setData({
          needPhone: false
        })
      })
    },
  }
})
