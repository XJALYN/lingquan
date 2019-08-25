module.exports = {
  //获取商品详情接口
  getKmhProductDetail() {
    wx.$showLoading();
    wx.$methods.getKmhProductDetail(this.data.productDetailParam).then(res => {
      wx.hideLoading()
      console.log("商品详情数据", res.body)
      res.body.comments.map(item=>{
        item.fold = true
      })
      if(res.body.comments.length > 3){
        // 显示更多按钮
        this.setData({
          showMoreSayList:false
        })
      }else{
        // 隐藏更多按钮
        this.setData({
          showMoreSayList: true
        })
      }
      // 计算省略的大牌说
      res.body.omitComments = res.body.comments.slice(0,3).map(item=>{
        return { ...item}
      })
      wx.stopPullDownRefresh()
      this.setData({
        kmhProductDetailData: res.body,
        commodityDetailType:false
      })
      this.data.getKmhProductShareParam.prodCode = res.body.prodCode
      this.data.getKmhProductShareParam.columnCode = res.body.columnCode
      if (this.data.productDetailParam.shareId != ""){
        this.data.shopCarAddParam.shareMemberId = res.body.shareMemberId //添加购物车入参id
      }
    
      this.data.getKmhProductShareData.memberId = res.body.shareMemberId
      this.data.getKmhProductDetailShareImageParam.prodCode = res.body.prodCode //分享朋友圈
      this.getKmhProductShare();
      if (wx.getStorageSync("commodityDetail:showKMH") != true){
        this.setData({
          showKMH:true
        })
        wx.setStorageSync("commodityDetail:showKMH", true)
      }
      
      // 设置好物圈相关数据
      this.setShareGoodsQuanData(res.body)
    })
  },
  //获取购物车数量
  shopCarCountByUserId(){
    wx.$methods.shopCarCountByUserId(this.data.shopCarCountByUserIdParam).then(res => {
      console.log("查询购物车数据", res.body.prodCount)
      if (res.body.prodCount>0){
        console.log("进来了没")
        this.shopCarCountByUserIdType=false

        this.setData({
          shopCarCountByUserIdData: res.body,
          shopCarCountByUserIdType: false
        })
      }else{
        this.setData({
          shopCarCountByUserIdData: res.body,
          shopCarCountByUserIdType: true
        })
      }
    })
  },
  // 添加购物车
  shopCarAdd(){
    console.log("购物车入参：", this.data.shopCarAddParam)
    // 加入购物车动画
    wx.showLoading({
      title: '加载中',
      mask:true,
      duration:5000
    })
    wx.$methods.shopCarAdd(this.data.shopCarAddParam).then(res => {
      wx.hideLoading()
      if (res.body.msg =="库存不足"){
        wx.$showToast("库存不足,可售库存:" + res.body.currentProductNum)
      }else{
        if(this.data.addMoveTimer){
          clearTimeout(this.data.addMoveTimer)
          this.data.addMoveTimer = null
        }
        this.setData({
          addMoveAnimte: true
        })
        this.data.addMoveTimer = setTimeout(res => {
          this.setData({
            addMoveAnimte: false
          })
          this.shopCarCountByUserId()
        }, 2000)
        // 加入购物车动画
      
        // wx.$showToast("已加入至购物车")

      }
    })
  },
  //获取分享朋友数据
  getKmhProductShare() {
    wx.$methods.getKmhProductShare(this.data.getKmhProductShareParam).then(res => {
      console.log("分享好友数据", res.body)
      this.data.getKmhProductShareData = res.body
        // this.setData({
        //   getKmhProductShareData: res.body,
        // })
      wx.downloadFile({
        url: res.body.shareImageUrl,
        success:(res)=> {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            this.data.getKmhProductShareData.shareImageUrl = res.tempFilePath
          }
        }
      })
    })
  },
 //获取分享朋友圈数据
  // getKmhProductDetailShareImage() {
  //   wx.$methods.getKmhProductDetailShareImage(this.data.getKmhProductDetailShareImageParam).then(res => {
  //     console.log("分享好友数据", res.body)
  //     this.setData({
  //       getKmhProductDetailShareImageData: res.body,
  //     })
  //   })
  // },


  
}