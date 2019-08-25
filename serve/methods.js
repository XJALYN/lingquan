var Api = require("api")
const Post = require("request").post
const PostUsingAuthor = require("request").postUsingAuthor



/**
 * 微信授权登录
 * params {code:'微信授权code'}
 */
const login = (params = {}) => {
  return Post(Api.login, params)
}

/**
 * 授权用户信息
 */
const authorUserInfo = (params = {}) =>{
  return Post(Api.authorUserInfo,params)
}

/** 
 * 获取用户信息
 */
const getUserInfo = (params = {}) => {
  return Post(Api.getUserInfo, params)
}



/** 
 *  绑定手机号
 */
const bindPhone = (params = {}) => {
  return Post(Api.bindPhone, params)
}





/**
 * 地址列表
 */
const addressList = (params = {}) => {
  return Post(Api.addressList, params)
}

/**
 * 添加地址
 */
const addressAdd = (params = {}) => {
  return Post(Api.addressAdd, params)
}

/**
 * 删除地址
 */
const addressDelete = (params = {}) => {
  return Post(Api.addressDelete, params)
}

/**
 * 修改地址
 */
const addressModify = (params = {}) => {
  return Post(Api.addressModify, params)
}

/**
 * 设置默认地址
 */
const addressSetDefault = (params = {}) => {
  return Post(Api.addressSetDefault, params)
}

/**
 * 获取默认地址
 */
const addressDefault = (params = {}) => {
  return Post(Api.addressDefault, params)
}
/**
 * 获取商品详情
 */
const getKmhProductDetail = (params = {}) => {
  return Post(Api.getKmhProductDetail, params)
}

/**
 * 获取首页数据 
 */
const getHomePage = (params = {}) => {
  return Post(Api.getHomePage, params)
}
/**
 * 获取立即购买
 */
const orderSettle = (params = {}) => {
  return Post(Api.orderSettle, params)
}
/**
 * 获取商品页面得购物车个数
 */
const shopCarCountByUserId = (params = {}) => {
  return Post(Api.shopCarCountByUserId, params)
}
/**
 * 添加商品页面得购物车个数
 */
const shopCarAdd = (params = {}) => {
  return PostUsingAuthor(Api.shopCarAdd, params)
}
/**
 * 获取购物车列表
 */
const shopCarList = (params = {}) => {
  return Post(Api.shopCarList, params)
}

/**
 * 获取自营商品列表 
 */
const getColumnItemList = (params = {}) => {
  return Post(Api.getColumnItemList, params)
}

/**
 * 获取会员权益
 */
const getMemberCardsWithRights = (params = {})=>{
  return Post(Api.getMemberCardsWithRights,params)
}
/**

 * 获取会员购买记录
 */
const getMemberCardBuyOrders = (params = {}) => {
  return Post(Api.getMemberCardBuyOrders, params)
}
/**
 * 获取发现列表
 */
const discoveryList = (params = {}) => {
  return Post(Api.discoveryList, params)
}
/**
 * 删除购物车
 */
const shopCarCountDelete = (params = {}) => {
  return Post(Api.shopCarCountDelete, params)
}

/**
 * 发现点赞
 */
const clickLike = (params = {}) => {
  return PostUsingAuthor(Api.clickLike, params)
}
/**
 * 提交订单
 */
const orderSubmit = (params = {}) => {
  return Post(Api.orderSubmit, params)
}

/**
 *  会员支付
 */
const payForMemberCard = (params = {}) => {
  return Post(Api.payForMemberCard,params)
}

/**
 *  订单列表
 */
const orderList = (params = {}) => {
  return Post(Api.orderList,params)
}

/**
 *  发现详情
 */
const article = (params = {}) => {
  return Post(Api.article, params)
}
/**
 *  发现详情分享
 */
const shareArticle = (params = {}) => {
  return Post(Api.shareArticle, params)
}


/**
 *  发现详情分享
 */
const checkoutOrderDetail = (params = {}) => {
  return Post(Api.checkoutOrderDetail, params)
}
/**
 *  取消订单
 */
const orderCancel = (params = {}) => {
  return Post(Api.orderCancel, params)
}

/**
 *  搜索关键字列表
 */
const searchKeywordList = (params = {}) =>{
  return Post(Api.searchKeywordList,params)
}

/**
 *  品牌列表
 */
const searchBrandList = (params = {}) =>{
  return Post(Api.searchBrandList,params)
}

/**
 *  根据父级品类查询子品类
 */
const searchCategoryList = (params = {}) => {
  return Post(Api.searchCategoryList,params)
}

/**
 *  搜索用户商品
 */
const productSearchList = (params = {}) => {
  return Post(Api.productSearchList, params)
}
/**
 *  物流跟踪
 */
const checkoutOrdertrace = (params = {}) => {
  return Post(Api.checkoutOrdertrace, params)
}
/**
 * 分享朋友
 */
const getKmhProductShare = (params = {}) => {
  return Post(Api.getKmhProductShare, params)
}
/**
 * 确认订单
 */
const goodStuffOrderorderSign = (params = {}) => {
  return Post(Api.goodStuffOrderorderSign, params)
}

/**
 *  订单状态数量
 */
