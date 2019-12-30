// components/navigationBar/index.js
const geoCodeToAddress = require("../../utils/location.js").geoCodeToAddress
const addressToGeoCode = require("../../utils/location.js").addressToGeoCode
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:""
    },
    showBack:{
      type: Boolean,
      value:false
    },
    showHome:{
      type:Boolean,
      value:false
    },
    backgroundColor:{
      type:String,
      value:"white"
    },
    color:{
      type:String,
      value:"black"
    },
    showLocation:{
     type:Boolean,
     value:false
    },
    country:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   showCustomAddress:false
  },
  ready(){
    console.log(getCurrentPages())
    this.setData({
      showBack: getCurrentPages().length > 1
    })
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapBack(){
      wx.navigateBack({
      })
    },
    onTapHome(){
      wx.switchTab({
        url: '/pages/index/index',
      })
    },

    // 选择地址
    onChangeAddress(e){
      let district = e.detail.value[2]
      addressToGeoCode({ address: district }).then(res => {
        let t = {
          district: district,
          longitude: res.longitude,
          latitude: res.latitude
        }
        console.log(t)
        this.triggerEvent("changeaddress",t)
      })
     
    },
    bindopensetting(e){
      if (e.detail.authSetting['scope.userLocation']){
        this.setData({
          showCustomAddress:false
        })
        this.triggerEvent("GetLocation")
      }
     console.log(e)
    },
    onSelectedAddress(){
      wx.chooseLocation({
        success: (res) =>{
         console.log(res)
         let t = {
           location: `${res.longitude},${res.latitude}`
         }
          geoCodeToAddress(t).then(data=>{
            let district = data.regeocode.addressComponent.district
            let t = {
              district:district,
              longitude:res.longitude,
              latitude: res.latitude
            }
            this.triggerEvent("changeaddress",t)
            console.log(res)
          })
        },
        fail:res=>{
          this.setData({
            showCustomAddress:true
          })
        }
      })
    }
  }
})
