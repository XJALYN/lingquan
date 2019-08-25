module.exports = {
  // 输入卡号
  onInputCardNum(e){
    this.data.cardNo = e.detail.value
    console.log("卡号为空", this.data.cardNo)
    this.onClearCheck()
  },
  // 输入卡密
  onInputCardPass(e){
   this.data.cardPass = e.detail.value
    console.log("卡密码", e.detail.value)
    this.onClearCheck()
  },

  // 检查状态
  checkStaus(){
    this.onClearCheck()
    if (this.data.cardNo == ""){
      console.log("账号为空")
      this.setData({
        isCardNoEmpty:true
      })
      return false
    }
    if(this.data.cardPass == ""){
      console.log("密码为空")
      this.setData({
        isCardPassEmpty:true
      })
      return false
    }
    return true
  },

  onCheckCardNo(){
    this.onClearCheck()
    if (this.data.cardNo == "") {
      console.log("账号为空")
      this.setData({
        isCardNoEmpty: true
      })
    }
  },
  onCheckCardPass(){
    this.onClearCheck()
    if (this.data.cardPass == "") {
      console.log("密码为空")
      this.setData({
        isCardPassEmpty: true
      })
    }
  },
  onClearCheck(){
    this.setData({
      isCardNoEmpty: "",   // 卡号为空
      isCardPassEmpty: "", // 卡密为空
      isCardHasBind: "",   // 卡已经绑定
      isCardPassError: "", // 卡密码错误
      isCardNoError: "",   // 卡号错误
    })
  },
  onSubmit(){
    if (this.checkStaus()){
      this.bindGiftCard()
    }
  }

}