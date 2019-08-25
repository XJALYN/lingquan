module.exports = {
  onChangeMenu(e){
   let index = e.currentTarget.dataset.index
   index = parseInt(index)
    let value = this.data.menuList[index].value
    if (value==0){
     this.getHomePage()
   }
    if (value==2){
     this.liveRoomList()
   }
    if (value == 3) {
      this.discoveryList();
    }
    if (value == 4) {
      this.getDouYiList()
    
    }
    //种草列表
    if (value == 5) {
      this.getRecommendList() 
    }

    if (value==6){
      this.getHWZYList()
   }
    if (value==7){
     this.nearDateGoodsList()
   }
   if(index < 3){
     this.setData({
       scrollTop: 1,
       menuIndex: index,
       scrollIntoView:""
     })
   }else{
     this.setData({
       menuIndex: index,
       scrollTop: (index - 3) * 100
     })
   }
    this.setData({
      noMore: false
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration:0
    })
  }
  
}