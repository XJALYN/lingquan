module.exports = {
  // 
  onInputName(e){
    this.data.params.contact = e.detail.value
    this.setData({
      check: this.check()
    })
  },
  onInputPhone(e){
    this.data.params.phone = e.detail.value
    this.setData({
      check: this.check()
    })
   
  },
  onInputAddress(e){
    this.data.params.detail = e.detail.value
    this.setData({
      check: this.check()
    })
  
  },
  onInputPostCode(e){
    this.data.params.postcode = e.detail.value
    this.setData({
      check: this.check()
    })
   
  
  },
  onInputRegion(e){
    let list = e.detail.value
    this.setData({
      'params.province': list[0],
      'params.city':list[1],
      'params.area':list[2]
    })
    this.setData({
      check: this.check()
    })
  },

  //  请求添加地址
  onAddressAdd(e){
    console.log(this.data.params)
    this.setData({
      check:this.check(true)
    })
    if (this.data.check) {
      this.addressAdd()
    }
   
  },
  check(showToast=false){
    let  {
      area,
      province,
      city,
      contact,
      phone,
      postcode,
      detail
    } = this.data.params
    if (!contact){
      if (showToast){
        wx.$showToast('收件人未填写')
      }
      return false
      
    }
    if (!/1[0-9]{10}/.test(phone)){
      if (showToast) {
        wx.$showToast('请输入11位手机号码')
      }
      return false
    }

    if (!province){
      if (showToast) {
        wx.$showToast('请选择省市区')
      }
      return false
    }
    if (postcode&&postcode.length != 6){
      if (showToast) {
        wx.$showToast('邮政编码格式不正确')
      }
      return false
      
    }
    if (!detail){
      if (showToast) {
        wx.$showToast('详情地址未填写')
      }
      return false
    }
    return true
  }
}