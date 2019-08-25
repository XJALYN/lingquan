module.exports = {
  getAddressList(){
    wx.$showLoading()
    wx.$methods.addressList().then(res=>{
      wx.$hideLoading()
      this.setData({
        list:res.body
      })
    }).catch(wx.$hideLoading)
  },
  addressDelete(id){
    wx.$methods.addressDelete({ addressId:id}).then(res=>{
      this.getAddressList()
      setTimeout(() => {
        wx.$showToast('删除成功')
      }, 500)
    })
  },
  addressSetDefault(id){
    wx.$methods.addressSetDefault({ addressId: id }).then(res => {
     
      this.getAddressList()
      setTimeout(() => {
        wx.$showToast('设置成功')
      }, 500)
    })
  }
}