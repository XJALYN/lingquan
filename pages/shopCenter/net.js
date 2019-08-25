module.exports = {

  // 子品牌
  searchBrandList(){
    wx.$methods.searchBrandList().then(res=>{
      console.log("searchBrandList",res)
      this.setData({
        brandList:res.body
      })
    })
  },

  // 子类目
  searchCategoryList(){
    let item = this.data.mainList[this.data.leftIndex - 1]
    console.log(item)
    wx.$methods.searchCategoryList({ parentCategoryId: item.id }).then(res => {
      this.setData({
        categoryList: res.body
      })
      console.log("searchCategoryList",res)
    })
  },
  // 获取主类目
  searchMainCategoryList() {
    wx.$methods.searchCategoryList({ parentCategoryId:0}).then(res => {
      this.setData({
        mainList: res.body
      })
      console.log("searchCategoryList", res)
    })
  },
}