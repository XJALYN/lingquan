module.exports = {
  onChangeMenu(e){
   let index = e.currentTarget.dataset.index
   index = parseInt(index)
    let category_id = this.data.menuList[index].category_id
    this.data.newsParams.category_id = category_id
    this.setData({
      menuIndex: index,
    })
    this.newsList()
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  }
}