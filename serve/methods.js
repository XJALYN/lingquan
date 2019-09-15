var Api = require("api")
const Post = require("request").post
const Get = require("request").get
const Upload = require("request").upload
const PostUsingAuthor = require("request").postUsingAuthor



/**
 * 微信授权登录
 * params {code:'微信授权code'}
 */
const login = (params = {}) => {
  return Post(Api.login, params)
}

const authorWxInfo = (params = {}) => {
  return Post(Api.authorWxInfo, params)
}

/**
 * 新闻列表
 * params {code:'微信授权code'}
 */
const newList = (params = {}) => {
  return Post(Api.newList, params)
}
/**
 * 广告banner
 * params {code:'微信授权code'}
 */
const advertisingBanners = (params = {}) => {
  return Post(Api.advertisingBanners, params)
}

/**
 * 获取新闻详情
 * params {code:'微信授权code'}
 */
const newsDetail = (params = {}) => {
  return Post(Api.newsDetail,params)
}

/**
 * 企业认证
 * params
 */
const certifyEnterprise = (params = {}) => {
  return Post(Api.certifyEnterprise,params)
}

const usersProfile = (params = {}) => {
  return Post(Api.usersProfile,params)
}

const fileUpload = (params = {}) => {
  return Upload(Api.fileUpload, params.filePath,params)
}



module.exports = {
  login,
  newList,
  advertisingBanners,
  newsDetail,
  certifyEnterprise,
  usersProfile,
  authorWxInfo,
  fileUpload,
  
}

