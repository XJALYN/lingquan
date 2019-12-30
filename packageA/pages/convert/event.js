module.exports = {
  onConvert(){
    if (this.data.userInfo.integral < 20){
      wx.showModal({
        title: '钻石不足',
        content: '前往赚取更多钻石',
        success:res=>{
          if(res.confirm){
            wx.$router.push("/packageA/pages/taskCenter/taskCenter")
          }
        }
      })
    }
  }
  
}