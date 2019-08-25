/**
 * Created by xujie on 2018/2/16.
 */
module.exports = {
  testPhone(value) {
    return /^1\d{10}$/.test(value)
  },
  testUsername(value) {
    return /^[a-zA-Z0-9_-]{4,16}$/.test(value)
  },

  testPassword(value) {
    return /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,15}/.test(value)
  },

  testEmail(value) {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)
  },
  testMoney(value){
    return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
  },
  testEmptyByToast(value, msg) {
    if (value == '') {
      wx.showToast({
        title: msg,
      })
      return false
    }
    return true
  },
  testTaxAvailable (num){
    return /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(num)
  },
  testExpress(num){
    return /^[0-9a-zA-Z]{5,30}$/.test(num)
  }
}