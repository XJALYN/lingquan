// components/selfShopList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     list:{
      type:Array,
      value:[]
    },
    data: {
      type: Object,
      value: {
        banner: [],// banner
        discoveryGoodsList:[],// 发现好物好物
        firstCategoryList:[],// 分类列表
        guessYouLike:[], // 猜你喜欢
        kmBrands:[], // 品牌列表
        kmSelectDtos:[], // 鲲美优选
        priviledgeList:[], // 你的专享
      }
    }
    


  },

  /**
   * 组件的初始数据
   */
  data: {
 
    brandIndex:0,
    bannerIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapBannerList(e){
      let item = e.currentTarget.dataset.item
      // 跳转到导航页面
      if (item.linkType == 0) {
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
      } else if (item.linkType == 1) { // 跳转到
        wx.navigateTo({
          url: item.link,
        })
      } else if (item.linkType == 2) {
        let href = encodeURI(item.link)
        wx.$router.push("/pages/webview/webview", { href })
      }
    },

    onPushToGoodsDetail(e){
      let prodCode = e.currentTarget.dataset.prodcode
      wx.$router.push("/pages/commodityDetail/commodityDetail", { prodCode })
      
    },
    onBrandChange(e){
      console.log(e)
      if(e.detail.source=="touch"){
        this.setData({
          brandIndex: e.detail.current
        })
      }
    },

    // 进入搜索页面
    onPushToSearch(e) {
      console.log(e)
      let type = e.currentTarget.dataset.type
      let brandcode = e.currentTarget.dataset.brandcode
      let categorycode = e.currentTarget.dataset.categorycode
      wx.$router.push("/pages/search/search", { type, brandCode: brandcode, categoryCode: categorycode })
    },
  }
})
