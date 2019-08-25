// components/rater/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:Number,
      value:0
    },
    index:{
      type:Number,
      value:1
    }
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
    onChange(e){
      let value = e.currentTarget.dataset.value
      console.log({ value, index: this.data.index })
      this.triggerEvent("change",{value,index:this.data.index})
    }
  }
})
