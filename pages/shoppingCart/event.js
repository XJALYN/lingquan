module.exports = {
  //点击立即购买事件
  onclickManage() { //点击管理
    console.log(111)
    for (let i in this.data.shopCarListData) {
      this.data.shopCarListData[i].choose = false
    }

    this.setData({
      allMoneyType: true,
      shopCarListData: this.data.shopCarListData,
      completeType: false,
      manageType: true,
      deleteType: false,
      balanType: true,
      shopalltrueType: true,
      shopallType: false,
      allMoney: "0.00",
    })

  },
  onclickComplete() { //点击完成
    for (let i in this.data.shopCarListData) {
      this.data.shopCarListData[i].choose = false
    }
    this.setData({
      allMoneyType: false,
      shopCarListData: this.data.shopCarListData,
      completeType: true,
      manageType: false,
      deleteType: true,
      balanType: false,
      shopalltrueType: true,
      shopallType: false,
      allMoney: "0.00",

    })
  },
  bindKeyInput(e) {
    let index = e.currentTarget.dataset.index
    if (parseInt(e.detail.value) == 0 || e.detail.value == '') {
      this.data.numParam.prodCount = 1
    } else {
      this.data.numParam.prodCount = parseInt(e.detail.value)
    }
    this.data.numParam.productCode = e.currentTarget.dataset.procode



    this.shopCarAdd(e.currentTarget.dataset.index)

    let item = this.data.shopCarListData[index]
    this.setData({
      shopNum: parseInt(e.detail.value),
    })
  },
  onclickAdd(e) { //点击增加商品个数
    console.log("单据增加", e)
    let index = e.currentTarget.dataset.index
    this.data.numParam.prodCount = e.currentTarget.dataset.prodnum + 1
    this.data.numParam.productCode = e.currentTarget.dataset.procode
    this.shopCarAdd(index)
  },
  onclickCut(e) { //点击减号商品个数
    let index = e.currentTarget.dataset.index
    if (e.currentTarget.dataset.prodnum > 1) {
      this.data.numParam.prodCount = e.currentTarget.dataset.prodnum - 1
      this.data.numParam.productCode = e.currentTarget.dataset.procode
      this.shopCarAdd(index)
    }
  },
  onclickFalseIco(e) { //点击选中
    this.data.allMoney = JSON.parse(e.currentTarget.dataset.prodnum) * JSON.parse(e.currentTarget.dataset.currentprice) + JSON.parse(this.data.allMoney)
    console.log("选中", e.currentTarget.dataset.prodnum, e.currentTarget.dataset.currentprice, this.data.allMoney, e)
    let index = e.currentTarget.dataset.index
    this.setData({
      allMoney: this.data.allMoney.toFixed(2),
      [`shopCarListData[${index}].choose`]: true
    })
    let count = 0
    let availableCount = 0

    for (let item of this.data.shopCarListData) {
      if (item.choose) {
        count++
      }
      // 可删除状态下
      if (item.available && this.data.completeType) {
        availableCount++
      }
      // 去结算状态下
    }

    if (!this.data.completeType) {
      availableCount = this.data.shopCarListData.length
    }

    console.log(count, this.data.shopCarListData.length)
    if (count == availableCount) {
      this.setData({
        shopalltrueType: false,
        shopallType: true,
      })
    }
    if (this.data.completeType) {
      this.setData({
        goBalaneType: false
      })
    } else {
      this.setData({
        goBalaneType: true
      })
    }
  },
  onclicktrueIco(e) { //点击未选中
    console.log("未选中")
    console.log(this.data.allMoney)
    this.data.allMoney = this.data.allMoney - e.currentTarget.dataset.prodnum * e.currentTarget.dataset.currentprice
    let index = e.currentTarget.dataset.index
    this.setData({
      shopalltrueType: true,
      shopallType: false,
      allMoney: JSON.parse(this.data.allMoney).toFixed(2),
      [`shopCarListData[${index}].choose`]: false
    })
  },
  onclickShopall() { //点击全选
    console.log(this.data.allMoney)
    this.data.shopCarListData = this.data.shopCarListData.map(item => {
      if (!item.available && this.data.completeType) {
        item.choose = false
      } else {
        item.choose = true
        this.data.allMoney = 0.00
        for (let i = 0; i < this.data.shopCarListData.length; i++) {
          if (this.data.shopCarListData[i].choose) {
            this.data.allMoney += this.data.shopCarListData[i].prodNum * this.data.shopCarListData[i].currentPrice
          }
        }
      }

      return item
    })
    console.log("点击全选获取数据", this.data.shopCarListData)
    // this.data.allMoney = 0
    // for (let i = 0; i < this.data.shopCarListData.length;i++){
    //   this.data.allMoney += this.data.shopCarListData[i].prodNum * this.data.shopCarListData[i].currentPrice
    // }
    this.setData({
      shopCarListData: this.data.shopCarListData,
      allMoney: JSON.parse(this.data.allMoney).toFixed(2)
    })
    this.setData({
      shopalltrueType: false,
      shopallType: true
    })
    if (this.data.completeType) {
      console.log(111)
      this.setData({
        goBalaneType: false
      })
    } else {
      this.setData({
        goBalaneType: true
      })
    }
  },
  onclickShopallTrue() { //取消全选
    console.log('12345')
    this.data.shopCarListData = this.data.shopCarListData.map(item => {
      item.choose = false
      return item
    })
    this.setData({
      allMoney: "0.00",
      shopCarListData: this.data.shopCarListData
    })

    this.setData({
      shopalltrueType: true,
      shopallType: false
    })
    console.log(this.data.allMoney)
  },
  onclickDelete() { //点击删除
    wx.showModal({
      content: '您确定要删除选中商品?',
      confirmColor: "#F61B6D",
      success: res => {
        if (res.confirm) {
          let shopCarItemIds = this.data.shopCarListData.filter(item => {
            return item.choose
          }).map(item => {
            return item.shopCarItemId
          })
          let t = {
            shopCarItemIds: shopCarItemIds
          }
          this.data.shopCarCountDeleteParam = t
          console.log("返回接：", t.shopCarItemIds.length)
          if (t.shopCarItemIds.length > 0) {
            this.shopCarCountDelete();
          } else {
            wx.showToast({
              title: '您还没选择删除的商品哟~',
              icon: 'none',
              duration: 500
            })
          }
          console.log("删除", t)
        }
      }
    })

  },

  onckickBalan() { //点击去结算按钮
    let idList = this.data.shopCarListData.filter(item => {
      return item.choose
    }).map(item => {
      return {
        num: item.prodNum,
        productCode: item.prodCode,
        shareMemberId: item.shareMemberId,
        checkoutCarId: item.shopCarItemId
      }

    })
    let t = {
      idList: JSON.stringify(idList),
      subChannelNo: this.data.subChannelNo,
      fromPage: "shopCart"
    }
    this.setData({
      allMoney: "0.00",
      shopalltrueType: true, //全选选中显示状态
      shopallType: false
    })
    console.log("ttttttttttt", t)
    // wx.$router.push("/pages/balanceMes/balanceMes", t)
    console.log("ttttttttttt", t.idList)
    if (t.idList !== '[]') {
      wx.$router.push("/pages/balanceMes/balanceMes", t)
    }
  },
  gotoDetail(e) { //点击跳转详情页
    console.log("e.prodcode.", e)
    wx.$router.push("/pages/commodityDetail/commodityDetail", {
      "prodCode": e.currentTarget.dataset.prodcode
    })
  },
  calcTotalPrice() {
    this.data.allMoney = 0.00
    for (let i = 0; i < this.data.shopCarListData.length; i++) {
      if (this.data.shopCarListData[i].choose) {
        this.data.allMoney += this.data.shopCarListData[i].prodNum * this.data.shopCarListData[i].currentPrice
      }
    }
    this.setData({
      allMoney: parseFloat(this.data.allMoney).toFixed(2)
    })
  },
  onPushToHome(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }



}