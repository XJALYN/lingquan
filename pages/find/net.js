module.exports = {
  //获取发现列表
  discoveryList() {
    this.data.discoveryListParam.isbPageDto.pageNum = 1
    wx.$methods.discoveryList(this.data.discoveryListParam).then(res => {
      console.log("发现列表数据", res.body)
      if(res.body.length>0){
        console.log("不为空")
        this.setData({
          discoveryListData: res.body,
        })
        this.data.discoveryListParam.isbPageDto.pageNum++
      }else{
        console.log("为空")
        this.setData({
          noMore: true
        })
      }
     

    })
  },
  //获取发现列表 ---下拉刷新
  discoveryMoreList() {
    wx.$methods.discoveryList(this.data.discoveryListParam).then(res => {
      console.log("发现列表数据", res.body)
      if (res.body.length < this.data.discoveryListParam.isbPageDto.pageSize){
        this.setData({
          noMore:true
        })
      }
      this.data.discoveryListData = this.data.discoveryListData.concat(res.body)
      this.setData({
        discoveryListData: this.data.discoveryListData,
      })
      this.data.discoveryListParam.isbPageDto.pageNum ++

    })
  },
  //发现点赞接口
  clickLike(index) {
    wx.$methods.clickLike(this.data.clickLikeParam).then(res => {
      console.log("发现列表数据", res.body)
      this.setData({
        [`discoveryListData[${index}].articleLikeStatus`]:1,
        [`discoveryListData[${index}].likeNum`]: res.body
      })
      

    })
  },
  //抖音爆款列表获取
  getColumnItemList() {
    this.data.getColumnItemListParam.pageNum = 1
    wx.$methods.getColumnItemList(this.data.getColumnItemListParam).then(res => {

      console.log("抖音列表数据", res.body)
      if (res.body.length>0) {
        console.log("不为空")
        this.setData({
          dyListData: res.body,
        })
        this.data.getColumnItemListParam.pageNum++
      } else {
        console.log("为空")
        this.setData({
          noMore: true
        })
      }

    })
  },
  
  //获取抖音爆款列表 ---下拉刷新
  getColumnItemMoreList() {
    wx.$methods.getColumnItemList(this.data.getColumnItemListParam).then(res => {
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
    wx.$methods.getColumnItemList(this.data.getRecommendListParam).then(res => {
      console.log("种草列表数据", res.body)
      if (res.body.length > 0) {
        console.log("不为空")
        this.setData({
          zcListData: res.body,
        })
        if (res.body.length < this.data.getColumnItemListParam.pageSize){
          this.setData({
            noMore: true
          })
        }else{
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
   
  getMoreRecommendList() {
    wx.$methods.getColumnItemList(this.data.getRecommendListParam).then(res => {
      console.log("种草列表数据", res.body)
      if (res.body.length > 0) {
        console.log("不为空")
        this.data.zcListData = this.data.zcListData.concat(res.body)
        this.setData({
          zcListData: this.data.zcListData,
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
    console.log("种草入参",this.data.zcParam)
    wx.$methods.clickLike(this.data.zcParam).then(res => {
      console.log("种草数据", res.body)
      this.setData({
        [`zcListData[${index}].canPraise`]: 0,
        [`zcListData[${index}].praiseNum`]: res.body
      })
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
    wx.$methods.shopCarAdd(t).then(res => {
      if (res.body.currentProductNum == 0) {
        wx.$showToast("库存不足")
      } else {
        wx.$showToast('已加入到购物车')
      }
      // 刷新购物车数量
      wx.$updateShoppingCartNum()
    })
  }
}