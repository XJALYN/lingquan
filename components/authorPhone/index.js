// components/authorPhone/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
          code: res.code
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
      this.triggerEvent("hide")
    },
    onGetUserPhone(e){
      let { encryptedData, errMsg, iv } = e.detail
      if (errMsg == 'getPhoneNumber:ok') {
        let t = {
          code: this.data.code,
          encrypted_data:encryptedData,
          iv: iv
        }
        this.authoPhone(t)
      }
    },
    // 获取绑定用户手机号码
    authoPhone(t) {
      wx.$methods.authoPhone(t).then(res => {
        this.triggerEvent("success")
        wx.showToast({
          title: '绑定手机成功',
        })
      }).catch(err=>{
        this.triggerEvent("hide")
      })
    },
  }
})
