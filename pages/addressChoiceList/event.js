module.exports = {
  onPushToAddressAdd(){
    wx.$router.push('/pages/addressAdd/addressAdd')
  },
  onSetDefault(e) {
    console.log("点击设置默认地址")
   let id = e.currentTarget.dataset.id
    this.addressSetDefault(id)
  },

  onEdit(e) {
    let item = e.currentTarget.dataset
    item.addressId = item.id
    wx.$router.push('/pages/addressEdit/addressEdit',item)
  },
  onDelete(e) {
    wx.showModal({
      title: '确定要删除该地址吗?',
      content: '',
      confirmColor: "#F61B6D",
      success: res => {
        if (res.cancel) {
          return;
        } else {
          let id = e.currentTarget.dataset.id
          this.addressDelete(id)
        }
        
      }
    })
  },
  onSelectedAddress(e){
   let address = e.currentTarget.dataset.address
   wx.setStorageSync("address", JSON.stringify(address))
   wx.navigateBack({
   })
  }
}