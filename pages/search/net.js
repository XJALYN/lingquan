module.exports = {

  // 搜索关键字
  searchKeywordList(){
    let t = {
      "keyWord": this.data.searchText
    }
    
    wx.$methods.searchKeywordList(t).then(res=>{
      this.data.resultList = res.body.map(item=>{
        return {
          text:item
        }
      })
      this.dealSearchResult()
    })
  },
  
  // 搜索列表
  productSearchList(){
    this.data.pageNum = 1
    this.setData({
      noMore:false,
      showGoodsList: true
    })
    let t = {
      brandCode: this.data.brandCode,
      categoryCode: this.data.categoryCode,
      keyWord: this.data.searchText,
      orderBy: this.data.filterIndex,
      pageSize:this.data.pageSize,
      pageNum:this.data.pageNum
    }
    wx.$methods.productSearchList(t).then(res => {
      this.getSearchRecordListClient()
      if (res.body.length < this.data.pageSize) {
        this.setData({
          noMore: true
        })
      }
      this.setData({
        goodsList:res.body,
        goodsTotal: res.totalCount
      })
      this.data.pageNum ++
    })
  },
  productSearchMoreList() {
    let t = {
      brandCode: this.data.brandCode,
      categoryCode: this.data.categoryCode,
      keyWord: this.data.searchText,
      orderBy: this.data.filterIndex,
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    wx.$methods.productSearchList(t).then(res => {
      let list = res.body
      if(list.length < this.data.pageSize){
        this.setData({
          noMore:true
        })
      }
      this.data.goodsList = this.data.goodsList.concat(list)
      this.setData({
        goodsList: this.data.goodsList
      })
      this.data.pageNum++
    })
  },
  //  缓存数据
  // cacheKeyWords(){
  //   console.log(this.data.cacheKeyWords)
  //   if (this.data.searchText == ''){
  //     return
  //   }
  //   if (this.data.cacheKeyWords.indexOf(this.data.searchText) == -1) {
  //     this.data.cacheKeyWords = [this.data.searchText].concat(this.data.cacheKeyWords)
  //     if(this.data.cacheKeyWords.length > 10){
  //       this.data.cacheKeyWords.pop()
  //     } 
      
  //     console.log("cacheKeyWords",this.data.cacheKeyWords)
  //     this.setData({
  //       cacheKeyWords: this.data.cacheKeyWords
  //     })
  //     console.log("cacheKeyWords", this.data.cacheKeyWords, JSON.stringify(this.data.cacheKeyWords))
    
  //     wx.setStorageSync("cacheKeyWords", JSON.stringify(this.data.cacheKeyWords))
  //   }else{
  //     let index = this.data.cacheKeyWords.indexOf(this.data.searchText)
  //     this.data.cacheKeyWords.splice(index,1)
  //     this.data.cacheKeyWords = [this.data.searchText].concat(this.data.cacheKeyWords)
  //     this.setData({
  //       cacheKeyWords: this.data.cacheKeyWords
  //     })
  //     wx.setStorageSync("cacheKeyWords", JSON.stringify(this.data.cacheKeyWords))
  //   }
  // },

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
      if (res.body.currentProductNum == 0) {
        wx.$showToast("库存不足")
      } else {
        wx.$showToast('已加入到购物车')
      }
    })
  },
  // 获取历史搜索记录
  getSearchRecordListClient(){
    wx.$methods.getSearchRecordListClient({ status:1}).then(res=>{
      console.log(res)
      this.setData({
        cacheKeyWords:res.body.map(item=>{
          return item.searchContent
        })
      })
    })
  },
  // 清理历史搜索记录
  cleanSearchRecords(){
    wx.$showLoading()
    wx.$methods.cleanSearchRecords().then(res=>{
      wx.hideLoading()
      this.setData({
        cacheKeyWords:[]
      })
    })
  }
}