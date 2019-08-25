module.exports = {

  //  选择开始日期
  onSelectedStartDate(e){
   this.setData({
      startDate:e.detail.value
   })
  },

  // 选择结束日期
  onSelectedEndDate(e){
    this.setData({
      endDate: e.detail.value
    })
  },
  onSearch(){
    if (this.data.endDate < this.data.startDate) {
      wx.$showToast("开始日期不能大于结束日期")
      return
    }
    this.getRemainderRecordListByToken()
  }
}