 module.exports = {
   //获取售后详情接口
   getRefundRecord() {
     wx.$methods.getRefundRecord(this.data.getRefundRecordParam).then(res => {
       console.log("商品详情数据", res.body)
       wx.stopPullDownRefresh()
       this.setData({
        getRefundRecordData: res.body,
       })

     })
   },
 }