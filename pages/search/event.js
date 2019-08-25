module.exports = {
  onInputSearchText(e){
      this.setData({
        searchText: e.detail.value
      },res=>{
        this.searchKeywordList()
      })
  },
  dealSearchResult(){
      let list =  this.data.resultList.map(item=>{
        item.richText = "<span style='font-size:14rpx;text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp:1;'>" + item.text.replace(this.data.searchText, `<span style="color:red;">${this.data.searchText}</span>`,true) + "</span>"
      return item
    })
    this.setData({
      resultList:list
    })
  },
  onDeleteSearchText(e){
    this.setData({
      searchText: ""
    })
    this.searchKeywordList()
  },

  // 切换搜索类型
  onSwitchFilter(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      filterIndex:index
    })
    this.productSearchList()
  },
  // 获取跳转到商品详情
  onPushToGoodsDetail(e){
   let prodcode = e.currentTarget.dataset.prodcode
    wx.$router.push("/pages/commodityDetail/commodityDetail", { prodCode: prodcode})
  },
  // 添加购物车
  onAddShoppingCart(e){
    let prodcode = e.currentTarget.dataset.prodcode
  },

  // 输入框出现焦点
  onInputFocus(e){
    this.setData({
      showGoodsList:false
    })
  },
  // 点击搜索按钮
  onTapSearchBtn(){
    this.productSearchList()
  },
  // 点击关键字列表
  onTapSearchResultKeyword(e){
    let text = e.currentTarget.dataset.text
    this.setData({
      searchText:text
    })
    this.productSearchList()
  },
  // 点击历史搜索标签
  onTapHistorySearchText(e){
   let text = e.currentTarget.dataset.text
    this.setData({
      searchText: text
    })
    this.productSearchList()
  },
  // 清楚历史搜索
  onDeleteHistorySearchCache(e){ 
    wx.showModal({
      title: '确定删除搜索记录吗?',
      content: '',
      confirmColor:"#F61B6D",
      success:res=>{
        if(res.confirm){
          this.setData({
            searchText: ""
          })
          this.cleanSearchRecords()
        }
      }
    })
 
  },
  // 加入购物车
  onShopCarAdd(e){
    let prodcode = e.currentTarget.dataset.prodcode
    this.shopCarAdd(prodcode)
  }
}