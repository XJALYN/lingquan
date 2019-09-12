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



module.exports = {
  login,
  newList,
  advertisingBanners
}

