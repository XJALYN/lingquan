module.exports = {
  onPreviewImages(e) {
    let { list, index } = e.currentTarget.dataset
    wx.previewImage({
      current: list[index], // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  //点击立即购买事件或者加入购物
  onClickBalance(e) {
    if(this.data.chooseType=="buy"){
      wx.$router.push("/pages/balanceMes/balanceMes", { "prodCode": e.currentTarget.dataset.prodcode, "columnCode": e.currentTarget.dataset.columncode, "subChannelNo": e.currentTarget.dataset.subchannelno, "shareMemberId": this.data.shopCarAddParam.shareMemberId, prodNum: this.data.prodNum })
    }else if(this.data.chooseType=="addCart"){
      this.onclickAddshopCar(e)
    }
    this.onHideSpecList()
    

  },
  //点击购物车跳转列表
  onclickShop() {
    wx.switchTab({
      url: '/pages/shoppingCart/shoppingCart',
    })
  },
  //点击首页
  onclickIndex() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  //点击加入购物车
  onclickAddshopCar(i) {
    this.data.shopCarAddParam.prodCount = this.data.prodNum
    this.data.shopCarAddParam.productCode = i.currentTarget.dataset.prodcode
    console.log("this.data.shopCarAddParam.prodCount", this.data.shopCarAddParam.prodCount)
    this.shopCarAdd()
  },
  //点击打开正品保证
  openAlert() { 
    this.setData({
      showKMH: true
    })
  },
  //点击关闭正品保证
  onHideKMH() {
    this.setData({
      showKMH: false
    })
  },
  //点击分享
  onclickShare() { 
    this.setData({
      shareFooterType: false
    })
  },
  //点击取消分享框
  onclickClose() {
    this.setData({
      shareFooterType: true
    })
  },
  //点击推荐好物圈
  onclickCom() { 
    wx.$showToast("敬请期待!")
  },
  //分享朋友圈
  onClickHddenMonent() {
    console.log("分享[要去")
    this.setData({
      showShareMonent: false,

    })
  },

  //点击分享获取朋友圈数据
  onclickFriend() {
    console.log(this.data.getKmhProductDetailShareImageParam)
    wx.$showLoading()
    wx.$methods.getKmhProductDetailShareImage(this.data.getKmhProductDetailShareImageParam).then(res => {
      console.log("分享朋友圈接口:", res)
      wx.$hideLoading()
      this.setData({
        showShareMonent: true,
        shareUrl: res.body,
        shareFooterType: true,
      })
    })
  },
  on_error(e) {
    console.log("dddddddd", e)
  },
  // 页面置顶
  onScrollTop(e) {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  // 大牌说折叠状态更改
  onSayFold(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      [`kmhProductDetailData.comments[${index}].fold`]: !this.data.kmhProductDetailData.comments[index].fold,
    })
    if(!this.data.showMoreSayList){
      console.log("隐藏状态下", !this.data.kmhProductDetailData.omitComments[index].fold)
      this.setData({
        [`kmhProductDetailData.omitComments[${index}].fold`]: !this.data.kmhProductDetailData.omitComments[index].fold,
      })
    }
  },
  // 查看全部大牌说
  onShowMoreSayList(){
    this.setData({
      'showMoreSayList':true
    })
  },
  // 隐藏规格列表页面
  onHideSpecList(){
    this.setData({
      showSpecList:false
    })
  },

  // 显示规格列表页面
  onShowSpecList(e){
    this.data.chooseType = e.currentTarget.dataset.choosetype
    this.setData({
      showSpecList: true,
      prodNum: 1
    })
  },

  // 减少购买数量
  onCutBuyCount(e){
    // 和库存进行判断
    let prodNum = this.data.prodNum - 1
    this.modifyBuyCount(prodNum)
  },
  // 增加购买数量
  onCutAddCount(e){
   // 和库存进行判断
    let prodNum = this.data.prodNum + 1
    this.modifyBuyCount(prodNum)
  },
  // 输入购买数量
  onInputBuyCount(e){
    // 和库存进行判断
    let prodNum = parseInt(e.detail.value)
    this.modifyBuyCount(prodNum)
  },
  modifyBuyCount(prodNum){
    if (prodNum < 1){
      prodNum = 1
    }
    if (prodNum > this.data.kmhProductDetailData.currentProductNum) {
      wx.$showToast('库存不足，可售库存：' + this.data.kmhProductDetailData.currentProductNum)
      prodNum = this.data.kmhProductDetailData.currentProductNum
    }
    this.setData({
      prodNum: prodNum
    })
  },

  // 设置分享好物圈的数据
  setShareGoodsQuanData(data){
    let { prodCode, prodName, images, src_mini_program_path, retailPrice, currentPrice, status} = data
    // 物品的唯一标识
    this.data.productParam.item_code = prodCode
    // 物品的名称
    this.data.productParam.title = prodName
    // 物品描述
    this.data.productParam.desc = prodName
    // 物品图片url列表，图片宽度必须大于750px，宽高比建议4:3 - 1:1之间
    this.data.productParam.image_list = images
    // 物品的小程序落地页path
    this.data.productParam.src_mini_program_path = "pages/commodityDetail/commodityDetail?prodCode=" + prodCode
    // 物品SKU列表，具体见sku_list字段说明
    this.data.productParam.sku_list = [{ sku_id: prodCode, price: retailPrice, original_price: currentPrice, status: status }]
    this.data.productParam.category_list = [
      "美妆"
    ],
    this.data.productParam.brand_info = {
      "name": "鲲美会", //商家名字
      "logo": "https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/douyin.png" // logo
    }
    this.setData({
      productParam: this.data.productParam
    })
  
  },
  onPushToMember(){
    let type = "upgrade"
    // 缓存会员等级
    wx.setStorage({
      key: 'member:type',
      data: type,
    })
    wx.navigateTo({
      url: '/pages/member1/member',
    })
  },
  onSelectedSku(e){
    let sku = e.currentTarget.dataset.sku
    let index = e.currentTarget.dataset.i
    console.log(sku)
    let result = []
    for (let i in this.data.kmhProductDetailData.specificList){
      if(index==i){
        result.push(sku)
      }else{
        let item = this.data.kmhProductDetailData.specificList[i]
        let skuStr = item.id + "#" + item.activeValId
        result.push(skuStr)
      }
    }
    let key = result.join(",")
    let prodCode = this.data.kmhProductDetailData.skuRelation[key]
    console.log(this.data.kmhProductDetailData.skuRelation)
    console.log(prodCode)
    this.data.productDetailParam.prodCode = prodCode
    this.getKmhProductDetail();
    console.log(e)
  }
}