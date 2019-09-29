// components/form/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:null,
      value:""
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
    onReport(e){
      let formId = e.detail.formId
      this.triggerEvent("tap", {data:this.data.data})
      wx.$methods.saveForm({ form_id:formId}).then(res=>{
        console.log(res)
      })
      console.log(formId)
    }
  }
})
