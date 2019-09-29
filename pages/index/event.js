const geoCodeToAddress = require("../../utils/location.js").geoCodeToAddress
module.exports = {
  onChangeAddress(e){
    console.log(e)
    this.setData({
      currentCountry : e.detail.district
    })
    this.data.newsParams.longitude = e.detail.longitude,
    this.data.newsParams.latitude = e.detail.latitude
    console.log()
    let t = {
      longitude: +e.detail.longitude,
      latitude: +e.detail.latitude,
      district: e.detail.district
    }
    this.reportsLocation(t)
  },
  getLocation(){
    wx.getLocation({
      success: (res) => {
        let t = {
          location: `${res.longitude},${res.latitude}`
        }
        geoCodeToAddress(t).then(data => {
          let district = data.regeocode.addressComponent.district
          this.setData({
            'currentCountry': district
          })
          let t = {
            district: district,
            longitude: res.longitude,
            latitude: res.latitude
          }
          console.log(t)
          this.reportsLocation(t)
        })
        console.log(res)
      },
      fail: res => {
        this.setData({
          'currentCountry':"全国"
        })
        this.newsList()
        console.log(res)
      }
    })
  }
}