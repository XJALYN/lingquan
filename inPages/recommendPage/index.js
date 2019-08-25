// components/recommendPage/index.js
const config = require("../../config/config.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object,
      value:{
        firstOrderList:[],
        bannerList:[],
        topQualityList:[],
        vipTakeFreeList:[],
        privilege:{},
        user:{}
      }
    },
    hideOneMinute:{
      type:null,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bannerIndex:0,
    showMemberUpgrade:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 升级vip
    onPushToMember(e){
      let type = e.currentTarget.dataset.type
      wx.switchTab({
        url: '/pages/member/member',
      })
      // 缓存会员等级
      wx.setStorage({
        key: 'member:type',
        data: type,
      })
    },
    // 红包信息
    onPushToRedPacket(){
      wx.$showToast('敬请期待!')
    },
    // banner页面切换
    onSwiperChange(e){
      console.log(e)
      this.setData({
        bannerIndex:e.detail.current
      })
    },

    // 打开小程序
    onLaunchMiniProgram() {
      console.log("onLaunchMiniProgram")
      if(wx.$db.userType != 2){
        wx.navigateTo({
          url: '/pages/author/author',
        })
        return
      }
      wx.navigateToMiniProgram({
        appId: "wx6106b6dfe9370a7c",
        path: "pages/goodsList/goodsList",
        envVersion: config.envVersion,
        extraData: {
          unionId: wx.$db.unionId
        },
        success: res => {
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      })
    },
    // 跳转到发现详情页
    onPushToFindDetail(e){
      let articleid = e.currentTarget.dataset.articleid
      wx.$router.push("/pages/findDetail/findDetail", { articleId: articleid })
    },

    // 跳转到商品详情页面
    onPushToCommodityDetailFromFisrt(e){
      if (this.data.data.user.levelCode==4){
        this.setData({
          showMemberUpgrade:true
        })
        return
      }
      let prodCode = e.currentTarget.dataset.prodcode
      wx.$router.push("/pages/commodityDetail/commodityDetail", { prodCode })
    },

    // 首单必返
    onPushToCommodityDetail(e){
      let prodCode = e.currentTarget.dataset.prodcode
      wx.$router.push("/pages/commodityDetail/commodityDetail", {prodCode})
    },
    // 跳转到发现页面
    onPushToFind(e){
      let menuindex = e.currentTarget.dataset.menuindex
      wx.setStorageSync("find:menuIndex",menuindex)

      wx.switchTab({
        url: '/pages/find/find',
      })
    },
    // 跳转到用户中心
    onPushToUserCenter(e){
      wx.switchTab({
        url: '/pages/userCenter/userCenter',
      })
    },

    // 点击一分钟了解鲲美会按钮
    onSwitchMenu(e){
      let index = e.currentTarget.dataset.index
      this.triggerEvent('oneminute', { index:index})
    },
    // 打开种草详情页面
    onPushToWxWeb(e){
      let href = encodeURI(e.currentTarget.dataset.url)
      wx.$router.push("/pages/weixin/weixin", {href})
    },
    // 点击banner列表页面
    onTapBannerList(e){
      let item = e.currentTarget.dataset.item
      // 跳转到导航页面
      if (item.linkType==0){
        if (item.linkParam) {
          console.log(item.linkParam)
          let json = JSON.parse(item.linkParam)
          console.log(json)
          let { key, value } = json
          wx.setStorageSync(key, value)
        }
        wx.navigateTo({
          url: item.link,
        })
      } else if (item.linkType==1){ // 跳转到
        wx.navigateTo({
          url: item.link,
        })
      } else if (item.linkType==2){
        let href = encodeURI(item.link)
        wx.$router.push("/pages/webview/webview", { href })
      }
    }
  }
})
