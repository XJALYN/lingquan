const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = (year, month, day) => {
  return [year, month, day].map(formatNumber).join("-")
}
const random = (n) => {
  let str = "0123456789"
  let result = ''
  for (let i = 0; i < n; i++) {
    let s = parseInt(Math.random() * 100) / 10
    result += str.substr(s, 1)
  }
  return result
}
const shake= (func) =>{
  if(wx.shakeTime){
    clearTimeout(wx.shakeTime)
  }
  wx.shakeTime = setTimeout(func,200)
}


export {
  formatTime,
  formatDate,
  random,
  shake
}
