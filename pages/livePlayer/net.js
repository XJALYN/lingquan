

const config = require("../../config/config.js")
module.exports = {
  // 链接websocket
  connetWebsocket(){
    let socket = wx.connectSocket({
      url: `ws://k2c-1.ikunchi.com/kmh-live-server/websocket/1/${wx.$db.token}`,
      header: {
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],
      method: "POST",
      success:res=>{
        console.log("链接成功",res)
        
      },
      fail:res=>{
        consoel.log(res)
      }
    })
    console.log(socket)
    socket.onOpen(res=>{
      console.log("打开")
    })
  },
  // 监听消息
  addListerMessage(e){
    console.log("监听open")
    wx.onSocketOpen(res=>{
      this.data.socketOpen = true
      console.log("socket open",res)
      this.sendMessage()
    })
    wx.onSocketMessage(function(res){
      console.log(res)
    })
  },
  // 发送消息
  sendMessage(){
    wx.sendSocketMessage({
      data: [{"message":"ddd"}],
    })
  }
}