const addressToGeoCode = require("../../utils/location.js").addressToGeoCode

module.exports = {
  onInputCategory(e){
    let value = e.detail.value
    let categorie = this.data.categories[value]
    this.setData({
      'params.main_industry_category_name':categorie.name,
      'params.main_industry_category':categorie.code
    })
    console.log(e)
  },
  // 
  onInputCompanyName(e){
    this.data.params.name= e.detail.value
  },
  onInputName(e){
    this.data.params.contact_name = e.detail.value
  },
  onInputPhone(e){
    this.data.params.contact_mobile = e.detail.value
   
  },
  onInputAddress(e){
    this.data.params.address.address_detail = e.detail.value
  },
  onInputPostCode(e){
    this.data.params.postcode = e.detail.value
  },
  onInputRegion(e){
    let list = e.detail.value
    this.setData({
      'params.address.address': list.join(',')
    })
  },
  onInputBusinessLicense(e){
    this.data.params.license_no = e.detail.value
  },
  // 请输入主营业务
  onInputBusinessDescribe(e){
    this.data.params.main_business = e.detail.value
  },
  onChooseImage(e){
    this.selecteImage().then(data => {
      console.log("data", data)
      this.setData({
        'params.license_url': data.absolute_url
      })
    })
  },
  selecteImage(){
   return new Promise((resolve,reject)=>{
   wx.chooseImage({
    count: 1,
    success: (res) => {
      let t = {
        filePath: res.tempFilePaths[0]
      }
      console.log(res)
      wx.showLoading({
        title: '上传中...',
        duration: 10000
      })
      wx.$methods.fileUpload(t).then(res => {
        wx.hideLoading()
        resolve(res.data)
        console.log(res)
      }).catch(err => {
        wx.hideLoading()
        reject(err)
      })
    },
    fail: err => {

    }
  })
})
},
  onChooseLogoImage(){
    this.selecteImage().then(data=>{
      console.log("data", data)
      this.setData({
        'params.logo_url':data.absolute_url
      })
    })
  },


  //  请求添加地址
  onAddressAdd(e){
    console.log(this.data.params)
    this.setData({
      check:this.check(true)
    })
    if (this.data.check) {
      addressToGeoCode({ address: this.data.params.address.address}).then(res => {
        this.data.params.address.latitude = +res.latitude
        this.data.params.address.longitude = +res.longitude
        this.certifyEnterprise()
      })

      
    }
   
  },
  check(showToast=false){
    let  {
      main_business,
      main_industry_category,
      logoUrl,
      contact_name,
      contact_mobile,
      license_url,
      license_no,
      name,
      address
    } = this.data.params
    if (!name){
      if (showToast){
        wx.$showToast('店铺名称未填写')
      }
      return false
    }
    if (!license_no){
      if (showToast) {
        wx.$showToast('营业执照编号未填写')
      }
      return false
    }

    if (!license_url) {
      if (showToast) {
        wx.$showToast('请上传营业执照')
      }
      return false
    }

    if (!contact_name) {
      if (showToast) {
        wx.$showToast('联系人姓名未填写')
      }
      return false
    }

    

    if (!/1[0-9]{10}/.test(contact_mobile)){
      if (showToast) {
        wx.$showToast('请检查联系人手机')
      }
      return false
    }

    if (!address){
      if (showToast) {
        wx.$showToast('请选择省市区')
      }
      return false
    }

    if (!address.address_detail){
      if (showToast) {
        wx.$showToast('详情地址未填写')
      }
      return false
    }
    return true
  }
}