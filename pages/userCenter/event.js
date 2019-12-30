module.exports = {
  onPushToSetting(e){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },

  onPushToPath(e){
    let item = e.currentTarget.dataset.item
    if (item.authorPhone && !this.data.userInfo.is_certified_mobile) {
      this.setData({
        showAuthorPhone: true
      })
    return
    }
    if (item.needMerchant && (this.data.userInfo.certified_status == -1 || this.data.userInfo.certified_status == 2)){
      wx.showModal({
        title: '此操作需要认证商家',
        content: '',
        confirmText:"去认证",
        success:res=>{
          if(res.confirm){
            this.onPushToMerchantRegister()
          }
        }
      })
      return
    }
    wx.$router.pushByInfo(item)
  },
  onPushToMerchantRegister(e){
    if (this.data.userInfo.certified_status == -1 || this.data.userInfo.certified_status == 2){
      wx.$router.push("/pages/merchantRegister/merchantRegister")
    }
  },

  onAuthorSuccess(){
    this.usersProfile()
  },


  // 绑定手机成功
  onBindPhoneSuccess(e) {
    this.setData({
      showAuthorPhone: false
    })
    this.usersProfile()
  },
  // 关闭绑定手机
  onCloseBindPhone(e) {
    this.setData({
      showAuthorPhone: false
    })
  }
}