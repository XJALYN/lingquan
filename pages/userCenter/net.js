module.exports = {
  getUserInfo(){
    wx.$methods.getUserInfo({}).then(res=>{
        console.log(res)
      if (res.body.headImgUrl.indexOf("kshop-pro-data") != -1){
          this.setData({
            needAuthorUserInfo:true
          })
      }else{
        this.setData({
          needAuthorUserInfo: false
        })
      }
        this.setData({
          userInfo:res.body
        })
      if (this.data.userInfo.memberCardLevel < 4){
        this.getLuckyBugRecevingRecord()
      }
    })
  },

  // 获取自营好物
  getGuessYouLikeList() {
    let t = {
    }
    this.setData({
      noMore: false
    })
    wx.$methods.getGuessYouLikeList(t).then(res => {
      console.log("noMore", this.data.noMore)
      let list = res.body
      this.setData({
        goodsList: list
      })
      if (list.length < this.data.shopListParams.pageSize) {
        this.setData({
          noMore: true
        })
      }
    })
  },

  // 获取订单数量
  orderStatusNum(){
    wx.$methods.orderStatusNum().then(res=>{
      this.setData({
        orderStatusNums:res.body
      })
    })
  },
  // 查看福袋领取记录
  getLuckyBugRecevingRecord() {
    wx.$methods.getLuckyBugRecevingRecord().then(res => {
      if (!res.body.hasRecord) {
        wx.showModal({
          title: '',
          content: '大美将送您一份福袋，但还不知道您的收货地呢',
          confirmText: "领福袋",
          cancelText: "下次再说",
          confirmColor: "#F61B6D",
          success: res => {
            if (res.confirm) {
              // 填写福宝地址
              this.onPushToLuckyBag()
            }
          }
        })
      }
    })
  }
 
}