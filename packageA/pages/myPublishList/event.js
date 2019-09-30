module.exports = {
  onPushToPublish(e){
    let item = e.currentTarget.dataset.item
     wx.$router.push(item.path,item)
  },
  onHideMenuAlert(e){
    this.setData({
      showMenuAlert:false
    })
  },
  onShowMenuAlert(e){
    if (!this.data.is_certified_mobile){
      this.setData({
        showAuthorPhone: true
      })
      return
    }
    this.setData({
      showMenuAlert: true
    })
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