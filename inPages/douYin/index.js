// inPages/douYin/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dylist: { type: Array, value: [] },
    clickDyData: { type: Array, value: [] }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onclickComdetail(e) { //点击抖音列表到详情页面
    console.log("点击抖音列表",e)
      wx.$router.push("../../pages/commodityDetail/commodityDetail", { "prodCode": e.currentTarget.dataset.prodcode })
    },
    onPushToAddShoppingCart(e) { //点击抖音爆款到购物车
    console.log("抖音爆款",e)
      let prodCode = e.currentTarget.dataset.prodcode
      this.triggerEvent('addshoppingcart', { prodcode: prodCode })
    }
  }
})
