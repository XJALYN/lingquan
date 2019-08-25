module.exports = {
  shopCarList(){ //获取购物车列表数据
    wx.$methods.shopCarList(this.data.shopCarListParam).then(res => {
      wx.stopPullDownRefresh()
      console.log("购物车列表数据", res.body)
      // let md5 = wx.$md5(JSON.stringify(res.body.shopCarProdRespDtoList))
      // if (this.data.dataMD5 != md5){
      //   this.data.dataMD5 = md5
      // }
      this.setData({
        shopCarListData: res.body.shopCarProdRespDtoList,
        subChannelNo: res.body.subChannelNo,
        allMoney: "0.00",
        shopallType: false,
        shopalltrueType: true,
        loaded: true,
      })
        // 完成状态下
      if (!this.data.completeType){
         this.onclickComplete()
       }
    })
  },
  shopCarAdd(index) { //获取加商品数据
    wx.$methods.shopCarAdd(this.data.numParam).then(res => {
      console.log("加减购物车商品数量", res.body)
        if (this.data.numParam.prodCount > res.body.currentProductNum) {
          wx.showToast({
            title: '库存不足，可售库存：' + res.body.currentProductNum,
            icon: 'none',
            duration: 500,
          })
          this.setData({
            [`shopCarListData[${index}].prodNum`]: res.body.currentProductNum
          })
          if (res.body.currentProductNum == 0){
            this.setData({
              [`shopCarListData[${index}].available`]: false,
              [`shopCarListData[${index}].choose`]: false
            })
          }
        } else {
          this.setData({
            shopCarAddData: res.body,
            [`shopCarListData[${index}].prodNum`]: this.data.numParam.prodCount
          })
          // 刷新购物车数量
          wx.$updateShoppingCartNum()
        }
     
      this.calcTotalPrice()

    }).catch(res=>{
      // 下架
      console.log("走这里了",res)
      let errorCode = res.data.exception.errorCode
      if (errorCode == 10052) { // 下架
        this.setData({
          [`shopCarListData[${index}].available`]: false,
          [`shopCarListData[${index}].choose`]: false
        })
      } else if (errorCode == 10053) {  //售空
        this.setData({
          [`shopCarListData[${index}].prodNum`]: 0,
          [`shopCarListData[${index}].available`]: false,
          [`shopCarListData[${index}].choose`]: false
        })
      } else if (errorCode == 10055){
        this.setData({
          [`shopCarListData[${index}].prodNum`]: this.data.shopCarListData[index].prodNum
        })
      }
      let msg = res.data.exception.message
      if (res.data.exception.message.indexOf("@@@") > -1) {
        msg = res.data.exception.message.split('@@@')[1]
      }
      wx.$showToast(msg)
      this.calcTotalPrice()
    })
  },

  shopCarCountDelete() { //删除购物车列表数据
    wx.$methods.shopCarCountDelete(this.data.shopCarCountDeleteParam).then(res => {
      console.log("购物车删除", res.body)
      this.shopCarList();
      // 刷新购物车数量
      wx.$updateShoppingCartNum()
    })
  }


}