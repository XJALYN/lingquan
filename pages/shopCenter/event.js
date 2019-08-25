module.exports = {
  onPushToSearch(e){
    console.log(e)
    let type = e.currentTarget.dataset.type
    let brandcode = e.currentTarget.dataset.brandcode
    let categorycode = e.currentTarget.dataset.categorycode
    wx.$router.push("/pages/search/search", { type, brandCode: brandcode, categoryCode:categorycode})
  },
  onChangeLeftMenu(e){
    let index = parseInt(e.currentTarget.dataset.index)
    console.log(index)
    this.setData({
      leftIndex:index
    })
    if(this.data.leftIndex==0){
      this.searchBrandList()
    }else if(this.data.leftIndex>0){
   
      this.searchCategoryList()
    }
  }
}