const orderStatusNum = (params = {}) =>{
  return Post(Api.orderStatusNum,params)
}

/**
 *  订单状态数量
 */
const liveRoomList = (params = {}) =>{
  return Post(Api.liveRoomList,params)
}
/**
 *  分享朋友圈
 */
const getKmhProductDetailShareImage = (params = {}) => {
  return Post(Api.getKmhProductDetailShareImage, params)
}

/**
 *  获取分享金
 */
const getRemainderRecordListByToken = (params = {}) => {
  return Post(Api.getRemainderRecordListByToken, params)
}

/**
 *  我的券数量
 */
const countMyCouponList = (params = {}) =>{
  return Post(Api.countMyCouponList,params)
}

/**
 *  我的券列表
 */
const getMyCouponList = (params = {}) => {
  return Post(Api.getMyCouponList,params)
}
/**
 *  包邮和优惠卷列表
 */
const settlement = (params = {}) => {
  return Post(Api.settlement, params)
}

/**
 *  我的积分
 */
const getIntegralRecordListByToken = (params = {}) => {
  return Post(Api.getIntegralRecordListByToken, params)
}

/**
 *  我的账户明细
 */
const getMyCountListByToken = (params = {}) => {
  return Post(Api.getMyCountListByToken, params)
}

/**
 *  售后列表
 */
const refundRecordList = (params = {}) =>{
  return Post(Api.refundRecordList,params)
}

/**
 *  保存售后物流信息
 */
const saveLogisticsInfo = (params = {})=>{
  return Post(Api.saveLogisticsInfo, params)
}
/**
 *  初始化售后单
 */
 const initRefundRecord = (params = {}) =>{
    return Post(Api.initRefundRecord, params)
 }
/**
 *  保存售后单
 */
const saveRefundRecord = (params = {})=>{
  return Post(Api.saveRefundRecord, params)
}
/**
 *  售后详情
 */
const getRefundRecord = (params = {}) => {
  return Post(Api.getRefundRecord, params)
}

/**
 *  获取物流公司列表
 */
const getVshopList = (params = {}) =>{
  return Post(Api.getVshopList,params)
}

/**
 *  保存formid数据
 */
const saveForm = (params = {}) => {
  return Post(Api.saveForm, params)
}
/**
 *  绑定礼品卡
 */
const bindGiftCard = (params = {}) => {
  return Post(Api.bindGiftCard,params)
}

/**
 *  获取礼品卡记录
 */
const getGiftCardRecord = (params = {}) => {
  return Post(Api.getGiftCardRecord,params)
}


/**
 *  获取福袋记录
 */
const getLuckyBugRecevingRecord = (params = {}) =>{
  return Post(Api.getLuckyBugRecevingRecord,params)
}


/**
 *  增加福袋记录
 */
const insertLuckyBugReceivingRecord = (params = {}) =>{
  return Post(Api.insertLuckyBugReceivingRecord,params)
}


/**
 *  获取好物自营列表
 */
const getHWZYList = (params = {}) => {
  return Post(Api.getHWZYList,params)
}


/**
 *  猜你喜欢列表
 */
const getGuessYouLikeList = (params = {}) => {
  return Post(Api.getGuessYouLikeList,params)
}


/**
 *  授权微信登录
 */
const authorLogin = (params = {})=>{
  return Post(Api.authorLogin,params)
}

/**
 *  获取历史搜索记录
 */
const getSearchRecordListClient = (params = {}) =>{
  return Post(Api.getSearchRecordListClient,params)
}

/**
 *  清理搜索记录
 */
const cleanSearchRecords = (params = {}) =>{
  return Post(Api.cleanSearchRecords, params)
}

module.exports = {
  login,
  getUserInfo,
  bindPhone,
  addressList,
  addressAdd,
  addressDelete,
  addressModify,
  addressSetDefault,
  addressDefault,
  getKmhProductDetail,
  getHomePage,
  getColumnItemList,
  getMemberCardsWithRights,
  orderSettle,
  shopCarCountByUserId,
  shopCarAdd,
  shopCarList,
  getMemberCardBuyOrders,
  discoveryList,
  shopCarCountDelete,
  clickLike,
  orderSubmit,
  payForMemberCard,
  article,
  shareArticle,
  orderList,
  checkoutOrderDetail,
  searchKeywordList,
  searchBrandList,
  searchCategoryList,
  productSearchList,
  orderCancel,
  checkoutOrdertrace,
  orderStatusNum,
  liveRoomList,
  getKmhProductShare,
  goodStuffOrderorderSign,
  getRemainderRecordListByToken,
  countMyCouponList,
  getMyCouponList,
  getKmhProductDetailShareImage,
  getIntegralRecordListByToken,
  getMyCountListByToken,
  refundRecordList,
  settlement,
  saveLogisticsInfo,
  initRefundRecord,
  saveRefundRecord,
  getRefundRecord,
  getVshopList,
  saveForm,
  bindGiftCard,
  getGiftCardRecord,
  getLuckyBugRecevingRecord,
  insertLuckyBugReceivingRecord,
  getHWZYList,
  getGuessYouLikeList,
  authorUserInfo,
  authorLogin,
  getSearchRecordListClient,
  cleanSearchRecords
}

