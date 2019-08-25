module.exports = {
  onPushToAddressAdd(){
    wx.$router.push('/pages/addressAdd/addressAdd')
  },
  onSetDefault(e) {
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
        if(res.confirm){
          let id = e.currentTarget.dataset.id
          this.addressDelete(id)
        }
        
      }
    })
  }
}