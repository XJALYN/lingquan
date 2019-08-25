module.exports = {
  // 获取首页数据
  getHomePage() {
    wx.$showLoading()
    wx.$methods.getHomePage().then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      this.setData({
        homePage: res.body
      })
    })
  },
  
  // 获取好物自营列表
  getHWZYList(){
    wx.$showLoading()
    wx.$methods.getHWZYList().then(res =>{
     wx.hideLoading()
      wx.stopPullDownRefresh()
      let groupList = []
      let brandList = []
      for (let item of res.body.kmBrands){
        brandList.push(item)
        if(brandList.length == 10){
          groupList.push(brandList)
          brandList = []
        }
      }
      if(brandList.length != 0){
        groupList.push(brandList)
      }
      res.body.kmBrands = groupList

     console.log(res)
     this.setData({
       hwzyData:res.body
     })
    })
  },

  // 获取自营好物
  // getColumnItemList() {
  //   this.data.shopListParams.pageNum = 1
  //   let t = {
  //     columnCode: 'HWZY',
  //     pageSize: this.data.shopListParams.pageSize,
  //     pageNum: this.data.shopListParams.pageNum
  //   }
  //   this.setData({
  //     noMore: false
  //   })
  //   wx.$showLoading()
   
  //   wx.$methods.getColumnItemList(t).then(res => {
  //     wx.hideLoading()
  //     wx.stopPullDownRefresh()
  //     console.log("noMore", this.data.noMore)
  //     let list = res.body
  //     this.setData({
  //       goodsList: list
  //     })
  //     if (list.length < this.data.shopListParams.pageSize) {
  //       this.setData({
  //         noMore: true
  //       })
  //     }

  //     this.data.shopListParams.pageNum++
  //   })
  // },
  // 获取更多自营好物
  // getMoreColumnItemList() {
  //   let t = {
  //     columnCode: 'HWZY',
  //     pageSize: this.data.shopListParams.pageSize,
  //     pageNum: this.data.shopListParams.pageNum
  //   }
  //   this.setData({
  //     noMore: false
  //   })
  //   wx.$showLoading()
  //   wx.$methods.getColumnItemList(t).then(res => {
  //     wx.hideLoading()
  //     wx.stopPullDownRefresh()
  //     console.log(res)
  //     let list = res.body
  //     if (list.length < this.data.shopListParams.pageSize) {
  //       this.setData({
  //         noMore: true
  //       })
  //     }
  //     this.data.goodsList = this.data.goodsList.concat(list)

  //     this.setData({
  //       goodsList: this.data.goodsList
  //     })
  //     this.data.shopListParams.pageNum++
  //   })
  // },


  // 获取直播间列表
  liveRoomList() {
    wx.$showLoading()
    wx.$methods.liveRoomList().then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      this.setData({
        liveRoomList: res.body
      })
    })
  },

  //获取发现列表
  discoveryList() {
    this.data.discoveryListParam.isbPageDto.pageNum = 1
    wx.$showLoading()
    wx.$methods.discoveryList(this.data.discoveryListParam).then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if (res.body.length < this.data.discoveryListParam.isbPageDto.pageSize) {
        this.setData({
          noMore: true
        })
      }
      this.setData({
        discoveryListData: res.body,
      })
      this.data.discoveryListParam.isbPageDto.pageNum++
    })
  },
  //获取发现列表
  discoveryMoreList() {
    wx.$methods.discoveryList(this.data.discoveryListParam).then(res => {
      console.log("发现列表数据", res.body)
      if (res.body.length < this.data.discoveryListParam.isbPageDto.pageSize) {
        this.setData({
          noMore: true
        })
      }
      this.data.discoveryListData = this.data.discoveryListData.concat(res.body)
      this.setData({
        discoveryListData: this.data.discoveryListData,
      })
      this.data.discoveryListParam.isbPageDto.pageNum++

    })
  },
  //发现点赞接口
  clickLike(index) {
    wx.$methods.clickLike(this.data.clickLikeParam).then(res => {
      console.log("发现列表数据", res.body)
      this.setData({
        [`discoveryListData[${index}].articleLikeStatus`]: 1,
        [`discoveryListData[${index}].likeNum`]: res.body
      })


    })
  },
  //抖音爆款列表获取
  getDouYiList() {
    this.data.getColumnItemListParam.pageNum = 1
    wx.$showLoading()
    wx.$methods.getColumnItemList(this.data.getColumnItemListParam).then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log("不为空", res.body, this.data.getColumnItemListParam.pageSize)
      if (res.body.length < this.data.getColumnItemListParam.pageSize) {
        this.setData({
          noMore: true
        })
      }
     
      this.setData({
        dyListData: res.body,
      })
      this.data.getColumnItemListParam.pageNum++

    })
  },

  //获取抖音爆款列表 ---下拉刷新
  getDouYiMoreList() {
    wx.$methods.getColumnItemList(this.data.getColumnItemListParam).then(res => {
      console.log("获取抖音爆款列表 ---下拉刷新", res.body)
      if (res.body.length < this.data.getColumnItemListParam.pageSize) {
        this.setData({
          noMore: true
        })
      }
      this.data.dyListData = this.data.dyListData.concat(res.body)
      this.setData({
        dyListData: this.data.dyListData,
      })
      this.data.getColumnItemListParam.pageNum++
    })
  },




  //种草列表获取
  getRecommendList() {
    this.data.getRecommendListParam.pageNum = 1
    wx.$showLoading()
    wx.$methods.getColumnItemList(this.data.getRecommendListParam).then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log("种草列表数据", res.body)
      if (res.body.length > 0) {
        console.log("不为空")
        this.setData({
          zcListData: res.body,
        })
        if (res.body.length < this.data.getColumnItemListParam.pageSize) {
          this.setData({
            noMore: true
          })
        } else {
          this.data.getRecommendListParam.pageNum++
        }
      } else {
        console.log("为空")
        this.setData({
          noMore: true
        })
      }

    })
  },
  //种草点击接口
  clickZc(index) {
    console.log("种草入参", this.data.zcParam)
    wx.$methods.clickLike(this.data.zcParam).then(res => {
      console.log("种草数据", res.body)
      this.setData({
        [`zcListData[${index}].canPraise`]: 0,
        [`zcListData[${index}].praiseNum`]: res.body
      })
    })
  },
  // 获取临期商品列表
  nearDateGoodsList() {
    this.data.neardDateGoodsListParams.pageNum = 1
    let t = {
      columnCode: this.data.neardDateGoodsListParams.columnCode,
      pageSize: this.data.neardDateGoodsListParams.pageSize,
      pageNum: this.data.neardDateGoodsListParams.pageNum
    }
    this.setData({
      noMore: false
    })
    wx.$showLoading()
    wx.$methods.getColumnItemList(t).then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log("noMore", this.data.noMore)
      let list = res.body
      this.setData({
        neardDateGoodsList: list
      })
      if (list.length < this.data.neardDateGoodsListParams.pageSize) {
        this.setData({
          noMore: true
        })
      }

      this.data.neardDateGoodsListParams.pageNum++
    })
  },


  // 获取更多临期商品
  moreNearDateGoodsList() {
    let t = {
      columnCode: this.data.neardDateGoodsListParams.columnCode,
      pageSize: this.data.neardDateGoodsListParams.pageSize,
      pageNum: this.data.neardDateGoodsListParams.pageNum
    }
    this.setData({
      noMore: false
    })
    wx.$showLoading()
    wx.$methods.getColumnItemList(t).then(res => {
      wx.hideLoading()
      console.log(res)
      let list = res.body
      if (list.length < this.data.neardDateGoodsListParams.pageSize) {
        this.setData({
          noMore: true
        })
      }
      this.data.neardDateGoodsList = this.data.neardDateGoodsList.concat(list)

      this.setData({
        neardDateGoodsList: this.data.neardDateGoodsList
      })
      this.data.neardDateGoodsListParams.pageNum++
    })
  },
  // 添加购物车
  shopCarAdd(productCode) {
    //添加购物车数量 
    let t = {
      "productCode": productCode,
      "prodCount": 1,
      "type": 1,
      "channelId": 2
    }
    wx.$showLoading()
    wx.$methods.shopCarAdd(t).then(res => {
      wx.hideLoading()
      if (res.body.currentProductNum ==0){
        wx.$showToast("库存不足")
      }else{
        wx.$showToast('已加入到购物车')
      }
      // 刷新购物车数量
      wx.$updateShoppingCartNum()
    })
  },
  // // 获取推荐好物列表
  // getRecommendGoodsList() {
  //   this.data.shopListParams.pageNum = 1
  //   let t = {
  //     columnCode: 'CNXH',
  //     pageSize: this.data.shopListParams.pageSize,
  //     pageNum: this.data.shopListParams.pageNum
  //   }
  //   this.setData({
  //     noMore: false
  //   })
  //   wx.$methods.getColumnItemList(t).then(res => {
  //     console.log("noMore", this.data.noMore)
  //     let list = res.body
  //     this.setData({
  //       goodsList: list
  //     })
  //     if (list.length < this.data.shopListParams.pageSize) {
  //       this.setData({
  //         noMore: true
  //       })
  //     }

  //     this.data.shopListParams.pageNum++
  //   })
  // },
  // // 获取更多推荐好物列表
  // getMoreRecommendGoodsList() {
  //   let t = {
  //     columnCode: 'CNXH',
  //     pageSize: this.data.shopListParams.pageSize,
  //     pageNum: this.data.shopListParams.pageNum
  //   }
  //   this.setData({
  //     noMore: false
  //   })
  //   wx.$methods.getColumnItemList(t).then(res => {
  //     console.log(res)
  //     let list = res.body
  //     if (list.length < this.data.shopListParams.pageSize) {
  //       this.setData({
  //         noMore: true
  //       })
  //     }
  //     this.data.goodsList = this.data.goodsList.concat(list)

  //     this.setData({
  //       goodsList: this.data.goodsList
  //     })
  //     this.data.shopListParams.pageNum++
  //   })
  // },
}