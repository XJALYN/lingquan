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
  let inviteId = wx.getStorageSync("inviteId")
  if(inviteId){
    params.referrer = inviteId
  }
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

const industriesCategories = (params = {}) => {
  return Post(Api.industriesCategories,params)
}

const certifyInfo = (params = {}) => {
  return Post(Api.certifyInfo,params)
}

const newCreate = (params = {}) => {
  return Post(Api.newCreate,params)
}

const newsCategories = (params = {}) => {
  return Post(Api.newsCategories,params)
}

const myPublishedList = (params = {}) =>{
  return Post(Api.myPublishedList,params)
}

const saveForm = (params = {}) => {
  return Post(Api.saveForm,params)
}

const newsDelete = (params = {}) => {
  return Post(Api.newsDelete,params)
}

const reportsLocation = (params = {}) => {
  return Post(Api.reportsLocation,params)
}

const likeNews = (params = {}) => {
  return Post(Api.likeNews,params)
}
const unLikesNews = (params = {}) =>{
  return Post(Api.unLikesNews, params)
}
const newsCommentsList = (params = {})=>{
  return Post(Api.newsCommentsList,params)
}

const newsComments = (params = {}) => {
  return Post(Api.newsComments, params)
}
const newsCommentsReply = (params = {})=>{
  return Post(Api.newsCommentsReply, params)
}

const currentLocation = (params = {}) => {
  return Post(Api.currentLocation, params)
}

const authoPhone = (params = {}) => {
  return Post(Api.authoPhone,params)
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
  industriesCategories,
  certifyInfo,
  newCreate,
  newsCategories,
  myPublishedList,
  saveForm,
  newsDelete,
  reportsLocation,
  likeNews,
  unLikesNews,
  newsCommentsList,
  newsCommentsReply,
  newsComments,
  currentLocation,
  authoPhone
}

