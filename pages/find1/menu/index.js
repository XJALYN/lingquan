module.exports = {
  onChangeMenu(e){
   let index = e.currentTarget.dataset.index
   if(index==3){
     wx.switchTab({
       url: '/pages/find/find?typeIndex=0',
     })
     return 
   }
   if(index==4){
     wx.switchTab({
       url: '/pages/find/find?typeIndex=1',
     })
     return
   }
   this.setData({
     menuIndex:index,
     scrollIntoView:"kc-"+index
   })
  }
}