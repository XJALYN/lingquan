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
    this.setData({
      showMenuAlert: true
    })
  }
}