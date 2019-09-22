const addressToGeoCode = require("../../../utils/location.js").addressToGeoCode

module.exports = {
  onInputName(e){
    this.data.params.contact_name = e.detail.value
  },
  onInputPhone(e){
    this.data.params.contact_mobile = e.detail.value
  },
  onInputRegion(e) {
    let list = e.detail.value
    this.setData({
      'params.address.address': list.join(',')
    })
  },
  onInputAddress(e){
    this.data.params.address.address_detail = e.detail.value
  },
  onInputContent(e){
    this.data.params.content = e.detail.value
  },
  onUploadImage(e){
    this.selecteImage().then(data=>{
      let images = data.map(item=>{
        return item.data.absolute_url
      })
      this.data.params.image_urls = this.data.params.image_urls.concat(images)
      console.log("this.data.params.image_urls",this.data.params.image_urls)
      this.setData({
        'params.image_urls':this.data.params.image_urls
      })
      console.log(data)
    })
  },

  selecteImage() {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 9 - this.data.params.image_urls.length,
        success: (res) => {
          let list = []
          for (let path of res.tempFilePaths){
            let t = {
              filePath: path
            }
            console.log(res)
            wx.showLoading({
              title: '上传中...',
              duration: 10000
            })
            list.push(wx.$methods.fileUpload(t))
            // wx.$methods.fileUpload(t).then(res => {
            //   wx.hideLoading()
            //   resolve(res.data)
            //   console.log(res)
            // }).catch(err => {
            //   wx.hideLoading()
            //   reject(err)
            // })
          }
          Promise.all(list).then(res=>{
            wx.hideLoading()
            resolve(res)
          })
        
        },
        fail: err => {

        }
      })
    })
  },
  //  请求添加地址
  onSubmit(e) {
    console.log(this.data.params, this.check(true))
    this.setData({
      check: this.check(true)
    })
    if (this.data.check) {
      addressToGeoCode({ address: this.data.params.address.address }).then(res => {
        this.data.params.address.latitude = +res.latitude
        this.data.params.address.longitude = +res.longitude
        this.newCreate()
      })
    }
  },
  check(showToast = false) {
    let {
      main_industry_category,
      contact_name,
      contact_mobile,
      content,
      address
    } = this.data.params
    if (!content){
      if (showToast) {
        wx.$showToast('招聘信息未填写')
      }
      return false
    }

    if (!contact_name) {
      if (showToast) {
        wx.$showToast('联系人姓名未填写')
      }
      return false
    }

    if (!/1[0-9]{10}/.test(contact_mobile)) {
      if (showToast) {
        wx.$showToast('请检查联系人手机')
      }
      return false
    }

    if (!address.address) {
      if (showToast) {
        wx.$showToast('请选择省市区')
      }
      return false
    }

    if (!address.address_detail) {
      if (showToast) {
        wx.$showToast('详情地址未填写')
      }
      return false
    }
    return true
  }
}