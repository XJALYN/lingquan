// pages/commodityDetail/commodityDetail.js
const event = require('./event.js')
const net = require('./net.js')
Page({
  ...event,
  ...net,

  /**
   * 页面的初始数据
   */
  data: {
    showKMH:true,
    commodityDetailType:true,
    orderSettleData:[],
    shopCarCountByUserIdData:[],
    showShareMonent:false,
    getKmhProductDetailShareImageData:[],//分享朋友圈数据
    getKmhProductDetailShareImageParam:{ //分享朋友圈入参
      "channelId": 2,    //渠道id
      "prodCode": " ",    //商品code
      "page": "pages/commodityDetail/commodityDetail"   // 前端小程序要跳转的页面，封装到二维码中
    },
    getKmhProductShareData:[],//分享数据
    getKmhProductShareParam:{ //分享朋友入参
      "prodCode": "",
      "columnCode": ""
    },
    productParam:{
      "item_code":"020205142401",
      "title":"鲲美会",
      "desc":"",
      "image_list": ["https://kshop-pro-data.oss-cn-hangzhou.aliyuncs.com/kmh/douyin.png"],
     
      "src_mini_program_path": "pages/home/home",
    },
    shareFooterType:true, //分享弹框隐藏
    shopCarCountByUserIdType: true,//购物车数量显示状态
    showKMH: false, //正品弹框
    // 商品详情接口入参
    productDetailParam: {
      prodCode: "",
      channelId: 2,
      shareId:"",
    },
    //获取购物车数量入参
    shopCarCountByUserIdParam:{
      "channelId": 2
    },
    //添加购物车数量 
    shopCarAddParam:{
      "shareMemberId":"",
      "productCode": "",
      "prodCount":null,
      "type":1,
      "channelId": 2
    },

   
    kmhProductDetailData:[],
    showMoreSayList:true,
    current: 0,
    // indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    swiperIndex:0,
    addMoveAnimte:false,
    addMoveTimer:null,
    showSpecList:false,
    prodNum:1,
    chooseType:'buy' //addCart buy
  },


  methods: {
    onShowKMH:function() {
      console.log(123)
      this.setData({
        showKMH: true
      })
    },
    onHideKMH:function() {
      this.setData({
        showKMH: false
      })
    }
  },


  swiperChange: function (e) {
    var that = this;
    if (e.detail.source == 'touch') {
      that.setData({
        current: e.detail.current
      })
    }
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("钱钱钱",options)
    if(options.scene){ //判断商品详情来源
      this.data.productDetailParam.shareId = options.scene //获取商品
    }else{
      this.data.productDetailParam.shareId ="";
    }

    if (options.shareMemberId){
      this.data.shopCarAddParam.shareMemberId = options.shareMemberId
    }
    this.data.productDetailParam.prodCode=options.prodCode;
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getKmhProductDetail();
    this.shopCarCountByUserId()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getKmhProductDetail()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.setData({
      shareFooterType: true
    })
    return {
      title: this.data.getKmhProductShareData.title,
      imageUrl: this.data.getKmhProductShareData.shareImageUrl,
      path: `/pages/commodityDetail/commodityDetail?prodCode=${this.data.getKmhProductShareData.productCode}&shareMemberId=${this.data.getKmhProductShareData.memberId}`
    }
  }
})