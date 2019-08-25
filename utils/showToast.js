const showToast = function (msg) {
  wx.showToast({
    title: msg,
    icon: "none"
  })
}

module.exports = showToast