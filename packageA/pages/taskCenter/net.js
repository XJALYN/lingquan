module.exports = {
  dayTasks() {
    wx.$methods.dayTasks({}).then(res => {
      console.log(res)
       this.setData({
         is_signed: res.data.is_signed
       })
      
    })
  },
  taskList(){
    wx.$methods.taskList({}).then(res => {
      console.log(res)
      this.setData({
        list: res.data.daily_tasks
      })
    })
  },
  sign(){
    wx.$showLoading()
    wx.$methods.sign().then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '签到成功',
      })
      this.dayTasks()
    })
  }
}