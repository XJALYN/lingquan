module.exports = {
  usersProfile() {
    wx.$methods.usersProfile({}).then(res => {
      console.log(res)
      this.setData({
        userInfo: res.data
      })
    })
  },
}