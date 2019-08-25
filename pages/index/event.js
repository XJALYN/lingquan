module.exports = {
  onChangeAddress(e){
    console.log(e)
    this.setData({
      currentCountry : e.detail.value[2]
    })
  }
}