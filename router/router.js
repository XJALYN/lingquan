
function push(url, data){
  wx.navigateTo({
    url: url + '?' + jsonToUrlEncode(data)
  })
}
function jsonToUrlEncode(object){
  let results = []
  for(let i in object){
     results.push(`${i}=${object[i]}`)
  }
  return results.join('&')
  
}

function reLaunch(url,data){
  wx.reLaunch({
    url: url + '?' + jsonToUrlEncode(data)
  })
}
function pushByInfo(item) {
    switch (parseInt(item.linkType)) {
      case 0: onSwitchToPage(item); break;
      case 1: onPushToPage(item); break;
      case 2: onPushToWebview(item); break;
      case 3: onSwitchToInPage(item); break;
      case 4: onLaunchMiniProgram(item); break;
      default: wx.$showToast("敬请期待");
    }
  }

  // 0 跳转到tab页面
function onSwitchToPage(item) {
    let parseQuerys = wx.$util.parseQuerys(item.link)
    for (let key in parseQuerys) {
      wx.setStorageSync(key, parseQuerys[key])
    }
    wx.switchTab({
      url: item.link,
    })

  }

  // 1跳转到页面
function onPushToPage(item) {
    if (item.link) {
      wx.navigateTo({
        url: item.link,
      })
    } else {
      wx.$showToast("敬请期待");
    }

  }

  // 2打开网页
function  onPushToWebview(item) {
    let link = encodeURI(item.link)
    wx.$router.push("/pages/webview/webview", { href: link })
  }

  // 3打来小程序内页
function onSwitchToInPage(item) {
    let parseQuerys = wx.$util.parseQuerys(item.link)
    for (let key in parseQuerys) {
      wx.setStorageSync(key, parseQuerys[key])
    }
    let page = getCurrentPages()[getCurrentPages().length - 1]
    let route = page.route
    if (item.link.indexOf(route) == -1) {
      wx.switchTab({
        url: item.link,
      })
    } else {
      page.onShow()
    }

  }

  // 4.打开其它小程序
function  onLaunchMiniProgram(item) {
    wx.navigateToMiniProgram({
      appId: item.appId,
      path: item.link,
      envVersion: config.envVersion
    })
  }

 


module.exports = {
   push,
   reLaunch,
  pushByInfo,
}