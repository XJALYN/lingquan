module.exports = {
  onPushToGoodsDetail(e){
    let prodCode = e.currentTarget.dataset.prodcode
    wx.navigateTo({
      url: `/pages/commodityDetail/commodityDetail?prodCode=${prodCode}`,
    })
  }
}