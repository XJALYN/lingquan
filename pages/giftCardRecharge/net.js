module.exports = {
  bindGiftCard(){
    let t = {
      pass:true,
      cardNo: this.data.cardNo,
      cardPass: this.data.cardPass
    }
    console.log(t)
    wx.showLoading({
      title: '加载中...',
      mask:true,
      duration:5000
    })
    wx.$methods.bindGiftCard(t).then(res=>{
      wx.hideLoading()
      console.log(res)
      wx.showToast({
        title: '绑定成功',
      })
      this.setData({
        cardNo: "",
        cardPass: ""
      })
      this.getGiftCardRecord()
    }).catch(res=>{
      wx.hideLoading()
      console.log(res)
      let errorCode = res.data.exception.errorCode
      
      if(errorCode=="1018"){
        this.setData({
          isCardNoError:true
        })
        return
      }
      if (errorCode =="1019"){
        this.setData({
          isCardPassError: true
        })
        return
      }
      if (errorCode == "1020") {
        this.setData({
          isCardHasBind: true
        })
        return
      }
      wx.$showNetError(res.data.exception.message)
     
    })
  },
  getGiftCardRecord(){
    this.data.pageNum = 1
    this.setData({
      noMore:false
    })
    let t = {
      pageSize:this.data.pageSize,
      pageNum:this.data.pageNum
    }
    wx.$methods.getGiftCardRecord(t).then(res=>{
      let list = res.body
      if(list.length < this.data.pageSize){
        this.setData({
          noMore:true
        })
      }
      this.setData({
        list: list
      })
      this.data.pageNum++
    })
  },
  // 获取更多礼品记录
  getMoreGiftCardRecord() {
    let t = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    wx.$methods.getGiftCardRecord(t).then(res => {
      let list = res.body
      if (list.length < this.data.pageSize) {
        this.setData({
          noMore: true
        })
      }
      this.data.pageNum++
      this.data.list = this.data.list.concat(list)
      this.setData({
        list:this.data.list
      })
    })
  },

}