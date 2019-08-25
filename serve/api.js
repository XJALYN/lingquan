module.exports = {
  authorLogin:"/kshop-member-server/member/update/info/", // 授权登录
  login: "/kshop-member-server/member/login/default/", // 静默登录
  
  authorUserInfo:"/kshop-member-server/member/update/info/",// 授权用户信息
  addressList: '/kshop-member-server/address/list/', // 地址列表
  addressAdd: '/kshop-member-server/address/add/', // 地址添加
  addressDelete: '/kshop-member-server/address/delete/',// 地址删除
  addressModify: '/kshop-member-server/address/modify/', // 地址修改
  addressSetDefault: '/kshop-member-server/address/setDefault/',// 设置默认地址
  addressDefault: '/kshop-member-server/address/default/', // 获取默认收货地址

  bindPhone: '/kshop-member-server/member/bindPhone4Ma/', // 绑定手机
  getUserInfo: '/kshop-member-server/member/getUserInfo/', // 获取用户信息
  orderList: '/kshop-checkout-server/checkoutOrder/orderList/',// 获取好物订单列表

  getKmhProductDetail: '/kshop-channel-server/product/getKmhProductDetail/',// 获取商品详情
  getHomePage:'/kshop-channel-server/kmh/getHomePage/', //获取首页数据
  getColumnItemList:"/kshop-channel-server/kmh/getColumnItemList/",// 获取自营好物列表 //抖音爆款
  getMemberCardsWithRights:"/kshop-member-server/member/getMemberCardsWithRights/",// 获取会员卡权益

  orderSettle: '/kshop-checkout-server/checkoutOrder/orderSettle/', //获取立即购买
  shopCarAdd: '/kshop-checkout-server/checkoutOrder/shopCarAdd/',//添加查询商品详情页面得购物车数量
  shopCarCountByUserId: '/kshop-checkout-server/checkoutOrder/shopCarCountByUserId/',//获取查询商品详情页面得购物车数量
  shopCarList: '/kshop-checkout-server/checkoutOrder/shopCarList/',//获取购物车列表
  getMemberCardBuyOrders:'/kshop-member-server/member/getMemberCardBuyOrders/', // 获取会员购买记录
  discoveryList: '/kshop-channel-server/kmh/discovery/discoveryList/',//获取发现列表
  clickLike: '/kshop-channel-server/kmh/discovery/clickLike/',//发现点赞接口
  shopCarCountDelete: '/kshop-checkout-server/checkoutOrder/shopCarCountDelete/',//删除购物车
  orderSubmit: '/kshop-checkout-server/checkoutOrder/orderSubmit/',//提交订单
  shareArticle: '/kshop-channel-server/kmh/discovery/shareArticle/',//获取发现详情分享内容
  payForMemberCard:"/kshop-member-server/member/payForMemberCard/", // 会员支付
  // orderSign:"/kshop-checkout-server/checkoutOrder/orderSign/", // 订单签收
  article: '/kshop-channel-server/kmh/discovery/article/',//获取发现详情
  checkoutOrderDetail: '/kshop-checkout-server/checkoutOrder/detail/',//获取发现详情

  searchKeywordList:"/kshop-channel-server/product/search/keyword/list/", // 搜索关键字列表
  searchBrandList:"/kshop-channel-server/product/search/brand/list/", // 品牌列表
  searchCategoryList: "/kshop-channel-server/product/search/category/list/", //根据父级品类查询子品类
  productSearchList:"/kshop-channel-server/product/search/list/", // 搜索用户商品
  orderCancel: '/kshop-checkout-server/checkoutOrder/orderCancel/',//取消订单
  checkoutOrdertrace: '/kshop-checkout-server/checkoutOrder/trace/',//物流跟踪

  orderStatusNum: "/kshop-checkout-server/checkoutOrder/orderStatusNum/", // 查询当前登陆人订单数量
  liveRoomList:"/kmh-live-server/live/room/list/", //  直播列表

  getKmhProductShare: '/kshop-channel-server/product/getKmhProductShare/',//物流跟踪

  getRemainderRecordListByToken:"/kshop-member-server/member/getRemainderRecordListByToken/",
  countMyCouponList:"/kshop-member-server/coupon/countMyCouponList/" , // 获取优惠券数量
  getMyCouponList:"/kshop-member-server/coupon/getMyCouponList/", // 获取我的优惠券列表

  goodStuffOrderorderSign: '/kshop-checkout-server/checkoutOrder/order/sign/',//确认订单
  getKmhProductDetailShareImage: '/kshop-channel-server/product/getKmhProductDetailShareImage/',//分享朋友圈

  getIntegralRecordListByToken:"/kshop-member-server/member/getIntegralRecordListByToken/", // 获取积分记录
  getMyCountListByToken:"/kshop-member-server/member/getMyCountListByToken/", // 获取我的账户明细
  refundRecordList:"/kshop-checkout-server/refund/refundRecordList/", // 申请售后列表
  settlement: '/kshop-member-server/member/coupon/list/settlement/',//获取包邮和优惠卷列表
  saveLogisticsInfo: "/kshop-checkout-server/refund/saveLogisticsInfo/", // 保存售后物流信息
  initRefundRecord:"/kshop-checkout-server/refund/initRefundRecord/", // 初始化售后单
  saveRefundRecord:"/kshop-checkout-server/refund/saveRefundRecord/", // 保存售后单
  getRefundRecord: "/kshop-checkout-server/refund/getRefundRecord/", // 售后详情
  getVshopList:"/kshop-transaction-server/logistics/getVshopList/", // 获取物流公司列表
  saveForm:"/kshop-member-server/member/saveForm/", // 保存formid
  bindGiftCard:"/kshop-member-server/member/bindGiftCard/", // 绑定礼品卡
  getGiftCardRecord:"/kshop-member-server/member/getGiftCardRecord/", // 获取礼品卡充值记录
  getLuckyBugRecevingRecord:"/kshop-member-server/member/getLuckyBugRecevingRecord/", // 获取福袋记录
  insertLuckyBugReceivingRecord:"/kshop-member-server/member/insertLuckyBugReceivingRecord/", // 添加福袋记录
  getHWZYList:"/kshop-channel-server/kmh/getHWZYList/", // 获取好物自营列表
  getGuessYouLikeList:"/kshop-channel-server/kmh/getGuessYouLikeList/", // 猜你喜欢
  getSearchRecordListClient:"/kshop-channel-server/kmh/getSearchRecordListClient/", //获取历史搜索
  cleanSearchRecords:"/kshop-channel-server/kmh/cleanSearchRecords/" // 清理搜索记录
}