module.exports = {
  // 获取获取用户权益
  getMemberCardsWithRights(){
    wx.$showLoading()
    wx.$methods.getMemberCardsWithRights().then(res=>{
      wx.hideLoading()
      console.log(res)
      wx.stopPullDownRefresh()
      let currentMemberCardId = res.body.currentMemberCardId
      let list = res.body.cards
      list = list.map(item=>{
        item.hasJiKaCoupon = res.body.hasJiKaCoupon
        return item
      })
      
       for(let i in list){
         let item = list[i]
         if(item.id==currentMemberCardId){
           
          this.setData({
            currentMemberCardId: currentMemberCardId,
            vipIndex:i,
            vipLevel: item.membercardLevel,
            listIndex:i,
            list: res.body.cards,
            bindPhone: res.body.bindPhone
          })
           if (this.data.vipLevel < 4 && this.data.vipLevel != -1) {
             this.getLuckyBugRecevingRecord()
           }
           // 如果进入页面有特殊的索引值,怎获取数据后
           if (this.data.targetIndex !== null){
            this.setData({
              listIndex: this.data.targetIndex,
              targetIndex:null
            })
           }
          return
         }
       }
    })
  },

  // 会员卡支付
  payForMemberCard(id, shouldPayMoney, hasJiKaCoupon) {
    let t = {
      hasJiKaCoupon: hasJiKaCoupon,
      payMoney: shouldPayMoney,
      memberCardId: id
    }
    wx.$methods.payForMemberCard(t).then(res => {
      wx.requestPayment({
        timeStamp: res.body.timeStamp,
        nonceStr: res.body.nonceStr,
        package: res.body.packageValue,
        signType: res.body.signType,
        paySign: res.body.paySign,
        success:res=>{
          wx.showLoading({
            title: '会员升级中',
            duration:2000
          })
          setTimeout(()=>{
            wx.hideLoading()
            wx.showToast({
              title: '会员开通成功',
            })
            
            this.getMemberCardsWithRights()
            this.getUserInfo()
            // wx.showModal({
            //   title: '',
            //   content: '小鲲将送您一份福袋，但还不知道您的收货地呢',
            //   confirmText:"领福袋",
            //   cancelText:"下次再说",
            //   confirmColor:"#F61B6D",
            //   success:res=>{
            //     if(res.confirm){
            //       // 填写福宝地址
            //       this.onPushToLuckyBag()
            //     }
            //   }
            // })
          },2000)
          
        }
      })
    })
  },
  // 绑定用户手机
  bindPhone(t,index) {
    wx.$methods.bindPhone(t).then(res => {
      this.setData({
        bindPhone:true
      })
      let { id, shouldPayMoney, hasJiKaCoupon } = this.data.list[index]
      this.payForMemberCard(id, shouldPayMoney, hasJiKaCoupon)
    })
  },
  // 获取用户信息, 此方法只能在支付成功后调用,用户判断用户是否升级为限量卡会员
  getUserInfo(){
    wx.$methods.getUserInfo().then(res=>{
      if (res.body.memberCardLevel==1){
        this.setData({
          showLimitCardSuccess:true
        })
      }
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