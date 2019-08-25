module.exports = {
  // 商品评价
  onGoodsStarChange(e){
    console.log(e)
    let {index,value} = e.detail
    this.setData({
      [`goodsList[${index}].rate`]:value
    })
  },
  // 选择商品
  onSelectedImage(e){
    let index = e.currentTarget.dataset.index
    wx.chooseImage({
      count:"9",
      sizeType:"compressed",
      success: (res)=>{
        for(let tempUrl of res.tempFilePaths){
          console.log(tempUrl)
          wx.uploadFile({
            url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
            filePath: tempUrl,
            name: 'file',
            formData: {
              'user': 'test'
            },
            success:(res)=>{
              const data = res.data
            }
          })
        }
      },
    })
  }
}