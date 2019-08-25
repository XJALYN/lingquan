module.exports = {
  //获取
  checkoutOrdertrace() {
    wx.$showLoading()
    wx.$methods.checkoutOrdertrace(this.data.checkoutOrdertraceParam).then(res => {
      wx.hideLoading()
      console.log("数据", res.body)
      res.body.licLogisticList.map((item,index)=>{
        let list = item.context.match(/1[3|4|5|7|8][0-9]\d{4,8}/)
        let list2 = item.context.match(/\d{3,4}-\d{7,14}/)
        if(list){
         let phone = list[0]
          item.context = item.context.replace(phone,`<span style="color:red">${phone}</span>`)
        }
        if(list2){
          let mobile = list2[0]
          item.context = item.context.replace(mobile, `<span style="color:red">${mobile}</span>`)
        }
        if (index != 0) {
          item.context = `<div style="color:rgba(151, 151, 151, 1)">${item.context}</div>`
        }
        
      })
      
      console.log()
      this.setData({
        loaded:true,
        checkoutOrdertraceData: res.body,
      })
    })
  },
}