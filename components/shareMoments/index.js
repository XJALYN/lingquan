// components/shareMoments/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     src:{
       type:String,
       value: ""
       }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onclickSaveImg() {
      let that=this
      wx.showLoading({
        title: '保存中...',
        duration:5000
      })
      wx.downloadFile({
        url: that.properties.src, //仅为示例，并非真实的资源
        success(res) {
          console.log("报存情况",res)
          wx.hideLoading()
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode ==200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功',
                })
                that.triggerEvent("hidden")
              }, fail(error) {
                console.log(error)
                wx.showToast({
                  title:'保存失败',
                })
              }
            })
          }
        }
      })



    
    },
    onHidden(){
      this.triggerEvent("hidden")
    }

  },
 
})
